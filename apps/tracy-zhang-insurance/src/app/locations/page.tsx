import type { Metadata } from "next";
import { getMarketProfile, getOfficeById } from "@insurance-websites/domain";

import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { TrackedLink } from "@/components/marketing-events";
import { Card } from "@/components/ui/Card";
import { getRequestMarket } from "@/lib/market";

export async function generateMetadata(): Promise<Metadata> {
  const market = await getRequestMarket();
  const isLocal = market.domainRole === "local";

  return {
    title: isLocal ? `${market.label} Location` : "Locations",
    description: isLocal
      ? `${market.label} office details, service area, and insurance guidance.`
      : "Local Tracy Zhang Insurance office pages for San Marino, La Palma, and nearby California communities.",
    alternates: { canonical: "/locations" },
  };
}

export default async function LocationsPage() {
  const activeMarket = await getRequestMarket();
  const isLocal = activeMarket.domainRole === "local";
  const office = getOfficeById(activeMarket.primaryOfficeId);
  const markets = isLocal
    ? [activeMarket]
    : [
        getMarketProfile("san-marino"),
        getMarketProfile("la-palma"),
        getMarketProfile("cerritos"),
      ];

  return (
    <div className="bg-[var(--background)]">
      <PageHero
        eyebrow={isLocal ? activeMarket.eyebrow : "Locations"}
        title={isLocal ? `${activeMarket.label} office context` : "Local office context. Statewide California reach."}
        subtitle={
          isLocal
            ? `Start with the ${activeMarket.label} office, nearby service area, and coverage paths.`
            : "Choose the office or nearby market page that matches where you want to start."
        }
        office={isLocal ? office : undefined}
      />

      <Container className="py-16 sm:py-20">
        <div className={isLocal ? "grid gap-4 md:grid-cols-1" : "grid gap-4 md:grid-cols-3"}>
          {markets.map((market) => (
            <TrackedLink
              key={market.id}
              href={`/locations/${market.id}`}
              eventName="location_click"
              eventProps={{ source: "locations_index", market: market.id }}
              className="group"
            >
              <Card className="h-full p-7 transition group-hover:-translate-y-0.5 group-hover:shadow-[var(--shadow-md)]">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {market.eyebrow}
                </div>
                <div className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
                  {market.label}
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {market.heroSubtitle}
                </p>
                <div className="mt-6 text-sm font-semibold text-slate-950">
                  Open page -&gt;
                </div>
              </Card>
            </TrackedLink>
          ))}
        </div>
      </Container>
    </div>
  );
}
