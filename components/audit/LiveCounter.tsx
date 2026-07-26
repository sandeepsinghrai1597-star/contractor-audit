import { getAuditCounts } from "@/lib/audit-store";

export const revalidate = 60;

export async function LiveCounter() {
  let counts = { today: 0, week: 0, total: 0 };
  try {
    counts = await getAuditCounts();
  } catch {
    // Silent: counters are a nice-to-have, not blocking.
  }

  const items: Array<{ label: string; value: number }> = [
    { label: "Audits today", value: counts.today },
    { label: "This week", value: counts.week },
    { label: "All-time", value: counts.total },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 sm:gap-8">
      {items.map((item) => (
        <div key={item.label} className="text-center">
          <div className="text-4xl font-bold tabular-nums tracking-tight sm:text-5xl">
            {item.value.toLocaleString("en-US")}
          </div>
          <div className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground sm:text-sm">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
