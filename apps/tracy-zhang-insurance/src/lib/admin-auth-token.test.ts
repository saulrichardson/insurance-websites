import { Buffer } from "node:buffer";
import { describe, expect, it } from "vitest";

import {
  createAdminSessionToken,
  isValidBasicAuthorization,
  isValidAdminCredentialInput,
  verifyAdminSessionToken,
  type AdminCredentials,
} from "./admin-auth-token";

const credentials: AdminCredentials = {
  user: "admin",
  pass: "correct-password",
};

describe("admin auth tokens", () => {
  it("validates exact admin credentials", () => {
    expect(isValidAdminCredentialInput({ user: "admin", pass: "correct-password" }, credentials)).toBe(
      true,
    );
    expect(isValidAdminCredentialInput({ user: "admin", pass: "wrong" }, credentials)).toBe(false);
  });

  it("validates basic authorization headers", () => {
    const encoded = Buffer.from("admin:correct-password").toString("base64");
    expect(isValidBasicAuthorization(`Basic ${encoded}`, credentials)).toBe(true);
    expect(isValidBasicAuthorization("Basic bad-value", credentials)).toBe(false);
  });

  it("signs sessions so changed payloads do not verify", () => {
    const now = new Date("2026-06-06T16:00:00.000Z");
    const token = createAdminSessionToken(credentials, now);

    expect(verifyAdminSessionToken(token, credentials, now)).toBe(true);
    expect(verifyAdminSessionToken(`${token}changed`, credentials, now)).toBe(false);
  });

  it("rejects expired sessions", () => {
    const token = createAdminSessionToken(credentials, new Date("2026-06-06T16:00:00.000Z"));

    expect(
      verifyAdminSessionToken(token, credentials, new Date("2026-06-07T01:00:01.000Z")),
    ).toBe(false);
  });
});
