"use client";

import { usePathname } from "next/navigation";
import { Mail, MessageSquare, Phone } from "lucide-react";
import type { Office } from "@insurance-websites/domain";
import { publicContact } from "@insurance-websites/domain";
import { TrackedAnchor } from "@/components/marketing-events";
import { isZhPath } from "@/i18n/routing";

export function MobileContactBar({ office }: { office: Office }) {
  const zh = isZhPath(usePathname());
  const source = "site_mobile_contact";
  return (
    <nav
      className="site-mobile-contact"
      aria-label={zh ? "快捷联系" : "Quick contact"}
    >
      <TrackedAnchor
        href={`tel:${office.phoneE164}`}
        eventName="phone_click"
        eventProps={{ source, office: office.id, phone: office.phoneDisplay }}
      >
        <Phone aria-hidden />
        {zh ? "致电" : "Call"}
      </TrackedAnchor>
      <TrackedAnchor
        href={`sms:${office.smsE164}`}
        eventName="sms_click"
        eventProps={{ source, office: office.id, phone: office.smsE164 }}
      >
        <MessageSquare aria-hidden />
        {zh ? "短信" : "Text"}
      </TrackedAnchor>
      <TrackedAnchor
        href={`mailto:${publicContact.email}`}
        eventName="email_click"
        eventProps={{ source, office: office.id, email: publicContact.email }}
      >
        <Mail aria-hidden />
        {zh ? "邮件" : "Email"}
      </TrackedAnchor>
    </nav>
  );
}
