import {
  BriefcaseBusiness,
  Car,
  Home as HomeIcon,
  LifeBuoy,
  Phone,
  Sailboat,
  Shield,
} from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata = {
  title: "Insurance",
  description: `Auto, home, renters, condo, life, business, motorcycle, boat, and ATV insurance options in ${site.agent.location}.`,
};

const iconByOfferingId: Record<string, ReactNode> = {
  auto: <Car className="size-5" aria-hidden />,
  home: <HomeIcon className="size-5" aria-hidden />,
  condo: <Shield className="size-5" aria-hidden />,
  renters: <Shield className="size-5" aria-hidden />,
  life: <LifeBuoy className="size-5" aria-hidden />,
  business: <BriefcaseBusiness className="size-5" aria-hidden />,
  motorcycle: <Car className="size-5" aria-hidden />,
  boat: <Sailboat className="size-5" aria-hidden />,
  atv: <Car className="size-5" aria-hidden />,
};

export default function InsurancePage() {
  return (
    <main id="main" className="bg-background">
      <Container className="py-16 sm:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 border border-foreground/25 bg-surface/50 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/80">
              Coverage options through {site.brand.legalLine}
            </div>
            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Insurance we offer
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-foreground/75">
              Explore coverage types we can help with. If you’re not sure what you need, call the office and we’ll
              walk through your situation and explain options in plain language.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={`tel:${site.agent.phone.e164}`} variant="primary" size="md" className="gap-2">
              <Phone className="size-4" aria-hidden />
              Call {site.agent.phone.display}
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline" size="md">
              Contact details
            </ButtonLink>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {site.offerings.map((o) => (
            <section
              key={o.id}
              className="border border-foreground/20 bg-surface/60 p-6"
              aria-labelledby={`coverage-${o.id}`}
            >
              <div className="flex items-center gap-3">
                <div className="grid size-11 place-items-center border border-foreground/20 bg-background/40 text-foreground">
                  {iconByOfferingId[o.id] ?? <Shield className="size-5" aria-hidden />}
                </div>
                <div>
                  <h2
                    id={`coverage-${o.id}`}
                    className="text-lg font-semibold tracking-tight text-foreground"
                  >
                    {o.name} insurance
                  </h2>
                  <div className="mt-1 text-sm text-foreground/75">{o.shortDescription}</div>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-sm font-semibold text-foreground">What we’ll cover in a quick call</div>
                <ul className="mt-3 space-y-2 text-sm text-foreground/75">
                  {o.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span className="mt-1 size-1.5 shrink-0 bg-foreground" aria-hidden />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href="/contact" variant="primary" size="sm">
                  Request a quote
                </ButtonLink>
                <ButtonLink href={`tel:${site.agent.phone.e164}`} variant="outline" size="sm">
                  Call the office
                </ButtonLink>
              </div>
            </section>
          ))}
        </div>

        <section className="mt-12 border border-foreground/20 bg-background/35 p-8 sm:p-10">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Not sure which coverage you need?
          </h2>
          <p className="mt-3 max-w-3xl text-pretty text-foreground/75">
            Tell us what you’re protecting (car, home, condo, renters, family, or business), and we’ll help you
            narrow down options. We can also review existing coverage to see what still fits and what should be
            updated.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={`tel:${site.agent.phone.e164}`} variant="primary" size="md" className="gap-2">
              <Phone className="size-4" aria-hidden />
              Call {site.agent.phone.display}
            </ButtonLink>
            <ButtonLink href={site.agent.links.allstateProfile} variant="outline" size="md">
              View Allstate profile
            </ButtonLink>
          </div>
          <div className="mt-4 text-xs text-foreground/70">
            Discounts and eligibility vary by product and customer situation—ask us what applies to you.
          </div>
        </section>
      </Container>
    </main>
  );
}
