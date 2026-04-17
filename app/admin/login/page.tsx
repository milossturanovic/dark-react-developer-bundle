/**
 * ============================================================================
 * ADMIN LOGIN PAGE
 * ============================================================================
 *
 * Route: /admin/login
 *
 * Password-only login form. Matches the auth pattern from the previous project:
 * - Single password field (validated against ADMIN_PASSWORD env var)
 * - Shows error messages and lockout feedback from the rate limiter
 * - On success, redirects to /admin/dashboard
 *
 * TO CUSTOMIZE:
 * - Change the heading/description text below.
 * - Set ADMIN_PASSWORD in your .env file.
 *
 * ============================================================================
 */

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null)
  const [lockoutTime, setLockoutTime] = useState<number | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()

      if (res.ok) {
        router.push("/admin/dashboard")
      } else if (res.status === 429) {
        setLockoutTime(data.remainingTime)
        setRemainingAttempts(null)
        setError(data.error)
      } else {
        setRemainingAttempts(data.remainingAttempts ?? null)
        setLockoutTime(null)
        setError(data.error || "Invalid password")
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm border-white/10">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Lock className="h-5 w-5 text-muted-foreground" />
          </div>
          <CardTitle className="text-xl">Admin Login</CardTitle>
          <CardDescription>
            Enter the admin password to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
              />
            </div>

            {/* Error / lockout feedback */}
            {error && (
              <div className="flex items-start gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                <div className="text-sm">
                  <p className="font-medium text-destructive">{error}</p>
                  {remainingAttempts !== null && remainingAttempts > 0 && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {remainingAttempts} attempt{remainingAttempts !== 1 ? "s" : ""} remaining
                    </p>
                  )}
                  {lockoutTime !== null && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Please wait {lockoutTime} minute{lockoutTime !== 1 ? "s" : ""} before trying again.
                    </p>
                  )}
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
