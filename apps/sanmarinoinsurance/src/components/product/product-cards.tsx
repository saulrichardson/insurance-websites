import { ButtonLink } from "@/components/ui/button";

export function ValueCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-foreground/20 bg-background/30 p-7">
      <div className="text-lg font-semibold tracking-tight text-foreground">{title}</div>
      <p className="mt-3 text-sm leading-7 text-foreground/75">{body}</p>
    </div>
  );
}

export function ProcessCard({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <div className="border border-foreground/20 bg-background/30 p-7">
      <div className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">{number}</div>
      <div className="mt-3 text-lg font-semibold tracking-tight text-foreground">{title}</div>
      <p className="mt-3 text-sm leading-7 text-foreground/75">{body}</p>
    </div>
  );
}

export function SavingsCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-foreground/20 bg-background/35 p-6">
      <div className="text-sm font-semibold text-foreground">{title}</div>
      <div className="mt-2 text-sm leading-7 text-foreground/75">{body}</div>
    </div>
  );
}

export function RelatedCard({ title, body, href }: { title: string; body: string; href: string }) {
  return (
    <div className="flex flex-col justify-between gap-6 border border-foreground/20 bg-surface/60 p-7">
      <div>
        <div className="text-xl font-semibold tracking-tight text-foreground">{title}</div>
        <p className="mt-3 text-sm leading-7 text-foreground/75">{body}</p>
      </div>
      <ButtonLink href={href} variant="primary" size="md">
        Learn more
      </ButtonLink>
    </div>
  );
}

