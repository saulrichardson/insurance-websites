import { Phone, ShieldCheck, Umbrella } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { QuoteRequestForm } from "@/components/quote-request-form";
import { ProductScenarioSelector, type ProductScenario } from "@/components/product/product-scenario-selector";
import { UmbrellaIllustration } from "@/components/product/product-illustrations";
import { ProductStickyCta } from "@/components/product/product-sticky-cta";
import { ProcessCard, RelatedCard, SavingsCard, ValueCard } from "@/components/product/product-cards";
import { site } from "@/lib/site";

export const metadata = {
  title: "Umbrella liability",
  description: `Umbrella liability guidance in ${site.agent.location}. Add an extra layer of protection above auto and home liability limits with a clear, structured approach.`,
};

const scenarios: ProductScenario[] = [
  {
    id: "growing-household",
    label: "Growing household",
    kicker: "More drivers, more guests, more liability exposure.",
    summary:
      "Households that want an extra layer of liability protection as life gets busier—teen drivers, frequent guests, and more day‑to‑day exposure.",
    focus: [
      "Underlying auto and home liability limits (the foundation matters)",
      "How umbrella liability can add an extra layer above those limits",
      "Practical risk drivers: teen drivers, guests, busy schedules",
      "A clean review cadence as the household changes",
    ],
    addOns: [
      "Aligning auto/home limits first (often required)",
      "Bundling conversations where it improves overall fit",
      "Reviewing major life changes as a trigger to revisit limits",
      "Coordination with business insurance for owners when relevant",
    ],
    toPrepare: [
      "Auto and home declarations pages (if available)",
      "Number of drivers and vehicles",
      "Any high-risk activities or exposures you’re concerned about",
      "Questions you want answered directly",
    ],
    disclaimer:
      "Umbrella eligibility and underlying limit requirements vary by carrier and underwriting guidelines. We’ll confirm requirements before recommending a structure.",
  },
  {
    id: "home-exposures",
    label: "Homeowner liability focus",
    kicker: "Pools, frequent guests, or other lifestyle exposures.",
    summary:
      "Homeowners who want to strengthen liability protection because the home and lifestyle create more exposure than “average.”",
    focus: [
      "How home liability is typically structured and where umbrella fits",
      "Choosing limits that match the household’s overall exposure",
      "How to coordinate umbrella with auto liability (they work together)",
      "Documentation and review cadence so the plan stays aligned",
    ],
    addOns: [
      "Underlying home and auto limit alignment",
      "Umbrella limit conversations in plain language",
      "Review checkpoints after major purchases or changes",
      "Coordination with rentals or additional properties when relevant",
    ],
    toPrepare: [
      "Home declarations page (if available)",
      "Auto declarations page (if available)",
      "A quick list of exposures you’re thinking about",
      "Your comfort level for premiums vs. protection",
    ],
    disclaimer:
      "Coverage options vary by carrier and underwriting. We’ll confirm what’s available for your household and property profile.",
  },
  {
    id: "high-limits",
    label: "Higher net worth / higher limits",
    kicker: "Align liability with assets and long-term plans.",
    summary:
      "Households that want higher liability limits and a structured approach to aligning coverage with assets and long‑term plans.",
    focus: [
      "A limit recommendation range with clear rationale",
      "Underlying policy alignment before adding an umbrella layer",
      "A calm review cadence that keeps the plan current",
      "Avoiding gaps created by mismatched underlying limits",
    ],
    addOns: [
      "Coordination across multiple vehicles or properties when relevant",
      "Reviewing umbrella and underlying policies together at renewal",
      "Discussing specialized market options for unique needs when necessary",
      "Long‑term planning alignment (life/investments) when relevant",
    ],
    toPrepare: [
      "Auto and home declarations pages (if available)",
      "Household drivers/vehicles and properties overview",
      "Any prior claims history (broadly)",
      "Your priorities: simplicity, high limits, or a balance",
    ],
    disclaimer:
      "Higher limits can be highly underwriting-driven. We’ll confirm what’s realistic and what structure is required.",
  },
  {
    id: "business-owner",
    label: "Business owner",
    kicker: "Coordinate personal and business liability decisions.",
    summary:
      "Owners who want to ensure liability decisions make sense across both personal and business coverage conversations.",
    focus: [
      "Personal umbrella vs. commercial umbrella conversations (broadly)",
      "Underlying limit alignment across auto/home and business policies",
      "Contract requirements vs. household protection needs",
      "A structured review cadence as the business evolves",
    ],
    addOns: [
      "Commercial umbrella/excess conversations (when applicable)",
      "Specialty market approach for complex needs when required",
      "Coordination with home and auto decisions",
      "Documentation habits that keep things clean",
    ],
    toPrepare: [
      "Auto and home declarations pages (if available)",
      "Any business policy summaries (if you have them)",
      "Contract requirements if higher limits are needed",
      "Questions about where exposures sit (personal vs. business)",
    ],
    disclaimer:
      "We’ll keep the conversation structured and clear so you understand what’s personal, what’s business, and how they coordinate.",
  },
  {
    id: "not-sure",
    label: "Not sure if you need umbrella",
    kicker: "Start with a quick review and a clear recommendation.",
    summary:
      "Households who want a clear yes/no recommendation and a simple explanation of what umbrella coverage is intended to solve.",
    focus: [
      "A quick review of underlying limits and exposures",
      "What umbrella is designed to protect (and what it isn’t)",
      "A recommendation range based on your situation",
      "Next steps: what to adjust now and what can wait",
    ],
    addOns: [
      "Underlying limit changes if required",
      "Coordination with home and auto renewals",
      "Documentation and policy review cadence",
      "Planning alignment (life/investments) when relevant",
    ],
    toPrepare: [
      "Auto and home declarations pages (if you have them)",
      "Number of drivers/vehicles and household basics",
      "Your biggest concern (lawsuits, assets, family stability)",
      "Budget range (if you have one)",
    ],
    disclaimer:
      "We’ll explain the practical tradeoffs and keep the process calm—no pressure and no jargon.",
  },
];

export default function UmbrellaLiabilityPage() {
  return (
    <main id="main" className="bg-background pb-32 md:pb-0">
      <Container className="py-14 sm:py-18 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 border border-foreground/25 bg-surface/50 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/80">
              Umbrella liability • {site.agent.location}
            </div>
            <h1 className="mt-7 text-balance font-serif text-[clamp(2.5rem,5.2vw,4.15rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
              Add an extra layer of liability protection—without guesswork.
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-foreground/75">
              Umbrella policies are designed to strengthen your liability safety net above your auto and home coverage.
              We’ll help you choose limits and structure with a clear rationale—so it feels calm, not confusing.
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
              Umbrella eligibility and underlying limits vary by carrier and underwriting guidelines. We’ll confirm
              requirements and options for your household before you rely on any structure.
            </div>
          </div>

          <div className="border border-foreground/20 bg-surface/60 p-7">
            <div className="border border-foreground/20 bg-background/35 p-4">
              <UmbrellaIllustration className="h-[132px] w-full text-foreground" />
            </div>

            <div className="mt-6 flex items-start gap-4">
              <div className="grid size-12 place-items-center border border-foreground/20 bg-background/35 text-foreground">
                <Umbrella className="size-5" aria-hidden />
              </div>
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                  What we’ll clarify fast
                </div>
                <ul className="mt-4 space-y-2 text-sm leading-7 text-foreground/75">
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 bg-foreground" aria-hidden />
                    <span>How umbrella coverage coordinates with auto and home liability.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 bg-foreground" aria-hidden />
                    <span>Limit choices that match your household’s exposure and goals.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 bg-foreground" aria-hidden />
                    <span>What underlying limits are required to support the umbrella.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 border border-foreground/20 bg-background/30 p-4">
              <div className="flex items-start gap-3">
                <div className="grid size-10 place-items-center border border-foreground/20 bg-background/35 text-foreground">
                  <ShieldCheck className="size-5" aria-hidden />
                </div>
                <div>
                  <div className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">
                    Our approach
                  </div>
                  <div className="mt-2 text-sm leading-7 text-foreground/75">
                    We’ll start with the foundation—underlying limits—and then add an umbrella layer only when it
                    improves outcomes for your household.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <section className="border-y border-foreground/20 bg-surface/40">
        <Container className="py-12 sm:py-14">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Increase certainty for the “bigger” claim.
            </h2>
            <p className="mt-3 text-pretty text-foreground/75">
              Umbrella is often about protecting the household from the claim that exceeds standard limits. We’ll keep
              the decision practical and grounded.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ValueCard
              title="Foundation first"
              body="We’ll confirm underlying auto and home limits and align them before adding an umbrella layer."
            />
            <ValueCard
              title="Clear limit logic"
              body="You’ll see a recommendation range and the rationale behind it—so the decision doesn’t feel arbitrary."
            />
            <ValueCard
              title="Coordinated renewals"
              body="Umbrella works best when reviewed alongside auto and home at renewal—so everything stays aligned."
            />
          </div>
        </Container>
      </section>

      <ProductScenarioSelector
        eyebrow="Coverage details"
        title="Select a liability situation to view what we recommend."
        description="Choose the closest match. You’ll see what we focus on, common add‑ons, and what to prepare so the quote is accurate the first time."
        scenarios={scenarios}
        defaultScenarioId="growing-household"
      />

      <section className="bg-background">
        <Container className="py-16 sm:py-20">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              From review to a stronger plan.
            </h2>
            <p className="mt-3 text-pretty text-foreground/75">
              Umbrella is easier when it’s structured. Here’s how we keep the process calm and clear.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ProcessCard
              number="01"
              title="Review exposures"
              body="Drivers, properties, and lifestyle factors that influence liability decisions."
            />
            <ProcessCard
              number="02"
              title="Align the foundation"
              body="We’ll confirm underlying auto/home limits and any requirements before adding an umbrella layer."
            />
            <ProcessCard
              number="03"
              title="Set a cadence"
              body="A simple renewal and review rhythm so limits stay aligned as life changes."
            />
          </div>
        </Container>
      </section>

      <section className="bg-surface/35">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Cost levers we’ll review.
              </h2>
              <p className="mt-3 max-w-xl text-pretty text-foreground/75">
                Umbrella pricing is influenced by underlying limits and exposures. We’ll focus on the levers that
                matter and explain tradeoffs clearly.
              </p>
              <div className="mt-6 text-xs leading-6 text-foreground/70">
                Availability and requirements vary by underwriting. We’ll confirm what applies to your household and
                policies.
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <SavingsCard title="Underlying limits" body="Umbrella is typically built on top of auto/home liability limits." />
              <SavingsCard title="Drivers + vehicles" body="Household drivers and vehicle profiles affect eligibility and pricing." />
              <SavingsCard title="Properties + exposures" body="Pools, additional properties, and lifestyle factors can matter." />
              <SavingsCard title="Claims history" body="Past claims can affect eligibility and options; we’ll set expectations." />
              <SavingsCard title="Limit selection" body="We’ll choose a limit that matches exposure and goals—not guesswork." />
              <SavingsCard title="Renewal cadence" body="Reviewing annually helps keep the structure aligned and consistent." />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-background">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Related coverage
              </h2>
              <p className="mt-3 max-w-xl text-pretty text-foreground/75">
                Umbrella is strongest when coordinated with the policies underneath it.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <ButtonLink href="/insurance/auto" variant="outline" size="md">
                Auto insurance
              </ButtonLink>
              <ButtonLink href="/insurance/home" variant="secondary" size="md">
                Home insurance
              </ButtonLink>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <RelatedCard
              title="Auto insurance"
              body="Align liability limits and deductibles with the household plan."
              href="/insurance/auto"
            />
            <RelatedCard
              title="Home insurance"
              body="Structure dwelling, belongings, and liability decisions with a clear rationale."
              href="/insurance/home"
            />
          </div>
        </Container>
      </section>

      <section id="quote" className="bg-surface/35">
        <Container className="py-16 sm:py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-[62ch]">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Request an umbrella quote
              </h2>
              <p className="mt-3 text-pretty text-foreground/75">
                Tell us what you’re shopping for and how to reach you. If you prefer, call{" "}
                <a className="underline underline-offset-4 hover:text-foreground" href={`tel:${site.agent.phone.e164}`}>
                  {site.agent.phone.display}
                </a>{" "}
                and we’ll handle the essentials quickly.
              </p>

              <div className="mt-6 border border-foreground/20 bg-background/35 p-6">
                <div className="text-sm font-semibold text-foreground">Helpful to prepare</div>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-foreground/75">
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 bg-foreground" aria-hidden />
                    <span>Auto and home declarations pages (if available).</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 bg-foreground" aria-hidden />
                    <span>Household drivers/vehicles and property overview.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 bg-foreground" aria-hidden />
                    <span>Any contract limit requirements (for owners/business situations).</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full max-w-[520px]">
              <QuoteRequestForm defaultCoverage="umbrella" source="umbrella-page" />
            </div>
          </div>
        </Container>
      </section>

      <ProductStickyCta />
    </main>
  );
}

