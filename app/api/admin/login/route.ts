/**
 * ============================================================================
 * ADMIN LOGIN API ROUTE
 * ============================================================================
 *
 * POST /api/admin/login
 *
 * Validates the admin password and sets a secure session cookie.
 * Includes brute-force protection via the in-memory rate limiter.
 *
 * TO CUSTOMIZE:
 * - Set ADMIN_PASSWORD in your .env file.
 * - Cookie settings (maxAge, secure, sameSite) are below.
 * - Rate limiter thresholds are in lib/rate-limiter.ts.
 *
 * ============================================================================
 */

import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import {
  checkRateLimit,
  recordFailedAttempt,
  resetRateLimit,
} from "@/lib/rate-limiter"

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

export async function POST(request: NextRequest) {
  try {
    // --- Config check ---
    // Force developers to set ADMIN_PASSWORD before the admin can be used.
    if (!ADMIN_PASSWORD) {
      console.error(
        "[auth] ADMIN_PASSWORD env variable is not set. Add it to .env.local or your hosting environment."
      )
      return NextResponse.json(
        {
          error:
            "Admin is not configured. Set the ADMIN_PASSWORD environment variable.",
        },
        { status: 500 }
      )
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown"

    // --- Rate limit check ---
    const rateCheck = checkRateLimit(ip)
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Too many failed attempts. Try again in ${rateCheck.remainingTime} minute(s).`,
          locked: true,
          remainingTime: rateCheck.remainingTime,
        },
        { status: 429 }
      )
    }

    const { password } = await request.json()

    if (password === ADMIN_PASSWORD) {
      // Success — reset rate limiter and set cookie
      resetRateLimit(ip)

      const cookieStore = await cookies()
      cookieStore.set("admin-auth", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      })

      return NextResponse.json({ success: true })
    } else {
      // Failure — record attempt
      recordFailedAttempt(ip)

      const updatedCheck = checkRateLimit(ip)

      return NextResponse.json(
        {
          error: "Invalid password",
          remainingAttempts: updatedCheck.remainingAttempts ?? 0,
        },
        { status: 401 }
      )
    }
  } catch {
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    )
  }
}
