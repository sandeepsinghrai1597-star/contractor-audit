import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { getAuditById } from "@/lib/audit-store";

export const runtime = "nodejs";

function colorFor(score: number) {
  if (score >= 90) return "#16a34a";
  if (score >= 50) return "#f59e0b";
  return "#dc2626";
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const audit = id ? await getAuditById(id).catch(() => null) : null;

  const mobile = audit?.mobileScore ?? 0;
  const desktop = audit?.desktopScore ?? 0;
  const hostname = (() => {
    if (!audit) return "contractorsiteaudit.com";
    try {
      return new URL(audit.url).hostname;
    } catch {
      return audit.url;
    }
  })();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#ffffff",
          padding: "72px 80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 26,
              fontWeight: 600,
              color: "#0f172a",
            }}
          >
            <span
              style={{
                display: "flex",
                width: 14,
                height: 14,
                background: "#f97316",
                borderRadius: 4,
                marginRight: 14,
              }}
            />
            ContractorSiteAudit
          </div>
          <div style={{ display: "flex", fontSize: 20, color: "#64748b" }}>
            Audit report
          </div>
        </div>

        {/* Hostname */}
        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 44,
            fontWeight: 700,
            color: "#0f172a",
            letterSpacing: "-0.02em",
          }}
        >
          {hostname}
        </div>

        {/* Scores */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 64,
            marginTop: 56,
          }}
        >
          {[
            { label: "Mobile", score: mobile },
            { label: "Desktop", score: desktop },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 160,
                  fontWeight: 700,
                  color: colorFor(s.score),
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {s.score}
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 16,
                  fontSize: 22,
                  fontWeight: 500,
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {s.label} · out of 100
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            marginTop: "auto",
            fontSize: 22,
            color: "#64748b",
          }}
        >
          Free 30-second SEO &amp; speed audit for contractor websites.
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
