import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function AuditCategoryCard({
  icon: Icon,
  title,
  description,
  beta,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  beta?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative rounded-lg border border-border bg-card p-6", className)}>
      {beta && (
        <span className="absolute right-4 top-4 rounded-md border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Beta
        </span>
      )}
      <Icon
        size={26}
        strokeWidth={1.5}
        style={{ color: "var(--primary)", opacity: 0.6 }}
      />
      <h3 className="mt-5 text-xl font-medium tracking-tight text-foreground">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}
