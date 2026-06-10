import { describe, expect, it } from "vitest";

import {
  buildAutoLeadEmailText,
  autoLeadCertificationFields,
  getAutoLeadFeeCents,
  parseAutoLeadInput,
  parseLeadInput,
  validateAutoLead,
  validateLead,
} from "./index";

describe("lead validation", () => {
  it("accepts a consented lead with phone contact", () => {
    const result = validateLead(
      parseLeadInput({
        name: "Jane Customer",
        phone: "(626) 300-8338",
        productInterest: "Home Insurance",
        preferredContact: "phone",
        consentAccepted: "true",
        sourceDomain: "tracyzhanginsurance.com",
        sourcePath: "/home-insurance",
      }),
      new Date("2026-06-06T18:00:00.000Z"),
    );

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.blocked).toBe(false);
      expect(result.lead.productInterest).toBe("Home Insurance");
      expect(result.lead.consentCopyVersion).toBe("2026-06-06-01");
    }
  });

  it("requires explicit SMS consent for text preference", () => {
    const result = validateLead(
      parseLeadInput({
        name: "Jane Customer",
        phone: "(626) 300-8338",
        productInterest: "Auto Insurance",
        preferredContact: "text",
        consentAccepted: "true",
        sourceDomain: "tracyzhanginsurance.com",
        sourcePath: "/auto-insurance",
      }),
    );

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.join(" ")).toContain("text message consent");
    }
  });

  it("blocks honeypot submissions without making them validation failures", () => {
    const result = validateLead(
      parseLeadInput({
        name: "Bot",
        phone: "(626) 300-8338",
        productInterest: "Business Insurance",
        preferredContact: "phone",
        consentAccepted: "true",
        company: "filled",
        sourceDomain: "tracyzhanginsurance.com",
        sourcePath: "/business-insurance",
      }),
    );

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.blocked).toBe(true);
    }
  });
});

describe("submitter auto lead validation", () => {
  const validAutoLead = {
    submitterId: "CTR-1001",
    submitterName: "Approved Lead Partner",
    submitterEmail: "partner@example.com",
    prospectName: "Jordan Driver",
    prospectPhone: "(626) 555-0199",
    residentialAddress: "100 Main St",
    city: "Pasadena",
    state: "CA",
    zip: "91101",
    consentObtainedAt: "2026-06-09T09:30",
    consentMethod: "phone",
    consentCertified: "true",
    vin: "4T1BF1FK1HU123456",
    vehicleYear: "2021",
    vehicleMake: "Toyota",
    vehicleModel: "Camry",
    garagingZip: "91101",
    primaryDriverName: "Jordan Driver",
    presentInterest: "yes",
    desiredTiming: "within_7_days",
    ...Object.fromEntries(autoLeadCertificationFields.map((field) => [field, "true"])),
  };

  it("accepts a factual one-car submitter lead with consent certification", () => {
    const result = validateAutoLead(
      parseAutoLeadInput(validAutoLead),
      new Date("2026-06-09T17:00:00.000Z"),
    );

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.blocked).toBe(false);
      expect(result.lead.vehicleMake).toBe("Toyota");
      expect(result.lead.formVersion).toBe("2026-06-09-01");
    }
  });

  it("accepts submitter name and email without a visible submitter ID", () => {
    const result = validateAutoLead(
      parseAutoLeadInput({
        ...validAutoLead,
        submitterId: "",
      }),
      new Date("2026-06-09T17:00:00.000Z"),
    );

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.lead.submitterId).toBe("partner@example.com");
    }
  });

  it("accepts the single public terms checkbox as all required certifications", () => {
    const result = validateAutoLead(
      parseAutoLeadInput({
        ...validAutoLead,
        consentCertified: "",
        autoLeadTermsAccepted: "true",
        ...Object.fromEntries(autoLeadCertificationFields.map((field) => [field, ""])),
      }),
      new Date("2026-06-09T17:00:00.000Z"),
    );

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.lead.consentCertified).toBe(true);
      expect(Object.values(result.lead.certifications).every(Boolean)).toBe(true);
    }
  });

  it("does not require prospect address, source details, or contact timing", () => {
    const result = validateAutoLead(
      parseAutoLeadInput({
        ...validAutoLead,
        residentialAddress: "",
        city: "",
        state: "",
        zip: "",
        preferredContactMethod: "",
        preferredContactTime: "",
        sourceUrl: "",
        desiredTiming: "",
        currentPolicyExpiration: "",
      }),
      new Date("2026-06-09T17:00:00.000Z"),
    );

    expect(result.ok).toBe(true);
    if (result.ok) {
      const emailText = buildAutoLeadEmailText(result.lead);
      expect(emailText).toContain("Garaging ZIP: 91101");
      expect(emailText).not.toContain("Address:");
      expect(emailText).not.toContain("Preferred time:");
      expect(emailText).not.toContain("Timing and stated preference");
    }
  });

  it("requires a valid prospect phone number", () => {
    const result = validateAutoLead(
      parseAutoLeadInput({
        ...validAutoLead,
        prospectPhone: "",
      }),
    );

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.join(" ")).toContain("prospect phone");
    }
  });

  it("requires VIN and garaging ZIP", () => {
    const result = validateAutoLead(
      parseAutoLeadInput({
        ...validAutoLead,
        vin: "",
        garagingZip: "",
      }),
    );

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.join(" ")).toContain("VIN is required.");
      expect(result.errors.join(" ")).toContain("Garaging ZIP is required.");
    }
  });

  it("does not accept year, make, and model as a substitute for VIN", () => {
    const result = validateAutoLead(
      parseAutoLeadInput({
        ...validAutoLead,
        vin: "",
        vehicleYear: "2021",
        vehicleMake: "Toyota",
        vehicleModel: "Camry",
        garagingZip: "91101",
      }),
    );

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors).toContain("VIN is required.");
      expect(result.errors).not.toContain("Garaging ZIP is required.");
    }
  });

  it("requires the primary driver's full legal name", () => {
    const result = validateAutoLead(
      parseAutoLeadInput({
        ...validAutoLead,
        primaryDriverName: "",
      }),
    );

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors).toContain("Primary driver full legal name is required.");
    }
  });

  it("does not allow submission without present interest", () => {
    const result = validateAutoLead(
      parseAutoLeadInput({
        ...validAutoLead,
        presentInterest: "no",
      }),
    );

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.join(" ")).toContain("present interest");
    }
  });

  it("uses the inverse qualified lead fee ladder", () => {
    expect(getAutoLeadFeeCents(1)).toBe(7500);
    expect(getAutoLeadFeeCents(5)).toBe(7500);
    expect(getAutoLeadFeeCents(6)).toBe(4000);
    expect(getAutoLeadFeeCents(16)).toBe(2500);
    expect(getAutoLeadFeeCents(31)).toBe(1500);
  });
});
