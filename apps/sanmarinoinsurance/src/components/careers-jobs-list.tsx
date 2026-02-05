import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CareerRole } from "@/lib/careers";

type CareersJobsListProps = {
  roles: CareerRole[];
};

export function CareersJobsList({ roles }: CareersJobsListProps) {
  const sorted = [...roles].sort((a, b) => {
    const byTeam = a.team.localeCompare(b.team);
    if (byTeam !== 0) return byTeam;
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="mt-10 overflow-hidden rounded-3xl border border-accent/15 bg-surface shadow-sm shadow-black/5">
      <div className="hidden grid-cols-[220px_1.4fr_1fr_140px] items-center gap-6 border-b border-accent/10 bg-surface/70 px-6 py-4 text-xs font-medium uppercase tracking-[0.18em] text-foreground/70 md:grid">
        <div>Team</div>
        <div>Role</div>
        <div>Location</div>
        <div className="text-right"> </div>
      </div>

      {sorted.length === 0 ? (
        <div className="px-6 py-10 text-sm text-foreground/75">No open roles at the moment.</div>
      ) : null}

      <div className="divide-y divide-accent/10">
        {sorted.map((role) => (
          <Link
            key={role.id}
            href={`/careers/jobs/${encodeURIComponent(role.id)}`}
            className="group grid gap-3 px-6 py-5 transition-colors hover:bg-background/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60 md:grid-cols-[220px_1.4fr_1fr_140px] md:items-center md:gap-6"
          >
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">{role.team}</div>
            <div className="font-serif text-xl tracking-[-0.03em] text-foreground group-hover:text-accent">
              {role.title}
            </div>
            <div className="text-sm text-foreground/75">{role.locations.join(" | ")}</div>
            <div className="flex items-center justify-end gap-2 text-sm text-foreground">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-surface px-3 py-1 text-xs font-medium text-accent shadow-sm shadow-black/5">
                View role
                <ArrowUpRight className="size-4" aria-hidden />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
