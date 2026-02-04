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

export function RentersIllustration({ className = "", ...props }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 360 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M110 56h140v126H110V56Z" stroke="currentColor" strokeWidth="3" />
      <path d="M132 80h34v30h-34V80Z" stroke="currentColor" strokeWidth="3" />
      <path d="M194 80h34v30h-34V80Z" stroke="currentColor" strokeWidth="3" />
      <path d="M132 124h34v30h-34v-30Z" stroke="currentColor" strokeWidth="3" />
      <path d="M194 124h34v30h-34v-30Z" stroke="currentColor" strokeWidth="3" />
      <path d="M166 182v-44h28v44" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />

      <path d="M66 182h228" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />

      <path
        d="M268 120c0-10 8-18 18-18s18 8 18 18-8 18-18 18-18-8-18-18Z"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.65"
      />
      <path
        d="M286 138v30"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="square"
        opacity="0.65"
      />
      <path
        d="M286 156h26c6 0 10 4 10 10v2h-36"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.65"
      />
    </svg>
  );
}

export function LifeIllustration({ className = "", ...props }: IllustrationProps) {
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
        d="M180 28c44 0 86 18 86 18v56c0 44-36 74-86 90-50-16-86-46-86-90V46s42-18 86-18Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M180 150c-20-12-34-26-42-42-8-16 0-34 18-38 10-2 20 3 24 11 4-8 14-13 24-11 18 4 26 22 18 38-8 16-22 30-42 42Z"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.75"
        strokeLinejoin="round"
      />
      <path d="M52 182h256" stroke="currentColor" strokeWidth="3" strokeLinecap="square" opacity="0.35" />
    </svg>
  );
}

export function LongTermCareIllustration({ className = "", ...props }: IllustrationProps) {
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
        d="M112 170c0-24 20-44 44-44h48c24 0 44 20 44 44"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M148 90c0-18 14-32 32-32s32 14 32 32-14 32-32 32-32-14-32-32Z"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="M98 136c18 0 34 10 42 24"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="square"
        opacity="0.55"
      />
      <path
        d="M262 136c-18 0-34 10-42 24"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="square"
        opacity="0.55"
      />

      <path
        d="M70 182h220"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="square"
        opacity="0.35"
      />

      <path
        d="M288 62c0-8 6-14 14-14s14 6 14 14-6 14-14 14-14-6-14-14Z"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.65"
      />
      <path d="M302 76v12" stroke="currentColor" strokeWidth="3" opacity="0.35" />
      <path d="M302 36v12" stroke="currentColor" strokeWidth="3" opacity="0.35" />
      <path d="M282 62h-12" stroke="currentColor" strokeWidth="3" opacity="0.35" />
      <path d="M334 62h-12" stroke="currentColor" strokeWidth="3" opacity="0.35" />
    </svg>
  );
}

export function InvestmentsIllustration({ className = "", ...props }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 360 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M84 160V54" stroke="currentColor" strokeWidth="3" strokeLinecap="square" opacity="0.55" />
      <path d="M84 160h210" stroke="currentColor" strokeWidth="3" strokeLinecap="square" opacity="0.55" />

      <path
        d="M96 142l48-36 44 22 54-56 42 22"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M284 94v-20h-20"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="square"
      />
      <circle cx="144" cy="106" r="6" stroke="currentColor" strokeWidth="3" />
      <circle cx="188" cy="128" r="6" stroke="currentColor" strokeWidth="3" />
      <circle cx="242" cy="72" r="6" stroke="currentColor" strokeWidth="3" />

      <path d="M52 182h256" stroke="currentColor" strokeWidth="3" strokeLinecap="square" opacity="0.35" />
    </svg>
  );
}
