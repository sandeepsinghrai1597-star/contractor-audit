import { ChevronDown } from "lucide-react";

export type FaqItem = { q: string; a: string };

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="border-t border-border">
      {items.map((item) => (
        <details
          key={item.q}
          className="group border-b border-border py-5 [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
            <span className="text-base font-semibold tracking-tight text-foreground">
              {item.q}
            </span>
            <ChevronDown
              size={20}
              strokeWidth={1.75}
              className="shrink-0 text-muted-foreground group-open:rotate-180"
            />
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
