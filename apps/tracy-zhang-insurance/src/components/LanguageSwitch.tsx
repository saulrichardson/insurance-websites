"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Languages } from "lucide-react";

import { trackMarketingEvent } from "@/components/marketing-events";
import { fromZhPath, isZhPath, toZhPath } from "@/i18n/routing";
import { cn } from "@/lib/cn";

type LanguageSwitchProps = {
  className?: string;
  source: string;
  variant?: "compact" | "menu";
};

export function LanguageSwitch({
  className,
  source,
  variant = "compact",
}: LanguageSwitchProps) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [hash, setHash] = useState("");

  const isZh = isZhPath(pathname);
  const targetPath = isZh ? fromZhPath(pathname) : toZhPath(pathname);
  const targetHref = `${targetPath}${query ? `?${query}` : ""}${hash}`;
  const nextLocale = isZh ? "en-US" : "zh-Hans";
  const label = isZh ? "中文" : "EN";
  const switchLabel = isZh ? "Switch language to English" : "Switch language to Chinese";

  useEffect(() => {
    function syncHash() {
      setQuery(window.location.search.replace(/^\?/, ""));
      setHash(window.location.hash);
    }

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  return (
    <Link
      className={cn(
        "group inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--rail-border)] bg-white/92 p-1 text-xs font-semibold text-[var(--muted)] shadow-[0_8px_24px_rgba(8,38,40,0.08)] transition hover:border-[var(--brand)]/40 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)]/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
        variant === "menu" && "h-12 w-full justify-between px-2",
        className,
      )}
      href={targetHref}
      hrefLang={nextLocale}
      aria-label={switchLabel}
      title={switchLabel}
      onClick={() => {
        trackMarketingEvent("language_switch", {
          source,
          from_locale: isZh ? "zh-Hans" : "en-US",
          to_locale: nextLocale,
          destination: targetHref,
        });
      }}
    >
      <span className="grid size-7 place-items-center rounded-full bg-[var(--surface)] text-[var(--brand-ink)]">
        <Languages className="size-4" aria-hidden />
      </span>
      <span
        className={cn(
          "inline-flex h-8 min-w-14 items-center justify-center rounded-full bg-[var(--ink)] px-3 text-center text-white shadow-sm transition duration-200",
          variant === "menu" && "min-w-24",
        )}
        aria-hidden
      >
        {label}
      </span>
    </Link>
  );
}
