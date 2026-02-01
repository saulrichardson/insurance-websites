"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";

const navItems = [
  { href: "/insurance", label: "Products", hasChevron: true },
  { href: "/#office", label: "Office", hasChevron: true },
  { href: site.agent.links.allstateProfile, label: "Resources", hasChevron: true, external: true },
] as const;

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="relative z-50 bg-background text-foreground">
      {showAnnouncement ? (
        <div className="bg-black text-white">
          <Container className="flex h-10 items-center justify-between gap-4">
            <div className="truncate text-[11px] font-medium uppercase tracking-[0.22em]">
              Multi‑language support available in San Marino, CA
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/contact"
                className="text-[11px] font-medium uppercase tracking-[0.22em] text-fuchsia-300 hover:text-fuchsia-200"
              >
                Read more
              </Link>
              <button
                type="button"
                onClick={() => setShowAnnouncement(false)}
                aria-label="Close announcement"
                className="inline-flex size-8 items-center justify-center text-white/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
          </Container>
        </div>
      ) : null}

      <Container className="flex h-24 items-center justify-between">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60"
        >
          <LogoMark />
          <span className="font-serif text-2xl font-semibold tracking-tight">
            {site.brand.shortName}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <HeaderNavItem
              key={item.href}
              href={item.href}
              label={item.label}
              hasChevron={item.hasChevron}
              external={"external" in item ? item.external : false}
            />
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ButtonLink href="/#about" variant="outline" size="sm">
            About
          </ButtonLink>
          <ButtonLink href="/contact" variant="primary" size="sm">
            Contact
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center border border-foreground/60 bg-transparent p-2 text-foreground hover:bg-foreground/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60 md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        </button>
      </Container>

      {isOpen ? (
        <div className="border-t border-foreground/20 bg-background md:hidden">
          <Container className="py-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <HeaderNavItemMobile
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  external={"external" in item ? item.external : false}
                  onNavigate={() => setIsOpen(false)}
                />
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <ButtonLink href="/#about" variant="outline" size="md">
                About
              </ButtonLink>
              <ButtonLink href="/contact" variant="primary" size="md">
                Contact
              </ButtonLink>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}

function LogoMark() {
  return (
    <span className="grid size-9 place-items-center">
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path d="M9 1.5L16.5 9 9 16.5 1.5 9 9 1.5Z" fill="currentColor" />
      </svg>
    </span>
  );
}

function HeaderNavItem({
  href,
  label,
  hasChevron,
  external,
}: {
  href: string;
  label: string;
  hasChevron?: boolean;
  external?: boolean;
}) {
  const classes =
    "inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.22em] text-foreground/80 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {label}
        {hasChevron ? <ChevronDown className="size-4" aria-hidden /> : null}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {label}
      {hasChevron ? <ChevronDown className="size-4" aria-hidden /> : null}
    </Link>
  );
}

function HeaderNavItemMobile({
  href,
  label,
  external,
  onNavigate,
}: {
  href: string;
  label: string;
  external?: boolean;
  onNavigate: () => void;
}) {
  const classes =
    "px-3 py-3 text-sm font-medium uppercase tracking-[0.18em] text-foreground hover:bg-foreground/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes} onClick={onNavigate}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onNavigate}>
      {label}
    </Link>
  );
}
