import { MapPin, Phone, Star, Timer } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { StarRating } from "@/components/star-rating";
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
            <div className="inline-flex items-center gap-2 border border-foreground/25 bg-surface/50 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/80">
              {site.brand.legalLine}
            </div>

            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Contact the office
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-foreground/75">
              Call for a quote by phone, a coverage review, or help understanding policy options. If you prefer,
              stop by during office hours or use the directions link below.
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
              <div className="border border-foreground/20 bg-surface/60 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
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

              <div className="border border-foreground/20 bg-surface/60 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
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

              <div className="border border-foreground/20 bg-surface/60 p-5 sm:col-span-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <MapPin className="size-4" aria-hidden />
                  Address
                </div>
                <div className="mt-2 text-sm text-foreground/75">{getFullAddressLine()}</div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="border border-foreground/20 bg-background/40 p-4">
                    <div className="text-sm font-semibold text-foreground">Languages</div>
                    <div className="mt-2 text-sm text-foreground/75">
                      {site.agent.languages.join(", ")}
                    </div>
                  </div>
                  <div className="border border-foreground/20 bg-background/40 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Star className="size-4" aria-hidden />
                      Reviews
                    </div>
                    <div className="mt-2 text-sm text-foreground/75">
                      <div className="flex items-center gap-2">
                        <StarRating rating={site.agent.rating.score} outOf={site.agent.rating.outOf} />
                        <span className="text-sm text-foreground/75">
                          ({site.agent.rating.reviewCount})
                        </span>
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
                  Rating and review count are shown as listed on the Allstate agent profile.
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden border border-foreground/20 bg-surface/60">
            <div className="aspect-[4/3] w-full">
              <iframe
                title={`Map to ${site.brand.shortName} in ${site.agent.location}`}
                src={site.agent.links.mapEmbed}
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="border-t border-foreground/20 p-6">
              <div className="flex flex-col gap-2">
                <div className="text-sm font-semibold text-foreground">Need help fast?</div>
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
                <ButtonLink href="/insurance" variant="outline" size="md">
                  Insurance we offer
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
