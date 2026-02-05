import { MapPin, Phone, Star, Timer } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { getFullAddressLine, getOffice, site } from "@/lib/site";

export const metadata = {
  title: "Contact",
  description: `Call ${site.agent.phone.display} or choose an office location in San Marino or La Palma.`,
};

export default function ContactPage() {
  return (
    <main id="main" className="bg-background">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-surface/70 px-4 py-2 text-xs font-medium text-accent shadow-sm shadow-black/5">
              <span className="size-1.5 rounded-full bg-brand" aria-hidden />
              {site.brand.legalLine}
            </div>

            <h1 className="mt-7 text-balance font-serif text-[clamp(2.5rem,5.2vw,4.25rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
              Contact the agency
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-foreground/75">
              Call for a quote, a coverage review, or help understanding policy options. If you prefer to visit in
              person, we have offices in San Marino and La Palma.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`tel:${site.agent.phone.e164}`} variant="primary" size="md" className="gap-2">
                <Phone className="size-4" aria-hidden />
                Call {site.agent.phone.display}
              </ButtonLink>
              <ButtonLink href="/locations" variant="outline" size="md" className="gap-2">
                <MapPin className="size-4" aria-hidden />
                View locations
              </ButtonLink>
              <ButtonLink href="/coverages#quote" variant="secondary" size="md">
                Request a quote
              </ButtonLink>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-accent/15 bg-surface p-6 shadow-sm shadow-black/5">
                <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                  <Phone className="size-4" aria-hidden />
                  Main line
                </div>
                <div className="mt-2 text-sm text-foreground/75">
                  <a className="hover:text-foreground" href={`tel:${site.agent.phone.e164}`}>
                    {site.agent.phone.display}
                  </a>
                </div>
                <div className="mt-2 text-sm text-foreground/75">{site.agent.notes.join(" ")}</div>
                <div className="mt-3 text-sm text-foreground/75">
                  Fax: <span className="text-foreground">{site.agent.fax.display}</span>
                </div>
              </div>

              <div className="rounded-3xl border border-accent/15 bg-surface p-6 shadow-sm shadow-black/5">
                <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                  <Star className="size-4" aria-hidden />
                  Reviews
                </div>
                <div className="mt-3 text-sm text-foreground/75">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-foreground">{site.agent.rating.reviewCount} reviews</span>
                    <span>{site.agent.rating.score.toFixed(1)} / {site.agent.rating.outOf}</span>
                  </div>
                  <div className="mt-3">
                    <a
                      href={site.agent.links.allstateProfile}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-foreground/75 hover:text-foreground"
                    >
                      View profile & reviews
                    </a>
                  </div>
                  <div className="mt-3 text-xs text-foreground/70">
                    Review count is shown as listed on the Allstate agent profile.
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-accent/15 bg-surface p-6 shadow-sm shadow-black/5 sm:col-span-2">
                <div className="text-sm font-semibold text-accent">Languages</div>
                <div className="mt-2 text-sm text-foreground/75">{site.agent.languages.join(", ")}</div>
                <div className="mt-4 text-xs text-foreground/70">
                  We can support multi‑language conversations when reviewing coverage options.
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-3xl border border-accent/15 bg-surface p-6 shadow-lg shadow-black/10 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">
                    Offices
                  </div>
                  <div className="mt-2 font-serif text-2xl tracking-[-0.03em] text-foreground">
                    Choose a location
                  </div>
                </div>
                <ButtonLink href="/locations" variant="outline" size="sm">
                  All locations
                </ButtonLink>
              </div>

              <div className="mt-6 grid gap-4">
                <OfficeCard officeId="san-marino" />
                <OfficeCard officeId="la-palma" />
              </div>
            </div>

            <div className="rounded-3xl border border-accent/15 bg-surface p-6 shadow-sm shadow-black/5">
              <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                <Timer className="size-4" aria-hidden />
                Need help fast?
              </div>
              <div className="mt-3 text-sm text-foreground/75">
                Call{" "}
                <a className="hover:text-foreground" href={`tel:${site.agent.phone.e164}`}>
                  {site.agent.phone.display}
                </a>{" "}
                and we’ll guide you to the right next step.
              </div>
              <div className="mt-6 grid grid-cols-2 gap-2">
                <ButtonLink href={`tel:${site.agent.phone.e164}`} variant="primary" size="md">
                  Call now
                </ButtonLink>
                <ButtonLink href="/coverages" variant="outline" size="md">
                  Coverages
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

function OfficeCard({ officeId }: { officeId: "san-marino" | "la-palma" }) {
  const office = getOffice(officeId);

  return (
    <div className="rounded-2xl border border-accent/10 bg-background p-5 shadow-sm shadow-black/5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">{office.location}</div>
          <div className="mt-2 text-lg font-semibold tracking-tight text-accent">{office.label}</div>
          <div className="mt-3 space-y-1 text-sm text-foreground/75">
            <div>{getFullAddressLine(officeId)}</div>
            <div>
              <a className="hover:text-foreground" href={`tel:${office.phone.e164}`}>
                {office.phone.display}
              </a>
            </div>
          </div>
        </div>
        <div className="hidden shrink-0 rounded-2xl border border-accent/10 bg-surface/70 px-3 py-2 text-xs font-medium text-foreground/70 sm:block">
          <div className="flex items-center gap-2">
            <Timer className="size-4 text-accent" aria-hidden />
            Hours
          </div>
          <div className="mt-1">{summaryHours(officeId)}</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <ButtonLink href={`tel:${office.phone.e164}`} variant="primary" size="sm">
          Call
        </ButtonLink>
        <ButtonLink href={office.links.mapCid} variant="outline" size="sm">
          Directions
        </ButtonLink>
      </div>

      <div className="mt-4">
        <ButtonLink href={`/locations/${officeId}`} variant="ghost" size="sm" className="w-full justify-center">
          View office details
        </ButtonLink>
      </div>
    </div>
  );
}

function summaryHours(officeId: "san-marino" | "la-palma") {
  if (officeId === "san-marino") return "Mon–Fri 9–6 • Weekends by appt";
  return "Mon–Fri 9–5:45 • Weekends closed";
}
