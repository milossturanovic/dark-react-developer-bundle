/**
 * ============================================================================
 * ADMIN LOGOUT API ROUTE
 * ============================================================================
 *
 * POST /api/admin/logout
 *
 * Clears the admin session cookie. No auth check required —
 * if there's no cookie, deleting it is a no-op.
 *
 * ============================================================================
 */

import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  const cookieStore = await cookies()
  cookieStore.delete("admin-auth")

  return NextResponse.json({ success: true })
}
