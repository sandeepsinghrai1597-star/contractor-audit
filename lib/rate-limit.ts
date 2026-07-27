import { supabaseAdmin } from "@/lib/supabase";

const WINDOW_MS = 24 * 60 * 60 * 1000;

export const FREE_AUDITS_PER_DAY = 9;

/** Number of audits this IP has recorded in the last 24 hours. */
export async function getAuditsUsedToday(ip: string): Promise<number> {
  const since = new Date(Date.now() - WINDOW_MS).toISOString();
  const { count, error } = await supabaseAdmin()
    .from("rate_limits")
    .select("id", { count: "exact", head: true })
    .eq("ip_address", ip)
    .gte("created_at", since);
  if (error) {
    throw new Error(`Rate limit check failed: ${error.message}`);
  }
  return count ?? 0;
}

/** True when this IP has used all free audits in the last 24 hours. */
export async function isRateLimited(ip: string): Promise<boolean> {
  return (await getAuditsUsedToday(ip)) >= FREE_AUDITS_PER_DAY;
}

/** Records a completed audit against this IP's daily allowance. */
export async function recordRateLimit(ip: string): Promise<void> {
  const { error } = await supabaseAdmin().from("rate_limits").insert({ ip_address: ip });
  if (error) {
    console.error(`Failed to record rate limit for ${ip}: ${error.message}`);
  }
}
