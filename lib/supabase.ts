import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function required(name: string): string {
  const value = process.env[name];
  if (!value || value.startsWith("[FILL")) {
    throw new Error(`Missing environment variable ${name} — set it in .env.local`);
  }
  return value;
}

let client: SupabaseClient | null = null;

/** Server-only Supabase client using the service role key. Never import from client components. */
export function supabaseAdmin(): SupabaseClient {
  if (!client) {
    client = createClient(required("SUPABASE_URL"), required("SUPABASE_SERVICE_ROLE_KEY"), {
      auth: { persistSession: false },
    });
  }
  return client;
}
