/**
 * ============================================================================
 * ADMIN PROJECTS API — LIST + CREATE
 * ============================================================================
 *
 * GET  /api/admin/projects   — list all projects (supports ?search= and ?status=)
 * POST /api/admin/projects   — create a new project
 *
 * Data is stored in data/projects.json (read/write via fs).
 * Both routes require admin authentication.
 *
 * ============================================================================
 */

import { NextRequest, NextResponse } from "next/server"
import { readFile, writeFile } from "fs/promises"
import { join } from "path"
import { isAuthenticated } from "@/lib/admin-auth"

const DATA_PATH = join(process.cwd(), "data", "projects.json")

// ---------------------------------------------------------------------------
// GET — List projects with optional search & status filter
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")?.toLowerCase() || ""
    const status = searchParams.get("status") || ""

    const fileContents = await readFile(DATA_PATH, "utf8")
    const data = JSON.parse(fileContents)
    let projects = data.projects || []

    if (search) {
      projects = projects.filter(
        (p: any) =>
          p.title.toLowerCase().includes(search) ||
          p.description?.toLowerCase().includes(search) ||
          p.tags?.some((t: string) => t.toLowerCase().includes(search))
      )
    }

    if (status && status !== "all") {
      projects = projects.filter((p: any) => p.status === status)
    }

    projects.sort(
      (a: any, b: any) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error reading projects:", error)
    return NextResponse.json(
      { error: "Failed to read projects" },
      { status: 500 }
    )
  }
}

// ---------------------------------------------------------------------------
// POST — Create a new project
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const newProject = await request.json()

    // --- Validation ---
    if (!newProject.title?.trim()) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      )
    }

    const fileContents = await readFile(DATA_PATH, "utf8")
    const data = JSON.parse(fileContents)

    // Generate slug if not provided
    if (!newProject.slug) {
      newProject.slug = newProject.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    }

    // Enforce unique slug
    const slugExists = data.projects.some(
      (p: any) => p.slug === newProject.slug
    )
    if (slugExists) {
      return NextResponse.json(
        { error: "A project with this slug already exists" },
        { status: 409 }
      )
    }

    // Set defaults
    const now = new Date().toISOString()
    const project = {
      id: newProject.slug,
      slug: newProject.slug,
      title: newProject.title.trim(),
      description: newProject.description?.trim() || "",
      coverImage: newProject.coverImage || "/placeholder-project.svg",
      galleryImages: newProject.galleryImages || [],
      tags: newProject.tags || [],
      status: newProject.status || "draft",
      category: newProject.category || "Uncategorized",
      links: {
        live: newProject.links?.live || "",
        github: newProject.links?.github || "",
      },
      createdAt: now,
      updatedAt: now,
    }

    data.projects.push(project)
    await writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf8")

    return NextResponse.json({ success: true, project })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    )
  }
}
