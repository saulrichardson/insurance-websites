import { Container } from "@/components/Container";
import { PageCTA } from "@/components/PageCTA";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/ui/Card";
import { QuoteForm } from "@/components/QuoteForm";
import { site } from "@/config/site";
import { getOfficeById } from "@insurance-websites/domain";
import { getRequestMarket } from "@/lib/market";
import { getRouteMetadata } from "@/lib/seo";

export const metadata = getRouteMetadata("/contact");

export default async function ContactPage() {
  const market = await getRequestMarket();
  const office = getOfficeById(market.primaryOfficeId);
  const isLocal = market.domainRole === "local";
  const visibleOffices = isLocal ? [office] : site.offices;
  const serviceArea = isLocal ? market.serviceArea : site.serviceArea;
  const email = site.email?.trim();
  const hasEmail = Boolean(email && email.length > 0);
  const title = isLocal ? `Contact the ${market.label} office` : "Call, text, or request a quote";
  const subtitle = isLocal
    ? `Tell us what changed, what you need covered, and how you prefer to be reached. The ${market.label} office will help shape the next step.`
    : "Tell us what changed, what you need covered, and how you prefer to be reached. We will route the next step to the right office.";
  const serviceAreaBody = isLocal
    ? `${market.label} office support for nearby communities, with statewide California insurance help behind it.`
    : "We work with clients across California, anchored by local offices in San Marino and La Palma.";

  return (
    <div className="bg-[var(--background)]">
      <PageHero
        eyebrow="Contact"
        title={title}
        subtitle={subtitle}
        office={isLocal ? office : undefined}
      />

      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Contact details
            </h2>
            <p className="text-base leading-7 text-slate-600">
              For urgent certificates or renewal deadlines, call or text. For
              new quotes and reviews, use the form and include the detail that
              matters most.
            </p>

            <div className="grid gap-4">
              {visibleOffices.map((item) => (
                <Card key={item.slug} className="p-7">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-700">
                        Office
                      </div>
                      <div className="mt-2 text-lg font-semibold text-slate-950">
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

                  <div className="mt-6 grid gap-4 text-sm text-slate-700 sm:grid-cols-2">
                    <div className="grid gap-1">
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Phone / Text
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
                </Card>
              ))}
            </div>

            <Card className="p-7">
              <div className="text-base font-semibold text-slate-900">
                Service area
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {serviceAreaBody}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {serviceArea.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </Card>
          </div>

          <div id="quote" className="scroll-mt-28">
            <Card className="p-7">
              <div className="text-xl font-semibold tracking-tight text-slate-900">
                Quote request
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Provide basic details and we will help shape the next step.
              </p>
              <div className="mt-6">
                <QuoteForm
                  officeOptions={isLocal ? [office] : undefined}
                  defaultOfficePreference={isLocal ? office.slug : undefined}
                />
              </div>
              <p className="mt-6 text-xs leading-5 text-slate-500">
                Note: Quotes are subject to underwriting, eligibility, and
                carrier guidelines. This form does not bind coverage.
              </p>
            </Card>
          </div>
        </div>
      </Container>

      <PageCTA office={isLocal ? office : undefined} />
    </div>
  );
}
