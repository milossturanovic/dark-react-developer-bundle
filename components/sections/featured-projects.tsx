/**
 * ============================================================================
 * FEATURED PROJECTS SECTION COMPONENT
 * ============================================================================
 * 
 * DEVELOPER EDIT NOTES:
 * 
 * This component displays a responsive grid of project cards with images,
 * completion dates, technology tags, and optional links.
 * 
 * WHERE TO UPDATE CONTENT:
 * 
 * 1. Projects Data:
 *    - Edit `PROJECTS_DATA` array below (line ~50)
 *    - Add/remove projects by adding/removing objects from the array
 *    - Each project needs: title, completed, tags, imageSvgDataUri, href (optional)
 * 
 * 2. SVG Placeholder Images:
 *    - Each project uses an inline SVG data URI for the image
 *    - You can generate custom SVG placeholders or use the provided template
 *    - Format: `data:image/svg+xml;base64,...` or `data:image/svg+xml,...`
 *    - Example generator: https://placeholder.com or create custom SVGs
 * 
 * 3. Section Title & Subtitle:
 *    - Edit `sectionTitle` constant (line ~40)
 *    - Edit `sectionSubtitle` constant (line ~41)
 * 
 * 4. Styling:
 *    - Card styles: Edit className in the card <article> element
 *    - Grid layout: Edit `grid` className (currently: sm:grid-cols-2 lg:grid-cols-3)
 *    - Image aspect ratio: Edit `aspect-[16/10]` to change image proportions
 * 
 * 5. Links:
 *    - Add `href` property to project objects for live/GitHub links
 *    - Links appear as buttons at the bottom of each card
 *    - Use `href: { live: "...", github: "..." }` for both links
 *    - Or `href: "..."` for single link
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

// ============================================================================
// EDITABLE CONTENT - CUSTOMIZE YOUR PROJECTS HERE
// ============================================================================

// Section heading
const sectionTitle = "Featured Projects"
const sectionSubtitle = "A selection of recent work and side projects"

// Project data type
type Project = {
  id: string
  slug: string
  title: string
  completed: string
  tags: string[]
  imageSvgDataUri: string
  description?: string
  href?: {
    live?: string
    github?: string
  } | string
}

// Projects array - Add/remove/edit projects here
const PROJECTS_DATA: Project[] = [
  {
    id: "1",
    slug: "e-commerce-platform",
    title: "E-Commerce Platform",
    completed: "Oct 2024",
    tags: ["Next.js", "Stripe", "Prisma"],
    description: "Full-stack e-commerce solution with cart, payments, and admin dashboard.",
    imageSvgDataUri: `data:image/svg+xml,${encodeURIComponent(
      '<svg width="800" height="500" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#1e1e1e;stop-opacity:1" /><stop offset="100%" style="stop-color:#2d2d2d;stop-opacity:1" /></linearGradient></defs><rect width="800" height="500" fill="url(#grad)"/><text x="50%" y="45%" font-family="Arial, sans-serif" font-size="24" fill="#888" text-anchor="middle">E-Commerce Platform</text><text x="50%" y="55%" font-family="Arial, sans-serif" font-size="16" fill="#666" text-anchor="middle">Project Image</text></svg>'
    )}`,
    href: {
      live: "#",
      github: "#",
    },
  },
  {
    id: "2",
    slug: "task-management-app",
    title: "Task Management App",
    completed: "Sep 2024",
    tags: ["React", "Firebase", "Tailwind"],
    description: "Collaborative task manager with real-time updates and team features.",
    imageSvgDataUri: `data:image/svg+xml,${encodeURIComponent(
      '<svg width="800" height="500" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#1e1e1e;stop-opacity:1" /><stop offset="100%" style="stop-color:#2d2d2d;stop-opacity:1" /></linearGradient></defs><rect width="800" height="500" fill="url(#grad)"/><text x="50%" y="45%" font-family="Arial, sans-serif" font-size="24" fill="#888" text-anchor="middle">Task Management App</text><text x="50%" y="55%" font-family="Arial, sans-serif" font-size="16" fill="#666" text-anchor="middle">Project Image</text></svg>'
    )}`,
    href: {
      live: "#",
      github: "#",
    },
  },
  {
    id: "3",
    slug: "portfolio-template",
    title: "Portfolio Template",
    completed: "Aug 2024",
    tags: ["Next.js", "TypeScript", "Framer"],
    description: "Modern, responsive portfolio template with dark mode and animations.",
    imageSvgDataUri: `data:image/svg+xml,${encodeURIComponent(
      '<svg width="800" height="500" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#1e1e1e;stop-opacity:1" /><stop offset="100%" style="stop-color:#2d2d2d;stop-opacity:1" /></linearGradient></defs><rect width="800" height="500" fill="url(#grad)"/><text x="50%" y="45%" font-family="Arial, sans-serif" font-size="24" fill="#888" text-anchor="middle">Portfolio Template</text><text x="50%" y="55%" font-family="Arial, sans-serif" font-size="16" fill="#666" text-anchor="middle">Project Image</text></svg>'
    )}`,
    href: "#",
  },
]

// ============================================================================
// FEATURED PROJECTS COMPONENT
// ============================================================================



export function FeaturedProjects() {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <AnimatedSectionTitle className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {sectionTitle}
          </AnimatedSectionTitle>
          <p className="mt-4 text-lg text-muted-foreground">{sectionSubtitle}</p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS_DATA.map((project) => {
            // Determine if href is object (with live/github) or string
            const hasLinks = project.href && typeof project.href === "object"
            const singleLink = project.href && typeof project.href === "string"

            return (
              <article
                key={project.id}
                className="group relative overflow-hidden rounded-2xl border border-white/50 bg-card transition-all hover:-translate-y-1 hover:border-white/50 hover:shadow-lg"
              >
                {/* Project Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                  <Image
                    src={project.imageSvgDataUri}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="space-y-4">
                    {/* Meta Row: Date */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Completed: {project.completed}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold leading-tight">{project.title}</h3>

                    {/* Description (if provided) */}
                    {project.description && (
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {project.description}
                      </p>
                    )}

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Links Row */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button variant="outline" size="sm" asChild className="h-9 text-sm">
                        <Link href={`/projects/${project.slug}`} className="flex items-center gap-1.5">
                          <Eye className="h-3 w-3" />
                          View
                        </Link>
                      </Button>
                      {hasLinks && (
                        <>
                          {project.href.live && (
                            <Button variant="outline" size="sm" asChild className="h-9 text-sm">
                              <a
                                href={project.href.live}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1.5"
                              >
                                <ExternalLink className="h-3 w-3" />
                                Live
                              </a>
                            </Button>
                          )}
                          {project.href.github && (
                            <Button variant="outline" size="sm" asChild className="h-9 text-sm">
                              <a
                                href={project.href.github}
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

        {/* View more */}
        <div className="mt-12 flex justify-center">
          <Button variant="outline" asChild>
            <Link href="/projects">View more</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}