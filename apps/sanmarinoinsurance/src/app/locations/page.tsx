import { MapPin, Phone, Timer } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { getFullAddressLine, getOffice, site } from "@/lib/site";

export const metadata = {
  title: "Locations",
  description: `Office locations in San Marino and La Palma. Call ${site.agent.phone.display} for a quote or coverage review.`,
};

export default function LocationsPage() {
  const sanMarino = getOffice("san-marino");
  const laPalma = getOffice("la-palma");

  return (
    <main id="main" className="bg-background">
      <section className="relative overflow-hidden pb-14 pt-6 sm:pb-18 sm:pt-10 lg:pb-20 lg:pt-12">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <h1 className="text-balance font-serif text-[clamp(2.7rem,5.7vw,4.7rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
                Two local offices. One clear way to get covered.
              </h1>

              <p className="mt-5 max-w-xl text-pretty text-lg leading-8 text-foreground/75">
                Choose the office that’s most convenient. Whether you’re calling, stopping by, or requesting a quote
                online, you’ll get the same structured guidance: clear tradeoffs, fast follow‑through, and coverage
                that stays aligned at renewal.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href={`tel:${site.agent.phone.e164}`} variant="primary" size="md" className="gap-2">
                  <Phone className="size-4" aria-hidden />
                  Call {site.agent.phone.display}
                </ButtonLink>
                <ButtonLink href="/coverages#quote" variant="secondary" size="md">
                  Request a quote
                </ButtonLink>
                <ButtonLink href="/coverages" variant="outline" size="md">
                  Browse coverages
                </ButtonLink>
              </div>
            </div>

            <div className="rounded-3xl border border-accent/15 bg-surface p-7 shadow-lg shadow-black/10">
              <div className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">
                Quick help
              </div>
              <div className="mt-4 space-y-3 text-sm text-foreground/75">
                <div className="flex items-start gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>Need directions? Choose an office and tap “Directions.”</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>Want a quote? Use the quote form—then we’ll follow up with next steps.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>Not sure what you need? Start with a coverage review and we’ll map it out.</span>
                </div>
              </div>
              <div className="mt-6">
                <ButtonLink href="/contact" variant="outline" size="sm">
                  Contact options
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface">
        <Container className="py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">
              Office <span className="text-brand">locations</span>
            </div>
            <h2 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Choose a nearby office.
            </h2>
            <p className="mt-4 text-pretty text-lg leading-8 text-foreground/75">
              Both offices can help with auto, home, renters, umbrella, life, and business coverage. Pick the location
              that’s easiest for you.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <LocationCard officeId="san-marino" />
            <LocationCard officeId="la-palma" />
          </div>

          <div className="mt-12 rounded-3xl border border-accent/15 bg-background p-7 shadow-sm shadow-black/5">
            <div className="text-sm font-semibold text-accent">Prefer to start online?</div>
            <div className="mt-2 text-sm text-foreground/75">
              Request a quote and we’ll follow up with a simple next step.
            </div>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <ButtonLink href="/coverages#quote" variant="primary" size="md">
                Request a quote
              </ButtonLink>
              <ButtonLink href="/coverages" variant="outline" size="md">
                Browse coverages
              </ButtonLink>
            </div>
          </div>

          <div className="sr-only" aria-hidden>
            {sanMarino.location} {getFullAddressLine("san-marino")} {sanMarino.phone.display}
            {laPalma.location} {getFullAddressLine("la-palma")} {laPalma.phone.display}
          </div>
        </Container>
      </section>
    </main>
  );
}

function LocationCard({ officeId }: { officeId: "san-marino" | "la-palma" }) {
  const office = getOffice(officeId);

  return (
    <article className="overflow-hidden rounded-3xl border border-accent/15 bg-background shadow-sm shadow-black/5">
      <div className="aspect-[16/9] w-full bg-surface">
        <iframe
          title={`Map to ${office.label} (${office.location})`}
          src={office.links.mapEmbed}
          className="h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="p-7">
        <div className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">{office.location}</div>
        <h3 className="mt-3 font-serif text-2xl tracking-[-0.03em] text-foreground">{office.label}</h3>

        <div className="mt-4 space-y-2 text-sm text-foreground/75">
          <div className="flex items-start gap-2">
            <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
            <span>{getFullAddressLine(officeId)}</span>
          </div>
          <div className="flex items-start gap-2">
            <Phone className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
            <a className="hover:text-foreground" href={`tel:${office.phone.e164}`}>
              {office.phone.display}
            </a>
          </div>
          <div className="flex items-start gap-2">
            <Timer className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
            <span>{officeHoursSummary(officeId)}</span>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-2">
          <ButtonLink href={`/locations/${officeId}`} variant="primary" size="md">
            View details
          </ButtonLink>
          <ButtonLink href={office.links.mapCid} variant="outline" size="md">
            Directions
          </ButtonLink>
        </div>

        <div className="mt-4 text-xs text-foreground/70">
          Office hours and availability can change — call ahead if you’re making a special trip.
        </div>
      </div>
    </article>
  );
}

function officeHoursSummary(officeId: "san-marino" | "la-palma") {
  if (officeId === "san-marino") return "Mon–Fri 9:00–6:00 • Weekends by appointment";
  return "Mon–Fri 9:00–5:45 • Weekends closed";
}
