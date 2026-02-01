import {
  BriefcaseBusiness,
  Car,
  Home as HomeIcon,
  Landmark,
  LifeBuoy,
  Phone,
  Sailboat,
  Shield,
} from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";
import { QuoteRequestForm } from "@/components/quote-request-form";

export const metadata = {
  title: "Products",
  description: `Auto, home, renters, condo, life, business, motorcycle, boat, and ATV insurance in ${site.agent.location}. Call ${site.agent.phone.display}.`,
};

type CoverageDetail = {
  icon: ReactNode;
  bestFor: string;
  whatWeDiscuss: string[];
};

const detailsById: Record<string, CoverageDetail> = {
  auto: {
    icon: <Car className="size-5" aria-hidden />,
    bestFor: "Drivers who want clearer limits, smarter deductibles, and fewer surprises after a claim.",
    whatWeDiscuss: [
      "Liability limits and what they actually protect",
      "Comprehensive vs. collision and deductible strategy",
      "Multi‑policy savings opportunities (home, renters, condo)",
      "Ride‑share, teen drivers, and high‑value vehicles",
    ],
  },
  home: {
    icon: <HomeIcon className="size-5" aria-hidden />,
    bestFor: "Homeowners who want protection that matches rebuild costs and real‑life risks, not guesswork.",
    whatWeDiscuss: [
      "Dwelling, other structures, and personal property options",
      "Liability, medical payments, and umbrella conversations",
      "Claims history + deductible tradeoffs",
      "Bundling and policy review checkpoints after renovations",
    ],
  },
  condo: {
    icon: <Shield className="size-5" aria-hidden />,
    bestFor: "Condo owners who want coverage that complements the HOA master policy.",
    whatWeDiscuss: [
      "Loss assessment and what it can mean for condo owners",
      "Personal property and interior improvements coverage",
      "Liability protection and deductibles",
      "How to read a master policy summary (plain language)",
    ],
  },
  renters: {
    icon: <Shield className="size-5" aria-hidden />,
    bestFor: "Renters who want affordable protection for belongings, liability, and peace of mind.",
    whatWeDiscuss: [
      "Personal property protection and replacement‑cost options",
      "Liability and medical payments coverage",
      "Coverage for items you take on the go",
      "Bundling with auto for better value",
    ],
  },
  life: {
    icon: <LifeBuoy className="size-5" aria-hidden />,
    bestFor: "Families who want a simple plan for income protection, mortgages, and long‑term goals.",
    whatWeDiscuss: [
      "Term vs. permanent options (pros/cons)",
      "How much coverage makes sense (not salesy)",
      "Beneficiaries, riders, and review cadence",
      "How life coverage pairs with overall household planning",
    ],
  },
  business: {
    icon: <BriefcaseBusiness className="size-5" aria-hidden />,
    bestFor: "Local businesses that want clear risk protection without drowning in jargon.",
    whatWeDiscuss: [
      "General liability and property considerations",
      "Business interruption and real‑world scenarios",
      "Certificates of insurance (COIs) and vendor requirements",
      "When to revisit coverage as you grow",
    ],
  },
  motorcycle: {
    icon: <Car className="size-5" aria-hidden />,
    bestFor: "Riders who want coverage for the bike, gear, and the real cost of an incident.",
    whatWeDiscuss: [
      "Liability limits and medical considerations",
      "Comprehensive/collision strategy and deductibles",
      "Accessory and gear coverage options",
      "Seasonal use and storage considerations",
    ],
  },
  boat: {
    icon: <Sailboat className="size-5" aria-hidden />,
    bestFor: "Boat owners who want coverage that fits how often you’re on the water.",
    whatWeDiscuss: [
      "Liability and physical damage options",
      "Trailer and transportation considerations",
      "Named perils vs. broader coverage approaches",
      "Seasonal review and usage changes",
    ],
  },
  atv: {
    icon: <Car className="size-5" aria-hidden />,
    bestFor: "ATV owners who want protection that extends beyond the trailhead.",
    whatWeDiscuss: [
      "Liability and property damage scenarios",
      "Physical damage options and deductibles",
      "How ATV coverage differs from auto policies",
      "How to review as your equipment changes",
    ],
  },
};

const testimonials = [
  {
    quote:
      "They explained limits and deductibles in plain language and helped us adjust coverage without overbuying. The process felt calm and clear.",
    by: "San Marino homeowner",
  },
  {
    quote:
      "We needed auto coverage fast and still wanted the details. We got a quote quickly, and every option was explained with real tradeoffs.",
    by: "Local family",
  },
  {
    quote:
      "As a small business owner, I appreciated the structure: what risks mattered, what didn’t, and how to keep coverage updated as we grow.",
    by: "Small business owner",
  },
] as const;

export default function InsurancePage() {
  return (
    <main id="main" className="bg-background pb-28 md:pb-0">
      <Container className="py-14 sm:py-18 lg:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 border border-foreground/25 bg-surface/50 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/80">
              Coverage through {site.brand.legalLine}
            </div>
            <h1 className="mt-7 text-balance font-serif text-[clamp(2.5rem,5.2vw,4.25rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
              Products built for real life in {site.agent.location}.
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-foreground/75">
              We’ll help you choose coverage options that make sense for your household or business—and keep your
              policies aligned as things change. Expect a clear conversation, fast follow‑ups, and a plan you can
              actually understand.
            </p>

            <div className="mt-9">
              <ButtonLink href="/contact" variant="primary" size="md">
                Contact details
              </ButtonLink>
            </div>
          </div>

          <div className="border border-foreground/20 bg-surface/60 p-6 sm:p-7 lg:max-w-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
              What to expect
            </div>
            <ul className="mt-4 space-y-3 text-sm text-foreground/75">
              <li className="flex gap-3">
                <span className="mt-1 size-1.5 shrink-0 bg-foreground" aria-hidden />
                <span>Quick coverage review and a simple next step.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 size-1.5 shrink-0 bg-foreground" aria-hidden />
                <span>Recommendations based on your situation—not pressure.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 size-1.5 shrink-0 bg-foreground" aria-hidden />
                <span>Clear explanations of limits, deductibles, and tradeoffs.</span>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <section className="border-y border-foreground/20 bg-surface/40">
        <Container className="py-12 sm:py-14">
          <div className="grid gap-6 md:grid-cols-3">
            <ProcessCard
              number="01"
              title="Tell us what matters"
              body="A quick call to understand what you’re protecting and what a “good outcome” looks like."
            />
            <ProcessCard
              number="02"
              title="Review options clearly"
              body="We’ll explain what changes actually do—limits, deductibles, add‑ons—so you can decide confidently."
            />
            <ProcessCard
              number="03"
              title="Keep it aligned"
              body="As life changes, we’ll help review coverage so it still fits—without starting over."
            />
          </div>
        </Container>
      </section>

      <section className="bg-background">
        <Container className="py-16 sm:py-20">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Coverage menu
            </h2>
            <p className="mt-3 max-w-3xl text-pretty text-muted">
              Start with the category that matches your situation. Each card includes the key topics we cover in a
              quick call—so you know what you’ll get before you reach out.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {site.offerings.map((o) => {
              const detail = detailsById[o.id];
              return (
                <section
                  key={o.id}
                  id={o.id}
                  className="scroll-mt-40 border border-foreground/20 bg-surface/60 p-7"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-start gap-3">
                      <div className="grid size-11 place-items-center border border-foreground/20 bg-background/35 text-foreground">
                        {detail?.icon ?? <Shield className="size-5" aria-hidden />}
                      </div>
                      <div>
                        <div className="text-xl font-semibold tracking-tight text-foreground">
                          {o.name} insurance
                        </div>
                        <div className="mt-2 text-sm text-foreground/75">{o.shortDescription}</div>
                      </div>
                    </div>
                    <div className="hidden text-xs font-medium uppercase tracking-[0.18em] text-foreground/70 sm:block">
                      {site.agent.location}
                    </div>
                  </div>

                  {detail ? (
                    <div className="mt-6">
                      <div className="border border-foreground/20 bg-background/30 p-4">
                        <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/75">
                          Best for
                        </div>
                        <div className="mt-2 text-sm text-foreground/75">{detail.bestFor}</div>
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-6">
                    <div className="text-sm font-semibold text-foreground">
                      What we’ll cover in a quick call
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-foreground/75">
                      {(detail?.whatWeDiscuss ?? o.highlights).map((h) => (
                        <li key={h} className="flex gap-3">
                          <span className="mt-1.5 size-1.5 shrink-0 bg-foreground" aria-hidden />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              );
            })}

            <section
              id="financial"
              className="scroll-mt-40 border border-foreground/20 bg-surface/60 p-7 lg:col-span-2"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex items-start gap-3">
                  <div className="grid size-11 place-items-center border border-foreground/20 bg-background/35 text-foreground">
                    <Landmark className="size-5" aria-hidden />
                  </div>
                  <div>
                    <div className="text-xl font-semibold tracking-tight text-foreground">
                      Financial products
                    </div>
                    <div className="mt-2 text-sm text-foreground/75">
                      A practical conversation about long‑term goals—retirement income, protection planning, and how
                      life coverage can fit into the bigger picture.
                    </div>
                  </div>
                </div>
                <div className="hidden text-xs font-medium uppercase tracking-[0.18em] text-foreground/70 sm:block">
                  {site.agent.location}
                </div>
              </div>

              <div className="mt-6">
                <div className="border border-foreground/20 bg-background/30 p-4">
                  <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/75">
                    Best for
                  </div>
                  <div className="mt-2 text-sm text-foreground/75">
                    Households that want to connect protection and planning—without getting lost in jargon.
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-sm font-semibold text-foreground">
                  What we’ll cover in a quick call
                </div>
                <ul className="mt-3 space-y-2 text-sm text-foreground/75">
                  <li className="flex gap-3">
                    <span className="mt-1.5 size-1.5 shrink-0 bg-foreground" aria-hidden />
                    <span>Your goals and timeline (retirement, income protection, legacy planning)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 size-1.5 shrink-0 bg-foreground" aria-hidden />
                    <span>How life insurance and financial products can complement each other</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 size-1.5 shrink-0 bg-foreground" aria-hidden />
                    <span>Beneficiaries, review cadence, and keeping details up to date</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 size-1.5 shrink-0 bg-foreground" aria-hidden />
                    <span>Next steps: what to prepare and what decisions can wait</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 text-xs leading-6 text-foreground/70">
                Financial products may be offered through licensed financial professionals; availability and eligibility
                vary. We’ll confirm what applies to your situation.
              </div>
            </section>
          </div>

          <section
            id="quote"
            className="mt-12 scroll-mt-40 border border-foreground/20 bg-surface/60 p-7"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-[62ch]">
                <h3 className="text-xl font-semibold tracking-tight text-foreground">
                  Request a quote
                </h3>
                <p className="mt-3 text-pretty text-foreground/75">
                  Tell us what you’re shopping for and the best way to reach you. If you prefer, you can also call and
                  we’ll cover the essentials in a quick conversation.
                </p>
                <div className="mt-5">
                  <div className="text-sm font-semibold text-foreground">
                    What we’ll cover in a quick call
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-foreground/75">
                    <li className="flex gap-3">
                      <span className="mt-1.5 size-1.5 shrink-0 bg-foreground" aria-hidden />
                      <span>What you’re trying to protect and what “good coverage” means to you</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-1.5 size-1.5 shrink-0 bg-foreground" aria-hidden />
                      <span>Key limits, deductibles, and tradeoffs (plain language)</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-1.5 size-1.5 shrink-0 bg-foreground" aria-hidden />
                      <span>Bundling opportunities and smart ways to save</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-1.5 size-1.5 shrink-0 bg-foreground" aria-hidden />
                      <span>Next steps: what to send now and what can wait</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="w-full max-w-[520px]">
                <QuoteRequestForm />
              </div>
            </div>
          </section>
        </Container>
      </section>

      <section className="bg-surface/35">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                What customers say
              </h2>
              <p className="mt-3 max-w-xl text-pretty text-foreground/75">
                People come to us for clarity, responsiveness, and coverage that stays aligned over time.
              </p>
              <div className="mt-7 border border-foreground/20 bg-background/35 p-6">
                <div className="flex items-center gap-3">
                  <span aria-hidden className="font-serif tracking-[0.15em] text-foreground">
                    ★★★★★
                  </span>
                  <span className="text-sm font-medium uppercase tracking-[0.18em] text-foreground/80">
                    {site.agent.rating.reviewCount} reviews
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              {testimonials.map((t) => (
                <figure key={t.by} className="border border-foreground/20 bg-background/35 p-7">
                  <blockquote className="text-pretty text-lg leading-8 text-foreground">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-5 text-sm font-medium uppercase tracking-[0.18em] text-foreground/75">
                    {t.by}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <StickyCoverageCta />
    </main>
  );
}

function ProcessCard({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <div className="border border-foreground/20 bg-background/30 p-7">
      <div className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">{number}</div>
      <div className="mt-3 text-lg font-semibold tracking-tight text-foreground">{title}</div>
      <p className="mt-3 text-sm leading-7 text-foreground/75">{body}</p>
    </div>
  );
}

function StickyCoverageCta() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 pb-[max(env(safe-area-inset-bottom),12px)] md:inset-x-auto md:bottom-6 md:right-6 md:pb-0">
      <div className="pointer-events-auto mx-auto w-full max-w-[760px] px-4 md:mx-0 md:w-[360px] md:px-0">
        <div className="flex items-stretch gap-2 border border-foreground/20 bg-background/80 p-2 backdrop-blur-sm md:flex-col md:p-3">
          <a
            href={`tel:${site.agent.phone.e164}`}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-none border border-foreground bg-foreground px-5 text-xs font-medium uppercase tracking-[0.18em] text-white shadow-sm shadow-black/15 transition-colors hover:bg-foreground/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
          >
            <Phone className="size-4" aria-hidden />
            Call {site.agent.phone.display}
          </a>
          <a
            href="#quote"
            className="inline-flex h-12 flex-1 items-center justify-center rounded-none border border-foreground/60 bg-transparent px-5 text-xs font-medium uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
          >
            Request a quote
          </a>
        </div>
      </div>
    </div>
  );
}
