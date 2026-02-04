import { ButtonLink } from "@/components/ui/button";

export function ValueCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-accent/15 bg-background p-7 shadow-sm shadow-black/5">
      <div className="text-lg font-semibold tracking-tight text-accent">{title}</div>
      <p className="mt-3 text-sm leading-7 text-foreground/75">{body}</p>
    </div>
  );
}

export function ProcessCard({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-accent/15 bg-background p-7 shadow-sm shadow-black/5">
      <div className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">{number}</div>
      <div className="mt-3 text-lg font-semibold tracking-tight text-accent">{title}</div>
      <p className="mt-3 text-sm leading-7 text-foreground/75">{body}</p>
    </div>
  );
}

export function SavingsCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-accent/10 bg-surface/70 p-6 shadow-sm shadow-black/5">
      <div className="text-sm font-semibold text-accent">{title}</div>
      <div className="mt-2 text-sm leading-7 text-foreground/75">{body}</div>
    </div>
  );
}

export function RelatedCard({ title, body, href }: { title: string; body: string; href: string }) {
  return (
    <div className="flex flex-col justify-between gap-6 rounded-3xl border border-accent/15 bg-surface p-7 shadow-sm shadow-black/5">
      <div>
        <div className="text-xl font-semibold tracking-tight text-accent">{title}</div>
        <p className="mt-3 text-sm leading-7 text-foreground/75">{body}</p>
      </div>
      <ButtonLink href={href} variant="primary" size="md">
        Learn more
      </ButtonLink>
    </div>
  );
}
