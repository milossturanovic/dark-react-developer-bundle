/**
 * ============================================================================
 * ADMIN DASHBOARD — OVERVIEW PAGE
 * ============================================================================
 *
 * Route: /admin/dashboard
 *
 * Shows high-level stats (total projects, published, drafts) and a list
 * of recently updated projects. Data is fetched from /api/admin/projects.
 *
 * ============================================================================
 */

"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { FolderKanban, Eye, FileEdit, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface Project {
  id: string
  slug: string
  title: string
  status: string
  category: string
  updatedAt: string
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/projects")
        if (res.ok) {
          const data = await res.json()
          setProjects(data)
        }
      } catch {
        // silent — dashboard is non-critical
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const total = projects.length
  const published = projects.filter((p) => p.status === "published").length
  const drafts = projects.filter((p) => p.status === "draft").length
  const recent = projects.slice(0, 5)

  const stats = [
    { label: "Total Projects", value: total, icon: FolderKanban },
    { label: "Published", value: published, icon: Eye },
    { label: "Drafts", value: drafts, icon: FileEdit },
  ]

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Overview of your portfolio projects
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="border-white/10">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardDescription className="text-sm font-medium">
                  {stat.label}
                </CardDescription>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-3xl font-bold">{stat.value}</p>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent projects */}
      <Card className="border-white/10">
        <CardHeader>
          <CardTitle className="text-lg">Recent Projects</CardTitle>
          <CardDescription>
            Your most recently updated projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : recent.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No projects yet.{" "}
              <Link
                href="/admin/projects/new"
                className="text-foreground underline"
              >
                Create your first project
              </Link>
            </p>
          ) : (
            <div className="space-y-2">
              {recent.map((project) => (
                <Link
                  key={project.id}
                  href={`/admin/projects/${project.id}/edit`}
                  className="flex items-center justify-between rounded-lg border border-white/5 px-4 py-3 transition-colors hover:bg-muted/50"
                >
                  <div>
                    <p className="text-sm font-medium">{project.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {project.category} · Updated{" "}
                      {new Date(project.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge
                    variant={
                      project.status === "published" ? "default" : "secondary"
                    }
                    className="text-xs"
                  >
                    {project.status}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
