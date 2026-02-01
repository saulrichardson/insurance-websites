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
            Your local San Marino agency.
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
              <div>Carrier</div>
              <div className="mt-2 text-foreground/80">partners</div>
            </div>

            <div className="relative overflow-hidden md:max-w-[880px]">
              <div className="flex w-max animate-[ticker_20s_linear_infinite] items-center">
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
};

const carriers: Carrier[] = [
  { name: "Allstate", assetPath: "/carriers/allstate.svg" },
  { name: "Bamboo", assetPath: "/carriers/bamboo.png" },
  { name: "Chubb", assetPath: "/carriers/chubb.svg" },
  { name: "RT Specialty", assetPath: "/carriers/rt-specialty.svg" },
  { name: "Bristol West", assetPath: "/carriers/bristol-west.svg" },
  { name: "Burns & Wilcox", assetPath: "/carriers/burns-wilcox.svg" },
  { name: "National General", assetPath: "/carriers/national-general.png" },
  { name: "Pacific Specialty", assetPath: "/carriers/pacific-specialty.svg" },
  { name: "Stillwater", assetPath: "/carriers/stillwater.svg" },
  { name: "Aegis", assetPath: "/carriers/aegis.svg" },
];

function CarrierTickerList({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul
      className="flex items-center gap-12 md:gap-14"
      aria-hidden={ariaHidden}
    >
      {carriers.map((carrier) => (
        <li key={carrier.name} className="flex items-center">
          <Image
            src={carrier.assetPath}
            alt={carrier.name}
            width={220}
            height={72}
            sizes="220px"
            unoptimized={carrier.assetPath.endsWith(".svg")}
            className="h-7 w-auto select-none object-contain opacity-40 grayscale mix-blend-multiply sm:h-8"
            loading="lazy"
          />
        </li>
      ))}
    </ul>
  );
}
