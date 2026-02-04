import { Phone } from "lucide-react";
import { site } from "@/lib/site";

type ProductStickyCtaProps = {
  quoteHref?: string;
  quoteLabel?: string;
};

export function ProductStickyCta({
  quoteHref = "#quote",
  quoteLabel = "Request a quote",
}: ProductStickyCtaProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 pb-[max(env(safe-area-inset-bottom),12px)] md:inset-x-auto md:bottom-6 md:right-6 md:pb-0">
      <div className="pointer-events-auto mx-auto w-full max-w-[760px] px-4 md:mx-0 md:w-[360px] md:px-0">
        <div className="flex items-stretch gap-3 rounded-3xl border border-accent/15 bg-surface/70 p-3 shadow-sm shadow-black/5 backdrop-blur-sm md:flex-col md:p-4">
          <a
            href={`tel:${site.agent.phone.e164}`}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-accent bg-accent px-5 text-sm font-medium text-accent-foreground shadow-sm shadow-black/10 transition-colors hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
          >
            <Phone className="size-4" aria-hidden />
            Call {site.agent.phone.display}
          </a>
          <a
            href={quoteHref}
            className="inline-flex h-12 flex-1 items-center justify-center rounded-full border border-accent/35 bg-transparent px-5 text-sm font-medium text-accent transition-colors hover:bg-accent/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
          >
            {quoteLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
