import Link from "next/link";

import { Container } from "@/components/Container";
import { StoryVisual } from "@/components/StoryVisual";
import type { StoryImage } from "@/content/stories";
import { cn } from "@/lib/cn";

export function StoryHero({
  eyebrow,
  title,
  subtitle,
  meta,
  image,
  tags = [],
  locale = "en",
  backHref = "/stories",
  backLabel = "Back to guidance",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  meta?: React.ReactNode;
  image?: StoryImage;
  tags?: string[];
  locale?: "en" | "zh";
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <section className="border-b border-[var(--rail-border)] bg-[#fbfaf4]">
      <Container className="py-12 sm:py-16 lg:py-18">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.98fr)_minmax(320px,0.72fr)] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <div className="flex items-center gap-3 text-xs font-semibold uppercase text-[var(--brand-ink)]">
                <span className="inline-block size-2 rounded-[2px] bg-[var(--brand)]" />
                {eyebrow}
              </div>
              <Link
                href={backHref}
                className={cn(
                  "text-sm font-medium text-[var(--muted)] hover:text-[var(--ink)] hover:underline underline-offset-8",
                )}
              >
                {backLabel}
              </Link>
            </div>

            <h1
              className={cn(
                "mt-8 text-pretty font-[var(--font-serif)] text-5xl font-normal leading-[0.98] text-[var(--ink)] sm:text-6xl",
                locale === "zh" ? "lg:text-6xl" : "lg:text-7xl",
              )}
            >
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-[var(--muted)]">
                {subtitle}
              </p>
            ) : null}
            {meta ? <div className="mt-7">{meta}</div> : null}
          </div>

          <StoryVisual
            image={image}
            title={title}
            tags={tags}
            locale={locale}
            priority
            className="lg:min-h-[430px]"
          />
        </div>
      </Container>
    </section>
  );
}
