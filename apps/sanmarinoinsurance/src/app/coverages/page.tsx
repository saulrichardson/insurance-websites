import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { QuoteRequestForm } from "@/components/quote-request-form";
import { site } from "@/lib/site";
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
  title: "Coverages",
  description: `Browse insurance coverages in ${site.agent.location}. Call ${site.agent.phone.display} for a quote or coverage review.`,
};

type CoverageLink = {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
};

const coverages: CoverageLink[] = [
  {
    title: "Home",
    description: "Dwelling, belongings, and liability—built around your property.",
    href: "/coverages/home",
    icon: <HomeIllustration className="h-10 w-10 text-accent" />,
  },
  {
    title: "Auto",
    description: "Everyday driving, commuting, and family coverage.",
    href: "/coverages/auto",
    icon: <AutoIllustration className="h-10 w-10 text-accent" />,
  },
  {
    title: "Renters",
    description: "Affordable protection for belongings and personal liability.",
    href: "/coverages/renters",
    icon: <RentersIllustration className="h-10 w-10 text-accent" />,
  },
  {
    title: "Umbrella (liability)",
    description: "Extra liability protection above auto and home limits.",
    href: "/coverages/umbrella",
    icon: <UmbrellaIllustration className="h-10 w-10 text-accent" />,
  },
  {
    title: "Life insurance",
    description: "Income protection and planning—structured, not salesy.",
    href: "/coverages/life",
    icon: <LifeIllustration className="h-10 w-10 text-accent" />,
  },
  {
    title: "Long‑term care",
    description: "Plan for extended care needs with clarity and options.",
    href: "/coverages/long-term-care",
    icon: <LongTermCareIllustration className="h-10 w-10 text-accent" />,
  },
  {
    title: "Investments",
    description: "A practical conversation about long-term goals and next steps.",
    href: "/coverages/investments",
    icon: <InvestmentsIllustration className="h-10 w-10 text-accent" />,
  },
  {
    title: "Business",
    description: "Contracts, COIs, and specialty-market access when needed.",
    href: "/coverages/business",
    icon: <BusinessIllustration className="h-10 w-10 text-accent" />,
  },
];

export default function CoveragesPage() {
  return (
    <main id="main" className="bg-background">
      <section className="relative overflow-hidden pb-14 pt-12 sm:pb-18 sm:pt-16 lg:pb-20 lg:pt-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-surface/70 px-4 py-2 text-xs font-medium text-accent shadow-sm shadow-black/5">
                <span className="size-1.5 rounded-full bg-brand" aria-hidden />
                Coverages • {site.agent.location}
              </div>

              <h1 className="mt-7 text-balance font-serif text-[clamp(2.7rem,5.7vw,4.7rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
                Clear coverage for home, auto, life, and business.
              </h1>

              <p className="mt-5 max-w-xl text-pretty text-lg leading-8 text-foreground/75">
                Browse what we offer, then click into the pages that match your situation. Each coverage page is built
                to help you understand the few decisions that actually change outcomes—limits, deductibles, and
                liability—without a high-pressure vibe.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href="#quote" variant="primary" size="md">
                  Get quoted
                </ButtonLink>
                <ButtonLink href="#browse" variant="outline" size="md">
                  Browse coverages
                </ButtonLink>
                <a
                  href={`tel:${site.agent.phone.e164}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/15 bg-surface/60 px-5 py-2.5 text-sm font-medium text-accent shadow-sm shadow-black/5 hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
                >
                  <Phone className="size-4" aria-hidden />
                  Call {site.agent.phone.display}
                </a>
              </div>

              <ul className="mt-10 grid gap-3 text-sm text-foreground/75 sm:grid-cols-2">
                <li className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>Quote accuracy first: the details that change claims outcomes.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>Plain-language guidance on limits, deductibles, and tradeoffs.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>Bundle opportunities (when it fits), without weakening coverage.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>Specialty-market access when standard quotes don’t fit.</span>
                </li>
              </ul>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-accent/15 bg-surface p-7 shadow-lg shadow-black/10">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,color-mix(in_srgb,var(--brand)_28%,transparent),transparent_55%),radial-gradient(circle_at_85%_70%,color-mix(in_srgb,var(--accent-2)_16%,transparent),transparent_52%)]" />

                <div className="relative grid gap-5">
                  <div className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">
                    Popular starting points
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <PreviewCard
                      title="Home"
                      body="Rebuild cost, belongings, and liability—organized clearly."
                      icon={<HomeIllustration className="h-14 w-14 text-accent" />}
                      href="/coverages/home"
                    />
                    <PreviewCard
                      title="Auto"
                      body="Liability limits, deductibles, and savings—structured calmly."
                      icon={<AutoIllustration className="h-14 w-14 text-accent" />}
                      href="/coverages/auto"
                    />
                  </div>

                  <div className="rounded-2xl border border-accent/10 bg-background p-5">
                    <div className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">
                      Not sure what you need?
                    </div>
                    <div className="mt-2 text-sm leading-7 text-foreground/75">
                      Start with a quick coverage review. We’ll recommend a clean next step and outline what to send
                      (and what can wait).
                    </div>
                    <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                      <ButtonLink href="#quote" variant="primary" size="sm">
                        Request a quote
                      </ButtonLink>
                      <ButtonLink href="/contact" variant="outline" size="sm">
                        Contact details
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="browse" className="bg-surface scroll-mt-[var(--header-offset)]">
        <Container className="py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">
              Browse <span className="text-brand">coverages</span>
            </div>
            <h2 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Choose what you want to protect.
            </h2>
            <p className="mt-4 text-pretty text-lg leading-8 text-foreground/75">
              Click into any coverage to see how we explain the tradeoffs and the real-world decisions that matter.
              You’ll also find a clean way to request a quote or a review.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {coverages.map((coverage) => (
              <CoverageLinkRow key={coverage.href} {...coverage} />
            ))}
          </div>
        </Container>
      </section>

      <section id="quote" className="bg-background scroll-mt-[var(--header-offset)]">
        <Container className="py-16 sm:py-20">
          <div className="rounded-3xl border border-accent/15 bg-accent p-7 shadow-lg shadow-black/15 sm:p-10">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start">
              <div className="text-accent-foreground">
                <div className="text-xs font-medium uppercase tracking-[0.22em] text-accent-foreground/75">
                  Need insurance?
                </div>
                <h2 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                  Let’s get you a quote that actually fits.
                </h2>
                <p className="mt-4 max-w-[60ch] text-pretty text-lg leading-8 text-accent-foreground/85">
                  If you’ve been told it’s “too tricky,” “not eligible,” or you just want clearer options—we’d like to
                  take a look. We’ll confirm details early so the quote is accurate and the policy stays aligned at
                  renewal.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href={`tel:${site.agent.phone.e164}`} variant="secondary" size="md" className="gap-2">
                    <Phone className="size-4" aria-hidden />
                    Call {site.agent.phone.display}
                  </ButtonLink>
                  <ButtonLink href="/contact" variant="outline" size="md">
                    Office details
                  </ButtonLink>
                </div>
              </div>

              <div className="w-full max-w-[520px]">
                <QuoteRequestForm source="coverages-hub" />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

function CoverageLinkRow({ title, description, href, icon }: CoverageLink) {
  return (
    <Link
      href={href}
      className="group flex items-start justify-between gap-4 rounded-2xl border border-accent/15 bg-background px-5 py-4 shadow-sm shadow-black/5 transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60"
    >
      <div className="flex min-w-0 items-start gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-accent/10 bg-surface/70">
          {icon}
        </span>
        <div className="min-w-0">
          <div className="text-balance font-serif text-[22px] leading-tight tracking-[-0.03em] text-foreground">
            {title}
          </div>
          <div className="mt-1 text-sm leading-6 text-foreground/70">{description}</div>
        </div>
      </div>

      <ArrowRight className="mt-1 size-5 shrink-0 text-accent transition-transform group-hover:translate-x-0.5" aria-hidden />
    </Link>
  );
}

function PreviewCard({
  title,
  body,
  icon,
  href,
}: {
  title: string;
  body: string;
  icon: ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-accent/10 bg-background p-4 shadow-sm shadow-black/5 transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60"
    >
      <div className="grid size-14 place-items-center rounded-2xl bg-surface/70">{icon}</div>
      <div className="mt-4 text-sm font-semibold text-accent">{title}</div>
      <div className="mt-1 text-sm text-foreground/70">{body}</div>
      <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent">
        Learn more
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </div>
    </Link>
  );
}

