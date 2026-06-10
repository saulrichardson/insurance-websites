import { cn } from "@/lib/cn";

export function HeroPanel({
  title,
  subtitle,
  leftFootnote,
  items,
  className,
}: {
  title: string;
  subtitle: string;
  leftFootnote?: string;
  items: Array<{ label: string; value: string }>;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.10)]",
        className,
      )}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(16,185,129,0.18),transparent_42%),radial-gradient(circle_at_85%_0%,rgba(2,132,199,0.14),transparent_40%)]" />
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] [background-size:64px_64px]" />
        <svg
          className="absolute -right-24 -top-24 h-[380px] w-[380px] opacity-55"
          viewBox="0 0 400 400"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(16,185,129,0.9)" />
              <stop offset="60%" stopColor="rgba(14,165,233,0.7)" />
              <stop offset="100%" stopColor="rgba(15,23,42,0.45)" />
            </linearGradient>
            <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="18" />
            </filter>
          </defs>
          <g filter="url(#blur)">
            <circle cx="210" cy="180" r="130" fill="url(#grad)" />
            <circle cx="150" cy="250" r="85" fill="rgba(255,255,255,0.75)" />
          </g>
        </svg>
      </div>

      <div className="relative grid gap-8 p-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="space-y-3">
          <div className="text-sm font-semibold text-slate-950">{title}</div>
          <p className="text-sm leading-6 text-slate-600">{subtitle}</p>
          {leftFootnote ? (
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 text-sm leading-6 text-slate-600 shadow-sm">
              {leftFootnote}
            </div>
          ) : null}
        </div>

        <div className="grid gap-3">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm"
            >
              <div className="text-sm font-semibold text-slate-950">
                {item.label}
              </div>
              <div className="text-sm text-slate-600">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
