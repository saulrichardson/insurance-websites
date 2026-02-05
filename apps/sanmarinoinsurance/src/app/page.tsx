import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { QuoteRequestForm } from "@/components/quote-request-form";
import { SituationExplorer } from "@/components/home/situation-explorer";
import {
  AutoIllustration,
  BusinessIllustration,
  HomeIllustration,
  InvestmentsIllustration,
  LifeIllustration,
  LongTermCareIllustration,
  RentersIllustration,
  UmbrellaIllustration,
} from "@/components/product/product-illustrations";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";
import { careerRoles } from "@/lib/careers";

export default function Home() {
  const careersCopy =
    careerRoles.length > 0
      ? `We’re hiring — ${careerRoles.length} open ${careerRoles.length === 1 ? "role" : "roles"}`
      : "Careers — explore roles and culture";

  return (
    <main id="main" className="bg-background">
      <section aria-label="Careers" className="border-b border-accent/15 bg-accent text-accent-foreground">
        <Container className="flex h-12 items-center justify-between gap-4 font-sans text-sm">
          <Link
            href="/careers/jobs"
            className="inline-flex min-w-0 items-center gap-2 truncate text-accent-foreground/90 hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-foreground/70"
          >
            <span className="size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
            <span className="truncate">{careersCopy}</span>
            <ArrowRight className="size-4 shrink-0" aria-hidden />
          </Link>

          <Link
            href="/careers"
            className="hidden items-center gap-2 rounded-full border border-accent-foreground/25 bg-accent-foreground/10 px-4 py-2 text-xs font-medium text-accent-foreground/90 shadow-sm shadow-black/10 hover:bg-accent-foreground/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-foreground/70 sm:inline-flex"
          >
            Learn more
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Container>
      </section>

      <section className="relative overflow-hidden pb-14 pt-6 sm:pb-18 sm:pt-10 lg:pb-22 lg:pt-12">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <h1 className="text-balance font-serif text-[clamp(2.8rem,5.6vw,4.6rem)] leading-[0.95] tracking-tight text-foreground">
                Insurance that&apos;s{" "}
                <span className="text-brand">clear</span>.{" "}
                <span className="text-accent-2">responsive</span>.{" "}
                <span className="text-brand">built around your life</span>.
              </h1>

              <p className="mt-5 max-w-xl text-pretty text-lg leading-8 text-foreground/75">
                We help households and business owners choose coverage with a calm, structured approach—so you
                understand limits, deductibles, and tradeoffs before you ever need to file a claim.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href="#quote" variant="primary" size="md">
                  Get a quote
                </ButtonLink>
                <ButtonLink href="/coverages" variant="outline" size="md">
                  Browse products
                </ButtonLink>
                <a
                  href={`tel:${site.agent.phone.e164}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/15 bg-surface/60 px-5 py-2.5 text-sm font-medium text-accent shadow-sm shadow-black/5 hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
                >
                  <Phone className="size-4" aria-hidden />
                  Call {site.agent.phone.display}
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-2 text-sm text-foreground/70">
                <span className="font-medium text-accent">Jump to:</span>
                <a className="rounded-full bg-surface/70 px-3 py-1.5 hover:bg-surface" href="#situations">
                  Situations
                </a>
                <a className="rounded-full bg-surface/70 px-3 py-1.5 hover:bg-surface" href="#carriers">
                  Carriers
                </a>
                <a className="rounded-full bg-surface/70 px-3 py-1.5 hover:bg-surface" href="#quote">
                  Quote
                </a>
              </div>

              <div className="mt-8 text-sm text-foreground/70">
                Languages:{" "}
                <span className="font-medium text-accent">
                  {site.agent.languages.slice(0, 4).join(", ")}
                </span>
                {site.agent.languages.length > 4 ? <span>, and more.</span> : null}
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-accent/15 bg-surface p-7 shadow-lg shadow-black/10">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,color-mix(in_srgb,var(--brand)_35%,transparent),transparent_55%),radial-gradient(circle_at_85%_65%,color-mix(in_srgb,var(--accent)_18%,transparent),transparent_55%)]" />

                <div className="relative grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-background p-4">
                    <HomeIllustration className="h-[110px] w-full text-accent" />
                    <div className="mt-4 text-sm font-semibold text-accent">Home</div>
                    <div className="mt-1 text-sm text-foreground/70">
                      Rebuild cost, belongings, liability—explained plainly.
                    </div>
                  </div>

                  <div className="rounded-2xl bg-background p-4">
                    <AutoIllustration className="h-[110px] w-full text-accent" />
                    <div className="mt-4 text-sm font-semibold text-accent">Auto</div>
                    <div className="mt-1 text-sm text-foreground/70">
                      Liability, deductibles, discounts—structured and calm.
                    </div>
                  </div>
                </div>

                <div className="relative mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-accent/10 bg-surface/70 p-4">
                    <div className="text-xs font-medium uppercase tracking-[0.16em] text-foreground/65">
                      Review style
                    </div>
                    <div className="mt-2 text-sm text-foreground/75">
                      Clear tradeoffs, documented decisions, and an annual alignment check.
                    </div>
                  </div>
                  <div className="rounded-2xl border border-accent/10 bg-surface/70 p-4">
                    <div className="text-xs font-medium uppercase tracking-[0.16em] text-foreground/65">
                      Local support
                    </div>
                    <div className="mt-2 text-sm text-foreground/75">
                      A neighborhood agency with specialty-market access when needed.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="products" className="bg-surface">
        <Container className="py-16 sm:py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">
                What we <span className="text-brand">offer</span>
              </div>
              <h2 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Start simple. Add protection where it actually helps.
              </h2>
              <p className="mt-4 text-pretty text-lg leading-8 text-foreground/75">
                Browse products to see how we structure coverage for real scenarios. Each page explains what we focus
                on, what to prepare, and how we look for savings without weakening the plan.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/coverages" variant="outline" size="md">
                Products overview
              </ButtonLink>
              <ButtonLink href="#quote" variant="primary" size="md">
                Get covered
              </ButtonLink>
            </div>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <LandingProductCard
              title="Home"
              description="Dwelling, belongings, and liability—built around your property."
              href="/coverages/home"
              illustration={<HomeIllustration className="h-full w-full text-accent" />}
            />
            <LandingProductCard
              title="Auto"
              description="Everyday driving, commuting, and family coverage."
              href="/coverages/auto"
              illustration={<AutoIllustration className="h-full w-full text-accent" />}
            />
            <LandingProductCard
              title="Renters"
              description="Affordable protection for belongings and personal liability."
              href="/coverages/renters"
              illustration={<RentersIllustration className="h-full w-full text-accent" />}
            />
            <LandingProductCard
              title="Umbrella"
              description="Extra liability protection above auto and home limits."
              href="/coverages/umbrella"
              illustration={<UmbrellaIllustration className="h-full w-full text-accent" />}
            />
            <LandingProductCard
              title="Life"
              description="Income protection and planning—structured, not salesy."
              href="/coverages/life"
              illustration={<LifeIllustration className="h-full w-full text-accent" />}
            />
            <LandingProductCard
              title="Long-term care"
              description="Plan for extended care needs with clarity and options."
              href="/coverages/long-term-care"
              illustration={<LongTermCareIllustration className="h-full w-full text-accent" />}
            />
            <LandingProductCard
              title="Investments"
              description="A practical conversation about long-term goals and next steps."
              href="/coverages/investments"
              illustration={<InvestmentsIllustration className="h-full w-full text-accent" />}
            />
            <LandingProductCard
              title="Business"
              description="Contracts, COIs, and specialty-market access when needed."
              href="/coverages/business"
              illustration={<BusinessIllustration className="h-full w-full text-accent" />}
            />
          </div>
        </Container>
      </section>

      <section id="situations" className="bg-background">
        <SituationExplorer />
      </section>

      <section id="carriers" className="bg-surface">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
            <div className="min-w-0">
              <div className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">
                Market <span className="text-brand">access</span>
              </div>
              <h2 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Strong options when standard quotes don&apos;t fit.
              </h2>
              <p className="mt-4 text-pretty text-lg leading-8 text-foreground/75">
                We work across carriers—including specialty channels—so we can match coverage to real exposures. If
                you&apos;ve been told it&apos;s “too tricky” or “too late,” we&apos;d like to take a look.
              </p>
              <div className="mt-7 flex flex-wrap gap-2 text-sm">
                <span className="rounded-full bg-background px-3 py-1.5 font-medium text-accent">Allstate</span>
                <span className="rounded-full bg-background px-3 py-1.5 font-medium text-accent">Chubb</span>
                <span className="rounded-full bg-background px-3 py-1.5 font-medium text-accent">RT Specialty</span>
                <span className="rounded-full bg-background px-3 py-1.5 font-medium text-accent">Burns &amp; Wilcox</span>
                <span className="rounded-full bg-background px-3 py-1.5 font-medium text-accent">…and more</span>
              </div>
            </div>

            <div className="min-w-0 rounded-3xl border border-accent/15 bg-background p-6 shadow-sm shadow-black/5">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">
                    Carrier access
                  </div>
                  <div className="mt-2 text-sm text-foreground/75">
                    A sample of the markets we work with.
                  </div>
                </div>
                <ButtonLink href="/contact" variant="outline" size="sm">
                  Contact details
                </ButtonLink>
              </div>

              <div className="mt-7 relative min-w-0 overflow-hidden">
                <div className="flex w-max will-change-transform animate-[ticker_40s_linear_infinite] items-center motion-reduce:animate-none">
                  <CarrierTickerList />
                  <CarrierTickerList ariaHidden />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="quote" className="bg-background pb-32 md:pb-0">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_520px] lg:items-start">
            <div>
              <div className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">
                Need insurance?
              </div>
              <h2 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Tell us what you&apos;re shopping for. We&apos;ll make it clear.
              </h2>
              <p className="mt-4 max-w-xl text-pretty text-lg leading-8 text-foreground/75">
                Request a quote or a coverage review. We&apos;ll follow up with a simple next step and explain options
                in plain language.
              </p>
              <div className="mt-8 rounded-3xl border border-accent/15 bg-surface/70 p-6 shadow-sm shadow-black/5">
                <div className="text-sm font-semibold text-accent">Prefer to talk?</div>
                <div className="mt-2 text-sm text-foreground/75">
                  Call{" "}
                  <a
                    className="font-medium text-accent underline underline-offset-4 hover:text-accent/80"
                    href={`tel:${site.agent.phone.e164}`}
                  >
                    {site.agent.phone.display}
                  </a>{" "}
                  or visit one of our offices in{" "}
                  <Link className="font-medium text-accent underline underline-offset-4 hover:text-accent/80" href="/locations">
                    San Marino or La Palma
                  </Link>
                  .
                </div>
              </div>
            </div>

            <div>
              <QuoteRequestForm source="home-landing" />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

type Carrier = {
  name: string;
  assetPath: string;
  width: number;
  height: number;
};

const carriers: Carrier[] = [
  { name: "Allstate", assetPath: "/carriers/allstate.svg", width: 124, height: 27 },
  { name: "Bamboo", assetPath: "/carriers/bamboo.png", width: 212, height: 39 },
  { name: "Chubb", assetPath: "/carriers/chubb.svg", width: 315, height: 62 },
  { name: "RT Specialty", assetPath: "/carriers/rt-specialty.svg", width: 405, height: 155 },
  { name: "Bristol West", assetPath: "/carriers/bristol-west.svg", width: 542, height: 187 },
  { name: "Burns & Wilcox", assetPath: "/carriers/burns-wilcox.svg", width: 140, height: 57 },
  { name: "National General", assetPath: "/carriers/national-general.png", width: 1544, height: 183 },
  { name: "Pacific Specialty", assetPath: "/carriers/pacific-specialty.svg", width: 272, height: 48 },
  { name: "Stillwater", assetPath: "/carriers/stillwater.svg", width: 441, height: 135 },
  { name: "Aegis", assetPath: "/carriers/aegis.svg", width: 238, height: 110 },
];

function CarrierTickerList({ ariaHidden = false }: { ariaHidden?: boolean }) {
  const tickerCarriers = [...carriers, ...carriers];

  return (
    <ul
      className="flex items-center"
      aria-hidden={ariaHidden}
    >
      {tickerCarriers.map((carrier, idx) => (
        <li
          key={`${carrier.name}-${idx}`}
          className="flex h-12 w-[220px] items-center justify-center sm:w-[240px] md:w-[260px]"
        >
          <Image
            src={carrier.assetPath}
            alt={ariaHidden ? "" : carrier.name}
            width={carrier.width}
            height={carrier.height}
            sizes="260px"
            unoptimized={carrier.assetPath.endsWith(".svg")}
            className="h-7 w-auto max-w-[200px] select-none object-contain opacity-100 sm:h-8 sm:max-w-[220px]"
            priority={!ariaHidden && idx < carriers.length}
            loading="eager"
          />
        </li>
      ))}
    </ul>
  );
}

function LandingProductCard({
  title,
  description,
  href,
  illustration,
}: {
  title: string;
  description: string;
  href: string;
  illustration: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-xl bg-background p-8 pt-28 shadow-sm shadow-black/5 transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60"
    >
      <div className="absolute left-6 right-6 top-6 grid h-20 place-items-center rounded-2xl bg-surface/70 p-3">
        {illustration}
      </div>

      <div className="text-lg font-semibold tracking-tight text-accent">{title}</div>
      <p className="mt-2 text-sm leading-6 text-foreground/75">{description}</p>

      <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent">
        Learn more
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </div>
    </Link>
  );
}
