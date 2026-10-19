"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import type { MarketProfile, Office } from "@insurance-websites/domain";
import { MobileContactBar } from "@/components/MobileContactBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RouteTransition } from "@insurance-websites/ui/route-transition";

export function SiteFrame({
  children,
  market,
  office,
}: {
  children: ReactNode;
  market: MarketProfile;
  office: Office;
}) {
  const pathname = usePathname();
  if (
    (pathname === "/" || pathname === "/zh" || pathname === "/zh/") &&
    market.domainRole === "canonical"
  )
    return children;
  const operational = /^\/(admin|auto-lead-intake)(\/|$)/.test(pathname);
  return (
    <div
      className={operational ? "site-operational" : "site-frame"}
      lang={pathname.startsWith("/zh") ? "zh-Hans" : "en"}
    >
      <Header market={market} office={office} />
      <main id="main">
        <RouteTransition>{children}</RouteTransition>
      </main>
      <Footer market={market} office={office} />
      {!operational ? <MobileContactBar office={office} /> : null}
    </div>
  );
}
