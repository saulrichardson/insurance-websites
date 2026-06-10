import type { Metadata } from "next";
import { Cormorant_Garamond, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { SiteTelemetry } from "@/components/site-telemetry";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPersonSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { getSiteUrl } from "@/lib/site-url";

const bodoni = Cormorant_Garamond({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function getMetadataBase() {
  return getSiteUrl();
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: `${site.agent.name} | California Insurance Advisor`,
    template: `%s | ${site.brand.shortName}`,
  },
  description: `${site.agent.name} provides local insurance guidance for California families, property owners, and business owners.`,
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
  openGraph: {
    title: `${site.agent.name} | California Insurance Advisor`,
    description: `Clear insurance guidance, multilingual support, and direct office contact for California clients.`,
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.agent.name} | California Insurance Advisor`,
    description: `Local insurance guidance for California families, property owners, and business owners.`,
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      {
        url: "/favicon.ico",
        type: "image/x-icon",
        sizes: "16x16 32x32 48x48 64x64 128x128 256x256",
      },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = getPersonSchema();

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={[
          bodoni.variable,
          manrope.variable,
          geistMono.variable,
          "min-h-screen bg-background text-foreground antialiased",
        ].join(" ")}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:text-foreground focus:shadow-lg focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-foreground/60"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <SiteTelemetry />
      </body>
    </html>
  );
}
