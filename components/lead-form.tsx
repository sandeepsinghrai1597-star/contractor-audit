"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LeadForm({ auditedUrl, submitLabel }: { auditedUrl: string; submitLabel: string }) {
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
      <p className="text-sm font-medium text-green-700">
        You&apos;re on the list! We&apos;ll be in touch at {email}.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-3">
      <div className="grid gap-1.5">
        <Label htmlFor="lead-name">Your name</Label>
        <Input
          id="lead-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Mike Rivera"
          required
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="lead-email">Email</Label>
        <Input
          id="lead-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="mike@riverahvac.com"
          required
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="lead-business">Business name</Label>
        <Input
          id="lead-business"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          placeholder="Rivera HVAC"
          required
        />
      </div>
      <div className="sm:col-span-3">
        <Button type="submit" disabled={status === "saving"} className="w-full sm:w-auto">
          {status === "saving" ? "Saving…" : submitLabel}
        </Button>
        {status === "error" && (
          <p className="mt-2 text-sm text-destructive">
            Something went wrong saving your details. Please try again.
          </p>
        )}
      </div>
    </form>
  );
}
