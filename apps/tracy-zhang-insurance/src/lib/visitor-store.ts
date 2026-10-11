import type { VisitorCaptureData } from "@/lib/visitor-data";
import { getSql } from "@/lib/db";

export class VisitorStoreNotConfiguredError extends Error {
  constructor() {
    super("DATABASE_URL is not configured.");
  }
}

export async function recordVisitorCapture(input: VisitorCaptureData, requestContext: { userAgent?: string; ip?: string }) {
  const sql = getSql();
  if (!sql) throw new VisitorStoreNotConfiguredError();

  const sessionRowId = crypto.randomUUID();
  const metadata = {
    ...(input.metadata ?? {}),
    browserLanguages: input.browserLanguages,
  };

  await sql.begin(async (tx) => {
    await tx`
      insert into visitor_sessions (
        id,
        visitor_id,
        session_id,
        source_domain,
        landing_path,
        last_path,
        referrer,
        first_referrer,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_term,
        utm_content,
        campaign_slug,
        locale,
        market_id,
        office_id,
        product_id,
        story_slug,
        timezone,
        browser_language,
        screen_width,
        screen_height,
        viewport_width,
        viewport_height,
        user_agent,
        ip,
        metadata
      )
      values (
        ${sessionRowId},
        ${input.visitorId},
        ${input.sessionId},
        ${input.sourceDomain},
        ${input.landingPath ?? input.path},
        ${input.path},
        ${input.referrer ?? null},
        ${input.firstReferrer ?? null},
        ${input.utmSource ?? null},
        ${input.utmMedium ?? null},
        ${input.utmCampaign ?? null},
        ${input.utmTerm ?? null},
        ${input.utmContent ?? null},
        ${input.campaignSlug ?? null},
        ${input.locale ?? null},
        ${input.marketId ?? null},
        ${input.officeId ?? null},
        ${input.productId ?? null},
        ${input.storySlug ?? null},
        ${input.timezone ?? null},
        ${input.browserLanguage ?? null},
        ${input.screenWidth ?? null},
        ${input.screenHeight ?? null},
        ${input.viewportWidth ?? null},
        ${input.viewportHeight ?? null},
        ${requestContext.userAgent ?? null},
        ${requestContext.ip ?? null},
        ${sql.json(metadata)}
      )
      on conflict (session_id) do update
      set
        last_path = excluded.last_path,
        product_id = coalesce(excluded.product_id, visitor_sessions.product_id),
        story_slug = coalesce(excluded.story_slug, visitor_sessions.story_slug),
        viewport_width = excluded.viewport_width,
        viewport_height = excluded.viewport_height,
        metadata = visitor_sessions.metadata || excluded.metadata,
        last_seen_at = now(),
        updated_at = now()
    `;

    await tx`
      insert into visitor_events (
        visitor_id,
        session_id,
        event_name,
        source_domain,
        path,
        landing_path,
        referrer,
        first_referrer,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_term,
        utm_content,
        campaign_slug,
        locale,
        market_id,
        office_id,
        product_id,
        story_slug,
        metadata
      )
      values (
        ${input.visitorId},
        ${input.sessionId},
        ${input.eventName},
        ${input.sourceDomain},
        ${input.path},
        ${input.landingPath ?? null},
        ${input.referrer ?? null},
        ${input.firstReferrer ?? null},
        ${input.utmSource ?? null},
        ${input.utmMedium ?? null},
        ${input.utmCampaign ?? null},
        ${input.utmTerm ?? null},
        ${input.utmContent ?? null},
        ${input.campaignSlug ?? null},
        ${input.locale ?? null},
        ${input.marketId ?? null},
        ${input.officeId ?? null},
        ${input.productId ?? null},
        ${input.storySlug ?? null},
        ${sql.json(metadata)}
      )
    `;
  });
}
