import { Container } from "@/components/Container";
import { PageCTA } from "@/components/PageCTA";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/ui/Card";
import { site } from "@/config/site";
import { getOfficeById } from "@insurance-websites/domain";
import { getRequestMarket } from "@/lib/market";
import { getRouteMetadata } from "@/lib/seo";

export const metadata = getRouteMetadata("/location");

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

export default async function LocationPage() {
  const market = await getRequestMarket();
  const office = getOfficeById(market.primaryOfficeId);
  const isLocal = market.domainRole === "local";
  const visibleOffices = isLocal ? [office] : site.offices;
  const serviceArea = isLocal ? market.serviceArea : site.serviceArea;
  const email = site.email?.trim();
  const hasEmail = Boolean(email && email.length > 0);
  const title = isLocal ? `${market.label} office` : "Two offices. One standard.";
  const subtitle = isLocal
    ? `Call, text, request a quote, or use directions for the ${market.label} office.`
    : "Call, text, or request a quote online. For in-person help, choose your nearest office and we’ll confirm availability.";
  const serviceAreaBody = isLocal
    ? `The ${market.label} office supports nearby communities with statewide California insurance help.`
    : "We serve San Marino, La Palma, and nearby communities across Los Angeles County and Orange County.";

  return (
    <div className="bg-[var(--background)]">
      <PageHero
        eyebrow="Location"
        title={title}
        subtitle={subtitle}
        office={isLocal ? office : undefined}
      />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-4">
          {visibleOffices.map((item) => {
            const mapUrl = getOfficeMapEmbed(item.address);
            return (
              <Card key={item.slug} className="overflow-hidden p-0">
                <div className="grid gap-0 lg:grid-cols-2">
                  <div className="p-7">
                    <div className="flex flex-wrap items-start justify-between gap-6">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-700">
                          Office
                        </div>
                        <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                          {item.label}, {item.address.addressRegion}
                        </div>
                        <div className="mt-3 text-sm text-slate-700">
                          <div>{item.address.streetAddress}</div>
                          <div>
                            {item.address.addressLocality},{" "}
                            {item.address.addressRegion}{" "}
                            {item.address.postalCode}
                          </div>
                        </div>
                      </div>

                      {item.links?.googleMaps ? (
                        <a
                          className="text-sm font-medium text-slate-950 hover:underline"
                          href={item.links.googleMaps}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Directions →
                        </a>
                      ) : null}
                    </div>

                    <div className="mt-6 grid gap-6 text-sm text-slate-700 sm:grid-cols-2">
                      <div className="grid gap-1">
                        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Contact
                        </div>
                        <a
                          className="font-medium text-slate-950 hover:underline"
                          href={`tel:${item.phoneE164}`}
                        >
                          {item.phoneDisplay}
                        </a>
                        {item.smsE164 ? (
                          <a
                            className="font-medium text-slate-950 hover:underline"
                            href={`sms:${item.smsE164}`}
                          >
                            Text this office
                          </a>
                        ) : null}
                        {item.faxDisplay ? (
                          <div className="text-sm text-slate-700">
                            Fax {item.faxDisplay}
                          </div>
                        ) : null}
                        {hasEmail ? (
                          <a
                            className="mt-2 inline-flex font-medium text-slate-950 hover:underline"
                            href={`mailto:${email}`}
                          >
                            Email {email}
                          </a>
                        ) : null}
                        {item.links?.appointment ? (
                          <a
                            className="mt-2 inline-flex font-medium text-slate-950 hover:underline"
                            href={item.links.appointment}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Request an appointment →
                          </a>
                        ) : null}
                      </div>

                      <div className="grid gap-1">
                        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Hours
                        </div>
                        <div>{item.hours.mondayFriday}</div>
                        <div>{item.hours.saturday}</div>
                        <div>{item.hours.sunday}</div>
                        {item.hours.note ? (
                          <div className="pt-1 text-xs text-slate-500">
                            {item.hours.note}
                          </div>
                        ) : null}
                        {item.reviews ? (
                          <div className="pt-3 text-xs text-slate-600">
                            Reviews: {item.reviews.rating}★ ({item.reviews.count})
                          </div>
                        ) : null}
                      </div>
                    </div>

                    {item.languages.length > 0 ? (
                      <div className="mt-6">
                        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Languages
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {item.languages.map((lang) => (
                            <span
                              key={lang}
                              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="min-h-[340px] bg-slate-100">
                    <iframe
                      title={`Map — ${item.label}`}
                      src={mapUrl}
                      className="h-full min-h-[340px] w-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </Card>
            );
          })}

          <Card className="p-7">
            <div className="text-base font-semibold text-slate-950">
              Service area
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {serviceAreaBody}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {serviceArea.map((area) => (
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
      </Container>

      <PageCTA office={isLocal ? office : undefined} />
    </div>
  );
}
