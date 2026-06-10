"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Phone, ShieldCheck } from "lucide-react";
import type { MarketProfile, Office } from "@insurance-websites/domain";

import { site } from "@/config/site";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { TrackedAnchor, TrackedLink } from "@/components/marketing-events";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/Container";
import {
  isZhPath,
  localizedHref,
  type Locale,
} from "@/i18n/routing";
import { cn } from "@/lib/cn";

export function Header({
  market,
  office,
}: {
  market: MarketProfile;
  office: Office;
}) {
  const pathname = usePathname();
  const locale: Locale = isZhPath(pathname) ? "zh" : "en";
  const isZh = locale === "zh";
  const isLocal = market.domainRole === "local";
  const primaryNav = getPrimaryNav(market, locale);
  const headerSubline = isLocal
    ? isZh
      ? `${market.label} 中文保险咨询。`
      : `${market.label} coverage guidance for nearby households and businesses.`
    : isZh
      ? "加州家庭和企业的中文保险咨询。"
      : "California coverage guidance for households and businesses.";
  const trackingSource = isLocal
    ? `tracy_zhang_insurance_${market.id}_header`
    : "tracy_zhang_insurance_header";
  const quoteHref = localizedHref("/contact#quote", locale);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--rail-border)] bg-[#fbfaf4]/95 shadow-[0_1px_0_rgba(18,56,58,0.05)] backdrop-blur-xl">
      <Container className="py-3">
        <div className="flex items-center justify-between gap-4">
          <Link
            href={localizedHref("/", locale)}
            className="group flex min-w-0 items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)]/20"
          >
            <span className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-xl border border-[#0e1941]/15 bg-white shadow-[0_10px_24px_rgba(8,38,40,0.18)] transition-transform duration-200 group-hover:-translate-y-0.5">
              <Image
                src="/tz-logo-cropped.png"
                alt=""
                width={96}
                height={96}
                className="size-full object-cover"
                priority
              />
            </span>
            <div className="min-w-0 leading-tight">
              <div className="truncate text-[15px] font-semibold text-[var(--ink)]">
                {site.name}
              </div>
              <div className="hidden text-xs text-[var(--muted)] sm:block">
                {headerSubline}
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {primaryNav.map((link) => (
              <TrackedLink
                key={link.href}
                href={localizedHref(link.href, locale)}
                eventName="nav_click"
                eventProps={{ source: trackingSource, destination: link.href }}
                className={cn(
                  "text-sm font-medium text-[var(--muted)] hover:text-[var(--ink)] hover:underline underline-offset-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)]/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
                )}
              >
                {link.label}
              </TrackedLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <LanguageSwitch source={`${trackingSource}_desktop`} />
            <TrackedAnchor
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--ink)] hover:underline underline-offset-8"
              href={`tel:${office.phoneE164}`}
              eventName="phone_click"
              eventProps={{ source: trackingSource, phone: office.phoneDisplay }}
            >
              <Phone className="size-4" aria-hidden />
              {isZh ? "致电" : "Call"}
            </TrackedAnchor>
            <TrackedLink
              className={buttonClasses({
                variant: "primary",
                size: "sm",
                className: "shadow-[0_12px_28px_rgba(8,38,40,0.18)]",
              })}
              href={quoteHref}
              eventName="quote_click"
              eventProps={{ source: trackingSource }}
            >
              {isZh ? "获取报价" : "Get a quote"}
            </TrackedLink>
          </div>

          <details className="relative lg:hidden">
            <summary
              className={cn(
                buttonClasses({ variant: "outline", size: "sm" }),
                "list-none [&::-webkit-details-marker]:hidden",
              )}
            >
              <Menu className="size-4" aria-hidden />
              <span>{isZh ? "菜单" : "Menu"}</span>
            </summary>
            <div className="absolute right-0 mt-2 w-[min(92vw,360px)] rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
              <div className="grid gap-1 p-1">
                {primaryNav.map((link) => (
                  <TrackedLink
                    key={link.href}
                    href={localizedHref(link.href, locale)}
                    eventName="nav_click"
                    eventProps={{
                      source: `${trackingSource}_mobile_menu`,
                      destination: link.href,
                    }}
                    className="rounded-xl px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100"
                  >
                    {link.label}
                  </TrackedLink>
                ))}
              </div>
              <div className="mt-2 grid gap-2 p-1">
                <LanguageSwitch
                  source={`${trackingSource}_mobile_menu`}
                  variant="menu"
                />
                <TrackedAnchor
                  className={buttonClasses({ variant: "outline", size: "md" })}
                  href={`tel:${office.phoneE164}`}
                  eventName="phone_click"
                  eventProps={{
                    source: `${trackingSource}_mobile_menu`,
                    phone: office.phoneDisplay,
                  }}
                >
                  {isZh ? "致电" : "Call"} {office.phoneDisplay}
                </TrackedAnchor>
                <TrackedLink
                  className={buttonClasses({ variant: "primary", size: "md" })}
                  href={quoteHref}
                  eventName="quote_click"
                  eventProps={{ source: `${trackingSource}_mobile_menu` }}
                >
                  {isZh ? "获取报价" : "Get a quote"}
                </TrackedLink>
              </div>
            </div>
          </details>
        </div>

        <div className="mt-3 hidden border-t border-[var(--rail-border)]/70 pt-2.5 lg:block">
          <div
            aria-label="Carrier markets"
            className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-[var(--rail-border)]/75 bg-[linear-gradient(135deg,#ffffff_0%,#fffdf8_58%,#f2eee4_100%)] p-2.5 shadow-[0_12px_34px_rgba(8,38,40,0.065)]"
          >
            <div className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#0e1941]/15 bg-white px-3 text-[#0e1941] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_22px_rgba(14,25,65,0.08)]">
              <ShieldCheck className="size-4" aria-hidden />
              <span className="font-serif text-xl leading-none">Allstate</span>
            </div>

            <CarrierNameList
              eyebrow={isZh ? "保险市场" : "Markets"}
              carriers={site.carrierMarkets.filter(
                (carrier) => carrier.relationship !== "allstate",
              )}
            />
          </div>
        </div>
      </Container>
    </header>
  );
}

function CarrierNameList({
  eyebrow,
  carriers,
}: {
  eyebrow: string;
  carriers: Array<(typeof site.carrierMarkets)[number]>;
}) {
  return (
    <div className="flex min-h-10 min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1 rounded-xl bg-white/45 px-3 py-2 text-sm leading-6 text-[var(--muted)]">
      <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--brand-ink)]/75">
        {eyebrow}
      </span>
      {carriers.map((carrier, index) => (
        <span
          key={carrier.name}
          className={cn(
            "inline-flex items-center gap-2 whitespace-nowrap",
            carrier.relationship === "specialty-access" &&
              "font-medium text-[var(--brand-ink)]",
          )}
        >
          <span>{carrier.name}</span>
          {index < carriers.length - 1 ? (
            <span className="text-[var(--rail-border)]" aria-hidden>
              /
            </span>
          ) : null}
        </span>
      ))}
    </div>
  );
}

function getPrimaryNav(market: MarketProfile, locale: Locale): Array<{ href: string; label: string }> {
  const isZh = locale === "zh";
  const locationLink =
    market.domainRole === "local"
      ? { href: `/locations/${market.id}`, label: isZh ? "本地办公室" : "Location" }
      : { href: "/locations", label: isZh ? "办公室" : "Offices" };

  return [
    { href: "/#coverage", label: isZh ? "保险范围" : "Coverage" },
    { href: "/products", label: isZh ? "保险产品" : "Products" },
    { href: "/stories", label: isZh ? "保险指南" : "Guidance" },
    { href: "/#business", label: isZh ? "商业保险" : "Business" },
    locationLink,
    { href: "/contact", label: isZh ? "联系我们" : "Contact" },
  ];
}
