/**
 * ============================================================================
 * ADMIN — EDIT PROJECT
 * ============================================================================
 *
 * Route: /admin/projects/[id]/edit
 *
 * Fetches the project by ID, then renders the shared ProjectForm
 * in "edit" mode with pre-populated data.
 *
 * ============================================================================
 */

"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { toast } from "sonner"

import { ProjectForm, type ProjectFormData } from "@/components/admin/project-form"
import { Skeleton } from "@/components/ui/skeleton"

export default function EditProjectPage() {
  const params = useParams<{ id: string }>()
  const [project, setProject] = useState<ProjectFormData | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/admin/projects/${params.id}`)
        if (res.ok) {
          const data = await res.json()
          setProject({
            title: data.title,
            slug: data.slug,
            description: data.description || "",
            coverImage: data.coverImage || "",
            tags: data.tags || [],
            status: data.status || "draft",
            category: data.category || "Uncategorized",
            links: {
              live: data.links?.live || "",
              github: data.links?.github || "",
            },
          })
        } else if (res.status === 404) {
          setNotFound(true)
        } else {
          toast.error("Failed to load project")
        }
      } catch {
        toast.error("Failed to load project")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) load()
  }, [params.id])

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Project not found.</p>
        <Link
          href="/admin/projects"
          className="mt-4 inline-block text-sm underline"
        >
          Back to Projects
        </Link>
      </div>
    )
  }

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
        <h1 className="text-2xl font-bold tracking-tight">Edit Project</h1>
        <p className="text-sm text-muted-foreground">
          Update the project details below
        </p>
      </div>

      <div className="rounded-lg border border-white/10 p-6">
        {project && (
          <ProjectForm
            mode="edit"
            projectId={params.id}
            initialData={project}
          />
        )}
      </div>
    </div>
  )
}
