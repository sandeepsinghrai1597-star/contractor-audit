"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LeadForm } from "@/components/lead-form";
import { Report } from "@/components/report";
import type { AuditResult } from "@/lib/types";

type Phase = "form" | "loading" | "report" | "gated";

export function AuditApp() {
  const [phase, setPhase] = useState<Phase>("form");
  const [url, setUrl] = useState("");
  const [audit, setAudit] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function runAudit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPhase("loading");

    let res: Response | null = null;
    try {
      res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
    } catch {
      res = null;
    }

    if (res?.ok) {
      const data = await res.json();
      setAudit(data.audit);
      setPhase("report");
      return;
    }

    if (res?.status === 429) {
      setPhase("gated");
      return;
    }

    setPhase("form");
    if (res?.status === 400) {
      setError("That doesn't look like a valid website address. Try something like riverahvac.com");
    } else if (res?.status === 504) {
      setError("The audit took longer than 30 seconds. That happens on very slow sites — please try again.");
    } else {
      setError("We couldn't complete the audit. Please try again in a minute.");
    }
  }

  function reset() {
    setAudit(null);
    setUrl("");
    setError(null);
    setPhase("form");
  }

  if (phase === "report" && audit) {
    return <Report audit={audit} onReset={reset} />;
  }

  if (phase === "gated") {
    return (
      <Card className="mx-auto max-w-xl">
        <CardHeader>
          <CardTitle>You&apos;ve used your free audit today</CardTitle>
          <CardDescription>
            Enter your email to unlock unlimited audits during our launch week.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LeadForm auditedUrl={url} submitLabel="Unlock unlimited audits" />
          <Button variant="ghost" size="sm" className="mt-4" onClick={reset}>
            ← Back
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-2xl text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Is your website costing you jobs?
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
        Free 30-second SEO and speed audit for HVAC, plumbing, roofing, and electrical contractor
        websites. See what Google sees — and what to fix first.
      </p>

      <form onSubmit={runAudit} className="mx-auto mt-8 flex max-w-lg gap-2">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="yourcompany.com"
          aria-label="Your website address"
          disabled={phase === "loading"}
          required
        />
        <Button type="submit" size="default" disabled={phase === "loading"}>
          {phase === "loading" ? "Auditing…" : "Audit my site"}
        </Button>
      </form>

      {error && <p className="mt-3 text-sm font-medium text-destructive">{error}</p>}

      {phase === "loading" && (
        <p className="mt-6 animate-pulse text-sm text-muted-foreground">
          Running Google PageSpeed tests on mobile and desktop — takes up to 30 seconds…
        </p>
      )}

      <p className="mt-10 text-xs text-muted-foreground">
        Free — no signup required. One audit per day during launch.
      </p>
    </div>
  );
}
