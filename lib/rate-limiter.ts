/**
 * ============================================================================
 * IN-MEMORY RATE LIMITER — ADMIN LOGIN
 * ============================================================================
 *
 * Tracks failed login attempts per IP address to prevent brute-force attacks.
 *
 * HOW IT WORKS:
 * - After MAX_ATTEMPTS (default 4) failures within WINDOW_MS (default 2 hours),
 *   the IP is locked out for LOCKOUT_MS (default 2 hours).
 * - On successful login, call resetRateLimit(ip) to clear the counter.
 * - Data is stored in-memory (Map), so it resets on server restart.
 *
 * TO CUSTOMIZE:
 * - Change MAX_ATTEMPTS, WINDOW_MS, LOCKOUT_MS below.
 * - For production at scale, replace the Map with Redis or a database table.
 *
 * USAGE IN LOGIN ROUTE:
 *   const { allowed, remainingTime } = checkRateLimit(ip)
 *   if (!allowed) return error with remainingTime
 *   if (loginFailed) recordFailedAttempt(ip)
 *   if (loginSuccess) resetRateLimit(ip)
 *
 * ============================================================================
 */

// --- EDITABLE CONSTANTS ---------------------------------------------------

const MAX_ATTEMPTS = 4           // failures before lockout
const WINDOW_MS = 2 * 60 * 60 * 1000   // 2-hour attempt window
const LOCKOUT_MS = 2 * 60 * 60 * 1000  // 2-hour lockout duration

// ---------------------------------------------------------------------------

interface RateLimitEntry {
  attempts: number
  firstAttemptTime: number
  lockedUntil: number | null
}

const rateLimitStore = new Map<string, RateLimitEntry>()

function cleanupExpiredEntries(): void {
  const now = Date.now()
  for (const [ip, entry] of rateLimitStore.entries()) {
    if (!entry.lockedUntil && now - entry.firstAttemptTime > WINDOW_MS) {
      rateLimitStore.delete(ip)
    }
    if (entry.lockedUntil && now > entry.lockedUntil) {
      rateLimitStore.delete(ip)
    }
  }
}

export function checkRateLimit(ip: string): {
  allowed: boolean
  remainingTime?: number
  remainingAttempts?: number
} {
  cleanupExpiredEntries()

  const entry = rateLimitStore.get(ip)

  if (!entry) {
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS }
  }

  if (entry.lockedUntil) {
    const now = Date.now()
    if (now < entry.lockedUntil) {
      const remainingTime = Math.ceil((entry.lockedUntil - now) / 1000 / 60)
      return { allowed: false, remainingTime }
    } else {
      rateLimitStore.delete(ip)
      return { allowed: true, remainingAttempts: MAX_ATTEMPTS }
    }
  }

  const now = Date.now()
  if (now - entry.firstAttemptTime > WINDOW_MS) {
    rateLimitStore.delete(ip)
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS }
  }

  if (entry.attempts >= MAX_ATTEMPTS) {
    const lockedUntil = now + LOCKOUT_MS
    entry.lockedUntil = lockedUntil
    rateLimitStore.set(ip, entry)
    const remainingTime = Math.ceil(LOCKOUT_MS / 1000 / 60)
    return { allowed: false, remainingTime }
  }

  return { allowed: true, remainingAttempts: MAX_ATTEMPTS - entry.attempts }
}

export function recordFailedAttempt(ip: string): void {
  const entry = rateLimitStore.get(ip)
  const now = Date.now()

  if (!entry) {
    rateLimitStore.set(ip, {
      attempts: 1,
      firstAttemptTime: now,
      lockedUntil: null,
    })
  } else {
    entry.attempts += 1
    if (entry.attempts >= MAX_ATTEMPTS) {
      entry.lockedUntil = now + LOCKOUT_MS
    }
    rateLimitStore.set(ip, entry)
  }
}

export function resetRateLimit(ip: string): void {
  rateLimitStore.delete(ip)
}
