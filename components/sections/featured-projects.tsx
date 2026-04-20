/**
 * ============================================================================
 * FEATURED PROJECTS SECTION
 * ============================================================================
 *
 * This component renders the homepage "Featured Projects" grid.
 *
 * EDIT YOUR PROJECTS:
 *   All project content lives in `data/projects.json` (NOT in this file).
 *   Mark a project as `"featured": true` and `"status": "published"` to make
 *   it eligible for this strip. The first 3 featured projects are shown.
 *
 * EDIT THE SECTION HEADER:
 *   Update `sectionTitle` / `sectionSubtitle` constants below.
 *
 * ============================================================================
 */

"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AnimatedSectionTitle } from "@/components/motion/animated-section-title"
import { ExternalLink, Github, Eye } from "lucide-react"
import type { FeaturedProjectCard } from "@/lib/projects-data"

// ----------------------------------------------------------------------------
// EDITABLE SECTION COPY
// ----------------------------------------------------------------------------

const sectionTitle = "Featured Projects"
const sectionSubtitle = "A selection of recent work and side projects"

// ----------------------------------------------------------------------------
// COMPONENT
// ----------------------------------------------------------------------------

interface FeaturedProjectsProps {
  projects: FeaturedProjectCard[]
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <AnimatedSectionTitle className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {sectionTitle}
          </AnimatedSectionTitle>
          <p className="mt-4 text-lg text-muted-foreground">{sectionSubtitle}</p>
        </div>

        {projects.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No featured projects yet. Mark a project as <code>{`"featured": true`}</code> in <code>data/projects.json</code>.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => {
              const hasLinks = project.href && typeof project.href === "object"
              const singleLink = project.href && typeof project.href === "string"

              return (
                <article
                  key={project.id}
                  className="group relative overflow-hidden rounded-2xl border border-white/50 bg-card transition-all hover:-translate-y-1 hover:border-white/50 hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                    <Image
                      src={project.imageSvgDataUri}
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
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
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
            })}
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <Button variant="outline" asChild>
            <Link href="/projects">View more</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
