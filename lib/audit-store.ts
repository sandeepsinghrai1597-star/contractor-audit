import { supabaseAdmin } from "@/lib/supabase";

export type StoredAudit = {
  id: string;
  createdAt: string;
  url: string;
  mobileScore: number | null;
  desktopScore: number | null;
  lcpMs: number | null;
  cls: number | null;
  inpMs: number | null;
  hasLocalBusinessSchema: boolean;
  hasViewportMeta: boolean;
  missingAltCount: number;
};

type Row = {
  id: string;
  created_at: string;
  url: string;
  mobile_score: number | null;
  desktop_score: number | null;
  lcp_ms: number | null;
  cls: number | string | null;
  inp_ms: number | null;
  has_local_business_schema: boolean;
  has_viewport_meta: boolean;
  missing_alt_count: number;
};

function fromRow(r: Row): StoredAudit {
  return {
    id: r.id,
    createdAt: r.created_at,
    url: r.url,
    mobileScore: r.mobile_score,
    desktopScore: r.desktop_score,
    lcpMs: r.lcp_ms,
    cls: r.cls === null ? null : Number(r.cls),
    inpMs: r.inp_ms,
    hasLocalBusinessSchema: r.has_local_business_schema,
    hasViewportMeta: r.has_viewport_meta,
    missingAltCount: r.missing_alt_count,
  };
}

export async function getAuditById(id: string): Promise<StoredAudit | null> {
  const { data, error } = await supabaseAdmin()
    .from("audits")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`Audit fetch failed: ${error.message}`);
  return data ? fromRow(data as Row) : null;
}

export type AuditCounts = { today: number; week: number; total: number };

export async function getAuditCounts(): Promise<AuditCounts> {
  const now = Date.now();
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const admin = supabaseAdmin();

  const [today, week, total] = await Promise.all([
    admin
      .from("audits")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startOfDay.toISOString()),
    admin
      .from("audits")
      .select("*", { count: "exact", head: true })
      .gte("created_at", weekAgo.toISOString()),
    admin.from("audits").select("*", { count: "exact", head: true }),
  ]);

  return {
    today: today.count ?? 0,
    week: week.count ?? 0,
    total: total.count ?? 0,
  };
}
