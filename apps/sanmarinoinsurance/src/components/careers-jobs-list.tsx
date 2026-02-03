"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import type { CareerRole } from "@/lib/careers";

type CareersJobsListProps = {
  teams: string[];
  roles: CareerRole[];
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export function CareersJobsList({ teams, roles }: CareersJobsListProps) {
  const searchParams = useSearchParams();

  const teamFilter = (searchParams.get("team") || "").trim();
  const officeFilter = (searchParams.get("office") || "").trim();
  const query = (searchParams.get("q") || "").trim();

  const filtered = roles.filter((role) => {
    if (teamFilter && role.team !== teamFilter) return false;
    if (officeFilter && !role.locations.includes(officeFilter)) return false;
    if (query) {
      const q = normalize(query);
      const haystack = [role.title, role.team, role.locations.join(" ")].join(" ");
      if (!normalize(haystack).includes(q)) return false;
    }
    return true;
  });

  const rolesByTeam = filtered.reduce<Record<string, CareerRole[]>>((acc, role) => {
    (acc[role.team] ||= []).push(role);
    return acc;
  }, {});

  const visibleTeams = teams.filter((team) => rolesByTeam[team]?.length);

  return (
    <div className="mt-10 border border-foreground/20 bg-surface/40">
      <div className="hidden grid-cols-[260px_1fr_340px_140px] items-center gap-6 border-b border-foreground/15 px-6 py-4 text-xs font-medium uppercase tracking-[0.18em] text-foreground/70 md:grid">
        <div>Team</div>
        <div>Role</div>
        <div>Location</div>
        <div className="text-right"> </div>
      </div>

      {visibleTeams.length === 0 ? (
        <div className="px-6 py-10 text-sm text-foreground/75">No roles match your filters.</div>
      ) : null}

      <div className="divide-y divide-foreground/15">
        {visibleTeams.map((team) => {
          const teamRoles = rolesByTeam[team] || [];
          const countLabel = teamRoles.length === 1 ? "1 Open Role" : `${teamRoles.length} Open Roles`;

          return (
            <details key={team} open className="group">
              <summary className="cursor-pointer px-6 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div className="font-serif text-2xl tracking-[-0.03em] text-foreground">{team}</div>
                  <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">{countLabel}</div>
                </div>
              </summary>

              <div className="border-t border-foreground/15">
                {teamRoles.map((role) => (
                  <Link
                    key={role.id}
                    href={`/careers/jobs/${encodeURIComponent(role.id)}`}
                    className="grid gap-3 border-b border-foreground/10 px-6 py-5 transition-colors hover:bg-background/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60 md:grid-cols-[260px_1fr_340px_140px] md:items-center md:gap-6"
                  >
                    <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">{role.team}</div>
                    <div className="font-serif text-xl tracking-[-0.03em] text-foreground">{role.title}</div>
                    <div className="text-sm text-foreground/75">{role.locations.join(" | ")}</div>
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
  );
}

