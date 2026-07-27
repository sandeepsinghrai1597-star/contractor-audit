import { NextRequest, NextResponse } from "next/server";
import { getAuditsUsedToday, FREE_AUDITS_PER_DAY } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "127.0.0.1";
}

export async function GET(req: NextRequest) {
  const ip = clientIp(req);
  try {
    const used = await getAuditsUsedToday(ip);
    const remaining = Math.max(0, FREE_AUDITS_PER_DAY - used);
    return NextResponse.json({ used, remaining, max: FREE_AUDITS_PER_DAY });
  } catch (err) {
    console.error("audits-remaining failed:", err);
    // Fall back to a permissive default so the nav still renders something usable.
    return NextResponse.json({
      used: 0,
      remaining: FREE_AUDITS_PER_DAY,
      max: FREE_AUDITS_PER_DAY,
    });
  }
}
