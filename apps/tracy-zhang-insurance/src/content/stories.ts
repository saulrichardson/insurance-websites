import type { ProductId } from "@insurance-websites/domain";

export type StoryImage = {
  src: `/${string}`;
  alt: string;
  caption?: string;
};

export type StorySection =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "image"; image: StoryImage };

export type Story = {
  slug: string;
  title: string;
  description: string;
  dateISO: string;
  readingMinutes: number;
  tags: string[];
  relatedProductIds: ProductId[];
  image?: StoryImage;
  sections: StorySection[];
};

function byDateDesc(a: Story, b: Story) {
  return new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime();
}

const unsortedStories: Story[] = [
  {
    slug: "cheapest-insurance-not-always-best-deal",
    title: "The Cheapest Insurance Is Not Always the Best Deal",
    description:
      "Why the lowest premium can hide tradeoffs, and how to compare price, coverage, carrier strength, and claim-time value.",
    dateISO: "2026-06-09",
    readingMinutes: 9,
    tags: ["Coverage", "Value", "Renewals"],
    relatedProductIds: ["auto", "home", "umbrella", "california-property"],
    image: {
      src: "/story-images/cheapest-insurance-hero.webp",
      alt: "A calm insurance desk with a model home, car keys, blank policy papers, and an umbrella.",
      caption:
        "Price is visible at renewal. Value shows up when coverage is tested.",
    },
    sections: [
      {
        type: "p",
        text: "A customer called our office recently with a question we hear more often now.",
      },
      {
        type: "p",
        text: "“My renewal went up. Can you find me something cheaper?”",
      },
      {
        type: "p",
        text: "It was a fair question. Nobody likes paying more for insurance. Most people are already watching the cost of groceries, utilities, repairs, vehicles, and everything else that seems to have crept up over the last few years.",
      },
      {
        type: "p",
        text: "So yes, price matters.",
      },
      {
        type: "p",
        text: "But before we talked about price, we talked about what had changed.",
      },
      {
        type: "p",
        text: "The home was worth more than it used to be. The cost to rebuild had changed. Labor was more expensive. Materials were more expensive. Storms in the area had been more frequent. The cars in the driveway had more technology in them than cars did ten years ago, which means even a minor accident can be costly to repair.",
      },
      {
        type: "p",
        text: "The customer did not need a sales pitch.",
      },
      {
        type: "p",
        text: "They needed context.",
      },
      {
        type: "p",
        text: "That is the part of insurance people do not always see when they are comparing quotes online. The premium is easy to see. The value behind it is harder to measure.",
      },
      {
        type: "p",
        text: "But that value is what matters most when something actually happens.",
      },
      {
        type: "h2",
        text: "Insurance is not just a bill",
      },
      {
        type: "p",
        text: "Most people think about insurance when the bill arrives.",
      },
      {
        type: "p",
        text: "Agents think about insurance when the claim arrives.",
      },
      {
        type: "p",
        text: "That difference matters.",
      },
      {
        type: "p",
        text: "A premium is what you pay before anything goes wrong. Coverage is what you rely on after something goes wrong. If the only goal is to make the bill as small as possible, it is easy to miss the larger point.",
      },
      {
        type: "p",
        text: "Insurance is not supposed to be the cheapest piece of paper you can find. It is supposed to be a promise that holds up under pressure.",
      },
      {
        type: "p",
        text: "That pressure looks different today than it did years ago.",
      },
      {
        type: "p",
        text: "A hailstorm can damage hundreds of roofs in one afternoon. A distracted driver can turn a normal commute into a six-figure liability claim. A kitchen fire can become a months-long rebuilding project. A lawsuit can move faster than a family’s savings account. A new vehicle bumper may contain sensors, cameras, and parts that make yesterday’s minor repair much more expensive today.",
      },
      {
        type: "p",
        text: "This is the world insurance has to respond to now.",
      },
      {
        type: "p",
        text: "So when someone asks, “Why is this policy a little more?” the answer should not be vague. It should be specific.",
      },
      {
        type: "ul",
        items: [
          "What protection are you getting?",
          "What company is standing behind it?",
          "How are claims handled?",
          "Are your limits realistic?",
          "Are your deductibles manageable?",
          "What happens if the loss is bigger than expected?",
        ],
      },
      {
        type: "p",
        text: "That is where price and value separate.",
      },
      {
        type: "image",
        image: {
          src: "/story-images/cheapest-insurance-tradeoff.webp",
          alt: "A balance scale between a thin policy folder and a fuller policy folder with a small home and car model.",
          caption:
            "A lower price can be a smart fit, or it can move more risk back to you.",
        },
      },
      {
        type: "h2",
        text: "The lowest number can hide the biggest risk",
      },
      {
        type: "p",
        text: "Two policies can look similar until you read the details.",
      },
      {
        type: "p",
        text: "One may have lower liability limits. One may have a higher deductible. One may leave out coverage that another includes. One may handle a loss differently. One may look attractive today but leave you with more financial responsibility later.",
      },
      {
        type: "p",
        text: "That does not mean the more expensive policy is always better.",
      },
      {
        type: "p",
        text: "It means the cheaper policy has to be examined.",
      },
      {
        type: "p",
        text: "Sometimes a lower premium is the result of smart discounts, better bundling, improved rating, or an adjustment that truly fits your situation. That is good. We want that for our customers.",
      },
      {
        type: "p",
        text: "But sometimes a lower premium is lower because something important was removed.",
      },
      {
        type: "p",
        text: "That is not savings. That is exposure.",
      },
      {
        type: "p",
        text: "The hard part is that you may not know the difference until claim time. By then, it is too late to go back and buy the coverage you wish you had.",
      },
      {
        type: "h2",
        text: "Why the company behind the policy matters",
      },
      {
        type: "p",
        text: "A local agency relationship matters. You want someone nearby who can answer the phone, explain the options, and help you think through real-life decisions.",
      },
      {
        type: "p",
        text: "But the company behind the policy matters too.",
      },
      {
        type: "p",
        text: "That is one of the reasons we are proud to represent Allstate.",
      },
      {
        type: "p",
        text: "A strong insurance brand is not just a name on a commercial. It represents claims experience, underwriting discipline, technology, financial resources, catastrophe planning, and the ability to serve customers across many different situations.",
      },
      {
        type: "p",
        text: "That matters more now than it used to.",
      },
      {
        type: "p",
        text: "Insurance works because many people participate in the system. One household may have a claim this year. Another may not. One neighborhood may be hit by hail. Another may be spared. One driver may cause an accident. Thousands of others may drive safely.",
      },
      {
        type: "p",
        text: "The strength of the system comes from spreading responsibility across many customers, many places, and many types of risk. That does not make losses disappear, but it helps create the financial structure that allows an insurance company to keep its promise when claims come in.",
      },
      {
        type: "p",
        text: "When you buy insurance, you are not only buying a price.",
      },
      {
        type: "p",
        text: "You are choosing the organization that will be there when the promise has to become real.",
      },
      {
        type: "image",
        image: {
          src: "/story-images/cheapest-insurance-claim.webp",
          alt: "An organized claims support desk with blank forms, a home blueprint, a phone, a lamp, and a small umbrella.",
          caption:
            "The policy is only part of the decision. Claims process, carrier strength, and local guidance matter too.",
        },
      },
      {
        type: "h2",
        text: "Risk has changed, so the conversation has to change",
      },
      {
        type: "p",
        text: "For years, a lot of insurance conversations were simple.",
      },
      {
        type: "ul",
        items: [
          "How much is it?",
          "Can I bundle it?",
          "Can I lower the deductible?",
          "Do I have full coverage?",
        ],
      },
      {
        type: "p",
        text: "Those questions still matter, but they are not enough.",
      },
      {
        type: "p",
        text: "Today, the better conversation is broader.",
      },
      {
        type: "ul",
        items: [
          "Is your home insured for what it may actually cost to rebuild?",
          "Do your auto limits reflect the cost of today’s vehicles and medical care?",
          "Would your liability coverage protect your savings if you were sued?",
          "Does your deductible still make sense for your cash flow?",
          "Are there discounts you qualify for but are not using?",
          "Has your life changed since the policy was written?",
        ],
      },
      {
        type: "p",
        text: "Maybe you renovated the house. Maybe a young driver joined the household. Maybe you started working from home. Maybe you bought new valuables. Maybe you added a pool, a dog, a trailer, a rental property, or a side business.",
      },
      {
        type: "p",
        text: "Insurance should keep up with life.",
      },
      {
        type: "p",
        text: "A policy that made sense five years ago may not fit today. A quote that looks cheap may not reflect the risk you actually carry. A renewal that looks expensive may include protection you would be uncomfortable losing if someone explained the tradeoff clearly.",
      },
      {
        type: "p",
        text: "That is our job.",
      },
      {
        type: "p",
        text: "Not to scare people. Not to oversell. Not to make insurance more complicated than it needs to be.",
      },
      {
        type: "p",
        text: "Our job is to help people make informed decisions before the decision is tested.",
      },
      {
        type: "h2",
        text: "Value is not about paying more",
      },
      {
        type: "p",
        text: "When we talk about value, we are not saying everyone should pay the highest premium.",
      },
      {
        type: "p",
        text: "That would be lazy advice.",
      },
      {
        type: "p",
        text: "Good insurance advice should include cost. It should include discounts. It should include bundling. It should include deductible options. It should include honest conversations about what coverage you need and what coverage you may not need.",
      },
      {
        type: "p",
        text: "Sometimes we can help someone save money.",
      },
      {
        type: "p",
        text: "Sometimes we recommend adjusting coverage.",
      },
      {
        type: "p",
        text: "Sometimes we explain why staying where you are is the better decision, even if another quote looks tempting.",
      },
      {
        type: "p",
        text: "That is what a real review is supposed to do.",
      },
      {
        type: "p",
        text: "Value is not about paying more. Value is about understanding what your money is doing.",
      },
      {
        type: "p",
        text: "If a policy costs less and protects you well, that is a good outcome. If a policy costs a little more but protects you meaningfully better, that may also be a good outcome. The only bad outcome is choosing blindly.",
      },
      {
        type: "h2",
        text: "The real question",
      },
      {
        type: "p",
        text: "The next time you look at your insurance premium, do not ignore the price.",
      },
      {
        type: "p",
        text: "But do not stop there.",
      },
      {
        type: "p",
        text: "Ask what is behind it.",
      },
      {
        type: "p",
        text: "Ask what would happen after a claim. Ask whether your limits are strong enough. Ask whether your home is properly insured. Ask whether your deductible is realistic. Ask whether the company behind the policy has the scale, experience, and infrastructure to respond when customers need them.",
      },
      {
        type: "p",
        text: "That is the part people are really buying.",
      },
      {
        type: "p",
        text: "Not just a cheaper bill.",
      },
      {
        type: "p",
        text: "A stronger position.",
      },
      {
        type: "p",
        text: "A clearer plan.",
      },
      {
        type: "p",
        text: "A promise backed by people, process, and financial strength.",
      },
      {
        type: "p",
        text: "At our agency, we know price will always be part of the conversation. It should be. But we also believe the best insurance decision is not always the lowest number on a screen.",
      },
      {
        type: "p",
        text: "The best decision is the one you still feel good about when something goes wrong.",
      },
      {
        type: "p",
        text: "If you have not reviewed your coverage recently, bring us your renewal. Bring us the quote you are comparing. Bring us the questions you have been meaning to ask.",
      },
      {
        type: "p",
        text: "We will help you look past the premium and understand what you are actually paying for.",
      },
      {
        type: "p",
        text: "Because when the value is clear, the price finally has context.",
      },
      {
        type: "p",
        text: "Note: This story is general information and does not bind or change coverage. Coverage, eligibility, pricing, discounts, and claims handling depend on policy terms, carrier guidelines, and your specific situation.",
      },
    ],
  },
  {
    slug: "a-calm-way-to-shop-insurance-in-california",
    title: "A calm way to shop for insurance in California",
    description:
      "What you can expect when you call or text—and why we keep the process simple.",
    dateISO: "2026-01-17",
    readingMinutes: 4,
    tags: ["California", "Process", "Local"],
    relatedProductIds: ["auto", "home", "business", "life"],
    sections: [
      {
        type: "p",
        text: "If insurance shopping has ever felt like a pressure cooker—too many choices, too many acronyms, and not enough clarity—you’re not alone. Our goal is to make it feel calm.",
      },
      {
        type: "p",
        text: "We work with California clients through local offices in San Marino and La Palma. People reach out when they’re buying a new car, moving homes, starting a business, or just realizing: “I should probably tighten this up.”",
      },
      {
        type: "h2",
        text: "What we optimize for",
      },
      {
        type: "ul",
        items: [
          "Fast response (because life doesn’t wait for email chains)",
          "Plain-English tradeoffs (so you understand what changes protection)",
          "A quote you can trust (so there are fewer surprises later)",
          "A plan you can keep (so updates and renewals don’t become a mess)",
        ],
      },
      {
        type: "quote",
        text: "The best policy is the one you actually understand—before you need it.",
      },
      {
        type: "h2",
        text: "How to start (the no-drama version)",
      },
      {
        type: "p",
        text: "If you want the fastest path, call or text. We’ll ask only for details that change your price or eligibility. For auto, that usually means drivers and vehicles (VINs help). For home, the property address and basics. For business, a quick description of operations.",
      },
      {
        type: "p",
        text: "If you don’t know a detail, that’s okay. We’ll work with what you have and tell you exactly what would improve accuracy.",
      },
      {
        type: "p",
        text: "Note: Coverage and eligibility vary by carrier, risk, and underwriting guidelines. This story is general information and doesn’t bind coverage.",
      },
    ],
  },
  {
    slug: "fair-plan-basics-without-drama",
    title: "CA FAIR Plan, without the drama",
    description:
      "When it helps, what it doesn’t do, and the “next best” thinking we use in California.",
    dateISO: "2026-01-14",
    readingMinutes: 6,
    tags: ["California", "CA FAIR Plan", "Home"],
    relatedProductIds: ["fair-plan", "home", "california-property"],
    sections: [
      {
        type: "p",
        text: "In California, sometimes the normal path to homeowners insurance isn’t available. When that happens, people hear “FAIR Plan” and assume it’s either a magic fix—or a dead end.",
      },
      {
        type: "p",
        text: "It’s neither. The CA FAIR Plan can be a tool in the toolbox for certain properties and situations. Our job is to help you understand where it fits, and what you’ll likely still need.",
      },
      {
        type: "h2",
        text: "A simple way to think about it",
      },
      {
        type: "ul",
        items: [
          "Standard market: best when available (broad options, smoother servicing)",
          "Specialty markets: sometimes the next step when the standard market is tight",
          "CA FAIR Plan: can help when other options aren’t available—but it may not cover everything you want in one place",
        ],
      },
      {
        type: "h2",
        text: "What we do for clients",
      },
      {
        type: "p",
        text: "We start by understanding the property and the goal: are you trying to close escrow, satisfy a lender, protect a long-term residence, or insure a rental? Then we map the quickest realistic path to coverage—without pretending every policy is identical.",
      },
      {
        type: "quote",
        text: "In California, the right solution is often a good plan—not a single magic policy.",
      },
      {
        type: "p",
        text: "Note: This is general information. Programs, availability, and underwriting guidelines change. We’ll confirm current options for your specific risk and location.",
      },
    ],
  },
  {
    slug: "condo-insurance-and-the-master-policy-gap",
    title: "Condo insurance and the master policy gap",
    description:
      "A story-shaped walkthrough of how HO-6 coverage fits with an HOA master policy.",
    dateISO: "2026-01-10",
    readingMinutes: 5,
    tags: ["Condo", "HOA", "Coverage"],
    relatedProductIds: ["condo", "home", "umbrella"],
    sections: [
      {
        type: "p",
        text: "A condo owner calls and says: “I have HOA insurance—do I still need my own policy?” It’s one of the most common questions we get, and the answer is almost always yes.",
      },
      {
        type: "p",
        text: "The reason is simple: HOA master policies vary, and there’s often a gap between what the building covers and what the unit owner is responsible for—especially when upgrades, interior finishes, or assessments are involved.",
      },
      {
        type: "h2",
        text: "The three buckets we care about",
      },
      {
        type: "ul",
        items: [
          "Your stuff (personal property)",
          "You as a person (liability)",
          "Your unit’s interior (improvements / betterments, depending on the HOA policy)",
        ],
      },
      {
        type: "h2",
        text: "How we make it simple",
      },
      {
        type: "p",
        text: "If you have it, we’ll review the HOA master policy summary (or key pages). If you don’t, we’ll start with typical scenarios and refine as we learn more. The goal is not to make you a policy expert—it’s to make sure the coverage lines up with responsibility.",
      },
      {
        type: "p",
        text: "Note: This story is general information and doesn’t replace the HOA governing documents or insurance policy terms.",
      },
    ],
  },
  {
    slug: "why-we-ask-for-vins",
    title: "Why we ask for VINs (and how it speeds things up)",
    description:
      "It’s not busywork. It reduces quote surprises and keeps coverage aligned with the actual vehicle.",
    dateISO: "2026-01-08",
    readingMinutes: 3,
    tags: ["Auto", "Quoting"],
    relatedProductIds: ["auto", "motorcycle", "atv"],
    sections: [
      {
        type: "p",
        text: "When you request an auto quote, we often ask for VINs. It can feel picky. Here’s why it matters: the VIN is the most reliable way to identify the exact vehicle and its details.",
      },
      {
        type: "p",
        text: "That single data point can reduce back-and-forth, prevent mismatched trim packages, and help avoid a “quote changed after binding” situation.",
      },
      {
        type: "h2",
        text: "If you don’t have the VIN yet",
      },
      {
        type: "p",
        text: "No problem. We can usually start with year/make/model and refine later. We’ll tell you what’s provisional and what’s final, so you’re not guessing.",
      },
      {
        type: "p",
        text: "Note: Quotes are subject to underwriting, eligibility, and carrier guidelines and do not bind coverage.",
      },
    ],
  },
];

export const stories = [...unsortedStories].sort(byDateDesc);

export function getStory(slug: string): Story | undefined {
  return stories.find((story) => story.slug === slug);
}

export function getStorySlugs(): string[] {
  return stories.map((story) => story.slug);
}
