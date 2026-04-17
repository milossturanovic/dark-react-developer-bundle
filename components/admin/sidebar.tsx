/**
 * ============================================================================
 * ADMIN SIDEBAR
 * ============================================================================
 *
 * Collapsible sidebar for the admin dashboard shell.
 * Desktop: fixed left sidebar, collapsible to icon-only mode.
 * Mobile: hidden by default, toggled via the header menu button.
 *
 * TO CUSTOMIZE:
 * - Edit NAV_ITEMS below to add/remove/rename sidebar links.
 * - Change icons by importing different lucide-react icons.
 *
 * ============================================================================
 */

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Image,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// --- EDITABLE: Sidebar navigation items -----------------------------------

const NAV_ITEMS = [
  { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Projects",  href: "/admin/projects",  icon: FolderKanban },
  { title: "Content",   href: "/admin/content",   icon: FileText },
  { title: "Media",     href: "/admin/media",      icon: Image },
  { title: "Settings",  href: "/admin/settings",   icon: Settings },
]

// ---------------------------------------------------------------------------

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function AdminSidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-white/10 bg-background transition-all duration-200",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Brand */}
      <div className="flex h-14 items-center border-b border-white/10 px-4">
        {!collapsed && (
          <Link
            href="/admin/dashboard"
            className="text-sm font-semibold tracking-tight text-foreground"
          >
            Admin Panel
          </Link>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className={cn("ml-auto h-8 w-8 p-0", collapsed && "mx-auto")}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Nav links */}
      <nav className="flex-1 space-y-1 p-2">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href || pathname?.startsWith(item.href + "/")
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.title : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          )
        })}
      </nav>

      {/* View site link */}
      <div className="border-t border-white/10 p-2">
        <Link
          href="/"
          target="_blank"
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground",
            collapsed && "justify-center px-2"
          )}
        >
          {!collapsed && "← View Site"}
          {collapsed && "←"}
        </Link>
      </div>
    </aside>
  )
}
