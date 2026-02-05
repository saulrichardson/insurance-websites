import { MapPin, Phone, Star, Timer } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { getFullAddressLine, site } from "@/lib/site";

export const metadata = {
  title: "Contact",
  description: `Call ${site.agent.phone.display} or visit us at ${getFullAddressLine()} in ${site.agent.location}.`,
};

export default function ContactPage() {
  return (
    <main id="main" className="bg-background">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-surface/70 px-4 py-2 text-xs font-medium text-accent shadow-sm shadow-black/5">
              <span className="size-1.5 rounded-full bg-brand" aria-hidden />
              {site.brand.legalLine}
            </div>

            <h1 className="mt-7 text-balance font-serif text-[clamp(2.5rem,5.2vw,4.25rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
              Contact the office
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-foreground/75">
              Call for a quote, a coverage review, or help understanding policy options. If you prefer, stop by during
              office hours or use the directions link below.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`tel:${site.agent.phone.e164}`} variant="primary" size="md" className="gap-2">
                <Phone className="size-4" aria-hidden />
                Call {site.agent.phone.display}
              </ButtonLink>
              <ButtonLink href={site.agent.links.mapCid} variant="outline" size="md" className="gap-2">
                <MapPin className="size-4" aria-hidden />
                Get directions
              </ButtonLink>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-accent/15 bg-surface p-6 shadow-sm shadow-black/5">
                <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                  <Phone className="size-4" aria-hidden />
                  Phone
                </div>
                <div className="mt-2 text-sm text-foreground/75">
                  <a className="hover:text-foreground" href={`tel:${site.agent.phone.e164}`}>
                    {site.agent.phone.display}
                  </a>
                </div>
                <div className="mt-2 text-sm text-foreground/75">{site.agent.notes.join(" ")}</div>
              </div>

              <div className="rounded-3xl border border-accent/15 bg-surface p-6 shadow-sm shadow-black/5">
                <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                  <Timer className="size-4" aria-hidden />
                  Hours
                </div>
                <div className="mt-3 space-y-2 text-sm text-foreground/75">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-foreground">Mon–Fri</span>
                    <span>9:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-foreground">Sat–Sun</span>
                    <span>By appointment</span>
                  </div>
                </div>
                <div className="mt-3 text-sm text-foreground/75">
                  Fax: <span className="text-foreground">{site.agent.fax.display}</span>
                </div>
              </div>

              <div className="rounded-3xl border border-accent/15 bg-surface p-6 shadow-sm shadow-black/5 sm:col-span-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                  <MapPin className="size-4" aria-hidden />
                  Address
                </div>
                <div className="mt-2 text-sm text-foreground/75">{getFullAddressLine()}</div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-accent/10 bg-background p-4">
                    <div className="text-sm font-semibold text-accent">Languages</div>
                    <div className="mt-2 text-sm text-foreground/75">
                      {site.agent.languages.join(", ")}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-accent/10 bg-background p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                      <Star className="size-4" aria-hidden />
                      Reviews
                    </div>
                    <div className="mt-2 text-sm text-foreground/75">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-foreground/75">{site.agent.rating.reviewCount} reviews</span>
                      </div>
                      <div className="mt-2">
                        <a
                          href={site.agent.links.allstateProfile}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-foreground/75 hover:text-foreground"
                        >
                          View profile & reviews
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-xs text-foreground/70">
                  Review count is shown as listed on the Allstate agent profile.
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-accent/15 bg-surface shadow-lg shadow-black/10">
            <div className="aspect-[4/3] w-full">
              <iframe
                title={`Map to ${site.brand.shortName} in ${site.agent.location}`}
                src={site.agent.links.mapEmbed}
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="border-t border-accent/15 p-6">
              <div className="flex flex-col gap-2">
                <div className="text-sm font-semibold text-accent">Need help fast?</div>
                <div className="text-sm text-foreground/75">
                  Call{" "}
                  <a className="hover:text-foreground" href={`tel:${site.agent.phone.e164}`}>
                    {site.agent.phone.display}
                  </a>{" "}
                  and we’ll guide you to the right next step.
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-2">
                <ButtonLink href={`tel:${site.agent.phone.e164}`} variant="primary" size="md">
                  Call now
                </ButtonLink>
                <ButtonLink href="/coverages" variant="outline" size="md">
                  Coverages we offer
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
