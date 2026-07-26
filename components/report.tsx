"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LeadForm } from "@/components/lead-form";
import type { AuditResult } from "@/lib/types";

function scoreColor(score: number) {
  if (score >= 90) return { text: "text-green-600", badge: "bg-green-100 text-green-800", label: "Good" };
  if (score >= 50) return { text: "text-amber-500", badge: "bg-amber-100 text-amber-800", label: "Needs work" };
  return { text: "text-red-600", badge: "bg-red-100 text-red-800", label: "Poor" };
}

function ScoreCard({ title, score }: { title: string; score: number }) {
  const c = scoreColor(score);
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>{title}</CardTitle>
        <Badge className={c.badge}>{c.label}</Badge>
      </CardHeader>
      <CardContent>
        <p className={`text-6xl font-bold tabular-nums ${c.text}`}>{score}</p>
        <p className="mt-1 text-sm text-muted-foreground">Google PageSpeed score out of 100</p>
      </CardContent>
    </Card>
  );
}

function Vital({
  name,
  value,
  status,
}: {
  name: string;
  value: string;
  status: "good" | "warn" | "poor" | "unknown";
}) {
  const color =
    status === "good"
      ? "text-green-600"
      : status === "warn"
        ? "text-amber-500"
        : status === "poor"
          ? "text-red-600"
          : "text-muted-foreground";
  return (
    <div className="rounded-lg border border-border p-4 text-center">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{name}</p>
      <p className={`mt-1 text-2xl font-bold tabular-nums ${color}`}>{value}</p>
    </div>
  );
}

function CheckRow({ ok, label }: { ok: boolean; label: string }) {
  return (
    <li className="flex items-center gap-2 text-sm">
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white ${ok ? "bg-green-600" : "bg-red-600"}`}
      >
        {ok ? "✓" : "✗"}
      </span>
      {label}
    </li>
  );
}

function fixImpacts(audit: AuditResult): string[] {
  const fixes: string[] = [];
  const { mobile, checks } = audit;
  if (mobile.score < 50) {
    fixes.push(
      "Your mobile speed score is in the red. Most homeowners find contractors on their phone — a site this slow is quietly costing you calls every week."
    );
  } else if (mobile.score < 90) {
    fixes.push(
      "Your mobile speed has room to improve. Faster pages keep homeowners from hitting back and calling the next contractor in the search results."
    );
  }
  if (mobile.lcpMs !== null && mobile.lcpMs > 2500) {
    fixes.push(
      "Your main content takes over 2.5 seconds to show up on phones. Compressing your hero image usually fixes this and stops visitors leaving before they see your services."
    );
  }
  if (mobile.cls !== null && mobile.cls > 0.1) {
    fixes.push(
      "Your page shifts around while it loads, which makes tapping 'Call Now' frustrating. Setting fixed sizes on images and banners stops the jumping."
    );
  }
  if (mobile.inpMs !== null && mobile.inpMs > 200) {
    fixes.push(
      "Your site is slow to react when visitors tap buttons or menus. Snappier responses keep people moving toward the phone call instead of giving up."
    );
  }
  if (checks.fetched && !checks.hasLocalBusinessSchema) {
    fixes.push(
      "Google can't tell you're a local business. Adding LocalBusiness markup helps you show up in the map results where most contractor jobs come from."
    );
  }
  if (checks.fetched && !checks.hasViewportMeta) {
    fixes.push(
      "Your site doesn't tell phones how to display it, so it can look zoomed-out and hard to tap. One line of code fixes this."
    );
  }
  if (checks.fetched && checks.missingAltCount > 0) {
    fixes.push(
      `${checks.missingAltCount} image${checks.missingAltCount === 1 ? "" : "s"} on your homepage ${checks.missingAltCount === 1 ? "is" : "are"} missing descriptions. Google reads those to understand your work — easy local SEO points you're leaving on the table.`
    );
  }
  return fixes;
}

export function Report({ audit, onReset }: { audit: AuditResult; onReset: () => void }) {
  const { mobile, desktop, checks } = audit;
  const fixes = fixImpacts(audit);

  const lcpStatus =
    mobile.lcpMs === null ? "unknown" : mobile.lcpMs <= 2500 ? "good" : mobile.lcpMs <= 4000 ? "warn" : "poor";
  const clsStatus =
    mobile.cls === null ? "unknown" : mobile.cls <= 0.1 ? "good" : mobile.cls <= 0.25 ? "warn" : "poor";
  const inpStatus =
    mobile.inpMs === null ? "unknown" : mobile.inpMs <= 200 ? "good" : mobile.inpMs <= 500 ? "warn" : "poor";

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">Website audit report</h2>
          <p className="break-all text-sm text-muted-foreground">{audit.url}</p>
        </div>
        <Button variant="outline" onClick={onReset}>
          Audit another site
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <ScoreCard title="Mobile speed" score={mobile.score} />
        <ScoreCard title="Desktop speed" score={desktop.score} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Core Web Vitals (mobile)</CardTitle>
          <CardDescription>The three speed signals Google uses to rank your site.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <Vital
            name="Loading (LCP)"
            value={mobile.lcpMs === null ? "—" : `${(mobile.lcpMs / 1000).toFixed(1)}s`}
            status={lcpStatus}
          />
          <Vital
            name="Stability (CLS)"
            value={mobile.cls === null ? "—" : mobile.cls.toFixed(3)}
            status={clsStatus}
          />
          <Vital
            name="Responsiveness (INP)"
            value={mobile.inpMs === null ? "No data" : `${mobile.inpMs}ms`}
            status={inpStatus}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Local SEO checks</CardTitle>
          {!checks.fetched && (
            <CardDescription>
              We couldn&apos;t load your homepage HTML, so these checks were skipped.
            </CardDescription>
          )}
        </CardHeader>
        {checks.fetched && (
          <CardContent>
            <ul className="grid gap-3">
              <CheckRow
                ok={checks.hasLocalBusinessSchema}
                label="LocalBusiness markup (helps you appear in Google Maps results)"
              />
              <CheckRow
                ok={checks.hasViewportMeta}
                label="Mobile viewport tag (makes your site display correctly on phones)"
              />
              <CheckRow
                ok={checks.missingAltCount === 0}
                label={
                  checks.missingAltCount === 0
                    ? "All homepage images have descriptions"
                    : `${checks.missingAltCount} homepage image${checks.missingAltCount === 1 ? "" : "s"} missing descriptions`
                }
              />
            </ul>
          </CardContent>
        )}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What to fix first</CardTitle>
        </CardHeader>
        <CardContent>
          {fixes.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nice work — no major issues found. Your site is in better shape than most contractor
              websites we audit.
            </p>
          ) : (
            <ol className="grid list-decimal gap-3 pl-5 text-sm leading-relaxed">
              {fixes.map((fix) => (
                <li key={fix}>{fix}</li>
              ))}
            </ol>
          )}
        </CardContent>
      </Card>

      <Card className="border-primary/30 bg-blue-50">
        <CardHeader>
          <CardTitle>Get the full PDF report emailed to me</CardTitle>
          <CardDescription>
            The full report includes every issue we found, prioritized, with plain-English fixes
            you can hand to any web person.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LeadForm auditedUrl={audit.url} submitLabel="Email me the full report" />
        </CardContent>
      </Card>
    </div>
  );
}
