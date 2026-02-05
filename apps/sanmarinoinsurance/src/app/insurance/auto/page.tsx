import { Car, Phone, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { QuoteRequestForm } from "@/components/quote-request-form";
import { ProductScenarioSelector, type ProductScenario } from "@/components/product/product-scenario-selector";
import { AutoIllustration } from "@/components/product/product-illustrations";
import { ProductStickyCta } from "@/components/product/product-sticky-cta";
import { ProcessCard, RelatedCard, SavingsCard, ValueCard } from "@/components/product/product-cards";
import { site } from "@/lib/site";

export const metadata = {
  title: "Auto insurance",
  description: `Auto insurance guidance in ${site.agent.location}. Call ${site.agent.phone.display} to review limits, deductibles, and savings opportunities.`,
};

const scenarios: ProductScenario[] = [
  {
    id: "commuter",
    label: "Daily commuter",
    kicker: "Simple, reliable coverage for everyday driving.",
    summary:
      "Drivers who want clear liability limits, smarter deductibles, and practical add‑ons for everyday errands, commuting, and weekend plans.",
    focus: [
      "Liability limits that protect your household (not just your car)",
      "Collision vs. comprehensive and a deductible strategy that fits your budget",
      "Uninsured/underinsured motorist conversations (common in real life)",
      "Rental reimbursement and roadside/towing options (when they’re worth it)",
    ],
    addOns: [
      "Accident forgiveness or claims‑related options (when available)",
      "Glass coverage options depending on your vehicle and deductible",
      "Loan/lease requirements review (so you don’t miss a needed coverage)",
      "Bundle strategy with home/condo/renters for better value",
    ],
    toPrepare: [
      "VIN(s) and current mileage",
      "Driver names + dates of birth",
      "Current declarations page (if you have it)",
      "Garage address and typical commute details",
    ],
    disclaimer:
      "Coverage options and availability vary by state, underwriting, and carrier guidelines. We’ll confirm what applies to your exact situation.",
  },
  {
    id: "family",
    label: "Family + teen driver",
    kicker: "Balance protection and price when a new driver joins the policy.",
    summary:
      "Households adding a teen driver or reorganizing vehicles and drivers across a family—without guessing what changes actually do.",
    focus: [
      "Liability limits and why they matter more with additional drivers",
      "Driver/vehicle assignments and how they can affect pricing and fit",
      "Deductible choices that keep a claim from becoming a financial surprise",
      "Coverage planning for school, sports, and shared vehicles",
    ],
    addOns: [
      "Good student or driver training discounts (when eligible)",
      "Telematics/safe‑driving programs (if they align with your comfort level)",
      "Umbrella conversation for households with larger liability exposure",
      "Bundle review with home for savings and simpler renewals",
    ],
    toPrepare: [
      "Teen driver DOB + permit/license status",
      "Vehicle list and who drives what most",
      "Any prior claims/violations (we’ll talk through how they impact options)",
      "Preferred payment plan and target budget range",
    ],
    disclaimer:
      "Discounts and program availability vary. We’ll verify eligibility before you make any decisions.",
  },
  {
    id: "new-car",
    label: "New or financed vehicle",
    kicker: "Protect the investment and meet lender requirements.",
    summary:
      "Drivers with a newer vehicle, a lease, or a loan who want coverage that protects the car and keeps requirements straightforward.",
    focus: [
      "Collision/comprehensive structure and a deductible that matches your risk tolerance",
      "Lender/lease requirements review (so you’re compliant without overbuying)",
      "Coverage for temporary transportation while the vehicle is in the shop",
      "How coverage choices impact premiums, not just “what’s required”",
    ],
    addOns: [
      "New‑car or “better car replacement” style options (when offered)",
      "GAP coverage conversations (often separate; depends on your lender)",
      "OEM parts discussions where available/appropriate",
      "Bundle review for rate stability and simplicity",
    ],
    toPrepare: [
      "Purchase/lease date and lender info",
      "VIN and estimated annual mileage",
      "Current policy details (if replacing an existing vehicle)",
      "Preferred effective date",
    ],
    disclaimer:
      "Some features vary widely by carrier and state. We’ll explain what’s included, optional, or separate so it’s not confusing later.",
  },
  {
    id: "rideshare",
    label: "Ride‑share or delivery driving",
    kicker: "Make sure personal and commercial exposures aren’t blurred.",
    summary:
      "Drivers who use their vehicle for ride‑share or delivery and want to understand where personal coverage may stop and what options exist.",
    focus: [
      "How personal auto policies typically handle business use (plain language)",
      "When an endorsement or separate policy may be worth discussing",
      "Liability limits and how they interact with platform coverage",
      "Claims documentation and keeping details consistent",
    ],
    addOns: [
      "Ride‑share endorsements where available",
      "Higher liability limits or umbrella consideration",
      "Roadside/towing and rental options if the vehicle is essential for income",
      "Bundle strategy that doesn’t sacrifice fit",
    ],
    toPrepare: [
      "Which platforms you drive for and typical weekly hours",
      "Vehicle VIN and use patterns (commute vs. app‑on time)",
      "Current policy declarations page (if available)",
      "Any questions you have about platform insurance (we’ll walk through them)",
    ],
    disclaimer:
      "Ride‑share and delivery underwriting varies significantly. We’ll confirm options before you rely on any coverage assumption.",
  },
  {
    id: "high-value",
    label: "High‑value or specialty vehicle",
    kicker: "Think performance, luxury, or unique usage patterns.",
    summary:
      "Drivers who want coverage structured for higher repair costs, special equipment, or a vehicle that’s not “average”—without vague answers.",
    focus: [
      "Liability structure that matches the household’s overall exposure",
      "Deductibles that reflect real repair costs and your cash‑flow preference",
      "Comprehensive details: theft, vandalism, weather, and glass considerations",
      "Usage patterns (low mileage, weekend driving, storage) and how they matter",
    ],
    addOns: [
      "Agreed value or specialty programs (when applicable)",
      "Coverage for custom parts/equipment",
      "Higher limits and umbrella alignment",
      "Bundling strategy that still prioritizes fit over convenience",
    ],
    toPrepare: [
      "Vehicle details (VIN + any modifications)",
      "Approximate annual mileage and storage location",
      "Photos or documentation for custom equipment (if applicable)",
      "Current policy details and renewal date",
    ],
    disclaimer:
      "Specialty vehicles may require different underwriting or carriers. We’ll outline the practical paths and tradeoffs clearly.",
  },
];

export default function AutoInsurancePage() {
  return (
    <main id="main" className="bg-background pb-32 md:pb-0">
      <Container className="py-14 sm:py-18 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-surface/70 px-4 py-2 text-xs font-medium text-accent shadow-sm shadow-black/5">
              <span className="size-1.5 rounded-full bg-brand" aria-hidden />
              Auto insurance • {site.agent.location}
            </div>
            <h1 className="mt-7 text-balance font-serif text-[clamp(2.5rem,5.2vw,4.15rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
              Auto coverage that feels calm—before you ever need to use it.
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-foreground/75">
              We help you choose limits, deductibles, and options with a clear rationale—so you’re not guessing after a
              fender bender or a bigger liability claim. Expect quick follow‑ups, plain‑language explanations, and a
              policy that stays aligned at renewal.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#quote" variant="primary" size="md" className="gap-2">
                Request a quote
              </ButtonLink>
              <ButtonLink href={`tel:${site.agent.phone.e164}`} variant="outline" size="md" className="gap-2">
                <Phone className="size-4" aria-hidden />
                Call {site.agent.phone.display}
              </ButtonLink>
            </div>

            <div className="mt-6 text-xs leading-6 text-foreground/70">
              Coverage options, discounts, and availability vary by eligibility and underwriting guidelines. We’ll
              confirm details for your vehicles, drivers, and garaging ZIP.
            </div>
          </div>

          <div className="rounded-3xl border border-accent/15 bg-surface p-7 shadow-lg shadow-black/10">
            <div className="rounded-2xl border border-accent/10 bg-background p-4">
              <AutoIllustration className="h-[132px] w-full text-accent" />
            </div>
            <div className="mt-6 flex items-start gap-4">
              <div className="grid size-12 place-items-center rounded-2xl border border-accent/10 bg-background text-accent">
                <Car className="size-5" aria-hidden />
              </div>
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                  What we’ll clarify fast
                </div>
                <ul className="mt-4 space-y-2 text-sm leading-7 text-foreground/75">
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>What “good” liability limits look like for your household.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>Where comprehensive/collision help—and where they don’t.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>Which add‑ons are worth it for your vehicle and budget.</span>
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
                    We’ll translate coverage into outcomes. You’ll see tradeoffs clearly—and you’ll know why we
                    recommended what we did.
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
              Auto insurance is rarely “one size fits all.” We help you build a plan around your driving reality—then
              review savings opportunities without sacrificing the coverage that matters.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ValueCard
              title="Right‑sized liability"
              body="We’ll align limits to your household, not just state minimums—so the plan is resilient if a claim escalates."
            />
            <ValueCard
              title="Deductible strategy"
              body="A deductible is a financial decision. We’ll pick a number that keeps premiums reasonable without making claims unusable."
            />
            <ValueCard
              title="Bundle (on purpose)"
              body="Bundling can lower cost and simplify renewals—when it fits. We’ll compare options so “saving” doesn’t mean underinsuring."
            />
          </div>
        </Container>
      </section>

      <ProductScenarioSelector
        eyebrow="Appetite details"
        title="Select a driver scenario to view what we recommend."
        description="This is the same structure we use in real conversations: what matters most, what to consider adding, and what to bring so your quote is accurate the first time."
        scenarios={scenarios}
        defaultScenarioId="commuter"
      />

      <section className="bg-surface">
        <Container className="py-16 sm:py-20">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              From quote request to coverage confidence.
            </h2>
            <p className="mt-3 text-pretty text-foreground/75">
              Auto coverage gets easier when decisions are structured. Here’s how we keep it simple without skipping
              the details.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ProcessCard
              number="01"
              title="Share the basics"
              body="Vehicles, drivers, and what you care about most (price, protection, or a balance)."
            />
            <ProcessCard
              number="02"
              title="Review options clearly"
              body="We’ll explain what changes actually do—limits, deductibles, and add‑ons—so you can choose with confidence."
            />
            <ProcessCard
              number="03"
              title="Keep it aligned"
              body="At renewal, we’ll help you adjust for new cars, new drivers, and life changes—without starting over."
            />
          </div>
        </Container>
      </section>

      <section className="bg-background">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Discount opportunities we’ll review.
              </h2>
              <p className="mt-3 max-w-xl text-pretty text-foreground/75">
                Savings are real—but they should be verified, not assumed. We’ll check what applies and show the
                tradeoffs in plain language.
              </p>
              <div className="mt-6 text-xs leading-6 text-foreground/70">
                Discounts vary by carrier, state, and eligibility, and may change over time. We’ll confirm what you
                qualify for before you rely on any estimated savings.
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <SavingsCard title="Multi‑policy / bundle" body="Often the biggest lever—especially with home or renters." />
              <SavingsCard title="Safe driving programs" body="Worth exploring if you’re comfortable with the rules." />
              <SavingsCard title="Vehicle safety features" body="Airbags, anti‑theft, and newer safety tech may help." />
              <SavingsCard title="Student / young driver" body="Good student and training credits may apply when eligible." />
              <SavingsCard title="Payment + policy setup" body="Paperless, autopay, paid‑in‑full, and similar options." />
              <SavingsCard title="Garaging + mileage" body="Low‑mileage or usage patterns can matter depending on the carrier." />
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
                Many of the best auto outcomes come from pairing coverage the right way—especially for liability and
                savings.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <ButtonLink href="/coverages/home" variant="outline" size="md">
                Home insurance
              </ButtonLink>
              <ButtonLink href="/coverages" variant="secondary" size="md">
                All coverages
              </ButtonLink>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
              <RelatedCard
                title="Home insurance"
                body="Align dwelling coverage with rebuild costs, protect belongings, and review liability options."
                href="/coverages/home"
              />
            <RelatedCard
              title="Coverage review"
              body="Already insured? We’ll review limits and deductibles and show what changes actually do."
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
                Request an auto quote
              </h2>
              <p className="mt-3 text-pretty text-foreground/75">
                Tell us what you’re shopping for and how to reach you. If you prefer, call{" "}
                <a className="underline underline-offset-4 hover:text-foreground" href={`tel:${site.agent.phone.e164}`}>
                  {site.agent.phone.display}
                </a>{" "}
                and we’ll cover the essentials in a quick conversation.
              </p>

              <div className="mt-6 rounded-3xl border border-accent/15 bg-surface/70 p-6 shadow-sm shadow-black/5">
                <div className="text-sm font-semibold text-accent">What to send (if you have it)</div>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-foreground/75">
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>Your current declarations page and renewal date.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>VIN(s), driver info, and garaging address.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>Any questions about deductibles, add‑ons, or discounts you’re considering.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full max-w-[520px]">
              <QuoteRequestForm defaultCoverage="auto" source="auto-page" />
            </div>
          </div>
        </Container>
      </section>

      <ProductStickyCta />
    </main>
  );
}
