import type { ReactNode } from "react";
import { Home as HomeIcon, Phone, ShieldCheck, Waves, Flame } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { QuoteRequestForm } from "@/components/quote-request-form";
import { ProductScenarioSelector, type ProductScenario } from "@/components/product/product-scenario-selector";
import { HomeIllustration } from "@/components/product/product-illustrations";
import { ProductStickyCta } from "@/components/product/product-sticky-cta";
import { ProcessCard, RelatedCard, SavingsCard, ValueCard } from "@/components/product/product-cards";
import { site } from "@/lib/site";

export const metadata = {
  title: "Home insurance",
  description: `Home insurance guidance in ${site.agent.location}. Review dwelling coverage, deductibles, liability options, and bundling opportunities with ${site.agent.name}.`,
};

const scenarios: ProductScenario[] = [
  {
    id: "primary",
    label: "Primary residence",
    kicker: "A clear plan for dwelling, belongings, and liability.",
    summary:
      "Homeowners who want coverage aligned to realistic rebuild costs and day‑to‑day risks—without confusing jargon or vague answers.",
    focus: [
      "Dwelling coverage and how rebuild cost is typically discussed",
      "Personal property: replacement‑cost vs. actual cash value conversations",
      "Loss of use / additional living expense planning",
      "Personal liability options and when an umbrella is worth discussing",
    ],
    addOns: [
      "Water backup coverage (when available and appropriate)",
      "Scheduled personal property for jewelry, art, or specialty items",
      "Higher liability limits or umbrella alignment",
      "Bundle strategy with auto for value and simpler renewals",
    ],
    toPrepare: [
      "Property address, year built, and approximate square footage",
      "Roof type/age and any recent upgrades",
      "Prior claims info (if any) and current declarations page (if available)",
      "A quick list of high‑value items you’d want to schedule",
    ],
    disclaimer:
      "Coverage availability and options vary by carrier, construction details, and underwriting. We’ll confirm what applies to your home and ZIP.",
  },
  {
    id: "remodel",
    label: "Renovation or major upgrades",
    kicker: "Keep coverage aligned as the home changes.",
    summary:
      "Homeowners who recently remodeled (or plan to) and want to make sure improvements are reflected in dwelling coverage—without surprises at claim time.",
    focus: [
      "Dwelling limit review after upgrades (kitchen, bath, additions, solar, etc.)",
      "Other structures and improvements (detached garage, studio, ADU)",
      "Deductible and premium strategy for the updated property",
      "Documentation habits that simplify future claims",
    ],
    addOns: [
      "Higher limits for other structures if you’ve expanded the property",
      "Scheduled items for new purchases (appliances, jewelry, art)",
      "Umbrella review if overall exposure increased",
      "Bundle review for savings and simpler renewals",
    ],
    toPrepare: [
      "A quick summary of what changed (and approximate costs)",
      "Any permits or contractor invoices (if available)",
      "Photos of improvements (helpful for accurate discussions)",
      "Current policy declarations page and renewal date",
    ],
    disclaimer:
      "Home upgrades can change both replacement cost and underwriting fit. We’ll outline what to adjust now vs. what can wait.",
  },
  {
    id: "water",
    label: "Water / plumbing risk focus",
    kicker: "Clarify what’s covered, what’s excluded, and what’s optional.",
    summary:
      "Homeowners who are specifically concerned about water damage and want clear expectations about the differences between sudden loss, seepage, and backup.",
    focus: [
      "How policies often distinguish sudden water loss vs. long‑term seepage",
      "Deductibles and claim scenarios in plain language",
      "Documentation and mitigation steps that help during a claim",
      "How upgrades (pipes, water heater) may affect fit and pricing",
    ],
    addOns: [
      "Water backup coverage when available",
      "Higher personal property options if water damage would be disruptive",
      "Loss‑of‑use planning (temporary housing expectations)",
      "Bundle review for stability and simplicity",
    ],
    toPrepare: [
      "Age of plumbing and water heater (approximate is fine)",
      "Any prior water loss history",
      "Photos of key areas (kitchen, baths, laundry) if easy",
      "Current declarations page (if available)",
    ],
    disclaimer:
      "Water coverage varies by policy form and carrier. We’ll explain the practical differences so expectations are realistic.",
  },
  {
    id: "wildfire",
    label: "California property realities",
    kicker: "Wildfire, smoke, and underwriting clarity—without panic.",
    summary:
      "Homeowners who want a realistic conversation about California property underwriting and how to strengthen the home’s profile where possible.",
    focus: [
      "Dwelling limit conversations and documentation for rebuild planning",
      "Deductibles and how they can differ by peril in some situations",
      "What carriers typically look for (roof, defensible space, updates)",
      "How to keep the policy aligned when conditions change",
    ],
    addOns: [
      "Loss‑of‑use planning and practical expectations",
      "Umbrella alignment for households with larger exposure",
      "Bundling strategy when it improves overall fit",
      "Scheduled property for high‑value items",
    ],
    toPrepare: [
      "Roof age/material, and any mitigation steps taken",
      "A few exterior photos (front, back, roofline) if easy",
      "Prior insurance history and any non‑renewal notices (if applicable)",
      "Your questions—we’ll answer them directly",
    ],
    disclaimer:
      "Underwriting is dynamic and can change. We’ll focus on what you can control, what documentation helps, and what options exist right now.",
  },
  {
    id: "liability",
    label: "Higher liability exposure",
    kicker: "Pools, guests, teen drivers, or higher net worth.",
    summary:
      "Homeowners who want to prioritize liability protection—because one incident can impact far more than the home itself.",
    focus: [
      "Personal liability limits and real‑world claim examples (plain language)",
      "Medical payments coverage and common scenarios",
      "Umbrella policy structure and how it coordinates with home + auto",
      "Household changes that should trigger a coverage review",
    ],
    addOns: [
      "Umbrella policy alignment",
      "Higher liability limits where available",
      "Scheduled property for valuables (often part of the bigger plan)",
      "Bundle strategy for savings and simplicity",
    ],
    toPrepare: [
      "A quick list of liability drivers (pool, dog, frequent guests, etc.)",
      "Existing policy limits (declarations page is best)",
      "Auto policies you’d like to align",
      "Your comfort level for premiums vs. protection",
    ],
    disclaimer:
      "Eligibility and limits vary. We’ll confirm what you can realistically obtain and what tradeoffs are worth it.",
  },
];

export default function HomeInsurancePage() {
  return (
    <main id="main" className="bg-background pb-32 md:pb-0">
      <Container className="py-14 sm:py-18 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-surface/70 px-4 py-2 text-xs font-medium text-accent shadow-sm shadow-black/5">
              <span className="size-1.5 rounded-full bg-brand" aria-hidden />
              Home insurance • {site.agent.location}
            </div>
            <h1 className="mt-7 text-balance font-serif text-[clamp(2.5rem,5.2vw,4.15rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
              Home coverage that matches rebuild costs—and real life.
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-foreground/75">
              The goal isn’t just “having a policy.” It’s having a plan: dwelling coverage that reflects the property,
              belongings that are protected the way you expect, and liability options that make sense for your
              household. We’ll guide the decisions and explain the tradeoffs clearly.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#quote" variant="primary" size="md">
                Request a quote
              </ButtonLink>
              <ButtonLink href={`tel:${site.agent.phone.e164}`} variant="outline" size="md" className="gap-2">
                <Phone className="size-4" aria-hidden />
                Call {site.agent.phone.display}
              </ButtonLink>
            </div>

            <div className="mt-6 text-xs leading-6 text-foreground/70">
              Coverage options, deductibles, and eligibility vary by carrier and underwriting. We’ll confirm what applies
              to your home, your construction details, and your ZIP.
            </div>
          </div>

          <div className="rounded-3xl border border-accent/15 bg-surface p-7 shadow-lg shadow-black/10">
            <div className="rounded-2xl border border-accent/10 bg-background p-4">
              <HomeIllustration className="h-[132px] w-full text-accent" />
            </div>
            <div className="mt-6 flex items-start gap-4">
              <div className="grid size-12 place-items-center rounded-2xl border border-accent/10 bg-background text-accent">
                <HomeIcon className="size-5" aria-hidden />
              </div>
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                  What we’ll clarify fast
                </div>
                <ul className="mt-4 space-y-2 text-sm leading-7 text-foreground/75">
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>Dwelling vs. personal property—and what each actually covers.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>Deductibles and what to expect during a claim.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>Which optional coverages are truly worth discussing for your property.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <QuickFocusCard
                icon={<Waves className="size-4" aria-hidden />}
                title="Water clarity"
                body="We’ll explain the practical difference between sudden loss, seepage, and backup."
              />
              <QuickFocusCard
                icon={<Flame className="size-4" aria-hidden />}
                title="California realities"
                body="A calm, realistic underwriting conversation—focused on what you can control."
              />
            </div>

            <div className="mt-6 rounded-2xl border border-accent/10 bg-background p-4">
              <div className="flex items-start gap-3">
                <div className="grid size-10 place-items-center rounded-2xl border border-accent/10 bg-surface/70 text-accent">
                  <ShieldCheck className="size-5" aria-hidden />
                </div>
                <div>
                  <div className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">
                    Our approach
                  </div>
                  <div className="mt-2 text-sm leading-7 text-foreground/75">
                    We’ll translate coverage into outcomes. You’ll know what you’re buying, what it solves, and what it
                    doesn’t—before you ever have to file a claim.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <section className="bg-surface">
        <Container className="py-12 sm:py-14">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Increase certainty and unlock savings.
            </h2>
            <p className="mt-3 text-pretty text-foreground/75">
              The best home policies are built around your property—not generic assumptions. We help you align limits,
              deductibles, and add‑ons with what you actually own, then review savings opportunities that don’t reduce
              your protection.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ValueCard
              title="Rebuild‑cost alignment"
              body="We’ll discuss the inputs that influence rebuilding and help you avoid relying on guesswork."
            />
            <ValueCard
              title="Belongings + special items"
              body="We’ll review replacement‑cost expectations and when scheduling valuables is the smarter move."
            />
            <ValueCard
              title="Liability made simple"
              body="We’ll structure liability with your household and lifestyle in mind—and talk umbrella coverage when it’s relevant."
            />
          </div>
        </Container>
      </section>

      <ProductScenarioSelector
        eyebrow="Appetite details"
        title="Select a property focus to view how we structure coverage."
        description="Choose the closest match to your situation. You’ll see the same categories we review in real conversations: what to prioritize, what to consider adding, and what to prepare."
        scenarios={scenarios}
        defaultScenarioId="primary"
      />

      <section className="bg-surface">
        <Container className="py-16 sm:py-20">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              From quote request to coverage confidence.
            </h2>
            <p className="mt-3 text-pretty text-foreground/75">
              Home insurance decisions are easier when the structure is clear. Here’s how we keep the process fast,
              calm, and accurate.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ProcessCard
              number="01"
              title="Understand the property"
              body="A quick review of construction details, updates, and what you want to protect most."
            />
            <ProcessCard
              number="02"
              title="Build the coverage plan"
              body="We’ll translate dwelling, belongings, deductibles, and liability options into real outcomes."
            />
            <ProcessCard
              number="03"
              title="Keep it aligned"
              body="Renovations, purchases, and life changes happen. We’ll help update coverage so it stays accurate."
            />
          </div>
        </Container>
      </section>

      <section className="bg-background">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Savings opportunities we’ll review.
              </h2>
              <p className="mt-3 max-w-xl text-pretty text-foreground/75">
                Savings can help—but only if coverage still matches the property. We’ll review what applies and explain
                tradeoffs clearly.
              </p>
              <div className="mt-6 text-xs leading-6 text-foreground/70">
                Discounts vary by carrier, state, and eligibility. We’ll verify what you qualify for before you rely on
                any estimate.
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <SavingsCard title="Multi‑policy / bundle" body="Often a meaningful lever when paired with auto." />
              <SavingsCard title="Home safety + mitigation" body="Alarms, updated systems, and other features may help." />
              <SavingsCard title="Roof + construction details" body="Material and age can impact both pricing and fit." />
              <SavingsCard title="Claims history" body="We’ll discuss how past claims affect options and expectations." />
              <SavingsCard title="Deductible strategy" body="We’ll choose a deductible that supports affordability and usability." />
              <SavingsCard title="Payment setup" body="Paperless/autopay and similar options may apply where available." />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Related coverage
              </h2>
              <p className="mt-3 max-w-xl text-pretty text-foreground/75">
                Home insurance often pairs naturally with auto—especially for savings and liability alignment.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <ButtonLink href="/coverages/auto" variant="outline" size="md">
                Auto insurance
              </ButtonLink>
              <ButtonLink href="/coverages" variant="secondary" size="md">
                All coverages
              </ButtonLink>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <RelatedCard
              title="Auto insurance"
              body="Choose liability limits and deductibles with confidence—then check bundling opportunities."
              href="/coverages/auto"
            />
            <RelatedCard
              title="Policy review"
              body="Already insured? We’ll review your current limits, deductibles, and options and explain tradeoffs."
              href="/contact"
            />
          </div>
        </Container>
      </section>

      <section id="quote" className="bg-background">
        <Container className="py-16 sm:py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-[62ch]">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Request a home quote
              </h2>
              <p className="mt-3 text-pretty text-foreground/75">
                Tell us about the property and how to reach you. If you prefer, call{" "}
                <a className="underline underline-offset-4 hover:text-foreground" href={`tel:${site.agent.phone.e164}`}>
                  {site.agent.phone.display}
                </a>{" "}
                and we’ll cover the essentials quickly.
              </p>

              <div className="mt-6 rounded-3xl border border-accent/15 bg-surface/70 p-6 shadow-sm shadow-black/5">
                <div className="text-sm font-semibold text-accent">What to send (if you have it)</div>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-foreground/75">
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>Current declarations page and renewal date.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>Property basics: year built, square footage, roof info, and updates.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>A short list of valuables you’d want to schedule (if relevant).</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full max-w-[520px]">
              <QuoteRequestForm defaultCoverage="home" source="home-page" />
            </div>
          </div>
        </Container>
      </section>

      <ProductStickyCta />
    </main>
  );
}

function QuickFocusCard({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-accent/10 bg-background p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-accent">
        <span className="inline-flex size-7 items-center justify-center rounded-full border border-accent/15 bg-surface/70 text-accent">
          {icon}
        </span>
        {title}
      </div>
      <div className="mt-2 text-sm leading-7 text-foreground/75">{body}</div>
    </div>
  );
}
