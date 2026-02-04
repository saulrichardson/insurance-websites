import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md";

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  target?: string;
  rel?: string;
  prefetch?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "target" | "rel">;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full border text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60 disabled:pointer-events-none disabled:opacity-50";

const sizes: Record<Size, string> = {
  sm: "h-10 px-5",
  md: "h-11 px-5",
};

const variants: Record<Variant, string> = {
  primary:
    "border-accent bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm shadow-black/10",
  secondary:
    "border-accent/20 bg-background/70 text-accent hover:bg-background/85",
  outline: "border-accent/35 bg-transparent text-accent hover:bg-accent/5",
  ghost: "border-transparent bg-transparent text-accent hover:bg-accent/5",
};

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  target,
  rel,
  prefetch,
  ...props
}: ButtonLinkProps) {
  const classes = [base, sizes[size], variants[variant], className].join(" ");

  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        className={classes}
        target={target ?? "_blank"}
        rel={rel ?? "noreferrer"}
        {...props}
      />
    );
  }

  return (
    <Link
      href={href}
      className={classes}
      prefetch={prefetch}
      target={target}
      rel={rel}
      {...props}
    />
  );
}
