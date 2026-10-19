"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import type { MarketProfile, Office } from "@insurance-websites/domain";
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
  if (pathname === "/" && market.domainRole === "canonical") return children;
  return (
    <>
      <Header market={market} office={office} />
      <main id="main">
        <RouteTransition>{children}</RouteTransition>
      </main>
      <Footer market={market} office={office} />
    </>
  );
}
