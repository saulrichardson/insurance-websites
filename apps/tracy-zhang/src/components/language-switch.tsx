"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Languages } from "lucide-react";

import { trackMarketingEvent } from "@/components/marketing-events";
import { fromZhPath, isZhPath, toZhPath } from "@/i18n/routing";

type LanguageSwitchProps = {
  className?: string;
  source: string;
  variant?: "compact" | "menu";
};

export function LanguageSwitch({
  className = "",
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
  const isMenu = variant === "menu";

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
      href={targetHref}
      hrefLang={nextLocale}
      aria-label={isZh ? "Switch language to English" : "切换到中文"}
      className={[
        "group inline-flex shrink-0 items-center gap-2 rounded-full border border-accent/20 bg-surface/95 p-1 text-xs font-semibold text-muted shadow-sm shadow-black/5 transition hover:border-brand/50 hover:bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60",
        isMenu ? "h-12 w-full justify-between px-2" : "",
        className,
      ].filter(Boolean).join(" ")}
      onClick={() => {
        trackMarketingEvent("language_switch", {
          source,
          from_locale: isZh ? "zh-Hans" : "en-US",
          to_locale: nextLocale,
          destination: targetHref,
        });
      }}
    >
      <span className="grid size-7 place-items-center rounded-full bg-background text-accent">
        <Languages className="size-4" aria-hidden />
      </span>
      <span
        className={[
          "grid grid-cols-2 rounded-full bg-background p-0.5",
          isMenu ? "min-w-40" : "min-w-28",
        ].join(" ")}
        aria-hidden
      >
        <span
          className={[
            "rounded-full px-2.5 py-1 text-center transition duration-200",
            !isZh ? "bg-accent text-accent-foreground shadow-sm" : "text-muted group-hover:text-accent",
          ].join(" ")}
        >
          EN
        </span>
        <span
          className={[
            "rounded-full px-2.5 py-1 text-center transition duration-200",
            isZh ? "bg-accent text-accent-foreground shadow-sm" : "text-muted group-hover:text-accent",
          ].join(" ")}
        >
          中文
        </span>
      </span>
    </Link>
  );
}
