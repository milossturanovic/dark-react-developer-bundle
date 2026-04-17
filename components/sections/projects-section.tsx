/**
 * ============================================================================
 * PROJECTS SECTION COMPONENT (FULL PAGE)
 * ============================================================================
 *
 * DEVELOPER EDIT NOTES:
 *
 * 1. ADD/EDIT PROJECTS:
 *    - Edit the ALL_PROJECTS array below.
 *    - Each project requires: id, title, category, tech, image, completed.
 *    - category: "creative" | "real-estate" | "corporate"
 *    - tech: array of "wordpress" | "react" | "nextjs" | "php"
 *
 * 2. CHANGE SECTION TITLE/SUBTITLE:
 *    - Edit SECTION_TITLE and SECTION_SUBTITLE constants.
 *
 * 3. CARD DESIGN:
 *    - Card markup mirrors featured-projects.tsx for full visual consistency.
 *    - Border, hover, image zoom, tags — all identical to homepage.
 *
 * 4. FILTERING:
 *    - Category filter: single-select, "all" shows everything.
 *    - Tech filter: multi-select, project must include ALL selected techs.
 *    - Both filters work together.
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
import {
  ProjectsFilter,
  type FilterState,
  type ProjectCategory,
  type ProjectTech,
} from "@/components/projects/projects-filter"

// ============================================================================
// EDITABLE CONTENT
// ============================================================================

const SECTION_TITLE = "Projects"
const SECTION_SUBTITLE = "A curated overview of client and personal work across disciplines."

// ============================================================================
// DATA
// ============================================================================

type Project = {
  id: string
  slug: string
  title: string
  category: ProjectCategory
  tech: ProjectTech[]
  image: string
  completed: string
  description?: string
  href?: {
    live?: string
    github?: string
  } | string
}

function makePlaceholder(label: string, color: string) {
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg width="800" height="500" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${color};stop-opacity:1"/><stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1"/></linearGradient></defs><rect width="800" height="500" fill="url(#g)"/><text x="50%" y="47%" font-family="Arial,sans-serif" font-size="22" fill="#aaa" text-anchor="middle">${label}</text><text x="50%" y="57%" font-family="Arial,sans-serif" font-size="14" fill="#666" text-anchor="middle">Project Image</text></svg>`
  )}`
}

const ALL_PROJECTS: Project[] = [
  {
    id: "1",
    slug: "creative-agency-website",
    title: "Creative Agency Website",
    category: "creative",
    tech: ["react", "nextjs"],
    completed: "Jan 2025",
    description: "A visually rich agency site with motion design and custom animations.",
    image: makePlaceholder("Creative Agency", "#1e1a2e"),
    href: { live: "#", github: "#" },
  },
  {
    id: "2",
    slug: "property-listing-platform",
    title: "Property Listing Platform",
    category: "real-estate",
    tech: ["wordpress", "php"],
    completed: "Dec 2024",
    description: "WordPress-powered real estate portal with advanced search and map integration.",
    image: makePlaceholder("Property Listings", "#1a2e1e"),
    href: { live: "#" },
  },
  {
    id: "3",
    slug: "corporate-intranet",
    title: "Corporate Intranet",
    category: "corporate",
    tech: ["react", "php"],
    completed: "Nov 2024",
    description: "Internal company portal with document management and team directory.",
    image: makePlaceholder("Corporate Intranet", "#1e2a2e"),
    href: { github: "#" },
  },
  {
    id: "4",
    slug: "portfolio-blog",
    title: "Portfolio & Blog",
    category: "creative",
    tech: ["nextjs", "react"],
    completed: "Oct 2024",
    description: "Minimal portfolio with MDX blog, dark mode, and Framer Motion animations.",
    image: makePlaceholder("Portfolio Blog", "#2e1e1e"),
    href: { live: "#", github: "#" },
  },
  {
    id: "5",
    slug: "real-estate-cms",
    title: "Real Estate CMS",
    category: "real-estate",
    tech: ["wordpress", "php"],
    completed: "Sep 2024",
    description: "Custom WordPress theme with MLS data feeds and mortgage calculator.",
    image: makePlaceholder("Real Estate CMS", "#1e2e2e"),
    href: { live: "#" },
  },
  {
    id: "6",
    slug: "b2b-saas-dashboard",
    title: "B2B SaaS Dashboard",
    category: "corporate",
    tech: ["react", "nextjs"],
    completed: "Aug 2024",
    description: "Analytics dashboard with data visualizations, role-based access, and exports.",
    image: makePlaceholder("SaaS Dashboard", "#1e1e2e"),
    href: { live: "#", github: "#" },
  },
  {
    id: "7",
    slug: "brand-identity-site",
    title: "Brand Identity Site",
    category: "creative",
    tech: ["wordpress"],
    completed: "Jul 2024",
    description: "Storytelling-first brand website with scroll-triggered reveals.",
    image: makePlaceholder("Brand Identity", "#2a1e2e"),
    href: { live: "#" },
  },
  {
    id: "8",
    slug: "enterprise-landing-pages",
    title: "Enterprise Landing Pages",
    category: "corporate",
    tech: ["wordpress", "php"],
    completed: "Jun 2024",
    description: "High-converting landing page system built on a custom WordPress page builder.",
    image: makePlaceholder("Enterprise Landing", "#1e2e1a"),
    href: { live: "#" },
  },
]

// ============================================================================
// FILTERING LOGIC
// ============================================================================

function applyFilters(projects: Project[], filter: FilterState): Project[] {
  return projects.filter((p) => {
    const categoryMatch = filter.category === "all" || p.category === filter.category
    const techMatch = filter.tech === null || p.tech.includes(filter.tech)
    return categoryMatch && techMatch
  })
}

// ============================================================================
// CARD COMPONENT (mirrors featured-projects.tsx card markup)
// ============================================================================

function ProjectCard({ project }: { project: Project }) {
  const hasLinks = project.href && typeof project.href === "object"
  const singleLink = project.href && typeof project.href === "string"

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/50 bg-card transition-all hover:-translate-y-1 hover:border-white/50 hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
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

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <Badge key={t} variant="secondary" className="text-xs capitalize">
                {t === "nextjs" ? "Next.js" : t === "php" ? "PHP" : t === "wordpress" ? "WordPress" : "React"}
              </Badge>
            ))}
          </div>

          {/* Links */}
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

// ============================================================================
// PROJECTS SECTION
// ============================================================================

export function ProjectsSection() {
  const shouldReduceMotion = useReducedMotion()

  const [filter, setFilter] = React.useState<FilterState>({
    category: "all",
    tech: null,
  })

  const filtered = applyFilters(ALL_PROJECTS, filter)

  return (
    <section className="py-20">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-10 text-center">
          <AnimatedSectionTitle className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {SECTION_TITLE}
          </AnimatedSectionTitle>
          <p className="mt-4 text-lg text-muted-foreground">{SECTION_SUBTITLE}</p>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <ProjectsFilter filter={filter} onChange={setFilter} />
        </div>

        <Separator className="mb-10 bg-white/10" />

        {/* Grid */}
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
