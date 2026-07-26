import Link from "next/link";
import { Clock } from "lucide-react";
import { LeadCaptureCard } from "@/components/audit/LeadCaptureCard";
import { SiteNav } from "@/components/audit/SiteNav";

type Search = { searchParams: Promise<{ url?: string }> };

export default async function LimitReachedPage({ searchParams }: Search) {
  const { url } = await searchParams;
  const auditedUrl = typeof url === "string" ? url : "";

  return (
    <main className="min-h-screen bg-background">
      <SiteNav ctaHref="/" />

      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-primary">
            <Clock size={26} strokeWidth={1.75} />
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
            You&apos;ve used your free audit today.
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base text-muted-foreground sm:text-lg">
            Drop your email to unlock unlimited audits during our launch week — no card, no charge.
          </p>
        </div>

        <div className="mt-10">
          <LeadCaptureCard auditedUrl={auditedUrl} variant="gate" />
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Or wait 24 hours for your next free audit — no signup needed.{" "}
          <Link href="/" className="font-medium text-primary underline-offset-4 hover:underline">
            Back to home
          </Link>
        </p>
      </section>
    </main>
  );
}
