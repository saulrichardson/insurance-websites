import Image from "next/image";
import {
  getMarketProfile,
  getOfficeById,
  products,
  type MarketId,
  type MarketProfile,
} from "@insurance-websites/domain";

import { Container } from "@/components/Container";
import { PageCTA } from "@/components/PageCTA";
import { PageHero } from "@/components/PageHero";
import { TrackedAnchor, TrackedLink } from "@/components/marketing-events";
import { Card } from "@/components/ui/Card";
import { buttonClasses } from "@/components/ui/button";

function getOfficeMapEmbed(address: {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
}) {
  const query = encodeURIComponent(
    `${address.streetAddress}, ${address.addressLocality}, ${address.addressRegion} ${address.postalCode}`,
  );
  return `https://www.google.com/maps?q=${query}&output=embed`;
}

export function MarketLocationPage({ marketId }: { marketId: MarketId }) {
  const market = getMarketProfile(marketId);
  const office = getOfficeById(market.primaryOfficeId);
  const mapUrl = getOfficeMapEmbed(office.address);

  return (
    <div className="bg-[var(--background)]">
      <PageHero
        eyebrow={market.eyebrow}
        title={market.heroTitle}
        subtitle={market.heroSubtitle}
        office={office}
      />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4">
            <MarketLocationImage market={market} />
            <Card className="overflow-hidden p-0">
              <div className="p-7">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-700">
                  Local office
                </div>
                <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                  {office.label}, {office.address.addressRegion}
                </div>
                <div className="mt-3 text-sm text-slate-700">
                  <div>{office.address.streetAddress}</div>
                  <div>
                    {office.address.addressLocality}, {office.address.addressRegion}{" "}
                    {office.address.postalCode}
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <TrackedAnchor
                    className={buttonClasses({ variant: "primary", size: "md" })}
                    href={`tel:${office.phoneE164}`}
                    eventName="phone_click"
                    eventProps={{
                      source: `${market.id}_location_page`,
                      office: office.slug,
                      phone: office.phoneDisplay,
                    }}
                  >
                    Call {office.phoneDisplay}
                  </TrackedAnchor>
                  <TrackedLink
                    className={buttonClasses({ variant: "outline", size: "md" })}
                    href="/contact#quote"
                    eventName="quote_click"
                    eventProps={{ source: `${market.id}_location_page` }}
                  >
                    Start request
                  </TrackedLink>
                </div>

                <div className="mt-8 grid gap-5 text-sm text-slate-700 sm:grid-cols-2">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Hours
                    </div>
                    <div className="mt-2">{office.hours.mondayFriday}</div>
                    <div>{office.hours.saturday}</div>
                    <div>{office.hours.sunday}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Languages
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {office.languages.map((language) => (
                        <span
                          key={language}
                          className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <iframe
                title={`Map - ${office.label}`}
                src={mapUrl}
                className="h-[340px] w-full border-t border-slate-200"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Card>
          </div>

          <div className="grid gap-4">
            {market.merchandising.map((group) => (
              <Card key={group.title} className="p-7">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {market.label}
                </div>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                  {group.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{group.intro}</p>
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  {group.productIds.map((id) => {
                    const product = products.find((item) => item.id === id);
                    if (!product) return null;
                    return (
                      <TrackedLink
                        key={product.id}
                        href={product.href}
                        eventName="product_click"
                        eventProps={{
                          source: `${market.id}_location_merchandising`,
                          product: product.title,
                        }}
                        className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 hover:border-slate-300 hover:bg-slate-50"
                      >
                        {product.title}
                      </TrackedLink>
                    );
                  })}
                </div>
              </Card>
            ))}

            <Card className="p-7">
              <div className="text-base font-semibold text-slate-950">
                Service area
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Local office support with statewide California insurance help.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {market.serviceArea.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </Container>

      <PageCTA office={office} />
    </div>
  );
}

function MarketLocationImage({ market }: { market: MarketProfile }) {
  if (!market.localImage) return null;

  return (
    <figure className="relative min-h-[260px] overflow-hidden border border-[var(--rail-border)] bg-slate-900 shadow-[var(--shadow-md)]">
      <Image
        src={market.localImage.src}
        alt={market.localImage.alt}
        fill
        sizes="(min-width: 1024px) 42vw, 100vw"
        className="object-cover"
        style={{ objectPosition: market.localImage.objectPosition ?? "center" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0)_0%,rgba(15,23,42,0.62)_100%)]" />
      <figcaption className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <div className="max-w-xl font-[var(--font-serif)] text-3xl leading-none">
          {market.localImage.caption}
        </div>
      </figcaption>
    </figure>
  );
}
