/**
 * ============================================================================
 * PROJECTS SECTION (full /projects page)
 * ============================================================================
 *
 * EDIT YOUR PROJECTS:
 *   All project content lives in `data/projects.json` (NOT in this file).
 *   Anything with `"status": "published"` shows up here automatically.
 *
 * EDIT THE SECTION HEADER:
 *   Update SECTION_TITLE / SECTION_SUBTITLE constants below.
 *
 * FILTERING:
 *   - Category filter: single-select; "All" shows everything.
 *   - Tech filter: single-select chip; click again to clear.
 *   - Both filters work together (logical AND).
 *
 * ============================================================================
 */

"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { AnimatedSectionTitle } from "@/components/motion/animated-section-title"
import { ExternalLink, Github, Eye } from "lucide-react"
import { ProjectsFilter, type FilterState } from "@/components/projects/projects-filter"
import type { ListProjectCard } from "@/lib/projects-data"

// ----------------------------------------------------------------------------
// EDITABLE COPY
// ----------------------------------------------------------------------------

const SECTION_TITLE = "Projects"
const SECTION_SUBTITLE = "A curated overview of client and personal work across disciplines."

// ----------------------------------------------------------------------------
// TECH LABEL HELPER
// ----------------------------------------------------------------------------

function techLabel(t: string): string {
  switch (t) {
    case "nextjs":
      return "Next.js"
    case "wordpress":
      return "WordPress"
    case "php":
      return "PHP"
    case "react":
      return "React"
    default:
      return t
  }
}

// ----------------------------------------------------------------------------
// FILTERING
// ----------------------------------------------------------------------------

function applyFilters(projects: ListProjectCard[], filter: FilterState): ListProjectCard[] {
  return projects.filter((p) => {
    const categoryMatch = filter.category === "all" || p.category === filter.category
    const techMatch = filter.tech === null || p.tech.includes(filter.tech)
    return categoryMatch && techMatch
  })
}

// ----------------------------------------------------------------------------
// CARD
// ----------------------------------------------------------------------------

function ProjectCard({ project }: { project: ListProjectCard }) {
  const hasLinks = project.href && typeof project.href === "object"
  const singleLink = project.href && typeof project.href === "string"

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/50 bg-card transition-all hover:-translate-y-1 hover:border-white/50 hover:shadow-lg">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Completed: {project.completed}
            </span>
          </div>

          <h3 className="text-xl font-semibold leading-tight">{project.title}</h3>

          {project.description && (
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {project.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <Badge key={t} variant="secondary" className="text-xs capitalize">
                {techLabel(t)}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <Button variant="outline" size="sm" asChild className="h-9 text-sm">
              <Link href={`/projects/${project.slug}`} className="flex items-center gap-1.5">
                <Eye className="h-3 w-3" />
                View
              </Link>
            </Button>
            {hasLinks && (
              <>
                {(project.href as { live?: string }).live && (
                  <Button variant="outline" size="sm" asChild className="h-9 text-sm">
                    <a
                      href={(project.href as { live?: string }).live}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Live
                    </a>
                  </Button>
                )}
                {(project.href as { github?: string }).github && (
                  <Button variant="outline" size="sm" asChild className="h-9 text-sm">
                    <a
                      href={(project.href as { github?: string }).github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5"
                    >
                      <Github className="h-3 w-3" />
                      GitHub
                    </a>
                  </Button>
                )}
              </>
            )}
            {singleLink && (
              <Button variant="outline" size="sm" asChild className="h-9 text-sm">
                <a
                  href={project.href as string}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5"
                >
                  <ExternalLink className="h-3 w-3" />
                  View Project
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

// ----------------------------------------------------------------------------
// SECTION
// ----------------------------------------------------------------------------

interface ProjectsSectionProps {
  projects: ListProjectCard[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const shouldReduceMotion = useReducedMotion()

  const [filter, setFilter] = React.useState<FilterState>({
    category: "all",
    tech: null,
  })

  const filtered = applyFilters(projects, filter)

  return (
    <section className="py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <AnimatedSectionTitle className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {SECTION_TITLE}
          </AnimatedSectionTitle>
          <p className="mt-4 text-lg text-muted-foreground">{SECTION_SUBTITLE}</p>
        </div>

        <div className="mb-6">
          <ProjectsFilter filter={filter} onChange={setFilter} />
        </div>

        <Separator className="mb-10 bg-white/10" />

        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No projects match the selected filters.
          </p>
        ) : (
          <motion.div
            layout={!shouldReduceMotion}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout={!shouldReduceMotion}
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  )
}
