import { Container } from "@/components/Container";
import { TrackedLink } from "@/components/marketing-events";
import { PageCTA } from "@/components/PageCTA";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/ui/Card";
import { site } from "@/config/site";
import { stories } from "@/content/stories";
import { getRouteMetadata } from "@/lib/seo";

export const metadata = getRouteMetadata("/products");

export default function ProductsPage() {
  return (
    <div className="bg-white">
      <PageHero
        eyebrow="Insurance products"
        title="Coverage options for the things you drive, own, rent, run, and plan for"
        subtitle="Start with the product you need. We will explain the tradeoffs that change protection, not just price."
      />

      <Container className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base leading-7 text-slate-600 sm:text-lg">
            {site.carrierNotes}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.offerings.map((offering) => (
            <TrackedLink
              key={offering.href}
              href={offering.href}
              eventName="product_click"
              eventProps={{
                source: "tracy_zhang_insurance_products_grid",
                product: offering.title,
                destination: offering.href,
              }}
              className="group rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <Card className="h-full p-7 transition group-hover:-translate-y-0.5 group-hover:shadow-[0_18px_55px_rgba(15,23,42,0.10)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-base font-semibold text-slate-950">
                      {offering.title}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {offering.description}
                    </p>
                  </div>
                  <span className="mt-1 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-slate-700">
                    →
                  </span>
                </div>
              </Card>
            </TrackedLink>
          ))}

          <TrackedLink
            href="/contact#quote"
            eventName="quote_click"
            eventProps={{ source: "tracy_zhang_insurance_products_grid_unsure" }}
            className="group rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:col-span-2 lg:col-span-1"
          >
            <div className="h-full rounded-2xl bg-slate-950 p-7 shadow-[0_1px_0_rgba(15,23,42,0.14)] transition group-hover:-translate-y-0.5 group-hover:shadow-[0_18px_55px_rgba(15,23,42,0.22)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-base font-semibold text-white">
                    Not sure where to start?
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    Tell us what changed or what you need covered and we will
                    point the conversation in the right direction.
                  </p>
                </div>
                <span className="mt-1 text-white/60 transition group-hover:translate-x-0.5">
                  →
                </span>
              </div>
            </div>
          </TrackedLink>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          <Card className="p-7">
            <div className="text-base font-semibold text-slate-950">
              Common add-ons and reviews
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Many policies work better when reviewed alongside related
              coverage, limits, and everyday risk.
            </p>
            <div className="mt-5 grid gap-3">
              {[
                {
                  title: "Umbrella",
                  body: "Extra liability protection when home, auto, assets, or contracts call for higher limits.",
                },
                {
                  title: "Life",
                  body: "A practical review when family, income, mortgage, or long-term plans change.",
                },
                {
                  title: "Certificates and specialty markets",
                  body: "Business proof of coverage, hard-to-place property, and California-specific risk conversations.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-950">
                    {item.title}
                  </div>
                  <div className="mt-1 text-sm leading-6 text-slate-600">
                    {item.body}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-7">
            <div className="text-base font-semibold text-slate-950">
              What we ask for (and why)
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              We keep quoting focused. We ask for details that change
              eligibility, pricing, or coverage outcome.
            </p>
            <div className="mt-5 grid gap-3">
              {[
                "For auto: drivers and vehicle details",
                "For property: address, occupancy, and current policy if available",
                "For life: family and planning context",
                "For business: operations and any certificate requirements",
                "For any review: current declarations pages help us compare accurately",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white/70 p-4 shadow-sm"
                >
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-[var(--brand)]" />
                  <span className="text-sm leading-6 text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="mt-14 border border-[var(--rail-border)] bg-[var(--background)] p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <div className="text-xs font-semibold uppercase text-[var(--brand-ink)]">
                Decision notes
              </div>
              <h2 className="mt-4 font-[var(--font-serif)] text-4xl leading-tight text-[var(--ink)]">
                Start with the question, then choose the policy.
              </h2>
              <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                These short guides explain the situations that usually make a
                quote easier, harder, or more important to review carefully.
              </p>
            </div>

            <div className="grid gap-3">
              {stories.slice(0, 4).map((story) => (
                <TrackedLink
                  key={story.slug}
                  href={`/stories/${story.slug}`}
                  eventName="guidance_click"
                  eventProps={{
                    source: "tracy_zhang_insurance_products_guidance",
                    story: story.slug,
                  }}
                  className="group grid gap-3 border border-[var(--rail-border)] bg-[var(--surface)] p-4 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-sm)] sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <div>
                    <div className="text-sm font-semibold text-[var(--ink)]">
                      {story.title}
                    </div>
                    <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                      {story.description}
                    </p>
                  </div>
                  <div className="text-sm font-semibold text-[var(--brand-ink)]">
                    Read{" "}
                    <span className="inline-block transition group-hover:translate-x-0.5">
                      →
                    </span>
                  </div>
                </TrackedLink>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <PageCTA
        title="Get started"
        body="Call, text, or request a quote online. We’ll respond quickly and help you compare options."
      />
    </div>
  );
}
