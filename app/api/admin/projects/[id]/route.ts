/**
 * ============================================================================
 * ADMIN PROJECTS API — GET / UPDATE / DELETE SINGLE PROJECT
 * ============================================================================
 *
 * GET    /api/admin/projects/[id]  — get one project by id/slug
 * PUT    /api/admin/projects/[id]  — update a project
 * DELETE /api/admin/projects/[id]  — delete a project
 *
 * All routes require admin authentication.
 *
 * ============================================================================
 */

import { NextRequest, NextResponse } from "next/server"
import { readFile, writeFile } from "fs/promises"
import { join } from "path"
import { isAuthenticated } from "@/lib/admin-auth"

const DATA_PATH = join(process.cwd(), "data", "projects.json")

// ---------------------------------------------------------------------------
// GET — Single project by id or slug
// ---------------------------------------------------------------------------

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const fileContents = await readFile(DATA_PATH, "utf8")
    const data = JSON.parse(fileContents)

    const project = data.projects.find(
      (p: any) => p.id === params.id || p.slug === params.id
    )

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error reading project:", error)
    return NextResponse.json(
      { error: "Failed to read project" },
      { status: 500 }
    )
  }
}

// ---------------------------------------------------------------------------
// PUT — Update project
// ---------------------------------------------------------------------------

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const updates = await request.json()

    if (!updates.title?.trim()) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      )
    }

    const fileContents = await readFile(DATA_PATH, "utf8")
    const data = JSON.parse(fileContents)

    const projectIndex = data.projects.findIndex(
      (p: any) => p.id === params.id || p.slug === params.id
    )

    if (projectIndex === -1) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      )
    }

    const existing = data.projects[projectIndex]

    // If slug changed, check uniqueness
    if (updates.slug && updates.slug !== existing.slug) {
      const slugExists = data.projects.some(
        (p: any, i: number) => i !== projectIndex && p.slug === updates.slug
      )
      if (slugExists) {
        return NextResponse.json(
          { error: "A project with this slug already exists" },
          { status: 409 }
        )
      }
    }

    const updated = {
      ...existing,
      title: updates.title?.trim() ?? existing.title,
      slug: updates.slug ?? existing.slug,
      description: updates.description?.trim() ?? existing.description,
      coverImage: updates.coverImage ?? existing.coverImage,
      galleryImages: updates.galleryImages ?? existing.galleryImages,
      tags: updates.tags ?? existing.tags,
      status: updates.status ?? existing.status,
      category: updates.category ?? existing.category,
      links: {
        live: updates.links?.live ?? existing.links?.live ?? "",
        github: updates.links?.github ?? existing.links?.github ?? "",
      },
      updatedAt: new Date().toISOString(),
    }

    data.projects[projectIndex] = updated
    await writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf8")

    return NextResponse.json({ success: true, project: updated })
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    )
  }
}

// ---------------------------------------------------------------------------
// DELETE — Remove project
// ---------------------------------------------------------------------------

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const fileContents = await readFile(DATA_PATH, "utf8")
    const data = JSON.parse(fileContents)

    const projectIndex = data.projects.findIndex(
      (p: any) => p.id === params.id || p.slug === params.id
    )

    if (projectIndex === -1) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      )
    }

    data.projects.splice(projectIndex, 1)
    await writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf8")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    )
  }
}
