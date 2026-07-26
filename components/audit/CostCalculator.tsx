"use client";

import { useState } from "react";
import { DollarSign } from "lucide-react";

const BOUNCE_RATE = 0.4;

export function CostCalculator() {
  const [spend, setSpend] = useState(2500);
  const wasted = Math.round(spend * BOUNCE_RATE);
  const annual = wasted * 12;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-10">
      <label htmlFor="spend" className="block text-sm font-medium text-foreground">
        Your monthly ad spend (Google, Facebook, LSAs — whatever you run)
      </label>
      <div className="relative mt-3">
        <DollarSign
          size={20}
          strokeWidth={1.75}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          id="spend"
          type="number"
          min={0}
          max={100000}
          step={100}
          value={spend}
          onChange={(e) => setSpend(Math.max(0, Math.min(100000, Number(e.target.value) || 0)))}
          className="h-14 w-full rounded-xl border border-border bg-card pl-11 pr-4 text-lg font-medium tabular-nums focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-surface p-6">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Wasted every month
          </div>
          <div className="mt-2 text-4xl font-bold tabular-nums text-primary">
            ${wasted.toLocaleString("en-US")}
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            Assumes 40% of visitors leave without calling — the average for slow contractor sites.
          </div>
        </div>
        <div className="rounded-xl bg-surface p-6">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Wasted every year
          </div>
          <div className="mt-2 text-4xl font-bold tabular-nums text-foreground">
            ${annual.toLocaleString("en-US")}
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            Roughly one extra truck on the road, if your site converted like it should.
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        This uses a 40% assumption. Your actual number could be lower — or a lot worse.{" "}
        <a href="#audit" className="font-medium text-primary underline-offset-4 hover:underline">
          Run the audit to see your real bounce risk →
        </a>
      </p>
    </div>
  );
}
