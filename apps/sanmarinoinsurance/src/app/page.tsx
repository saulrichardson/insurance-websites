import Link from "next/link";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <main id="main" className="bg-background">
      <section className="pb-12 pt-12 sm:pb-14 sm:pt-14 lg:pb-16 lg:pt-16">
        <Container>
          <h1 className="font-serif text-[clamp(52px,6.4vw,92.5px)] font-medium leading-none tracking-[-0.05em] text-foreground">
            Protect what matters <span className="italic">most</span>.
            <br />
            Insurance for any risk from your local
            <br />
            San Marino agency.
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
