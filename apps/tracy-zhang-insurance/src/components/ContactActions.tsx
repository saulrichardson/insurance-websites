"use client";

import { CalendarDays, Mail } from "lucide-react";
import type { ReactNode } from "react";

import {
  TrackedAnchor,
  type MarketingEventProps,
} from "@/components/marketing-events";
import { buttonClasses } from "@/components/ui/button";
import { site } from "@/config/site";
import type { Locale } from "@/i18n/routing";

type ContactAnchorProps = {
  locale?: Locale;
  source: string;
  className?: string;
  eventProps?: MarketingEventProps;
  children?: ReactNode;
};

type ContactButtonProps = ContactAnchorProps & {
  variant?: Parameters<typeof buttonClasses>[0]["variant"];
  size?: Parameters<typeof buttonClasses>[0]["size"];
  icon?: boolean;
};

export function ScheduleAnchor({
  locale = "en",
  source,
  className,
  eventProps,
  children,
}: ContactAnchorProps) {
  return (
    <TrackedAnchor
      href={site.contact.scheduling.url}
      target="_blank"
      rel="noreferrer"
      className={className}
      eventName="schedule_click"
      eventProps={{
        source,
        provider: site.contact.scheduling.provider,
        destination: site.contact.scheduling.url,
        ...eventProps,
      }}
    >
      {children ?? getScheduleLabel(locale)}
    </TrackedAnchor>
  );
}

export function ScheduleButton({
  locale = "en",
  source,
  className,
  eventProps,
  children,
  variant = "outline",
  size = "md",
  icon = false,
}: ContactButtonProps) {
  return (
    <ScheduleAnchor
      locale={locale}
      source={source}
      eventProps={eventProps}
      className={buttonClasses({ variant, size, className })}
    >
      {icon ? <CalendarDays className="size-4" aria-hidden /> : null}
      {children ?? getScheduleLabel(locale)}
    </ScheduleAnchor>
  );
}

export function EmailAnchor({
  locale = "en",
  source,
  className,
  eventProps,
  children,
}: ContactAnchorProps) {
  return (
    <TrackedAnchor
      href={`mailto:${site.contact.email}`}
      className={className}
      eventName="email_click"
      eventProps={{
        source,
        email: site.contact.email,
        ...eventProps,
      }}
    >
      {children ?? getEmailLabel(locale)}
    </TrackedAnchor>
  );
}

export function EmailButton({
  locale = "en",
  source,
  className,
  eventProps,
  children,
  variant = "outline",
  size = "md",
  icon = false,
}: ContactButtonProps) {
  return (
    <EmailAnchor
      locale={locale}
      source={source}
      eventProps={eventProps}
      className={buttonClasses({ variant, size, className })}
    >
      {icon ? <Mail className="size-4" aria-hidden /> : null}
      {children ?? getEmailLabel(locale)}
    </EmailAnchor>
  );
}

export function getScheduleLabel(locale: Locale = "en") {
  return locale === "zh"
    ? site.contact.scheduling.zhLabel
    : site.contact.scheduling.label;
}

export function getEmailLabel(locale: Locale = "en") {
  return locale === "zh" ? "发送邮件" : "Email";
}
