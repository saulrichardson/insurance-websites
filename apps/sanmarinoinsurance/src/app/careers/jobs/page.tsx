import Link from "next/link";
import { ChevronLeft, ArrowUpRight } from "lucide-react";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { careerRoles } from "@/lib/careers";
import { CareersJobsFilters } from "@/components/careers-jobs-filters";
import { site } from "@/lib/site";

export const metadata = {
  title: "Jobs",
  description: `Open roles at ${site.brand.shortName}.`,
};

type SearchParams = {
  team?: string;
  office?: string;
  q?: string;
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export default function CareersJobsPage({ searchParams }: { searchParams?: SearchParams }) {
  const teamFilter = (searchParams?.team || "").trim();
  const officeFilter = (searchParams?.office || "").trim();
  const query = (searchParams?.q || "").trim();

  const roles = careerRoles.filter((role) => {
    if (teamFilter && role.team !== teamFilter) return false;
    if (officeFilter && !role.locations.includes(officeFilter)) return false;
    if (query) {
      const q = normalize(query);
      const haystack = [role.title, role.team, role.locations.join(" ")].join(" ");
      if (!normalize(haystack).includes(q)) return false;
    }
    return true;
  });

  const teams = Array.from(new Set(careerRoles.map((role) => role.team))).sort((a, b) =>
    a.localeCompare(b),
  );
  const offices = Array.from(new Set(careerRoles.flatMap((role) => role.locations))).sort((a, b) =>
    a.localeCompare(b),
  );

  const rolesByTeam = roles.reduce<Record<string, typeof roles>>((acc, role) => {
    (acc[role.team] ||= []).push(role);
    return acc;
  }, {});

  const visibleTeams = teams.filter((t) => rolesByTeam[t]?.length);

  return (
    <main id="main" className="bg-background">
      <Container className="py-16 sm:py-20">
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-sm text-foreground/75 underline underline-offset-4 hover:text-foreground"
        >
          <ChevronLeft className="size-4" aria-hidden />
          Back to Careers
        </Link>

        <div className="mt-8">
          <h1 className="font-serif text-[clamp(2.3rem,4.6vw,3.4rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
            Join our team
          </h1>
          <div className="mt-4 max-w-[70ch] text-pretty text-lg leading-8 text-foreground/75">
            Explore open roles at our San Marino agency. Filter by team, office, or search by title.
          </div>
        </div>

        <Suspense
          fallback={
            <div className="mt-6 grid gap-3 md:grid-cols-[260px_260px_1fr]">
              <div className="h-12 w-full border border-foreground/35 bg-background/80" />
              <div className="h-12 w-full border border-foreground/35 bg-background/80" />
              <div className="h-12 w-full border border-foreground/35 bg-background/80" />
            </div>
          }
        >
          <CareersJobsFilters teams={teams} offices={offices} />
        </Suspense>

        <div className="mt-10 border border-foreground/20 bg-surface/40">
          <div className="hidden grid-cols-[260px_1fr_340px_140px] items-center gap-6 border-b border-foreground/15 px-6 py-4 text-xs font-medium uppercase tracking-[0.18em] text-foreground/70 md:grid">
            <div>Team</div>
            <div>Role</div>
            <div>Location</div>
            <div className="text-right"> </div>
          </div>

          {visibleTeams.length === 0 ? (
            <div className="px-6 py-10 text-sm text-foreground/75">
              No roles match your filters.
            </div>
          ) : null}

          <div className="divide-y divide-foreground/15">
            {visibleTeams.map((team) => {
              const teamRoles = rolesByTeam[team] || [];
              const countLabel = teamRoles.length === 1 ? "1 Open Role" : `${teamRoles.length} Open Roles`;

              return (
                <details key={team} open className="group">
                  <summary className="cursor-pointer list-none px-6 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <div className="font-serif text-2xl tracking-[-0.03em] text-foreground">
                        {team}
                      </div>
                      <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">
                        {countLabel}
                      </div>
                    </div>
                  </summary>

                  <div className="border-t border-foreground/15">
                    {teamRoles.map((role) => (
                      <Link
                        key={role.id}
                        href={`/careers/jobs/${encodeURIComponent(role.id)}`}
                        className="grid gap-3 border-b border-foreground/10 px-6 py-5 transition-colors hover:bg-background/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60 md:grid-cols-[260px_1fr_340px_140px] md:items-center md:gap-6"
                      >
                        <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">
                          {role.team}
                        </div>
                        <div className="font-serif text-xl tracking-[-0.03em] text-foreground">
                          {role.title}
                        </div>
                        <div className="text-sm text-foreground/75">
                          {role.locations.join(" | ")}
                        </div>
                        <div className="flex items-center justify-end gap-2 text-sm text-foreground">
                          <span className="underline underline-offset-4">Apply</span>
                          <ArrowUpRight className="size-4" aria-hidden />
                        </div>
                      </Link>
                    ))}
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      </Container>
    </main>
  );
}
