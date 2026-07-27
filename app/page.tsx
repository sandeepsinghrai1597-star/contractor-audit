import Link from "next/link";
import { Wrench, Gauge, Smartphone, MapPin, PhoneCall, Sparkles } from "lucide-react";
import { UrlInputHero } from "@/components/audit/UrlInputHero";
import { AuditCategoryCard } from "@/components/audit/AuditCategoryCard";
import { HeroScoreCard } from "@/components/audit/HeroScoreCard";
import { Faq } from "@/components/audit/Faq";
import { SiteNav } from "@/components/audit/SiteNav";
import { Logo } from "@/components/audit/Logo";

const PRO_PRICE = "$29";

const CATEGORIES = [
  {
    icon: Wrench,
    title: "Technical SEO",
    description:
      "Title tags, meta descriptions, canonical URLs, and the structured data that decides whether you show up at all.",
  },
  {
    icon: Gauge,
    title: "Speed & Core Web Vitals",
    description:
      "Loading, stability, tap responsiveness. Every second past three, one visitor in three is calling someone else.",
  },
  {
    icon: Smartphone,
    title: "Mobile experience",
    description:
      "Most contractor searches happen on a phone. If the site is zoomed out or the buttons are hard to tap, the call goes elsewhere.",
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
      "Phone number above the fold. Click-to-call that works. A contact form that doesn't need scrolling. The mechanics that turn a visit into a job.",
  },
  {
    icon: Sparkles,
    title: "AI Search visibility",
    beta: true,
    description:
      "ChatGPT, Gemini, and Perplexity answer 'best HVAC in [city]' before Google gets a chance. We check whether their answers cite you.",
  },
];

const COMPARE_ROWS = [
  { label: "Turnaround", them: "24–48 hours by email", us: "About 30 seconds, in your browser" },
  { label: "What they need first", them: "Name, email, phone, service area", us: "Just your URL" },
  { label: "What they're selling", them: "A $500–$2,000/month retainer", us: "A $29/month monitoring tool" },
  { label: "Who fixes it", them: "They will — on retainer", us: "Your developer, using our PDF checklist" },
  { label: "After the audit", them: "A sales call", us: "You keep using the free daily audit" },
];

const FAQ = [
  {
    q: "Is this really free?",
    a: "Yes. Nine audits per IP per day, no signup, no card. The paid tier is the weekly monitoring, not the audit itself — running an audit stays free forever.",
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
    q: "How accurate is the AI Search visibility check?",
    a: "It's Beta. LLM answers vary between runs and personalize by geography, so we surface the raw citations we saw rather than a single score. Treat it as a directional signal, not a definitive ranking. We're logging citations over time on the Pro tier so the picture gets sharper the longer you monitor.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <SiteNav />

      {/* 1. HERO — two-column desktop, stacked mobile */}
      <section id="audit" className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 lg:items-center">
            {/* left column: copy + input */}
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                For HVAC · Plumbing · Roofing · Electrical
              </p>
              <h1 className="mt-5 font-sans text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
                See your website&apos;s{" "}
                <span className="font-serif italic" style={{ color: "var(--primary)" }}>
                  real
                </span>{" "}
                score in about 30 seconds.
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
                Paste your URL. Get a full SEO and speed audit in your browser — no email
                required to see the score.
              </p>
              <div className="mt-8">
                <UrlInputHero placeholder="https://mikesplumbing.com" />
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs font-medium text-muted-foreground">
                <span>No email required</span>
                <span aria-hidden className="text-border">·</span>
                <span>No sales calls</span>
                <span aria-hidden className="text-border">·</span>
                <span>Free tier: 9 audits per day</span>
              </div>
            </div>

            {/* right column: score card mock */}
            <div className="mt-60 lg:mt-0 lg:pl-6">
              <HeroScoreCard />
            </div>
          </div>
        </div>
      </section>

      {/* 2. SCORE PREVIEW — same card, restated */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              The report
            </p>
            <h2 className="mt-4 font-sans text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              This is what appears the moment your audit finishes.
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              No 24-hour wait. No PDF gate. No sales rep will follow up.
            </p>
          </div>
          <div className="mt-12">
            <HeroScoreCard animate={false} />
          </div>
        </div>
      </section>

      {/* 3. WHAT WE CHECK */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              What we check
            </p>
            <h2 className="mt-4 font-sans text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              5 checks across 6 categories.
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Written for a contractor, not a marketer.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat) => (
              <AuditCategoryCard
                key={cat.title}
                icon={cat.icon}
                title={cat.title}
                description={cat.description}
                beta={cat.beta}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              How it works
            </p>
            <h2 className="mt-4 font-sans text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Three steps. No fourth step where we book a call.
            </h2>
          </div>
          <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-12">
            {[
              { n: "01", t: "Paste your URL", d: "One field. No name, no phone, no service area." },
              { n: "02", t: "See your score in the browser", d: "The report renders in about 30 seconds. Read it, screenshot it, share it." },
              { n: "03", t: "Optional: email the PDF", d: "If you want the prioritized fix checklist as a PDF, give us an email. Otherwise, you're done." },
            ].map((s) => (
              <div key={s.n}>
                <span className="font-serif text-5xl leading-none text-foreground/25 tabular-nums">
                  {s.n}
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                  {s.t}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TOOL, NOT AGENCY */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Tool, not agency
            </p>
            <h2 className="mt-4 font-sans text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              This isn&apos;t a sales funnel.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Every other &quot;free audit&quot; for contractors is bait for a monthly
              retainer. That is why they email the PDF a day later — they need the
              follow-up call. ContractorSiteAudit is a scoring tool. There is no retainer
              to sell.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-lg border border-border bg-card">
            <div className="grid grid-cols-2 border-b border-border">
              <div className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                Every other free audit
              </div>
              <div className="border-l border-border bg-background px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground">
                ContractorSiteAudit
              </div>
            </div>
            {COMPARE_ROWS.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-2 ${
                  i < COMPARE_ROWS.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="px-5 py-4">
                  <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                    {row.label}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">{row.them}</div>
                </div>
                <div className="border-l border-border bg-background px-5 py-4">
                  <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                    {row.label}
                  </div>
                  <div className="mt-1 text-sm text-foreground">{row.us}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRICING */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Pricing
            </p>
            <h2 className="mt-4 font-sans text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              An audit is a photo. Monitoring is a smoke detector.
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              The free tier tells you what&apos;s wrong today. Pro tells you the day it
              breaks again.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <div className="flex flex-col rounded-lg border border-border bg-card p-8">
              <h3 className="text-lg font-medium text-foreground">Free</h3>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-serif text-6xl leading-none tabular-nums text-foreground">
                  $0
                </span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Everything you need to check your site as often as you need to.
              </p>
              <ul className="mt-8 space-y-3 border-l border-border pl-4 text-[15px] leading-relaxed text-muted-foreground">
                <li>9 audits per IP address per 24 hours</li>
                <li>Full in-browser score across all 6 categories</li>
                <li>Shareable score card URL</li>
                <li>Optional PDF fix checklist by email</li>
              </ul>
              <Link
                href="#audit"
                className="mt-10 inline-flex h-11 items-center justify-center rounded-md border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors duration-100 hover:bg-muted"
              >
                Run a free audit
              </Link>
            </div>

            <div
              className="flex flex-col rounded-lg border bg-card p-8"
              style={{ borderColor: "var(--primary)" }}
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-medium text-foreground">Pro</h3>
                <span
                  className="text-[11px] font-semibold uppercase tracking-widest"
                  style={{ color: "var(--primary)" }}
                >
                  Monitoring
                </span>
              </div>
              <div className="mt-6 flex items-baseline gap-2">
                <span
                  className="font-serif text-6xl leading-none tabular-nums"
                  style={{ color: "var(--primary)" }}
                >
                  {PRO_PRICE}
                </span>
                <span className="text-sm text-muted-foreground">/ month</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Weekly monitoring so a regression doesn&apos;t cost you a month of jobs.
              </p>
              <ul
                className="mt-8 space-y-3 border-l pl-4 text-[15px] leading-relaxed text-muted-foreground"
                style={{ borderColor: "var(--primary)" }}
              >
                <li>Unlimited audits, any URL, any time</li>
                <li>Automatic weekly re-scans</li>
                <li>Email alert the day a score drops</li>
                <li>AI Search citation tracking over time</li>
                <li>Public score page for your Google Business Profile</li>
              </ul>
              <a
                href="https://www.paypal.com/ncp/payment/G6BNL2M7B5VEE"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors duration-100 hover:bg-primary/90"
              >
                Upgrade to Pro
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              FAQ
            </p>
            <h2 className="mt-4 font-sans text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Questions contractors actually ask.
            </h2>
          </div>
          <div className="mt-10">
            <Faq items={FAQ} />
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-background py-8">
        <div className="mx-auto flex max-w-6xl flex-col-reverse items-center justify-between gap-4 px-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <Logo size={20} />
          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} ContractorSiteAudit</span>
            <Link href="/privacy" className="transition-colors duration-100 hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors duration-100 hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
