"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { TrackedAnchor } from "@/components/marketing-events";
import { Container } from "@/components/ui/container";
import { isZhPath, localizedHref } from "@/i18n/routing";
import { getFullAddressLine, getOffice, site } from "@/lib/site";

const businessSite = "https://tracyzhanginsurance.com";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const sanMarino = getOffice("san-marino");
  const laPalma = getOffice("la-palma");
  const pathname = usePathname();
  const isZh = isZhPath(pathname);
  const locale = isZh ? "zh" : "en";
  const quoteHref = `${businessSite}${isZh ? "/zh" : ""}/contact#quote`;
  const productsHref = `${businessSite}${isZh ? "/zh" : ""}/products`;

  return (
    <footer className="border-t border-foreground/20 bg-background">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-full border border-accent/20 bg-surface shadow-sm shadow-black/5">
                <Image
                  src="/tz-logo-cropped.png"
                  alt=""
                  width={80}
                  height={80}
                  className="size-full object-cover"
                />
              </span>
              <div className="text-sm font-semibold text-foreground">
                {site.brand.name}
              </div>
            </div>
            <div className="mt-2 text-sm text-muted">{site.brand.legalLine}</div>

            <div className="mt-6 space-y-2 text-sm text-muted">
              <div>
                <span className="text-foreground/80">{isZh ? "主要电话：" : "Main line:"}</span>{" "}
                <TrackedAnchor
                  className="hover:text-foreground"
                  href={`tel:${site.agent.phone.e164}`}
                  eventName="phone_click"
                  eventProps={{
                    source: "tracy_footer",
                    phone: site.agent.phone.display,
                  }}
                >
                  {site.agent.phone.display}
                </TrackedAnchor>
              </div>
              <div>
                <span className="text-foreground/80">{isZh ? "传真：" : "Fax:"}</span>{" "}
                <span>{site.agent.fax.display}</span>
              </div>
            </div>

            <div className="mt-8 text-sm font-semibold text-foreground">
              {isZh ? "服务语言" : "Languages"}
            </div>
            <div className="mt-3 text-sm text-muted">
              {site.agent.languages.join(", ")}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-foreground">{isZh ? "办公室" : "Offices"}</div>

            <div className="mt-5 space-y-6 text-sm text-muted">
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">
                  {sanMarino.location}
                </div>
                <div className="mt-2">{getFullAddressLine("san-marino")}</div>
                <div className="mt-2">
                  <TrackedAnchor
                    className="hover:text-foreground"
                    href={`tel:${sanMarino.phone.e164}`}
                    eventName="phone_click"
                    eventProps={{
                      source: "tracy_footer_office",
                      office: sanMarino.id,
                      phone: sanMarino.phone.display,
                    }}
                  >
                    {sanMarino.phone.display}
                  </TrackedAnchor>
                </div>
                <div className="mt-2 text-xs text-foreground/60">
                  {officeHoursSummary("san-marino", isZh)}
                </div>
                <div className="mt-3">
                  <TrackedAnchor
                    className="hover:text-foreground"
                    href={sanMarino.links.mapCid}
                    target="_blank"
                    rel="noreferrer"
                    eventName="directions_click"
                    eventProps={{
                      source: "tracy_footer_office",
                      office: sanMarino.id,
                    }}
                  >
                    {isZh ? "导航" : "Directions"}
                  </TrackedAnchor>
                  <span className="mx-2 text-foreground/25">|</span>
                  <Link className="hover:text-foreground" href={localizedHref("/#offices", locale)}>
                    {isZh ? "办公室信息" : "Office section"}
                  </Link>
                </div>
              </div>

              <div>
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">
                  {laPalma.location}
                </div>
                <div className="mt-2">{getFullAddressLine("la-palma")}</div>
                <div className="mt-2">
                  <TrackedAnchor
                    className="hover:text-foreground"
                    href={`tel:${laPalma.phone.e164}`}
                    eventName="phone_click"
                    eventProps={{
                      source: "tracy_footer_office",
                      office: laPalma.id,
                      phone: laPalma.phone.display,
                    }}
                  >
                    {laPalma.phone.display}
                  </TrackedAnchor>
                </div>
                <div className="mt-2 text-xs text-foreground/60">
                  {officeHoursSummary("la-palma", isZh)}
                </div>
                <div className="mt-3">
                  <TrackedAnchor
                    className="hover:text-foreground"
                    href={laPalma.links.mapCid}
                    target="_blank"
                    rel="noreferrer"
                    eventName="directions_click"
                    eventProps={{
                      source: "tracy_footer_office",
                      office: laPalma.id,
                    }}
                  >
                    {isZh ? "导航" : "Directions"}
                  </TrackedAnchor>
                  <span className="mx-2 text-foreground/25">|</span>
                  <Link className="hover:text-foreground" href={localizedHref("/#offices", locale)}>
                    {isZh ? "办公室信息" : "Office section"}
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-1 text-sm text-muted">
              {site.agent.notes.map((note) => (
                <div key={note}>{formatAgentNote(note, isZh)}</div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-foreground">{isZh ? "浏览" : "Explore"}</div>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>
                <Link className="hover:text-foreground" href={localizedHref("/#approach", locale)}>
                  {isZh ? "Tracy 如何协助" : "Approach"}
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground" href={localizedHref("/#coverage-help", locale)}>
                  {isZh ? "保险帮助" : "Coverage help"}
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground" href={localizedHref("/#offices", locale)}>
                  {isZh ? "办公室" : "Offices"}
                </Link>
              </li>
              <li>
                <TrackedAnchor
                  className="hover:text-foreground"
                  href={quoteHref}
                  eventName="cross_site_click"
                  eventProps={{
                    source: "tracy_footer_explore",
                    destination: quoteHref,
                  }}
                >
                  {isZh ? "中文保险帮助" : "Get insurance help"}
                </TrackedAnchor>
              </li>
              <li>
                <TrackedAnchor
                  className="hover:text-foreground"
                  href={productsHref}
                  eventName="cross_site_click"
                  eventProps={{
                    source: "tracy_footer_explore",
                    destination: productsHref,
                  }}
                >
                  {isZh ? "保险产品" : "Insurance products"}
                </TrackedAnchor>
              </li>
              <li>
                <TrackedAnchor
                  className="hover:text-foreground"
                  href={site.agent.links.allstateProfile}
                  target="_blank"
                  rel="noreferrer"
                  eventName="profile_click"
                  eventProps={{
                    source: "tracy_footer_explore",
                    destination: site.agent.links.allstateProfile,
                  }}
                >
                  {isZh ? "Allstate 公开简介和评价" : "Allstate profile & reviews"}
                </TrackedAnchor>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-foreground/20 pt-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <div>
            <div>© {year} {site.brand.name}. All rights reserved.</div>
            <div className="mt-2 text-foreground/70">
              {isZh
                ? "Allstate® 是 Allstate Insurance Company 的注册商标。"
                : "Allstate® is a registered trademark of Allstate Insurance Company."}
            </div>
          </div>
          <div className="space-x-3">
            <TrackedAnchor
              className="hover:text-foreground"
              href={site.agent.links.allstateProfile}
              target="_blank"
              rel="noreferrer"
              eventName="profile_click"
              eventProps={{
                source: "tracy_footer_source",
                destination: site.agent.links.allstateProfile,
              }}
            >
              {isZh ? "来源：Allstate 代理页面" : "Source: Allstate agent page"}
            </TrackedAnchor>
            <span className="text-foreground/30">|</span>
            <Link className="hover:text-foreground" href={localizedHref("/#offices", locale)}>
              {isZh ? "办公室" : "Locations"}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function officeHoursSummary(officeId: "san-marino" | "la-palma", isZh: boolean) {
  if (officeId === "san-marino") {
    return isZh ? "周一至周五 9:00–6:00 · 周末可预约" : "Mon–Fri 9:00–6:00 • Weekends by appointment";
  }
  return isZh ? "周一至周五 9:00–5:45 · 周末休息" : "Mon–Fri 9:00–5:45 • Weekends closed";
}

function formatAgentNote(note: string, isZh: boolean) {
  if (!isZh) return note;
  if (note === "After-hours appointments available.") return "可预约非营业时间。";
  if (note === "Available 24/7 by phone.") return "可 24/7 电话联系。";
  return note;
}
