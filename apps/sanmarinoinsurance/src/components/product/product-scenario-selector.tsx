"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/container";

export type ProductScenario = {
  id: string;
  label: string;
  kicker?: string;
  summary: string;
  focus: string[];
  addOns: string[];
  toPrepare: string[];
  disclaimer?: string;
};

type ProductScenarioSelectorProps = {
  eyebrow: string;
  title: string;
  description: string;
  scenarios: ProductScenario[];
  defaultScenarioId?: string;
};

function bulletKey(prefix: string, value: string, idx: number) {
  return `${prefix}-${idx}-${value.slice(0, 24)}`;
}

export function ProductScenarioSelector({
  eyebrow,
  title,
  description,
  scenarios,
  defaultScenarioId,
}: ProductScenarioSelectorProps) {
  const [selectedId, setSelectedId] = useState(() => defaultScenarioId ?? scenarios[0]?.id ?? "");

  const selected = useMemo(() => {
    return scenarios.find((scenario) => scenario.id === selectedId) ?? scenarios[0];
  }, [scenarios, selectedId]);

  if (!selected) return null;

  return (
    <section className="bg-background">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">
              <span className="size-1.5 rounded-full bg-brand" aria-hidden />
              {eyebrow}
            </div>
            <h2 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-pretty text-lg leading-8 text-foreground/75">{description}</p>

            <div className="mt-8">
              <div className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">
                Select a situation
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {scenarios.map((scenario) => {
                  const isSelected = scenario.id === selectedId;
                  return (
                    <button
                      key={scenario.id}
                      type="button"
                      onClick={() => setSelectedId(scenario.id)}
                      aria-pressed={isSelected}
                      className={[
                        "rounded-full border px-4 py-2 text-sm font-medium shadow-sm shadow-black/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60",
                        isSelected
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-accent/15 bg-surface/70 text-accent hover:bg-surface",
                      ].join(" ")}
                    >
                      {scenario.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-accent p-7 shadow-lg shadow-black/15 sm:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,color-mix(in_srgb,var(--brand)_28%,transparent),transparent_55%),radial-gradient(circle_at_80%_80%,color-mix(in_srgb,var(--background)_22%,transparent),transparent_55%)]" />

            <div className="relative" aria-live="polite">
              <div className="text-xs font-medium uppercase tracking-[0.22em] text-accent-foreground/75">
                {selected.label}
              </div>

              <div className="mt-4 text-balance font-serif text-2xl font-semibold tracking-tight text-accent-foreground sm:text-3xl">
                {selected.kicker ?? "What we focus on"}
              </div>

              <div className="mt-4 text-pretty text-sm leading-7 text-accent-foreground/85">
                {selected.summary}
              </div>

              {selected.disclaimer ? (
                <div className="mt-4 text-xs leading-6 text-accent-foreground/70">{selected.disclaimer}</div>
              ) : null}

              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                <DetailList
                  tone="dark"
                  title="We focus on"
                  items={selected.focus}
                  itemKeyPrefix={`focus-${selected.id}`}
                />
                <DetailList
                  tone="dark"
                  title="Common add‑ons"
                  items={selected.addOns}
                  itemKeyPrefix={`addons-${selected.id}`}
                />
                <DetailList
                  tone="dark"
                  title="Helpful to prepare"
                  items={selected.toPrepare}
                  itemKeyPrefix={`prepare-${selected.id}`}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function DetailList({
  title,
  items,
  itemKeyPrefix,
  tone = "light",
}: {
  title: string;
  items: string[];
  itemKeyPrefix: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={[
        "rounded-2xl border p-5",
        tone === "dark"
          ? "border-accent-foreground/15 bg-background/10"
          : "border-accent/15 bg-surface/70 shadow-sm shadow-black/5",
      ].join(" ")}
    >
      <div
        className={[
          "text-xs font-medium uppercase tracking-[0.22em]",
          tone === "dark" ? "text-accent-foreground/75" : "text-foreground/70",
        ].join(" ")}
      >
        {title}
      </div>
      <ul
        className={[
          "mt-3 space-y-2 text-sm leading-7",
          tone === "dark" ? "text-accent-foreground/85" : "text-foreground/75",
        ].join(" ")}
      >
        {items.map((item, idx) => (
          <li key={bulletKey(itemKeyPrefix, item, idx)} className="flex gap-3">
            <span
              className={[
                "mt-2 size-1.5 shrink-0 rounded-full",
                tone === "dark" ? "bg-accent-foreground/80" : "bg-brand",
              ].join(" ")}
              aria-hidden
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
