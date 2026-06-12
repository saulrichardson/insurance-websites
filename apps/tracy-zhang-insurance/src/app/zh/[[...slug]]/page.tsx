import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getMarketProfile,
  getOfficeById,
  type MarketProfile,
  type Office,
} from "@insurance-websites/domain";

import { Container } from "@/components/Container";
import { EmailAnchor, EmailButton, ScheduleAnchor, ScheduleButton } from "@/components/ContactActions";
import { PageCTA } from "@/components/PageCTA";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import { TrackedAnchor, TrackedLink } from "@/components/marketing-events";
import { Card } from "@/components/ui/Card";
import { buttonClasses } from "@/components/ui/button";
import { site, siteUrl } from "@/config/site";
import {
  getZhProductBySlug,
  getZhStory,
  zhCommon,
  zhMarketContent,
  zhProducts,
  zhPublicRoutes,
  zhStories,
  type LocalizedProduct,
  type LocalizedStory,
} from "@/i18n/zh";
import { fromZhPath, toZhPath } from "@/i18n/routing";
import { getMarketUrl, getRequestMarket } from "@/lib/market";
import { getBreadcrumbSchema, getJsonLdGraph } from "@/lib/schema";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export function generateStaticParams() {
  return zhPublicRoutes.map((route) => {
    const zhPath = toZhPath(route);
    const slug = zhPath.replace(/^\/zh\/?/, "").split("/").filter(Boolean);
    return { slug };
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const path = getPathFromParams((await params).slug);
  const market = await getRequestMarket();
  const meta = getPageMeta(path, market);
  if (!meta) {
    return {
      title: "页面未找到",
      robots: { index: false, follow: false },
    };
  }

  const base = getCanonicalBase(market, path);
  const englishPath = fromZhPath(toZhPath(path));
  const chinesePath = toZhPath(path);
  const canonical = absoluteUrl(chinesePath, base);

  return {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: {
      canonical,
      languages: {
        "en-US": absoluteUrl(englishPath, base),
        "zh-Hans": canonical,
        "x-default": absoluteUrl(englishPath, base),
      },
    },
    openGraph: {
      type: "website",
      locale: "zh_Hans",
      url: canonical,
      title: meta.title,
      description: meta.description,
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function ChinesePage({ params }: PageProps) {
  const path = getPathFromParams((await params).slug);
  if (!isKnownChinesePath(path)) notFound();

  const market = await getRequestMarket();
  const office = getOfficeById(market.primaryOfficeId);
  const product = getProductForPath(path);
  const story = getStoryForPath(path);
  let page: ReactNode;

  if (path === "/") page = <ZhHome market={market} office={office} />;
  else if (path === "/products") page = <ZhProductsPage />;
  else if (product) page = <ZhProductPage product={product} />;
  else if (path === "/contact") page = <ZhContactPage market={market} office={office} />;
  else if (path === "/locations" || path === "/location") page = <ZhLocationsPage market={market} />;
  else if (path.startsWith("/locations/")) page = <ZhLocationPage path={path} />;
  else if (path === "/about") page = <ZhAboutPage market={market} office={office} />;
  else if (path === "/team") page = <ZhTeamPage />;
  else if (path === "/privacy") page = <ZhPolicyPage kind="privacy" office={office} />;
  else if (path === "/terms") page = <ZhPolicyPage kind="terms" office={office} />;
  else if (path === "/sms-terms") page = <ZhPolicyPage kind="sms" office={office} />;
  else if (path === "/contact-consent") page = <ZhPolicyPage kind="consent" office={office} />;
  else if (path === "/stories") page = <ZhStoriesPage />;
  else if (story) page = <ZhStoryPage story={story} office={office} />;
  else notFound();

  return withChineseStructuredData(page, path, market);
}

function ZhHome({ market, office }: { market: MarketProfile; office: Office }) {
  const marketCopy = zhMarketContent[market.id];
  const visibleProducts = market.domainRole === "local"
    ? market.merchandising.flatMap((group) => group.productIds)
    : zhProducts.map((product) => product.id);
  const productCards = zhProducts.filter((product, index, list) =>
    visibleProducts.includes(product.id) &&
    list.findIndex((item) => item.id === product.id) === index,
  );

  return (
    <div lang="zh-Hans" className="bg-[var(--background)]">
      <PageHero
        eyebrow={marketCopy.eyebrow}
        title={marketCopy.title}
        subtitle={marketCopy.subtitle}
        office={office}
        quoteHref="/zh/contact#quote"
        quoteLabel={zhCommon.quoteLabel}
        callLabel={`${zhCommon.callLabel} ${office.phoneDisplay}`}
      />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <div className="text-xs font-semibold uppercase text-[var(--brand-ink)]">
              {zhCommon.languageName}
            </div>
            <h2 className="mt-4 font-[var(--font-serif)] text-4xl leading-tight text-[var(--ink)]">
              用中文先把保险问题讲清楚。
            </h2>
            <p className="mt-5 text-base leading-7 text-[var(--muted)]">
              {marketCopy.localIntro}
            </p>
            <div className="mt-6 grid gap-3">
              {marketCopy.proofPoints.map((point) => (
                <div key={point} className="border border-[var(--rail-border)] bg-white p-4 text-sm text-[var(--ink)] shadow-sm">
                  {point}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {productCards.slice(0, 8).map((product) => (
              <TrackedLink
                key={product.id}
                href={product.zhHref}
                eventName="product_click"
                eventProps={{
                  source: "tracy_zhang_insurance_zh_home",
                  product: product.id,
                }}
                className="group"
              >
                <Card className="h-full p-6 transition group-hover:-translate-y-0.5 group-hover:shadow-[var(--shadow-md)]">
                  <div className="text-lg font-semibold text-slate-950">
                    {product.title}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {product.description}
                  </p>
                  <div className="mt-5 text-sm font-semibold text-[var(--brand-ink)]">
                    查看详情 →
                  </div>
                </Card>
              </TrackedLink>
            ))}
          </div>
        </div>

        <div id="coverage" className="mt-14 grid gap-4 lg:grid-cols-3">
          {[
            {
              title: "家庭和车辆",
              body: "车险、房屋保险、公寓、租客和伞险可以一起审查，避免只看单一价格。",
              href: "/zh/products#household",
            },
            {
              title: "加州房产问题",
              body: "续保变化、nonrenewal、FAIR Plan、贷款证明和承保市场限制需要现实判断。",
              href: "/zh/california-property-insurance",
            },
            {
              title: "商业和证书",
              body: "商业责任、财产、商业车险、合同要求和 COI 证书需要和业务实际情况对齐。",
              href: "/zh/business-insurance",
            },
          ].map((item) => (
            <TrackedLink
              key={item.title}
              href={item.href}
              eventName="nav_click"
              eventProps={{ source: "tracy_zhang_insurance_zh_home_lanes" }}
              className="group"
            >
              <Card className="h-full p-7 transition group-hover:-translate-y-0.5 group-hover:shadow-[var(--shadow-md)]">
                <div className="text-xl font-semibold text-slate-950">{item.title}</div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.body}</p>
              </Card>
            </TrackedLink>
          ))}
        </div>
      </Container>

      <PageCTA
        title="想用中文讨论保险？"
        body="电话、短信或在线提交信息。我们会帮你把保障问题、文件需求和下一步分清楚。"
        office={office}
        quoteHref="/zh/contact#quote"
        quoteLabel={zhCommon.quoteLabel}
        callLabel={`${zhCommon.callLabel} ${office.phoneDisplay}`}
      />
    </div>
  );
}

function ZhProductsPage() {
  return (
    <div lang="zh-Hans" className="bg-white">
      <PageHero
        eyebrow="保险产品"
        title="从你真正需要处理的问题开始。"
        subtitle="选择车、房、家庭、商业或加州财产问题。我们会用中文说明哪些信息会影响保障和报价。"
        quoteHref="/zh/contact#quote"
        quoteLabel={zhCommon.quoteLabel}
      />

      <Container className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base leading-7 text-slate-600 sm:text-lg">
            {zhCommon.carrierNotes}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {zhProducts.map((product) => (
            <TrackedLink
              key={product.id}
              href={product.zhHref}
              eventName="product_click"
              eventProps={{
                source: "tracy_zhang_insurance_zh_products_grid",
                product: product.id,
              }}
              className="group"
            >
              <Card className="h-full p-7 transition group-hover:-translate-y-0.5 group-hover:shadow-[0_18px_55px_rgba(15,23,42,0.10)]">
                <div className="text-base font-semibold text-slate-950">
                  {product.title}
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {product.description}
                </p>
                <div className="mt-5 text-sm font-semibold text-slate-950">
                  了解 {product.shortTitle} →
                </div>
              </Card>
            </TrackedLink>
          ))}
        </div>
      </Container>

      <PageCTA
        title="不确定从哪里开始？"
        body="告诉我们发生了什么变化，我们会帮你判断应该先看哪类保险。"
        quoteHref="/zh/contact#quote"
        quoteLabel={zhCommon.quoteLabel}
      />
    </div>
  );
}

function ZhProductPage({ product }: { product: LocalizedProduct }) {
  const sourceProduct = getProductBySlug(product.slug);
  const relatedProducts = sourceProduct
    ? sourceProduct.related
        .map((id) => zhProducts.find((item) => item.id === id))
        .filter((item): item is LocalizedProduct => Boolean(item))
    : [];

  return (
    <div lang="zh-Hans" className="bg-white">
      <PageHero
        eyebrow="加州中文保险咨询"
        title={product.heroTitle}
        subtitle={product.heroSubtitle}
        quoteHref="/zh/contact#quote"
        quoteLabel={zhCommon.quoteLabel}
      />

      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {product.reviewTitle}
            </h2>
            <p className="text-base leading-7 text-slate-600">
              {product.reviewBody}
            </p>
            <div className="grid gap-3">
              {product.reviewItems.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm"
                >
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-[var(--brand)]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <Card className="p-7">
              <div className="text-base font-semibold text-slate-900">
                {product.quoteTitle}
              </div>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-600">
                {product.quoteItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
            <Card className="p-7">
              <div className="text-base font-semibold text-slate-900">
                {product.noteTitle}
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {product.noteBody}
              </p>
            </Card>
          </div>
        </div>

        {relatedProducts.length > 0 ? (
          <div className="mt-12 border-t border-slate-200 pt-8">
            <div className="text-sm font-semibold text-slate-950">
              相关保险页面
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {relatedProducts.map((related) => (
                <TrackedLink
                  key={related.id}
                  href={related.zhHref}
                  eventName="product_click"
                  eventProps={{
                    source: "tracy_zhang_insurance_zh_product_related",
                    product: product.id,
                    related_product: related.id,
                  }}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-white"
                >
                  <div className="font-semibold text-slate-950">
                    {related.title}
                  </div>
                  <div className="mt-1 leading-6">{related.description}</div>
                  <div className="mt-3 font-medium text-slate-950">
                    查看详情 →
                  </div>
                </TrackedLink>
              ))}
            </div>
          </div>
        ) : null}
      </Container>

      <PageCTA
        title={product.ctaTitle}
        body={product.ctaBody}
        quoteHref="/zh/contact#quote"
        quoteLabel={zhCommon.quoteLabel}
      />
    </div>
  );
}

function ZhContactPage({
  market,
  office,
}: {
  market: MarketProfile;
  office: Office;
}) {
  const isLocal = market.domainRole === "local";
  const visibleOffices = isLocal ? [office] : site.offices;
  const serviceArea = isLocal ? market.serviceArea : site.serviceArea;
  const marketCopy = zhMarketContent[market.id];

  return (
    <div lang="zh-Hans" className="bg-[var(--background)]">
      <PageHero
        eyebrow="联系我们"
        title={isLocal ? `联系 ${market.label} 办公室` : "电话、短信或提交中文保险咨询"}
        subtitle={isLocal ? marketCopy.localIntro : "告诉我们发生了什么变化、需要保障什么，以及你希望如何联系。我们会把下一步安排到合适办公室。"}
        office={office}
        quoteHref="/zh/contact#quote"
        quoteLabel={zhCommon.quoteLabel}
        callLabel={`${zhCommon.callLabel} ${office.phoneDisplay}`}
      />

      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              联系方式
            </h2>
            <p className="text-base leading-7 text-slate-600">
              如有紧急证书、续保期限或贷款证明需求，请致电或短信联系办公室。新报价和保单审查可以使用表格。
            </p>

            <div className="grid gap-4">
              {visibleOffices.map((item) => (
                <Card key={item.slug} className="p-7">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-700">
                        {zhCommon.office}
                      </div>
                      <div className="mt-2 text-lg font-semibold text-slate-950">
                        {item.label}, {item.address.addressRegion}
                      </div>
                      <div className="mt-3 text-sm text-slate-700">
                        <div>{item.address.streetAddress}</div>
                        <div>
                          {item.address.addressLocality}, {item.address.addressRegion}{" "}
                          {item.address.postalCode}
                        </div>
                      </div>
                    </div>
                    {item.links?.googleMaps ? (
                      <a
                        className="text-sm font-medium text-slate-950 hover:underline"
                        href={item.links.googleMaps}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {zhCommon.directions} →
                      </a>
                    ) : null}
                  </div>

                  <div className="mt-6 grid gap-4 text-sm text-slate-700 sm:grid-cols-2">
                    <div className="grid gap-1">
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {zhCommon.phoneText}
                      </div>
                      <a className="font-medium text-slate-950 hover:underline" href={`tel:${item.phoneE164}`}>
                        {item.phoneDisplay}
                      </a>
                      {item.smsE164 ? (
                        <a className="font-medium text-slate-950 hover:underline" href={`sms:${item.smsE164}`}>
                          {zhCommon.textOffice}
                        </a>
                      ) : null}
                      <EmailAnchor
                        locale="zh"
                        source="tracy_zhang_insurance_zh_contact_page"
                        eventProps={{ office: item.slug }}
                        className="mt-2 inline-flex font-medium text-slate-950 hover:underline"
                      >
                        发送邮件 {site.contact.email}
                      </EmailAnchor>
                    </div>
                    <div className="grid gap-1">
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {zhCommon.hours}
                      </div>
                      <div>{formatZhHours(item.hours.mondayFriday)}</div>
                      <div>{formatZhHours(item.hours.saturday)}</div>
                      <div>{formatZhHours(item.hours.sunday)}</div>
                      <ScheduleAnchor
                        locale="zh"
                        source="tracy_zhang_insurance_zh_contact_page"
                        eventProps={{ office: item.slug }}
                        className="mt-2 inline-flex font-medium text-slate-950 hover:underline"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-7">
              <div className="text-base font-semibold text-slate-900">
                {zhCommon.serviceArea}
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {marketCopy.serviceAreaBody}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {serviceArea.map((area) => (
                  <span key={area} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700">
                    {area}
                  </span>
                ))}
              </div>
            </Card>
          </div>

          <div id="quote" className="scroll-mt-28">
            <Card className="p-7">
              <div className="text-xl font-semibold tracking-tight text-slate-900">
                中文保险咨询表
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                提供基本信息，我们会帮你确认下一步。
              </p>
              <div className="mt-6">
                <QuoteForm
                  locale="zh"
                  officeOptions={isLocal ? [office] : undefined}
                  defaultOfficePreference={isLocal ? office.slug : undefined}
                  contactOffice={office}
                />
              </div>
              <p className="mt-6 text-xs leading-5 text-slate-500">
                {zhCommon.noCoverageBound}
              </p>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}

function ZhLocationsPage({ market }: { market: MarketProfile }) {
  const isLocal = market.domainRole === "local";
  const markets = isLocal
    ? [market]
    : [
        getMarketProfile("san-marino"),
        getMarketProfile("la-palma"),
        getMarketProfile("cerritos"),
      ];

  return (
    <div lang="zh-Hans" className="bg-[var(--background)]">
      <PageHero
        eyebrow="办公室"
        title={isLocal ? `${market.label} 中文服务办公室` : "本地办公室，服务全加州。"}
        subtitle={isLocal ? zhMarketContent[market.id].localIntro : "选择离你最近或最符合需求的办公室开始。"}
        quoteHref="/zh/contact#quote"
        quoteLabel={zhCommon.quoteLabel}
      />
      <Container className="py-16 sm:py-20">
        <div className={isLocal ? "grid gap-4" : "grid gap-4 md:grid-cols-3"}>
          {markets.map((item) => {
            const copy = zhMarketContent[item.id];
            return (
              <TrackedLink
                key={item.id}
                href={toZhPath(`/locations/${item.id}`)}
                eventName="location_click"
                eventProps={{ source: "zh_locations_index", market: item.id }}
                className="group"
              >
                <Card className="h-full p-7 transition group-hover:-translate-y-0.5 group-hover:shadow-[var(--shadow-md)]">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {copy.eyebrow}
                  </div>
                  <div className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
                    {item.label}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {copy.subtitle}
                  </p>
                  <div className="mt-6 text-sm font-semibold text-slate-950">
                    打开页面 →
                  </div>
                </Card>
              </TrackedLink>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

function ZhLocationPage({ path }: { path: string }) {
  const marketId = path.split("/").at(-1) as MarketProfile["id"];
  const market = getMarketProfile(marketId);
  if (!market) notFound();
  const office = getOfficeById(market.primaryOfficeId);
  const copy = zhMarketContent[market.id];

  return (
    <div lang="zh-Hans" className="bg-white">
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        subtitle={copy.subtitle}
        office={office}
        quoteHref="/zh/contact#quote"
        quoteLabel={zhCommon.quoteLabel}
        callLabel={`${zhCommon.callLabel} ${office.phoneDisplay}`}
      />
      <Container className="py-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="p-7">
            <div className="text-base font-semibold text-slate-950">
              {office.label} 办公室
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {office.address.streetAddress}, {office.address.addressLocality},{" "}
              {office.address.addressRegion} {office.address.postalCode}
            </p>
            <div className="mt-4 grid gap-2 text-sm">
              <a className="font-medium text-slate-950 hover:underline" href={`tel:${office.phoneE164}`}>
                {zhCommon.callLabel} {office.phoneDisplay}
              </a>
              <EmailAnchor
                locale="zh"
                source="tracy_zhang_insurance_zh_location_page"
                eventProps={{ office: office.slug }}
                className="font-medium text-slate-950 hover:underline"
              >
                发送邮件 {site.contact.email}
              </EmailAnchor>
              <ScheduleAnchor
                locale="zh"
                source="tracy_zhang_insurance_zh_location_page"
                eventProps={{ office: office.slug }}
                className="font-medium text-slate-950 hover:underline"
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {market.serviceArea.map((area) => (
                <span key={area} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700">
                  {area}
                </span>
              ))}
            </div>
          </Card>

          <div className="grid gap-4">
            {copy.proofPoints.map((point) => (
              <Card key={point} className="p-6">
                <div className="text-base font-semibold text-slate-950">{point}</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {copy.localIntro}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
      <PageCTA
        title={`${market.label} 中文保险咨询`}
        body="告诉我们你的房屋、车辆、家庭或商业保险问题，我们会帮你整理下一步。"
        office={office}
        quoteHref="/zh/contact#quote"
        quoteLabel={zhCommon.quoteLabel}
        callLabel={`${zhCommon.callLabel} ${office.phoneDisplay}`}
      />
    </div>
  );
}

function ZhAboutPage({ market, office }: { market: MarketProfile; office: Office }) {
  const copy = zhMarketContent[market.id];
  return (
    <div lang="zh-Hans" className="bg-white">
      <PageHero
        eyebrow="关于我们"
        title="本地保险服务，中文清楚沟通。"
        subtitle={`${copy.serviceAreaBody} 我们帮助客户把保障选择、报价条件和文件需求讲清楚。`}
        office={office}
        quoteHref="/zh/contact#quote"
        quoteLabel={zhCommon.quoteLabel}
      />
      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
              你可以期待什么
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              我们帮助个人、家庭和企业理解保险选择，不用复杂术语，也不制造压力。重点是把真实风险、可行选项和下一步说清楚。
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              {zhCommon.carrierNotes}
            </p>
          </div>
          <div className="grid gap-4">
            {[
              ["快速回应", "电话或短信可以联系到本地办公室，适合续保期限、证书和文件需求。"],
              ["中文解释保障", "我们会说明限额、免赔额、除外责任和承保路径如何影响你。"],
              ["成交后继续服务", "保单变更、加保、证书和年度审查都可以持续跟进。"],
            ].map(([title, body]) => (
              <Card key={title} className="p-7">
                <div className="text-base font-semibold text-slate-950">{title}</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

function ZhTeamPage() {
  return (
    <div lang="zh-Hans" className="bg-white">
      <PageHero
        eyebrow="团队"
        title="中文沟通，清楚解释保险选择。"
        subtitle="Tracy Zhang Insurance 团队协助客户处理报价、保单审查、证书、商业保险和加州特殊承保问题。"
        quoteHref="/zh/contact#quote"
        quoteLabel={zhCommon.quoteLabel}
      />
      <Container className="py-16">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["代理和团队", "处理复杂案例、保障策略和客户沟通，确保建议能对应真实需求。"],
            ["报价和比较", "协助收集必要信息，比较可行选项，并解释影响保障的取舍。"],
            ["客户服务", "处理保单变更、加保、证书和后续跟进，避免客户卡在流程中。"],
            ["特殊市场支持", "当标准市场不可用时，协助理解加州财产、FAIR Plan 和其他路径。"],
          ].map(([title, body]) => (
            <Card key={title} className="p-7">
              <div className="text-base font-semibold text-slate-950">{title}</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}

function ZhPolicyPage({
  kind,
  office,
}: {
  kind: "privacy" | "terms" | "sms" | "consent";
  office: Office;
}) {
  const content = getPolicyContent(office)[kind];
  return (
    <div lang="zh-Hans" className="bg-white">
      <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        subtitle={content.subtitle}
        quoteHref="/zh/contact#quote"
        quoteLabel={zhCommon.quoteLabel}
      />
      <Container className="py-16">
        <div className="mx-auto max-w-3xl space-y-8 text-sm leading-6 text-slate-600">
          {content.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>
              <p className="mt-2">{section.body}</p>
            </section>
          ))}
        </div>
      </Container>
    </div>
  );
}

function ZhStoriesPage() {
  return (
    <div lang="zh-Hans" className="bg-[var(--background)]">
      <PageHero
        eyebrow="保险指南"
        title="用中文理解保险决定。"
        subtitle="关于加州保险、保障取舍、FAIR Plan、车险信息和公寓保险缺口的简明说明。"
        quoteHref="/zh/contact#quote"
        quoteLabel={zhCommon.quoteLabel}
      />
      <Container className="py-16 sm:py-20">
        <div className="grid gap-4 lg:grid-cols-3">
          {zhStories.map((story) => (
            <TrackedLink
              key={story.slug}
              href={toZhPath(`/stories/${story.slug}`)}
              eventName="guidance_click"
              eventProps={{ source: "tracy_zhang_insurance_zh_stories_index", story: story.slug }}
              className="group"
            >
              <Card className="h-full overflow-hidden p-0 transition group-hover:-translate-y-0.5 group-hover:shadow-[0_18px_55px_rgba(15,23,42,0.10)]">
                {story.image ? (
                  <div className="relative aspect-[16/10] border-b border-slate-200 bg-slate-100">
                    <Image
                      src={story.image.src}
                      alt={story.image.alt}
                      fill
                      sizes="(min-width: 1024px) 31vw, (min-width: 768px) 45vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                ) : null}
                <div className="p-7">
                  <div className="text-xs text-slate-500">
                    {formatZhDate(story.dateISO)} · {story.readingMinutes} {zhCommon.minutesRead}
                  </div>
                  <div className="mt-4 text-lg font-semibold tracking-tight text-slate-950">
                    {story.title}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {story.description}
                  </p>
                  <div className="mt-6 text-sm font-medium text-slate-950">
                    {zhCommon.readStoryLabel} →
                  </div>
                </div>
              </Card>
            </TrackedLink>
          ))}
        </div>
      </Container>
    </div>
  );
}

function ZhStoryPage({ story, office }: { story: LocalizedStory; office: Office }) {
  const relatedProducts = story.relatedProductIds
    .map((id) => zhProducts.find((product) => product.id === id))
    .filter((product): product is LocalizedProduct => Boolean(product));

  return (
    <div lang="zh-Hans" className="bg-[var(--background)]">
      <PageHero
        eyebrow="保险指南"
        title={story.title}
        subtitle={story.description}
        quoteHref="/zh/contact#quote"
        quoteLabel={zhCommon.quoteLabel}
      />
      <Container className="py-14 sm:py-16">
        <article className="mx-auto max-w-3xl">
          {story.image ? (
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100">
              <Image src={story.image.src} alt={story.image.alt} fill className="object-cover" />
            </div>
          ) : null}
          <div className="mb-8 text-sm text-slate-500">
            {formatZhDate(story.dateISO)} · {story.readingMinutes} {zhCommon.minutesRead}
          </div>
          <div className="prose prose-slate max-w-none">
            {story.sections.map((section, index) => {
              if (section.type === "h2") return <h2 key={index}>{section.text}</h2>;
              if (section.type === "ul") {
                return (
                  <ul key={index}>
                    {section.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                );
              }
              if (section.type === "quote") return <blockquote key={index}>{section.text}</blockquote>;
              if (section.type === "image") {
                return (
                  <figure key={index}>
                    <Image src={section.image.src} alt={section.image.alt} width={1200} height={675} />
                    {section.image.caption ? <figcaption>{section.image.caption}</figcaption> : null}
                  </figure>
                );
              }
              return <p key={index}>{section.text}</p>;
            })}
          </div>

          <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-slate-950">
              想讨论你的情况？
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              电话、短信或提交中文咨询表，我们会帮你找到最短的下一步。
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedAnchor
                className={buttonClasses({ variant: "primary", size: "md" })}
                href={`tel:${office.phoneE164}`}
                eventName="phone_click"
                eventProps={{
                  source: "tracy_zhang_insurance_zh_story_cta",
                  story: story.slug,
                  phone: office.phoneDisplay,
                }}
              >
                {zhCommon.callLabel} {office.phoneDisplay}
              </TrackedAnchor>
              <TrackedLink
                className={buttonClasses({ variant: "outline", size: "md" })}
                href="/zh/contact#quote"
                eventName="quote_click"
                eventProps={{ source: "tracy_zhang_insurance_zh_story_cta", story: story.slug }}
              >
                {zhCommon.quoteLabel}
              </TrackedLink>
              <ScheduleButton
                locale="zh"
                source="tracy_zhang_insurance_zh_story_cta"
                eventProps={{ story: story.slug }}
                variant="secondary"
                size="md"
              />
              <EmailButton
                locale="zh"
                source="tracy_zhang_insurance_zh_story_cta"
                eventProps={{ story: story.slug }}
                variant="ghost"
                size="md"
              />
            </div>
          </div>

          {relatedProducts.length > 0 ? (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-slate-950">
                相关保险页面
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                继续查看和这篇指南最相关的中文保险页面。
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {relatedProducts.map((product) => (
                  <TrackedLink
                    key={product.id}
                    href={product.zhHref}
                    eventName="product_click"
                    eventProps={{
                      source: "tracy_zhang_insurance_zh_story_related_products",
                      story: story.slug,
                      product: product.id,
                    }}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-white"
                  >
                    <div className="font-semibold text-slate-950">
                      {product.title}
                    </div>
                    <div className="mt-1 leading-6">{product.description}</div>
                    <div className="mt-3 font-medium text-slate-950">
                      查看详情 →
                    </div>
                  </TrackedLink>
                ))}
              </div>
            </div>
          ) : null}
        </article>
      </Container>
    </div>
  );
}

function getPolicyContent(office: Office) {
  return {
    privacy: {
      eyebrow: "隐私政策",
      title: "隐私政策",
      subtitle: "Tracy Zhang Insurance 如何处理咨询、报价、联系和沟通信息。",
      sections: [
        ["我们收集的信息", "当你请求保险协助时，我们可能收集姓名、电话、电子邮箱、邮编、偏好办公室、保险需求、留言、来源页面、广告或活动信息、IP 地址、浏览器信息和同意记录。"],
        ["我们如何使用信息", "我们使用这些信息来回应你的请求、准备报价或保障讨论、把咨询转给合适办公室、记录同意、改进营销归因，并服务保险相关请求。"],
        ["信息如何共享", "为了报价、签发、服务或支持保险产品和客户沟通，我们可能与保险公司、代理服务商、技术供应商和必要相关方共享信息。"],
        ["手机信息", "用于短信沟通的手机信息不会为了第三方或关联方营销目的而共享。它可能与协助发送短信和支持沟通的服务商共享。"],
        ["你的选择", "你可以要求停止营销沟通。短信可回复 STOP 退订，回复 HELP 获取帮助，也可以直接致电办公室。"],
      ].map(([title, body]) => ({ title, body })),
    },
    terms: {
      eyebrow: "网站条款",
      title: "网站使用条款",
      subtitle: "使用本网站和提交保险咨询的一般条款。",
      sections: [
        ["一般信息", "本网站提供一般保险信息和咨询路径，不提供法律、税务、财务或具有约束力的保险建议。"],
        ["不会在线绑定保障", "提交表格、发送信息、留言或使用本网站不会绑定、变更、续保或取消任何保险。保障只有在承保方批准并书面确认后才生效。"],
        ["可得性", "产品、承保公司、资格、核保和价格会因产品、风险、地点和当前市场条件而变化。"],
        ["联系", `如有紧急变更或保障问题，请致电 ${office.phoneDisplay}，不要只依赖网站提交。`],
      ].map(([title, body]) => ({ title, body })),
    },
    sms: {
      eyebrow: "短信条款",
      title: "短信沟通条款",
      subtitle: "Tracy Zhang Insurance 短信沟通的条款。",
      sections: [
        ["项目说明", "Tracy Zhang Insurance 可能发送与保险咨询、报价跟进、预约协调、文件请求、服务更新和单独同意的营销沟通相关的短信。"],
        ["短信频率", "短信频率取决于请求和沟通类型。处理一个有效咨询或服务请求时，你可能收到多条短信。"],
        ["费用和支持", `可能产生短信和数据费用。回复 HELP 获取帮助，或致电 ${office.phoneDisplay}。`],
        ["退订", "回复 STOP 可退订短信。运营商不对延迟或未送达短信负责。"],
        ["隐私", "请查看隐私政策了解信息如何收集和使用。手机信息不会为了第三方营销目的共享。"],
      ].map(([title, body]) => ({ title, body })),
    },
    consent: {
      eyebrow: "联系同意",
      title: "联系同意说明",
      subtitle: "中文咨询表使用的联系和短信同意说明。",
      sections: [
        ["联系同意", "提交此请求即表示你授权 Tracy Zhang Insurance 使用你提供的联系方式，就你的保险咨询与你联系。提交此表格不会绑定保险。"],
        ["短信同意", "如果你选择短信，你同意接收 Tracy Zhang Insurance 就你的咨询发送的短信。可能产生短信和数据费用。回复 STOP 可退订，回复 HELP 可获得帮助。"],
        ["营销信息", "可选营销信息需要单独明确同意；不同意营销信息也可以提交保险咨询。"],
      ].map(([title, body]) => ({ title, body })),
    },
  } as const;
}

function withChineseStructuredData(
  page: ReactNode,
  path: `/${string}`,
  market: MarketProfile,
) {
  const meta = getPageMeta(path, market);
  if (!meta) return page;

  const base = getCanonicalBase(market, path);
  const chinesePath = toZhPath(path);
  const canonical = absoluteUrl(chinesePath, base);
  const product = getProductForPath(path);
  const story = getStoryForPath(path);
  const nodes: unknown[] = [
    {
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: meta.title,
      description: meta.description,
      inLanguage: "zh-Hans",
      isPartOf: {
        "@id": `${new URL("/", base).toString().replace(/\/$/, "")}/#website`,
      },
    },
  ];

  nodes.push(
    getBreadcrumbSchema(
      [
        { name: "中文保险咨询", path: "/zh" },
        ...(path === "/" ? [] : [{ name: meta.title, path: chinesePath }]),
      ],
      base,
    ),
  );

  if (product) {
    nodes.push({
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: product.title,
      serviceType: product.title,
      description: product.description,
      url: canonical,
      inLanguage: "zh-Hans",
      provider: {
        "@id": `${new URL("/", base).toString().replace(/\/$/, "")}/#agency`,
      },
    });
  }

  if (story) {
    nodes.push({
      "@type": "Article",
      "@id": `${canonical}#article`,
      headline: story.title,
      description: story.description,
      datePublished: story.dateISO,
      dateModified: story.dateISO,
      inLanguage: "zh-Hans",
      author: {
        "@type": "Organization",
        name: site.name,
        url: site.url,
      },
      publisher: {
        "@type": "Organization",
        name: site.name,
        url: site.url,
      },
      image: story.image ? [absoluteUrl(story.image.src, base)] : undefined,
      mainEntityOfPage: canonical,
      about: story.relatedProductIds
        .map((id) => zhProducts.find((item) => item.id === id))
        .filter((item): item is LocalizedProduct => Boolean(item))
        .map((item) => ({
          "@type": "Service",
          name: item.title,
          url: absoluteUrl(item.zhHref, base),
        })),
    });
  }

  return (
    <>
      {page}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLdGraph(nodes)) }}
      />
    </>
  );
}

function getPathFromParams(slug: string[] | undefined): `/${string}` {
  if (!slug || slug.length === 0) return "/";
  return `/${slug.join("/")}` as `/${string}`;
}

function isKnownChinesePath(path: string) {
  return zhPublicRoutes.includes(path as `/${string}`);
}

function getProductForPath(path: string) {
  return getZhProductBySlug(path.replace(/^\//, ""));
}

function getStoryForPath(path: string) {
  const match = path.match(/^\/stories\/([^/]+)$/);
  return match ? getZhStory(match[1]) : undefined;
}

function getPageMeta(path: string, market: MarketProfile) {
  if (!isKnownChinesePath(path)) return null;
  if (path === "/") {
    return {
      title: zhMarketContent[market.id].metaTitle,
      description: zhMarketContent[market.id].metaDescription,
    };
  }
  const product = getProductForPath(path);
  if (product) return { title: product.metaTitle, description: product.metaDescription };
  const story = getStoryForPath(path);
  if (story) return { title: story.title, description: story.description };

  const staticMeta: Record<string, { title: string; description: string }> = {
    "/products": {
      title: "保险产品 | Tracy Zhang Insurance",
      description: "中文了解车险、房屋保险、公寓、租客、人寿、商业、伞险、FAIR Plan 和加州财产保险。",
    },
    "/about": {
      title: "关于 Tracy Zhang Insurance",
      description: "了解 Tracy Zhang Insurance 的中文保险服务、本地办公室和加州保险咨询方式。",
    },
    "/team": {
      title: "团队 | Tracy Zhang Insurance",
      description: "Tracy Zhang Insurance 团队提供中文保险沟通、报价协助、保单审查和客户服务。",
    },
    "/contact": {
      title: "中文保险咨询联系方式",
      description: "联系 Tracy Zhang Insurance，用中文咨询车险、房屋保险、商业保险、FAIR Plan 和保单审查。",
    },
    "/location": {
      title: "办公室 | Tracy Zhang Insurance",
      description: "查看 Tracy Zhang Insurance San Marino、La Palma 和 Cerritos 附近服务区域。",
    },
    "/locations": {
      title: "办公室 | Tracy Zhang Insurance",
      description: "查看 Tracy Zhang Insurance San Marino、La Palma 和 Cerritos 附近服务区域。",
    },
    "/locations/san-marino": {
      title: zhMarketContent["san-marino"].metaTitle,
      description: zhMarketContent["san-marino"].metaDescription,
    },
    "/locations/la-palma": {
      title: zhMarketContent["la-palma"].metaTitle,
      description: zhMarketContent["la-palma"].metaDescription,
    },
    "/locations/cerritos": {
      title: zhMarketContent.cerritos.metaTitle,
      description: zhMarketContent.cerritos.metaDescription,
    },
    "/privacy": {
      title: "隐私政策 | Tracy Zhang Insurance",
      description: "Tracy Zhang Insurance 中文隐私政策。",
    },
    "/terms": {
      title: "网站条款 | Tracy Zhang Insurance",
      description: "Tracy Zhang Insurance 中文网站使用条款。",
    },
    "/sms-terms": {
      title: "短信条款 | Tracy Zhang Insurance",
      description: "Tracy Zhang Insurance 中文短信沟通条款。",
    },
    "/contact-consent": {
      title: "联系同意 | Tracy Zhang Insurance",
      description: "Tracy Zhang Insurance 中文联系同意和短信同意说明。",
    },
    "/stories": {
      title: "中文保险指南 | Tracy Zhang Insurance",
      description: "用中文理解加州保险、保障取舍、FAIR Plan、车险和公寓保险问题。",
    },
  };

  return staticMeta[path] ?? null;
}

function getCanonicalBase(market: MarketProfile, path: string) {
  if (market.domainRole === "local" && path === "/") return getMarketUrl(market.id);
  return siteUrl;
}

function absoluteUrl(path: string, base: string) {
  return new URL(path, base).toString();
}

function formatZhDate(dateISO: string) {
  const [year, month, day] = dateISO.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat("zh-Hans", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function formatZhHours(value: string) {
  return value
    .replace("Mon-Fri:", "周一至周五：")
    .replace("Sat:", "周六：")
    .replace("Sun:", "周日：")
    .replace("Available by appointment", "可预约");
}
