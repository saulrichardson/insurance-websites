import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";
import { QuoteRequestForm } from "@/components/quote-request-form";
import { ProductStickyCta } from "@/components/product/product-sticky-cta";
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

export const metadata = {
  title: "Products",
  description: `Browse personal, business, and life insurance products in ${site.agent.location}. Call ${site.agent.phone.display} for a quote or a coverage review.`,
};

type ProductCardProps = {
  title: string;
  description: string;
  href: string;
  illustration: ReactNode;
};

const productGroups = [
  {
    id: "personal",
    eyebrow: "Personal",
    title: "Personal coverage",
    description: `Start with the household essentials—then strengthen liability so one accident doesn’t become a long-term financial problem.`,
    products: [
      {
        title: "Home",
        description: "Dwelling, belongings, and liability—built around your property.",
        href: "/insurance/home",
        illustration: <HomeIllustration className="h-full w-full text-accent" />,
      },
      {
        title: "Auto",
        description: "Everyday driving, commuting, and family coverage.",
        href: "/insurance/auto",
        illustration: <AutoIllustration className="h-full w-full text-accent" />,
      },
      {
        title: "Renters",
        description: "Affordable protection for belongings and personal liability.",
        href: "/insurance/renters",
        illustration: <RentersIllustration className="h-full w-full text-accent" />,
      },
      {
        title: "Umbrella",
        description: "Extra liability protection above auto and home limits.",
        href: "/insurance/umbrella",
        illustration: <UmbrellaIllustration className="h-full w-full text-accent" />,
      },
    ] satisfies ProductCardProps[],
  },
  {
    id: "planning",
    eyebrow: "Life + Planning",
    title: "Life and planning",
    description:
      "Long-term protection isn’t about buying “everything.” It’s about structuring the right plan around income, family responsibilities, and time horizons.",
    products: [
      {
        title: "Life",
        description: "Income protection and planning—structured, not salesy.",
        href: "/insurance/life",
        illustration: <LifeIllustration className="h-full w-full text-accent" />,
      },
      {
        title: "Long-term care",
        description: "Plan for extended care needs with clarity and options.",
        href: "/insurance/long-term-care",
        illustration: <LongTermCareIllustration className="h-full w-full text-accent" />,
      },
      {
        title: "Investments",
        description: "A practical conversation about long-term goals and next steps.",
        href: "/insurance/investments",
        illustration: <InvestmentsIllustration className="h-full w-full text-accent" />,
      },
    ] satisfies ProductCardProps[],
  },
  {
    id: "business",
    eyebrow: "Business",
    title: "Business and specialty markets",
    description:
      "If you need COIs, contract-ready limits, or your risk doesn’t fit standard programs, we can help structure coverage—and widen the search through specialty markets.",
    products: [
      {
        title: "Business",
        description: "Contracts, COIs, and specialty-market access when needed.",
        href: "/insurance/business",
        illustration: <BusinessIllustration className="h-full w-full text-accent" />,
      },
    ] satisfies ProductCardProps[],
  },
] as const;

export default function InsurancePage() {
  return (
    <main id="main" className="bg-background pb-32 md:pb-0">
      <Container className="py-14 sm:py-18 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-surface/70 px-4 py-2 text-xs font-medium text-accent shadow-sm shadow-black/5">
              <span className="size-1.5 rounded-full bg-brand" aria-hidden />
              Products • {site.agent.location}
            </div>
            <h1 className="mt-7 text-balance font-serif text-[clamp(2.6rem,5.4vw,4.35rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
              A clear place to start—home, auto, life, and business coverage.
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-foreground/75">
              This page is a product directory. Each product page explains what we focus on, what to prepare, and the
              decisions that usually matter most—without a high-pressure vibe.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="#quote" variant="primary" size="md">
                Request a quote
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline" size="md">
                Contact details
              </ButtonLink>
              <a
                href={`tel:${site.agent.phone.e164}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/15 bg-surface/60 px-5 py-2.5 text-sm font-medium text-accent shadow-sm shadow-black/5 hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
              >
                <Phone className="size-4" aria-hidden />
                Call {site.agent.phone.display}
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-accent/15 bg-surface p-6 shadow-lg shadow-black/10 sm:p-7">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              How we keep it organized
            </div>
            <ul className="mt-4 space-y-3 text-sm text-foreground/75">
              <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                <span>We start with the situation, not the carrier brochure.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                <span>We explain limits, deductibles, and tradeoffs in plain language.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                <span>We confirm the details that change outcomes before you ever need a claim.</span>
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {productGroups.map((group) => (
                <a
                  key={group.id}
                  href={`#${group.id}`}
                  className="inline-flex items-center rounded-full border border-accent/15 bg-background px-3 py-1.5 text-xs font-medium text-accent shadow-sm shadow-black/5 hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
                >
                  {group.eyebrow}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <section className="bg-surface">
        <Container className="py-16 sm:py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">
                Product <span className="text-brand">directory</span>
              </div>
              <h2 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Choose a category. Then pick a product.
              </h2>
              <p className="mt-4 text-pretty text-lg leading-8 text-foreground/75">
                This is intentionally separated from the homepage so you can browse products without feeling like
                you’re “cycling” through sections. Each product links to a dedicated page with practical detail.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {productGroups.map((group) => (
                <a
                  key={group.id}
                  href={`#${group.id}`}
                  className="inline-flex items-center rounded-full border border-accent/15 bg-background px-4 py-2 text-sm font-medium text-accent shadow-sm shadow-black/5 hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
                >
                  {group.title}
                </a>
              ))}
            </div>
          </div>

          {productGroups.map((group) => (
            <section
              key={group.id}
              id={group.id}
              className="mt-14 scroll-mt-[var(--header-offset)] first:mt-12"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-3xl">
                  <div className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">
                    {group.eyebrow}
                  </div>
                  <h3 className="mt-4 font-serif text-2xl tracking-[-0.03em] text-foreground sm:text-3xl">
                    {group.title}
                  </h3>
                  <p className="mt-3 text-pretty text-foreground/75">{group.description}</p>
                </div>
                <ButtonLink href="#quote" variant="outline" size="sm">
                  Request a quote
                </ButtonLink>
              </div>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.products.map((product) => (
                  <DirectoryProductCard
                    key={product.href}
                    title={product.title}
                    description={product.description}
                    href={product.href}
                    illustration={product.illustration}
                  />
                ))}
              </div>
            </section>
          ))}

          <div className="mt-16 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="rounded-3xl border border-accent/15 bg-background p-7 shadow-sm shadow-black/5">
              <div className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">
                Not sure where to start?
              </div>
              <h3 className="mt-3 font-serif text-2xl tracking-[-0.03em] text-foreground">
                Start with a coverage review.
              </h3>
              <p className="mt-4 text-sm leading-7 text-foreground/75">
                A short, structured conversation usually reveals the real priority: liability limits, rebuild cost,
                deductibles, or a gap like umbrella coverage. We’ll outline the path clearly and recommend the next
                step.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" variant="primary" size="md">
                  Contact details
                </ButtonLink>
                <ButtonLink href="#quote" variant="outline" size="md">
                  Request a quote
                </ButtonLink>
              </div>
            </div>

            <div className="rounded-3xl border border-accent/15 bg-background p-7 shadow-sm shadow-black/5">
              <div className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">
                Specialty markets
              </div>
              <h3 className="mt-3 font-serif text-2xl tracking-[-0.03em] text-foreground">
                When standard quotes don’t fit.
              </h3>
              <p className="mt-4 text-sm leading-7 text-foreground/75">
                If you’ve been told it’s “too tricky” or “not eligible,” we can widen the search. We work with
                specialty channels (including Ryan Turner Specialty and Burns &amp; Wilcox) to explore options when
                needed.
              </p>
              <div className="mt-6">
                <Link
                  href="/insurance/business"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60"
                >
                  Explore business + specialty coverage
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
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

      <section id="quote" className="bg-background scroll-mt-[var(--header-offset)]">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Request a quote
              </h2>
              <p className="mt-3 max-w-[62ch] text-pretty text-foreground/75">
                Tell us what you’re shopping for and the best way to reach you. If you prefer, you can call and we’ll
                cover the essentials in a quick conversation.
              </p>
              <div className="mt-6">
                <div className="text-sm font-semibold text-foreground">
                  What we’ll cover in a quick call
                </div>
                <ul className="mt-3 space-y-2 text-sm text-foreground/75">
                  <li className="flex gap-3">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>What you’re trying to protect and what “good coverage” means to you</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>Key limits, deductibles, and tradeoffs (plain language)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>Bundling opportunities and smart ways to save</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>Next steps: what to send now and what can wait</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full max-w-[520px] rounded-3xl border border-accent/15 bg-surface p-7 shadow-sm shadow-black/5">
              <QuoteRequestForm source="products-directory" />
            </div>
          </div>
        </Container>
      </section>

      <ProductStickyCta />
    </main>
  );
}

function ProcessCard({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-accent/15 bg-background p-7 shadow-sm shadow-black/5">
      <div className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">{number}</div>
      <div className="mt-3 text-lg font-semibold tracking-tight text-accent">{title}</div>
      <p className="mt-3 text-sm leading-7 text-foreground/75">{body}</p>
    </div>
  );
}

function DirectoryProductCard({ title, description, href, illustration }: ProductCardProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl bg-background p-8 pt-28 shadow-sm shadow-black/5 transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60"
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
