import { Container } from "@/components/Container";
import { TrackedLink } from "@/components/marketing-events";
import { PageCTA } from "@/components/PageCTA";
import { StoryVisual } from "@/components/StoryVisual";
import { site } from "@/config/site";
import { stories } from "@/content/stories";
import { getRouteMetadata } from "@/lib/seo";

export const metadata = getRouteMetadata("/stories");

function formatDate(dateISO: string) {
  const [year, month, day] = dateISO.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat(site.locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
}

export default function StoriesPage() {
  const [featuredStory, ...archiveStories] = stories;
  const topics = Array.from(new Set(stories.flatMap((story) => story.tags))).slice(0, 8);

  return (
    <div className="bg-[var(--background)]">
      <section className="border-b border-[var(--rail-border)] bg-[#fbfaf4]">
        <Container className="py-14 sm:py-18 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.78fr)] lg:items-end">
            <div>
              <div className="flex items-center gap-3 text-xs font-semibold uppercase text-[var(--brand-ink)]">
                <span className="inline-block size-2 rounded-[2px] bg-[var(--brand)]" />
                Guidance journal
              </div>
              <h1 className="mt-7 max-w-4xl text-pretty font-serif text-5xl font-normal leading-[0.98] text-[var(--ink)] sm:text-6xl lg:text-7xl">
                Clearer insurance decisions, organized by the real problem.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
                Short, practical notes for California renewals, FAIR Plan
                decisions, quote comparisons, coverage gaps, and moments where
                the next step should feel less rushed.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-lg border border-[var(--rail-border)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--muted)]"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {featuredStory ? (
              <TrackedLink
                href={`/stories/${featuredStory.slug}`}
                eventName="guidance_click"
                eventProps={{
                  source: "tracy_zhang_insurance_stories_featured",
                  story: featuredStory.slug,
                }}
                className="group block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)]/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fbfaf4]"
              >
                <StoryVisual
                  image={featuredStory.image}
                  title={featuredStory.title}
                  tags={featuredStory.tags}
                  priority
                  className="transition duration-300 group-hover:-translate-y-1"
                />
                <div className="mt-5 border-t border-[var(--rail-border)] pt-5">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--muted)]">
                    <span>Featured note</span>
                    <span aria-hidden>/</span>
                    <span>{formatDate(featuredStory.dateISO)}</span>
                    <span aria-hidden>/</span>
                    <span>{featuredStory.readingMinutes} min read</span>
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold leading-tight text-[var(--ink)]">
                    {featuredStory.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                    {featuredStory.description}
                  </p>
                  <div className="mt-5 text-sm font-semibold text-[var(--ink)]">
                    Read the guide
                  </div>
                </div>
              </TrackedLink>
            ) : null}
          </div>
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <div className="flex flex-col gap-4 border-b border-[var(--rail-border)] pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase text-[var(--brand-ink)]">
              All guidance
            </div>
            <h2 className="mt-3 font-serif text-4xl font-normal leading-tight text-[var(--ink)] sm:text-5xl">
              Recent notes
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[var(--muted)]">
            The archive is intentionally compact: scan the issue, open the
            strongest match, then move to a quote or call path when the decision
            is ready.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {archiveStories.map((story) => (
            <TrackedLink
              key={story.slug}
              href={`/stories/${story.slug}`}
              eventName="guidance_click"
              eventProps={{
                source: "tracy_zhang_insurance_stories_index",
                story: story.slug,
              }}
              className="group flex h-full flex-col rounded-lg border border-[var(--rail-border)] bg-[var(--surface)] shadow-[var(--shadow-sm)] outline-none transition hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(15,23,42,0.10)] focus-visible:ring-2 focus-visible:ring-[var(--ink)]/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              <StoryVisual
                image={story.image}
                title={story.title}
                tags={story.tags}
                className="min-h-[210px] rounded-b-none border-0 shadow-none"
              />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--muted)]">
                  <span>{formatDate(story.dateISO)}</span>
                  <span aria-hidden>/</span>
                  <span>{story.readingMinutes} min read</span>
                </div>
                <div className="mt-4 text-lg font-semibold leading-snug text-[var(--ink)]">
                  {story.title}
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  {story.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {story.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-[var(--rail-border)] bg-white px-3 py-1 text-xs text-[var(--muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-auto pt-6 text-sm font-semibold text-[var(--ink)]">
                  Read story
                </div>
              </div>
            </TrackedLink>
          ))}
        </div>
      </Container>

      <PageCTA
        title="Want the simple version?"
        body="Call, text, or request a quote online. We’ll ask only what we need, then bring options you can compare."
      />
    </div>
  );
}
