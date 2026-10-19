"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { MarketProfile, Office } from "@insurance-websites/domain";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { TrackedAnchor, TrackedLink } from "@/components/marketing-events";
import { isZhPath, localizedHref } from "@/i18n/routing";

export function Header({
  market,
  office,
}: {
  market: MarketProfile;
  office: Office;
}) {
  const pathname = usePathname();
  const zh = isZhPath(pathname);
  const locale = zh ? "zh" : "en";
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const source = `site_header_${market.id}`;
  const nav = [
    { href: "/products", label: zh ? "保险产品" : "Coverage" },
    { href: "/stories", label: zh ? "保险指南" : "Guidance" },
    { href: "/about", label: zh ? "认识团队" : "Our team" },
    {
      href:
        market.domainRole === "local"
          ? `/locations/${market.id}`
          : "/locations",
      label: zh ? "办公室" : "Offices",
    },
  ];
  useEffect(() => {
    function key(event: KeyboardEvent) {
      if (
        event.key === "Escape" &&
        toggle.current?.getAttribute("aria-expanded") === "true"
      ) {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    const query = window.matchMedia("(min-width: 1001px)");
    function resize() {
      if (query.matches) setOpen(false);
    }
    document.addEventListener("keydown", key);
    query.addEventListener("change", resize);
    return () => {
      document.removeEventListener("keydown", key);
      query.removeEventListener("change", resize);
    };
  }, []);
  return (
    <header className="site-header">
      <Link
        className="site-wordmark"
        href={localizedHref("/", locale)}
        onClick={() => setOpen(false)}
        aria-label={zh ? "Tracy’s Insurance 首页" : "Tracy’s Insurance home"}
      >
        Tracy’s Insurance
      </Link>
      <nav className="site-nav" aria-label={zh ? "主导航" : "Main navigation"}>
        {nav.map((item) => (
          <TrackedLink
            key={item.href}
            href={localizedHref(item.href, locale)}
            eventName="nav_click"
            eventProps={{ source, destination: item.href }}
            aria-current={
              pathname === localizedHref(item.href, locale) ? "page" : undefined
            }
          >
            {item.label}
          </TrackedLink>
        ))}
      </nav>
      <div className="site-header-actions">
        <LanguageSwitch source={source} />
        <TrackedAnchor
          className="site-call"
          href={`tel:${office.phoneE164}`}
          eventName="phone_click"
          eventProps={{ source, office: office.id, phone: office.phoneDisplay }}
        >
          {zh ? "聊一聊" : "Let’s talk"}
          <span aria-hidden>↗</span>
        </TrackedAnchor>
        <button
          ref={toggle}
          className="site-menu-toggle"
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={
            zh
              ? open
                ? "关闭导航"
                : "打开导航"
              : open
                ? "Close navigation"
                : "Open navigation"
          }
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>
      <nav
        id="site-menu"
        className="site-menu"
        hidden={!open}
        aria-label={zh ? "手机导航" : "Mobile navigation"}
        onClick={() => setOpen(false)}
      >
        {nav.map((item) => (
          <TrackedLink
            key={item.href}
            href={localizedHref(item.href, locale)}
            eventName="nav_click"
            eventProps={{ source, destination: item.href }}
          >
            {item.label}
            <span aria-hidden>↗</span>
          </TrackedLink>
        ))}
        <TrackedLink
          href={localizedHref("/contact", locale)}
          eventName="contact_click"
          eventProps={{ source }}
        >
          {zh ? "联系我们" : "Get in touch"}
          <span aria-hidden>↗</span>
        </TrackedLink>
      </nav>
    </header>
  );
}
