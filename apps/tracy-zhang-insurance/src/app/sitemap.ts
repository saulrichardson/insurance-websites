import type { MetadataRoute } from "next";

import { site, siteUrl } from "@/config/site";
import { stories } from "@/content/stories";
import { fromZhPath, toZhPath } from "@/i18n/routing";
import { getMarketUrl, getRequestMarket } from "@/lib/market";

export const dynamic = "force-dynamic";

const staticRoutes = [
  "/",
  "/products",
  "/location",
  "/locations",
  "/locations/san-marino",
  "/locations/la-palma",
  "/locations/cerritos",
  "/about",
  "/team",
  "/contact",
  "/privacy",
  "/terms",
  "/sms-terms",
  "/contact-consent",
  "/stories",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const market = await getRequestMarket();
  const lastModified = new Date();

  if (market.domainRole === "local") {
    return [
      sitemapEntry("/", getMarketUrl(market.id), lastModified, 1, "weekly"),
      sitemapEntry("/zh", getMarketUrl(market.id), lastModified, 0.95, "weekly"),
    ];
  }

  const base = new URL(siteUrl);

  const routes = Array.from(
    new Set([
      ...staticRoutes,
      ...site.offerings.map((offering) => offering.href),
      ...stories.map((story) => `/stories/${story.slug}`),
    ]),
  );

  return routes.flatMap((route) => [
    sitemapEntry(
      route,
      base,
      lastModified,
      getPriority(route),
      route === "/" || route === "/stories" ? "weekly" : "monthly",
    ),
    sitemapEntry(
      toZhPath(route),
      base,
      lastModified,
      getPriority(route),
      route === "/" || route === "/stories" ? "weekly" : "monthly",
    ),
  ]);
}

function sitemapEntry(
  route: string,
  base: string | URL,
  lastModified: Date,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
): MetadataRoute.Sitemap[number] {
  const englishPath = fromZhPath(route);
  const chinesePath = toZhPath(englishPath);

  return {
    url: new URL(route, base).toString(),
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: {
        "en-US": new URL(englishPath, base).toString(),
        "zh-Hans": new URL(chinesePath, base).toString(),
        "x-default": new URL(englishPath, base).toString(),
      },
    },
  };
}

function getPriority(route: string) {
  if (route === "/") return 1;
  if (route === "/contact") return 0.8;
  if (route.startsWith("/stories/")) return 0.65;
  return 0.7;
}
