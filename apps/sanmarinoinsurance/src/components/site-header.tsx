"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

type NavLink = {
  href: string;
  label: string;
  dropdown?: { href: string; label: string }[];
};

const productsDropdown: NavLink["dropdown"] = [
  { href: "/insurance", label: "OVERVIEW" },
  { href: "/insurance#auto", label: "AUTO & VEHICLES" },
  { href: "/insurance#home", label: "HOME & PROPERTY" },
  { href: "/insurance#life", label: "LIFE INSURANCE" },
  { href: "/insurance#financial", label: "FINANCIAL PRODUCTS" },
  { href: "/insurance#business", label: "BUSINESS INSURANCE" },
];

const navItems: NavLink[] = [
  { href: "/insurance", label: "PRODUCTS", dropdown: productsDropdown },
  { href: "/contact", label: "OFFICE" },
  { href: "/careers", label: "CAREERS" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const headerOffset = (showAnnouncement ? 40 : 0) + 96;

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header
      className="relative z-50 bg-background text-foreground"
      style={{ ["--header-offset" as never]: `${headerOffset}px` }}
    >
      {showAnnouncement ? (
        <div
          role="region"
          aria-label="Announcement"
          className="bg-black text-white/85"
        >
          <Container className="flex h-10 items-center justify-between gap-4 font-sans text-[12px] tracking-[0.08em] sm:text-[13px]">
            <div className="min-w-0 truncate uppercase">
              Come check out our newly renovated website
            </div>
            <button
              type="button"
              onClick={() => setShowAnnouncement(false)}
              aria-label="Close announcement"
              className="inline-flex size-10 items-center justify-center text-white/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
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
        >
          <LogoMark />
          <span className="font-serif text-[28px] font-semibold tracking-[-0.04em] sm:text-[32px]">
            {site.brand.shortName}
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

        <div className="hidden items-center gap-3 md:flex">
          <HeaderButton href="/about" variant="outline">
            ABOUT
          </HeaderButton>
          <HeaderButton href="/contact" variant="solid">
            CONTACT
          </HeaderButton>
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
                <div key={item.href} className="flex flex-col gap-1">
                  <HeaderNavItemMobile
                    href={item.href}
                    label={item.label}
                    onNavigate={() => setIsOpen(false)}
                  />
                  {item.dropdown?.length ? (
                    <div className="ml-3 border-l border-foreground/20 pl-3">
                      {item.dropdown.map((child) => (
                        <HeaderNavItemMobile
                          key={child.href}
                          href={child.href}
                          label={child.label}
                          onNavigate={() => setIsOpen(false)}
                          variant="subitem"
                        />
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <HeaderButton href="/about" variant="outline" onClick={() => setIsOpen(false)}>
                ABOUT
              </HeaderButton>
              <HeaderButton href="/contact" variant="solid" onClick={() => setIsOpen(false)}>
                CONTACT
              </HeaderButton>
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
    "inline-flex items-center gap-2 font-serif text-[25.1px] tracking-[-0.03em] text-foreground hover:text-foreground/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60";

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
  dropdown: { href: string; label: string }[];
}) {
  return (
    <div className="group relative flex h-24 items-center">
      <Link
        href={href}
        className="inline-flex items-center gap-3 font-serif text-[25.1px] tracking-[-0.03em] text-foreground hover:text-foreground/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60"
      >
        {label}
        <CaretDown className="transition-transform duration-150 group-hover:rotate-180 group-focus-within:rotate-180" />
      </Link>

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 top-[var(--header-offset)] z-0 bg-black/20 opacity-0 mix-blend-multiply transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
      />

      <div className="pointer-events-none absolute left-0 top-full z-10 opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
        <nav aria-label={label} className="w-[260px] bg-background px-8 py-7">
          <ul className="space-y-4">
            {dropdown.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block font-sans text-[13px] font-semibold uppercase tracking-[0.18em] text-foreground hover:text-foreground/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

function CaretDown({ className = "" }: { className?: string }) {
  return (
    <span className={["inline-flex size-5 items-center justify-center", className].join(" ")} aria-hidden>
      <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1.5L7 7.5L13 1.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" />
      </svg>
    </span>
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
    "inline-flex h-12 items-center justify-center rounded-none border px-6 font-serif text-[20px] tracking-[-0.03em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60 md:text-[22px]";
  const styles =
    variant === "solid"
      ? "border-foreground bg-foreground text-white hover:bg-foreground/90"
      : "border-foreground bg-transparent text-foreground hover:bg-foreground/5";

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
      ? "px-3 py-2 text-sm tracking-[-0.01em] text-foreground/85 hover:bg-foreground/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60"
      : "px-3 py-3 font-serif text-[18px] tracking-[-0.03em] text-foreground hover:bg-foreground/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60";

  return (
    <Link href={href} className={classes} onClick={onNavigate}>
      {label}
    </Link>
  );
}
