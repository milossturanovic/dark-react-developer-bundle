/**
 * ============================================================================
 * ADMIN AUTHENTICATION HELPER
 * ============================================================================
 *
 * Checks whether the current request has a valid admin session cookie.
 * Used as a guard in every admin-only API route.
 *
 * HOW IT WORKS:
 * - Reads the "admin-auth" HTTP-only cookie set during login.
 * - Returns true if the cookie value is "authenticated".
 * - No database or JWT involved — just a secure cookie check.
 *
 * TO CUSTOMIZE:
 * - Cookie name: change "admin-auth" below and in login/logout routes.
 * - To switch to JWT or session tokens, replace this function body.
 *
 * ============================================================================
 */

import { cookies } from "next/headers"

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get("admin-auth")
  return authCookie?.value === "authenticated"
}
