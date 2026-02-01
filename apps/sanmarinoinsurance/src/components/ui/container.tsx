import type { ComponentPropsWithoutRef } from "react";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  bleed?: boolean;
};

export function Container({ className = "", bleed = false, ...props }: ContainerProps) {
  return (
    <div
      className={[
        bleed ? "px-4 sm:px-6" : "px-4 sm:px-6 lg:px-8",
        "mx-auto w-full max-w-6xl",
        className,
      ].join(" ")}
      {...props}
    />
  );
}

