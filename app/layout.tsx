import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ContractorSiteAudit — Free SEO & Speed Audit for Contractor Websites",
  description:
    "Instant Google PageSpeed, Core Web Vitals, and local SEO audit for HVAC, plumbing, roofing, and electrical contractor websites.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased font-sans">{children}</body>
    </html>
  );
}
