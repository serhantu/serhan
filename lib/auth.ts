// Authentication foundation for the lightweight admin phase.
//
// Security enhancements:
//   - Cryptographic HMAC-SHA256 signature on session cookies (prevents cookie forgery/tampering).
//   - Constant-time string comparison (crypto.timingSafeEqual) on credentials & signatures.
//   - HttpOnly, SameSite=Lax, Secure cookies.

import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import crypto from "node:crypto";

export const ADMIN_ROUTE_PREFIX = "/admin";
export const ADMIN_SESSION_COOKIE = "serhan_admin_session";

export type AdminSession = {
  userId: string;
  email: string;
  createdAt: number;
};

const adminLoginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (secret && secret.length >= 16) return secret;

  // Fallback: derive deterministic key from ADMIN_LOGIN_PASSWORD if available
  const pwd = process.env.ADMIN_LOGIN_PASSWORD;
  if (pwd) {
    return crypto.createHash("sha256").update(`serhan-auth-salt-${pwd}`).digest("hex");
  }

  return "fallback-development-only-secret-key-change-in-production";
}

function signPayload(payloadBase64: string): string {
  return crypto.createHmac("sha256", getSessionSecret()).update(payloadBase64).digest("hex");
}

function timingSafeMatch(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

function encodeSignedSession(session: AdminSession): string {
  const payloadBase64 = Buffer.from(JSON.stringify(session)).toString("base64");
  const signature = signPayload(payloadBase64);
  return `${payloadBase64}.${signature}`;
}

function decodeSessionCookie(raw: string | undefined): AdminSession | null {
  if (!raw) return null;

  try {
    const parts = raw.split(".");
    if (parts.length !== 2) return null;

    const [payloadBase64, providedSig] = parts;
    const expectedSig = signPayload(payloadBase64);

    if (!timingSafeMatch(providedSig, expectedSig)) {
      return null;
    }

    const decoded = Buffer.from(payloadBase64, "base64").toString("utf-8");
    const parsed = JSON.parse(decoded) as Partial<AdminSession>;

    if (!parsed.userId || !parsed.email) return null;
    return {
      userId: parsed.userId,
      email: parsed.email,
      createdAt: parsed.createdAt ?? Date.now(),
    };
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return decodeSessionCookie(raw);
}

export async function requireAdminSession(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}

export async function loginAdmin(formData: FormData): Promise<void> {
  "use server";

  const parsed = adminLoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    redirect("/admin/login?error=missing");
  }

  const configuredEmail = process.env.ADMIN_LOGIN_EMAIL;
  const configuredPassword = process.env.ADMIN_LOGIN_PASSWORD;

  if (!configuredEmail || !configuredPassword) {
    redirect("/admin/login?error=config");
  }

  const emailMatches = timingSafeMatch(parsed.data.email, configuredEmail);
  const passwordMatches = timingSafeMatch(parsed.data.password, configuredPassword);

  if (!emailMatches || !passwordMatches) {
    redirect("/admin/login?error=invalid");
  }

  const session: AdminSession = {
    userId: "admin",
    email: configuredEmail,
    createdAt: Date.now(),
  };

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, encodeSignedSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });

  redirect("/admin");
}

export async function logoutAdmin(): Promise<void> {
  "use server";

  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}
