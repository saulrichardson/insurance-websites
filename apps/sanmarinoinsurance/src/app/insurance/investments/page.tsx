import { BarChart3, Phone, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { QuoteRequestForm } from "@/components/quote-request-form";
import { ProductScenarioSelector, type ProductScenario } from "@/components/product/product-scenario-selector";
import { InvestmentsIllustration } from "@/components/product/product-illustrations";
import { ProductStickyCta } from "@/components/product/product-sticky-cta";
import { ProcessCard, RelatedCard, SavingsCard, ValueCard } from "@/components/product/product-cards";
import { site } from "@/lib/site";

export const metadata = {
  title: "Investments",
  description: `Investments and retirement planning conversations in ${site.agent.location}. A structured approach to goals, timelines, and next steps.`,
};

const scenarios: ProductScenario[] = [
  {
    id: "retirement",
    label: "Retirement planning",
    kicker: "Turn goals into a practical next step.",
    summary:
      "People who want a calm, structured conversation about retirement goals, timelines, and what decisions matter now vs. later.",
    focus: [
      "Your goal, timeline, and comfort level with volatility (plain language)",
      "How to think about contributions, savings rate, and milestones",
      "Keeping beneficiary details aligned across accounts and policies",
      "A review cadence that fits real life",
    ],
    addOns: [
      "Coordination with life insurance planning when relevant",
      "Long‑term care planning conversation where appropriate",
      "Consolidation or simplification conversations (varies by provider)",
      "Documentation habits that keep things organized",
    ],
    toPrepare: [
      "A rough summary of current accounts (no need for perfection)",
      "Target retirement age or timeline",
      "Monthly contribution range (if any)",
      "Any questions you want answered directly",
    ],
    disclaimer:
      "Investment products involve risk and may lose value. Availability and specifics vary by provider and eligibility.",
  },
  {
    id: "college",
    label: "Education goals",
    kicker: "Plan early without overcommitting.",
    summary:
      "Households planning for education expenses who want to structure goals, timelines, and contributions in a simple way.",
    focus: [
      "Goal amount and timeline planning (with conservative assumptions)",
      "Contribution strategy and staying consistent",
      "How to keep plans aligned as budgets change",
      "Beneficiary updates and documentation habits",
    ],
    addOns: [
      "Life insurance alignment conversation when appropriate",
      "Retirement planning coordination (so one goal doesn’t derail another)",
      "A review cadence to keep plans updated",
      "Simplification and organization support",
    ],
    toPrepare: [
      "Timeline and approximate goal amount",
      "Current savings approach (if any)",
      "Monthly contribution comfort range",
      "Any existing accounts you’d like to coordinate",
    ],
    disclaimer:
      "We’ll focus on structure and next steps. Specific products and account types depend on eligibility and provider availability.",
  },
  {
    id: "rollover",
    label: "Rollover / consolidate",
    kicker: "Reduce complexity and keep things aligned.",
    summary:
      "People who want to simplify accounts, coordinate beneficiaries, and make sure the plan is coherent—not scattered.",
    focus: [
      "A high-level inventory of accounts and what you have now",
      "Clarity on fees, statements, and what you’re paying for (plain language)",
      "Beneficiary review and alignment with life coverage where relevant",
      "A clean structure for the next chapter",
    ],
    addOns: [
      "Insurance planning alignment (life and long‑term care) when appropriate",
      "A cadence for review and updates",
      "Documentation cleanup and organization",
      "A plan that can evolve over time",
    ],
    toPrepare: [
      "Recent statements (even just the basics)",
      "A list of accounts and approximate balances",
      "Any concerns about complexity or fees",
      "Your timeline for making changes",
    ],
    disclaimer:
      "We’ll keep the conversation practical. Decisions may require coordination with qualified financial or tax professionals depending on the situation.",
  },
  {
    id: "not-sure",
    label: "Not sure where to start",
    kicker: "Get a roadmap first—then pick the next action.",
    summary:
      "People who want a clear roadmap: what to prioritize, what to ignore for now, and the single best next step.",
    focus: [
      "Your goals and timeline (in plain language)",
      "Basic risk comfort and how to think about it",
      "What to organize first to reduce overwhelm",
      "A simple next action you can actually do",
    ],
    addOns: [
      "Coordination with life coverage planning",
      "Long‑term care planning conversation when relevant",
      "A follow‑up cadence so the plan stays moving",
      "Documentation and beneficiary review",
    ],
    toPrepare: [
      "A list of questions you want answered",
      "Any statements you have on hand (optional)",
      "Your timeline for taking action",
      "A rough sense of monthly contribution comfort range",
    ],
    disclaimer:
      "We’ll keep it structured and calm. You’ll leave with clarity and a next step, not a pile of jargon.",
  },
];

export default function InvestmentsPage() {
  return (
    <main id="main" className="bg-background pb-32 md:pb-0">
      <Container className="py-14 sm:py-18 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-surface/70 px-4 py-2 text-xs font-medium text-accent shadow-sm shadow-black/5">
              <span className="size-1.5 rounded-full bg-brand" aria-hidden />
              Investments • {site.agent.location}
            </div>
            <h1 className="mt-7 text-balance font-serif text-[clamp(2.5rem,5.2vw,4.15rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
              A practical conversation about goals, timelines, and next steps.
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-foreground/75">
              Investing shouldn’t feel like guessing or jargon. We’ll keep it structured: define the goal, clarify the
              timeline, align risk comfort, and map a next action that actually fits your life.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#quote" variant="primary" size="md">
                Request a conversation
              </ButtonLink>
              <ButtonLink href={`tel:${site.agent.phone.e164}`} variant="outline" size="md" className="gap-2">
                <Phone className="size-4" aria-hidden />
                Call {site.agent.phone.display}
              </ButtonLink>
            </div>

            <div className="mt-6 text-xs leading-6 text-foreground/70">
              Investment products may involve risk, including possible loss of principal. Availability and eligibility
              vary by product and provider. This page is informational and not individualized financial advice.
            </div>
          </div>

          <div className="rounded-3xl border border-accent/15 bg-surface p-7 shadow-lg shadow-black/10">
            <div className="rounded-2xl border border-accent/10 bg-background p-4">
              <InvestmentsIllustration className="h-[132px] w-full text-accent" />
            </div>

            <div className="mt-6 flex items-start gap-4">
              <div className="grid size-12 place-items-center rounded-2xl border border-accent/10 bg-background text-accent">
                <BarChart3 className="size-5" aria-hidden />
              </div>
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                  What we’ll clarify fast
                </div>
                <ul className="mt-4 space-y-2 text-sm leading-7 text-foreground/75">
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>Goal and timeline (what actually matters first).</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>Risk comfort in plain language (no hype).</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>Next steps and what decisions can wait.</span>
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
                    We’re here for clarity: structure decisions, explain tradeoffs, and help you take the next best
                    action—without overwhelm.
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
              Increase certainty and reduce complexity.
            </h2>
            <p className="mt-3 text-pretty text-foreground/75">
              The best plans are the ones you can follow consistently. We focus on structure and next steps—not
              complicated theory.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ValueCard
              title="Goal-first structure"
              body="We start with what you’re trying to accomplish, then align timelines and next actions."
            />
            <ValueCard
              title="Plain-language tradeoffs"
              body="We’ll explain risk and decisions in a way that feels calm and practical—not technical."
            />
            <ValueCard
              title="Aligned protection"
              body="When appropriate, we coordinate planning with life insurance and long‑term care conversations."
            />
          </div>
        </Container>
      </section>

      <ProductScenarioSelector
        eyebrow="Planning details"
        title="Select a goal to view what we focus on."
        description="Choose the closest match. You’ll see how we structure the conversation, what to prepare, and the kinds of next steps we typically recommend."
        scenarios={scenarios}
        defaultScenarioId="retirement"
      />

      <section className="bg-surface">
        <Container className="py-16 sm:py-20">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              From goals to a next step.
            </h2>
            <p className="mt-3 text-pretty text-foreground/75">
              We keep the process structured so it’s easy to follow through.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ProcessCard
              number="01"
              title="Define the goal"
              body="Retirement, education, a major purchase, or long‑term stability—clarity first."
            />
            <ProcessCard
              number="02"
              title="Align the plan"
              body="Timeline, contribution comfort, and risk preferences—translated into plain decisions."
            />
            <ProcessCard
              number="03"
              title="Set a cadence"
              body="A simple review rhythm so the plan stays aligned as life and markets change."
            />
          </div>
        </Container>
      </section>

      <section className="bg-background">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                The levers that matter.
              </h2>
              <p className="mt-3 max-w-xl text-pretty text-foreground/75">
                We focus on a small set of practical decisions that drive most outcomes—then we keep the plan easy to
                maintain.
              </p>
              <div className="mt-6 text-xs leading-6 text-foreground/70">
                Depending on the situation, decisions may require coordination with qualified financial or tax
                professionals. We’ll be clear about what’s in scope and what isn’t.
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <SavingsCard title="Timeline" body="Short vs. long time horizons change what choices make sense." />
              <SavingsCard title="Contribution strategy" body="Consistency matters more than perfect timing." />
              <SavingsCard title="Risk comfort" body="We’ll translate volatility into plain expectations and tradeoffs." />
              <SavingsCard title="Costs and fees" body="We’ll keep the conversation practical and transparent." />
              <SavingsCard title="Organization" body="A clean inventory of accounts reduces stress and mistakes." />
              <SavingsCard title="Beneficiaries" body="Keeping beneficiaries updated is a high-impact, often-missed step." />
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
                Many households coordinate planning with protection—especially life and long‑term care.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <ButtonLink href="/insurance/life" variant="outline" size="md">
                Life insurance
              </ButtonLink>
              <ButtonLink href="/insurance/long-term-care" variant="secondary" size="md">
                Long‑term care
              </ButtonLink>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <RelatedCard
              title="Life insurance"
              body="Protect the household plan with income-focused coverage conversations."
              href="/insurance/life"
            />
            <RelatedCard
              title="Long‑term care"
              body="Plan ahead for extended care costs with clarity and options."
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
                Request an investments conversation
              </h2>
              <p className="mt-3 text-pretty text-foreground/75">
                Tell us what you’re working on and how to reach you. If you prefer, call{" "}
                <a className="underline underline-offset-4 hover:text-foreground" href={`tel:${site.agent.phone.e164}`}>
                  {site.agent.phone.display}
                </a>{" "}
                and we’ll set a quick next step.
              </p>

              <div className="mt-6 rounded-3xl border border-accent/15 bg-surface/70 p-6 shadow-sm shadow-black/5">
                <div className="text-sm font-semibold text-accent">Helpful to prepare</div>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-foreground/75">
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>Your goal and timeline (retirement, education, or general planning).</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>A rough summary of current accounts (optional).</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>Any questions about organization, beneficiaries, or next steps.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full max-w-[520px]">
              <QuoteRequestForm defaultCoverage="financial" source="investments-page" />
            </div>
          </div>
        </Container>
      </section>

      <ProductStickyCta quoteLabel="Request conversation" />
    </main>
  );
}
