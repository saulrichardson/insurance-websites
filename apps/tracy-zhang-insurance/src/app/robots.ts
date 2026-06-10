import type { MetadataRoute } from "next";

import { getMarketUrl, getRequestMarket } from "@/lib/market";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const market = await getRequestMarket();
  const siteUrl = getMarketUrl(market.id);

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
