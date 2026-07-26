"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";

const SIZES: Record<Size, { px: number; stroke: number; text: string; label: string }> = {
  sm: { px: 96, stroke: 8, text: "text-2xl", label: "text-[10px]" },
  md: { px: 160, stroke: 12, text: "text-5xl", label: "text-xs" },
  lg: { px: 240, stroke: 16, text: "text-7xl", label: "text-sm" },
};

function colorFor(score: number) {
  if (score >= 90) return "var(--good)";
  if (score >= 50) return "var(--warn)";
  return "var(--poor)";
}

export function ScoreDial({
  score,
  label,
  size = "md",
  animate = true,
  className,
}: {
  score: number;
  label?: string;
  size?: Size;
  animate?: boolean;
  className?: string;
}) {
  const s = SIZES[size];
  const radius = (s.px - s.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const target = Math.max(0, Math.min(100, score));

  const [display, setDisplay] = useState(animate ? 0 : target);
  const [bounced, setBounced] = useState(!animate);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!animate) return;
    const start = performance.now();
    const duration = 900;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(target * eased));
      if (t < 1) {
        raf.current = requestAnimationFrame(step);
      } else {
        setBounced(true);
      }
    };
    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [target, animate]);

  const color = colorFor(target);
  const offset = circumference - (display / 100) * circumference;

  return (
    <div
      className={cn("relative inline-flex flex-col items-center", className)}
      style={{ width: s.px }}
    >
      <svg width={s.px} height={s.px} viewBox={`0 0 ${s.px} ${s.px}`} className="-rotate-90">
        <circle
          cx={s.px / 2}
          cy={s.px / 2}
          r={radius}
          stroke="var(--border)"
          strokeWidth={s.stroke}
          fill="none"
        />
        <circle
          cx={s.px / 2}
          cy={s.px / 2}
          r={radius}
          stroke={color}
          strokeWidth={s.stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center transition-transform duration-150",
          bounced ? "scale-100" : "scale-95"
        )}
      >
        <span
          className={cn("font-bold tabular-nums leading-none", s.text)}
          style={{ color }}
        >
          {display}
        </span>
        {label && (
          <span
            className={cn(
              "mt-1 font-medium uppercase tracking-wider text-muted-foreground",
              s.label
            )}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
