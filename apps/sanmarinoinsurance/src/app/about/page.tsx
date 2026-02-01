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
                San Marino Insurance is led by {site.agent.name}, an Allstate agent who helps local families and
                business owners protect what they’ve worked hard to build.
              </p>
              <p>
                Our office is known for thoughtful guidance on life insurance and financial products—so your
                coverage can support both day‑to‑day protection and long‑range plans.
              </p>
              <p>
                In 2017, Tracy opened the agency here in San Marino after building a career of more than two decades
                in insurance. Today, we keep things simple: clear recommendations, fast follow‑through, and coverage
                that makes sense for your life right now.
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

        <section className="mt-16 border-t border-foreground/20 pt-12">
          <div className="max-w-[62ch]">
            <h2 className="font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
              Meet the team
            </h2>
            <p className="mt-4 text-pretty text-lg leading-8 text-foreground/75">
              A local office runs on details—policy changes, coverage reviews, and quick answers when you need them.
              Here are the people you’ll most often hear from.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <article key={member.name} className="border border-foreground/20 bg-surface/60 p-6">
                <div className="flex items-start gap-4">
                  <div className="grid size-12 shrink-0 place-items-center border border-foreground/25 bg-background/35 font-serif text-lg tracking-[-0.02em] text-foreground">
                    {getInitials(member.name)}
                  </div>
                  <div>
                    <div className="font-serif text-[22px] leading-tight tracking-[-0.03em] text-foreground">
                      {member.name}
                    </div>
                    <div className="mt-1 text-sm font-medium uppercase tracking-[0.22em] text-foreground/70">
                      {member.role}
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-pretty text-[15px] leading-7 text-foreground/75">
                  {member.bio}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {member.focus.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center border border-foreground/25 bg-background/35 px-3 py-1 text-[12px] font-medium uppercase tracking-[0.18em] text-foreground/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}

const teamMembers = [
  {
    name: "Tracy Zhang",
    role: "Agency Owner",
    bio: "Guides families and business owners through decisions around life insurance, long‑term protection, and financial products—always with a focus on clarity and calm, not pressure.",
    focus: ["Life insurance", "Financial products", "Coverage reviews"],
  },
  {
    name: "Melissa Kim",
    role: "Office Manager",
    bio: "Keeps the day‑to‑day running smoothly—helping with billing questions, policy updates, document requests, and making sure every call is answered quickly and thoughtfully.",
    focus: ["Policy changes", "Billing support", "Service requests"],
  },
  {
    name: "Daniel Nguyen",
    role: "Personal Lines Specialist",
    bio: "Helps clients compare options for auto, home, condo, and renters coverage. Known for proactive check‑ins and making sure your policy stays aligned with how you actually live.",
    focus: ["Auto & vehicles", "Home & property", "Bundling"],
  },
  {
    name: "Sofia Rivera",
    role: "Commercial Accounts",
    bio: "Supports small business owners with practical coverage options and fast paperwork—especially certificates of insurance, renewals, and the details that keep projects moving.",
    focus: ["Business insurance", "Certificates", "Renewals"],
  },
] as const;

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
