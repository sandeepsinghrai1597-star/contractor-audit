import Link from "next/link";
import { Logo } from "@/components/audit/Logo";

export function SiteNav({ ctaHref = "#audit" }: { ctaHref?: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="ContractorSiteAudit — home"
        >
          <Logo />
        </Link>
        <Link
          href={ctaHref}
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors duration-100 hover:bg-primary/90"
        >
          Audit my site
        </Link>
      </div>
    </header>
  );
}
