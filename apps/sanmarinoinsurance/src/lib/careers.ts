export type CareerRole = {
  id: string;
  title: string;
  type: string;
  focus: string[];
  goodFor: string[];
};

export const careerRoles = [
  {
    id: "licensed-sales-professional-pc",
    title: "Licensed Sales Professional (P&C)",
    type: "Full-time or part-time",
    focus: [
      "Help customers compare auto, home, renters, condo, and small business coverage options",
      "Build long‑term relationships with families and business owners in the San Marino area",
      "Follow up on quotes, renewals, and coverage reviews with a service-first approach",
    ],
    goodFor: [
      "You’re licensed in California (Property & Casualty) or actively working toward it",
      "You enjoy explaining complex topics clearly and responsibly",
      "You like goals — but you care more about doing right by the customer",
    ],
  },
  {
    id: "customer-service-representative",
    title: "Customer Service Representative",
    type: "Full-time",
    focus: [
      "Support policy changes, billing questions, and proof-of-insurance requests",
      "Coordinate follow‑ups and keep client records organized",
      "Provide a calm, helpful experience for every call and visit",
    ],
    goodFor: [
      "You’re organized, responsive, and detail-oriented",
      "You’re comfortable learning new systems and processes",
      "You value clear communication and follow-through",
    ],
  },
  {
    id: "office-client-experience-associate",
    title: "Office & Client Experience Associate",
    type: "Part-time",
    focus: [
      "Welcome clients in-office and help with scheduling and document intake",
      "Keep the office running smoothly and support the team with administrative tasks",
      "Assist with community outreach and local events as needed",
    ],
    goodFor: [
      "You’re reliable and enjoy supporting a small, fast-moving team",
      "You’re friendly in person and professional over the phone",
      "You want experience in a local business with real customer impact",
    ],
  },
] satisfies CareerRole[];

