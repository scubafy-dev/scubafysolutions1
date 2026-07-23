import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"
import bcrypt from "bcryptjs"

const COOKIE_NAME = "scubafy_admin_session"
const SESSION_TTL = "7d"

function getSecret() {
  const secret = process.env.AUTH_SECRET
  if (!secret) {
    throw new Error("AUTH_SECRET is not set")
  }
  return new TextEncoder().encode(secret)
}

export function getAdminEmail() {
  return process.env.ADMIN_EMAIL?.trim().toLowerCase() ?? ""
}

export async function verifyAdminCredentials(email: string, password: string) {
  const adminEmail = getAdminEmail()
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminEmail || !adminPassword) {
    return false
  }

  if (email.trim().toLowerCase() !== adminEmail) {
    return false
  }

  // Support either a bcrypt hash or a plain password in ADMIN_PASSWORD
  if (adminPassword.startsWith("$2")) {
    return bcrypt.compare(password, adminPassword)
  }

  return password === adminPassword
}

export async function createSession(email: string) {
  const token = await new SignJWT({ email: email.toLowerCase(), role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_TTL)
    .sign(getSecret())

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, getSecret())
    const email = typeof payload.email === "string" ? payload.email : null
    if (!email || email !== getAdminEmail()) return null
    return { email, role: "admin" as const }
  } catch {
    return null
  }
}

export async function requireAdmin() {
  const session = await getSession()
  if (!session) {
    throw new Error("Unauthorized")
  }
  return session
}
