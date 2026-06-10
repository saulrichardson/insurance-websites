import { Buffer } from "node:buffer";
import { createHmac, timingSafeEqual } from "node:crypto";

export type AdminCredentials = {
  user: string;
  pass: string;
};

export type AdminCredentialInput = {
  user: string;
  pass: string;
};

const sessionTokenVersion = "v1";

export const adminSessionMaxAgeSeconds = 8 * 60 * 60;

export function isValidBasicAuthorization(
  authorization: string,
  credentials: AdminCredentials,
) {
  const prefix = "Basic ";
  if (!authorization.startsWith(prefix)) return false;

  const encoded = authorization.slice(prefix.length).trim();
  const decoded = Buffer.from(encoded, "base64").toString("utf8");
  const separator = decoded.indexOf(":");
  if (separator < 0) return false;

  return isValidAdminCredentialInput(
    {
      user: decoded.slice(0, separator),
      pass: decoded.slice(separator + 1),
    },
    credentials,
  );
}

export function isValidAdminCredentialInput(
  input: AdminCredentialInput,
  credentials: AdminCredentials,
) {
  const userMatches = safeEqualText(input.user, credentials.user);
  const passMatches = safeEqualText(input.pass, credentials.pass);
  return userMatches && passMatches;
}

export function createAdminSessionToken(
  credentials: AdminCredentials,
  now = new Date(),
) {
  const payload = Buffer.from(
    JSON.stringify({
      v: 1,
      user: credentials.user,
      exp: now.getTime() + adminSessionMaxAgeSeconds * 1000,
    }),
    "utf8",
  ).toString("base64url");

  return `${sessionTokenVersion}.${payload}.${signPayload(payload, credentials)}`;
}

export function verifyAdminSessionToken(
  token: string,
  credentials: AdminCredentials,
  now = new Date(),
) {
  const [version, payload, signature, ...extra] = token.split(".");
  if (extra.length > 0 || version !== sessionTokenVersion || !payload || !signature) {
    return false;
  }

  if (!safeEqualText(signature, signPayload(payload, credentials))) return false;

  const decoded = parseSessionPayload(payload);
  if (!decoded) return false;

  return decoded.v === 1 && decoded.user === credentials.user && decoded.exp > now.getTime();
}

function parseSessionPayload(payload: string) {
  try {
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (
      typeof decoded === "object" &&
      decoded !== null &&
      typeof decoded.v === "number" &&
      typeof decoded.user === "string" &&
      typeof decoded.exp === "number"
    ) {
      return decoded as { v: number; user: string; exp: number };
    }
  } catch {
    return null;
  }

  return null;
}

function signPayload(payload: string, credentials: AdminCredentials) {
  return createHmac("sha256", `${credentials.user}\0${credentials.pass}`)
    .update(payload)
    .digest("base64url");
}

function safeEqualText(actual: string, expected: string) {
  const actualBuffer = Buffer.from(actual);
  const expectedBuffer = Buffer.from(expected);
  return (
    actualBuffer.length === expectedBuffer.length &&
    timingSafeEqual(actualBuffer, expectedBuffer)
  );
}
