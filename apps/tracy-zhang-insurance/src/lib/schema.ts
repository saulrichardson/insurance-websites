import { products } from "@insurance-websites/domain";
import type { MarketProfile, Office, Product } from "@insurance-websites/domain";

import { primaryOffice, site } from "../config/site";
import { absoluteUrl, type ProductSeo, type RouteSeo } from "./seo";

export function getLocalBusinessSchema(options?: {
  market?: MarketProfile;
  office?: Office;
  url?: string;
}) {
  const market = options?.market;
  const selectedOffice = options?.office ?? primaryOffice;
  const schemaUrl = options?.url ?? site.url;
  const email = site.contact.email.trim();
  const sameAs = [
    site.social.googleBusinessProfile,
    site.social.facebook,
    site.social.instagram,
    site.social.linkedin,
  ].filter((value) => value.trim().length > 0);

  const departments =
    market?.domainRole !== "local" && site.offices.length > 1
      ? site.offices.map((office) => ({
          "@type": "InsuranceAgency",
          "@id": `${schemaUrl}/locations/${office.slug.replace(/-ca$/, "")}#office`,
          name: `${site.name} — ${office.label}`,
          telephone: office.phoneE164,
          address: {
            "@type": "PostalAddress",
            streetAddress: office.address.streetAddress,
            addressLocality: office.address.addressLocality,
            addressRegion: office.address.addressRegion,
            postalCode: office.address.postalCode,
            addressCountry: office.address.addressCountry,
          },
          url: `${schemaUrl}/locations/${office.slug.replace(/-ca$/, "")}`,
        }))
      : undefined;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "InsuranceAgency",
        "@id": `${schemaUrl}/#agency`,
        name: site.name,
        description: market?.heroSubtitle ?? site.description,
        url: schemaUrl,
        logo: absoluteUrl("/icon.png", schemaUrl),
        image: absoluteUrl("/icon.png", schemaUrl),
        telephone: selectedOffice.phoneE164,
        email,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: selectedOffice.phoneE164,
          email,
          contactType: "customer service",
          availableLanguage: selectedOffice.languages,
        },
        potentialAction: {
          "@type": "ScheduleAction",
          target: site.contact.scheduling.url,
          name: site.contact.scheduling.label,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: selectedOffice.address.streetAddress,
          addressLocality: selectedOffice.address.addressLocality,
          addressRegion: selectedOffice.address.addressRegion,
          postalCode: selectedOffice.address.postalCode,
          addressCountry: selectedOffice.address.addressCountry,
        },
        areaServed: (market?.domainRole === "local" ? market.serviceArea : site.serviceArea).map(
          (area) => ({
            "@type": area === "California" ? "State" : "City",
            name: area,
          }),
        ),
        knowsLanguage: selectedOffice.languages,
        openingHours: [
          selectedOffice.hours.mondayFriday,
          selectedOffice.hours.saturday,
          selectedOffice.hours.sunday,
        ],
        sameAs: sameAs.length > 0 ? sameAs : undefined,
        department: departments,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${market?.label ?? "California"} insurance services`,
          itemListElement: getMarketProducts(market).map((product) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: product.title,
              serviceType: product.title,
              description: product.description,
              provider: {
                "@id": `${schemaUrl}/#agency`,
              },
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${schemaUrl}/#website`,
        name: site.name,
        url: schemaUrl,
        inLanguage: market?.domainRole === "local" ? ["en-US", "zh-Hans"] : ["en-US", "zh-Hans"],
        publisher: {
          "@id": `${schemaUrl}/#agency`,
        },
      },
    ],
  };
}

export function getBreadcrumbSchema(
  items: Array<{ name: string; path: `/${string}` }>,
  base: string | URL = site.url,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path, base),
    })),
  };
}

export function getWebPageSchema(seo: RouteSeo, base: string | URL = site.url) {
  const pageUrl = absoluteUrl(seo.path, base);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: seo.title,
    description: seo.description,
    inLanguage: "en-US",
    isPartOf: {
      "@id": `${new URL("/", base).toString().replace(/\/$/, "")}/#website`,
    },
  };
}

export function getProductServiceSchema(
  productSeo: ProductSeo,
  product: Product,
  base: string | URL = site.url,
) {
  const pageUrl = absoluteUrl(product.href, base);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: productSeo.serviceType,
    serviceType: productSeo.serviceType,
    description: productSeo.description,
    url: pageUrl,
    areaServed: site.serviceArea.map((area) => ({
      "@type": area === "California" ? "State" : "City",
      name: area,
    })),
    provider: {
      "@id": `${new URL("/", base).toString().replace(/\/$/, "")}/#agency`,
    },
    relatedLink: product.related
      .map((id) => products.find((item) => item.id === id)?.href)
      .filter((href): href is `/${string}` => Boolean(href))
      .map((href) => absoluteUrl(href, base)),
    keywords: productSeo.searchPhrases.join(", "),
  };
}

export function getJsonLdGraph(nodes: unknown[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.map(stripNestedContext),
  };
}

function getMarketProducts(market: MarketProfile | undefined) {
  if (!market || market.domainRole !== "local") return products;

  const productIds = new Set(market.merchandising.flatMap((group) => group.productIds));
  return products.filter((product) => productIds.has(product.id));
}

function stripNestedContext(node: unknown) {
  if (!node || typeof node !== "object" || Array.isArray(node)) return node;
  const copy = { ...(node as Record<string, unknown>) };
  delete copy["@context"];
  return copy;
}
