"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ExternalLink, Menu, Phone, X } from "lucide-react";

import { EmailButton, ScheduleButton } from "@/components/contact-actions";
import { LanguageSwitch } from "@/components/language-switch";
import { trackMarketingEvent } from "@/components/marketing-events";
import { Container } from "@/components/ui/container";
import {
  isZhPath,
  localizedHref,
} from "@/i18n/routing";
import { site } from "@/lib/site";

const businessSite = "https://tracyzhanginsurance.com";

const navItems = [
  { href: "/#approach", label: "Profile" },
  { href: "/#coverage-help", label: "When to call" },
  { href: "/#offices", label: "Offices" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isZh = isZhPath(pathname);
  const locale = isZh ? "zh" : "en";
  const quoteHref = `${businessSite}${isZh ? "/zh" : ""}/contact#quote`;
  const localizedNav = navItems.map((item) => ({
    href: localizedHref(item.href, locale),
    label: getNavLabel(item.label, isZh),
  }));

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-accent/10 bg-background/88 text-foreground backdrop-blur-sm">
      <Container className="flex h-20 items-center justify-between">
        <Link
          href={localizedHref("/", locale)}
          className="group inline-flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60"
          aria-label={site.agent.name}
        >
          <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-full border border-accent/20 bg-surface shadow-sm shadow-black/5">
            <Image
              src="/tz-logo-cropped.png"
              alt=""
              width={88}
              height={88}
              className="size-full object-cover"
              priority
            />
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-[28px] font-semibold text-accent sm:text-[32px]">
              {site.agent.name}
            </span>
            <span className="hidden text-xs font-medium text-foreground/60 sm:block">
              {isZh ? "加州中文保险顾问" : "California insurance advisor"}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {localizedNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-accent hover:text-accent/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitch source="tracy_header_desktop" />
          <a
            href={`tel:${site.agent.officePhone.e164}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60"
            onClick={() =>
              trackMarketingEvent("phone_click", {
                source: "tracy_header",
                phone: site.agent.officePhone.display,
              })
            }
          >
            <Phone className="size-4" aria-hidden />
            {site.agent.officePhone.display}
          </a>
          <a
            href={quoteHref}
            className="inline-flex h-10 items-center justify-center rounded-full border border-accent bg-accent px-5 text-sm font-medium text-accent-foreground shadow-sm shadow-black/10 hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60"
            onClick={() =>
              trackMarketingEvent("cross_site_click", {
                source: "tracy_header_cta",
                destination: quoteHref,
              })
            }
          >
            {isZh ? "中文保险帮助" : "Get insurance help"}
          </a>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-accent/25 bg-surface p-2 text-accent shadow-sm shadow-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60 md:hidden"
          aria-label={isOpen ? (isZh ? "关闭菜单" : "Close menu") : isZh ? "打开菜单" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        </button>
      </Container>

      {isOpen ? (
        <div className="border-t border-accent/10 bg-background md:hidden">
          <Container className="grid gap-2 py-4">
            {localizedNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl bg-surface px-4 py-3 text-sm font-medium text-accent"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <LanguageSwitch
              className="rounded-2xl"
              source="tracy_mobile_menu"
              variant="menu"
            />
            <a
              href={quoteHref}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-accent bg-accent px-5 text-sm font-medium text-accent-foreground"
              onClick={() => {
                trackMarketingEvent("cross_site_click", {
                  source: "tracy_mobile_menu_quote",
                  destination: quoteHref,
                });
                setIsOpen(false);
              }}
            >
              {isZh ? "中文保险帮助" : "Get insurance help"}
              <ExternalLink className="size-4" aria-hidden />
            </a>
            <a
              href={`tel:${site.agent.officePhone.e164}`}
              className="mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-full border border-accent/25 bg-surface px-5 text-sm font-medium text-accent"
              onClick={() => {
                trackMarketingEvent("phone_click", {
                  source: "tracy_mobile_menu",
                  phone: site.agent.officePhone.display,
                });
                setIsOpen(false);
              }}
            >
              <Phone className="size-4" aria-hidden />
              {isZh ? "致电" : "Call"} {site.agent.officePhone.display}
            </a>
            <ScheduleButton
              locale={locale}
              source="tracy_mobile_menu"
              variant="outline"
              size="md"
              icon
              onClick={() => setIsOpen(false)}
            />
            <EmailButton
              locale={locale}
              source="tracy_mobile_menu"
              variant="ghost"
              size="md"
              icon
              onClick={() => setIsOpen(false)}
            >
              {isZh ? "发送邮件" : `Email ${site.agent.contact.email}`}
            </EmailButton>
          </Container>
        </div>
      ) : null}
    </header>
  );
}

function getNavLabel(label: string, isZh: boolean) {
  if (!isZh) return label;
  if (label === "Profile") return "简介";
  if (label === "When to call") return "何时联系";
  if (label === "Offices") return "办公室";
  return label;
}
