export type HtmlChecks = {
  /** False when the homepage could not be fetched; the three checks below are then unknown. */
  fetched: boolean;
  hasLocalBusinessSchema: boolean;
  hasViewportMeta: boolean;
  missingAltCount: number;
};

// LocalBusiness plus the schema.org subtypes home-service contractors actually use.
const LOCAL_BUSINESS_TYPES = new Set([
  "LocalBusiness",
  "HomeAndConstructionBusiness",
  "GeneralContractor",
  "HVACBusiness",
  "Plumber",
  "Electrician",
  "RoofingContractor",
  "HousePainter",
  "Locksmith",
  "MovingCompany",
  "PestControl",
]);

function containsLocalBusinessType(node: unknown): boolean {
  if (Array.isArray(node)) {
    return node.some(containsLocalBusinessType);
  }
  if (node !== null && typeof node === "object") {
    const type = (node as Record<string, unknown>)["@type"];
    const types = Array.isArray(type) ? type : [type];
    if (types.some((t) => typeof t === "string" && LOCAL_BUSINESS_TYPES.has(t))) {
      return true;
    }
    return Object.values(node).some(containsLocalBusinessType);
  }
  return false;
}

function hasLocalBusinessJsonLd(html: string): boolean {
  const scripts = html.matchAll(
    /<script[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  );
  for (const match of scripts) {
    try {
      if (containsLocalBusinessType(JSON.parse(match[1]))) return true;
    } catch {
      // Malformed JSON-LD block — skip it.
    }
  }
  return false;
}

function countMissingAlts(html: string): number {
  const imgs = html.match(/<img\b[^>]*>/gi) ?? [];
  return imgs.filter((tag) => {
    const alt = tag.match(/\balt\s*=\s*("([^"]*)"|'([^']*)')/i);
    if (!alt) return true;
    return (alt[2] ?? alt[3] ?? "").trim() === "";
  }).length;
}

/** Fetches the homepage and runs the three static SEO checks. */
export async function runHtmlChecks(url: string, signal?: AbortSignal): Promise<HtmlChecks> {
  let html: string;
  try {
    const res = await fetch(url, {
      signal,
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; ContractorSiteAudit/1.0; +https://contractorsiteaudit.com)",
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    html = await res.text();
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") throw err;
    return { fetched: false, hasLocalBusinessSchema: false, hasViewportMeta: false, missingAltCount: 0 };
  }

  return {
    fetched: true,
    hasLocalBusinessSchema: hasLocalBusinessJsonLd(html),
    hasViewportMeta: /<meta[^>]*name\s*=\s*["']viewport["'][^>]*>/i.test(html),
    missingAltCount: countMissingAlts(html),
  };
}
