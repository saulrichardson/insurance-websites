import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  CalendarCheck,
  ClipboardCheck,
  Languages,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";

import {
  EmailAnchor,
  EmailButton,
  ScheduleButton,
} from "@/components/contact-actions";
import { TrackedAnchor } from "@/components/marketing-events";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getFullAddressLine, getOffice, site } from "@/lib/site";
import { getSiteUrl } from "@/lib/site-url";

const businessSite = "https://tracyzhanginsurance.com";
const quoteHref = `${businessSite}/zh/contact#quote`;
const latestGuidance = {
  title: "为什么加州房主应该认真考虑 CA FAIR Plan",
  description:
    "如果房屋保险被取消、不续保或涨价太多，先比较 FAIR Plan 和补充保障结构，再决定是否接受昂贵报价。",
  href: `${businessSite}/zh/stories/why-you-should-consider-the-ca-fair-plan`,
};

export const metadata: Metadata = {
  title: { absolute: "Tracy Zhang | 加州中文保险顾问" },
  description:
    "Tracy Zhang 为加州华人家庭、房主、车主和企业主提供中文保险咨询，服务 San Marino、La Palma、Cerritos 和全加州客户。",
  alternates: {
    canonical: "/zh",
    languages: {
      "en-US": new URL("/", getSiteUrl()).toString(),
      "zh-Hans": new URL("/zh", getSiteUrl()).toString(),
      "x-default": new URL("/", getSiteUrl()).toString(),
    },
  },
  openGraph: {
    title: "Tracy Zhang | 加州中文保险顾问",
    description:
      "中文保险咨询、本地办公室和直接联系 Tracy 的方式，适合加州家庭、房主、车主和企业主。",
    type: "website",
    locale: "zh_Hans",
    url: "/zh",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tracy Zhang | 加州中文保险顾问",
    description:
      "中文保险咨询、本地办公室和直接联系 Tracy 的方式，适合加州家庭、房主、车主和企业主。",
  },
};

const advisorPrinciples = [
  {
    title: "从变化开始",
    body: "续保、新司机、贷款要求、证书、搬家或家庭决定，都会改变应该先审查什么。",
    icon: ClipboardCheck,
  },
  {
    title: "把取舍讲清楚",
    body: "Tracy 会帮助你分清保费、限额、免赔额、除外责任、时间要求和文件需求。",
    icon: ShieldCheck,
  },
  {
    title: "留下明确下一步",
    body: "下一步可能是报价、文件协助、保单审查或电话跟进，而不是让你自己解读保险术语。",
    icon: CalendarCheck,
  },
];

const callMoments = [
  {
    label: "家庭保障审查",
    title: "房屋、车险、公寓、租客或伞险问题",
    href: `${businessSite}/zh/products#household`,
  },
  {
    label: "加州房产压力",
    title: "续保、FAIR Plan、贷款证明或保障缺口",
    href: `${businessSite}/zh/california-property-insurance`,
  },
  {
    label: "家庭规划",
    title: "人寿保险、子女、房贷或长期保障",
    href: `${businessSite}/zh/life-insurance`,
  },
  {
    label: "商业需求",
    title: "证书、合同、责任险、财产或商业车险",
    href: `${businessSite}/zh/business-insurance`,
  },
];

export default function ChineseHome() {
  const sanMarino = getOffice("san-marino");
  const laPalma = getOffice("la-palma");

  return (
    <main id="main" lang="zh-Hans" className="bg-background text-foreground">
      <section className="overflow-hidden border-b border-accent/10">
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.63fr_0.37fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-accent/12 bg-surface px-4 py-2 text-xs font-semibold uppercase text-muted shadow-sm shadow-black/5">
                <span className="size-2 rounded-full bg-brand" />
                加州中文保险顾问
              </div>

              <h1 className="mt-7 max-w-4xl font-serif text-6xl font-semibold leading-[0.9] text-accent sm:text-8xl lg:text-[7.5rem]">
                Tracy Zhang
              </h1>

              <p className="mt-7 max-w-2xl text-pretty text-xl leading-8 text-foreground/76">
                为加州家庭、房主、车主和企业主提供清楚、实用的中文保险咨询。
              </p>

              <p className="mt-4 max-w-2xl text-base leading-7 text-foreground/66">
                先从你面前的真实变化开始：续保、新车、新房、证书、贷款要求、家庭规划或商业需求。Tracy 帮你把保障问题和下一步分清楚。
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <ButtonLink
                  href={quoteHref}
                  variant="primary"
                  size="md"
                  eventName="cross_site_click"
                  eventProps={{ source: "tracy_zh_hero_quote", destination: quoteHref }}
                >
                  获取中文保险帮助
                  <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
                <ScheduleButton
                  locale="zh"
                  source="tracy_zh_hero"
                  variant="outline"
                  size="md"
                  icon
                />
                <TrackedAnchor
                  href={`tel:${site.agent.officePhone.e164}`}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-accent/25 bg-surface px-5 text-sm font-medium text-accent shadow-sm shadow-black/5 hover:bg-background/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
                  eventName="phone_click"
                  eventProps={{ source: "tracy_zh_hero", phone: site.agent.officePhone.display }}
                >
                  <Phone className="size-4" aria-hidden />
                  致电 {site.agent.officePhone.display}
                </TrackedAnchor>
              </div>
            </div>

            <aside className="lg:justify-self-end" aria-label="Tracy Zhang 中文简介">
              <div className="max-w-md border border-accent/12 bg-surface shadow-2xl shadow-accent/12">
                <div className="grid grid-cols-[128px_1fr] gap-5 p-5 sm:grid-cols-[150px_1fr]">
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-background">
                    <Image
                      src={site.agent.images.headshot}
                      alt={site.agent.name}
                      fill
                      className="object-cover object-center"
                      sizes="150px"
                      priority
                    />
                  </div>
                  <div className="min-w-0 self-center">
                    <div className="text-xs font-semibold uppercase text-muted">
                      办公室电话
                    </div>
                    <div className="mt-2 whitespace-nowrap text-xl font-semibold leading-tight text-accent sm:text-2xl">
                      {site.agent.officePhone.display}
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-sm text-foreground/62">
                      <Star className="size-4 text-brand" aria-hidden />
                      {site.agent.rating.score} 评分，{site.agent.rating.reviewCount}+ 条评价
                    </div>
                  </div>
                </div>

                <div className="border-t border-accent/10 p-5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted">
                    <Languages className="size-4 text-brand" aria-hidden />
                    服务语言
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {site.agent.languages.map((language) => (
                      <span
                        key={language}
                        className="rounded-full border border-accent/12 bg-background px-3 py-1 text-xs text-foreground/70"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
                <EmailAnchor
                  locale="zh"
                  source="tracy_zh_profile_panel"
                  className="flex items-center justify-between border-t border-accent/10 px-5 py-4 text-sm font-semibold text-accent hover:bg-background/75"
                >
                  发送邮件 {site.agent.contact.email}
                  <ArrowRight className="size-4" aria-hidden />
                </EmailAnchor>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section id="approach" className="bg-surface">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <div className="text-xs font-semibold uppercase text-muted">
                Tracy 如何协助
              </div>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-accent sm:text-5xl">
                清楚的保险决定，通常从一次冷静的电话开始。
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-foreground/70">
                目标不是让你学更多保险术语，而是把发生了什么、要保护什么、下一步应该做什么说清楚。
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {advisorPrinciples.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="border border-accent/10 bg-background p-6 shadow-sm shadow-black/5">
                    <span className="grid size-11 place-items-center rounded-lg border border-accent/15 bg-surface text-brand">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-5 text-base font-semibold text-accent">{card.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-foreground/72">{card.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section id="coverage-help" className="border-y border-accent/10 bg-background">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <div className="text-xs font-semibold uppercase text-muted">
                什么时候联系
              </div>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-accent sm:text-5xl">
                从实际情况开始，不从产品菜单开始。
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-foreground/70">
                有些问题会变成报价，有些是文件请求，有些是保单审查。第一步是选对路径。
              </p>
            </div>

            <div className="grid gap-3">
              {callMoments.map((moment, index) => (
                <TrackedAnchor
                  key={moment.label}
                  href={moment.href}
                  eventName="cross_site_click"
                  eventProps={{ source: "tracy_zh_call_moment", destination: moment.href }}
                  className="group grid gap-4 border border-accent/10 bg-surface p-5 shadow-sm shadow-black/5 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/10 sm:grid-cols-[96px_1fr_auto] sm:items-center"
                >
                  <div className="font-mono text-xs text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase text-muted">
                      {moment.label}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold leading-snug text-accent">
                      {moment.title}
                    </h3>
                  </div>
                  <ArrowRight className="size-5 text-accent/45 transition group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden />
                </TrackedAnchor>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-accent text-accent-foreground">
        <Container className="py-14 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-xs font-semibold uppercase text-accent-foreground/65">
                可以开始沟通
              </div>
              <h2 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">
                把问题带来。Tracy 可以帮你把它变成清楚的保险下一步。
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-accent-foreground/74">
                你可以致电办公室沟通，也可以通过 Tracy Zhang Insurance 的中文咨询表开始。
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <ButtonLink
                href={quoteHref}
                variant="secondary"
                size="md"
                className="border-accent-foreground/20 bg-accent-foreground text-accent hover:bg-accent-foreground/90"
                eventName="cross_site_click"
                eventProps={{ source: "tracy_zh_midpage_quote", destination: quoteHref }}
              >
                获取中文保险帮助
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
              <ScheduleButton
                locale="zh"
                source="tracy_zh_midpage"
                variant="secondary"
                size="md"
                className="border-accent-foreground/25 bg-transparent text-accent-foreground hover:bg-accent-foreground/8"
                icon
              />
              <EmailButton
                locale="zh"
                source="tracy_zh_midpage"
                variant="ghost"
                size="md"
                className="text-accent-foreground hover:bg-accent-foreground/8"
                icon
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-accent/10 bg-surface">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div>
              <div className="text-xs font-semibold uppercase text-muted">
                最新保险指南
              </div>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-accent sm:text-5xl">
                用中文理解困难的加州保险决定。
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-foreground/70">
                当续保、不续保、贷款期限或 wildfire 区域问题带来压力时，先把真实选择比较清楚。
              </p>
            </div>

            <TrackedAnchor
              href={latestGuidance.href}
              eventName="cross_site_click"
              eventProps={{
                source: "tracy_zh_latest_guidance",
                destination: latestGuidance.href,
              }}
              className="group border border-accent/10 bg-background p-7 shadow-sm shadow-black/5 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/10"
            >
              <div className="text-xs font-semibold uppercase text-muted">
                CA FAIR Plan
              </div>
              <h3 className="mt-3 text-2xl font-semibold leading-tight text-accent">
                {latestGuidance.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-foreground/70">
                {latestGuidance.description}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                阅读文章
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden />
              </div>
            </TrackedAnchor>
          </div>
        </Container>
      </section>

      <section id="offices" className="bg-background">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <div className="text-xs font-semibold uppercase text-muted">
                办公室
              </div>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-accent sm:text-5xl">
                两个本地办公室，服务加州客户。
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-foreground/70">
                现有客户和新访客都可以电话联系、获取导航，或从合适办公室开始下一步。
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[sanMarino, laPalma].map((office) => (
                <div key={office.id} className="border border-accent/10 bg-surface p-6 shadow-sm shadow-black/5">
                  <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">
                    {office.location}
                  </div>
                  <div className="mt-3 text-sm leading-6 text-foreground/70">
                    {getFullAddressLine(office.id)}
                  </div>
                  <TrackedAnchor
                    href={`tel:${office.phone.e164}`}
                    eventName="phone_click"
                    eventProps={{ source: "tracy_zh_office", office: office.id }}
                    className="mt-4 inline-flex font-semibold text-accent hover:underline"
                  >
                    {office.phone.display}
                  </TrackedAnchor>
                  <div className="mt-4">
                    <ScheduleButton
                      locale="zh"
                      source="tracy_zh_office"
                      eventProps={{ office: office.id }}
                      variant="outline"
                      size="sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
