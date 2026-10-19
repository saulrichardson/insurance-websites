import { cn } from "@/lib/cn";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("agency-container mx-auto w-full", className)}>
      {children}
    </div>
  );
}

