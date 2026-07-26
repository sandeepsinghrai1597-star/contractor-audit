import { Check, Minus, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Cell = { kind: "yes"; text?: string } | { kind: "no"; text?: string } | { kind: "neutral"; text: string };

function CellView({ cell, highlight }: { cell: Cell; highlight?: boolean }) {
  const iconClass = highlight ? "text-primary" : "text-slate-400";
  if (cell.kind === "yes") {
    return (
      <div className="flex items-center gap-2 text-sm">
        <Check size={18} strokeWidth={2} className={iconClass} />
        <span className={cn(highlight ? "font-medium text-foreground" : "text-muted-foreground")}>
          {cell.text ?? "Yes"}
        </span>
      </div>
    );
  }
  if (cell.kind === "no") {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <X size={18} strokeWidth={2} className="text-slate-400" />
        <span>{cell.text ?? "No"}</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Minus size={18} strokeWidth={2} className="text-slate-400" />
      <span>{cell.text}</span>
    </div>
  );
}

export function ComparisonRow({
  label,
  us,
  agency,
  google,
  isHeader,
}: {
  label: string;
  us: Cell;
  agency: Cell;
  google: Cell;
  isHeader?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-[1.4fr_1fr_1fr_1fr] items-center gap-4 border-b border-border px-4 py-4 sm:px-6",
        isHeader && "bg-surface text-xs font-semibold uppercase tracking-wider text-muted-foreground"
      )}
    >
      <div className={cn(isHeader ? "" : "text-sm font-medium text-foreground")}>{label}</div>
      <div className={cn(isHeader && "text-primary")}>{isHeader ? "ContractorSiteAudit" : <CellView cell={us} highlight />}</div>
      <div>{isHeader ? "Agency audit" : <CellView cell={agency} />}</div>
      <div>{isHeader ? "PageSpeed Insights" : <CellView cell={google} />}</div>
    </div>
  );
}
