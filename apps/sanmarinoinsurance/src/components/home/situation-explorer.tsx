"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

type SituationLink = {
  label: string;
  href: string;
};

type Situation = {
  id: string;
  label: string;
  kicker: string;
  summary: string;
  bullets: string[];
  links: SituationLink[];
};

const situations: Situation[] = [
  {
    id: "new-homeowner",
    label: "New homeowner",
    kicker: "Start with rebuild cost and liability clarity.",
    summary:
      "If you’re buying or refinancing, we’ll focus on a structure that makes sense for the home and your household—then we’ll document the tradeoffs so renewals stay calm.",
    bullets: [
      "Rebuild-cost alignment (so the dwelling limit isn’t guesswork)",
      "Belongings + special items (replacement cost and scheduling)",
      "A practical deductible strategy that keeps coverage usable",
      "Liability limits that match the bigger household plan",
    ],
    links: [
      { label: "Home insurance", href: "/coverages/home" },
      { label: "Umbrella liability", href: "/coverages/umbrella" },
    ],
  },
  {
    id: "family-drivers",
    label: "Family + teen driver",
    kicker: "Balance protection and price as life gets busier.",
    summary:
      "Adding a driver changes the risk profile quickly. We’ll review limits, deductibles, and discount eligibility so savings don’t come from underinsuring.",
    bullets: [
      "Liability limits that protect the household—not just the vehicle",
      "Deductibles that fit your budget without making claims unrealistic",
      "Discount verification (good student, training, safe-driving programs)",
      "Umbrella conversations for higher liability exposure",
    ],
    links: [
      { label: "Auto insurance", href: "/coverages/auto" },
      { label: "Umbrella liability", href: "/coverages/umbrella" },
    ],
  },
  {
    id: "renting-life",
    label: "Renting + busy schedule",
    kicker: "Protect what you own and avoid liability surprises.",
    summary:
      "Renters coverage can be a high-value policy when it’s structured correctly. We’ll focus on belongings, liability, and where “cheap” can accidentally mean “not useful.”",
    bullets: [
      "Personal property coverage that matches what you actually own",
      "Liability structure explained in plain language",
      "Add-ons that matter (where available): water backup, valuables, etc.",
      "Fast proof-of-insurance for landlords when needed",
    ],
    links: [
      { label: "Renters insurance", href: "/coverages/renters" },
      { label: "Auto insurance", href: "/coverages/auto" },
    ],
  },
  {
    id: "planning",
    label: "Planning + protection",
    kicker: "Coordinate coverage with long-term goals.",
    summary:
      "We’ll keep the conversation practical. If life insurance or longer-term planning fits, we’ll frame it as part of a protection plan—not a sales pitch.",
    bullets: [
      "Term vs. permanent options explained without jargon",
      "Beneficiary and life-change review cadence",
      "Long-term care conversations when it’s relevant to the plan",
      "A practical next step for investments/retirement alignment",
    ],
    links: [
      { label: "Life insurance", href: "/coverages/life" },
      { label: "Investments", href: "/coverages/investments" },
    ],
  },
  {
    id: "business-owner",
    label: "Business owner",
    kicker: "Get contract-ready coverage with clean documentation.",
    summary:
      "If you need COIs, additional insured language, or higher limits, we’ll structure coverage around real operations and contract requirements—then keep it organized.",
    bullets: [
      "General liability structure and contract requirement review",
      "COIs and additional insureds handled cleanly and quickly",
      "Commercial auto vs. hired/non-owned conversations (when relevant)",
      "Umbrella/excess layers when higher limits are required",
    ],
    links: [
      { label: "Business insurance", href: "/coverages/business" },
      { label: "Umbrella liability", href: "/coverages/umbrella" },
    ],
  },
  {
    id: "specialty",
    label: "Specialty / harder-to-place",
    kicker: "When standard quotes aren’t a fit, widen the search.",
    summary:
      "Some risks need a specialty-market approach. We’ll be transparent about what’s needed, what timeline to expect, and how to make the submission clean so quoting doesn’t stall.",
    bullets: [
      "Clear problem framing (what’s hard to place and why)",
      "Submission packaging to reduce back-and-forth",
      "Specialty-market access through wholesale channels when needed",
      "Expectation setting: what’s realistic right now vs. later",
    ],
    links: [
      { label: "Business insurance", href: "/coverages/business" },
      { label: "Contact details", href: "/contact" },
    ],
  },
];

export function SituationExplorer() {
  const [selectedId, setSelectedId] = useState(() => situations[0]?.id ?? "");

  const selected = useMemo(() => {
    return situations.find((s) => s.id === selectedId) ?? situations[0];
  }, [selectedId]);

  if (!selected) return null;

  return (
    <Container className="py-16 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div>
          <div className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">
            Deep <span className="text-brand">clarity</span>
          </div>
          <h2 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Explore by situation.
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-lg leading-8 text-foreground/75">
            Choose the closest match. We’ll show what we focus on, what tends to matter, and where to start across our
            products in {site.agent.location}.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {situations.map((situation) => {
              const isSelected = situation.id === selectedId;
              return (
                <button
                  key={situation.id}
                  type="button"
                  onClick={() => setSelectedId(situation.id)}
                  aria-pressed={isSelected}
                  className={[
                    "rounded-full border px-4 py-2 text-sm font-medium shadow-sm shadow-black/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60",
                    isSelected
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-accent/15 bg-surface/70 text-accent hover:bg-surface",
                  ].join(" ")}
                >
                  {situation.label}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/coverages"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/35 bg-transparent px-5 py-2.5 text-sm font-medium text-accent hover:bg-accent/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
            >
              View all coverages
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <a
              href="#quote"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-accent bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground shadow-sm shadow-black/10 hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
            >
              Get a quote
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-accent p-7 shadow-lg shadow-black/15 sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,color-mix(in_srgb,var(--brand)_28%,transparent),transparent_55%),radial-gradient(circle_at_80%_80%,color-mix(in_srgb,var(--background)_22%,transparent),transparent_55%)]" />

          <div className="relative">
            <div className="text-xs font-medium uppercase tracking-[0.22em] text-accent-foreground/75">
              {selected.label}
            </div>
            <h3 className="mt-4 text-balance font-serif text-2xl font-semibold tracking-tight text-accent-foreground sm:text-3xl">
              {selected.kicker}
            </h3>
            <p className="mt-4 text-pretty text-sm leading-7 text-accent-foreground/85">{selected.summary}</p>

            <div className="mt-7 rounded-2xl bg-background/10 p-5">
              <div className="text-xs font-medium uppercase tracking-[0.22em] text-accent-foreground/75">
                What we&apos;ll review
              </div>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-accent-foreground/85">
                {selected.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 bg-accent-foreground/80" aria-hidden />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {selected.links.map((link) => (
                <Link
                  key={`${selected.id}-${link.href}`}
                  href={link.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-medium text-accent shadow-sm shadow-black/10 hover:bg-background/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
                >
                  {link.label}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              ))}
            </div>

            <div className="mt-7 text-xs leading-6 text-accent-foreground/70">
              We’ll confirm availability and eligibility based on underwriting guidelines and your situation.
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
