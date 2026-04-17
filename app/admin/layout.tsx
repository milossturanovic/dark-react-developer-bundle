/**
 * ============================================================================
 * ADMIN LAYOUT — AUTH GATE + DASHBOARD SHELL
 * ============================================================================
 *
 * This layout wraps ALL /admin/* pages. It:
 * 1. Checks authentication on mount via GET /api/admin/check-auth
 * 2. Redirects unauthenticated users to /admin/login
 * 3. Renders the dashboard shell (sidebar + header + content area)
 *
 * The /admin/login page is excluded from the shell — it renders children only.
 *
 * TO CUSTOMIZE:
 * - Sidebar items: edit components/admin/sidebar.tsx
 * - Header: edit components/admin/header.tsx
 * - Auth cookie name: update in lib/admin-auth.ts and API routes
 *
 * ============================================================================
 */

"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminHeader } from "@/components/admin/header"
import { Toaster } from "sonner"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/check-auth")
        const data = await res.json()

        if (data.authenticated) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
          if (pathname !== "/admin/login") {
            router.push("/admin/login")
          }
        }
      } catch {
        setIsAuthenticated(false)
        if (pathname !== "/admin/login") {
          router.push("/admin/login")
        }
      }
    }

    checkAuth()
  }, [pathname, router])

  // Login page — no shell, just the page content
  if (pathname === "/admin/login") {
    return (
      <>
        {children}
        <Toaster position="top-right" richColors />
      </>
    )
  }

  // Loading state while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted-foreground border-t-foreground" />
      </div>
    )
  }

  // Not authenticated — layout returns nothing (redirect happening)
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar — desktop (always visible) */}
      <div className="hidden lg:flex">
        <AdminSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Sidebar — mobile (slide-in) */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-200 ease-in-out lg:hidden ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminSidebar
          collapsed={false}
          onToggle={() => setMobileSidebarOpen(false)}
        />
      </div>

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader onMenuToggle={() => setMobileSidebarOpen(!mobileSidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>

      <Toaster position="top-right" richColors />
    </div>
  )
}
