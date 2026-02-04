import { HandHeart, Phone, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { QuoteRequestForm } from "@/components/quote-request-form";
import { ProductScenarioSelector, type ProductScenario } from "@/components/product/product-scenario-selector";
import { LongTermCareIllustration } from "@/components/product/product-illustrations";
import { ProductStickyCta } from "@/components/product/product-sticky-cta";
import { ProcessCard, RelatedCard, SavingsCard, ValueCard } from "@/components/product/product-cards";
import { site } from "@/lib/site";

export const metadata = {
  title: "Long‑term care",
  description: `Long‑term care planning in ${site.agent.location}. Understand options for extended care costs with a structured, no‑pressure conversation.`,
};

const scenarios: ProductScenario[] = [
  {
    id: "plan-ahead",
    label: "Plan ahead",
    kicker: "A calm, early conversation for future care needs.",
    summary:
      "People who want to plan for extended care costs early—so choices stay flexible and family stress stays lower.",
    focus: [
      "What long‑term care coverage can help with (broadly)",
      "Benefit structure: amounts, periods, and tradeoffs",
      "Elimination/waiting period planning",
      "How to keep a plan aligned as life changes",
    ],
    addOns: [
      "Inflation‑related options (when available)",
      "Shared or coordinated planning for couples (varies)",
      "Coordination with life insurance planning when relevant",
      "A review cadence for updates over time",
    ],
    toPrepare: [
      "Age range and general goals (independence, home care, etc.)",
      "A rough budget range",
      "Questions or concerns based on family experience",
      "Any existing coverage details (if applicable)",
    ],
    disclaimer:
      "Long‑term care options vary by carrier, eligibility, and underwriting. We’ll confirm what’s available and appropriate for your situation.",
  },
  {
    id: "family-history",
    label: "Family caregiving concerns",
    kicker: "Reduce stress and financial strain for loved ones.",
    summary:
      "People who have seen caregiving up close and want a plan that helps protect family time, finances, and options.",
    focus: [
      "How extended care costs can show up (home care, assisted living, facility care)",
      "How to think about benefit amounts and duration",
      "Waiting period strategy and realistic expectations",
      "How to coordinate planning across a household",
    ],
    addOns: [
      "Inflation options where available",
      "Couples planning approaches when applicable",
      "Life insurance alignment conversation",
      "Investment/retirement planning coordination",
    ],
    toPrepare: [
      "Your biggest concern (cost, choice, family burden, or all of the above)",
      "A target monthly budget range",
      "Any existing policies or employer benefits",
      "Questions you want answered directly",
    ],
    disclaimer:
      "We’ll keep the discussion practical and calm—focused on options and next steps, not fear.",
  },
  {
    id: "asset-protection",
    label: "Protect assets",
    kicker: "Structure planning around lifestyle and long‑term goals.",
    summary:
      "People who want planning that supports lifestyle and long‑term goals, and reduces the chance of a care event derailing the bigger plan.",
    focus: [
      "How benefit design aligns with goals and budget",
      "Tradeoffs: benefit amounts vs. duration vs. cost",
      "Coordination with retirement and cash‑flow planning",
      "What to review as assets and goals change",
    ],
    addOns: [
      "Inflation options where available",
      "Couples coordination when relevant",
      "Life insurance planning alignment",
      "Ongoing review checkpoints",
    ],
    toPrepare: [
      "A high-level picture of goals and timeline",
      "Budget range and preferences",
      "Any existing planning documents (optional)",
      "Questions about coverage structure and tradeoffs",
    ],
    disclaimer:
      "We’re not here to overwhelm you—just to help you understand options and build a realistic plan.",
  },
  {
    id: "review",
    label: "Review an existing plan",
    kicker: "Make sure it still fits current needs.",
    summary:
      "People who already have some coverage and want to confirm what it does, what it doesn’t, and how it fits today.",
    focus: [
      "What the policy actually covers (plain language)",
      "Benefit amounts, periods, and waiting periods",
      "Where expectations can diverge from reality",
      "Simple next steps: keep, adjust, or coordinate",
    ],
    addOns: [
      "Documentation updates and beneficiary review when relevant",
      "Coordination with life coverage planning",
      "Investment/retirement alignment discussion",
      "A clean review cadence going forward",
    ],
    toPrepare: [
      "Current policy summary or statements (if available)",
      "Any recent changes in health, family, or goals",
      "Your biggest concern about coverage",
      "Questions you want answered directly",
    ],
    disclaimer:
      "We’ll help translate existing coverage into outcomes so you can make a confident decision.",
  },
];

export default function LongTermCarePage() {
  return (
    <main id="main" className="bg-background pb-32 md:pb-0">
      <Container className="py-14 sm:py-18 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 border border-foreground/25 bg-surface/50 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/80">
              Long‑term care • {site.agent.location}
            </div>
            <h1 className="mt-7 text-balance font-serif text-[clamp(2.5rem,5.2vw,4.15rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
              Plan for extended care needs with clarity and options.
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-foreground/75">
              Long‑term care planning is about preserving choices—where you receive care, how it’s paid for, and how
              much stress it creates for loved ones. We’ll keep the conversation structured, calm, and practical.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#quote" variant="primary" size="md">
                Request information
              </ButtonLink>
              <ButtonLink href={`tel:${site.agent.phone.e164}`} variant="outline" size="md" className="gap-2">
                <Phone className="size-4" aria-hidden />
                Call {site.agent.phone.display}
              </ButtonLink>
            </div>

            <div className="mt-6 text-xs leading-6 text-foreground/70">
              Availability and eligibility vary by carrier and underwriting. We’ll confirm options and timelines based
              on your situation.
            </div>
          </div>

          <div className="border border-foreground/20 bg-surface/60 p-7">
            <div className="border border-foreground/20 bg-background/35 p-4">
              <LongTermCareIllustration className="h-[132px] w-full text-foreground" />
            </div>

            <div className="mt-6 flex items-start gap-4">
              <div className="grid size-12 place-items-center border border-foreground/20 bg-background/35 text-foreground">
                <HandHeart className="size-5" aria-hidden />
              </div>
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                  What we’ll clarify fast
                </div>
                <ul className="mt-4 space-y-2 text-sm leading-7 text-foreground/75">
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 bg-foreground" aria-hidden />
                    <span>What long‑term care coverage can help with (broadly).</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 bg-foreground" aria-hidden />
                    <span>Key design choices: benefit amounts, periods, and waiting periods.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 bg-foreground" aria-hidden />
                    <span>How planning can reduce stress for family members.</span>
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
                    We’ll explain options and tradeoffs in plain language so the plan feels calm and realistic—no fear,
                    no pressure.
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
              Increase certainty and keep choices open.
            </h2>
            <p className="mt-3 text-pretty text-foreground/75">
              The best long‑term care plan is one you understand. We’ll connect coverage design to outcomes, then choose
              options that match your priorities and budget.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ValueCard
              title="Clear structure"
              body="We’ll translate benefit amounts and periods into real scenarios so the design is understandable."
            />
            <ValueCard
              title="Practical tradeoffs"
              body="We’ll review the levers that influence cost—without weakening the plan in the wrong places."
            />
            <ValueCard
              title="Aligned planning"
              body="When appropriate, we’ll coordinate long‑term care planning with life and retirement conversations."
            />
          </div>
        </Container>
      </section>

      <ProductScenarioSelector
        eyebrow="Planning details"
        title="Select a long‑term care planning goal to view how we structure options."
        description="Choose the closest match. You’ll see what we focus on, common add‑ons, and what to prepare for an efficient conversation."
        scenarios={scenarios}
        defaultScenarioId="plan-ahead"
      />

      <section className="bg-background">
        <Container className="py-16 sm:py-20">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              From questions to a plan.
            </h2>
            <p className="mt-3 text-pretty text-foreground/75">
              We keep long‑term care planning structured so it feels manageable and actionable.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ProcessCard
              number="01"
              title="Clarify priorities"
              body="Independence, family burden, lifestyle, and budget—what matters most drives the plan."
            />
            <ProcessCard
              number="02"
              title="Compare options"
              body="We’ll explain benefit design and tradeoffs in plain language so you can decide confidently."
            />
            <ProcessCard
              number="03"
              title="Set a cadence"
              body="We’ll help you keep the plan aligned over time as life, goals, and circumstances change."
            />
          </div>
        </Container>
      </section>

      <section className="bg-surface/35">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Design levers we’ll review.
              </h2>
              <p className="mt-3 max-w-xl text-pretty text-foreground/75">
                Long‑term care coverage is shaped by a few key choices. We’ll show how each lever affects outcomes and
                cost.
              </p>
              <div className="mt-6 text-xs leading-6 text-foreground/70">
                Options vary by carrier and eligibility. We’ll confirm what’s available for your situation and explain
                tradeoffs clearly.
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <SavingsCard title="Benefit amount" body="Match the benefit to realistic care costs and comfort level." />
              <SavingsCard title="Benefit period" body="Balance duration and budget based on your priorities." />
              <SavingsCard title="Elimination period" body="A waiting period decision that impacts cost and usability." />
              <SavingsCard title="Inflation options" body="Important for long time horizons where available." />
              <SavingsCard title="Couples planning" body="Coordination options vary—when available, we’ll explain them." />
              <SavingsCard title="Review cadence" body="Keep the plan aligned as health, family, and goals evolve." />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-background">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Related planning
              </h2>
              <p className="mt-3 max-w-xl text-pretty text-foreground/75">
                Long‑term care planning often pairs naturally with life and retirement conversations.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <ButtonLink href="/insurance/life" variant="outline" size="md">
                Life insurance
              </ButtonLink>
              <ButtonLink href="/insurance/investments" variant="secondary" size="md">
                Investments
              </ButtonLink>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <RelatedCard
              title="Life insurance"
              body="Protect income and long‑term goals with a structured, no‑pressure approach."
              href="/insurance/life"
            />
            <RelatedCard
              title="Investments & retirement"
              body="Connect planning to next steps with a calm, practical conversation."
              href="/insurance/investments"
            />
          </div>
        </Container>
      </section>

      <section id="quote" className="bg-surface/35">
        <Container className="py-16 sm:py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-[62ch]">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Request long‑term care information
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
                    <span>Your priority: independence, family burden, cost control, or flexibility.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 bg-foreground" aria-hidden />
                    <span>A rough budget range and timeline.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 bg-foreground" aria-hidden />
                    <span>Any existing coverage details (optional).</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full max-w-[520px]">
              <QuoteRequestForm defaultCoverage="long-term-care" source="long-term-care-page" />
            </div>
          </div>
        </Container>
      </section>

      <ProductStickyCta quoteLabel="Request info" />
    </main>
  );
}

