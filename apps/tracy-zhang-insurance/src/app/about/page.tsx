import Link from "next/link";

import { Container } from "@/components/Container";
import { PageCTA } from "@/components/PageCTA";
import { PageHero } from "@/components/PageHero";
import { buttonClasses } from "@/components/ui/button";
import { Card } from "@/components/ui/Card";
import { site } from "@/config/site";
import { getOfficeById } from "@insurance-websites/domain";
import { getRequestMarket } from "@/lib/market";
import { getRouteMetadata } from "@/lib/seo";

export const metadata = getRouteMetadata("/about");

export default async function AboutPage() {
  const market = await getRequestMarket();
  const office = getOfficeById(market.primaryOfficeId);
  const isLocal = market.domainRole === "local";
  const locationLine = isLocal
    ? `Based at the ${office.address.streetAddress} office in ${office.address.addressLocality}, ${office.address.addressRegion}.`
    : `Based in California, with local offices in San Marino and La Palma.`;
  const localByDefaultCopy = isLocal
    ? `Start with the ${market.label} office for nearby service and statewide California coverage options behind it.`
    : "Serving nearby communities across California, anchored by our San Marino and La Palma offices.";
  const serviceAreas = isLocal ? market.serviceArea : site.serviceArea.slice(0, 6);

  return (
    <div className="bg-white">
      <PageHero
        eyebrow="About"
        title="Local insurance. Clear guidance."
        subtitle={`${locationLine} We make coverage choices simple, transparent, and easy to act on.`}
        office={office}
      />

      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="space-y-5">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              What to expect
            </h2>
            <p className="text-base leading-7 text-slate-600 sm:text-lg">
              We help people and businesses protect what matters—without jargon
              and without pressure. You’ll get clear options and a fast,
              responsive process.
            </p>
            <p className="text-base leading-7 text-slate-600 sm:text-lg">
              {site.carrierNotes}
            </p>

            <Card className="p-7">
              <div className="text-sm font-semibold text-slate-950">
                Local by default
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {localByDefaultCopy}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {serviceAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-xs text-slate-700 shadow-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </Card>
          </div>

          <div className="grid gap-4">
            {[
              {
                title: "Fast response",
                body: "Call or text and you’ll get a real person who can move your request forward.",
              },
              {
                title: "Plain-English coverage",
                body: "We explain the tradeoffs that actually change your protection—not just price.",
              },
              {
                title: "Support after the sale",
                body: "Changes, add-ons, annual reviews—we help you keep coverage aligned as life changes.",
              },
            ].map((item) => (
              <Card key={item.title} className="p-7">
                <div className="text-base font-semibold text-slate-950">
                  {item.title}
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.body}
                </p>
              </Card>
            ))}

            <Card className="p-7">
              <div className="text-base font-semibold text-slate-950">
                How to start
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Call, text, or request a quote online. We’ll confirm a few
                details and bring you options you can compare.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  className={buttonClasses({ variant: "primary", size: "md" })}
                  href={`tel:${office.phoneE164}`}
                >
                  Call {office.phoneDisplay}
                </a>
                <Link
                  className={buttonClasses({ variant: "outline", size: "md" })}
                  href="/contact#quote"
                >
                  Request a quote
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </Container>

      <PageCTA office={office} />
    </div>
  );
}
