import "server-only";

import { cookies, headers } from "next/headers";

import {
  adminSessionMaxAgeSeconds,
  createAdminSessionToken,
  isValidAdminCredentialInput,
  isValidBasicAuthorization,
  verifyAdminSessionToken,
  type AdminCredentials,
} from "@/lib/admin-auth-token";

export const adminSessionCookieName = "tzi_admin_session";

export type AdminAuthState =
  | { configured: false; authorized: false }
  | { configured: true; authorized: false }
  | { configured: true; authorized: true; user: string };

export async function getAdminAuthState(): Promise<AdminAuthState> {
  const credentials = getAdminCredentials();
  if (!credentials) return { configured: false, authorized: false };

  const requestHeaders = await headers();
  const authorization = requestHeaders.get("authorization") ?? "";
  if (isValidBasicAuthorization(authorization, credentials)) {
    return { configured: true, authorized: true, user: credentials.user };
  }

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(adminSessionCookieName)?.value ?? "";
  if (verifyAdminSessionToken(sessionToken, credentials)) {
    return { configured: true, authorized: true, user: credentials.user };
  }

  return { configured: true, authorized: false };
}

export async function startAdminSession(input: { user: string; pass: string }) {
  const credentials = getAdminCredentials();
  if (!credentials) return { ok: false as const, reason: "not-configured" as const };

  if (!isValidAdminCredentialInput(input, credentials)) {
    return { ok: false as const, reason: "invalid" as const };
  }

  const cookieStore = await cookies();
  cookieStore.set(adminSessionCookieName, createAdminSessionToken(credentials), {
    httpOnly: true,
    maxAge: adminSessionMaxAgeSeconds,
    path: "/admin",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return { ok: true as const };
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(adminSessionCookieName, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/admin",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

function getAdminCredentials(): AdminCredentials | null {
  const user = process.env.ADMIN_USER?.trim() ?? "";
  const pass = process.env.ADMIN_PASS?.trim() ?? "";
  return user && pass ? { user, pass } : null;
}
