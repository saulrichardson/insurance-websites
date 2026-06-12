"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { MarketProfile, Office } from "@insurance-websites/domain";

import { site } from "@/config/site";
import { Container } from "@/components/Container";
import { EmailAnchor, ScheduleAnchor } from "@/components/ContactActions";
import { TrackedAnchor, TrackedLink } from "@/components/marketing-events";
import { isZhPath, localizedHref, type Locale } from "@/i18n/routing";

export function Footer({
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
  const visibleOffices = isLocal ? [office] : site.offices;
  const footerDescription = isLocal
    ? isZh
      ? `${market.label} 中文保险咨询，本地办公室协助附近家庭和企业。`
      : market.heroSubtitle
    : isZh
      ? "加州中文保险咨询，服务家庭、房主、车主和企业主。"
      : site.description;
  const locationHref = localizedHref(isLocal ? `/locations/${market.id}` : "/locations", locale);
  const locationLabel = isLocal ? (isZh ? "本地办公室" : "Location") : isZh ? "办公室" : "Offices";
  const trackingSource = isLocal
    ? `tracy_zhang_insurance_${market.id}_footer`
    : "tracy_zhang_insurance_footer";
  const quoteHref = localizedHref("/contact#quote", locale);

  return (
    <footer className="border-t border-[var(--rail-border)] bg-[var(--surface)]">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-lg border border-[#0e1941]/15 bg-white shadow-[0_8px_18px_rgba(8,38,40,0.12)]">
                <Image
                  src="/tz-logo-cropped.png"
                  alt=""
                  width={80}
                  height={80}
                  className="size-full object-cover"
                />
              </span>
              <div className="text-base font-semibold text-[var(--ink)]">
                {site.name}
              </div>
            </div>
            <p className="text-sm leading-6 text-[var(--muted)]">{footerDescription}</p>
            <div className="grid gap-4">
              {visibleOffices.map((item) => (
                <div key={item.slug} className="text-sm text-[var(--muted)]">
                  <div className="text-xs font-semibold uppercase text-[var(--brand-ink)]">
                    {item.label} {isZh ? "办公室" : "office"}
                  </div>
                  <div className="mt-2">
                    <TrackedAnchor
                      className="font-medium text-[var(--ink)] hover:text-[var(--brand-strong)] hover:underline"
                      href={`tel:${item.phoneE164}`}
                      eventName="phone_click"
                      eventProps={{
                        source: trackingSource,
                        office: item.slug,
                        phone: item.phoneDisplay,
                      }}
                    >
                      {item.phoneDisplay}
                    </TrackedAnchor>
                    {item.smsE164 ? (
                      <>
                        <span className="px-2 text-[var(--rail-border)]">/</span>
                        <TrackedAnchor
                          className="font-medium text-[var(--ink)] hover:text-[var(--brand-strong)] hover:underline"
                          href={`sms:${item.smsE164}`}
                          eventName="sms_click"
                          eventProps={{
                            source: trackingSource,
                            office: item.slug,
                            phone: item.phoneDisplay,
                          }}
                        >
                          {isZh ? "短信" : "Text"}
                        </TrackedAnchor>
                      </>
                    ) : null}
                    <span className="px-2 text-[var(--rail-border)]">/</span>
                    <EmailAnchor
                      locale={locale}
                      source={trackingSource}
                      eventProps={{ office: item.slug }}
                      className="font-medium text-[var(--ink)] hover:text-[var(--brand-strong)] hover:underline"
                    >
                      {site.contact.email}
                    </EmailAnchor>
                    <span className="px-2 text-[var(--rail-border)]">/</span>
                    <ScheduleAnchor
                      locale={locale}
                      source={trackingSource}
                      eventProps={{ office: item.slug }}
                      className="font-medium text-[var(--ink)] hover:text-[var(--brand-strong)] hover:underline"
                    />
                  </div>
                  <div className="mt-2">
                    <div>{item.address.streetAddress}</div>
                    <div>
                      {item.address.addressLocality}, {item.address.addressRegion}{" "}
                      {item.address.postalCode}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-base font-semibold text-[var(--ink)]">
              {isZh ? "浏览" : "Explore"}
            </div>
            <ul className="grid gap-2 text-sm text-[var(--muted)]">
              <li>
                <Link className="hover:text-[var(--ink)] hover:underline" href={localizedHref("/#coverage", locale)}>
                  {isZh ? "保险范围" : "Coverage"}
                </Link>
              </li>
              <li>
                <Link className="hover:text-[var(--ink)] hover:underline" href={localizedHref("/products", locale)}>
                  {isZh ? "保险产品" : "Products"}
                </Link>
              </li>
              <li>
                <TrackedLink
                  className="hover:text-[var(--ink)] hover:underline"
                  href={localizedHref("/stories", locale)}
                  eventName="guidance_click"
                  eventProps={{ source: "tracy_zhang_insurance_footer" }}
                >
                  {isZh ? "保险指南" : "Guidance"}
                </TrackedLink>
              </li>
              <li>
                <Link className="hover:text-[var(--ink)] hover:underline" href={localizedHref("/#business", locale)}>
                  {isZh ? "商业保险" : "Business"}
                </Link>
              </li>
              <li>
                <Link className="hover:text-[var(--ink)] hover:underline" href={localizedHref("/business-insurance", locale)}>
                  {isZh ? "商业保险咨询" : "Business insurance"}
                </Link>
              </li>
              <li>
                <Link className="hover:text-[var(--ink)] hover:underline" href={locationHref}>
                  {locationLabel}
                </Link>
              </li>
              <li>
                <Link className="hover:text-[var(--ink)] hover:underline" href={localizedHref("/about", locale)}>
                  {isZh ? "关于我们" : "About"}
                </Link>
              </li>
              <li>
                <Link className="hover:text-[var(--ink)] hover:underline" href={localizedHref("/contact", locale)}>
                  {isZh ? "联系我们" : "Contact"}
                </Link>
              </li>
              <li>
                <Link className="hover:text-[var(--ink)] hover:underline" href={localizedHref("/privacy", locale)}>
                  {isZh ? "隐私政策" : "Privacy"}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-base font-semibold text-[var(--ink)]">{isZh ? "营业时间" : "Hours"}</div>
            <div className="grid gap-4 text-sm text-[var(--muted)]">
              {visibleOffices.map((item) => (
                <div key={item.slug} className="grid gap-1">
                  <div className="text-xs font-semibold uppercase text-[var(--brand-ink)]">
                    {item.label}
                  </div>
                  <div>{formatHours(item.hours.mondayFriday, isZh)}</div>
                  <div>{formatHours(item.hours.saturday, isZh)}</div>
                  <div>{formatHours(item.hours.sunday, isZh)}</div>
                </div>
              ))}
            </div>
            <div className="pt-2 text-xs leading-5 text-[var(--muted)]">
              <p>
                {isZh
                  ? "我们可以协助查看 Allstate 选项，并在适合时讨论其他市场和加州特殊风险路径。承保公司、产品、资格、核保要求和地区都会影响实际可选方案。"
                  : site.carrierNotes}
              </p>
              <p className="mt-2">
                {isZh
                  ? "本网站仅提供一般信息，并不构成保险绑定或承保确认。"
                  : "This website is for general information and does not constitute a binder of coverage."}
              </p>
              <p className="mt-2">
                {isZh
                  ? "Allstate 是 Allstate Insurance Company 的注册商标。"
                  : "Allstate is a registered trademark of Allstate Insurance Company."}
              </p>
              {isLocal && market.localImage ? (
                <p className="mt-2">
                  {isZh ? "本地图片：" : "Local image: "}{" "}
                  <a className="underline underline-offset-2" href={market.localImage.creditUrl}>
                    {market.localImage.caption}
                  </a>{" "}
                  by {market.localImage.credit},{" "}
                  <a className="underline underline-offset-2" href={market.localImage.licenseUrl}>
                    {market.localImage.license}
                  </a>
                  .
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-[var(--rail-border)] pt-6 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} {site.name}.{" "}
            {isZh ? "版权所有。" : "All rights reserved."}
          </div>
          <div className="flex flex-wrap gap-4">
            <Link className="hover:text-[var(--ink)] hover:underline" href={localizedHref("/privacy", locale)}>
              {isZh ? "隐私政策" : "Privacy"}
            </Link>
            <Link className="hover:text-[var(--ink)] hover:underline" href={localizedHref("/terms", locale)}>
              {isZh ? "网站条款" : "Terms"}
            </Link>
            <Link className="hover:text-[var(--ink)] hover:underline" href={localizedHref("/sms-terms", locale)}>
              {isZh ? "短信条款" : "SMS terms"}
            </Link>
            <TrackedLink
              className="hover:text-[var(--ink)] hover:underline"
              href={quoteHref}
              eventName="quote_click"
              eventProps={{ source: "tracy_zhang_insurance_footer" }}
            >
              {isZh ? "获取报价" : "Get a quote"}
            </TrackedLink>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function formatHours(value: string, isZh: boolean) {
  if (!isZh) return value;
  return value
    .replace("Mon-Fri:", "周一至周五：")
    .replace("Sat:", "周六：")
    .replace("Sun:", "周日：")
    .replace("Available by appointment", "可预约")
    .replace("9:00am-6:00pm", "9:00am-6:00pm")
    .replace("9:00am-5:30pm", "9:00am-5:30pm");
}
