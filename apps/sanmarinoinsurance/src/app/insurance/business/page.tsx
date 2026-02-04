import { BriefcaseBusiness, Phone, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { QuoteRequestForm } from "@/components/quote-request-form";
import { ProductScenarioSelector, type ProductScenario } from "@/components/product/product-scenario-selector";
import { BusinessIllustration } from "@/components/product/product-illustrations";
import { ProductStickyCta } from "@/components/product/product-sticky-cta";
import { ProcessCard, RelatedCard, SavingsCard, ValueCard } from "@/components/product/product-cards";
import { site } from "@/lib/site";

export const metadata = {
  title: "Business insurance",
  description: `Business insurance guidance in ${site.agent.location}. Clear coverage conversations, fast follow‑up, and access to specialty markets when standard options aren’t a fit.`,
};

const scenarios: ProductScenario[] = [
  {
    id: "contractor",
    label: "Contractors & construction-adjacent",
    kicker: "COIs, additional insureds, and limits that satisfy contracts.",
    summary:
      "Businesses that need insurance to keep projects moving—clear limits, correct certificates, and coverage aligned to real operations.",
    focus: [
      "General liability structure and contract requirements (plain language)",
      "Certificates of insurance (COIs), additional insureds, and tracking",
      "Commercial auto vs. hired/non‑owned auto discussions (when relevant)",
      "Higher limit conversations (commercial umbrella/excess) when contracts require it",
    ],
    addOns: [
      "Inland marine / tools and equipment (when applicable)",
      "Workers’ comp conversations (as needed)",
      "Professional liability for specific trades (varies)",
      "Cyber / social engineering options (varies by business)",
    ],
    toPrepare: [
      "What you do, where you do it, and who hires you",
      "Approx. revenue, payroll, and subcontractor use",
      "Prior claims info (loss runs if available)",
      "Any contract insurance requirements and COI language",
    ],
    disclaimer:
      "Coverage options vary by underwriting and carrier appetite. We’ll confirm what’s available based on your operations and contract requirements.",
  },
  {
    id: "professional",
    label: "Professional services",
    kicker: "Align liability with the way you deliver work.",
    summary:
      "Service-based businesses that want a clear structure for liability, cyber considerations, and business continuity—without jargon.",
    focus: [
      "General liability vs. professional liability (what each does and doesn’t do)",
      "Client contract requirements and practical limit decisions",
      "Cyber considerations and how to think about the risk",
      "Documentation and renewal cadence that keeps things aligned",
    ],
    addOns: [
      "Professional liability/E&O (when appropriate)",
      "Cyber options where available",
      "Employment-related coverages (varies; depends on the business)",
      "Commercial umbrella/excess conversations when relevant",
    ],
    toPrepare: [
      "Services offered and typical contract values",
      "Any client insurance requirements",
      "Prior coverage info (declarations page) if you have it",
      "A list of your top concerns (we’ll address them directly)",
    ],
    disclaimer:
      "We’ll confirm what applies to your industry and contracts. Availability and eligibility vary by carrier and underwriting guidelines.",
  },
  {
    id: "bop",
    label: "Retail, office, or small commercial space",
    kicker: "Property + liability basics with a practical structure.",
    summary:
      "Local businesses that want straightforward protection for property, liability, and common disruptions—with clear expectations.",
    focus: [
      "Property vs. liability basics (what each is intended to solve)",
      "Business interruption / loss of income expectations (broadly)",
      "Deductible choices that keep coverage usable",
      "Certificates and landlord requirements where needed",
    ],
    addOns: [
      "Equipment breakdown options (varies)",
      "Cyber options where available",
      "Crime / employee dishonesty options (varies)",
      "Commercial umbrella/excess for higher limits when appropriate",
    ],
    toPrepare: [
      "Business address and occupancy details",
      "Approx. annual revenue and operations summary",
      "Property details and any landlord requirements",
      "Current policy details and renewal date (if insured)",
    ],
    disclaimer:
      "Policy structure and eligibility depend on business type, occupancy, and underwriting. We’ll confirm options for your specific operation.",
  },
  {
    id: "limits",
    label: "Higher limits / umbrella requirements",
    kicker: "Meet contract limits without buying the wrong coverage.",
    summary:
      "Businesses that need higher liability limits (umbrella/excess) and want to structure them correctly above the underlying policies.",
    focus: [
      "Underlying limits alignment (GL, auto, etc.) before adding layers",
      "Contract requirement review (so the structure is compliant)",
      "How to think about limits vs. deductibles/retentions (broadly)",
      "Keeping limits aligned across renewals as contracts change",
    ],
    addOns: [
      "Commercial umbrella/excess layers when available",
      "Personal umbrella conversations for owners when relevant",
      "Additional insured strategy where required",
      "Risk management and documentation suggestions (practical)",
    ],
    toPrepare: [
      "Contract requirements and limit language",
      "Current declarations pages (if insured)",
      "Loss runs if available",
      "A summary of operations and exposures",
    ],
    disclaimer:
      "Higher limits are highly underwriting-driven. We’ll confirm what’s realistic and what structure satisfies contracts.",
  },
  {
    id: "specialty",
    label: "Harder-to-place / specialty markets",
    kicker: "When standard markets aren’t a fit, we can widen the search.",
    summary:
      "Businesses with unique operations, prior claims, or underwriting complexity that need a specialty-market approach and clear next steps.",
    focus: [
      "Clear problem framing (what’s hard to place and why)",
      "A practical submission plan to reduce back-and-forth",
      "Carrier appetite matching and realistic expectations",
      "Keeping communication fast and organized",
    ],
    addOns: [
      "Specialty liability programs (varies by risk)",
      "Excess/umbrella options through specialty markets when appropriate",
      "Non-admitted market considerations (when relevant; explained clearly)",
      "Coverage structure refinement over time",
    ],
    toPrepare: [
      "Operations narrative (what you do, how you do it, where you do it)",
      "Current/expiring policies and any decline/non‑renewal notices",
      "Loss runs and claim details (if available)",
      "Financial basics: revenue, payroll, and key exposures",
    ],
    disclaimer:
      "Specialty placements depend on the details. We’ll be upfront about what’s needed and what timeline to expect.",
  },
];

export default function BusinessInsurancePage() {
  return (
    <main id="main" className="bg-background pb-32 md:pb-0">
      <Container className="py-14 sm:py-18 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-surface/70 px-4 py-2 text-xs font-medium text-accent shadow-sm shadow-black/5">
              <span className="size-1.5 rounded-full bg-brand" aria-hidden />
              Business insurance • {site.agent.location}
            </div>
            <h1 className="mt-7 text-balance font-serif text-[clamp(2.5rem,5.2vw,4.15rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
              Business coverage that keeps operations moving.
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-foreground/75">
              We help business owners structure coverage around contracts, real operations, and practical claim
              outcomes. Expect clear explanations, organized follow‑up, and access to specialty markets when standard
              options aren’t a fit.
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
              Coverage options, eligibility, and timelines vary by industry, underwriting, and carrier guidelines. We’ll
              confirm what applies to your business and contracts.
            </div>
          </div>

          <div className="rounded-3xl border border-accent/15 bg-surface p-7 shadow-lg shadow-black/10">
            <div className="rounded-2xl border border-accent/10 bg-background p-4">
              <BusinessIllustration className="h-[132px] w-full text-accent" />
            </div>

            <div className="mt-6 flex items-start gap-4">
              <div className="grid size-12 place-items-center rounded-2xl border border-accent/10 bg-background text-accent">
                <BriefcaseBusiness className="size-5" aria-hidden />
              </div>
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                  What we’ll clarify fast
                </div>
                <ul className="mt-4 space-y-2 text-sm leading-7 text-foreground/75">
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>What coverage is for (and what it isn’t) in plain language.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>How to meet contract requirements without buying the wrong structure.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>Where specialty markets can help when standard options don’t fit.</span>
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
                    We’ll translate coverage into outcomes, document decisions, and keep renewals organized—so your
                    insurance supports the business instead of slowing it down.
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
              Increase certainty and unlock capacity.
            </h2>
            <p className="mt-3 text-pretty text-foreground/75">
              Good business insurance isn’t about buying “everything.” It’s about buying the right structure for what
              you actually do—and keeping it aligned as contracts and operations change.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ValueCard
              title="Contract-ready coverage"
              body="We’ll align limits, additional insured language, and COIs to real requirements—so work doesn’t get delayed."
            />
            <ValueCard
              title="Structured submissions"
              body="We’ll help you provide the details carriers need to quote accurately—reducing back-and-forth."
            />
            <ValueCard
              title="Specialty access"
              body="When standard markets aren’t a fit, we can approach specialty markets through wholesale partners to widen options."
            />
          </div>
        </Container>
      </section>

      <ProductScenarioSelector
        eyebrow="Coverage details"
        title="Select a business situation to view how we structure coverage."
        description="Choose the closest match. You’ll see what we focus on, common add‑ons, and what to prepare for a clean quote."
        scenarios={scenarios}
        defaultScenarioId="contractor"
      />

      <section className="bg-surface">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Specialty markets for complex risks.
              </h2>
              <p className="mt-3 max-w-xl text-pretty text-foreground/75">
                Some risks don’t fit standard “one size fits all” programs. When that happens, a specialty-market
                approach can unlock capacity and better alignment.
              </p>
              <div className="mt-6 text-xs leading-6 text-foreground/70">
                Specialty placements depend on underwriting appetite and the details of your operations. We’ll be
                transparent about requirements and timelines.
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <SavingsCard
                title="Wholesale access"
                body="We can work with specialty wholesale partners such as Ryan Turner Specialty and Burns & Wilcox to widen options when needed."
              />
              <SavingsCard
                title="Higher limits"
                body="Commercial umbrella/excess layers can help meet contract requirements and strengthen the safety net when available."
              />
              <SavingsCard
                title="Hard-to-place risks"
                body="Unique operations, prior claims, unusual property use, or industry-specific exposures may need specialty markets."
              />
              <SavingsCard
                title="Submission clarity"
                body="Better info usually unlocks better quotes. We’ll help package details to reduce delays and confusion."
              />
              <SavingsCard
                title="Specialized coverages"
                body="Depending on the business, we can explore cyber, professional liability, liquor liability, and other niche needs."
              />
              <SavingsCard
                title="Expectation setting"
                body="We’ll set realistic timelines and next steps so you’re not left guessing during the quoting process."
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface">
        <Container className="py-16 sm:py-20">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              From quote request to coverage confidence.
            </h2>
            <p className="mt-3 text-pretty text-foreground/75">
              Business insurance gets easier when decisions are structured. Here’s how we keep it organized without
              skipping important details.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ProcessCard
              number="01"
              title="Understand operations"
              body="What you do, where you do it, and what contracts require—so coverage matches reality."
            />
            <ProcessCard
              number="02"
              title="Structure the plan"
              body="We’ll align limits, deductibles, and add‑ons with clear tradeoffs—so decisions feel obvious."
            />
            <ProcessCard
              number="03"
              title="Keep it aligned"
              body="At renewal, we’ll help adjust coverage as contracts, payroll, vehicles, or property change."
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
                Business insurance pricing is driven by the details. We’ll focus on the levers you can control and show
                tradeoffs in plain language.
              </p>
              <div className="mt-6 text-xs leading-6 text-foreground/70">
                Pricing and availability vary by underwriting and eligibility. We’ll confirm what applies to your
                business before you rely on any estimate.
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <SavingsCard title="Limits + structure" body="Higher limits and additional layers change both protection and price." />
              <SavingsCard title="Deductibles/retentions" body="A financial decision that should match cash‑flow comfort." />
              <SavingsCard title="Operations detail" body="Clear descriptions reduce underwriting friction and surprises." />
              <SavingsCard title="Vehicles + drivers" body="Commercial auto details matter more than most people expect." />
              <SavingsCard title="Property + location" body="Occupancy and property details influence fit and pricing." />
              <SavingsCard title="Claims history" body="We’ll set realistic expectations and discuss what can be improved over time." />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Related protection
              </h2>
              <p className="mt-3 max-w-xl text-pretty text-foreground/75">
                Many owners coordinate business coverage with personal protection—especially liability decisions.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <ButtonLink href="/insurance/umbrella" variant="outline" size="md">
                Umbrella liability
              </ButtonLink>
              <ButtonLink href="/insurance/home" variant="secondary" size="md">
                Home insurance
              </ButtonLink>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <RelatedCard
              title="Umbrella liability"
              body="Add an extra layer of liability protection above auto and home—structured and explained clearly."
              href="/insurance/umbrella"
            />
            <RelatedCard
              title="Auto insurance"
              body="For owners and households: align liability limits and deductibles with the bigger plan."
              href="/insurance/auto"
            />
          </div>
        </Container>
      </section>

      <section id="quote" className="bg-background">
        <Container className="py-16 sm:py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-[62ch]">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Request a business quote
              </h2>
              <p className="mt-3 text-pretty text-foreground/75">
                Tell us what you’re shopping for and how to reach you. If you prefer, call{" "}
                <a className="underline underline-offset-4 hover:text-foreground" href={`tel:${site.agent.phone.e164}`}>
                  {site.agent.phone.display}
                </a>{" "}
                and we’ll cover the essentials quickly.
              </p>

              <div className="mt-6 rounded-3xl border border-accent/15 bg-surface/70 p-6 shadow-sm shadow-black/5">
                <div className="text-sm font-semibold text-accent">Helpful to prepare</div>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-foreground/75">
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>A short description of operations and any contract requirements.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>Current declarations page and renewal date (if insured).</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>Revenue/payroll basics and vehicles used (if applicable).</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full max-w-[520px]">
              <QuoteRequestForm defaultCoverage="business" source="business-page" />
            </div>
          </div>
        </Container>
      </section>

      <ProductStickyCta />
    </main>
  );
}
