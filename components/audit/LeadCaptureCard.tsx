"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function LeadCaptureCard({
  auditedUrl,
  variant = "report",
}: {
  auditedUrl: string;
  variant?: "report" | "gate";
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, businessName, auditedUrl }),
    }).catch(() => null);
    setStatus(res?.ok ? "done" : "error");
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-good/30 bg-green-50/60 p-8 text-center">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-good text-white">
          <Check size={20} strokeWidth={2.25} />
        </div>
        <h3 className="mt-4 text-lg font-semibold">You&apos;re on the list.</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Full PDF report is on its way to {email}.
        </p>
      </div>
    );
  }

  const headline =
    variant === "gate"
      ? "Unlock unlimited audits this launch week"
      : "Get the full PDF report emailed to you";
  const sub =
    variant === "gate"
      ? "Nine free audits per day is our launch limit. Drop your details to run more."
      : "Every issue we found, prioritized, with plain-English fixes you can hand to any web person.";

  return (
    <div
      className={cn(
        "rounded-2xl border p-6 sm:p-8",
        variant === "gate"
          ? "border-border bg-card"
          : "border-primary/30 bg-orange-50/40"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Mail size={20} strokeWidth={1.75} />
        </div>
        <div>
          <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{headline}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
        </div>
      </div>

      <form onSubmit={submit} className="mt-6 grid gap-3 sm:grid-cols-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          className="h-11 rounded-lg border border-border bg-card px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@yourcompany.com"
          required
          className="h-11 rounded-lg border border-border bg-card px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        />
        <input
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          placeholder="Business name"
          required
          className="h-11 rounded-lg border border-border bg-card px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        />
        <button
          type="submit"
          disabled={status === "saving"}
          className="col-span-full h-11 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-wait disabled:opacity-80 sm:col-span-full"
        >
          {status === "saving"
            ? "Saving…"
            : variant === "gate"
              ? "Unlock unlimited audits"
              : "Email me the full report"}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-3 text-sm font-medium text-destructive" role="alert">
          Couldn&apos;t save that — please try again.
        </p>
      )}
      <p className="mt-4 text-xs text-muted-foreground">
        No spam. We use your email for the report and occasional product updates. Unsubscribe with one click.
      </p>
    </div>
  );
}
