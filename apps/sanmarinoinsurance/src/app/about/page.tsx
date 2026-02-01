import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { getFullAddressLine, site } from "@/lib/site";

export const metadata = {
  title: "About",
  description: `Learn about ${site.agent.name} and the ${site.brand.shortName} office in ${site.agent.location}.`,
};

export default function AboutPage() {
  return (
    <main id="main" className="bg-background">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 border border-foreground/25 bg-surface/50 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/80">
              {site.brand.legalLine}
            </div>

            <h1 className="mt-7 text-balance font-serif text-[clamp(2.5rem,5.2vw,4.25rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
              About the agency
            </h1>

            <div className="mt-6 space-y-5 text-pretty text-lg leading-8 text-foreground/75">
              <p>
                I’ve gotten to know many local families as an Allstate agent in San Marino. I enjoy being a part of
                the community, and building local relationships is one of the best parts of my job.
              </p>
              <p>
                Part of what I like best about my job is that I can offer customers options for a wide variety of
                coverage and services. You can depend on me to help you look at the big picture.
              </p>
              <p>
                I’m committed to helping San Marino residents assess their immediate and long‑term needs and choose
                options that help them achieve their goals. If you’re already a customer, I’m always ready to review
                coverage and make adjustments to fit changing needs.
              </p>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`tel:${site.agent.phone.e164}`} variant="primary" size="md" className="gap-2">
                <Phone className="size-4" aria-hidden />
                Call {site.agent.phone.display}
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline" size="md">
                Contact details
              </ButtonLink>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="border border-foreground/20 bg-surface/60 p-5">
                <div className="text-sm font-semibold text-foreground">Office address</div>
                <div className="mt-2 text-sm text-foreground/75">{getFullAddressLine()}</div>
                <div className="mt-4">
                  <ButtonLink href={site.agent.links.mapCid} variant="outline" size="sm" className="gap-2">
                    <MapPin className="size-4" aria-hidden />
                    Directions
                  </ButtonLink>
                </div>
              </div>

              <div className="border border-foreground/20 bg-surface/60 p-5">
                <div className="text-sm font-semibold text-foreground">Languages</div>
                <div className="mt-2 text-sm text-foreground/75">{site.agent.languages.join(", ")}</div>
                <div className="mt-4 text-xs text-foreground/70">
                  We can support multi‑language conversations when reviewing coverage options.
                </div>
              </div>
            </div>
          </div>

          <div className="border border-foreground/20 bg-surface/60 p-6 sm:p-7">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
              {site.agent.name}
            </div>
            <div className="mt-2 text-sm text-foreground/75">{site.agent.location}</div>

            <div className="mt-6 overflow-hidden border border-foreground/20 bg-background/35">
              <Image
                src={site.agent.images.portrait}
                alt={`Photo of ${site.agent.name}`}
                width={900}
                height={900}
                className="aspect-[4/3] w-full object-cover"
                priority
              />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="border border-foreground/20 bg-background/30 p-4">
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/75">
                  Phone
                </div>
                <div className="mt-2 text-sm text-foreground/75">{site.agent.phone.display}</div>
              </div>
              <div className="border border-foreground/20 bg-background/30 p-4">
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/75">
                  Address
                </div>
                <div className="mt-2 text-sm text-foreground/75">{getFullAddressLine()}</div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/insurance" variant="primary" size="sm">
                View products
              </ButtonLink>
              <ButtonLink href={site.agent.links.allstateProfile} variant="outline" size="sm">
                Allstate profile
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

