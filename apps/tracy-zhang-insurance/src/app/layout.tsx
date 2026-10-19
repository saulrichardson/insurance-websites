import type { Metadata } from "next";
import { Geist_Mono, Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "@/components/SiteChrome.css";

import { SiteFrame } from "@/components/SiteFrame";
import { SiteTelemetry } from "@/components/SiteTelemetry";
import { VisitorCapture } from "@/components/VisitorCapture";
import { site, siteUrl } from "@/config/site";
import { getLocalBusinessSchema } from "@/lib/schema";
import { getMarketUrl, getRequestMarket } from "@/lib/market";
import { getOfficeById } from "@insurance-websites/domain";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | California Insurance Agency`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    title: `${site.name} | California Insurance Agency`,
    description: site.description,
    siteName: site.name,
  },
  icons: {
    icon: [
      { url: "/homepage-assets/mark.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
    shortcut: "/homepage-assets/mark.svg",
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "zh-Hans": "/zh",
      "x-default": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const market = await getRequestMarket();
  const office = getOfficeById(market.primaryOfficeId);
  const schema = getLocalBusinessSchema({
    market,
    office,
    url: getMarketUrl(market.id),
  });

  return (
    <html lang={site.locale}>
      <body
        className={`${plusJakartaSans.variable} ${geistMono.variable} ${instrumentSerif.variable} bg-[var(--background)] text-[var(--ink)] antialiased`}
      >
        <a
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:shadow-lg"
          href="#main"
        >
          Skip to content
        </a>
        <SiteFrame market={market} office={office}>{children}</SiteFrame>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <SiteTelemetry />
        <VisitorCapture marketId={market.id} officeId={office.id} />
      </body>
    </html>
  );
}
