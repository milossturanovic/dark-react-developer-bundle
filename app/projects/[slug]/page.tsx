import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Check, Eye, Github } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SiteNavbar } from "@/components/site-navbar"
import { LightboxImage } from "@/components/projects/lightbox-image"
import { SiteFooter } from "@/components/site-footer"
import { AnimatedSectionTitle } from "@/components/motion/animated-section-title"
import {
  getProjectBySlug,
  getAllProjectSlugs,
  getAllProjectDetails,
  type ProjectDetail,
} from "@/lib/projects-data"

// ============================================================================
// STATIC PARAMS
// ============================================================================

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

// ============================================================================
// METADATA
// ============================================================================

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug)
  if (!project) return {}
  return {
    title: `${project.title} | Projects`,
    description: project.description,
  }
}

// ============================================================================
// CATEGORY LABELS
// ============================================================================

const CATEGORY_LABEL: Record<string, string> = {
  creative: "Creative",
  "real-estate": "Real Estate",
  corporate: "Corporate",
}

// ============================================================================
// META ITEM — inline label + value pair used in the info column
// ============================================================================

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/80">
        {label}
      </span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  )
}

// ============================================================================
// RELATED PROJECT CARD — minimal, consistent with existing card design
// ============================================================================

function RelatedCard({ project }: { project: ProjectDetail }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/50 bg-card transition-all hover:-translate-y-1 hover:border-white/50 hover:shadow-lg">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <Image
          src={project.screenshots.homepage}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Completed: {project.completionDate}
            </span>
          </div>

          <h3 className="text-xl font-semibold leading-tight">{project.title}</h3>

          <p className="line-clamp-2 text-sm text-muted-foreground">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <Badge key={t} variant="secondary" className="text-xs">
                {t}
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
            {project.websiteUrl && (
              <Button variant="outline" size="sm" asChild className="h-9 text-sm">
                <a
                  href={project.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5"
                >
                  <ExternalLink className="h-3 w-3" />
                  Live
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
// PAGE
// ============================================================================

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const project = await getProjectBySlug(params.slug)
  if (!project) notFound()

  // Pick up to 2 other published projects for the "More Projects" section
  const all = await getAllProjectDetails()
  const related = all.filter((p) => p.slug !== project.slug).slice(0, 2)

  return (
    <>
      <SiteNavbar />

      {/* Grid pattern background — matches homepage */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-background to-background/95">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <main className="min-h-screen">

        {/* ================================================================
            HERO — SECTION 1: INTRO BAND
        ================================================================ */}
        <section className="relative overflow-hidden border-b border-white/20 bg-background bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.07),_transparent_60%)]">
          <div className="mx-auto max-w-6xl px-4 py-24">

            {/* Back link */}
            <div className="mb-8 flex">
              <Link
                href="/projects"
                className="flex items-center gap-1.5 text-xs text-muted-foreground/60 transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-3 w-3" />
                All Projects
              </Link>
            </div>

            {/* Two-column intro */}
            <div className="grid gap-16 md:grid-cols-2 md:items-start">

              {/* LEFT — title block */}
              <div>
                {/* Badge row */}
                <div className="mb-6 flex flex-wrap items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="rounded-full border border-white/20 bg-white/10 text-xs text-foreground/80"
                  >
                    {CATEGORY_LABEL[project.category] ?? project.category}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="rounded-full border border-white/20 bg-white/10 text-xs text-foreground/80"
                  >
                    Web Development
                  </Badge>
                </div>

                {/* H1 */}
                <h1 className="mb-4 max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                  {project.title}
                </h1>

                {/* Completion date */}
                <p className="text-sm text-muted-foreground/70">
                  Completed {project.completionDate} &nbsp;&middot;&nbsp; {project.client}
                </p>
              </div>

              {/* RIGHT — description + CTA */}
              <div className="flex flex-col gap-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  {project.websiteUrl && (
                    <Button asChild>
                      <a
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live Preview
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button variant="outline" asChild>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================================================================
            HERO — SECTION 2: PREVIEW FRAME
        ================================================================ */}
        <div className="mx-auto max-w-6xl px-4 mt-20">
          <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-zinc-800 to-zinc-700 p-4 shadow-2xl">
            <LightboxImage
              src={project.screenshots.homepage}
              alt={`${project.title} — homepage preview`}
              sizes="(max-width: 1280px) 100vw, 1152px"
              priority
              containerClassName="rounded-xl overflow-hidden"
            />
          </div>
        </div>

        {/* ================================================================
            TWO-COLUMN CONTENT BLOCK
            Left: meta info + visit button
            Right: description + highlights
        ================================================================ */}
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-16 py-20 md:grid-cols-[1fr_2fr]">

            {/* LEFT — project meta */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <MetaItem label="Client" value={project.client} />
                <Separator className="bg-white/20" />
                <MetaItem label="Category" value={CATEGORY_LABEL[project.category] ?? project.category} />
                <Separator className="bg-white/20" />
                <MetaItem label="Duration" value={project.duration} />
                <Separator className="bg-white/20" />
                <MetaItem label="Completed" value={project.completionDate} />
                <Separator className="bg-white/20" />
                <MetaItem label="Role" value="Web Development" />
              </div>

              <div className="flex flex-wrap gap-3">
                {project.websiteUrl && (
                  <Button variant="outline" size="sm" asChild className="w-fit">
                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      View Project
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button variant="outline" size="sm" asChild className="w-fit">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Github className="h-3.5 w-3.5" />
                      GitHub
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* RIGHT — description + highlights */}
            <div className="flex flex-col gap-10">
              {/* Description */}
              <div>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </div>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <Badge
                    key={t}
                    variant="outline"
                    className="border-white/25 text-xs text-foreground/70"
                  >
                    {t}
                  </Badge>
                ))}
              </div>

              {/* Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div>
                  <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-muted-foreground/60">
                    What We Built
                  </h2>
                  <ul className="space-y-4">
                    {project.highlights.map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-foreground/40" />
                        <span className="text-sm leading-relaxed text-muted-foreground">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================================================================
            SECONDARY SCREENSHOT — full-width within container
        ================================================================ */}
        <div className="mx-auto max-w-6xl px-4 pb-20">
          <div className="overflow-hidden rounded-2xl border border-white/20">
            <LightboxImage
              src={project.screenshots.secondary}
              alt={`${project.title} — secondary view`}
              sizes="(max-width: 1280px) 100vw, 1152px"
            />
          </div>
        </div>

        {/* ================================================================
            IMPACT — numbered card grid
        ================================================================ */}
        {project.impact && project.impact.length > 0 && (
          <div className="relative border-y border-white/20 bg-background bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.07),_transparent_60%)] overflow-hidden">
            <div className="mx-auto max-w-6xl px-4 py-20">
              <div className="mb-10 text-center">
                <AnimatedSectionTitle className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Impact
                </AnimatedSectionTitle>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {project.impact.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-4 rounded-2xl border border-white/20 bg-white/[0.06] p-6 transition-transform duration-200 hover:-translate-y-1 hover:border-white/30"
                  >
                    {/* Numbered circle */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10">
                      <span className="text-sm font-bold text-foreground">{i + 1}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-semibold leading-snug text-foreground">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================
            MORE PROJECTS
        ================================================================ */}
        {related.length > 0 && (
          <div className="mx-auto max-w-6xl px-4 py-20">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
                  Keep Exploring
                </p>
                <AnimatedSectionTitle className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  More Projects
                </AnimatedSectionTitle>
              </div>
              <Button variant="outline" size="lg" asChild>
                <Link href="/projects">View all</Link>
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {related.map((p) => (
                <RelatedCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        )}

      </main>
      <SiteFooter />
    </>
  )
}
