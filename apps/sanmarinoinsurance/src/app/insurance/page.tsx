import {
  BriefcaseBusiness,
  Car,
  Home as HomeIcon,
  LifeBuoy,
  Phone,
  Sailboat,
  Shield,
} from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata = {
  title: "Products",
  description: `Auto, home, renters, condo, life, business, motorcycle, boat, and ATV insurance in ${site.agent.location}. Call ${site.agent.phone.display}.`,
};

type CoverageDetail = {
  icon: ReactNode;
  bestFor: string;
  whatWeDiscuss: string[];
  quickWin: string;
};

const detailsById: Record<string, CoverageDetail> = {
  auto: {
    icon: <Car className="size-5" aria-hidden />,
    bestFor: "Drivers who want clearer limits, smarter deductibles, and fewer surprises after a claim.",
    quickWin: "We’ll sanity‑check liability limits and uninsured motorist coverage in 5 minutes.",
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
    quickWin: "We’ll review dwelling coverage and key exclusions so you know what matters most.",
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
    quickWin: "We’ll help you align your interior coverage with the master policy’s gaps.",
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
    quickWin: "We can quote quickly and explain what “personal property” actually covers.",
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
    quickWin: "We’ll map a practical coverage range based on your household needs.",
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
    quickWin: "We’ll identify your most important exposures and the coverage that fits them.",
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
    quickWin: "We’ll align coverage with how and where you actually ride.",
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
    quickWin: "We’ll clarify what’s covered on‑water vs. at dock vs. in storage.",
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
    quickWin: "We’ll confirm where you ride and what liability scenarios matter most.",
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
    <main id="main" className="bg-background">
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

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`tel:${site.agent.phone.e164}`} variant="primary" size="md" className="gap-2">
                <Phone className="size-4" aria-hidden />
                Call {site.agent.phone.display}
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline" size="md">
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
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Coverage menu
              </h2>
              <p className="mt-3 max-w-3xl text-pretty text-muted">
                Start with the category that matches your situation. Each card includes the key topics we cover in a
                quick call—so you know what you’ll get before you reach out.
              </p>
            </div>
            <ButtonLink href="/contact" variant="outline" size="md">
              Get in touch
            </ButtonLink>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {site.offerings.map((o) => {
              const detail = detailsById[o.id];
              return (
                <section key={o.id} className="border border-foreground/20 bg-surface/60 p-7">
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
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div className="border border-foreground/20 bg-background/30 p-4">
                        <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/75">
                          Best for
                        </div>
                        <div className="mt-2 text-sm text-foreground/75">{detail.bestFor}</div>
                      </div>
                      <div className="border border-foreground/20 bg-background/30 p-4">
                        <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/75">
                          Quick win
                        </div>
                        <div className="mt-2 text-sm text-foreground/75">{detail.quickWin}</div>
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

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <ButtonLink href="/contact" variant="primary" size="sm">
                      Request a quote
                    </ButtonLink>
                    <ButtonLink href={`tel:${site.agent.phone.e164}`} variant="outline" size="sm">
                      Call the office
                    </ButtonLink>
                  </div>
                </section>
              );
            })}
          </div>
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
                    {site.agent.rating.reviewCount}
                  </span>
                </div>
                <div className="mt-2 text-sm text-foreground/75">
                  {site.agent.rating.reviewCount} five‑star reviews
                </div>
                <div className="mt-4">
                  <ButtonLink href={site.agent.links.allstateProfile} variant="outline" size="sm">
                    View Allstate profile
                  </ButtonLink>
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

      <section className="bg-background">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 border border-foreground/20 bg-surface/55 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Ready for a quote or coverage review?
              </h2>
              <p className="mt-3 text-pretty text-foreground/75">
                Call during office hours, or reach out anytime. We’ll help you choose coverage that fits now—and keep
                it aligned when life changes.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <ButtonLink href={`tel:${site.agent.phone.e164}`} variant="primary" size="md" className="gap-2">
                <Phone className="size-4" aria-hidden />
                Call {site.agent.phone.display}
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline" size="md">
                Contact details
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
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

