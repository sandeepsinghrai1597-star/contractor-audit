import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";
import { SiteNav } from "@/components/audit/SiteNav";
import { Logo } from "@/components/audit/Logo";

export const metadata = {
  title: "Payment confirmation — ContractorSiteAudit",
  description:
    "If your PayPal payment went through, we'll activate your Pro account manually within 24 hours.",
};

export default function ProThanksPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteNav ctaHref="/" />

      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Pro upgrade
          </p>
          <h1 className="mt-4 font-sans text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            If your PayPal payment went through, we&apos;ll email you.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            This page is shown after every visit to our PayPal checkout — including if you
            clicked <span className="font-medium text-foreground">Continue Shopping</span> or
            closed the window without paying. Visiting this page does not grant Pro access.
          </p>
        </div>

        <div className="mt-10 rounded-lg border border-border bg-card p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md"
              style={{ background: "var(--muted)", color: "var(--primary)" }}
            >
              <Mail size={20} strokeWidth={1.75} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">
                If you completed the payment
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                We activate Pro accounts manually during launch week. You&apos;ll get an
                email from{" "}
                <span className="text-foreground">hello@contractorsiteaudit.com</span>{" "}
                within 24 hours at the address on your PayPal receipt. If you don&apos;t
                hear from us, forward your PayPal receipt to that address and we&apos;ll sort
                it out same day.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-border bg-card p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md"
              style={{ background: "var(--muted)", color: "var(--primary)" }}
            >
              <ArrowLeft size={20} strokeWidth={1.75} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">
                If you didn&apos;t complete the payment
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                No account will be created and you won&apos;t be charged. Head back to the
                landing page and either run your free daily audit or restart the Pro
                checkout when you&apos;re ready.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors duration-100 hover:bg-muted"
          >
            Back to home
          </Link>
          <a
            href="https://www.paypal.com/ncp/payment/G6BNL2M7B5VEE"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors duration-100 hover:bg-primary/90"
          >
            Retry Pro checkout
          </a>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-4 sm:px-6">
          <Logo size={20} />
          <span className="text-xs text-muted-foreground">© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </main>
  );
}
