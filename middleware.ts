/**
 * ============================================================================
 * MIDDLEWARE — SERVER-SIDE ADMIN ROUTE PROTECTION
 * ============================================================================
 *
 * Runs before every request matched by the `config.matcher` below.
 * For /admin/* pages (except /admin/login), it checks the auth cookie.
 * Unauthenticated requests are redirected to /admin/login BEFORE any page
 * HTML is rendered — no flash of protected content, no leaking metadata.
 *
 * NOTE: This protects the admin *pages*. API routes under /api/admin/*
 * are still individually guarded by isAuthenticated() checks so the API
 * always enforces auth even if middleware changes in the future.
 *
 * ============================================================================
 */

import { NextResponse, type NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Let the login page through
  if (pathname === "/admin/login") {
    return NextResponse.next()
  }

  // For all other /admin/* paths, require the auth cookie
  if (pathname.startsWith("/admin")) {
    const authCookie = request.cookies.get("admin-auth")
    if (authCookie?.value !== "authenticated") {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
