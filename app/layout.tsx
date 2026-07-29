import type { Metadata } from "next";
import { Inter_Tight, Instrument_Serif } from "next/font/google";
import "./globals.css";
import {
  SITE_URL,
  BRAND,
  TARGET_KEYWORDS,
  organizationSchema,
  websiteSchema,
} from "@/lib/seo";

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Contractor Website Audit — Free SEO & Speed Check in 30 Seconds",
    template: "%s · ContractorSiteAudit",
  },
  description:
    "Instant SEO, speed, and Google Business Profile audit for HVAC, plumbing, roofing, and electrical contractor websites. Score in your browser in 30 seconds. No email required.",
  keywords: TARGET_KEYWORDS,
  authors: [{ name: BRAND.name, url: SITE_URL }],
  creator: BRAND.name,
  publisher: BRAND.name,
  applicationName: BRAND.name,
  category: "SEO Software",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Contractor Website Audit — Free SEO & Speed Check in 30 Seconds",
    description:
      "Free 30-second SEO and speed audit for U.S. and Canadian home-service contractors. HVAC, plumbing, roofing, electrical. No email required.",
    url: SITE_URL,
    siteName: BRAND.name,
    type: "website",
    locale: "en_US",
    images: [{ url: BRAND.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contractor Website Audit — Free in 30 Seconds",
    description:
      "SEO, speed, and Google Business Profile audit for HVAC, plumbing, roofing, and electrical contractors. Score live in your browser.",
    images: [BRAND.ogImage],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      { ...organizationSchema(), "@id": `${SITE_URL}#organization` },
      { ...websiteSchema(), "@id": `${SITE_URL}#website` },
    ],
  };

  return (
    <html lang="en-US" className={`${interTight.variable} ${instrumentSerif.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
