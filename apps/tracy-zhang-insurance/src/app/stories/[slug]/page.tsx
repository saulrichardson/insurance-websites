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
        eyebrow="Story"
        title={story.title}
        subtitle={story.description}
        image={story.image}
        meta={
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-sm text-slate-600">{dateLabel}</span>
            <span className="text-slate-300">•</span>
            <span className="text-sm text-slate-600">
              {story.readingMinutes} min read
            </span>
            {story.tags.length > 0 ? (
              <>
                <span className="text-slate-300">•</span>
                <div className="flex flex-wrap gap-2">
                  {story.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 shadow-sm"
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
        <article className="mx-auto max-w-3xl">
          <StoryProse sections={story.sections} />

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-slate-950">
                Want help with your situation?
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Call or text and we’ll give you the shortest path to a quote
                you can trust.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <TrackedAnchor
                  className={buttonClasses({ variant: "primary", size: "md" })}
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
                  className={buttonClasses({ variant: "outline", size: "md" })}
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
                />
                <EmailButton
                  source="tracy_zhang_insurance_story_cta"
                  eventProps={{ story: story.slug }}
                  variant="ghost"
                  size="md"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-slate-950">
                Next story
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
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
                  className="mt-4 block rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <div className="font-semibold text-slate-950">
                    {nextStory.title}
                  </div>
                  <div className="mt-1 text-slate-600">
                    {nextStory.description}
                  </div>
                  <div className="mt-3 font-medium text-slate-950">
                    Read next →
                  </div>
                </TrackedLink>
              ) : (
                <div className="mt-4 text-sm text-slate-600">
                  More stories coming soon.
                </div>
              )}
            </div>
          </div>

          {relatedProducts.length > 0 ? (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-slate-950">
                Related coverage paths
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
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
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-white"
                  >
                    <div className="font-semibold text-slate-950">
                      {product.title}
                    </div>
                    <div className="mt-1 leading-6">{product.description}</div>
                    <div className="mt-3 font-medium text-slate-950">
                      Open page →
                    </div>
                  </TrackedLink>
                ))}
              </div>
            </div>
          ) : null}
        </article>
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
