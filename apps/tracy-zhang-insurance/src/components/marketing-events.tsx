"use client";

import Link from "next/link";
import type { ComponentProps, MouseEventHandler } from "react";
import { track } from "@vercel/analytics";

type EventValue = string | number | boolean | null | undefined;
export type MarketingEventProps = Record<string, EventValue>;

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      eventParams?: Record<string, string | number | boolean | null>,
    ) => void;
  }
}

function cleanProps(props?: MarketingEventProps) {
  if (!props) return undefined;

  const entries = Object.entries(props).filter(([, value]) => value !== undefined);
  if (entries.length === 0) return undefined;

  return Object.fromEntries(entries) as Record<string, string | number | boolean | null>;
}

export function trackMarketingEvent(
  eventName: string,
  props?: MarketingEventProps,
) {
  const eventProps = cleanProps(props);

  track(eventName, eventProps);

  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, eventProps);
  }
}

type TrackedLinkProps = ComponentProps<typeof Link> & {
  eventName: string;
  eventProps?: MarketingEventProps;
};

export function TrackedLink({
  eventName,
  eventProps,
  onClick,
  ...props
}: TrackedLinkProps) {
  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    trackMarketingEvent(eventName, eventProps);
    onClick?.(event);
  };

  return <Link {...props} onClick={handleClick} />;
}

type TrackedAnchorProps = ComponentProps<"a"> & {
  eventName: string;
  eventProps?: MarketingEventProps;
};

export function TrackedAnchor({
  eventName,
  eventProps,
  onClick,
  ...props
}: TrackedAnchorProps) {
  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    trackMarketingEvent(eventName, eventProps);
    onClick?.(event);
  };

  return <a {...props} onClick={handleClick} />;
}
