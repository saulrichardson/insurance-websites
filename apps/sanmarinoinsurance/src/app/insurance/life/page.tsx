import { HeartPulse, Phone, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { QuoteRequestForm } from "@/components/quote-request-form";
import { ProductScenarioSelector, type ProductScenario } from "@/components/product/product-scenario-selector";
import { LifeIllustration } from "@/components/product/product-illustrations";
import { ProductStickyCta } from "@/components/product/product-sticky-cta";
import { ProcessCard, RelatedCard, SavingsCard, ValueCard } from "@/components/product/product-cards";
import { site } from "@/lib/site";

export const metadata = {
  title: "Life insurance",
  description: `Life insurance guidance in ${site.agent.location}. Compare term and permanent options with a calm, structured conversation—no pressure.`,
};

const scenarios: ProductScenario[] = [
  {
    id: "family",
    label: "Family protection",
    kicker: "Income replacement and stability for the people who depend on you.",
    summary:
      "Households who want a clear plan for income protection—so a life event doesn’t become a financial crisis for the family.",
    focus: [
      "How much coverage typically aligns with income and obligations",
      "Term vs. permanent options (what problem each solves)",
      "Beneficiaries and keeping details up to date",
      "Budget strategy: protection first, then refinements",
    ],
    addOns: [
      "Riders and optional benefits (availability varies)",
      "Coverage review cadence as life changes",
      "Coordination with long‑term care conversations when relevant",
      "Planning alignment with investments/retirement goals",
    ],
    toPrepare: [
      "A quick summary of income, obligations, and goals",
      "Any existing policies (declarations or summaries, if available)",
      "Tobacco status and basic health history (broadly)",
      "Your budget range and timeline",
    ],
    disclaimer:
      "Life insurance is subject to underwriting and eligibility. Product features, riders, and rates vary by carrier and situation.",
  },
  {
    id: "mortgage",
    label: "Mortgage + home",
    kicker: "Keep the home plan resilient if something changes.",
    summary:
      "Homeowners who want life coverage that supports the mortgage, household expenses, and long‑term stability.",
    focus: [
      "Mortgage payoff vs. income replacement planning (and tradeoffs)",
      "Coverage amount and term length strategy",
      "How to plan for kids, school costs, and future goals",
      "Keeping coverage aligned at renewal and major life events",
    ],
    addOns: [
      "Riders where available and appropriate",
      "Beneficiary structure review",
      "Umbrella/liability alignment conversations as part of the bigger plan",
      "Investment planning conversation for longer-term goals",
    ],
    toPrepare: [
      "Mortgage balance and monthly payment (approximate is fine)",
      "Household income and key monthly expenses",
      "Existing coverage details (if any)",
      "Preferred start date and budget range",
    ],
    disclaimer:
      "We’ll confirm underwriting expectations and timelines so the process is predictable, not stressful.",
  },
  {
    id: "business",
    label: "Business owner",
    kicker: "Protect continuity and the people who rely on the business.",
    summary:
      "Owners who want to talk through coverage as part of business continuity, key-person planning, and household protection.",
    focus: [
      "Business continuity considerations in plain language",
      "How personal and business planning can coordinate",
      "Beneficiary and ownership considerations (broadly)",
      "A review cadence that fits real operations",
    ],
    addOns: [
      "Long‑term care planning conversation when relevant",
      "Investment/retirement alignment",
      "Updating beneficiaries and documentation regularly",
      "Coverage review checkpoints as the business grows",
    ],
    toPrepare: [
      "Basic business structure and key roles",
      "Your goals: continuity, family protection, or both",
      "Existing coverage details (if any)",
      "Timeline and budget range",
    ],
    disclaimer:
      "Business planning topics can be nuanced. We’ll keep the conversation structured and coordinate next steps where needed.",
  },
  {
    id: "simplify",
    label: "Keep it simple",
    kicker: "Straightforward coverage conversations with clear next steps.",
    summary:
      "People who want an easy, structured conversation: what amount makes sense, what type of policy fits, and what to do next.",
    focus: [
      "A clear amount recommendation range (with the “why”)",
      "What term lengths typically map to goals and budgets",
      "How underwriting works (no surprises)",
      "How to keep beneficiaries and details updated over time",
    ],
    addOns: [
      "Riders if they meaningfully improve outcomes (varies)",
      "A reminder cadence to review coverage",
      "Coordination with long‑term goals and investments",
      "Long‑term care discussion when appropriate",
    ],
    toPrepare: [
      "Age, basic health info (broadly)",
      "Tobacco status",
      "Any existing policy details",
      "Your goal and budget range",
    ],
    disclaimer:
      "We’ll keep recommendations practical and easy to understand—no pressure and no jargon.",
  },
];

export default function LifeInsurancePage() {
  return (
    <main id="main" className="bg-background pb-32 md:pb-0">
      <Container className="py-14 sm:py-18 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-surface/70 px-4 py-2 text-xs font-medium text-accent shadow-sm shadow-black/5">
              <span className="size-1.5 rounded-full bg-brand" aria-hidden />
              Life insurance • {site.agent.location}
            </div>
            <h1 className="mt-7 text-balance font-serif text-[clamp(2.5rem,5.2vw,4.15rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
              Life insurance decisions that feel clear—not salesy.
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-foreground/75">
              Life insurance is about protecting income, plans, and people. We’ll help you compare term and permanent
              options with a structured conversation—so you know what you’re buying, why it fits, and what to do next.
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
              Life insurance is subject to underwriting and eligibility. Rates, features, and riders vary by carrier
              and individual factors.
            </div>
          </div>

          <div className="rounded-3xl border border-accent/15 bg-surface p-7 shadow-lg shadow-black/10">
            <div className="rounded-2xl border border-accent/10 bg-background p-4">
              <LifeIllustration className="h-[132px] w-full text-accent" />
            </div>

            <div className="mt-6 flex items-start gap-4">
              <div className="grid size-12 place-items-center rounded-2xl border border-accent/10 bg-background text-accent">
                <HeartPulse className="size-5" aria-hidden />
              </div>
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                  What we’ll clarify fast
                </div>
                <ul className="mt-4 space-y-2 text-sm leading-7 text-foreground/75">
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>How much coverage typically matches goals and obligations.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>Term vs. permanent options (and what each is best for).</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>Underwriting expectations and a predictable next step.</span>
                  </li>
                </ul>
              </div>
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
                    You’ll leave with a clear recommendation range and a reason behind it—so you can decide confidently
                    without pressure.
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
              Increase certainty and protect the plan.
            </h2>
            <p className="mt-3 text-pretty text-foreground/75">
              The “right” life policy is the one that matches your goals, your timeline, and your budget. We’ll keep it
              structured and practical.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ValueCard
              title="Right amount"
              body="We’ll connect coverage amounts to real obligations—income, childcare, mortgage, and long‑term goals."
            />
            <ValueCard
              title="Right type"
              body="Term vs. permanent options are easier when you’re clear on outcomes. We’ll map options to your goal."
            />
            <ValueCard
              title="Right cadence"
              body="We’ll set simple review checkpoints so coverage stays aligned as life changes."
            />
          </div>
        </Container>
      </section>

      <ProductScenarioSelector
        eyebrow="Coverage details"
        title="Select a life insurance goal to view how we structure options."
        description="Choose the closest match. You’ll see what we focus on, common add‑ons, and what to prepare for an efficient quote."
        scenarios={scenarios}
        defaultScenarioId="family"
      />

      <section className="bg-surface">
        <Container className="py-16 sm:py-20">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              From conversation to coverage confidence.
            </h2>
            <p className="mt-3 text-pretty text-foreground/75">
              Life insurance doesn’t have to feel complicated. We keep the process calm and structured.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ProcessCard
              number="01"
              title="Define the goal"
              body="We’ll map coverage to outcomes: income protection, mortgage, family stability, or business continuity."
            />
            <ProcessCard
              number="02"
              title="Compare options"
              body="We’ll review term lengths, coverage amounts, and features in plain language—so you can choose."
            />
            <ProcessCard
              number="03"
              title="Apply and review"
              body="We’ll set expectations for underwriting and keep coverage aligned as life changes."
            />
          </div>
        </Container>
      </section>

      <section className="bg-background">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Cost levers we’ll review.
              </h2>
              <p className="mt-3 max-w-xl text-pretty text-foreground/75">
                Life insurance pricing depends on many factors. We’ll focus on the levers you can control and explain
                tradeoffs clearly.
              </p>
              <div className="mt-6 text-xs leading-6 text-foreground/70">
                Rates and availability vary by underwriting and eligibility. We’ll confirm expectations before you make
                any decisions.
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <SavingsCard title="Coverage amount" body="We’ll set a range that protects the plan without overspending." />
              <SavingsCard title="Term length" body="Match the term to the timeline of the obligation you’re protecting." />
              <SavingsCard title="Policy type" body="Term vs. permanent depends on the goal, not hype." />
              <SavingsCard title="Underwriting class" body="Health factors matter. We’ll set realistic expectations upfront." />
              <SavingsCard title="Riders and features" body="Optional benefits vary—only add what improves outcomes." />
              <SavingsCard title="Review cadence" body="Coverage should evolve as income, family, and goals change." />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Related planning
              </h2>
              <p className="mt-3 max-w-xl text-pretty text-foreground/75">
                Life coverage works best when it supports the bigger household plan—today and long term.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <ButtonLink href="/insurance/investments" variant="outline" size="md">
                Investments
              </ButtonLink>
              <ButtonLink href="/insurance/long-term-care" variant="secondary" size="md">
                Long‑term care
              </ButtonLink>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <RelatedCard
              title="Investments & retirement"
              body="Align goals, timelines, and next steps with a structured conversation."
              href="/insurance/investments"
            />
            <RelatedCard
              title="Long‑term care"
              body="Plan ahead for extended care costs and reduce stress for family members."
              href="/insurance/long-term-care"
            />
          </div>
        </Container>
      </section>

      <section id="quote" className="bg-background">
        <Container className="py-16 sm:py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-[62ch]">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Request a life quote
              </h2>
              <p className="mt-3 text-pretty text-foreground/75">
                Tell us what you’re shopping for and how to reach you. If you prefer, call{" "}
                <a className="underline underline-offset-4 hover:text-foreground" href={`tel:${site.agent.phone.e164}`}>
                  {site.agent.phone.display}
                </a>{" "}
                and we’ll handle the essentials quickly.
              </p>

              <div className="mt-6 rounded-3xl border border-accent/15 bg-surface/70 p-6 shadow-sm shadow-black/5">
                <div className="text-sm font-semibold text-accent">Helpful to prepare</div>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-foreground/75">
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>Your goal: income protection, mortgage, or long‑term planning.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>Any existing policies and renewal dates (if available).</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>A budget range and timeline so we can make practical recommendations.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full max-w-[520px]">
              <QuoteRequestForm defaultCoverage="life" source="life-page" />
            </div>
          </div>
        </Container>
      </section>

      <ProductStickyCta />
    </main>
  );
}
