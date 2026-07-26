import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: "ContractorSiteAudit — See what your website is costing you, in 30 seconds",
  description:
    "Instant SEO and speed audit for HVAC, plumbing, roofing, and electrical contractor websites. No signup. No PDF wait. Score live in your browser.",
  openGraph: {
    title: "ContractorSiteAudit",
    description: "See what your contractor website is costing you, in 30 seconds.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
