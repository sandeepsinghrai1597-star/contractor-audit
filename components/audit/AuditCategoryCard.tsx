import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function AuditCategoryCard({
  icon: Icon,
  title,
  description,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-slate-300",
        className
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-primary">
        <Icon size={22} strokeWidth={1.75} />
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}
