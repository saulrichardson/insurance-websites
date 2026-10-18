import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { getRouteMetadata } from "@/lib/seo";

export const metadata = getRouteMetadata("/contact-consent");

const contactGuidance = [
  ["Contact the office", "Call, text, or email the office about your insurance question. Tell us how you prefer to receive a reply. Contacting the office does not bind or change coverage."],
  ["Text messages", "For text communication, confirm the contact details and applicable consent with the office. Message and data rates may apply. Reply STOP to opt out and HELP for help."],
  ["Marketing choices", "Optional marketing messages require separate express consent. You can ask for insurance help without agreeing to marketing messages."],
];

export default function ContactConsentPage() {
  return (
    <div className="bg-white">
      <PageHero eyebrow="Contact" title="Contact preferences" subtitle="How to reach the office and choose how we respond." />
      <Container className="py-16">
        <div className="mx-auto max-w-3xl space-y-5">
          {contactGuidance.map(([title, text]) => (
            <section key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-700">{text}</p>
            </section>
          ))}
        </div>
      </Container>
    </div>
  );
}
