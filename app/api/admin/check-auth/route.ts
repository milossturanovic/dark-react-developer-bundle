/**
 * ============================================================================
 * ADMIN AUTH CHECK API ROUTE
 * ============================================================================
 *
 * GET /api/admin/check-auth
 *
 * Returns { authenticated: true/false } based on the admin cookie.
 * Called by the admin layout on mount to gate access.
 *
 * ============================================================================
 */

import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get("admin-auth")

  return NextResponse.json({
    authenticated: authCookie?.value === "authenticated",
  })
}
