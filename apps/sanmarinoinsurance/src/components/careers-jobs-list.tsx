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

  const officeFilter = (searchParams.get("office") || "").trim();
  const query = (searchParams.get("q") || "").trim();

  const filtered = roles.filter((role) => {
    if (officeFilter && !role.locations.includes(officeFilter)) return false;
    if (query) {
      const q = normalize(query);
      const haystack = [role.title, role.team, role.locations.join(" ")].join(" ");
      if (!normalize(haystack).includes(q)) return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    const teamIndexA = teams.indexOf(a.team);
    const teamIndexB = teams.indexOf(b.team);
    const normalizedIndexA = teamIndexA === -1 ? Number.MAX_SAFE_INTEGER : teamIndexA;
    const normalizedIndexB = teamIndexB === -1 ? Number.MAX_SAFE_INTEGER : teamIndexB;
    if (normalizedIndexA !== normalizedIndexB) return normalizedIndexA - normalizedIndexB;
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="mt-10 border border-foreground/20 bg-surface/40">
      <div className="hidden grid-cols-[260px_1fr_340px_140px] items-center gap-6 border-b border-foreground/15 px-6 py-4 text-xs font-medium uppercase tracking-[0.18em] text-foreground/70 md:grid">
        <div>Team</div>
        <div>Role</div>
        <div>Location</div>
        <div className="text-right"> </div>
      </div>

      {sorted.length === 0 ? (
        <div className="px-6 py-10 text-sm text-foreground/75">No roles match your filters.</div>
      ) : null}

      <div className="divide-y divide-foreground/15">
        {sorted.map((role) => (
          <Link
            key={role.id}
            href={`/careers/jobs/${encodeURIComponent(role.id)}`}
            className="grid gap-3 px-6 py-5 transition-colors hover:bg-background/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60 md:grid-cols-[260px_1fr_340px_140px] md:items-center md:gap-6"
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
    </div>
  );
}
