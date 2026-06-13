import Image from "next/image";

import { cn } from "@/lib/cn";
import type { StorySection } from "@/content/stories";

export function StoryProse({
  sections,
  className,
}: {
  sections: StorySection[];
  className?: string;
}) {
  return (
    <div className={cn("space-y-7", className)}>
      {sections.map((section, index) => {
        const key = `${section.type}-${index}`;
        switch (section.type) {
          case "h2":
            return (
              <h2
                key={key}
                className="pt-6 font-serif text-3xl font-normal leading-tight text-[var(--ink)]"
              >
                {section.text}
              </h2>
            );
          case "p":
            return (
              <p key={key} className="text-[17px] leading-8 text-[var(--muted)]">
                {section.text}
              </p>
            );
          case "ul":
            return (
              <ul
                key={key}
                className="grid gap-3 rounded-lg border border-[var(--rail-border)] bg-white p-6 text-base text-[var(--muted)] shadow-sm"
              >
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-[var(--brand)]" />
                    <span className="leading-7">{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <figure
                key={key}
                className="rounded-lg border border-[var(--rail-border)] bg-white p-6 shadow-sm"
              >
                <div className="h-1 w-12 rounded-full bg-[var(--brand)]" />
                <blockquote className="mt-4 text-[17px] leading-8 text-[var(--ink)]">
                  &ldquo;{section.text}&rdquo;
                </blockquote>
                {section.attribution ? (
                  <figcaption className="mt-3 text-sm text-[var(--muted)]">
                    - {section.attribution}
                  </figcaption>
                ) : null}
              </figure>
            );
          case "image":
            return (
              <figure key={key} className="py-4">
                <div className="relative aspect-[3/2] overflow-hidden rounded-lg border border-[var(--rail-border)] bg-white shadow-[0_18px_60px_rgba(15,23,42,0.10)]">
                  <Image
                    src={section.image.src}
                    alt={section.image.alt}
                    fill
                    sizes="(min-width: 1024px) 720px, 100vw"
                    className="object-cover"
                  />
                </div>
                {section.image.caption ? (
                  <figcaption className="mt-3 text-center text-sm leading-6 text-[var(--muted)]">
                    {section.image.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
