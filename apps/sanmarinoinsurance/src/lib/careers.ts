export type CareerRole = {
  id: string;
  title: string;
  team: string;
  locations: string[];
  type: string;
  intro: string;
  about: string[];
  focus: string[];
  goodFor: string[];
};

export const careerRoles = [
  {
    id: "licensed-sales-professional-pc",
    title: "Licensed Sales Professional (P&C)",
    team: "Sales",
    locations: ["San Marino, CA"],
    type: "Full-time or part-time",
    intro:
      "Help families and small business owners compare coverage options with clarity, speed, and care.",
    about: [
      "This role is for someone who enjoys conversations, follows through, and takes pride in explaining coverage the right way — not the fast way.",
      "You’ll meet customers at moments that matter: buying a home, adding a teen driver, starting a business, or simply realizing they haven’t reviewed their policies in years. Your job is to make the process calm and straightforward.",
      "We’re a small, service-first agency. That means you’ll work closely with the owner and team, and you’ll have real influence on how we take care of clients.",
    ],
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
    team: "Service",
    locations: ["San Marino, CA"],
    type: "Full-time",
    intro:
      "Be the steady, dependable point of contact clients remember — fast answers, organized follow‑ups, and real ownership.",
    about: [
      "Great agencies are built on trust, and trust is built on service. This role is the backbone of that experience.",
      "You’ll help clients with policy changes, billing questions, and proofs of insurance — and you’ll make sure the small things don’t become big problems.",
      "If you’re detail‑oriented, kind under pressure, and you enjoy making systems run smoother, you’ll fit in well.",
    ],
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
    team: "Operations",
    locations: ["San Marino, CA"],
    type: "Part-time",
    intro:
      "Create a polished in‑office experience — scheduling, intake, and the behind‑the‑scenes details that keep the day on track.",
    about: [
      "This role supports the day-to-day rhythm of the office: welcoming clients, keeping documents organized, and helping the team stay focused.",
      "You’ll be the first impression for walk‑ins and scheduled visits, and you’ll help us stay responsive while we handle calls, quotes, and service requests.",
      "It’s a great fit for someone who’s reliable, professional, and enjoys helping people feel taken care of.",
    ],
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
