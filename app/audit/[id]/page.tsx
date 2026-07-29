import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Share2 } from "lucide-react";
import { getAuditById, type StoredAudit } from "@/lib/audit-store";
import { ScoreDial } from "@/components/audit/ScoreDial";
import { CategorySection, type CategoryIcon } from "@/components/audit/CategorySection";
import { LeadCaptureCard } from "@/components/audit/LeadCaptureCard";
import { SiteNav } from "@/components/audit/SiteNav";
import { Logo } from "@/components/audit/Logo";
import { SITE_URL, breadcrumbSchema } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const audit = await getAuditById(id).catch(() => null);
  if (!audit) return { title: "Audit not found" };

  const hostname = new URL(audit.url).hostname;
  const title = `${hostname} scored ${audit.mobileScore ?? "—"} on mobile`;
  const description = `Free contractor website audit report for ${hostname} — mobile ${audit.mobileScore ?? "—"}, desktop ${audit.desktopScore ?? "—"}. SEO, speed, Core Web Vitals, Local SEO, and AI Search citations.`;
  const ogUrl = `${SITE_URL}/api/og?id=${audit.id}`;
  const canonical = `${SITE_URL}/audit/${audit.id}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogUrl],
    },
  };
}

function fixesFor(audit: StoredAudit) {
  const items: Array<{
    key: string;
    icon: CategoryIcon;
    title: string;
    status: "good" | "warn" | "poor" | "info";
    headline: string;
    detail: string;
    fix?: string;
  }> = [];

  const m = audit.mobileScore ?? 0;
  const mobileStatus = m >= 90 ? "good" : m >= 50 ? "warn" : "poor";
  items.push({
    key: "mobile-speed",
    icon: "smartphone",
    title: "Mobile speed",
    status: mobileStatus,
    headline:
      mobileStatus === "good"
        ? "Your mobile site is fast. Google likes that."
        : mobileStatus === "warn"
          ? "There's room to speed things up for phone visitors."
          : "Slow on phones — this is quietly costing you calls.",
    detail:
      "Most homeowners find contractors on their phone. If your page takes more than three seconds to show up, one in three visitors is already gone and calling the next name on the list.",
    fix:
      mobileStatus === "good"
        ? undefined
        : "Compress the big image on your homepage (usually the hero banner) and remove any auto-playing sliders. Those two changes fix most contractor sites.",
  });

  type Status = "good" | "warn" | "poor" | "info";
  const lcp = audit.lcpMs;
  const cls = audit.cls;
  const inp = audit.inpMs;
  const lcpStatus: Status =
    lcp === null ? "info" : lcp <= 2500 ? "good" : lcp <= 4000 ? "warn" : "poor";
  const clsStatus: Status =
    cls === null ? "info" : cls <= 0.1 ? "good" : cls <= 0.25 ? "warn" : "poor";
  const inpStatus: Status =
    inp === null ? "info" : inp <= 200 ? "good" : inp <= 500 ? "warn" : "poor";

  const order: Record<Status, number> = { info: 0, good: 1, warn: 2, poor: 3 };
  const vitalsWorst: Status = [lcpStatus, clsStatus, inpStatus].reduce<Status>(
    (worst, cur) => (order[cur] > order[worst] ? cur : worst),
    "good"
  );

  items.push({
    key: "vitals",
    icon: "gauge",
    title: "Core Web Vitals",
    status: vitalsWorst,
    headline:
      vitalsWorst === "good"
        ? "Loading, stability, and responsiveness all check out."
        : "Google's three speed signals — at least one needs attention.",
    detail: `Loading (LCP): ${
      lcp === null ? "no data" : `${(lcp / 1000).toFixed(1)}s`
    }. Stability (CLS): ${cls === null ? "no data" : cls.toFixed(3)}. Responsiveness (INP): ${
      inp === null ? "no field data yet" : `${inp}ms`
    }. These come straight from Google.`,
    fix:
      vitalsWorst === "good"
        ? undefined
        : "Fixing LCP usually means compressing the hero image. Fixing CLS means setting fixed width/height on images so the page doesn't jump. Any web person can do both in an hour.",
  });

  items.push({
    key: "schema",
    icon: "code",
    title: "LocalBusiness schema",
    status: audit.hasLocalBusinessSchema ? "good" : "poor",
    headline: audit.hasLocalBusinessSchema
      ? "Google can tell you're a local business."
      : "Google can't tell you're a local business.",
    detail:
      "LocalBusiness schema is a small chunk of code that tells Google your hours, service area, and rating. It's the switch that gets you into the map results — where most contractor jobs actually come from.",
    fix: audit.hasLocalBusinessSchema
      ? undefined
      : "Ask your web person to add LocalBusiness JSON-LD schema to your homepage with your NAP (name, address, phone), hours, and service areas. Fifteen-minute job.",
  });

  items.push({
    key: "viewport",
    icon: "map-pin",
    title: "Mobile viewport tag",
    status: audit.hasViewportMeta ? "good" : "poor",
    headline: audit.hasViewportMeta
      ? "Your site tells phones how to display it."
      : "Your site doesn't tell phones how to display it.",
    detail:
      "The viewport tag is a one-line piece of code that tells phones to show your site at the right zoom. Without it, your site looks tiny and hard to tap.",
    fix: audit.hasViewportMeta
      ? undefined
      : "Add <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> to the <head> of your homepage. Any web person can do this in two minutes.",
  });

  const alts = audit.missingAltCount;
  items.push({
    key: "alts",
    icon: "image-off",
    title: "Missing image descriptions",
    status: alts === 0 ? "good" : alts <= 5 ? "warn" : "poor",
    headline:
      alts === 0
        ? "Every homepage image has a description."
        : `${alts} homepage image${alts === 1 ? "" : "s"} missing descriptions.`,
    detail:
      "Google reads image descriptions (alt tags) to understand what your work looks like. Missing alt tags are free local-SEO points you're leaving on the table.",
    fix:
      alts === 0
        ? undefined
        : "For every image, add a short description of what it shows — 'HVAC technician installing a new AC unit in Phoenix' beats a blank tag every time.",
  });

  return items;
}

export default async function ReportPage({ params }: Params) {
  const { id } = await params;
  const audit = await getAuditById(id).catch(() => null);
  if (!audit) notFound();

  const mobile = audit.mobileScore ?? 0;
  const desktop = audit.desktopScore ?? 0;
  const hostname = (() => {
    try {
      return new URL(audit.url).hostname;
    } catch {
      return audit.url;
    }
  })();
  const stamp = new Date(audit.createdAt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const sections = fixesFor(audit);

  const canonical = `${SITE_URL}/audit/${audit.id}`;
  const reportJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: `Audit for ${hostname}`, url: canonical },
      ]),
      {
        "@type": "WebPage",
        "@id": canonical,
        url: canonical,
        name: `${hostname} website audit`,
        description: `Free contractor website audit for ${hostname}. Mobile score ${mobile}, desktop score ${desktop}.`,
        inLanguage: "en-US",
        isPartOf: { "@id": `${SITE_URL}#website` },
        primaryImageOfPage: `${SITE_URL}/api/og?id=${audit.id}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reportJsonLd) }}
      />
      <SiteNav ctaHref="/" />
      <div className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-3 text-right text-xs text-muted-foreground sm:px-6">
          Audited {stamp}
        </div>
      </div>

      {/* SCORE HERO */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Audit report
            </p>
            <h1 className="mt-3 break-all text-2xl font-bold tracking-tight sm:text-3xl">
              {hostname}
            </h1>
            <a
              href={audit.url}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-1 inline-block text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              {audit.url}
            </a>
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-10 sm:flex-row sm:gap-16">
            <ScoreDial score={mobile} label="Mobile" size="lg" />
            <ScoreDial score={desktop} label="Desktop" size="md" />
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
            <Share2 size={14} strokeWidth={1.75} />
            <span>Screenshot this page and share it — the URL works too.</span>
          </div>
        </div>
      </section>

      {/* CATEGORY BREAKDOWN */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              What we found, in order.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Tap any category to see the details and the fix.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            {sections.map((s, i) => (
              <CategorySection
                key={s.key}
                icon={s.icon}
                title={s.title}
                status={s.status}
                headline={s.headline}
                detail={s.detail}
                fix={s.fix}
                defaultOpen={i === 0 && s.status !== "good"}
              />
            ))}
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <LeadCaptureCard auditedUrl={audit.url} variant="report" />
        </div>
      </section>

      {/* AUDIT ANOTHER */}
      <section>
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Audit another site.</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Check a competitor. Check a friend&apos;s site. See how they stack up.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Run another audit
          </Link>
        </div>
      </section>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-5xl items-center justify-center gap-3 px-4 sm:px-6">
          <Logo size={20} />
          <span className="text-xs text-muted-foreground">© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </main>
  );
}
