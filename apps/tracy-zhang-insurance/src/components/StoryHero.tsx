import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/Container";
import type { StoryImage } from "@/content/stories";
import { cn } from "@/lib/cn";

export function StoryHero({
  eyebrow,
  title,
  subtitle,
  meta,
  image,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  meta?: React.ReactNode;
  image?: StoryImage;
}) {
  return (
    <section className="border-b border-[var(--rail-border)] bg-[var(--background)]">
      <Container className="py-14 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase text-[var(--brand-ink)]">
              <span className="inline-block size-2 rounded-[2px] bg-[var(--brand)]" />
              {eyebrow}
            </div>
            <Link
              href="/stories"
              className={cn(
                "text-sm font-medium text-[var(--muted)] hover:text-[var(--ink)] hover:underline underline-offset-8",
              )}
            >
              Back to Stories
            </Link>
          </div>

          <h1 className="mt-8 text-pretty font-[var(--font-serif)] text-4xl font-normal leading-[1.02] text-[var(--ink)] sm:text-5xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-4 text-pretty text-base leading-7 text-[var(--muted)] sm:text-lg">
              {subtitle}
            </p>
          ) : null}
          {meta ? <div className="mt-6">{meta}</div> : null}
        </div>

        {image ? (
          <figure className="mx-auto mt-10 max-w-5xl">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(min-width: 1280px) 960px, (min-width: 768px) 86vw, 100vw"
                className="object-cover"
              />
            </div>
            {image.caption ? (
              <figcaption className="mt-3 text-center text-sm leading-6 text-slate-500">
                {image.caption}
              </figcaption>
            ) : null}
          </figure>
        ) : null}
      </Container>
    </section>
  );
}
