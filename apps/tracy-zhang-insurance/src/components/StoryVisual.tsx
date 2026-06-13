import Image from "next/image";

import type { StoryImage } from "@/content/stories";
import { cn } from "@/lib/cn";

export function StoryVisual({
  image,
  title,
  tags = [],
  priority = false,
  locale = "en",
  className,
}: {
  image?: StoryImage;
  title: string;
  tags?: string[];
  priority?: boolean;
  locale?: "en" | "zh";
  className?: string;
}) {
  if (image) {
    return (
      <figure
        className={cn(
          "overflow-hidden rounded-lg border border-[var(--rail-border)] bg-white shadow-[var(--shadow-lg)]",
          className,
        )}
      >
        <div className="relative aspect-[16/10] min-h-[210px] sm:min-h-[260px]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 520px, (min-width: 768px) 42vw, 100vw"
            className="object-cover"
          />
        </div>
        {image.caption ? (
          <figcaption className="border-t border-[var(--rail-border)] bg-white px-4 py-3 text-xs leading-5 text-[var(--muted)]">
            {image.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  const initial = getInitial(title, locale);
  const primaryTag = tags[0] ?? (locale === "zh" ? "保险指南" : "Guidance");
  const secondaryTag =
    tags.find((tag) => tag !== primaryTag) ??
    (locale === "zh" ? "加州保险" : "California insurance");
  const fallbackLabel =
    locale === "zh" ? `${title}视觉摘要` : `${title} visual summary`;

  return (
    <div
      className={cn(
        "relative min-h-[300px] overflow-hidden rounded-lg border border-[#082628]/20 bg-[#102625] text-white shadow-[var(--shadow-lg)]",
        className,
      )}
      role="img"
      aria-label={fallbackLabel}
    >
      <div
        className="absolute inset-0 opacity-95"
        style={{
          background:
            "linear-gradient(135deg, #102625 0%, #173f47 46%, #d8664f 100%)",
        }}
      />
      <div className="absolute inset-0 opacity-[0.16] rail-grid" />
      <div className="absolute -right-20 top-10 h-56 w-56 rotate-12 border border-white/18" />
      <div className="absolute bottom-10 left-7 h-28 w-28 border border-white/14" />

      <div className="relative grid h-full min-h-[300px] content-between p-6 sm:p-7">
        <div className="flex items-start justify-between gap-5">
          <div className="text-xs font-semibold uppercase text-white/72">
            {primaryTag}
          </div>
          <div className="border border-white/18 px-3 py-1 text-xs font-semibold text-white/78">
            {locale === "zh" ? "指南" : "Journal"}
          </div>
        </div>

        <div>
          <div className="font-serif text-[6rem] font-normal leading-none text-white sm:text-[7rem]">
            {initial}
          </div>
          <div className="mt-5 max-w-sm text-balance text-2xl font-semibold leading-tight text-white">
            {title}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {[primaryTag, secondaryTag].map((tag) => (
            <span
              key={tag}
              className="border border-white/18 bg-white/10 px-3 py-1 text-xs font-medium text-white/82"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function getInitial(title: string, locale: "en" | "zh") {
  const trimmed = title.trim();
  if (!trimmed) return "TZ";

  if (locale === "zh") return Array.from(trimmed).slice(0, 2).join("");

  const words = trimmed.split(/\s+/).filter(Boolean);
  const letters = words.slice(0, 2).map((word) => Array.from(word)[0] ?? "");
  return letters.join("").toUpperCase() || "TZ";
}
