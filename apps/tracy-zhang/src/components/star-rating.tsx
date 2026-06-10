import type { CSSProperties } from "react";

type StarRatingProps = {
  rating: number;
  outOf?: number;
  className?: string;
};

export function StarRating({ rating, outOf = 5, className = "" }: StarRatingProps) {
  const safe = Number.isFinite(rating) ? Math.max(0, Math.min(outOf, rating)) : 0;
  const widthPercent = `${(safe / outOf) * 100}%`;

  return (
    <span className={["inline-flex items-center gap-2", className].join(" ")}>
      <span className="relative inline-block leading-none text-foreground/25">
        <span aria-hidden className="tracking-[0.15em]">
          ★★★★★
        </span>
        <span
          aria-hidden
          className="absolute left-0 top-0 overflow-hidden whitespace-nowrap text-amber-300"
          style={{ width: widthPercent } as CSSProperties}
        >
          <span className="tracking-[0.15em]">★★★★★</span>
        </span>
        <span className="sr-only">
          {safe} out of {outOf} stars
        </span>
      </span>
      <span className="text-sm text-muted">{safe.toFixed(1)}</span>
    </span>
  );
}
