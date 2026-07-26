"use client";

import { useState } from "react";
import {
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Gauge,
  Smartphone,
  MapPin,
  Code2,
  ImageOff,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type CategoryIcon = "gauge" | "smartphone" | "map-pin" | "code" | "image-off";

const ICONS: Record<CategoryIcon, LucideIcon> = {
  gauge: Gauge,
  smartphone: Smartphone,
  "map-pin": MapPin,
  code: Code2,
  "image-off": ImageOff,
};

export function CategorySection({
  icon,
  title,
  status,
  headline,
  detail,
  fix,
  defaultOpen = false,
}: {
  icon: CategoryIcon;
  title: string;
  status: "good" | "warn" | "poor" | "info";
  headline: string;
  detail: string;
  fix?: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const Icon = ICONS[icon];
  const statusStyle =
    status === "good"
      ? { text: "text-good", chip: "bg-green-50 text-green-800", label: "Looks good" }
      : status === "warn"
        ? { text: "text-warn", chip: "bg-amber-50 text-amber-800", label: "Needs work" }
        : status === "poor"
          ? { text: "text-poor", chip: "bg-red-50 text-red-800", label: "Fix this" }
          : { text: "text-muted-foreground", chip: "bg-slate-100 text-slate-700", label: "No data" };

  return (
    <div className="rounded-2xl border border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
        aria-expanded={open}
      >
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
            statusStyle.chip
          )}
        >
          {status === "good" ? (
            <CheckCircle2 size={20} strokeWidth={1.75} />
          ) : status === "info" ? (
            <Icon size={20} strokeWidth={1.75} />
          ) : (
            <AlertCircle size={20} strokeWidth={1.75} />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="text-base font-semibold tracking-tight sm:text-lg">{title}</h3>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider",
                statusStyle.chip
              )}
            >
              {statusStyle.label}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{headline}</p>
        </div>
        <ChevronDown
          size={20}
          strokeWidth={1.75}
          className={cn("shrink-0 text-muted-foreground transition-transform", open && "rotate-180")}
        />
      </button>
      <div
        className={cn(
          "grid overflow-hidden px-5 transition-all duration-300 sm:px-6",
          open ? "grid-rows-[1fr] pb-5 sm:pb-6" : "grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0 space-y-3 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
          <p>{detail}</p>
          {fix && (
            <div className="rounded-lg bg-surface p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-foreground">
                What to do
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{fix}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
