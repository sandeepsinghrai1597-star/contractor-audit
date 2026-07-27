import { cn } from "@/lib/utils";

export function LogoMark({ className, size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="6" fill="#D64A1F" />
      <path
        d="M16 8a8 8 0 1 0 8 8"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="16" cy="16" r="1.75" fill="white" />
      <path d="M16 16 L21 11" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({
  className,
  size = 22,
  showWordmark = true,
}: {
  className?: string;
  size?: number;
  showWordmark?: boolean;
}) {
  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark size={size} />
      {showWordmark && (
        <span className="text-[15px] font-medium tracking-tight text-foreground">
          ContractorSiteAudit
        </span>
      )}
    </div>
  );
}
