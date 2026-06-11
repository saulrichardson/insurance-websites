import { describe, expect, it } from "vitest";
import { getMarketProfile, getOfficeById, products } from "@insurance-websites/domain";

import { getLocalBusinessSchema } from "./schema";
import {
  getAllProductSeo,
  getProductMetadata,
  getRouteMetadata,
  getProductSeo,
  localizedAlternates,
} from "./seo";

describe("insurance SEO model", () => {
  it("has first-class SEO content for every product route", () => {
    expect(getAllProductSeo()).toHaveLength(products.length);

    for (const product of products) {
      const seo = getProductSeo(product.slug);
      expect(seo?.path).toBe(product.href);
      expect(seo?.productId).toBe(product.id);
      expect(seo?.title.length).toBeGreaterThan(10);
      expect(seo?.description).toContain("California");
    }
  });

  it("emits reciprocal English, Simplified Chinese, and x-default alternates", () => {
    expect(localizedAlternates("/auto-insurance")).toEqual({
      canonical: "https://tracyzhanginsurance.com/auto-insurance",
      languages: {
        "en-US": "https://tracyzhanginsurance.com/auto-insurance",
        "zh-Hans": "https://tracyzhanginsurance.com/zh/auto-insurance",
        "x-default": "https://tracyzhanginsurance.com/auto-insurance",
      },
    });

    const metadata = getProductMetadata("auto-insurance");
    expect(metadata.alternates).toEqual(localizedAlternates("/auto-insurance"));
  });

  it("does not emit hreflang alternates for non-localized utility routes", () => {
    const metadata = getRouteMetadata(
      "/thanks",
      { robots: { index: false, follow: false } },
      { localized: false },
    );

    expect(metadata.alternates).toEqual({
      canonical: "https://tracyzhanginsurance.com/thanks",
    });
    expect(metadata.robots).toEqual({ index: false, follow: false });
  });

  it("keeps local-domain schema focused on the active office", () => {
    const market = getMarketProfile("la-palma");
    const schema = getLocalBusinessSchema({
      market,
      office: getOfficeById(market.primaryOfficeId),
      url: "https://lapalmainsurance.com",
    });

    const serialized = JSON.stringify(schema);
    expect(serialized).toContain("La Palma");
    expect(serialized).toContain("7002 Moody St");
    expect(serialized).not.toContain("1012 Huntington Dr");
    expect(serialized).not.toContain("San Marino");
  });
});
