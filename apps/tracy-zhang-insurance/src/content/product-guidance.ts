export type ProductGuide = {
  product: string;
  audience: string;
  quoteFactors: string[];
  prepare: string[];
  watchouts: string[];
  relatedStorySlugs: string[];
};

export const productGuides: Record<string, ProductGuide> = {
  "auto-insurance": {
    product: "Auto insurance",
    audience:
      "Families, commuters, multi-car households, new drivers, and people who want liability limits explained before they shop only on price.",
    quoteFactors: [
      "Drivers, garaging address, vehicle use, annual mileage, and claim history",
      "Liability limits, deductibles, comprehensive/collision choices, and uninsured motorist coverage",
      "Bundling opportunities with home, renters, condo, or umbrella coverage",
    ],
    prepare: [
      "Driver names and dates of birth",
      "VINs for each vehicle, plus year/make/model if available",
      "Current declarations page if you want a clean comparison",
    ],
    watchouts: [
      "Minimum limits can leave assets exposed",
      "Teen or household drivers can change the best structure",
      "A low premium can hide high deductibles or missing rental coverage",
    ],
    relatedStorySlugs: ["why-we-ask-for-vins", "a-calm-way-to-shop-insurance-in-california"],
  },
  "home-insurance": {
    product: "Home insurance",
    audience:
      "Homeowners who need clear decisions around rebuild cost, deductibles, belongings, liability, and California property-market constraints.",
    quoteFactors: [
      "Property location, age, roof, occupancy, rebuild estimate, and prior claims",
      "Dwelling limits, personal property, liability, deductibles, and endorsements",
      "Carrier appetite in the current California property market",
    ],
    prepare: [
      "Property address and occupancy",
      "Current declarations page if available",
      "Mortgagee/lender details when a lender needs proof",
    ],
    watchouts: [
      "Replacement cost and market value are not the same thing",
      "Special limits can affect jewelry, collectibles, and other valuables",
      "Wildfire or carrier restrictions may change the realistic path",
    ],
    relatedStorySlugs: [
      "why-you-should-consider-the-ca-fair-plan",
      "fair-plan-basics-without-drama",
    ],
  },
  "condo-insurance": {
    product: "Condo insurance",
    audience:
      "Condo owners who need their HO-6 policy to fit the HOA master policy, lender requirements, and personal belongings.",
    quoteFactors: [
      "HOA master policy structure and owner responsibilities",
      "Interior improvements, personal property, liability, and loss assessment limits",
      "Unit occupancy, address, and any lender requirements",
    ],
    prepare: [
      "HOA insurance summary or master-policy details if available",
      "Loan closing or lender requirements",
      "Inventory of upgrades or meaningful personal property",
    ],
    watchouts: [
      "HOA coverage rarely covers everything inside the unit",
      "Loss assessment can be easy to overlook",
      "Interior finishes and upgrades can create responsibility gaps",
    ],
    relatedStorySlugs: ["condo-insurance-and-the-master-policy-gap"],
  },
  "renters-insurance": {
    product: "Renters insurance",
    audience:
      "Renters who need affordable personal property and liability coverage for apartments, leases, and shared living situations.",
    quoteFactors: [
      "Address, building type, personal property limits, and liability limits",
      "Deductible choices and whether replacement cost is available",
      "Lease or landlord insurance requirements",
    ],
    prepare: [
      "Rental address",
      "Lease requirements if your landlord provided them",
      "Rough estimate of belongings you would need to replace",
    ],
    watchouts: [
      "Landlord insurance does not cover your belongings",
      "Roommates usually need their own coverage",
      "A very low limit can be outgrown quickly",
    ],
    relatedStorySlugs: ["a-calm-way-to-shop-insurance-in-california"],
  },
  "life-insurance": {
    product: "Life insurance",
    audience:
      "Families and individuals thinking through income protection, mortgage obligations, dependents, and long-term planning.",
    quoteFactors: [
      "Coverage amount, term length, age, health context, and underwriting class",
      "Income replacement, debts, children, mortgage, and planning goals",
      "Term versus permanent coverage fit",
    ],
    prepare: [
      "Basic household and income context",
      "Existing coverage through work or personal policies",
      "A rough idea of what the coverage needs to protect",
    ],
    watchouts: [
      "Work coverage may not follow you if your job changes",
      "Coverage needs change after marriage, children, mortgage, or business ownership",
      "Waiting can narrow options or raise cost",
    ],
    relatedStorySlugs: ["a-calm-way-to-shop-insurance-in-california"],
  },
  "business-insurance": {
    product: "Business insurance",
    audience:
      "Business owners who need liability, property, vehicles, certificates, contract compliance, or specialty market access.",
    quoteFactors: [
      "Operations, revenue, payroll, locations, vehicles, contracts, and prior claims",
      "General liability, property, commercial auto, workers compensation, and excess limits",
      "Certificate wording, additional insured requests, and landlord/vendor requirements",
    ],
    prepare: [
      "Business legal name and entity type",
      "Description of operations and locations",
      "Contracts, certificate requirements, or current policy if available",
    ],
    watchouts: [
      "Contract requirements can be stricter than a basic policy",
      "A certificate does not change coverage unless the policy supports it",
      "Commercial auto and personal auto are not interchangeable",
    ],
    relatedStorySlugs: ["a-calm-way-to-shop-insurance-in-california"],
  },
  "umbrella-insurance": {
    product: "Umbrella insurance",
    audience:
      "Households and business owners who want liability limits reviewed before one severe claim creates long-term exposure.",
    quoteFactors: [
      "Underlying home, auto, boat, rental property, and eligible business limits",
      "Drivers, properties, vehicles, watercraft, and higher-risk household context",
      "Carrier eligibility and whether base policies meet required minimum limits",
    ],
    prepare: [
      "Current declarations pages for underlying policies",
      "Household driver and property context",
      "Any contracts, rental property, or unusual liability exposure",
    ],
    watchouts: [
      "Umbrella policies usually require minimum underlying limits",
      "Not every exposure is automatically covered",
      "A low base liability limit can leave gaps even with an umbrella conversation",
    ],
    relatedStorySlugs: ["why-we-ask-for-vins", "condo-insurance-and-the-master-policy-gap"],
  },
  "motorcycle-insurance": {
    product: "Motorcycle insurance",
    audience:
      "Riders who want liability, physical damage, gear, and usage decisions reviewed before choosing a low premium.",
    quoteFactors: [
      "Bike year/make/model, usage, garaging address, riders, and safety courses",
      "Liability limits, deductibles, comprehensive/collision, and accessory coverage",
      "Seasonal or recreational use patterns",
    ],
    prepare: [
      "VIN, plus year/make/model if available",
      "Rider information",
      "Lienholder details if financed",
    ],
    watchouts: [
      "Accessories and gear may need separate attention",
      "Weekend use still creates liability exposure",
      "Financed bikes often have lender requirements",
    ],
    relatedStorySlugs: ["why-we-ask-for-vins"],
  },
  "atv-insurance": {
    product: "ATV insurance",
    audience:
      "Owners of recreational off-road vehicles who need liability and physical damage conversations that match actual use.",
    quoteFactors: [
      "Vehicle type, usage, storage location, riders, and whether it is financed",
      "Liability limits, physical damage, accessories, and trailer considerations",
      "Where and how the vehicle is used",
    ],
    prepare: [
      "VIN, plus year/make/model if available",
      "Primary storage location",
      "Lienholder details if financed",
    ],
    watchouts: [
      "Home policies may not handle off-road exposure the way owners expect",
      "Transport and storage can matter",
      "Recreational vehicles often have usage exclusions",
    ],
    relatedStorySlugs: ["why-we-ask-for-vins"],
  },
  "boat-insurance": {
    product: "Boat insurance",
    audience:
      "Boat owners who need coverage matched to the vessel, waters used, trailer, equipment, and liability exposure.",
    quoteFactors: [
      "Boat type, length, age, value, storage, operator history, and navigation area",
      "Liability, hull coverage, deductibles, trailer, equipment, and towing options",
      "Marina, lender, or storage requirements",
    ],
    prepare: [
      "Hull ID or vessel details",
      "Trailer information if applicable",
      "Lienholder or marina requirements",
    ],
    watchouts: [
      "Navigation limits can matter",
      "Equipment and trailers may need explicit coverage",
      "A lender or marina may require proof before use or storage",
    ],
    relatedStorySlugs: ["a-calm-way-to-shop-insurance-in-california"],
  },
  "fair-plan": {
    product: "CA FAIR Plan guidance",
    audience:
      "California property owners who need a practical path when standard homeowners markets are limited or unavailable.",
    quoteFactors: [
      "Property location, construction, occupancy, brush/wildfire context, and carrier availability",
      "Whether standard, specialty, or FAIR Plan placement is realistic",
      "Companion coverage needs that may not fit into one policy",
    ],
    prepare: [
      "Property address and current policy/nonrenewal details",
      "Lender deadline if coverage is required for escrow or renewal",
      "Any inspections, mitigation details, or prior carrier communications",
    ],
    watchouts: [
      "FAIR Plan may be one part of the solution, not the whole solution",
      "Deadlines matter when a lender or escrow is involved",
      "California market availability changes and must be confirmed for the risk",
    ],
    relatedStorySlugs: [
      "why-you-should-consider-the-ca-fair-plan",
      "fair-plan-basics-without-drama",
    ],
  },
  "california-property-insurance": {
    product: "California property insurance",
    audience:
      "Property owners dealing with renewal changes, nonrenewal concerns, lender deadlines, or limited carrier availability in California.",
    quoteFactors: [
      "Property location, roof, age, occupancy, rebuild estimate, and prior loss history",
      "Current carrier availability, renewal status, wildfire or underwriting context",
      "Whether standard, specialty, FAIR Plan, or companion coverage paths are realistic",
    ],
    prepare: [
      "Current declarations page and renewal/nonrenewal notices",
      "Property address and occupancy details",
      "Lender, escrow, or renewal deadline if there is one",
    ],
    watchouts: [
      "California property options change quickly and need current review",
      "Market value and rebuild cost are different conversations",
      "A lender deadline can narrow what is realistic if the review starts too late",
    ],
    relatedStorySlugs: [
      "why-you-should-consider-the-ca-fair-plan",
      "fair-plan-basics-without-drama",
    ],
  },
};

export function getProductGuide(slug: string) {
  return productGuides[slug];
}
