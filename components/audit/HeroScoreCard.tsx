"use client";

import { useEffect, useRef, useState } from "react";

type CategoryRow = { label: string; score: number };

const DEFAULTS: CategoryRow[] = [
  { label: "Technical SEO", score: 72 },
  { label: "Speed & Vitals", score: 41 },
  { label: "Mobile experience", score: 88 },
  { label: "Local SEO", score: 45 },
];

function letterGrade(score: number): string {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

function colorForScore(score: number): string {
  return score >= 70 ? "var(--good)" : "var(--primary)";
}

function CountUp({ to, duration = 700 }: { to: number; duration?: number }) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(to * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [to, duration]);
  return <>{value}</>;
}

export function HeroScoreCard({
  url = "mikesplumbing.com",
  overallScore = 62,
  categories = DEFAULTS,
  animate = true,
}: {
  url?: string;
  overallScore?: number;
  categories?: CategoryRow[];
  animate?: boolean;
}) {
  const grade = letterGrade(overallScore);
  const overallColor = colorForScore(overallScore);

  return (
    <div className="w-full rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ background: "var(--primary)" }} />
          <span className="font-medium text-foreground">{url}</span>
        </div>
        <span className="uppercase tracking-widest text-muted-foreground">
          Sample report
        </span>
      </div>

      <div className="px-6 pb-6 pt-8 sm:px-8 sm:pb-8 sm:pt-10">
        <div className="flex items-end gap-4">
          <span
            className="font-serif text-7xl leading-none tabular-nums sm:text-8xl"
            style={{ color: overallColor }}
          >
            {animate ? <CountUp to={overallScore} /> : overallScore}
          </span>
          <span className="pb-2 text-base text-muted-foreground">/ 100</span>
          <span
            className="ml-auto flex h-14 w-14 items-center justify-center rounded-md border font-serif text-4xl"
            style={{ borderColor: overallColor, color: overallColor }}
          >
            {grade}
          </span>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Overall audit score</p>
      </div>

      <div className="border-t border-border px-6 py-6 sm:px-8">
        <div className="space-y-4">
          {categories.map((c) => {
            const color = colorForScore(c.score);
            return (
              <div key={c.label} className="grid grid-cols-[1fr_auto] items-center gap-x-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm text-foreground">{c.label}</span>
                  <div className="h-[3px] w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${c.score}%`, background: color }}
                    />
                  </div>
                </div>
                <span
                  className="tabular-nums text-sm font-medium"
                  style={{ color }}
                >
                  {c.score}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
