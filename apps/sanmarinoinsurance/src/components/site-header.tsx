"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";
import { careerRoles } from "@/lib/careers";

type NavLink = {
  href: string;
  label: string;
  dropdown?: NavDropdownSection[];
};

type NavDropdownLink = {
  href: string;
  label: string;
  description?: string;
};

type NavDropdownSection = {
  title: string;
  links: NavDropdownLink[];
};

const navItems: NavLink[] = [
  {
    href: "/coverages",
    label: "COVERAGES",
    dropdown: [
      {
        title: "Coverages",
        links: [
          { href: "/coverages/home", label: "Home", description: "Dwelling, belongings, and liability—built around your property." },
          { href: "/coverages/auto", label: "Auto", description: "Everyday driving, commuting, and family coverage." },
          { href: "/coverages/renters", label: "Renters", description: "Affordable protection for belongings and personal liability." },
          { href: "/coverages/umbrella", label: "Umbrella", description: "Extra liability protection above auto and home limits." },
          { href: "/coverages/life", label: "Life", description: "Income protection and planning—structured, not salesy." },
          { href: "/coverages/long-term-care", label: "Long‑term care", description: "Plan for extended care needs with clarity and options." },
          { href: "/coverages/investments", label: "Investments", description: "A practical conversation about long‑term goals and next steps." },
          { href: "/coverages/business", label: "Business", description: "Contracts, COIs, and specialty-market access when needed." },
        ],
      },
    ],
  },
  { href: "/locations", label: "OFFICES" },
  { href: "/about", label: "ABOUT US" },
  { href: "/careers", label: "CAREERS" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const headerOffset = (showAnnouncement ? 44 : 0) + 96;

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 bg-background/85 text-foreground backdrop-blur-sm"
      style={{ ["--header-offset" as never]: `${headerOffset}px` }}
    >
      {showAnnouncement ? (
        <div
          role="region"
          aria-label="Announcement"
          className="bg-accent text-accent-foreground"
        >
          <Container className="flex h-11 items-center justify-between gap-4 font-sans text-sm">
            <Link
              href="/careers/jobs"
              className="inline-flex min-w-0 items-center gap-2 truncate text-accent-foreground/90 hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-foreground/70"
            >
              <span className="size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
              <span className="truncate">
                We’re hiring — {careerRoles.length} open {careerRoles.length === 1 ? "role" : "roles"}
              </span>
              <ArrowRight className="size-4 shrink-0" aria-hidden />
            </Link>
            <button
              type="button"
              onClick={() => setShowAnnouncement(false)}
              aria-label="Close announcement"
              className="inline-flex size-10 items-center justify-center text-accent-foreground/80 hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-foreground/70"
            >
              <X className="size-5" aria-hidden />
            </button>
          </Container>
        </div>
      ) : null}

      <Container className="flex h-24 items-center justify-between">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60"
          aria-label={site.agent.name}
        >
          <LogoMark />
          <span className="whitespace-nowrap font-serif text-[28px] font-semibold tracking-[-0.04em] sm:text-[32px]">
            {site.agent.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navItems.map((item) =>
            item.dropdown?.length ? (
              <HeaderNavDropdown
                key={item.href}
                href={item.href}
                label={item.label}
                dropdown={item.dropdown}
              />
            ) : (
              <HeaderNavItem key={item.href} href={item.href} label={item.label} />
            ),
          )}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={`tel:${site.agent.phone.e164}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60"
          >
            <Phone className="size-4" aria-hidden />
            {site.agent.phone.display}
          </a>
          <HeaderButton href="/#quote" variant="solid">
            Get Quoted
          </HeaderButton>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-accent/35 bg-surface/60 p-2 text-accent shadow-sm shadow-black/5 hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60 md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        </button>
      </Container>

      {isOpen ? (
        <div className="border-t border-accent/15 bg-background md:hidden">
          <Container className="py-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <div key={item.href} className="flex flex-col gap-1">
                  <HeaderNavItemMobile
                    href={item.href}
                    label={item.label}
                    onNavigate={() => setIsOpen(false)}
                  />
                  {item.dropdown?.length ? (
                    <div className="ml-3 border-l border-foreground/20 pl-3">
                      {item.dropdown.map((section) => (
                        <div key={section.title} className="mt-3 first:mt-0">
                          <div className="px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/60">
                            {section.title}
                          </div>
                          {section.links.map((child) => (
                            <HeaderNavItemMobile
                              key={child.href}
                              href={child.href}
                              label={child.label}
                              onNavigate={() => setIsOpen(false)}
                              variant="subitem"
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <HeaderButton href="/#quote" variant="solid" onClick={() => setIsOpen(false)}>
                Get Quoted
              </HeaderButton>
              <a
                href={`tel:${site.agent.phone.e164}`}
                onClick={() => setIsOpen(false)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-accent/35 bg-surface/60 px-5 font-sans text-sm font-medium text-accent shadow-sm shadow-black/5 hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60"
              >
                <Phone className="size-4" aria-hidden />
                Call
              </a>
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
        width="20"
        height="20"
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
}: {
  href: string;
  label: string;
}) {
  const classes =
    "inline-flex items-center gap-2 font-sans text-sm font-medium text-accent hover:text-accent/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60";

  return (
    <Link href={href} className={classes}>
      {label}
    </Link>
  );
}

function HeaderNavDropdown({
  href,
  label,
  dropdown,
}: {
  href: string;
  label: string;
  dropdown: NavDropdownSection[];
}) {
  return (
    <div className="group relative flex h-24 items-center">
      <Link
        href={href}
        className="inline-flex items-center gap-2 font-sans text-sm font-medium text-accent hover:text-accent/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60"
      >
        {label}
      </Link>

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 top-[var(--header-offset)] z-0 bg-black/20 opacity-0 mix-blend-multiply transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
      />

      <div className="pointer-events-none absolute left-0 top-full z-10 opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
        <nav
          aria-label={label}
          className="w-[440px] rounded-2xl border border-accent/15 bg-surface px-8 py-8 shadow-lg shadow-black/10"
        >
          <div className="grid gap-12">
            {dropdown.map((section) => (
              <div key={section.title}>
                <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/70">
                  {section.title}
                </div>
                <ul className="mt-5 space-y-4">
                  {section.links.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60"
                      >
                        <div className="font-sans text-sm font-semibold text-accent hover:text-accent/70">
                          {item.label}
                        </div>
                        {item.description ? (
                          <div className="mt-1 text-xs leading-6 text-foreground/70">{item.description}</div>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}

function HeaderButton({
  href,
  variant,
  children,
  onClick,
}: {
  href: string;
  variant: "outline" | "solid";
  children: ReactNode;
  onClick?: () => void;
}) {
  const base =
    "inline-flex h-11 items-center justify-center rounded-full border px-5 font-sans text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60";
  const styles =
    variant === "solid"
      ? "border-accent bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm shadow-black/10"
      : "border-accent/35 bg-surface/60 text-accent hover:bg-surface";

  return (
    <Link href={href} className={[base, styles].join(" ")} onClick={onClick}>
      {children}
    </Link>
  );
}

function HeaderNavItemMobile({
  href,
  label,
  onNavigate,
  variant = "top",
}: {
  href: string;
  label: string;
  onNavigate: () => void;
  variant?: "top" | "subitem";
}) {
  const classes =
    variant === "subitem"
      ? "px-3 py-2 text-sm text-accent/85 hover:bg-accent/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60"
      : "px-3 py-3 font-sans text-base font-medium text-accent hover:bg-accent/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60";

  return (
    <Link href={href} className={classes} onClick={onNavigate}>
      {label}
    </Link>
  );
}
