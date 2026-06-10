import type { MetadataRoute } from "next";

import { fromZhPath, toZhPath } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();

  return [
    sitemapEntry("/", base, lastModified, 1),
    sitemapEntry("/zh", base, lastModified, 0.95),
  ];
}

function sitemapEntry(
  route: string,
  base: URL,
  lastModified: Date,
  priority: number,
): MetadataRoute.Sitemap[number] {
  const englishPath = fromZhPath(route);
  const chinesePath = toZhPath(englishPath);

  return {
    url: new URL(route, base).toString(),
    lastModified,
    changeFrequency: "weekly",
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
