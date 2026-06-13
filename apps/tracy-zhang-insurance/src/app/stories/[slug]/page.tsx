import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@insurance-websites/domain";

import { Container } from "@/components/Container";
import { EmailButton, ScheduleButton } from "@/components/ContactActions";
import { TrackedAnchor, TrackedLink } from "@/components/marketing-events";
import { PageCTA } from "@/components/PageCTA";
import { StoryHero } from "@/components/StoryHero";
import { StoryProse } from "@/components/StoryProse";
import { buttonClasses } from "@/components/ui/button";
import { site, siteUrl } from "@/config/site";
import { getStory, getStorySlugs, stories } from "@/content/stories";
import { getRequestMarketOffice } from "@/lib/market";
import { getBreadcrumbSchema, getJsonLdGraph } from "@/lib/schema";
import { absoluteUrl, localizedAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return getStorySlugs().map((slug) => ({ slug }));
}

type StoryPageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(dateISO: string) {
  const [year, month, day] = dateISO.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat(site.locale, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(date);
}

export async function generateMetadata({
  params,
}: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) {
    return {
      title: "Story not found",
      alternates: { canonical: "/stories" },
    };
  }

  const storyUrl = `${siteUrl}/stories/${story.slug}`;
  const storyImageUrl = story.image ? absoluteUrl(story.image.src) : undefined;

  return {
    title: story.title,
    description: story.description,
    alternates: localizedAlternates(`/stories/${story.slug}`),
    openGraph: {
      type: "article",
      title: story.title,
      description: story.description,
      url: storyUrl,
      images: storyImageUrl
        ? [
            {
              url: storyImageUrl,
              alt: story.image?.alt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description: story.description,
      images: storyImageUrl ? [storyImageUrl] : undefined,
    },
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return notFound();

  const { office } = await getRequestMarketOffice();
  const dateLabel = formatDate(story.dateISO);
  const storyUrl = absoluteUrl(`/stories/${story.slug}`);
  const storyImageUrl = story.image ? absoluteUrl(story.image.src) : undefined;
  const relatedProducts = story.relatedProductIds
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is (typeof products)[number] => Boolean(product));

  const nextStory =
    stories.find((s) => s.slug !== story.slug && new Date(s.dateISO) <= new Date(story.dateISO)) ??
    stories.find((s) => s.slug !== story.slug) ??
    null;

  const articleSchema = {
    "@type": "Article",
    "@id": `${storyUrl}#article`,
    headline: story.title,
    description: story.description,
    datePublished: story.dateISO,
    dateModified: story.dateISO,
    inLanguage: "en-US",
    author: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    image: storyImageUrl ? [storyImageUrl] : undefined,
    mainEntityOfPage: storyUrl,
    about: relatedProducts.map((product) => ({
      "@type": "Service",
      name: product.title,
      url: absoluteUrl(product.href),
    })),
  };
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Insurance guidance", path: "/stories" },
    { name: story.title, path: `/stories/${story.slug}` },
  ]);

  return (
    <div className="bg-[var(--background)]">
      <StoryHero
        eyebrow="Guidance"
        title={story.title}
        subtitle={story.description}
        image={story.image}
        tags={story.tags}
        backLabel="All guidance"
        meta={
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-sm text-[var(--muted)]">{dateLabel}</span>
            <span className="text-[var(--rail-border)]" aria-hidden>/</span>
            <span className="text-sm text-[var(--muted)]">
              {story.readingMinutes} min read
            </span>
            {story.tags.length > 0 ? (
              <>
                <span className="text-[var(--rail-border)]" aria-hidden>/</span>
                <div className="flex flex-wrap gap-2">
                  {story.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-[var(--rail-border)] bg-white px-3 py-1 text-xs text-[var(--muted)] shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        }
      />

      <Container className="py-14 sm:py-16">
        <article className="grid gap-10 lg:grid-cols-[220px_minmax(0,760px)] lg:justify-center lg:items-start">
          <aside className="space-y-5 lg:sticky lg:top-28">
            <div className="rounded-lg border border-[var(--rail-border)] bg-white p-5 shadow-sm">
              <div className="text-xs font-semibold uppercase text-[var(--brand-ink)]">
                Published
              </div>
              <div className="mt-2 text-sm font-semibold text-[var(--ink)]">
                {dateLabel}
              </div>
              <div className="mt-1 text-sm text-[var(--muted)]">
                {story.readingMinutes} min read
              </div>
              {story.tags.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {story.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-[var(--rail-border)] bg-[var(--background)] px-2.5 py-1 text-xs text-[var(--muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            {relatedProducts.length > 0 ? (
              <div className="rounded-lg border border-[var(--rail-border)] bg-white p-5 shadow-sm">
                <div className="text-xs font-semibold uppercase text-[var(--brand-ink)]">
                  Coverage paths
                </div>
                <div className="mt-4 grid gap-3">
                  {relatedProducts.map((product) => (
                    <TrackedLink
                      key={product.id}
                      href={product.href}
                      eventName="product_click"
                      eventProps={{
                        source: "tracy_zhang_insurance_story_sidebar_products",
                        story: story.slug,
                        product: product.id,
                      }}
                      className="border-b border-[var(--rail-border)] pb-3 text-sm font-medium leading-5 text-[var(--ink)] last:border-b-0 last:pb-0 hover:underline underline-offset-4"
                    >
                      {product.title}
                    </TrackedLink>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>

          <div>
            <StoryProse sections={story.sections} />

            <div className="mt-14 rounded-lg border border-[#102625]/20 bg-[#102625] p-6 text-white shadow-[var(--shadow-lg)] sm:p-8">
              <div className="text-sm font-semibold text-white">
                Want help with your situation?
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/74">
                Call or text and we will give you the shortest path to a quote
                you can trust.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <TrackedAnchor
                  className={buttonClasses({
                    variant: "primary",
                    size: "md",
                    className: "bg-white text-[var(--ink)] hover:bg-white/90",
                  })}
                  href={`tel:${office.phoneE164}`}
                  eventName="phone_click"
                  eventProps={{
                    source: "tracy_zhang_insurance_story_cta",
                    story: story.slug,
                    phone: office.phoneDisplay,
                  }}
                >
                  Call {office.phoneDisplay}
                </TrackedAnchor>
                <TrackedLink
                  className={buttonClasses({
                    variant: "outline",
                    size: "md",
                    className:
                      "border-white/45 text-white hover:bg-white hover:text-[var(--ink)]",
                  })}
                  href="/contact#quote"
                  eventName="quote_click"
                  eventProps={{
                    source: "tracy_zhang_insurance_story_cta",
                    story: story.slug,
                  }}
                >
                  Request a quote
                </TrackedLink>
                <ScheduleButton
                  source="tracy_zhang_insurance_story_cta"
                  eventProps={{ story: story.slug }}
                  variant="secondary"
                  size="md"
                  className="border-white/25 bg-white/10 text-white hover:bg-white hover:text-[var(--ink)]"
                />
                <EmailButton
                  source="tracy_zhang_insurance_story_cta"
                  eventProps={{ story: story.slug }}
                  variant="ghost"
                  size="md"
                  className="text-white/82 hover:bg-white/10 hover:text-white"
                />
              </div>
            </div>
          </div>
        </article>

        <section className="mt-16 grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="rounded-lg border border-[var(--rail-border)] bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-[var(--ink)]">
              Next story
            </div>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Keep reading. Short, high-signal notes with no jargon.
            </p>
            {nextStory ? (
              <TrackedLink
                href={`/stories/${nextStory.slug}`}
                eventName="guidance_click"
                eventProps={{
                  source: "tracy_zhang_insurance_story_next",
                  story: nextStory.slug,
                  current_story: story.slug,
                }}
                className="mt-5 block border-t border-[var(--rail-border)] pt-5 text-sm text-[var(--muted)] hover:text-[var(--ink)]"
              >
                <div className="font-semibold text-[var(--ink)]">
                  {nextStory.title}
                </div>
                <div className="mt-2 leading-6">
                  {nextStory.description}
                </div>
                <div className="mt-4 font-semibold text-[var(--ink)]">
                  Read next
                </div>
              </TrackedLink>
            ) : (
              <div className="mt-4 text-sm text-[var(--muted)]">
                More stories coming soon.
              </div>
            )}
          </div>

          {relatedProducts.length > 0 ? (
            <div>
              <div className="text-sm font-semibold text-[var(--ink)]">
                Related coverage paths
              </div>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Continue with the coverage pages most closely tied to this
                guidance.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {relatedProducts.map((product) => (
                  <TrackedLink
                    key={product.id}
                    href={product.href}
                    eventName="product_click"
                    eventProps={{
                      source: "tracy_zhang_insurance_story_related_products",
                      story: story.slug,
                      product: product.id,
                    }}
                    className="rounded-lg border border-[var(--rail-border)] bg-white p-4 text-sm text-[var(--muted)] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#fbfaf4]"
                  >
                    <div className="font-semibold text-[var(--ink)]">
                      {product.title}
                    </div>
                    <div className="mt-1 leading-6">{product.description}</div>
                    <div className="mt-3 font-medium text-[var(--ink)]">
                      Open page
                    </div>
                  </TrackedLink>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      </Container>

      <PageCTA />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getJsonLdGraph([articleSchema, breadcrumbSchema])),
        }}
      />
    </div>
  );
}
