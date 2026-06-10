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
      aria-label={isZh ? "Switch language to English" : "切换到中文"}
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
          "grid grid-cols-2 rounded-full bg-[var(--surface-muted)]/75 p-0.5",
          variant === "menu" ? "min-w-40" : "min-w-28",
        )}
        aria-hidden
      >
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-center transition duration-200",
            !isZh
              ? "bg-[var(--ink)] text-white shadow-sm"
              : "text-[var(--muted)] group-hover:text-[var(--ink)]",
          )}
        >
          EN
        </span>
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-center transition duration-200",
            isZh
              ? "bg-[var(--ink)] text-white shadow-sm"
              : "text-[var(--muted)] group-hover:text-[var(--ink)]",
          )}
        >
          中文
        </span>
      </span>
    </Link>
  );
}
