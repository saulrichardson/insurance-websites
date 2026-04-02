import { MapPin, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

function formatAddress(office: (typeof site.offices)[number]) {
  const { street, city, region, postalCode } = office.address;
  return `${street}, ${city}, ${region} ${postalCode}`;
}

export default function Home() {
  return (
    <main
      id="main"
      className="min-h-screen bg-[radial-gradient(circle_at_top_left,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_35%),linear-gradient(180deg,var(--background),color-mix(in_srgb,var(--background)_88%,white))]"
    >
      <Container className="flex min-h-screen items-center py-10 sm:py-14">
        <section className="w-full overflow-hidden rounded-[32px] border border-accent/10 bg-surface/92 shadow-[0_30px_80px_rgba(10,20,40,0.08)]">
          <div className="grid gap-10 px-6 py-8 sm:px-10 sm:py-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:px-14">
            <div className="flex flex-col justify-between">
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.28em] text-foreground/55">
                  Simplified site
                </div>
                <h1 className="mt-5 max-w-xl text-balance font-serif text-[clamp(3.2rem,7vw,5.6rem)] leading-[0.9] tracking-[-0.04em] text-foreground">
                  {site.agent.name}
                </h1>
                <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-foreground/72">
                  We&apos;re keeping the website minimal for now. For quotes, policy service, or office
                  questions, call us directly or use the Allstate profile below.
                </p>
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`tel:${site.agent.phone.e164}`}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-accent bg-accent px-5 text-sm font-medium text-accent-foreground shadow-sm shadow-black/10 hover:bg-accent/92 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
                >
                  <Phone className="size-4" aria-hidden />
                  Call {site.agent.phone.display}
                </a>
                <ButtonLink href={site.agent.links.allstateProfile} variant="outline" size="md">
                  View Allstate profile
                </ButtonLink>
              </div>
            </div>

            <div className="grid gap-4">
              {site.offices.map((office) => (
                <article
                  key={office.id}
                  className="rounded-[24px] border border-accent/10 bg-background/70 p-5 shadow-sm shadow-black/5"
                >
                  <div className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/55">
                    {office.label}
                  </div>
                  <div className="mt-3 text-2xl font-serif text-foreground">{office.location}</div>
                  <div className="mt-4 space-y-3 text-sm leading-6 text-foreground/72">
                    <div className="flex gap-3">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                      <a
                        href={office.links.mapCid}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-foreground"
                      >
                        {formatAddress(office)}
                      </a>
                    </div>
                    <div className="flex gap-3">
                      <Phone className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                      <a href={`tel:${office.phone.e164}`} className="hover:text-foreground">
                        {office.phone.display}
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
