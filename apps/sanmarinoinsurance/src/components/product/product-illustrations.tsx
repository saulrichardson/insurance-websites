import type { ComponentPropsWithoutRef } from "react";

type IllustrationProps = ComponentPropsWithoutRef<"svg"> & {
  className?: string;
};

export function AutoIllustration({ className = "", ...props }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 360 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      {...props}
    >
      <path
        d="M66 124c8-19 22-36 40-48 17-11 38-18 60-18h26c23 0 44 7 61 19 18 12 32 29 40 47l9 20H57l9-20Z"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path d="M48 144h264" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
      <path d="M84 144v18h-22c-8 0-14-6-14-14v-4h36Z" stroke="currentColor" strokeWidth="3" />
      <path d="M276 144v18h22c8 0 14-6 14-14v-4h-36Z" stroke="currentColor" strokeWidth="3" />
      <circle cx="104" cy="162" r="18" stroke="currentColor" strokeWidth="3" />
      <circle cx="256" cy="162" r="18" stroke="currentColor" strokeWidth="3" />
      <path
        d="M120 92h116c10 0 18 8 18 18v14H102v-14c0-10 8-18 18-18Z"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path d="M74 92h38" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
      <path d="M248 92h38" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
      <path d="M52 178h256" stroke="currentColor" strokeWidth="3" strokeLinecap="square" opacity="0.35" />
      <path d="M72 178h36" stroke="currentColor" strokeWidth="3" strokeLinecap="square" opacity="0.35" />
      <path d="M252 178h36" stroke="currentColor" strokeWidth="3" strokeLinecap="square" opacity="0.35" />
    </svg>
  );
}

export function HomeIllustration({ className = "", ...props }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 360 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      {...props}
    >
      <path
        d="M66 98 180 28l114 70"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M90 92v90h180V92"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M156 182v-56h48v56" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M120 116h30v26h-30v-26Z" stroke="currentColor" strokeWidth="3" />
      <path d="M210 116h30v26h-30v-26Z" stroke="currentColor" strokeWidth="3" />
      <path d="M68 182h224" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
      <path d="M42 182h20" stroke="currentColor" strokeWidth="3" strokeLinecap="square" opacity="0.35" />
      <path d="M300 182h20" stroke="currentColor" strokeWidth="3" strokeLinecap="square" opacity="0.35" />
      <path
        d="M254 46c0-8 6-14 14-14s14 6 14 14-6 14-14 14-14-6-14-14Z"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.65"
      />
      <path d="M268 60v12" stroke="currentColor" strokeWidth="3" opacity="0.35" />
      <path d="M268 20v12" stroke="currentColor" strokeWidth="3" opacity="0.35" />
      <path d="M248 46h-12" stroke="currentColor" strokeWidth="3" opacity="0.35" />
      <path d="M300 46h-12" stroke="currentColor" strokeWidth="3" opacity="0.35" />
    </svg>
  );
}

