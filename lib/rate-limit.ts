import { supabaseAdmin } from "@/lib/supabase";

const WINDOW_MS = 24 * 60 * 60 * 1000;

/** True when this IP already used its free audit in the last 24 hours. */
export async function isRateLimited(ip: string): Promise<boolean> {
  const since = new Date(Date.now() - WINDOW_MS).toISOString();
  const { data, error } = await supabaseAdmin()
    .from("rate_limits")
    .select("id")
    .eq("ip_address", ip)
    .gte("created_at", since)
    .limit(1);
  if (error) {
    throw new Error(`Rate limit check failed: ${error.message}`);
  }
  return data.length > 0;
}

/** Records a completed audit against this IP's daily allowance. */
export async function recordRateLimit(ip: string): Promise<void> {
  const { error } = await supabaseAdmin().from("rate_limits").insert({ ip_address: ip });
  if (error) {
    // Non-fatal: the audit already ran; worst case the IP gets a second free audit.
    console.error(`Failed to record rate limit for ${ip}: ${error.message}`);
  }
}
