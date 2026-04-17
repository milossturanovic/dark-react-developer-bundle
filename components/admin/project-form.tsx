/**
 * ============================================================================
 * PROJECT FORM — SHARED CREATE / EDIT COMPONENT
 * ============================================================================
 *
 * Reusable form for creating and editing projects.
 * Used by both /admin/projects/new and /admin/projects/[id]/edit.
 *
 * TO CUSTOMIZE:
 * - Add/remove fields by editing the form JSX below.
 * - Change category options in CATEGORY_OPTIONS.
 * - Change status options in STATUS_OPTIONS.
 * - Tags are entered as comma-separated text for simplicity.
 *
 * ============================================================================
 */

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// --- EDITABLE: Category and status options --------------------------------

const CATEGORY_OPTIONS = [
  "Creative",
  "Real Estate",
  "Corporate",
  "E-commerce",
  "SaaS",
  "Uncategorized",
]

const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
]

// ---------------------------------------------------------------------------

export interface ProjectFormData {
  title: string
  slug: string
  description: string
  coverImage: string
  tags: string[]
  status: string
  category: string
  links: { live: string; github: string }
}

interface ProjectFormProps {
  initialData?: ProjectFormData
  mode: "create" | "edit"
  projectId?: string
}

const emptyProject: ProjectFormData = {
  title: "",
  slug: "",
  description: "",
  coverImage: "",
  tags: [],
  status: "draft",
  category: "Uncategorized",
  links: { live: "", github: "" },
}

export function ProjectForm({ initialData, mode, projectId }: ProjectFormProps) {
  const router = useRouter()
  const [data, setData] = useState<ProjectFormData>(initialData || emptyProject)
  const [tagsInput, setTagsInput] = useState(
    initialData?.tags?.join(", ") || ""
  )
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  function handleTitleChange(title: string) {
    setData((prev) => ({
      ...prev,
      title,
      slug: mode === "create" ? generateSlug(title) : prev.slug,
    }))
  }

  function validate(): boolean {
    const errs: Record<string, string> = {}
    if (!data.title.trim()) errs.title = "Title is required"
    if (!data.slug.trim()) errs.slug = "Slug is required"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setSaving(true)

    const payload = {
      ...data,
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    }

    try {
      const url =
        mode === "create"
          ? "/api/admin/projects"
          : `/api/admin/projects/${projectId}`
      const method = mode === "create" ? "POST" : "PUT"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const result = await res.json()

      if (res.ok) {
        toast.success(
          mode === "create" ? "Project created" : "Project updated"
        )
        router.push("/admin/projects")
      } else {
        toast.error(result.error || "Something went wrong")
        if (result.error?.includes("slug")) {
          setErrors((prev) => ({ ...prev, slug: result.error }))
        }
      }
    } catch {
      toast.error("Failed to save project")
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">
            Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="title"
            value={data.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Project title"
          />
          {errors.title && (
            <p className="text-xs text-destructive">{errors.title}</p>
          )}
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <Label htmlFor="slug">
            Slug <span className="text-destructive">*</span>
          </Label>
          <Input
            id="slug"
            value={data.slug}
            onChange={(e) =>
              setData((prev) => ({ ...prev, slug: e.target.value }))
            }
            placeholder="project-slug"
          />
          {errors.slug && (
            <p className="text-xs text-destructive">{errors.slug}</p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={data.description}
          onChange={(e) =>
            setData((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Brief project description…"
          rows={4}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Category */}
        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            value={data.category}
            onValueChange={(val) =>
              setData((prev) => ({ ...prev, category: val }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORY_OPTIONS.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label>Status</Label>
          <Select
            value={data.status}
            onValueChange={(val) =>
              setData((prev) => ({ ...prev, status: val }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <Input
          id="tags"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="React, Next.js, Tailwind CSS (comma-separated)"
        />
        <p className="text-xs text-muted-foreground">
          Separate multiple tags with commas
        </p>
      </div>

      {/* Cover image URL */}
      <div className="space-y-2">
        <Label htmlFor="coverImage">Cover Image URL</Label>
        <Input
          id="coverImage"
          value={data.coverImage}
          onChange={(e) =>
            setData((prev) => ({ ...prev, coverImage: e.target.value }))
          }
          placeholder="/images/project-cover.jpg"
        />
      </div>

      {/* Links */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="liveUrl">Live URL</Label>
          <Input
            id="liveUrl"
            type="url"
            value={data.links.live}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                links: { ...prev.links, live: e.target.value },
              }))
            }
            placeholder="https://example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="githubUrl">GitHub URL</Label>
          <Input
            id="githubUrl"
            type="url"
            value={data.links.github}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                links: { ...prev.links, github: e.target.value },
              }))
            }
            placeholder="https://github.com/user/repo"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4">
        <Button type="submit" disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving…
            </>
          ) : mode === "create" ? (
            "Create Project"
          ) : (
            "Update Project"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/projects")}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
