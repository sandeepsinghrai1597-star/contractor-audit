import { NextRequest, NextResponse } from "next/server";
import { runPageSpeed } from "@/lib/pagespeed";
import { runHtmlChecks } from "@/lib/html-checks";
import { isRateLimited, recordRateLimit } from "@/lib/rate-limit";
import { supabaseAdmin } from "@/lib/supabase";
import type { AuditResult } from "@/lib/types";

const AUDIT_TIMEOUT_MS = 28_000;

function normalizeUrl(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const trimmed = input.trim();
  if (!trimmed) return null;
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(withProtocol);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    if (!url.hostname.includes(".")) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "127.0.0.1";
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const url = normalizeUrl(body?.url);
  if (!url) {
    return NextResponse.json({ error: "invalid_url" }, { status: 400 });
  }

  const ip = clientIp(req);

  // TODO: paywall — checkout for the paid unlimited tier slots in here.
  if (await isRateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY;
  if (!apiKey || apiKey.startsWith("[FILL")) {
    console.error("GOOGLE_PAGESPEED_API_KEY is not set in .env.local");
    return NextResponse.json({ error: "audit_failed" }, { status: 502 });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), AUDIT_TIMEOUT_MS);

  let audit: AuditResult;
  try {
    const [mobile, desktop, checks] = await Promise.all([
      runPageSpeed(url, "mobile", apiKey, controller.signal),
      runPageSpeed(url, "desktop", apiKey, controller.signal),
      runHtmlChecks(url, controller.signal),
    ]);
    audit = { url, mobile, desktop, checks };
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      return NextResponse.json({ error: "timeout" }, { status: 504 });
    }
    console.error("Audit failed:", err);
    return NextResponse.json({ error: "audit_failed" }, { status: 502 });
  } finally {
    clearTimeout(timer);
  }

  await recordRateLimit(ip);

  const { data: inserted, error: insertError } = await supabaseAdmin()
    .from("audits")
    .insert({
      url,
      ip_address: ip,
      mobile_score: audit.mobile.score,
      desktop_score: audit.desktop.score,
      lcp_ms: audit.mobile.lcpMs,
      cls: audit.mobile.cls,
      inp_ms: audit.mobile.inpMs,
      has_local_business_schema: audit.checks.hasLocalBusinessSchema,
      has_viewport_meta: audit.checks.hasViewportMeta,
      missing_alt_count: audit.checks.missingAltCount,
    })
    .select("id")
    .single();

  if (insertError || !inserted) {
    console.error("Failed to store audit:", insertError?.message);
    return NextResponse.json({ error: "audit_failed" }, { status: 502 });
  }

  return NextResponse.json({ auditId: inserted.id, audit });
}
