/**
 * ============================================================================
 * ADMIN — CREATE NEW PROJECT
 * ============================================================================
 *
 * Route: /admin/projects/new
 *
 * Renders the shared ProjectForm in "create" mode.
 * On submit, sends POST /api/admin/projects and redirects to the list.
 *
 * ============================================================================
 */

"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ProjectForm } from "@/components/admin/project-form"

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/projects"
          className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Projects
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">New Project</h1>
        <p className="text-sm text-muted-foreground">
          Fill in the details to add a new project to your portfolio
        </p>
      </div>

      <div className="rounded-lg border border-white/10 p-6">
        <ProjectForm mode="create" />
      </div>
    </div>
  )
}
