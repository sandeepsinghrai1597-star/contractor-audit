import Link from "next/link";
import {
  Gauge,
  Smartphone,
  MapPin,
  Code2,
  ImageOff,
  ListChecks,
  ArrowRight,
} from "lucide-react";
import { UrlInputHero } from "@/components/audit/UrlInputHero";
import { ComparisonRow } from "@/components/audit/ComparisonRow";
import { AuditCategoryCard } from "@/components/audit/AuditCategoryCard";
import { CostCalculator } from "@/components/audit/CostCalculator";
import { LiveCounter } from "@/components/audit/LiveCounter";
import { Faq } from "@/components/audit/Faq";

const CATEGORIES = [
  {
    icon: Gauge,
    title: "Google speed",
    description:
      "Mobile and desktop PageSpeed scores from Google's own API — the same numbers Google uses to rank you.",
  },
  {
    icon: Smartphone,
    title: "Mobile experience",
    description:
      "Core Web Vitals: how fast your page shows up, how much it jumps around, how quickly it reacts to a tap.",
  },
  {
    icon: MapPin,
    title: "Local SEO signals",
    description:
      "Whether Google can tell you're a local business — the switch that gets you into the Maps pack.",
  },
  {
    icon: Code2,
    title: "Schema markup",
    description:
      "The invisible code that tells Google your hours, service area, and rating. Missing on 8 in 10 contractor sites.",
  },
  {
    icon: ImageOff,
    title: "Missing alt tags",
    description:
      "Homepage images with no description — free local-SEO points most contractors don't know they're leaving on the table.",
  },
  {
    icon: ListChecks,
    title: "Fix priorities",
    description:
      "Every issue ranked by impact, in plain English. Not a 40-item wall — the 3 to 5 things that actually matter.",
  },
];

const FAQ = [
  {
    q: "Is it really free? What's the catch?",
    a: "The audit is free. One per website per day, no signup. We built this to show off what we do — some people will hire us for the fixes, most won't, and both are fine. The paid tier (coming this launch week) unlocks unlimited audits and weekly monitoring of your site.",
  },
  {
    q: "Do you spam my inbox?",
    a: "You only give us your email if you want the full PDF version of the report. When you do, you'll hear from us maybe twice a month with actual useful stuff (a new check we added, a bug we found in the last audit). One-click unsubscribe. No selling your address to anyone.",
  },
  {
    q: "What exactly do you check?",
    a: "Six things: mobile speed, desktop speed, Core Web Vitals (loading, stability, responsiveness), whether your site has LocalBusiness schema markup for Google Maps, whether your mobile viewport tag is set, and how many images on your homepage are missing alt descriptions. Every check runs against your real live homepage.",
  },
  {
    q: "Do I have to give you my website password?",
    a: "No. We only look at your public homepage — the same thing any visitor or Google bot sees. We don't touch your admin, your hosting, or anything behind a login.",
  },
  {
    q: "What if my site scores fine?",
    a: "Then that's a screenshot worth taking. Post it in your Facebook group, tell your competitors to try it. If your site's genuinely in good shape, we'll say so — no upsell, no fear-mongering.",
  },
  {
    q: "What's the paid tier?",
    a: "$29/month unlocks unlimited audits, weekly automatic re-scans of your site with email alerts when something drops, and a shareable public score page you can put in your Google Business profile. Launching this week — audits stay free forever regardless.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section id="audit" className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-6xl italic leading-none tracking-tight sm:text-8xl">
              Fixable.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Your contractor website is losing you leads. See exactly how many, in 30 seconds.
            </p>

            <div className="mx-auto mt-10 max-w-xl">
              <UrlInputHero />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-muted-foreground sm:text-sm">
              <span>No signup</span>
              <span aria-hidden className="text-border">
                ·
              </span>
              <span>Score in 30s</span>
              <span aria-hidden className="text-border">
                ·
              </span>
              <span>Screenshot &amp; share</span>
            </div>
          </div>

          <p className="mx-auto mt-16 max-w-lg text-center text-sm text-muted-foreground">
            Competitors charge $500 and take 48 hours. We do it live.
          </p>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              The audit market, honestly.
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Three ways to check your site. Here&apos;s what each one actually gives you.
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <ComparisonRow
              isHeader
              label=""
              us={{ kind: "yes" }}
              agency={{ kind: "yes" }}
              google={{ kind: "yes" }}
            />
            <ComparisonRow
              label="Turnaround time"
              us={{ kind: "yes", text: "30 seconds" }}
              agency={{ kind: "no", text: "24–48 hours" }}
              google={{ kind: "yes", text: "45 seconds" }}
            />
            <ComparisonRow
              label="Email required"
              us={{ kind: "yes", text: "No" }}
              agency={{ kind: "no", text: "Yes, plus phone" }}
              google={{ kind: "yes", text: "No" }}
            />
            <ComparisonRow
              label="Contractor-specific"
              us={{ kind: "yes", text: "Yes" }}
              agency={{ kind: "yes", text: "Sometimes" }}
              google={{ kind: "no", text: "Generic dev output" }}
            />
            <ComparisonRow
              label="Fix priority ranking"
              us={{ kind: "yes", text: "Top 3–5, plain English" }}
              agency={{ kind: "yes", text: "40-item PDF" }}
              google={{ kind: "no", text: "Wall of Lighthouse metrics" }}
            />
            <ComparisonRow
              label="Screenshot-friendly score card"
              us={{ kind: "yes", text: "Built for sharing" }}
              agency={{ kind: "no", text: "PDF only" }}
              google={{ kind: "no", text: "Dev-tool UI" }}
            />
            <ComparisonRow
              label="Price"
              us={{ kind: "yes", text: "Free" }}
              agency={{ kind: "no", text: "$0 (they sell you later)" }}
              google={{ kind: "yes", text: "Free" }}
            />
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground">
            Google&apos;s PageSpeed Insights is free and the raw numbers are trustworthy — we use its API under the hood.
            The difference is we translate the numbers into what a contractor can actually do about them.
          </p>
        </div>
      </section>

      {/* SIX CHECKS */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">6 things we check</h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Not 40. Not 12. The six that decide whether Google sends you jobs.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat) => (
              <AuditCategoryCard
                key={cat.title}
                icon={cat.icon}
                title={cat.title}
                description={cat.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* COST OF INACTION */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              The math your ad guy won&apos;t show you.
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              If your site loses 40% of the traffic your ads pay for, this is what that costs you.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <CostCalculator />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              No calls. No salespeople. No 48-hour wait.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-3">
            {[
              { n: "1", t: "Paste your URL", d: "One field. No name, no phone, no service area." },
              { n: "2", t: "Watch the score fill in", d: "Live in your browser. Under 30 seconds." },
              { n: "3", t: "Get the fix list", d: "Read it on screen. PDF version by email if you want one." },
            ].map((s) => (
              <div key={s.n} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-border font-serif text-2xl text-primary">
                  {s.n}
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF — HONEST */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Just launched
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Be one of the first 100.
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              We&apos;re not going to fake testimonials. Here&apos;s the real count.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <LiveCounter />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Straight answers</h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              The questions contractors actually ask before running the tool.
            </p>
          </div>

          <div className="mt-12">
            <Faq items={FAQ} />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-5xl italic leading-none tracking-tight sm:text-7xl">
              30 seconds.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              That&apos;s the whole thing. See what Google sees and decide from there.
            </p>

            <div className="mx-auto mt-10 max-w-xl">
              <UrlInputHero />
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              Or{" "}
              <Link
                href="https://dailyaifixs.com"
                className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline"
              >
                read the blog first
                <ArrowRight size={14} />
              </Link>{" "}
              before you decide.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <div>© {new Date().getFullYear()} ContractorSiteAudit</div>
          <div className="flex items-center gap-6">
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
