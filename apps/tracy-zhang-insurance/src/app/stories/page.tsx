import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "@/components/Container";
import { TrackedLink } from "@/components/marketing-events";
import { PageCTA } from "@/components/PageCTA";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/ui/Card";
import { site } from "@/config/site";
import { stories } from "@/content/stories";

export const metadata: Metadata = {
  title: "Insurance Guidance",
  description:
    "Short insurance guidance notes from Tracy Zhang Insurance: coverage clarity, California-specific realities, and a calmer way to shop.",
  alternates: { canonical: "/stories" },
};

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
  return (
    <div className="bg-[var(--background)]">
      <PageHero
        eyebrow="Guidance"
        title="Notes for clearer insurance decisions"
        subtitle="Short narratives about coverage decisions, California realities, and a calmer way to buy insurance."
      />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-4 lg:grid-cols-3">
          {stories.map((story) => (
            <TrackedLink
              key={story.slug}
              href={`/stories/${story.slug}`}
              eventName="guidance_click"
              eventProps={{
                source: "tracy_zhang_insurance_stories_index",
                story: story.slug,
              }}
              className="group rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              <Card className="h-full overflow-hidden p-0 transition group-hover:-translate-y-0.5 group-hover:shadow-[0_18px_55px_rgba(15,23,42,0.10)]">
                {story.image ? (
                  <div className="relative aspect-[16/10] border-b border-slate-200 bg-slate-100">
                    <Image
                      src={story.image.src}
                      alt={story.image.alt}
                      fill
                      sizes="(min-width: 1024px) 31vw, (min-width: 768px) 45vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                ) : null}
                <div className="p-7">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                    <span>{formatDate(story.dateISO)}</span>
                    <span className="text-slate-300">•</span>
                    <span>{story.readingMinutes} min read</span>
                  </div>
                  <div className="mt-4 text-lg font-semibold tracking-tight text-slate-950">
                    {story.title}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {story.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {story.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-950">
                    Read story <span className="transition group-hover:translate-x-0.5">→</span>
                  </div>
                </div>
              </Card>
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
