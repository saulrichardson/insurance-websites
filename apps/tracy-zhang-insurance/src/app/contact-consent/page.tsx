import { consentCopy } from "@insurance-websites/lead-capture";

import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { getRouteMetadata } from "@/lib/seo";

export const metadata = getRouteMetadata("/contact-consent");

export default function ContactConsentPage() {
  return (
    <div className="bg-white">
      <PageHero
        eyebrow="Consent"
        title="Contact consent"
        subtitle="Current consent language used on Tracy Zhang Insurance inquiry forms."
      />

      <Container className="py-16">
        <div className="mx-auto max-w-3xl space-y-5">
          {Object.entries(consentCopy).map(([key, text]) => (
            <section key={key} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                {key}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-700">{text}</p>
            </section>
          ))}
        </div>
      </Container>
    </div>
  );
}
