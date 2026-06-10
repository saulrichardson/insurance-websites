export const CONSENT_COPY_VERSION = "2026-06-06-01";

export const consentCopy = {
  contact:
    "By submitting this request, you authorize Tracy Zhang Insurance to contact you about your insurance inquiry using the contact information provided. Submitting this form does not bind coverage.",
  sms:
    "If you choose text messages, you agree to receive texts from Tracy Zhang Insurance about your inquiry. Message and data rates may apply. Reply STOP to opt out and HELP for help.",
  marketing:
    "Optional marketing messages require separate express consent and are not required to submit an insurance request.",
};

export type LeadStatus = "new" | "contacted" | "closed" | "spam";

export type LeadInput = {
  name: string;
  email?: string;
  phone?: string;
  productInterest: string;
  preferredContact: "phone" | "text" | "email";
  officePreference?: string;
  zip?: string;
  message?: string;
  consentAccepted: boolean;
  smsConsentAccepted?: boolean;
  sourceDomain: string;
  sourcePath: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  campaignSlug?: string;
  userAgent?: string;
  ip?: string;
  honeypot?: string;
  startedAt?: string;
};

export type ValidLead = Omit<LeadInput, "honeypot" | "startedAt"> & {
  requestId: string;
  receivedAt: string;
  consentCopyVersion: typeof CONSENT_COPY_VERSION;
  fillTimeMs?: number;
  suspiciousReason?: "too_fast";
};

export type ValidationResult =
  | { ok: true; lead: ValidLead; blocked: false }
  | { ok: true; lead: ValidLead; blocked: true; reason: "honeypot" }
  | { ok: false; errors: string[] };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseLeadInput(input: FormData | Record<string, unknown>): LeadInput {
  const get = (key: string) => {
    if (input instanceof FormData) {
      const value = input.get(key);
      return typeof value === "string" ? value.trim() : "";
    }
    const value = input[key];
    return typeof value === "string" ? value.trim() : "";
  };

  const preferredContactRaw = get("preferredContact");

  return {
    name: get("name"),
    email: get("email") || undefined,
    phone: get("phone") || undefined,
    productInterest: get("productInterest") || get("interest") || "General insurance help",
    preferredContact:
      preferredContactRaw === "text" || preferredContactRaw === "email" ? preferredContactRaw : "phone",
    officePreference: get("officePreference") || get("officeSlug") || undefined,
    zip: get("zip") || undefined,
    message: get("message") || undefined,
    consentAccepted: get("consentAccepted") === "on" || get("consentAccepted") === "true",
    smsConsentAccepted: get("smsConsentAccepted") === "on" || get("smsConsentAccepted") === "true",
    sourceDomain: get("sourceDomain"),
    sourcePath: get("sourcePath") || "/",
    referrer: get("referrer") || undefined,
    utmSource: get("utmSource") || undefined,
    utmMedium: get("utmMedium") || undefined,
    utmCampaign: get("utmCampaign") || undefined,
    utmTerm: get("utmTerm") || undefined,
    utmContent: get("utmContent") || undefined,
    campaignSlug: get("campaignSlug") || undefined,
    userAgent: get("userAgent") || undefined,
    ip: get("ip") || undefined,
    honeypot: get("company") || get("honeypot") || undefined,
    startedAt: get("startedAt") || undefined,
  };
}

export function validateLead(input: LeadInput, now = new Date()): ValidationResult {
  const errors: string[] = [];
  const hasEmail = Boolean(input.email && emailPattern.test(input.email));
  const hasPhone = Boolean(input.phone && input.phone.replace(/\D+/g, "").length >= 10);
  const fillTimeMs = getFillTimeMs(input.startedAt, now);

  if (!input.name.trim()) errors.push("Please provide your name.");
  if (!hasEmail && !hasPhone) errors.push("Please provide a valid phone number or email address.");
  if (input.email && !hasEmail) errors.push("Please provide a valid email address.");
  if (!input.productInterest.trim()) errors.push("Please choose what you need help with.");
  if (!input.consentAccepted) errors.push("Please accept the contact consent before submitting.");
  if (input.preferredContact === "text" && !input.smsConsentAccepted) {
    errors.push("Please accept the text message consent or choose another contact method.");
  }

  const baseLead: ValidLead = {
    name: input.name.trim(),
    email: input.email?.trim(),
    phone: input.phone?.trim(),
    productInterest: input.productInterest.trim(),
    preferredContact: input.preferredContact,
    officePreference: input.officePreference?.trim(),
    zip: input.zip?.trim(),
    message: input.message?.trim(),
    consentAccepted: input.consentAccepted,
    smsConsentAccepted: input.smsConsentAccepted,
    sourceDomain: input.sourceDomain.trim() || "unknown",
    sourcePath: input.sourcePath.trim() || "/",
    referrer: input.referrer?.trim(),
    utmSource: input.utmSource?.trim(),
    utmMedium: input.utmMedium?.trim(),
    utmCampaign: input.utmCampaign?.trim(),
    utmTerm: input.utmTerm?.trim(),
    utmContent: input.utmContent?.trim(),
    campaignSlug: input.campaignSlug?.trim(),
    userAgent: input.userAgent?.trim(),
    ip: input.ip?.trim(),
    requestId: crypto.randomUUID(),
    receivedAt: now.toISOString(),
    consentCopyVersion: CONSENT_COPY_VERSION,
    ...(fillTimeMs >= 0 ? { fillTimeMs } : {}),
    ...(fillTimeMs >= 0 && fillTimeMs < 1200 ? { suspiciousReason: "too_fast" as const } : {}),
  };

  if (errors.length > 0) return { ok: false, errors };

  if (input.honeypot?.trim()) {
    return { ok: true, lead: baseLead, blocked: true, reason: "honeypot" };
  }

  return { ok: true, lead: baseLead, blocked: false };
}

export function buildLeadEmailText(lead: ValidLead) {
  const lines = [
    `New insurance lead (${lead.requestId})`,
    "",
    `Received: ${lead.receivedAt}`,
    `Source: ${lead.sourceDomain}${lead.sourcePath}`,
    lead.referrer ? `Referrer: ${lead.referrer}` : "",
    lead.utmCampaign ? `Campaign: ${lead.utmCampaign}` : "",
    "",
    `Name: ${lead.name}`,
    lead.phone ? `Phone: ${lead.phone}` : "",
    lead.email ? `Email: ${lead.email}` : "",
    `Preferred contact: ${lead.preferredContact}`,
    lead.officePreference ? `Office preference: ${lead.officePreference}` : "",
    lead.zip ? `ZIP: ${lead.zip}` : "",
    `Interest: ${lead.productInterest}`,
    "",
    lead.message ? `Message:\n${lead.message}` : "",
    "",
    `Consent version: ${lead.consentCopyVersion}`,
    `SMS consent: ${lead.smsConsentAccepted ? "yes" : "no"}`,
    lead.suspiciousReason ? `Suspicious signal: ${lead.suspiciousReason}` : "",
  ];

  return lines.filter(Boolean).join("\n");
}

function getFillTimeMs(startedAt: string | undefined, now: Date) {
  if (!startedAt) return -1;
  const parsed = Number.parseInt(startedAt, 10);
  return Number.isFinite(parsed) ? now.getTime() - parsed : -1;
}

export const AUTO_LEAD_FORM_VERSION = "2026-06-09-01";
export const AUTO_LEAD_CONSENT_CERTIFICATION_VERSION = "2026-06-09-01";

export const autoLeadComplianceWarning =
  "You are submitting factual lead information only. Do not quote premiums, recommend coverage, compare insurance products, explain policy terms, complete applications, bind coverage, or represent that coverage is available or effective unless and until you are properly licensed and authorized.";

export const autoLeadFinalCertification =
  "By submitting this lead, you certify that the prospect consented to be contacted by a licensed insurance professional about auto insurance, that the prospect has present interest in being contacted about auto insurance, and that the submitted information is reasonably complete and accurate to your knowledge based on information provided by the prospect.";

export const autoLeadStatuses = [
  "submitted",
  "under_review",
  "correction_requested",
  "accepted_qualified_lead",
  "rejected",
  "duplicate",
  "invalid_lead",
  "revoked",
  "assigned_to_licensed_producer",
  "contact_attempted",
  "contacted",
  "unable_to_contact",
  "not_interested",
  "quote_discussion_required",
  "closed",
] as const;

export type AutoLeadStatus = (typeof autoLeadStatuses)[number];

export const autoLeadPaymentStatuses = [
  "not_eligible",
  "pending_review",
  "eligible_for_qualified_lead_fee",
  "approved_for_payment",
  "paid",
  "revoked_before_payment",
  "revoked_after_payment",
  "offset_pending",
  "offset_applied",
] as const;

export type AutoLeadPaymentStatus = (typeof autoLeadPaymentStatuses)[number];

export const autoLeadCertificationFields = [
  "informationAccurate",
  "noFalseInformation",
  "prospectConsented",
  "prospectPresentInterest",
  "didNotQuote",
  "didNotRecommend",
  "didNotCompare",
  "didNotExplainTerms",
  "didNotCompleteApplication",
  "didNotBind",
  "didNotRepresentCoverage",
  "understandsRejection",
] as const;

export type AutoLeadCertificationField =
  (typeof autoLeadCertificationFields)[number];

export type AutoLeadInput = {
  submitterId: string;
  submitterName: string;
  submitterEmail: string;
  submitterPhone?: string;
  submitterEntityType?: string;
  prospectName: string;
  prospectPhone: string;
  prospectEmail?: string;
  residentialAddress?: string;
  city?: string;
  state?: string;
  zip?: string;
  preferredContactMethod?: string;
  preferredContactTime?: string;
  consentObtainedAt: string;
  consentMethod: string;
  consentProofNotes?: string;
  consentCertified: boolean;
  vehicleYear?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleTrim?: string;
  vin?: string;
  garagingAddress?: string;
  garagingZip?: string;
  ownershipStatus?: string;
  primaryUse?: string;
  annualMileage?: string;
  commuteDistance?: string;
  currentlyInsured?: string;
  currentCarrier?: string;
  primaryDriverName: string;
  primaryDriverDob?: string;
  primaryDriverLicenseState?: string;
  primaryDriverLicenseStatus?: string;
  otherRegularDrivers?: string;
  otherRegularDriverNames?: string;
  drivingHistoryDisclosure?: string;
  presentInterest: boolean;
  desiredTiming?: string;
  currentPolicyExpiration?: string;
  shoppingReason?: string;
  coveragePreference?: string;
  coveragePreferenceOther?: string;
  sourceUrl?: string;
  campaignId?: string;
  certifications: Record<AutoLeadCertificationField, boolean>;
  sourceDomain: string;
  sourcePath: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  userAgent?: string;
  ip?: string;
  honeypot?: string;
  startedAt?: string;
};

export type ValidAutoLead = Omit<AutoLeadInput, "honeypot" | "startedAt"> & {
  requestId: string;
  receivedAt: string;
  formVersion: typeof AUTO_LEAD_FORM_VERSION;
  consentCertificationVersion: typeof AUTO_LEAD_CONSENT_CERTIFICATION_VERSION;
  fillTimeMs?: number;
  suspiciousReason?: "too_fast";
};

export type AutoLeadValidationResult =
  | { ok: true; lead: ValidAutoLead; blocked: false }
  | { ok: true; lead: ValidAutoLead; blocked: true; reason: "honeypot" }
  | { ok: false; errors: string[] };

export function parseAutoLeadInput(
  input: FormData | Record<string, unknown>,
): AutoLeadInput {
  const get = (key: string) => {
    if (input instanceof FormData) {
      const value = input.get(key);
      return typeof value === "string" ? value.trim() : "";
    }
    const value = input[key];
    return typeof value === "string" ? value.trim() : "";
  };

  const bool = (key: string) => {
    const value = get(key);
    return value === "on" || value === "true" || value === "yes";
  };
  const termsAccepted = bool("autoLeadTermsAccepted") || bool("leadTermsAccepted");

  const certifications = Object.fromEntries(
    autoLeadCertificationFields.map((field) => [field, termsAccepted || bool(field)]),
  ) as Record<AutoLeadCertificationField, boolean>;

  return {
    submitterId: get("submitterId"),
    submitterName: get("submitterName"),
    submitterEmail: get("submitterEmail"),
    submitterPhone: get("submitterPhone") || undefined,
    submitterEntityType: get("submitterEntityType") || undefined,
    prospectName: get("prospectName"),
    prospectPhone: get("prospectPhone"),
    prospectEmail: get("prospectEmail") || undefined,
    residentialAddress: get("residentialAddress") || undefined,
    city: get("city") || undefined,
    state: get("state") || undefined,
    zip: get("zip") || undefined,
    preferredContactMethod: get("preferredContactMethod") || undefined,
    preferredContactTime: get("preferredContactTime") || undefined,
    consentObtainedAt: get("consentObtainedAt"),
    consentMethod: get("consentMethod"),
    consentProofNotes: get("consentProofNotes") || undefined,
    consentCertified: termsAccepted || bool("consentCertified"),
    vehicleYear: get("vehicleYear") || undefined,
    vehicleMake: get("vehicleMake") || undefined,
    vehicleModel: get("vehicleModel") || undefined,
    vehicleTrim: get("vehicleTrim") || undefined,
    vin: get("vin") || undefined,
    garagingAddress: get("garagingAddress") || undefined,
    garagingZip: get("garagingZip") || undefined,
    ownershipStatus: get("ownershipStatus") || undefined,
    primaryUse: get("primaryUse") || undefined,
    annualMileage: get("annualMileage") || undefined,
    commuteDistance: get("commuteDistance") || undefined,
    currentlyInsured: get("currentlyInsured") || undefined,
    currentCarrier: get("currentCarrier") || undefined,
    primaryDriverName: get("primaryDriverName"),
    primaryDriverDob: get("primaryDriverDob") || undefined,
    primaryDriverLicenseState: get("primaryDriverLicenseState") || undefined,
    primaryDriverLicenseStatus: get("primaryDriverLicenseStatus") || undefined,
    otherRegularDrivers: get("otherRegularDrivers") || undefined,
    otherRegularDriverNames: get("otherRegularDriverNames") || undefined,
    drivingHistoryDisclosure: get("drivingHistoryDisclosure") || undefined,
    presentInterest: get("presentInterest") === "yes" || bool("presentInterestConfirmed"),
    desiredTiming: get("desiredTiming") || undefined,
    currentPolicyExpiration: get("currentPolicyExpiration") || undefined,
    shoppingReason: get("shoppingReason") || undefined,
    coveragePreference: get("coveragePreference") || undefined,
    coveragePreferenceOther: get("coveragePreferenceOther") || undefined,
    sourceUrl: get("sourceUrl") || undefined,
    campaignId: get("campaignId") || undefined,
    certifications,
    sourceDomain: get("sourceDomain"),
    sourcePath: get("sourcePath") || "/",
    referrer: get("referrer") || undefined,
    utmSource: get("utmSource") || undefined,
    utmMedium: get("utmMedium") || undefined,
    utmCampaign: get("utmCampaign") || undefined,
    utmTerm: get("utmTerm") || undefined,
    utmContent: get("utmContent") || undefined,
    userAgent: get("userAgent") || undefined,
    ip: get("ip") || undefined,
    honeypot: get("company") || get("honeypot") || undefined,
    startedAt: get("startedAt") || undefined,
  };
}

export function validateAutoLead(
  input: AutoLeadInput,
  now = new Date(),
): AutoLeadValidationResult {
  const errors: string[] = [];
  const submitterId =
    input.submitterId.trim() ||
    input.submitterEmail.trim().toLowerCase() ||
    input.submitterName.trim().toLowerCase().replace(/\s+/g, "-");
  const hasSubmitterEmail = emailPattern.test(input.submitterEmail);
  const hasProspectPhone = input.prospectPhone.replace(/\D+/g, "").length >= 10;
  const hasProspectEmail = Boolean(input.prospectEmail && emailPattern.test(input.prospectEmail));
  const hasGaragingZip = Boolean(input.garagingZip?.trim());
  const hasVin = Boolean(input.vin?.trim());
  const missingCertifications = autoLeadCertificationFields.filter(
    (field) => !input.certifications[field],
  );
  const fillTimeMs = getFillTimeMs(input.startedAt, now);

  if (!input.submitterName.trim()) errors.push("Submitter name is required.");
  if (!hasSubmitterEmail) errors.push("A valid submitter email is required.");
  if (!input.prospectName.trim()) errors.push("Prospect full legal name is required.");
  if (!hasProspectPhone) errors.push("A valid prospect phone number is required.");
  if (input.prospectEmail && !hasProspectEmail) errors.push("Prospect email is not valid.");
  if (!hasVin) errors.push("VIN is required.");
  if (!hasGaragingZip) errors.push("Garaging ZIP is required.");
  if (!input.consentObtainedAt.trim()) errors.push("Consent date and time is required.");
  if (!input.consentMethod.trim()) errors.push("Consent method is required.");
  if (!input.consentCertified) {
    errors.push("You must confirm the prospect gave permission before submission.");
  }
  if (!input.presentInterest) {
    errors.push("Only submit leads where the prospect has present interest in being contacted.");
  }
  if (!input.primaryDriverName.trim()) errors.push("Primary driver full legal name is required.");
  if (missingCertifications.length > 0) {
    errors.push("All required confirmations must be checked before submission.");
  }

  const lead: ValidAutoLead = {
    ...input,
    submitterId: submitterId,
    submitterName: input.submitterName.trim(),
    submitterEmail: input.submitterEmail.trim(),
    submitterPhone: input.submitterPhone?.trim(),
    submitterEntityType: input.submitterEntityType?.trim(),
    prospectName: input.prospectName.trim(),
    prospectPhone: input.prospectPhone.trim(),
    prospectEmail: input.prospectEmail?.trim(),
    residentialAddress: input.residentialAddress?.trim(),
    city: input.city?.trim(),
    state: input.state?.trim(),
    zip: input.zip?.trim(),
    preferredContactMethod: input.preferredContactMethod?.trim(),
    preferredContactTime: input.preferredContactTime?.trim(),
    consentObtainedAt: input.consentObtainedAt.trim(),
    consentMethod: input.consentMethod.trim(),
    consentProofNotes: input.consentProofNotes?.trim(),
    vehicleYear: input.vehicleYear?.trim(),
    vehicleMake: input.vehicleMake?.trim(),
    vehicleModel: input.vehicleModel?.trim(),
    vehicleTrim: input.vehicleTrim?.trim(),
    vin: input.vin?.trim().toUpperCase(),
    garagingAddress: input.garagingAddress?.trim(),
    garagingZip: input.garagingZip?.trim(),
    ownershipStatus: input.ownershipStatus?.trim(),
    primaryUse: input.primaryUse?.trim(),
    annualMileage: input.annualMileage?.trim(),
    commuteDistance: input.commuteDistance?.trim(),
    currentlyInsured: input.currentlyInsured?.trim(),
    currentCarrier: input.currentCarrier?.trim(),
    primaryDriverName: input.primaryDriverName.trim(),
    primaryDriverDob: input.primaryDriverDob?.trim(),
    primaryDriverLicenseState: input.primaryDriverLicenseState?.trim(),
    primaryDriverLicenseStatus: input.primaryDriverLicenseStatus?.trim(),
    otherRegularDrivers: input.otherRegularDrivers?.trim(),
    otherRegularDriverNames: input.otherRegularDriverNames?.trim(),
    drivingHistoryDisclosure: input.drivingHistoryDisclosure?.trim(),
    desiredTiming: input.desiredTiming?.trim(),
    currentPolicyExpiration: input.currentPolicyExpiration?.trim(),
    shoppingReason: input.shoppingReason?.trim(),
    coveragePreference: input.coveragePreference?.trim(),
    coveragePreferenceOther: input.coveragePreferenceOther?.trim(),
    sourceUrl: input.sourceUrl?.trim(),
    campaignId: input.campaignId?.trim(),
    sourceDomain: input.sourceDomain.trim() || "unknown",
    sourcePath: input.sourcePath.trim() || "/",
    referrer: input.referrer?.trim(),
    utmSource: input.utmSource?.trim(),
    utmMedium: input.utmMedium?.trim(),
    utmCampaign: input.utmCampaign?.trim(),
    utmTerm: input.utmTerm?.trim(),
    utmContent: input.utmContent?.trim(),
    userAgent: input.userAgent?.trim(),
    ip: input.ip?.trim(),
    requestId: crypto.randomUUID(),
    receivedAt: now.toISOString(),
    formVersion: AUTO_LEAD_FORM_VERSION,
    consentCertificationVersion: AUTO_LEAD_CONSENT_CERTIFICATION_VERSION,
    ...(fillTimeMs >= 0 ? { fillTimeMs } : {}),
    ...(fillTimeMs >= 0 && fillTimeMs < 1200 ? { suspiciousReason: "too_fast" as const } : {}),
  };

  if (errors.length > 0) return { ok: false, errors };

  if (input.honeypot?.trim()) {
    return { ok: true, lead, blocked: true, reason: "honeypot" };
  }

  return { ok: true, lead, blocked: false };
}

export function getAutoLeadFeeCents(ladderPosition: number) {
  if (ladderPosition <= 0) return 0;
  if (ladderPosition <= 5) return 7500;
  if (ladderPosition <= 15) return 4000;
  if (ladderPosition <= 30) return 2500;
  return 1500;
}

export function buildAutoLeadEmailText(lead: ValidAutoLead) {
  const vehicle = [
    lead.vehicleYear,
    lead.vehicleMake,
    lead.vehicleModel,
    lead.vehicleTrim,
  ]
    .filter(Boolean)
    .join(" ");
  const address = [lead.residentialAddress, lead.city, lead.state, lead.zip]
    .filter(Boolean)
    .join(", ");
  const driverDetails = [
    lead.primaryDriverLicenseStatus ? `License status: ${lead.primaryDriverLicenseStatus}` : "",
    lead.otherRegularDrivers ? `Other regular drivers: ${lead.otherRegularDrivers}` : "",
    lead.drivingHistoryDisclosure
      ? `Information disclosed by prospect:\n${lead.drivingHistoryDisclosure}`
      : "",
  ].filter(Boolean);
  const timingAndPreference = [
    lead.desiredTiming ? `Desired timing: ${lead.desiredTiming}` : "",
    lead.currentPolicyExpiration ? `Current policy expiration: ${lead.currentPolicyExpiration}` : "",
    lead.shoppingReason ? `Reason for shopping: ${lead.shoppingReason}` : "",
    lead.coveragePreference ? `Coverage preference stated by prospect: ${lead.coveragePreference}` : "",
    lead.coveragePreferenceOther ? `Other preference: ${lead.coveragePreferenceOther}` : "",
  ].filter(Boolean);

  const lines = [
    `New auto lead (${lead.requestId})`,
    "",
    `Received: ${lead.receivedAt}`,
    `Source: ${lead.sourceDomain}${lead.sourcePath}`,
    lead.referrer ? `Referrer: ${lead.referrer}` : "",
    lead.campaignId ? `Campaign/source ID: ${lead.campaignId}` : "",
    "",
    "Submitter",
    `ID: ${lead.submitterId}`,
    `Name: ${lead.submitterName}`,
    `Email: ${lead.submitterEmail}`,
    lead.submitterPhone ? `Phone: ${lead.submitterPhone}` : "",
    "",
    "Prospect",
    `Name: ${lead.prospectName}`,
    `Phone: ${lead.prospectPhone}`,
    lead.prospectEmail ? `Email: ${lead.prospectEmail}` : "",
    address ? `Address: ${address}` : "",
    lead.preferredContactMethod ? `Preferred contact: ${lead.preferredContactMethod}` : "",
    lead.preferredContactTime ? `Preferred time: ${lead.preferredContactTime}` : "",
    "",
    "Consent",
    `Consent obtained: ${lead.consentObtainedAt}`,
    `Consent method: ${lead.consentMethod}`,
    `Present interest: ${lead.presentInterest ? "yes" : "no"}`,
    lead.consentProofNotes ? `Proof/notes: ${lead.consentProofNotes}` : "",
    "",
    "Vehicle",
    vehicle ? `Vehicle: ${vehicle}` : "",
    lead.vin ? `VIN: ${lead.vin}` : "",
    lead.garagingZip ? `Garaging ZIP: ${lead.garagingZip}` : "",
    lead.ownershipStatus ? `Ownership: ${lead.ownershipStatus}` : "",
    lead.primaryUse ? `Use: ${lead.primaryUse}` : "",
    lead.currentlyInsured ? `Currently insured: ${lead.currentlyInsured}` : "",
    lead.currentCarrier ? `Current carrier: ${lead.currentCarrier}` : "",
    "",
    "Driver",
    `Primary driver: ${lead.primaryDriverName}`,
    ...driverDetails,
    ...(timingAndPreference.length > 0
      ? ["", "Timing and stated preference", ...timingAndPreference]
      : []),
    "",
    `Form version: ${lead.formVersion}`,
    `Consent certification version: ${lead.consentCertificationVersion}`,
    lead.suspiciousReason ? `Suspicious signal: ${lead.suspiciousReason}` : "",
  ];

  return lines.filter(Boolean).join("\n");
}
