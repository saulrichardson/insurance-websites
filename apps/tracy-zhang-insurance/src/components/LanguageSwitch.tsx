"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [suffix, setSuffix] = useState("");
  const zh = isZhPath(pathname);
  useEffect(() => {
    const sync = () => setSuffix(window.location.search + window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  const path = zh ? fromZhPath(pathname) : toZhPath(pathname);
  const target = path + suffix;
  return (
    <Link
      className={cn(
        "language-link",
        variant === "menu" && "language-link-menu",
        className,
      )}
      href={target}
      hrefLang={zh ? "en-US" : "zh-Hans"}
      aria-label={
        zh ? "Switch language to English" : "Switch language to Chinese"
      }
      title={zh ? "Switch language to English" : "Switch language to Chinese"}
      onClick={() =>
        trackMarketingEvent("language_switch", {
          source,
          from_locale: zh ? "zh-Hans" : "en-US",
          to_locale: zh ? "en-US" : "zh-Hans",
          destination: target,
        })
      }
    >
      <span>{zh ? "中文" : "EN"}</span>
      <span aria-hidden="true" className="language-hint">
        ↗
      </span>
    </Link>
  );
}
