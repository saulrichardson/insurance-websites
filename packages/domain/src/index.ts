export type Address = {
  streetAddress: string;
  addressLocality: string;
  addressRegion: "CA";
  postalCode: string;
  addressCountry: "US";
};

export type Office = {
  id: "san-marino" | "la-palma";
  slug: "san-marino-ca" | "la-palma-ca";
  label: string;
  shortLabel: string;
  address: Address;
  phoneDisplay: string;
  phoneE164: string;
  smsE164: string;
  faxDisplay?: string;
  faxE164?: string;
  hours: {
    mondayFriday: string;
    saturday: string;
    sunday: string;
    note?: string;
  };
  languages: string[];
  reviews: {
    rating: number;
    count: number;
    source: string;
  };
  links: {
    allstateAgentPage: string;
    appointment: string;
    googleMaps: string;
  };
};

export type ProductId =
  | "auto"
  | "home"
  | "condo"
  | "renters"
  | "life"
  | "umbrella"
  | "business"
  | "motorcycle"
  | "atv"
  | "boat"
  | "fair-plan"
  | "california-property";

export type Product = {
  id: ProductId;
  title: string;
  slug: string;
  href: `/${string}`;
  shortTitle: string;
  description: string;
  customerMoments: string[];
  quoteInputs: string[];
  related: ProductId[];
};

export type MarketId = "statewide" | "san-marino" | "la-palma" | "cerritos";

export type CarrierMarket = {
  name: string;
  relationship: "allstate" | "additional-market" | "specialty-access";
};

export type MerchandisingGroup = {
  title: string;
  intro: string;
  productIds: ProductId[];
  ctaLabel: string;
  href: `/${string}`;
};

export type MarketProfile = {
  id: MarketId;
  domainRole: "canonical" | "local";
  label: string;
  hostnames: string[];
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryOfficeId: Office["id"];
  serviceArea: string[];
  proofPoints: string[];
  featuredGuideSlugs: string[];
  merchandising: MerchandisingGroup[];
  localImage?: {
    src: `/${string}`;
    alt: string;
    caption: string;
    credit: string;
    creditUrl: string;
    license: string;
    licenseUrl: string;
    objectPosition?: string;
  };
  localSeo: {
    title: string;
    description: string;
    canonicalPath: string;
  };
};

export const domains = {
  canonicalInsurance: "tracyzhanginsurance.com",
  personalAdvisor: "tracyzhang.com",
  campaign: "go.tracyzhanginsurance.com",
  mail: "mail.tracyzhanginsurance.com",
  local: {
    sanMarino: "sanmarinoinsurance.com",
    laPalma: "lapalmainsurance.com",
  },
  retired: ["tracysinsurnace.com"],
} as const;

export const brand = {
  name: "Tracy Zhang Insurance",
  advisorName: "Tracy Zhang",
  tagline: "California insurance guidance with local offices in San Marino and La Palma.",
  description:
    "Tracy Zhang Insurance helps Californians make clear coverage decisions for home, auto, life, business, property, and liability needs.",
  locale: "en-US",
  licenseLine: "California insurance guidance. Coverage availability and eligibility vary by carrier, product, underwriting, and location.",
  carrierNotes:
    "We help review Allstate options and additional markets when appropriate, including specialty paths for California risks. Carrier availability varies by coverage type, eligibility, underwriting appetite, and location.",
};

export const carrierMarkets: CarrierMarket[] = [
  { name: "Allstate", relationship: "allstate" },
  { name: "Chubb", relationship: "additional-market" },
  { name: "National General", relationship: "additional-market" },
  { name: "Bristol West", relationship: "additional-market" },
  { name: "Stillwater", relationship: "additional-market" },
  { name: "Pacific Specialty", relationship: "additional-market" },
  { name: "Bamboo", relationship: "additional-market" },
  { name: "Aegis", relationship: "specialty-access" },
  { name: "Burns & Wilcox", relationship: "specialty-access" },
  { name: "RT Specialty", relationship: "specialty-access" },
];

export const offices: Office[] = [
  {
    id: "san-marino",
    slug: "san-marino-ca",
    label: "San Marino",
    shortLabel: "San Marino",
    address: {
      streetAddress: "1012 Huntington Dr",
      addressLocality: "San Marino",
      addressRegion: "CA",
      postalCode: "91108",
      addressCountry: "US",
    },
    phoneDisplay: "(626) 300-8338",
    phoneE164: "+16263008338",
    smsE164: "+16263008338",
    faxDisplay: "(833) 679-4583",
    faxE164: "+18336794583",
    hours: {
      mondayFriday: "Mon-Fri: 9:00am-6:00pm",
      saturday: "Sat: Available by appointment",
      sunday: "Sun: Available by appointment",
      note: "After-hours appointments available.",
    },
    languages: ["English", "Cantonese", "Spanish", "Mandarin", "Taiwanese", "Vietnamese"],
    reviews: {
      rating: 4.3,
      count: 204,
      source: "Allstate agent page",
    },
    links: {
      allstateAgentPage: "https://agents.allstate.com/tracy-cuiying-zhang-san-marino-ca.html",
      appointment: "https://www.leadmanagementlab.com/ScheduleAppointment.aspx?agency=0D6933",
      googleMaps: "https://maps.google.com/maps?cid=10310965996194018044",
    },
  },
  {
    id: "la-palma",
    slug: "la-palma-ca",
    label: "La Palma",
    shortLabel: "La Palma",
    address: {
      streetAddress: "7002 Moody St, Ste 102",
      addressLocality: "La Palma",
      addressRegion: "CA",
      postalCode: "90623",
      addressCountry: "US",
    },
    phoneDisplay: "(562) 402-4375",
    phoneE164: "+15624024375",
    smsE164: "+15624024375",
    faxDisplay: "(833) 774-2098",
    faxE164: "+18337742098",
    hours: {
      mondayFriday: "Mon-Fri: 9:00am-5:30pm",
      saturday: "Sat: Available by appointment",
      sunday: "Sun: Available by appointment",
      note: "After-hours appointments available.",
    },
    languages: ["English", "Cantonese", "Mandarin", "Taiwanese"],
    reviews: {
      rating: 4.5,
      count: 376,
      source: "Allstate agent page",
    },
    links: {
      allstateAgentPage: "https://agents.allstate.com/tracy-cuiying-zhang-la-palma-ca.html",
      appointment: "https://www.leadmanagementlab.com/ScheduleAppointment.aspx?agency=0B3212",
      googleMaps: "https://maps.google.com/maps?cid=4778875041018585831",
    },
  },
];

export const languages = Array.from(new Set(offices.flatMap((office) => office.languages)));

export const products: Product[] = [
  {
    id: "auto",
    title: "Auto Insurance",
    shortTitle: "Auto",
    slug: "auto-insurance",
    href: "/auto-insurance",
    description: "Coverage clarity for drivers, families, vehicles, and daily commutes.",
    customerMoments: ["Adding a driver", "Buying a car", "Reviewing liability limits"],
    quoteInputs: ["Driver names and dates of birth", "Vehicle VINs or year/make/model", "Current limits if available"],
    related: ["home", "renters", "umbrella"],
  },
  {
    id: "home",
    title: "Home Insurance",
    shortTitle: "Home",
    slug: "home-insurance",
    href: "/home-insurance",
    description: "Dwelling, belongings, liability, deductibles, and rebuild-cost conversations.",
    customerMoments: ["Buying a home", "Renewal changed", "Lender needs proof"],
    quoteInputs: ["Property address", "Occupancy and roof context", "Current declarations page if available"],
    related: ["auto", "umbrella", "fair-plan"],
  },
  {
    id: "condo",
    title: "Condo Insurance",
    shortTitle: "Condo",
    slug: "condo-insurance",
    href: "/condo-insurance",
    description: "Unit coverage, personal property, loss assessment, and HOA master-policy gaps.",
    customerMoments: ["Closing on a condo", "HOA master policy changed", "Lender request"],
    quoteInputs: ["Unit address", "HOA/master policy details", "Interior upgrade context"],
    related: ["home", "umbrella", "renters"],
  },
  {
    id: "renters",
    title: "Renters Insurance",
    shortTitle: "Renters",
    slug: "renters-insurance",
    href: "/renters-insurance",
    description: "Personal property and liability protection for apartments and rentals.",
    customerMoments: ["New lease", "Landlord requirement", "Protecting belongings"],
    quoteInputs: ["Rental address", "Liability requirement", "Approximate personal property amount"],
    related: ["auto", "umbrella", "condo"],
  },
  {
    id: "life",
    title: "Life Insurance",
    shortTitle: "Life",
    slug: "life-insurance",
    href: "/life-insurance",
    description: "Term and permanent options for family protection and long-term planning.",
    customerMoments: ["Marriage", "Children", "Mortgage or business ownership"],
    quoteInputs: ["Age and health context", "Coverage goal", "Existing coverage if any"],
    related: ["home", "business", "umbrella"],
  },
  {
    id: "umbrella",
    title: "Umbrella Insurance",
    shortTitle: "Umbrella",
    slug: "umbrella-insurance",
    href: "/umbrella-insurance",
    description: "Extra liability protection above home, auto, boat, and other eligible policies.",
    customerMoments: ["Higher asset exposure", "Teen drivers", "Rental property or watercraft"],
    quoteInputs: ["Underlying policy limits", "Household drivers", "Property and vehicle context"],
    related: ["auto", "home", "business"],
  },
  {
    id: "business",
    title: "Business Insurance",
    shortTitle: "Business",
    slug: "business-insurance",
    href: "/business-insurance",
    description: "Liability, property, auto, certificates, and specialty-market conversations.",
    customerMoments: ["Lease or vendor contract", "Certificate request", "Hiring or adding vehicles"],
    quoteInputs: ["Operations description", "Revenue/payroll estimate", "Contract or certificate requirements"],
    related: ["umbrella", "auto", "life"],
  },
  {
    id: "motorcycle",
    title: "Motorcycle Insurance",
    shortTitle: "Motorcycle",
    slug: "motorcycle-insurance",
    href: "/motorcycle-insurance",
    description: "Coverage for motorcycles, riders, liability, gear, and weekend use.",
    customerMoments: ["New bike", "Weekend riding", "Bundling with auto/home"],
    quoteInputs: ["Motorcycle details", "Operator details", "Storage and use"],
    related: ["auto", "umbrella", "boat"],
  },
  {
    id: "atv",
    title: "ATV Insurance",
    shortTitle: "ATV",
    slug: "atv-insurance",
    href: "/atv-insurance",
    description: "Coverage for off-road vehicles, trailers, and recreational equipment.",
    customerMoments: ["New ATV", "Storage changes", "Trail or private-land use"],
    quoteInputs: ["ATV details", "Storage location", "Primary operator"],
    related: ["motorcycle", "boat", "umbrella"],
  },
  {
    id: "boat",
    title: "Boat Insurance",
    shortTitle: "Boat",
    slug: "boat-insurance",
    href: "/boat-insurance",
    description: "Protection for boats, personal watercraft, liability, and equipment.",
    customerMoments: ["Buying a boat", "Marina requirement", "Liability review"],
    quoteInputs: ["Boat details", "Storage and use", "Primary operator"],
    related: ["umbrella", "auto", "motorcycle"],
  },
  {
    id: "fair-plan",
    title: "CA FAIR Plan Guidance",
    shortTitle: "FAIR Plan",
    slug: "fair-plan",
    href: "/fair-plan",
    description: "Guidance for California property risks when standard markets are limited.",
    customerMoments: ["Nonrenewal", "Hard-to-place home", "Closing timeline"],
    quoteInputs: ["Property address", "Prior insurance status", "Lender/closing timeline"],
    related: ["home", "california-property", "umbrella"],
  },
  {
    id: "california-property",
    title: "California Property Insurance",
    shortTitle: "California property",
    slug: "california-property-insurance",
    href: "/california-property-insurance",
    description: "Coverage review for California property-market pressure, renewal changes, and gaps.",
    customerMoments: ["Renewal increase", "Coverage restriction", "Property-market uncertainty"],
    quoteInputs: ["Current declarations page", "Property details", "What changed at renewal"],
    related: ["home", "fair-plan", "condo"],
  },
];

export const productBySlug = Object.fromEntries(products.map((product) => [product.slug, product])) as Record<
  string,
  Product
>;

export const marketProfiles: Record<MarketId, MarketProfile> = {
  statewide: {
    id: "statewide",
    domainRole: "canonical",
    label: "California",
    hostnames: [domains.canonicalInsurance, `www.${domains.canonicalInsurance}`, domains.campaign],
    eyebrow: "Tracy Zhang Insurance",
    heroTitle: "California insurance help, organized around the decision in front of you.",
    heroSubtitle:
      "Clear guidance for home, auto, life, business, property, and liability coverage, with local offices in San Marino and La Palma.",
    primaryOfficeId: "san-marino",
    serviceArea: ["California", "Los Angeles County", "Orange County", "San Marino", "La Palma", "Cerritos"],
    proofPoints: ["Two local offices", "Multilingual support", "Personal and business coverage"],
    featuredGuideSlugs: ["fair-plan-basics-without-drama", "why-we-ask-for-vins", "condo-insurance-and-the-master-policy-gap"],
    merchandising: [
      {
        title: "Household",
        intro: "Auto, home, condo, renters, and umbrella decisions reviewed together.",
        productIds: ["auto", "home", "condo", "renters", "umbrella"],
        ctaLabel: "Review household coverage",
        href: "/products#household",
      },
      {
        title: "Property",
        intro: "California home, condo, FAIR Plan, rental, and renewal questions.",
        productIds: ["home", "condo", "fair-plan", "california-property"],
        ctaLabel: "Discuss property coverage",
        href: "/california-property-insurance",
      },
      {
        title: "Family",
        intro: "Life insurance and liability decisions after major milestones.",
        productIds: ["life", "umbrella", "auto", "home"],
        ctaLabel: "Plan a family review",
        href: "/life-insurance",
      },
      {
        title: "Business",
        intro: "Liability, property, commercial auto, certificates, and contract needs.",
        productIds: ["business", "auto", "umbrella"],
        ctaLabel: "Start business help",
        href: "/business-insurance",
      },
    ],
    localSeo: {
      title: "Tracy Zhang Insurance | California Insurance Guidance",
      description:
        "Insurance help for California households, property owners, drivers, families, and business owners.",
      canonicalPath: "/",
    },
  },
  "san-marino": {
    id: "san-marino",
    domainRole: "local",
    label: "San Marino",
    hostnames: [domains.local.sanMarino, `www.${domains.local.sanMarino}`],
    eyebrow: "San Marino insurance advisor",
    heroTitle: "Insurance guidance for San Marino homes and businesses.",
    heroSubtitle:
      "Property, auto, umbrella, life, and business coverage decisions from the Huntington Drive office.",
    primaryOfficeId: "san-marino",
    serviceArea: ["San Marino", "Pasadena", "South Pasadena", "San Gabriel", "Arcadia", "Alhambra"],
    proofPoints: ["Huntington Drive office", "Property and family coverage", "Business certificates and liability"],
    localImage: {
      src: "/city-images/san-marino-huntington-chinese-garden.jpg",
      alt: "Chinese Garden at The Huntington in San Marino",
      caption: "The Huntington, San Marino",
      credit: "Hickorypine",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Huntington_Library_Chinese_Garden.jpg",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      objectPosition: "center center",
    },
    featuredGuideSlugs: ["fair-plan-basics-without-drama", "condo-insurance-and-the-master-policy-gap"],
    merchandising: [
      {
        title: "Protect the home",
        intro: "Home, condo, landlord, FAIR Plan, and California property-market questions.",
        productIds: ["home", "condo", "fair-plan", "california-property"],
        ctaLabel: "Review property coverage",
        href: "/home-insurance",
      },
      {
        title: "Protect the household",
        intro: "Auto, umbrella, life, and higher-liability conversations for established households.",
        productIds: ["auto", "umbrella", "life"],
        ctaLabel: "Review household coverage",
        href: "/auto-insurance",
      },
      {
        title: "Protect the business",
        intro: "Liability, property, business auto, certificate, vendor, and contract needs.",
        productIds: ["business", "auto", "umbrella"],
        ctaLabel: "Start business coverage",
        href: "/business-insurance",
      },
    ],
    localSeo: {
      title: "San Marino Insurance | Tracy Zhang Insurance",
      description:
        "San Marino insurance guidance for homes, autos, families, property owners, and businesses.",
      canonicalPath: "/locations/san-marino",
    },
  },
  "la-palma": {
    id: "la-palma",
    domainRole: "local",
    label: "La Palma",
    hostnames: [domains.local.laPalma, `www.${domains.local.laPalma}`],
    eyebrow: "La Palma insurance advisor",
    heroTitle: "Insurance help for La Palma households and small businesses.",
    heroSubtitle:
      "Auto, home, life, umbrella, property, and business coverage guidance from the Moody Street office.",
    primaryOfficeId: "la-palma",
    serviceArea: ["La Palma", "Cerritos", "Cypress", "Buena Park", "Artesia", "Orange County"],
    proofPoints: ["Moody Street office", "Family and small business coverage", "Multilingual support"],
    localImage: {
      src: "/city-images/la-palma-civic-center.jpg",
      alt: "La Palma Civic Center in La Palma, California",
      caption: "La Palma Civic Center",
      credit: "Mike Greene",
      creditUrl: "https://commons.wikimedia.org/wiki/File:LaPalmaCityHall.jpg",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
      objectPosition: "center center",
    },
    featuredGuideSlugs: ["why-we-ask-for-vins", "a-calm-way-to-shop-insurance-in-california"],
    merchandising: [
      {
        title: "For your household",
        intro: "Auto, home, condo, renters, and umbrella coverage reviewed together.",
        productIds: ["auto", "home", "condo", "renters", "umbrella"],
        ctaLabel: "Review household coverage",
        href: "/products#household",
      },
      {
        title: "For your next milestone",
        intro: "New home, new driver, marriage, children, renewal change, or family planning.",
        productIds: ["life", "auto", "home", "umbrella"],
        ctaLabel: "Plan a coverage review",
        href: "/life-insurance",
      },
      {
        title: "For your business",
        intro: "General liability, property, business auto, certificates, leases, and contracts.",
        productIds: ["business", "auto", "umbrella"],
        ctaLabel: "Start business help",
        href: "/business-insurance",
      },
    ],
    localSeo: {
      title: "La Palma Insurance | Tracy Zhang Insurance",
      description:
        "La Palma and Cerritos-area insurance guidance for households, life milestones, small businesses, and property questions.",
      canonicalPath: "/locations/la-palma",
    },
  },
  cerritos: {
    id: "cerritos",
    domainRole: "local",
    label: "Cerritos",
    hostnames: [],
    eyebrow: "Cerritos insurance guidance",
    heroTitle: "Insurance guidance for Cerritos households and businesses.",
    heroSubtitle:
      "A nearby La Palma office serving Cerritos with household, small business, life, and property coverage help.",
    primaryOfficeId: "la-palma",
    serviceArea: ["Cerritos", "La Palma", "Artesia", "Cypress", "Norwalk", "Orange County"],
    proofPoints: ["Nearby La Palma office", "Household coverage reviews", "Small business certificate help"],
    localImage: {
      src: "/city-images/la-palma-civic-center.jpg",
      alt: "La Palma Civic Center near Cerritos, California",
      caption: "La Palma office area",
      credit: "Mike Greene",
      creditUrl: "https://commons.wikimedia.org/wiki/File:LaPalmaCityHall.jpg",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
      objectPosition: "center center",
    },
    featuredGuideSlugs: ["why-we-ask-for-vins", "condo-insurance-and-the-master-policy-gap"],
    merchandising: [
      {
        title: "Household coverage",
        intro: "Auto, home, condo, renters, and umbrella coverage for Cerritos households.",
        productIds: ["auto", "home", "condo", "renters", "umbrella"],
        ctaLabel: "Review household coverage",
        href: "/products#household",
      },
      {
        title: "Small business needs",
        intro: "Certificates, contracts, liability, property, and commercial auto.",
        productIds: ["business", "auto", "umbrella"],
        ctaLabel: "Start business help",
        href: "/business-insurance",
      },
    ],
    localSeo: {
      title: "Cerritos Insurance Guidance | Tracy Zhang Insurance",
      description:
        "Insurance guidance for Cerritos households, property owners, drivers, families, and small businesses.",
      canonicalPath: "/locations/cerritos",
    },
  },
};

export function getOfficeById(id: Office["id"]) {
  return offices.find((office) => office.id === id) ?? offices[0];
}

export function getOfficeBySlug(slug: Office["slug"]) {
  return offices.find((office) => office.slug === slug);
}

export function getProductBySlug(slug: string) {
  return productBySlug[slug];
}

export function getMarketProfile(id: MarketId) {
  return marketProfiles[id];
}

export function getMarketByHost(hostHeader: string | null | undefined) {
  const normalized = normalizeHost(hostHeader);
  if (!normalized) return marketProfiles.statewide;

  const match = Object.values(marketProfiles).find((profile) =>
    profile.hostnames.some((hostname) => normalizeHost(hostname) === normalized),
  );

  return match ?? marketProfiles.statewide;
}

export function normalizeHost(hostHeader: string | null | undefined) {
  return (hostHeader ?? "")
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/:\d+$/, "");
}

export function isRetiredHost(hostHeader: string | null | undefined) {
  const normalized = normalizeHost(hostHeader);
  return domains.retired.some((hostname) => normalized === hostname || normalized === `www.${hostname}`);
}
