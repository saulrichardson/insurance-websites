"use client";

import { useMemo, useState } from "react";

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
      <div className="border-y border-foreground/20 bg-surface/35">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[380px_1fr] lg:items-start">
            <div>
              <div className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">
                {eyebrow}
              </div>
              <h2 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {title}
              </h2>
              <p className="mt-4 text-pretty text-sm leading-7 text-foreground/75">{description}</p>

              <fieldset className="mt-8 grid gap-2">
                <legend className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">
                  Select a situation
                </legend>
                <div className="grid gap-2">
                  {scenarios.map((scenario) => {
                    const isSelected = scenario.id === selectedId;
                    return (
                      <label
                        key={scenario.id}
                        className={[
                          "group cursor-pointer border px-4 py-3 transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-foreground/60",
                          isSelected
                            ? "border-foreground bg-background/55"
                            : "border-foreground/20 bg-background/25 hover:bg-background/45",
                        ].join(" ")}
                      >
                        <input
                          type="radio"
                          name="scenario"
                          value={scenario.id}
                          checked={isSelected}
                          onChange={() => setSelectedId(scenario.id)}
                          className="sr-only"
                        />
                        <div className="text-sm font-semibold tracking-tight text-foreground">
                          {scenario.label}
                        </div>
                        {scenario.kicker ? (
                          <div className="mt-1 text-xs leading-6 text-foreground/70">{scenario.kicker}</div>
                        ) : null}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            </div>

            <div className="border border-foreground/20 bg-background/35 p-7">
              <div aria-live="polite">
                <div className="flex flex-col gap-4">
                  <div>
                    <div className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">
                      Best for
                    </div>
                    <div className="mt-2 text-pretty text-sm leading-7 text-foreground/75">
                      {selected.summary}
                    </div>
                    {selected.disclaimer ? (
                      <div className="mt-3 text-xs leading-6 text-foreground/70">{selected.disclaimer}</div>
                    ) : null}
                  </div>

                  <div className="grid gap-6 lg:grid-cols-3">
                    <DetailList
                      title="We focus on"
                      items={selected.focus}
                      itemKeyPrefix={`focus-${selected.id}`}
                    />
                    <DetailList
                      title="Common add‑ons"
                      items={selected.addOns}
                      itemKeyPrefix={`addons-${selected.id}`}
                    />
                    <DetailList
                      title="Helpful to prepare"
                      items={selected.toPrepare}
                      itemKeyPrefix={`prepare-${selected.id}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DetailList({
  title,
  items,
  itemKeyPrefix,
}: {
  title: string;
  items: string[];
  itemKeyPrefix: string;
}) {
  return (
    <div className="border border-foreground/20 bg-background/25 p-5">
      <div className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">{title}</div>
      <ul className="mt-3 space-y-2 text-sm leading-7 text-foreground/75">
        {items.map((item, idx) => (
          <li key={bulletKey(itemKeyPrefix, item, idx)} className="flex gap-3">
            <span className="mt-2 size-1.5 shrink-0 bg-foreground" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
