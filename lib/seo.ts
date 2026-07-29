/**
 * SEO helpers — site URL, structured data builders, keyword targets.
 * All schema types follow schema.org and Google's Rich Results requirements.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://blue-lark-181638.hostingersite.com";

export const BRAND = {
  name: "ContractorSiteAudit",
  legalName: "ContractorSiteAudit",
  tagline:
    "Instant SEO, speed, and Google Business Profile audit for U.S. and Canadian home-service contractors.",
  email: "hello@contractorsiteaudit.com",
  logo: `${SITE_URL}/icon`,
  ogImage: `${SITE_URL}/api/og`,
  founding: "2026",
};

/**
 * Primary keyword targets. These are informed guesses at low-competition
 * terms in the contractor SEO/audit niche; validate real volume + difficulty
 * in Google Keyword Planner, Ahrefs, or Ubersuggest before running paid ads.
 */
export const TARGET_KEYWORDS = [
  // Primary — landing page + meta title
  "contractor website audit",
  "SEO audit for contractors",
  "free website audit tool for contractors",
  // Trade-specific long-tail (higher volume, still low competition)
  "HVAC website audit",
  "plumber website SEO checker",
  "roofing website speed test",
  "electrician website audit",
  // Local / GBP
  "local SEO audit for home services",
  "Google Business Profile audit tool",
  // Product category
  "contractor Core Web Vitals check",
  "small business website speed test",
];

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    legalName: BRAND.legalName,
    url: SITE_URL,
    logo: BRAND.logo,
    email: BRAND.email,
    foundingDate: BRAND.founding,
    description: BRAND.tagline,
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: BRAND.email,
      contactType: "customer support",
      availableLanguage: ["English"],
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND.name,
    url: SITE_URL,
    inLanguage: "en-US",
    publisher: { "@id": `${SITE_URL}#organization` },
  };
}

export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: BRAND.name,
    url: SITE_URL,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "SEOSoftware",
    operatingSystem: "Web",
    description: BRAND.tagline,
    audience: {
      "@type": "Audience",
      audienceType:
        "Home-service contractors — HVAC, plumbing, roofing, electrical, and other trades in the United States and Canada",
    },
    offers: [
      {
        "@type": "Offer",
        name: "Free tier",
        price: "0",
        priceCurrency: "USD",
        description: "9 audits per IP per 24 hours, in-browser score, optional PDF report by email.",
      },
      {
        "@type": "Offer",
        name: "Pro tier",
        price: "29",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "29",
          priceCurrency: "USD",
          referenceQuantity: {
            "@type": "QuantitativeValue",
            value: 1,
            unitCode: "MON",
          },
        },
        description:
          "Unlimited audits, weekly monitoring with change alerts, AI Search citation tracking, public score page.",
      },
    ],
    featureList: [
      "Google PageSpeed Insights mobile score",
      "Google PageSpeed Insights desktop score",
      "Core Web Vitals — LCP, CLS, INP",
      "LocalBusiness schema markup detection",
      "Mobile viewport meta tag check",
      "Missing image alt tag count",
      "Local SEO and Google Business Profile signals",
      "AI Search Visibility (ChatGPT, Gemini, Perplexity citation check — Beta)",
    ],
    provider: { "@id": `${SITE_URL}#organization` },
  };
}

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Contractor website audit",
    serviceType: "SEO and website performance audit",
    provider: { "@id": `${SITE_URL}#organization` },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
    ],
    audience: {
      "@type": "Audience",
      audienceType:
        "HVAC contractors, plumbers, roofers, electricians, and other home-service businesses",
    },
    offers: [
      {
        "@type": "Offer",
        name: "Instant free audit",
        price: "0",
        priceCurrency: "USD",
      },
    ],
    description:
      "30-second in-browser audit of a contractor website covering Google PageSpeed, Core Web Vitals, local SEO signals, schema markup, conversion basics, and AI Search visibility.",
  };
}

export function faqPageSchema(items: ReadonlyArray<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbSchema(items: ReadonlyArray<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Emits a JSON-LD graph containing multiple entities linked by @id. */
export function graphSchema(entities: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": entities.map((e, i) => {
      if (i === 0) {
        return { ...e, "@id": `${SITE_URL}#organization` };
      }
      return e;
    }),
  };
}
