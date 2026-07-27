"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function UrlInputHero({
  size = "lg",
  className,
  autoFocus = false,
  placeholder = "https://mikesplumbing.com",
}: {
  size?: "md" | "lg";
  className?: string;
  autoFocus?: boolean;
  placeholder?: string;
}) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/audit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    }).catch(() => null);

    if (res?.status === 429) {
      router.push(`/limit-reached?url=${encodeURIComponent(url)}`);
      return;
    }
    if (res?.ok) {
      const data = await res.json();
      if (data?.auditId) {
        router.push(`/audit/${data.auditId}`);
        return;
      }
    }
    setLoading(false);
    if (res?.status === 400) {
      setError("That doesn't look like a valid website. Try yourcompany.com");
    } else if (res?.status === 504) {
      setError("Your site took longer than 30 seconds. Try again.");
    } else {
      setError("Something went wrong. Try again in a minute.");
    }
  }

  const inputCls =
    size === "lg" ? "h-14 text-base sm:h-16 sm:text-lg" : "h-12 text-base";
  const btnCls =
    size === "lg" ? "h-11 px-5 text-sm sm:h-12 sm:px-6" : "h-10 px-4 text-sm";

  return (
    <div className={cn("w-full", className)}>
      <form
        onSubmit={submit}
        className={cn(
          "flex w-full items-center gap-2 rounded-lg border border-border bg-card pl-1 pr-1.5 focus-within:border-foreground",
          size === "lg" ? "sm:pl-2 sm:pr-2" : ""
        )}
      >
        <input
          type="text"
          inputMode="url"
          autoFocus={autoFocus}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
          placeholder={placeholder}
          aria-label="Your website address"
          required
          className={cn(
            "min-w-0 flex-1 rounded-md bg-transparent px-3 text-foreground placeholder:text-muted-foreground/70 focus:outline-none disabled:opacity-60",
            inputCls
          )}
        />
        <button
          type="submit"
          disabled={loading}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-md bg-primary font-medium text-primary-foreground transition-colors duration-100 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-80",
            btnCls
          )}
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="hidden sm:inline">Auditing…</span>
            </>
          ) : (
            <>
              <span>
                Audit<span className="hidden sm:inline"> my site</span>
              </span>
              <ArrowRight className="hidden h-5 w-5 sm:block" />
            </>
          )}
        </button>
      </form>
      {loading && (
        <p className="mt-3 text-center text-sm text-muted-foreground">
          Running Google PageSpeed on mobile and desktop — takes up to 30 seconds.
        </p>
      )}
      {error && (
        <p className="mt-3 text-center text-sm font-medium text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
