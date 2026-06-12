"use client";

import { CalendarDays, Mail } from "lucide-react";
import type { MouseEventHandler, ReactNode } from "react";

import {
  TrackedAnchor,
  type MarketingEventProps,
} from "@/components/marketing-events";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";

type Locale = "en" | "zh";

type ContactProps = {
  locale?: Locale;
  source: string;
  className?: string;
  eventProps?: MarketingEventProps;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

type ContactButtonProps = ContactProps & {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md";
  icon?: boolean;
};

export function ScheduleAnchor({
  locale = "en",
  source,
  className,
  eventProps,
  children,
  onClick,
}: ContactProps) {
  return (
    <TrackedAnchor
      href={site.agent.contact.scheduling.url}
      target="_blank"
      rel="noreferrer"
      className={className}
      eventName="schedule_click"
      eventProps={{
        source,
        provider: site.agent.contact.scheduling.provider,
        destination: site.agent.contact.scheduling.url,
        ...eventProps,
      }}
      onClick={onClick}
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
  onClick,
  variant = "outline",
  size = "md",
  icon = false,
}: ContactButtonProps) {
  return (
    <ButtonLink
      href={site.agent.contact.scheduling.url}
      variant={variant}
      size={size}
      className={className}
      eventName="schedule_click"
      eventProps={{
        source,
        provider: site.agent.contact.scheduling.provider,
        destination: site.agent.contact.scheduling.url,
        ...eventProps,
      }}
      onClick={onClick}
    >
      {icon ? <CalendarDays className="size-4" aria-hidden /> : null}
      {children ?? getScheduleLabel(locale)}
    </ButtonLink>
  );
}

export function EmailAnchor({
  locale = "en",
  source,
  className,
  eventProps,
  children,
  onClick,
}: ContactProps) {
  return (
    <TrackedAnchor
      href={`mailto:${site.agent.contact.email}`}
      className={className}
      eventName="email_click"
      eventProps={{
        source,
        email: site.agent.contact.email,
        ...eventProps,
      }}
      onClick={onClick}
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
  onClick,
  variant = "outline",
  size = "md",
  icon = false,
}: ContactButtonProps) {
  return (
    <ButtonLink
      href={`mailto:${site.agent.contact.email}`}
      variant={variant}
      size={size}
      className={className}
      eventName="email_click"
      eventProps={{
        source,
        email: site.agent.contact.email,
        ...eventProps,
      }}
      onClick={onClick}
    >
      {icon ? <Mail className="size-4" aria-hidden /> : null}
      {children ?? getEmailLabel(locale)}
    </ButtonLink>
  );
}

export function getScheduleLabel(locale: Locale = "en") {
  return locale === "zh"
    ? site.agent.contact.scheduling.zhLabel
    : site.agent.contact.scheduling.label;
}

export function getEmailLabel(locale: Locale = "en") {
  return locale === "zh" ? "发送邮件" : "Email Tracy";
}
