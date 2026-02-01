export type OfficeHour =
  | { day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri"; open: string; close: string }
  | { day: "Sat" | "Sun"; note: string };

export type Offering = {
  id: string;
  name: string;
  shortDescription: string;
  highlights: string[];
};

export const site = {
  brand: {
    name: "San Marino Insurance Agency",
    shortName: "Insurance for San Marino",
    legalLine: "Tracy Zhang: Allstate Insurance",
  },
  agent: {
    name: "Tracy Zhang",
    location: "San Marino, CA",
    address: {
      street: "1012 Huntington Dr",
      city: "San Marino",
      region: "CA",
      postalCode: "91108",
      country: "US",
    },
    phone: {
      display: "(626) 300-8338",
      e164: "+16263008338",
    },
    fax: {
      display: "(833) 679-4583",
    },
    languages: [
      "English",
      "Cantonese",
      "Spanish",
      "Mandarin",
      "Taiwanese",
      "Vietnamese",
    ],
    rating: {
      score: 4.3,
      outOf: 5,
      reviewCount: 204,
      sourceLabel: "Allstate reviews",
    },
    hours: [
      { day: "Mon", open: "9:00 AM", close: "6:00 PM" },
      { day: "Tue", open: "9:00 AM", close: "6:00 PM" },
      { day: "Wed", open: "9:00 AM", close: "6:00 PM" },
      { day: "Thu", open: "9:00 AM", close: "6:00 PM" },
      { day: "Fri", open: "9:00 AM", close: "6:00 PM" },
      { day: "Sat", note: "By appointment" },
      { day: "Sun", note: "By appointment" },
    ] satisfies OfficeHour[],
    notes: ["After-hours appointments available.", "Available 24/7 by phone."],
    links: {
      allstateProfile:
        "https://agents.allstate.com/tracy-cuiying-zhang-san-marino-ca.html",
      mapCid: "https://maps.google.com/maps?cid=10310965996194018044",
      mapEmbed:
        "https://www.google.com/maps?q=1012+Huntington+Dr,+San+Marino,+CA+91108&output=embed",
    },
    images: {
      headshot:
        "https://dynl.mktgcdn.com/p/ncsp4N_mp0oQIFKwfCvxOnPhuIDoDj5pjSIt6kFwEBs/196x196.jpg",
      portrait:
        "https://dynl.mktgcdn.com/p/jRxUArIFqqQ33xO4JXb-jCy8M_004ofoOmM5wGsnYXk/350x360.jpg",
    },
  },
  offerings: [
    {
      id: "auto",
      name: "Auto",
      shortDescription:
        "Coverage options for everyday driving, commuting, and new-car peace of mind.",
      highlights: [
        "Help meeting California requirements",
        "Options to protect your vehicle",
        "Bundle opportunities with home or renters",
      ],
    },
    {
      id: "home",
      name: "Home",
      shortDescription:
        "Protection for your home, belongings, and personal liability—built around your property.",
      highlights: [
        "Dwelling + personal property coverage options",
        "Liability protection options",
        "Ask about bundling and other discounts",
      ],
    },
    {
      id: "condo",
      name: "Condo",
      shortDescription:
        "Condo coverage that complements your association’s master policy and protects what’s inside your unit.",
      highlights: [
        "Interior improvements + personal property",
        "Personal liability options",
        "Flexible deductibles and add-ons",
      ],
    },
    {
      id: "renters",
      name: "Renters",
      shortDescription:
        "Affordable coverage for your belongings and personal liability—at home and on the go.",
      highlights: ["Personal property options", "Liability options", "Fast setup"],
    },
    {
      id: "life",
      name: "Life",
      shortDescription:
        "Life insurance options that can help your loved ones cover everyday costs and long-term plans.",
      highlights: [
        "Term and permanent options",
        "Review coverage as life changes",
        "Simple guidance, no pressure",
      ],
    },
    {
      id: "business",
      name: "Business",
      shortDescription:
        "Insurance solutions for small businesses—designed to help protect what you’ve worked to build.",
      highlights: [
        "Property and liability options",
        "Business interruption options",
        "Coverage reviews as you grow",
      ],
    },
  ] satisfies Offering[],
};

export function getFullAddressLine() {
  const a = site.agent.address;
  return `${a.street}, ${a.city}, ${a.region} ${a.postalCode}`;
}
