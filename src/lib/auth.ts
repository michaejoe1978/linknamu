import crypto from "crypto";

export const ADMIN_SESSION_COOKIE = "linknamu_admin_session";

const SESSION_MESSAGE = "linknamu-admin-session";

function computeSessionToken(password: string): string {
  return crypto.createHmac("sha256", password).update(SESSION_MESSAGE).digest("hex");
}

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return password === expected;
}

export function createAdminSessionToken(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return computeSessionToken(password);
}

export function isValidAdminSession(token: string | undefined): boolean {
  const expected = createAdminSessionToken();
  if (!expected || !token) return false;

  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
