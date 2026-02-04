import { Car, Home as HomeIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";
import { QuoteRequestForm } from "@/components/quote-request-form";
import { ProductStickyCta } from "@/components/product/product-sticky-cta";

export const metadata = {
  title: "Products",
  description: `Auto and home insurance in ${site.agent.location}. Call ${site.agent.phone.display} for a quote or a coverage review.`,
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
      "Bundling home and auto saved us money, but the best part was understanding what we were changing and why. It finally felt straightforward.",
    by: "San Marino family",
  },
] as const;

export default function InsurancePage() {
  return (
    <main id="main" className="bg-background pb-32 md:pb-0">
      <Container className="py-14 sm:py-18 lg:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-surface/70 px-4 py-2 text-xs font-medium text-accent shadow-sm shadow-black/5">
              <span className="size-1.5 rounded-full bg-brand" aria-hidden />
              Coverage through {site.brand.legalLine}
            </div>
            <h1 className="mt-7 text-balance font-serif text-[clamp(2.5rem,5.2vw,4.25rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
              Products built for real life in {site.agent.location}.
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-foreground/75">
              We’ll help you choose coverage options that make sense for your household—and keep your policies aligned
              as things change. Expect a clear conversation, fast follow‑ups, and a plan you can actually understand.
            </p>

            <div className="mt-9">
              <ButtonLink href="/contact" variant="primary" size="md">
                Contact details
              </ButtonLink>
            </div>
          </div>

          <div className="rounded-3xl border border-accent/15 bg-surface p-6 shadow-lg shadow-black/10 sm:p-7 lg:max-w-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              What to expect
            </div>
            <ul className="mt-4 space-y-3 text-sm text-foreground/75">
              <li className="flex gap-3">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                <span>Quick coverage review and a simple next step.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                <span>Recommendations based on your situation—not pressure.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                <span>Clear explanations of limits, deductibles, and tradeoffs.</span>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <section className="bg-surface">
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
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Start with home and auto.
              </h2>
              <p className="mt-3 max-w-3xl text-pretty text-foreground/75">
                These are the two most common starting points for households in {site.agent.location}. Each page shows
                what we prioritize, what to prepare, and how we look for savings without weakening coverage.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#quote" variant="primary" size="md">
                Request a quote
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline" size="md">
                Contact details
              </ButtonLink>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <section className="rounded-3xl border border-accent/15 bg-surface p-7 shadow-sm shadow-black/5">
              <div className="flex items-start justify-between gap-6">
                <div className="flex items-start gap-3">
                  <div className="grid size-11 place-items-center rounded-2xl border border-accent/10 bg-background text-accent">
                    <HomeIcon className="size-5" aria-hidden />
                  </div>
                  <div>
                    <div className="text-xl font-semibold tracking-tight text-accent">
                      Home insurance
                    </div>
                    <div className="mt-2 text-sm text-foreground/75">
                      Align dwelling coverage to rebuild costs, protect belongings the right way, and make liability
                      decisions in plain language.
                    </div>
                  </div>
                </div>
                <div className="hidden text-xs font-medium uppercase tracking-[0.18em] text-foreground/70 sm:block">
                  {site.agent.location}
                </div>
              </div>

              <ul className="mt-6 space-y-2 text-sm text-foreground/75">
                <li className="flex gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>Rebuild‑cost alignment (so the dwelling limit isn’t guesswork).</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>Belongings + special items (replacement cost and scheduling).</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>Deductibles, liability, and real claim expectations.</span>
                </li>
              </ul>

              <div className="mt-7">
                <ButtonLink href="/insurance/home" variant="outline" size="sm">
                  Learn more
                </ButtonLink>
              </div>
            </section>

            <section className="rounded-3xl border border-accent/15 bg-surface p-7 shadow-sm shadow-black/5">
              <div className="flex items-start justify-between gap-6">
                <div className="flex items-start gap-3">
                  <div className="grid size-11 place-items-center rounded-2xl border border-accent/10 bg-background text-accent">
                    <Car className="size-5" aria-hidden />
                  </div>
                  <div>
                    <div className="text-xl font-semibold tracking-tight text-accent">
                      Auto insurance
                    </div>
                    <div className="mt-2 text-sm text-foreground/75">
                      Choose liability limits, deductibles, and add‑ons with clarity—then verify discounts so savings
                      don’t come from underinsuring.
                    </div>
                  </div>
                </div>
                <div className="hidden text-xs font-medium uppercase tracking-[0.18em] text-foreground/70 sm:block">
                  {site.agent.location}
                </div>
              </div>

              <ul className="mt-6 space-y-2 text-sm text-foreground/75">
                <li className="flex gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>Liability limits that protect your household (not just your car).</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>Comprehensive vs. collision + a deductible strategy that fits your budget.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>Discount review and bundling conversations (when it truly helps).</span>
                </li>
              </ul>

              <div className="mt-7">
                <ButtonLink href="/insurance/auto" variant="outline" size="sm">
                  Learn more
                </ButtonLink>
              </div>
            </section>
          </div>

          <section
            id="quote"
            className="mt-12 scroll-mt-40 rounded-3xl border border-accent/15 bg-surface p-7 shadow-sm shadow-black/5"
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

              <div className="w-full max-w-[520px]">
                <QuoteRequestForm source="insurance-overview" />
              </div>
            </div>
          </section>
        </Container>
      </section>

      <section className="bg-surface">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                What customers say
              </h2>
              <p className="mt-3 max-w-xl text-pretty text-foreground/75">
                People come to us for clarity, responsiveness, and coverage that stays aligned over time.
              </p>
              <div className="mt-7 rounded-3xl border border-accent/15 bg-background p-6 shadow-sm shadow-black/5">
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
                <figure key={t.by} className="rounded-3xl border border-accent/15 bg-background p-7 shadow-sm shadow-black/5">
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
