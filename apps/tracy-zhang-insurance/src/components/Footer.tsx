"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MarketProfile, Office } from "@insurance-websites/domain";
import { site } from "@/config/site";
import { TrackedAnchor } from "@/components/marketing-events";
import { isZhPath, localizedHref } from "@/i18n/routing";

export function Footer({
  market,
  office,
}: {
  market: MarketProfile;
  office: Office;
}) {
  const zh = isZhPath(usePathname());
  const locale = zh ? "zh" : "en";
  const offices = market.domainRole === "local" ? [office] : site.offices;
  return (
    <footer className="site-footer">
      <div className="site-footer-top">
        <Link className="site-wordmark" href={localizedHref("/", locale)}>
          Tracy’s Insurance
        </Link>
        <p>
          {zh ? "扎根社区，陪伴加州生活。" : "Local roots. California life."}
        </p>
        <TrackedAnchor
          href={`mailto:${site.contact.email}`}
          eventName="email_click"
          eventProps={{ source: "site_footer", office: office.id }}
        >
          {site.contact.email} <span aria-hidden>↗</span>
        </TrackedAnchor>
      </div>
      <div className="site-footer-offices">
        {offices.map((item) => (
          <div key={item.id}>
            <h2>
              {item.label} {zh ? "办公室" : "office"}
            </h2>
            <address>
              {item.address.streetAddress}
              <br />
              {item.address.addressLocality}, CA {item.address.postalCode}
            </address>
            <div className="site-office-contact">
              <TrackedAnchor
                href={`tel:${item.phoneE164}`}
                eventName="phone_click"
                eventProps={{ source: "site_footer", office: item.id }}
              >
                {item.phoneDisplay}
              </TrackedAnchor>
              <TrackedAnchor
                href={`sms:${item.smsE164}`}
                eventName="sms_click"
                eventProps={{ source: "site_footer", office: item.id }}
              >
                {zh ? "短信" : "Text"} ↗
              </TrackedAnchor>
            </div>
          </div>
        ))}
      </div>
      <div className="site-footer-bottom">
        <p>© 2026 Tracy’s Insurance · Tracy Zhang & Team</p>
        <nav aria-label={zh ? "网站与条款" : "Site and legal links"}>
          {[
            ["/products", zh ? "保险产品" : "Coverage"],
            ["/stories", zh ? "保险指南" : "Guidance"],
            ["/contact", zh ? "联系我们" : "Contact"],
            ["/privacy", zh ? "隐私政策" : "Privacy"],
            ["/terms", zh ? "使用条款" : "Terms"],
            ["/sms-terms", zh ? "短信条款" : "SMS terms"],
          ].map(([href, label]) => (
            <Link key={href} href={localizedHref(href, locale)}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <p className="site-disclaimer">
        {zh
          ? "保障是否可提供、投保资格及条款，取决于保险公司、产品、核保条件和地区。联系团队不会使保障自动生效或变更。"
          : "Coverage availability, eligibility and terms vary by carrier, product, underwriting and location. Contacting our team does not bind or change coverage."}
      </p>
    </footer>
  );
}
