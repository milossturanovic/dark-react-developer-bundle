/**
 * ============================================================================
 * ADMIN HEADER / TOP BAR
 * ============================================================================
 *
 * Top bar for the admin dashboard. Shows:
 * - Mobile menu toggle (visible on small screens)
 * - Page context area
 * - Logout button
 *
 * ============================================================================
 */

"use client"

import { useRouter } from "next/navigation"
import { Menu, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdminHeaderProps {
  onMenuToggle: () => void
}

export function AdminHeader({ onMenuToggle }: AdminHeaderProps) {
  const router = useRouter()

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
  }

  return (
    <header className="flex h-14 items-center gap-4 border-b border-white/10 bg-background px-4 lg:px-6">
      {/* Mobile menu toggle */}
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 lg:hidden"
        onClick={onMenuToggle}
      >
        <Menu className="h-4 w-4" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      <div className="flex-1" />

      {/* Logout */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLogout}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline">Logout</span>
      </Button>
    </header>
  )
}
