"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type CareersJobsFiltersProps = {
  offices: string[];
};

function normalizeQuery(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function CareersJobsFilters({ offices }: CareersJobsFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const selectedOffice = searchParams.get("office") || "";
  const selectedQuery = searchParams.get("q") || "";

  const [queryInput, setQueryInput] = useState(selectedQuery);

  // Keep input in sync when users hit back/forward.
  useEffect(() => {
    setQueryInput(selectedQuery);
  }, [selectedQuery]);

  const nextBaseParams = useMemo(() => {
    const next = new URLSearchParams(searchParams.toString());
    next.delete("team");
    return next;
  }, [searchParams]);

  function setParam(name: string, value: string) {
    const next = new URLSearchParams(nextBaseParams);
    const trimmed = value.trim();
    if (trimmed) next.set(name, trimmed);
    else next.delete(name);

    startTransition(() => {
      const qs = next.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname);
    });
  }

  // Debounce typing so we don't spam navigation.
  useEffect(() => {
    const normalized = normalizeQuery(queryInput);
    const handle = setTimeout(() => {
      if (normalized !== normalizeQuery(selectedQuery)) {
        const next = new URLSearchParams(searchParams.toString());
        next.delete("team");
        if (normalized) next.set("q", normalized);
        else next.delete("q");

        startTransition(() => {
          const qs = next.toString();
          router.push(qs ? `${pathname}?${qs}` : pathname);
        });
      }
    }, 250);

    return () => clearTimeout(handle);
  }, [pathname, queryInput, router, searchParams, selectedQuery, startTransition]);

  return (
    <div className="mt-6 grid gap-3 md:grid-cols-[260px_1fr] md:items-center">
      <label className="grid gap-2">
        <span className="sr-only">Office</span>
        <select
          value={selectedOffice}
          onChange={(event) => setParam("office", event.target.value)}
          disabled={isPending}
          className="h-12 w-full rounded-none border border-foreground/35 bg-background/80 px-4 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60 disabled:opacity-70"
        >
          <option value="">All Offices</option>
          {offices.map((office) => (
            <option key={office} value={office}>
              {office}
            </option>
          ))}
        </select>
      </label>

      <label className="relative">
        <span className="sr-only">Search roles</span>
        <Search
          className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-foreground/60"
          aria-hidden
        />
        <input
          value={queryInput}
          onChange={(event) => setQueryInput(event.target.value)}
          disabled={isPending}
          placeholder="Search roles"
          className="h-12 w-full rounded-none border border-foreground/35 bg-background/80 pl-11 pr-4 text-sm text-foreground placeholder:text-foreground/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60 disabled:opacity-70"
        />
      </label>
    </div>
  );
}
