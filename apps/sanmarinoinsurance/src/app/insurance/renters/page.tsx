import { KeyRound, Phone, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { QuoteRequestForm } from "@/components/quote-request-form";
import { ProductScenarioSelector, type ProductScenario } from "@/components/product/product-scenario-selector";
import { RentersIllustration } from "@/components/product/product-illustrations";
import { ProductStickyCta } from "@/components/product/product-sticky-cta";
import { ProcessCard, RelatedCard, SavingsCard, ValueCard } from "@/components/product/product-cards";
import { site } from "@/lib/site";

export const metadata = {
  title: "Renters insurance",
  description: `Renters insurance in ${site.agent.location}. Protect belongings, personal liability, and temporary living expenses—often for less than you’d expect.`,
};

const scenarios: ProductScenario[] = [
  {
    id: "first-rental",
    label: "First apartment",
    kicker: "Get the basics right—without overthinking it.",
    summary:
      "Renters who want simple coverage that protects belongings, adds liability protection, and helps avoid expensive surprises after a loss.",
    focus: [
      "Personal property limits and what they cover (at home and on the go)",
      "Replacement cost vs. actual cash value (what the difference feels like)",
      "Personal liability and medical payments coverage (common real scenarios)",
      "A deductible that keeps coverage usable",
    ],
    addOns: [
      "Replacement‑cost options for belongings (when available)",
      "Scheduled items for jewelry, cameras, or collectibles",
      "Identity or cyber-related options (varies by carrier)",
      "Bundle strategy with auto for better value",
    ],
    toPrepare: [
      "Rental address and move‑in date",
      "Rough estimate of belongings value (we’ll help structure it)",
      "Any high‑value items you’d want to schedule",
      "Current auto policy details (if bundling)",
    ],
    disclaimer:
      "Coverage options and eligibility vary by carrier and underwriting. We’ll confirm what applies to your address and situation.",
  },
  {
    id: "roommates",
    label: "Roommates",
    kicker: "Clarify what’s shared and what isn’t.",
    summary:
      "Renters sharing a home or apartment who want clear expectations about whose belongings and liability are covered—and how to avoid gaps.",
    focus: [
      "How renters policies typically apply to named insureds vs. roommates",
      "Personal property coverage structure for shared living",
      "Liability planning for guests, accidents, and everyday risks",
      "How to keep the policy accurate at renewal",
    ],
    addOns: [
      "Separate policies per roommate (often the cleanest approach)",
      "Scheduled items per person when needed",
      "Bundle options if one or more roommates have auto",
      "Higher liability limits where available",
    ],
    toPrepare: [
      "Names of occupants and how the lease is structured",
      "Any landlord/lease insurance requirements",
      "Questions about shared property (we’ll walk through it)",
      "Any prior claims history (if applicable)",
    ],
    disclaimer:
      "Roommate situations vary. We’ll explain the cleanest structure so responsibility and coverage are obvious.",
  },
  {
    id: "high-value",
    label: "High‑value belongings",
    kicker: "Tech, jewelry, collectibles, or specialty gear.",
    summary:
      "Renters with items that would be expensive to replace who want to understand limits, exclusions, and when scheduling makes sense.",
    focus: [
      "Category limits (jewelry, electronics, collectibles) and what they mean",
      "When scheduling valuables is smarter than raising the overall limit",
      "Deductible strategy for a likely property claim",
      "Documentation habits that make claims smoother",
    ],
    addOns: [
      "Scheduled personal property where available",
      "Higher personal property limits when appropriate",
      "Replacement‑cost options when offered",
      "Bundle review with auto",
    ],
    toPrepare: [
      "A short list of high‑value items (photos or receipts if easy)",
      "Approximate replacement values",
      "Current policy declarations page (if you have one)",
      "Your budget range and what you want covered most",
    ],
    disclaimer:
      "Coverage for valuables varies by carrier and policy form. We’ll confirm options so expectations are clear.",
  },
  {
    id: "landlord",
    label: "Landlord requires proof",
    kicker: "Meet requirements fast, and still make it useful coverage.",
    summary:
      "Renters who need proof of insurance quickly—and want the coverage to be meaningful, not just a checkbox.",
    focus: [
      "How to meet landlord requirements (limits, additional interest, etc.)",
      "Liability limits that make sense for real life",
      "Personal property basics (so you’re not leaving value unprotected)",
      "How to keep documents accessible when you need them",
    ],
    addOns: [
      "Bundle with auto for value",
      "Higher liability limits when appropriate",
      "Replacement‑cost options where available",
      "Scheduled items when needed",
    ],
    toPrepare: [
      "Landlord/lease requirements (if provided)",
      "Move‑in date and address",
      "Best email for proof documents",
      "Any time constraints—so we can move quickly",
    ],
    disclaimer:
      "We’ll verify exactly what your lease requires and help you set it up quickly and correctly.",
  },
];

export default function RentersInsurancePage() {
  return (
    <main id="main" className="bg-background pb-32 md:pb-0">
      <Container className="py-14 sm:py-18 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 border border-foreground/25 bg-surface/50 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/80">
              Renters insurance • {site.agent.location}
            </div>
            <h1 className="mt-7 text-balance font-serif text-[clamp(2.5rem,5.2vw,4.15rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
              Renters coverage that’s simple—and still thorough.
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-foreground/75">
              Renters insurance can be one of the best value policies you buy. We’ll help you protect belongings, add
              liability coverage, and make sure your deductible and options match real life—without overcomplicating
              it.
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
              Coverage options and eligibility vary by carrier and underwriting guidelines. We’ll confirm what applies
              to your address, belongings, and lease requirements.
            </div>
          </div>

          <div className="border border-foreground/20 bg-surface/60 p-7">
            <div className="border border-foreground/20 bg-background/35 p-4">
              <RentersIllustration className="h-[132px] w-full text-foreground" />
            </div>

            <div className="mt-6 flex items-start gap-4">
              <div className="grid size-12 place-items-center border border-foreground/20 bg-background/35 text-foreground">
                <KeyRound className="size-5" aria-hidden />
              </div>
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                  What we’ll clarify fast
                </div>
                <ul className="mt-4 space-y-2 text-sm leading-7 text-foreground/75">
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 bg-foreground" aria-hidden />
                    <span>Belongings coverage and what “replacement cost” really means.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 bg-foreground" aria-hidden />
                    <span>Liability coverage for everyday accidents and guest injuries.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 bg-foreground" aria-hidden />
                    <span>Proof-of-insurance needs for landlords (done correctly).</span>
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
                    We’ll make coverage decisions feel obvious: what to protect, what’s optional, and how to set limits
                    without guessing.
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
              Increase certainty and unlock savings.
            </h2>
            <p className="mt-3 text-pretty text-foreground/75">
              Renters insurance is usually inexpensive, but the structure still matters. We’ll help you choose limits
              and options that fit your lifestyle—and check bundling opportunities with auto.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ValueCard
              title="Belongings that match reality"
              body="We’ll pick a limit that fits what you actually own—and explain when replacement cost changes the outcome."
            />
            <ValueCard
              title="Liability you can trust"
              body="Liability is often the most important part of renters coverage. We’ll make it easy to choose limits."
            />
            <ValueCard
              title="Bundle (when it helps)"
              body="Bundling with auto can improve value and simplify renewals—without sacrificing fit."
            />
          </div>
        </Container>
      </section>

      <ProductScenarioSelector
        eyebrow="Coverage details"
        title="Select a renters situation to view what we recommend."
        description="Choose the closest match. You’ll see what we prioritize, common add‑ons, and what to prepare so your quote is accurate the first time."
        scenarios={scenarios}
        defaultScenarioId="first-rental"
      />

      <section className="bg-background">
        <Container className="py-16 sm:py-20">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              From quote request to covered.
            </h2>
            <p className="mt-3 text-pretty text-foreground/75">
              Renters coverage can be quick—without being careless. Here’s how we keep it simple and correct.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ProcessCard
              number="01"
              title="Share the basics"
              body="Address, move‑in date, and what you want to protect most (price vs. protection)."
            />
            <ProcessCard
              number="02"
              title="Structure limits clearly"
              body="We’ll set property and liability limits with a plain explanation—no jargon."
            />
            <ProcessCard
              number="03"
              title="Deliver proof fast"
              body="If your landlord needs documents, we’ll make sure they’re correct and easy to share."
            />
          </div>
        </Container>
      </section>

      <section className="bg-surface/35">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Value levers we’ll review.
              </h2>
              <p className="mt-3 max-w-xl text-pretty text-foreground/75">
                Renters is usually budget‑friendly. We’ll still verify options that can improve value—especially when
                bundling with auto.
              </p>
              <div className="mt-6 text-xs leading-6 text-foreground/70">
                Savings and availability vary by carrier, state, and eligibility. We’ll confirm what applies before you
                rely on any estimate.
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <SavingsCard title="Multi‑policy / bundle" body="Often the biggest lever when paired with auto." />
              <SavingsCard title="Deductible strategy" body="We’ll choose a deductible that keeps coverage usable." />
              <SavingsCard title="Replacement‑cost options" body="Better outcomes for many property claims when offered." />
              <SavingsCard title="Scheduling valuables" body="Protect high‑value items with a cleaner structure." />
              <SavingsCard title="Policy setup" body="Paperless/autopay options may apply where available." />
              <SavingsCard title="Lease requirements" body="Meet requirements without buying coverage that doesn’t help." />
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
                Many renters get the best value by pairing renters and auto coverage the right way.
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
              body="Structure liability and deductibles with clarity, and review bundle opportunities."
              href="/insurance/auto"
            />
            <RelatedCard
              title="Life insurance"
              body="Build a household protection plan that supports long‑term goals."
              href="/insurance/life"
            />
          </div>
        </Container>
      </section>

      <section id="quote" className="bg-surface/35">
        <Container className="py-16 sm:py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-[62ch]">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Request a renters quote
              </h2>
              <p className="mt-3 text-pretty text-foreground/75">
                Tell us what you’re shopping for and how to reach you. If you prefer, call{" "}
                <a className="underline underline-offset-4 hover:text-foreground" href={`tel:${site.agent.phone.e164}`}>
                  {site.agent.phone.display}
                </a>{" "}
                and we’ll handle the essentials quickly.
              </p>

              <div className="mt-6 border border-foreground/20 bg-background/35 p-6">
                <div className="text-sm font-semibold text-foreground">What to send (if you have it)</div>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-foreground/75">
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 bg-foreground" aria-hidden />
                    <span>Address and move‑in date (or lease requirements).</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 bg-foreground" aria-hidden />
                    <span>A rough estimate of belongings value (we’ll help structure it).</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 bg-foreground" aria-hidden />
                    <span>Any high‑value items you’d want to schedule.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full max-w-[520px]">
              <QuoteRequestForm defaultCoverage="renters" source="renters-page" />
            </div>
          </div>
        </Container>
      </section>

      <ProductStickyCta />
    </main>
  );
}

