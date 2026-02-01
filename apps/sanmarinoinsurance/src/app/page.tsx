import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";

export default function Home() {
  return (
    <main id="main" className="bg-background">
      <section className="pb-12 pt-12 sm:pb-14 sm:pt-14 lg:pb-16 lg:pt-16">
        <Container>
          <h1 className="font-serif text-[clamp(52px,6.4vw,92.5px)] font-medium leading-none tracking-[-0.05em] text-foreground">
            Protect what matters <span className="italic">most</span>.
            <br />
            Insurance for any risk.
            <br />
            A San Marino agency for families and business owners.
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
          <Container className="flex flex-col gap-6 md:flex-row md:items-end md:gap-6">
            <div className="font-serif text-[14px] tracking-[0.1em] uppercase leading-none">
              Insurance
              <br />
              Carriers
            </div>

            <div className="relative overflow-hidden md:flex-1 md:min-w-0">
              <div className="flex w-max will-change-transform animate-[ticker_40s_linear_infinite] items-center motion-reduce:animate-none">
                <CarrierTickerList />
                <CarrierTickerList ariaHidden />
              </div>
            </div>
          </Container>
        </div>
      </section>
    </main>
  );
}

type Carrier = {
  name: string;
  assetPath: string;
  width: number;
  height: number;
};

const carriers: Carrier[] = [
  { name: "Allstate", assetPath: "/carriers/allstate.svg", width: 124, height: 27 },
  { name: "Bamboo", assetPath: "/carriers/bamboo.png", width: 212, height: 39 },
  { name: "Chubb", assetPath: "/carriers/chubb.svg", width: 315, height: 62 },
  { name: "RT Specialty", assetPath: "/carriers/rt-specialty.svg", width: 405, height: 155 },
  { name: "Bristol West", assetPath: "/carriers/bristol-west.svg", width: 542, height: 187 },
  { name: "Burns & Wilcox", assetPath: "/carriers/burns-wilcox.svg", width: 140, height: 57 },
  { name: "National General", assetPath: "/carriers/national-general.png", width: 1544, height: 183 },
  { name: "Pacific Specialty", assetPath: "/carriers/pacific-specialty.svg", width: 272, height: 48 },
  { name: "Stillwater", assetPath: "/carriers/stillwater.svg", width: 441, height: 135 },
  { name: "Aegis", assetPath: "/carriers/aegis.svg", width: 238, height: 110 },
];

function CarrierTickerList({ ariaHidden = false }: { ariaHidden?: boolean }) {
  const tickerCarriers = [...carriers, ...carriers];

  return (
    <ul
      className="flex items-center"
      aria-hidden={ariaHidden}
    >
      {tickerCarriers.map((carrier, idx) => (
        <li
          key={`${carrier.name}-${idx}`}
          className="flex h-11 w-[220px] items-center justify-center sm:h-12 sm:w-[240px] md:w-[260px]"
        >
          <Image
            src={carrier.assetPath}
            alt={ariaHidden ? "" : carrier.name}
            width={carrier.width}
            height={carrier.height}
            sizes="260px"
            unoptimized={carrier.assetPath.endsWith(".svg")}
            className="h-7 w-auto max-w-[200px] select-none object-contain opacity-100 sm:h-8 sm:max-w-[220px]"
            priority={!ariaHidden && idx < carriers.length}
            loading="eager"
          />
        </li>
      ))}
    </ul>
  );
}
