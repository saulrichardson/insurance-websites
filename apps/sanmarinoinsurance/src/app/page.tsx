import Link from "next/link";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <main id="main" className="bg-background">
      <section className="pb-12 pt-12 sm:pb-14 sm:pt-14 lg:pb-16 lg:pt-16">
        <Container>
          <h1 className="font-serif text-[clamp(52px,6.4vw,92.5px)] font-medium leading-none tracking-[-0.05em] text-foreground">
            Making coverage <span className="italic">frictionless</span>{" "}
            <MarkDoubleArrow />
            <br />
            Insurance <MarkTriangle /> for
            <br />
            the families and business owners shaping <MarkDiamond /> our
            <br />
            San Marino <MarkPhotoTile /> community.
          </h1>

          <div className="mt-12">
            <Link
              href="/contact"
              className="inline-flex h-[50px] items-center justify-center bg-foreground px-10 font-serif text-[25.1px] tracking-[-0.03em] text-white hover:bg-foreground/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60"
            >
              Contact us
            </Link>
          </div>
        </Container>

        <div className="mt-16">
          <Container className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="font-serif text-[14px] tracking-[0.1em] uppercase leading-none">
              <div>Trusted by</div>
              <div className="mt-2 text-foreground/80">
                {site.agent.rating.reviewCount} local reviews
              </div>
            </div>

            <div className="relative overflow-hidden md:max-w-[880px]">
              <div className="flex w-max animate-[ticker_20s_linear_infinite] items-center text-foreground/30">
                <TickerList />
                <TickerList ariaHidden />
              </div>
            </div>
          </Container>
        </div>
      </section>
    </main>
  );
}

function MarkDoubleArrow() {
  return (
    <span className="inline-block align-[0.06em]" aria-hidden>
      <svg
        width="54"
        height="30"
        viewBox="0 0 46 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0H14L28 13L14 26H0L14 13L0 0Z" fill="currentColor" />
        <path d="M18 0H32L46 13L32 26H18L32 13L18 0Z" fill="currentColor" />
      </svg>
    </span>
  );
}

function MarkTriangle() {
  return (
    <span className="inline-block align-[0.06em]" aria-hidden>
      <svg
        width="40"
        height="30"
        viewBox="0 0 34 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17 0L34 26H0L17 0Z" fill="currentColor" />
        <rect x="0" y="22" width="34" height="4" fill="currentColor" />
      </svg>
    </span>
  );
}

function MarkDiamond() {
  return (
    <span className="inline-block align-[0.06em]" aria-hidden>
      <svg
        width="30"
        height="30"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M13 0L26 13L13 26L0 13L13 0Z" fill="currentColor" />
      </svg>
    </span>
  );
}

function MarkPhotoTile() {
  return (
    <span
      className="mx-[0.14em] inline-block h-[0.62em] w-[1.55em] overflow-hidden align-[-0.06em]"
      aria-hidden
    >
      <svg
        viewBox="0 0 200 120"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6aa9ff" />
            <stop offset="1" stopColor="#b9d7ff" />
          </linearGradient>
          <linearGradient id="hills" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2a2a2a" />
            <stop offset="1" stopColor="#0b0b0b" />
          </linearGradient>
        </defs>
        <rect width="200" height="120" fill="url(#sky)" />
        <circle cx="160" cy="30" r="16" fill="#ffe08a" opacity="0.9" />
        <path
          d="M0,92 C40,70 70,80 110,66 C140,57 162,62 200,48 L200,120 L0,120 Z"
          fill="url(#hills)"
          opacity="0.92"
        />
        <path
          d="M0,98 C36,84 78,90 118,82 C150,76 175,78 200,70 L200,120 L0,120 Z"
          fill="#000000"
          opacity="0.38"
        />
      </svg>
    </span>
  );
}

function TickerList({ ariaHidden = false }: { ariaHidden?: boolean }) {
  const items = [
    "Auto",
    "Home",
    "Condo",
    "Renters",
    "Life",
    "Business",
    "Motorcycle",
    "Boat",
    "ATV",
  ] as const;

  return (
    <ul className="flex items-center gap-10" aria-hidden={ariaHidden}>
      {items.map((label) => (
        <li key={label} className="font-serif text-[25.1px] tracking-[-0.03em]">
          {label}
        </li>
      ))}
    </ul>
  );
}
