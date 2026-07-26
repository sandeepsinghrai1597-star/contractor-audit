import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const name = cleanString(body?.name);
  const email = cleanString(body?.email);
  const businessName = cleanString(body?.businessName);
  const auditedUrl = cleanString(body?.auditedUrl);

  if (!name || !businessName || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_lead" }, { status: 400 });
  }

  const { error } = await supabaseAdmin().from("leads").insert({
    name,
    email,
    business_name: businessName,
    audited_url: auditedUrl || null,
  });
  if (error) {
    console.error("Failed to save lead:", error.message);
    return NextResponse.json({ error: "save_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
