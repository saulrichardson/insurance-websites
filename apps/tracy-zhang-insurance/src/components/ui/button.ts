import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[5px] font-medium whitespace-normal text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)]/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--brand)] text-white hover:bg-[var(--brand-strong)] active:bg-[var(--brand-strong)]",
  secondary:
    "bg-[var(--surface)] text-[var(--ink)] shadow-sm hover:bg-white active:bg-[var(--surface-muted)] border border-[var(--rail-border)]",
  outline:
    "border border-[var(--ink)]/60 bg-transparent text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white active:bg-[var(--ink-strong)]",
  ghost: "bg-transparent text-[var(--muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--ink)]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-11 px-4 text-sm",
  md: "min-h-12 px-5 text-sm",
  lg: "min-h-14 px-6 text-base",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return cn(base, variants[variant], sizes[size], className);
}
