import Link from "next/link";
import {
  Wrench,
  Gauge,
  Smartphone,
  MapPin,
  PhoneCall,
  Sparkles,
  Check,
  X,
} from "lucide-react";
import { UrlInputHero } from "@/components/audit/UrlInputHero";
import { AuditCategoryCard } from "@/components/audit/AuditCategoryCard";
import { ScoreDial } from "@/components/audit/ScoreDial";
import { Faq } from "@/components/audit/Faq";
import { SiteNav } from "@/components/audit/SiteNav";
import { Logo } from "@/components/audit/Logo";

const PRO_PRICE = "$29";

const CATEGORIES = [
  {
    icon: Wrench,
    title: "Technical SEO",
    description:
      "Google can't rank a page it can't parse. We check title tags, meta descriptions, canonical URLs, and the structured data that decides whether you show up at all.",
  },
  {
    icon: Gauge,
    title: "Speed & Core Web Vitals",
    description:
      "Every second past three, one in three visitors is calling the next contractor on the list. We measure loading, stability, and tap responsiveness.",
  },
  {
    icon: Smartphone,
    title: "Mobile experience",
    description:
      "Most contractor searches happen on a phone. If the site's zoomed out or the buttons are hard to tap, the call goes to someone else.",
  },
  {
    icon: MapPin,
    title: "Local SEO & GBP signals",
    description:
      "The signals that put you in the Google Maps pack — where emergency service calls actually come from — instead of buried on page two.",
  },
  {
    icon: PhoneCall,
    title: "Conversion basics",
    description:
      "Phone number visible above the fold. Click-to-call that actually works. Contact form that doesn't need scrolling. The mechanics that turn a visit into a job.",
  },
  {
    icon: Sparkles,
    title: "AI Search Visibility",
    beta: true,
    description:
      "ChatGPT, Gemini, and Perplexity are answering 'best HVAC in [city]' before Google gets a chance. We check whether their answers cite you — or your competitors.",
  },
];

const DO = [
  "Score your public homepage against the six categories above.",
  "Monitor your site weekly on the Pro tier and alert you when a score drops.",
  "Email you a prioritized fix checklist as a PDF, if you ask for one.",
];

const DONT = [
  "Fix your site for you.",
  "Rebuild your site or migrate you off your current host.",
  "Sign you to a retainer or a multi-month contract.",
  "Sell you an \"exclusive territory\" for our services.",
  "Cold-call you after you run the audit.",
];

const FAQ = [
  {
    q: "Is this really free?",
    a: "Yes. One audit per IP per day, no signup, no card. The paid tier is the weekly monitoring, not the audit itself — running an audit stays free forever.",
  },
  {
    q: "Do I need to give you my password or site access?",
    a: "No. We only see what Google sees — your public homepage. No login, no admin access, no plugins to install, nothing behind a firewall.",
  },
  {
    q: "How is this different from PageSpeed Insights or GTmetrix?",
    a: "The raw performance numbers are the same — we use Google PageSpeed under the hood. The difference is the six categories are written for a contractor (Google Business Profile signals, phone visibility, AI search citations) instead of a developer, the fix advice is plain-English instead of Lighthouse output, and the Pro tier watches your site every week so you find out about a regression before your bookings drop.",
  },
  {
    q: "So who actually fixes what you find?",
    a: "Your existing developer, using the prioritized fix checklist in the PDF report. We do not sell fix services. If you don't have a developer, the checklist is short and specific enough that most items take under an hour for a freelancer on Upwork or Fiverr.",
  },
  {
    q: "How accurate is the AI Search Visibility check?",
    a: "It's Beta. LLM answers vary between runs and personalize by geography, so we surface the raw citations we saw rather than a single score. Treat it as a directional signal, not a definitive ranking. We're logging citations over time on the Pro tier so the picture gets sharper the longer you monitor.",
  },
];

const SAMPLE_STATUS = [
  { label: "Technical SEO", state: "good" as const },
  { label: "Core Web Vitals", state: "warn" as const },
  { label: "Mobile experience", state: "good" as const },
  { label: "Local SEO", state: "poor" as const },
  { label: "Conversion basics", state: "warn" as const },
  { label: "AI Search (Beta)", state: "poor" as const },
];

function StatusPill({ label, state }: { label: string; state: "good" | "warn" | "poor" }) {
  const styles =
    state === "good"
      ? "bg-green-50 text-green-800"
      : state === "warn"
        ? "bg-amber-50 text-amber-800"
        : "bg-red-50 text-red-800";
  const dot =
    state === "good" ? "bg-good" : state === "warn" ? "bg-warn" : "bg-poor";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${styles}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <SiteNav />

      {/* 1. HERO */}
      <section id="audit" className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 sm:pb-24 sm:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              For U.S. & Canadian home-service contractors
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
              See your website&apos;s{" "}
              <span className="font-serif italic text-primary">real</span> score in about
              30 seconds.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Paste your URL. Get a full SEO and speed score in your browser — no email
              required to see it.
            </p>

            <div className="mx-auto mt-10 max-w-xl">
              <UrlInputHero placeholder="https://mikesplumbing.com" />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-muted-foreground sm:text-sm">
              <span>No email required</span>
              <span aria-hidden className="text-border">
                ·
              </span>
              <span>No sales calls</span>
              <span aria-hidden className="text-border">
                ·
              </span>
              <span>Free tier: 1 audit per day</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SCORE PREVIEW */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              This is what appears the moment your audit finishes.
            </h2>
            <p className="mt-4 text-sm text-muted-foreground sm:text-base">
              No 24-hour wait. No PDF gate. No sales rep will follow up.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-10">
            <div className="flex flex-col items-center justify-center gap-10 sm:flex-row sm:gap-16">
              <ScoreDial score={87} label="Mobile" size="md" animate={false} />
              <ScoreDial score={92} label="Desktop" size="md" animate={false} />
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2 border-t border-border pt-8">
              {SAMPLE_STATUS.map((s) => (
                <StatusPill key={s.label} label={s.label} state={s.state} />
              ))}
            </div>
            <p className="mt-6 text-center text-xs uppercase tracking-widest text-muted-foreground">
              Sample report · your actual scores will differ
            </p>
          </div>
        </div>
      </section>

      {/* 3. WHAT WE CHECK */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              5 checks across 6 categories.
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Written for a contractor, not a marketer.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat) => (
              <div key={cat.title} className="relative">
                {cat.beta && (
                  <span className="absolute right-4 top-4 z-10 rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    Beta
                  </span>
                )}
                <AuditCategoryCard
                  icon={cat.icon}
                  title={cat.title}
                  description={cat.description}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Three steps. No fourth step where we book a call.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-3">
            {[
              {
                n: "1",
                t: "Paste your URL",
                d: "One field. No name, no phone, no service area.",
              },
              {
                n: "2",
                t: "See your score in the browser",
                d: "The report renders in about 30 seconds. Read it, screenshot it, share it.",
              },
              {
                n: "3",
                t: "Optional: email the PDF",
                d: "If you want the prioritized fix checklist as a PDF, give us an email. Otherwise, you're done.",
              },
            ].map((s) => (
              <div key={s.n} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card font-serif text-2xl text-primary">
                  {s.n}
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TOOL, NOT AGENCY */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              This isn&apos;t a sales funnel.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Every other &quot;free audit&quot; aimed at contractors is bait for a
              $500&ndash;$2,000 a month retainer. That&apos;s why they email the PDF a day
              later — they need the follow-up call. ContractorSiteAudit is a scoring tool.
              There is no retainer to sell.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-good/30 bg-green-50/40 p-6 sm:p-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-good">
                What we do
              </h3>
              <ul className="mt-4 space-y-3">
                {DO.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed">
                    <Check
                      size={18}
                      strokeWidth={2.25}
                      className="mt-0.5 shrink-0 text-good"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                What we don&apos;t
              </h3>
              <ul className="mt-4 space-y-3">
                {DONT.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed">
                    <X
                      size={18}
                      strokeWidth={2.25}
                      className="mt-0.5 shrink-0 text-muted-foreground"
                    />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRICING */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              An audit is a photo. Monitoring is a smoke detector.
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              The free tier tells you what&apos;s wrong today. Pro tells you the day it
              breaks again.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-semibold tracking-tight">Free</h3>
                <span className="text-3xl font-bold tabular-nums">$0</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Everything you need to see your score once a day.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "1 audit per IP address per 24 hours",
                  "Full in-browser score across all 6 categories",
                  "Shareable score card URL",
                  "Optional PDF fix checklist by email",
                ].map((f) => (
                  <li key={f} className="flex gap-3">
                    <Check size={16} strokeWidth={2.25} className="mt-1 shrink-0 text-good" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="#audit"
                className="mt-8 flex h-11 items-center justify-center rounded-lg border border-border bg-card px-6 text-sm font-semibold transition-colors hover:bg-surface"
              >
                Run a free audit
              </Link>
            </div>

            <div className="relative rounded-2xl border-2 border-primary bg-card p-6 sm:p-8">
              <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground">
                Pro
              </span>
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-semibold tracking-tight">Pro</h3>
                <span className="text-3xl font-bold tabular-nums">
                  {PRO_PRICE}
                  <span className="ml-1 text-base font-medium text-muted-foreground">
                    /month
                  </span>
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Weekly monitoring so a regression doesn&apos;t cost you a month of jobs.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Unlimited audits, any URL, any time",
                  "Automatic weekly re-scans of your site",
                  "Email alert the day a score drops",
                  "AI Search citation tracking over time",
                  "Public score page for your Google Business Profile",
                ].map((f) => (
                  <li key={f} className="flex gap-3">
                    <Check size={16} strokeWidth={2.25} className="mt-1 shrink-0 text-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://www.paypal.com/ncp/payment/G6BNL2M7B5VEE"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex h-11 w-full items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Upgrade to Pro — $29/month
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Questions contractors actually ask.
            </h2>
          </div>
          <div className="mt-12">
            <Faq items={FAQ} />
          </div>
        </div>
      </section>

      {/* FINAL CTA (still part of the hero motion — kept before footer) */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Score your site before your competitor scores theirs.
            </h2>
            <div className="mx-auto mt-8 max-w-xl">
              <UrlInputHero placeholder="https://mikesplumbing.com" />
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <Logo size={22} />
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()}</span>
            <Link href="#audit" className="hover:text-foreground">
              Run an audit
            </Link>
            <a
              href="mailto:hello@contractorsiteaudit.com"
              className="hover:text-foreground"
            >
              hello@contractorsiteaudit.com
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
