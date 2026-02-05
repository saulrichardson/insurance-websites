import Link from "next/link";
import { MapPin, Phone, Timer } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { QuoteRequestForm } from "@/components/quote-request-form";
import { getFullAddressLine, getOffice, type OfficeHour } from "@/lib/site";

type OfficeLocationPageProps = {
  officeId: "san-marino" | "la-palma";
};

export function OfficeLocationPage({ officeId }: OfficeLocationPageProps) {
  const office = getOffice(officeId);

  return (
    <main id="main" className="bg-background">
      <section className="relative overflow-hidden pb-12 pt-12 sm:pb-16 sm:pt-16 lg:pb-18 lg:pt-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-surface/70 px-4 py-2 text-xs font-medium text-accent shadow-sm shadow-black/5">
                <span className="size-1.5 rounded-full bg-brand" aria-hidden />
                {office.label} • {office.location}
              </div>

              <h1 className="mt-7 text-balance font-serif text-[clamp(2.6rem,5.4vw,4.3rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
                {office.location} office
              </h1>

              <p className="mt-5 max-w-xl text-pretty text-lg leading-8 text-foreground/75">
                Stop by during office hours, call for a quote, or request a coverage review. We keep the conversation
                structured and calm—so you understand your options and next steps.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href={`tel:${office.phone.e164}`} variant="primary" size="md" className="gap-2">
                  <Phone className="size-4" aria-hidden />
                  Call {office.phone.display}
                </ButtonLink>
                <ButtonLink href={office.links.mapCid} variant="outline" size="md" className="gap-2">
                  <MapPin className="size-4" aria-hidden />
                  Directions
                </ButtonLink>
                <ButtonLink href="/coverages#quote" variant="secondary" size="md">
                  Request a quote
                </ButtonLink>
              </div>

              <div className="mt-8 flex flex-wrap gap-2 text-sm text-foreground/70">
                <span className="font-medium text-accent">Jump to:</span>
                <a className="rounded-full bg-surface/70 px-3 py-1.5 hover:bg-surface" href="#details">
                  Details
                </a>
                <a className="rounded-full bg-surface/70 px-3 py-1.5 hover:bg-surface" href="#help">
                  What we help with
                </a>
                <a className="rounded-full bg-surface/70 px-3 py-1.5 hover:bg-surface" href="#quote">
                  Quote
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-accent/15 bg-surface shadow-lg shadow-black/10">
              <div className="aspect-[4/3] w-full">
                <iframe
                  title={`Map to ${office.label} (${office.location})`}
                  src={office.links.mapEmbed}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="border-t border-accent/15 p-6">
                <div className="text-sm font-semibold text-accent">{getFullAddressLine(officeId)}</div>
                <div className="mt-2 text-sm text-foreground/75">
                  Call{" "}
                  <a className="hover:text-foreground" href={`tel:${office.phone.e164}`}>
                    {office.phone.display}
                  </a>{" "}
                  or request directions above.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="details" className="bg-surface scroll-mt-[var(--header-offset)]">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start">
            <div className="rounded-3xl border border-accent/15 bg-background p-7 shadow-sm shadow-black/5">
              <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                <MapPin className="size-4" aria-hidden />
                Address
              </div>
              <div className="mt-2 text-sm text-foreground/75">{getFullAddressLine(officeId)}</div>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                    <Phone className="size-4" aria-hidden />
                    Phone
                  </div>
                  <div className="mt-2 text-sm text-foreground/75">
                    <a className="hover:text-foreground" href={`tel:${office.phone.e164}`}>
                      {office.phone.display}
                    </a>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                    <Timer className="size-4" aria-hidden />
                    Hours
                  </div>
                  <HoursList hours={office.hours} />
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-accent/15 bg-background p-7 shadow-sm shadow-black/5">
              <div className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">
                Need help choosing?
              </div>
              <div className="mt-4 font-serif text-2xl tracking-[-0.03em] text-foreground">
                Start with a coverage review.
              </div>
              <div className="mt-4 text-sm leading-7 text-foreground/75">
                A short conversation usually reveals the real priority: liability limits, rebuild cost, deductibles, or
                a gap like umbrella coverage. We’ll map out the next step clearly.
              </div>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <ButtonLink href="/coverages#quote" variant="primary" size="md">
                  Request a quote
                </ButtonLink>
                <ButtonLink href="/coverages" variant="outline" size="md">
                  Browse coverages
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="help" className="bg-background scroll-mt-[var(--header-offset)]">
        <Container className="py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">
              What we <span className="text-brand">help</span> with
            </div>
            <h2 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Coverage that fits real life.
            </h2>
            <p className="mt-4 text-pretty text-lg leading-8 text-foreground/75">
              We help households and business owners structure coverage across home, auto, renters, umbrella, life, and
              business policies—so limits, deductibles, and liability decisions line up.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <CoverageLink href="/coverages/home" title="Home" description="Rebuild cost, belongings, deductibles, and liability." />
            <CoverageLink href="/coverages/auto" title="Auto" description="Liability limits, deductibles, add-ons, and savings." />
            <CoverageLink href="/coverages/renters" title="Renters" description="Belongings, liability, and landlord-required proof." />
            <CoverageLink href="/coverages/umbrella" title="Umbrella" description="An extra layer of liability protection when it matters." />
            <CoverageLink href="/coverages/life" title="Life" description="Term and permanent options—structured, not salesy." />
            <CoverageLink href="/coverages/business" title="Business" description="Contracts, COIs, and specialty-market access when needed." />
          </div>

          <div className="mt-8 text-sm text-foreground/70">
            Looking for something specific? Start at{" "}
            <Link className="underline underline-offset-4 hover:text-foreground" href="/coverages">
              the coverages directory
            </Link>
            .
          </div>
        </Container>
      </section>

      <section id="quote" className="bg-surface scroll-mt-[var(--header-offset)]">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start lg:justify-between">
            <div>
              <div className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">
                Request a quote
              </div>
              <h2 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Tell us what you’re shopping for.
              </h2>
              <p className="mt-4 max-w-[62ch] text-pretty text-lg leading-8 text-foreground/75">
                We’ll follow up with a simple next step. If you prefer, call{" "}
                <a className="underline underline-offset-4 hover:text-foreground" href={`tel:${office.phone.e164}`}>
                  {office.phone.display}
                </a>{" "}
                and we’ll cover the essentials in a quick conversation.
              </p>
            </div>

            <div className="w-full max-w-[520px]">
              <QuoteRequestForm source={`office-${officeId}`} />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

function HoursList({ hours }: { hours: OfficeHour[] }) {
  return (
    <ul className="mt-3 space-y-2 text-sm text-foreground/75">
      {hours.map((h) => (
        <li key={h.day} className="flex items-start justify-between gap-4">
          <span className="min-w-10 text-foreground">{h.day}</span>
          {"note" in h ? <span className="text-right">{h.note}</span> : <span className="text-right">{h.open} – {h.close}</span>}
        </li>
      ))}
    </ul>
  );
}

function CoverageLink({ href, title, description }: { href: string; title: string; description: string }) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-accent/15 bg-surface/70 px-6 py-5 shadow-sm shadow-black/5 transition-colors hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60"
    >
      <div className="text-lg font-semibold tracking-tight text-accent">{title}</div>
      <div className="mt-2 text-sm leading-7 text-foreground/75">{description}</div>
    </Link>
  );
}

