import { cn } from "@/lib/cn";

function Label({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1 text-xs font-semibold tracking-[0.18em] text-slate-800 shadow-sm",
        className,
      )}
    >
      <span className="inline-block size-2 rounded-[2px] bg-[var(--brand)]" />
      {text}
    </span>
  );
}

export function ConnectDiagram({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative mx-auto aspect-[6/5] w-full max-w-[520px]",
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 600 500"
        className="h-full w-full"
        role="img"
        aria-label=""
      >
        <defs>
          <style>{`
            .stroke { stroke: var(--brand); stroke-width: 2.5; fill: none; }
            .dash { stroke-dasharray: 7 7; }
          `}</style>
        </defs>

        <path className="stroke" d="M132 110 C 250 10, 420 10, 510 120" />
        <path className="stroke" d="M110 200 C 220 130, 380 120, 520 210" />
        <path className="stroke" d="M130 360 C 260 470, 430 470, 520 330" />
        <path className="stroke dash" d="M165 95 L 165 405" />
        <path className="stroke dash" d="M300 60 L 300 445" />
        <path className="stroke dash" d="M435 95 L 435 405" />

        <circle cx="300" cy="250" r="170" className="stroke" />
        <circle cx="300" cy="250" r="110" className="stroke dash" />
      </svg>

      <div className="absolute left-2 top-6">
        <Label text="HOME" />
      </div>
      <div className="absolute right-2 top-16">
        <Label text="AUTO" />
      </div>
      <div className="absolute right-14 bottom-10">
        <Label text="BUSINESS" />
      </div>
      <div className="absolute left-10 bottom-8">
        <Label text="LIFE" />
      </div>
      <div className="absolute left-24 top-1/2 -translate-y-1/2">
        <Label text="FAIR PLAN" className="bg-[var(--surface)]" />
      </div>
    </div>
  );
}

