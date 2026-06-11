import { Container } from "@/components/Container";
import { TrackedLink } from "@/components/marketing-events";
import { getProductGuide } from "@/content/product-guidance";
import { getProductBySlug } from "@insurance-websites/domain";
import { getStory } from "@/content/stories";
import { getBreadcrumbSchema, getJsonLdGraph, getProductServiceSchema } from "@/lib/schema";
import { getProductSeo, getRelatedProducts } from "@/lib/seo";

export function ProductDecisionGuide({ product }: { product: string }) {
  const guide = getProductGuide(product);
  if (!guide) return null;

  const sourceProduct = getProductBySlug(product);
  const productSeo = getProductSeo(product);
  const relatedProducts = sourceProduct ? getRelatedProducts(sourceProduct) : [];
  const relatedStories = guide.relatedStorySlugs
    .map((slug) => getStory(slug))
    .filter((story) => Boolean(story));
  const schema =
    sourceProduct && productSeo
      ? getJsonLdGraph([
          getProductServiceSchema(productSeo, sourceProduct),
          getBreadcrumbSchema([
            { name: "Insurance products", path: "/products" },
            { name: sourceProduct.title, path: sourceProduct.href },
          ]),
        ])
      : null;

  return (
    <section className="border-y border-[var(--rail-border)] bg-[var(--background)]">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <div className="text-xs font-semibold uppercase text-[var(--brand-ink)]">
              Decision guide
            </div>
            <h2 className="mt-4 font-[var(--font-serif)] text-4xl leading-tight text-[var(--ink)]">
              What makes {guide.product.toLowerCase()} worth reviewing carefully.
            </h2>
            <p className="mt-5 text-base leading-7 text-[var(--muted)]">
              {guide.audience}
            </p>
          </div>

          <div className="grid gap-4">
            <GuideColumn
              title="What changes the quote"
              items={guide.quoteFactors}
              marker="Q"
            />
            <GuideColumn title="What to prepare" items={guide.prepare} marker="P" />
            <GuideColumn title="What to watch" items={guide.watchouts} marker="W" />
          </div>
        </div>

        {relatedProducts.length > 0 ? (
          <div className="mt-10 grid gap-3 border-t border-[var(--rail-border)] pt-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="text-sm font-semibold text-[var(--ink)]">
              Related coverage
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {relatedProducts.map((related) => (
                <TrackedLink
                  key={related.id}
                  href={related.href}
                  eventName="product_click"
                  eventProps={{
                    source: "tracy_zhang_insurance_product_related",
                    product,
                    related_product: related.id,
                  }}
                  className="group border border-[var(--rail-border)] bg-[var(--surface)] p-4 text-sm transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-sm)]"
                >
                  <div className="font-semibold text-[var(--ink)]">
                    {related.title}
                  </div>
                  <p className="mt-1 leading-6 text-[var(--muted)]">
                    {related.description}
                  </p>
                  <div className="mt-4 font-semibold text-[var(--brand-ink)]">
                    Open{" "}
                    <span className="inline-block transition group-hover:translate-x-0.5">
                      →
                    </span>
                  </div>
                </TrackedLink>
              ))}
            </div>
          </div>
        ) : null}

        {relatedStories.length > 0 ? (
          <div className="mt-10 grid gap-3 border-t border-[var(--rail-border)] pt-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="text-sm font-semibold text-[var(--ink)]">
              Related guidance
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {relatedStories.map((story) =>
                story ? (
                  <TrackedLink
                    key={story.slug}
                    href={`/stories/${story.slug}`}
                    eventName="guidance_click"
                    eventProps={{
                      source: "tracy_zhang_insurance_product_decision_guide",
                      product,
                      story: story.slug,
                    }}
                    className="group border border-[var(--rail-border)] bg-[var(--surface)] p-4 text-sm transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-sm)]"
                  >
                    <div className="font-semibold text-[var(--ink)]">
                      {story.title}
                    </div>
                    <p className="mt-1 leading-6 text-[var(--muted)]">
                      {story.description}
                    </p>
                    <div className="mt-4 font-semibold text-[var(--brand-ink)]">
                      Read{" "}
                      <span className="inline-block transition group-hover:translate-x-0.5">
                        →
                      </span>
                    </div>
                  </TrackedLink>
                ) : null,
              )}
            </div>
          </div>
        ) : null}
      </Container>
      {schema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ) : null}
    </section>
  );
}

function GuideColumn({
  title,
  items,
  marker,
}: {
  title: string;
  items: string[];
  marker: string;
}) {
  return (
    <div className="border border-[var(--rail-border)] bg-[var(--surface)] p-5">
      <div className="flex items-center gap-3">
        <span className="grid size-9 place-items-center border border-[var(--ink)] bg-[var(--background)] font-[var(--font-mono)] text-xs font-semibold text-[var(--ink)]">
          {marker}
        </span>
        <h3 className="text-lg font-semibold text-[var(--ink)]">{title}</h3>
      </div>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-[var(--muted)]">
            <span className="mt-2 size-1.5 shrink-0 bg-[var(--brand)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
