import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { site } from "@/lib/site";

const bodoni = Cormorant_Garamond({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function getMetadataBase() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (raw) {
    try {
      return new URL(raw);
    } catch {
      // Fall back to localhost for misconfigured environments.
    }
  }
  return new URL("http://localhost:3000");
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: `${site.brand.name} | ${site.agent.location}`,
    template: `%s | ${site.brand.shortName}`,
  },
  description: `Contact ${site.brand.legalLine} in ${site.agent.location}. Call ${site.agent.phone.display} for quotes, service, and office support.`,
  openGraph: {
    title: `${site.brand.name} | ${site.agent.location}`,
    description: `Contact ${site.brand.legalLine}. Call ${site.agent.phone.display} or visit the San Marino or La Palma office.`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brand.name} | ${site.agent.location}`,
    description: `Contact ${site.brand.legalLine}. Call ${site.agent.phone.display}.`,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={[
          bodoni.variable,
          geistSans.variable,
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
