"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export type FaqItem = { q: string; a: string };

export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-card">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-surface"
              aria-expanded={isOpen}
            >
              <span className="text-base font-semibold tracking-tight">{item.q}</span>
              {isOpen ? (
                <Minus size={20} strokeWidth={1.75} className="shrink-0 text-muted-foreground" />
              ) : (
                <Plus size={20} strokeWidth={1.75} className="shrink-0 text-muted-foreground" />
              )}
            </button>
            <div
              className={cn(
                "grid overflow-hidden px-6 transition-all duration-300",
                isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
              )}
            >
              <div className="min-h-0 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
