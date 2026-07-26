export type PageSpeedResult = {
  score: number;        // 0-100, rounded
  lcpMs: number | null; // lab LCP in ms
  cls: number | null;   // lab CLS
  inpMs: number | null; // field INP percentile in ms, null when no field data
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getPath(value: unknown, path: string[]): unknown {
  let current: unknown = value;
  for (const key of path) {
    if (!isRecord(current)) return undefined;
    current = current[key];
  }
  return current;
}

function finiteOrNull(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

/** Runs a Google PageSpeed Insights v5 performance audit and extracts score, LCP, CLS, and field INP. */
export async function runPageSpeed(
  url: string,
  strategy: "mobile" | "desktop",
  apiKey: string,
  signal?: AbortSignal
): Promise<PageSpeedResult> {
  const params = new URLSearchParams({
    url,
    strategy,
    key: apiKey,
    category: "performance",
  });
  const res = await fetch(
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params.toString()}`,
    { signal }
  );
  if (!res.ok) {
    throw new Error(`PageSpeed API ${strategy} request failed with status ${res.status}`);
  }
  const data: unknown = await res.json();

  const rawScore = finiteOrNull(
    getPath(data, ["lighthouseResult", "categories", "performance", "score"])
  );
  if (rawScore === null) {
    throw new Error("PageSpeed API returned an unexpected response shape");
  }

  const lcp = finiteOrNull(
    getPath(data, ["lighthouseResult", "audits", "largest-contentful-paint", "numericValue"])
  );
  const cls = finiteOrNull(
    getPath(data, ["lighthouseResult", "audits", "cumulative-layout-shift", "numericValue"])
  );
  const inp = finiteOrNull(
    getPath(data, ["loadingExperience", "metrics", "INTERACTION_TO_NEXT_PAINT", "percentile"])
  );

  return {
    score: Math.round(rawScore * 100),
    lcpMs: lcp === null ? null : Math.round(lcp),
    cls: cls === null ? null : Math.round(cls * 1000) / 1000,
    inpMs: inp,
  };
}
