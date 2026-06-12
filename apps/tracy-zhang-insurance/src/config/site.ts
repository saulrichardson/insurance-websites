import {
  brand,
  carrierMarkets,
  domains,
  getOfficeById,
  getOfficeBySlug as getSharedOfficeBySlug,
  languages,
  offices as sharedOffices,
  products,
  publicContact,
  type Address,
  type Office,
  type CarrierMarket,
  type PublicContact,
} from "@insurance-websites/domain";

export type { Address, Office };

export type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  locale: string;
  url: string;
  contact: PublicContact;
  phoneDisplay: string;
  phoneE164: string;
  smsE164: string;
  address: Address;
  languages: string[];
  reviews?: {
    rating: number;
    count: number;
    source: string;
  };
  offices: Office[];
  primaryOfficeSlug: Office["slug"];
  serviceArea: string[];
  offerings: Array<{
    title: string;
    href: `/${string}`;
    description: string;
  }>;
  carrierNotes: string;
  carrierMarkets: CarrierMarket[];
  social: {
    googleBusinessProfile: string;
    facebook: string;
    instagram: string;
    linkedin: string;
  };
  hours: Office["hours"];
};

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || `https://${domains.canonicalInsurance}`;

export const primaryOffice: Office = getOfficeById("san-marino");

export const site: SiteConfig = {
  name: brand.name,
  tagline: brand.tagline,
  description: brand.description,
  locale: brand.locale,
  url: siteUrl,
  contact: publicContact,
  phoneDisplay: primaryOffice.phoneDisplay,
  phoneE164: primaryOffice.phoneE164,
  smsE164: primaryOffice.smsE164,
  address: primaryOffice.address,
  languages,
  reviews: {
    rating: 4.4,
    count: sharedOffices.reduce((sum, office) => sum + office.reviews.count, 0),
    source: "Allstate office profiles",
  },
  primaryOfficeSlug: primaryOffice.slug,
  offices: sharedOffices,
  serviceArea: [
    "California",
    "San Marino",
    "La Palma",
    "Cerritos",
    "Pasadena",
    "South Pasadena",
    "San Gabriel",
    "Arcadia",
    "Alhambra",
    "Los Angeles County",
    "Orange County",
  ],
  offerings: products.map((product) => ({
    title: product.title,
    href: product.href,
    description: product.description,
  })),
  carrierNotes: brand.carrierNotes,
  carrierMarkets,
  social: {
    googleBusinessProfile: "",
    facebook: "",
    instagram: "",
    linkedin: "",
  },
  hours: primaryOffice.hours,
};

export function getOfficeBySlug(slug: Office["slug"]): Office | undefined {
  return getSharedOfficeBySlug(slug);
}
