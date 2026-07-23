import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const COOKIE_NAME = "scubafy_admin_session"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next()
  }

  if (pathname === "/admin/login") {
    return NextResponse.next()
  }

  const token = request.cookies.get(COOKIE_NAME)?.value
  const secret = process.env.AUTH_SECRET
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase()

  if (!token || !secret || !adminEmail) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret))
    if (payload.email !== adminEmail) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
}
