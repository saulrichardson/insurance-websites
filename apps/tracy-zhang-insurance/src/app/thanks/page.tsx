import Link from "next/link";

import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { buttonClasses } from "@/components/ui/button";
import { getRequestMarketOffice } from "@/lib/market";
import { getRouteMetadata } from "@/lib/seo";

export const metadata = getRouteMetadata("/thanks", {
  robots: { index: false, follow: false },
}, {
  localized: false,
});

export default async function ThanksPage() {
  const { office } = await getRequestMarketOffice();

  return (
    <div className="bg-white">
      <PageHero
        eyebrow="Thanks"
        title="We received your request"
        subtitle="We’ll review your details and follow up as soon as possible."
      />

      <Container className="py-16">
        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200/70 bg-white/80 p-8 shadow-[0_1px_0_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="text-base font-semibold text-slate-900">
            Want to speed things up?
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            If you have a current policy, send your declarations page and we’ll
            review it alongside your request.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              className={buttonClasses({ variant: "primary", size: "md" })}
              href={`tel:${office.phoneE164}`}
            >
              Call {office.phoneDisplay}
            </a>
            <Link
              className={buttonClasses({ variant: "outline", size: "md" })}
              href="/"
            >
              Back to home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
