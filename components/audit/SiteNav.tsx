"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/audit/Logo";

type AuditsLeft = { remaining: number; max: number };

function AuditsLeftBadge() {
  const [state, setState] = useState<AuditsLeft | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/audits-remaining", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: unknown) => {
        if (cancelled) return;
        if (
          data &&
          typeof (data as AuditsLeft).remaining === "number" &&
          typeof (data as AuditsLeft).max === "number"
        ) {
          setState({
            remaining: (data as AuditsLeft).remaining,
            max: (data as AuditsLeft).max,
          });
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (!state) return null;

  const { remaining, max } = state;
  const isEmpty = remaining === 0;
  const isLow = remaining > 0 && remaining <= 3;

  return (
    <span
      className="hidden items-center gap-1.5 text-xs font-medium text-muted-foreground sm:inline-flex"
      aria-live="polite"
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{
          background: isEmpty
            ? "var(--primary)"
            : isLow
              ? "var(--warn)"
              : "var(--good)",
        }}
      />
      {isEmpty ? (
        <>Free limit reached today</>
      ) : (
        <>
          <span className="tabular-nums text-foreground">
            {remaining} / {max}
          </span>
          <span>audits left today</span>
        </>
      )}
    </span>
  );
}

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
        <div className="flex items-center gap-4 sm:gap-5">
          <AuditsLeftBadge />
          <Link
            href={ctaHref}
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors duration-100 hover:bg-primary/90"
          >
            Audit my site
          </Link>
        </div>
      </div>
    </header>
  );
}
