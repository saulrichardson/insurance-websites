import type { Metadata } from "next";
import { products, type Product, type ProductId } from "@insurance-websites/domain";

import { site, siteUrl } from "../config/site";
import { fromZhPath, toZhPath } from "../i18n/routing";

export type RouteSeo = {
  path: `/${string}`;
  title: string;
  description: string;
};

export type ProductSeo = RouteSeo & {
  productId: ProductId;
  serviceType: string;
  searchPhrases: string[];
};

const productSeoBySlug: Record<string, ProductSeo> = {
  "auto-insurance": {
    productId: "auto",
    path: "/auto-insurance",
    title: "California Auto Insurance",
    description:
      "Auto and car insurance guidance for California drivers, families, new vehicles, liability limits, uninsured motorist coverage, and multi-car households.",
    serviceType: "Auto insurance",
    searchPhrases: ["California auto insurance", "car insurance guidance", "multi-car auto quote"],
  },
  "home-insurance": {
    productId: "home",
    path: "/home-insurance",
    title: "California Home Insurance",
    description:
      "Homeowners insurance guidance for California property owners, including rebuild cost, liability, deductibles, lender proof, renewals, and FAIR Plan questions.",
    serviceType: "Homeowners insurance",
    searchPhrases: ["California home insurance", "homeowners insurance guidance", "FAIR Plan help"],
  },
  "condo-insurance": {
    productId: "condo",
    path: "/condo-insurance",
    title: "California Condo Insurance",
    description:
      "Condo and HO-6 insurance guidance for California unit owners coordinating personal coverage, HOA master policies, loss assessment, and lender requirements.",
    serviceType: "Condo insurance",
    searchPhrases: ["California condo insurance", "HO-6 insurance", "HOA master policy gap"],
  },
  "renters-insurance": {
    productId: "renters",
    path: "/renters-insurance",
    title: "California Renters Insurance",
    description:
      "Renters insurance guidance for California apartments and rental homes, including personal property, liability, lease requirements, and replacement cost decisions.",
    serviceType: "Renters insurance",
    searchPhrases: ["California renters insurance", "apartment insurance", "tenant liability coverage"],
  },
  "life-insurance": {
    productId: "life",
    path: "/life-insurance",
    title: "California Life Insurance",
    description:
      "Life insurance guidance for California families, homeowners, parents, and business owners comparing term coverage, long-term protection, and coverage amounts.",
    serviceType: "Life insurance",
    searchPhrases: ["California life insurance", "term life insurance", "family protection planning"],
  },
  "umbrella-insurance": {
    productId: "umbrella",
    path: "/umbrella-insurance",
    title: "California Umbrella Insurance",
    description:
      "Umbrella insurance guidance for California households and business owners reviewing higher liability limits above auto, home, rental property, boat, or business coverage.",
    serviceType: "Umbrella insurance",
    searchPhrases: ["California umbrella insurance", "personal liability coverage", "excess liability"],
  },
  "business-insurance": {
    productId: "business",
    path: "/business-insurance",
    title: "California Business Insurance",
    description:
      "Business insurance guidance for California small businesses, including general liability, property, commercial auto, certificates of insurance, and contract requirements.",
    serviceType: "Business insurance",
    searchPhrases: ["California business insurance", "general liability insurance", "COI certificate help"],
  },
  "motorcycle-insurance": {
    productId: "motorcycle",
    path: "/motorcycle-insurance",
    title: "California Motorcycle Insurance",
    description:
      "Motorcycle insurance guidance for California riders comparing liability limits, collision and comprehensive coverage, accessories, gear, and roadside options.",
    serviceType: "Motorcycle insurance",
    searchPhrases: ["California motorcycle insurance", "motorcycle liability coverage", "bike insurance quote"],
  },
  "atv-insurance": {
    productId: "atv",
    path: "/atv-insurance",
    title: "California ATV Insurance",
    description:
      "ATV and off-road vehicle insurance guidance for California owners reviewing liability, physical damage, storage, transport, riders, and recreational use.",
    serviceType: "ATV insurance",
    searchPhrases: ["California ATV insurance", "off-road vehicle insurance", "recreational vehicle coverage"],
  },
  "boat-insurance": {
    productId: "boat",
    path: "/boat-insurance",
    title: "California Boat Insurance",
    description:
      "Boat and watercraft insurance guidance for California owners comparing hull coverage, liability, equipment, trailers, storage, and navigation limits.",
    serviceType: "Boat insurance",
    searchPhrases: ["California boat insurance", "watercraft insurance", "boat liability coverage"],
  },
  "fair-plan": {
    productId: "fair-plan",
    path: "/fair-plan",
    title: "California FAIR Plan Guidance",
    description:
      "CA FAIR Plan guidance for California property owners dealing with nonrenewal, limited home insurance options, lender deadlines, and companion coverage questions.",
    serviceType: "California FAIR Plan guidance",
    searchPhrases: ["California FAIR Plan", "home insurance nonrenewal", "hard-to-place property insurance"],
  },
  "california-property-insurance": {
    productId: "california-property",
    path: "/california-property-insurance",
    title: "California Property Insurance",
    description:
      "California property insurance guidance for homeowners facing renewal changes, nonrenewal, lender proof needs, FAIR Plan questions, and coverage gaps.",
    serviceType: "California property insurance",
    searchPhrases: ["California property insurance", "home insurance renewal change", "nonrenewal insurance help"],
  },
};

const routeSeoByPath: Record<string, RouteSeo> = {
  "/products": {
    path: "/products",
    title: "California Insurance Products",
    description:
      "Explore auto, home, condo, renters, life, business, motorcycle, ATV, boat, umbrella, FAIR Plan, and California property insurance guidance.",
  },
  "/about": {
    path: "/about",
    title: "About Tracy Zhang Insurance",
    description:
      "Learn how Tracy Zhang Insurance helps California households, property owners, drivers, families, and business owners make clearer coverage decisions.",
  },
  "/team": {
    path: "/team",
    title: "Tracy Zhang Insurance Team",
    description:
      "Meet the Tracy Zhang Insurance team supporting California clients with quotes, policy reviews, certificates, claims context, and multilingual service.",
  },
  "/contact": {
    path: "/contact",
    title: "Contact Tracy Zhang Insurance",
    description:
      "Contact Tracy Zhang Insurance for California auto, home, property, business, life, umbrella, FAIR Plan, or policy review help.",
  },
  "/location": {
    path: "/location",
    title: "Tracy Zhang Insurance Offices",
    description:
      "Visit or contact Tracy Zhang Insurance offices in San Marino and La Palma for California insurance guidance, quotes, service, and policy reviews.",
  },
  "/locations": {
    path: "/locations",
    title: "California Insurance Locations",
    description:
      "Local Tracy Zhang Insurance pages for San Marino, La Palma, Cerritos, and nearby California communities.",
  },
  "/locations/san-marino": {
    path: "/locations/san-marino",
    title: "San Marino Insurance Guidance",
    description:
      "San Marino insurance guidance for homes, autos, families, property owners, and businesses from the Huntington Drive office.",
  },
  "/locations/la-palma": {
    path: "/locations/la-palma",
    title: "La Palma Insurance Guidance",
    description:
      "La Palma and Cerritos-area insurance guidance for households, life milestones, small businesses, and property questions from the Moody Street office.",
  },
  "/locations/cerritos": {
    path: "/locations/cerritos",
    title: "Cerritos Insurance Guidance",
    description:
      "Insurance guidance for Cerritos households, property owners, drivers, families, and small businesses through the nearby La Palma office.",
  },
  "/stories": {
    path: "/stories",
    title: "California Insurance Guidance",
    description:
      "Insurance guidance from Tracy Zhang Insurance on California coverage decisions, FAIR Plan questions, VINs, condo gaps, renewals, and shopping calmly.",
  },
  "/privacy": {
    path: "/privacy",
    title: "Privacy Policy",
    description: "Privacy policy for Tracy Zhang Insurance inquiries, forms, website use, and communications.",
  },
  "/terms": {
    path: "/terms",
    title: "Website Terms",
    description: "Website and insurance inquiry terms for Tracy Zhang Insurance.",
  },
  "/sms-terms": {
    path: "/sms-terms",
    title: "SMS Terms",
    description: "SMS terms for Tracy Zhang Insurance text message communications.",
  },
  "/contact-consent": {
    path: "/contact-consent",
    title: "Contact Consent",
    description: "Contact consent language used by Tracy Zhang Insurance lead forms.",
  },
  "/thanks": {
    path: "/thanks",
    title: "Request Received",
    description: "Thanks. Tracy Zhang Insurance received your request and will follow up soon.",
  },
};

export function absoluteUrl(path: string, base: string | URL = siteUrl) {
  return new URL(path, base).toString();
}

export function localizedAlternates(path: `/${string}`, base: string | URL = siteUrl) {
  const englishPath = fromZhPath(path);
  const chinesePath = toZhPath(englishPath);

  return {
    canonical: absoluteUrl(path, base),
    languages: {
      "en-US": absoluteUrl(englishPath, base),
      "zh-Hans": absoluteUrl(chinesePath, base),
      "x-default": absoluteUrl(englishPath, base),
    },
  };
}

export function getRouteSeo(path: `/${string}`) {
  const product = getProductSeoByPath(path);
  return product ?? routeSeoByPath[path];
}

export function getProductSeo(slug: string) {
  return productSeoBySlug[slug];
}

export function getProductSeoByPath(path: string) {
  const slug = path.replace(/^\//, "");
  return getProductSeo(slug);
}

export function getProductBySeo(productSeo: ProductSeo): Product {
  const product = products.find((item) => item.id === productSeo.productId);
  if (!product) throw new Error(`Missing product for SEO product id: ${productSeo.productId}`);
  return product;
}

export function getRelatedProducts(product: Product) {
  return product.related
    .map((id) => products.find((item) => item.id === id))
    .filter((item): item is Product => Boolean(item));
}

export function getRouteMetadata(
  path: `/${string}`,
  overrides?: Partial<Pick<Metadata, "robots">>,
  options?: { localized?: boolean },
): Metadata {
  const seo = getRouteSeo(path);
  if (!seo) throw new Error(`Missing route SEO for ${path}`);
  return metadataFromSeo(seo, overrides, options);
}

export function getProductMetadata(slug: string): Metadata {
  const seo = getProductSeo(slug);
  if (!seo) throw new Error(`Missing product SEO for ${slug}`);
  return metadataFromSeo(seo);
}

export function metadataFromSeo(
  seo: RouteSeo,
  overrides?: Partial<Pick<Metadata, "robots">>,
  options?: { localized?: boolean },
): Metadata {
  const url = absoluteUrl(seo.path);
  const localized = options?.localized ?? true;

  return {
    title: seo.title,
    description: seo.description,
    alternates: localized ? localizedAlternates(seo.path) : { canonical: url },
    openGraph: {
      type: "website",
      locale: site.locale,
      url,
      title: `${seo.title} | ${site.name}`,
      description: seo.description,
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title: `${seo.title} | ${site.name}`,
      description: seo.description,
    },
    ...overrides,
  };
}

export function getAllProductSeo() {
  return Object.values(productSeoBySlug);
}

export function getAllRouteSeo() {
  return Object.values(routeSeoByPath);
}
