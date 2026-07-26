import type { PageSpeedResult } from "@/lib/pagespeed";
import type { HtmlChecks } from "@/lib/html-checks";

export type AuditResult = {
  url: string;
  mobile: PageSpeedResult;
  desktop: PageSpeedResult;
  checks: HtmlChecks;
};
