import Link from "next/link";
import { Check } from "lucide-react";
import { SiteNav } from "@/components/audit/SiteNav";
import { Logo } from "@/components/audit/Logo";

export const metadata = {
  title: "Thanks for going Pro — ContractorSiteAudit",
  description: "Your Pro payment is in. We activate manually within 24 hours during launch week.",
};

export default function ProThanksPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteNav ctaHref="/" />

      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-good text-white">
            <Check size={28} strokeWidth={2.25} />
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Thanks for going Pro.
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base text-muted-foreground sm:text-lg">
            Your payment is in. We&apos;re activating Pro accounts manually during launch
            week — you&apos;ll get an email at the address you used on PayPal within 24
            hours confirming your account is live.
          </p>
        </div>

        <div className="mt-10 space-y-4 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <div className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              1
            </span>
            <div>
              <div className="text-sm font-semibold">Watch for the confirmation email</div>
              <p className="mt-1 text-sm text-muted-foreground">
                It comes from hello@contractorsiteaudit.com. Check spam if you don&apos;t see
                it by tomorrow.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              2
            </span>
            <div>
              <div className="text-sm font-semibold">Keep using the free audit</div>
              <p className="mt-1 text-sm text-muted-foreground">
                Your one-per-day free audit still works exactly as it did — Pro just adds
                unlimited runs plus weekly monitoring once it&apos;s switched on.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              3
            </span>
            <div>
              <div className="text-sm font-semibold">Something wrong? Email us</div>
              <p className="mt-1 text-sm text-muted-foreground">
                Reach out to{" "}
                <a
                  href="mailto:hello@contractorsiteaudit.com"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  hello@contractorsiteaudit.com
                </a>{" "}
                with your PayPal receipt if you don&apos;t hear from us in 24 hours.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-card px-6 text-sm font-semibold transition-colors hover:bg-surface"
          >
            Back to home
          </Link>
        </div>
      </section>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-4 sm:px-6">
          <Logo size={20} />
          <span className="text-xs text-muted-foreground">© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </main>
  );
}
