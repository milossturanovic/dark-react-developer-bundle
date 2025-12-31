/**
 * ============================================================================
 * DARK REACT DEVELOPER BUNDLE - MAIN PAGE
 * ============================================================================
 * 
 * TEMPLATE PRODUCT - DEVELOPER NOTES:
 * 
 * This is a single-page portfolio template built with Next.js App Router.
 * 
 * HOW TO CUSTOMIZE:
 * 1. Edit site branding and navigation in: config/site.ts
 * 2. Update hero section headline and copy below (search for "HERO CONTENT")
 * 3. Edit project cards in the PROJECTS_DATA array
 * 4. Modify feature badges in FEATURES_DATA array
 * 5. Update about section content
 * 6. Change contact information and links
 * 
 * STRUCTURE:
 * - Top: Sticky navigation bar (components/site-navbar.tsx)
 * - Hero: Main headline with CTAs and feature badges
 * - Projects: Grid of project cards with tags
 * - About: Brief introduction section
 * - Contact: Contact information and links
 * 
 * TECH STACK:
 * - Next.js 14+ (App Router)
 * - TypeScript
 * - Tailwind CSS
 * - shadcn/ui components
 * - lucide-react icons
 */

import { SiteNavbar } from "@/components/site-navbar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Github, Linkedin, Mail, ExternalLink } from "lucide-react"

// ============================================================================
// EDITABLE DATA - CUSTOMIZE YOUR CONTENT HERE
// ============================================================================

// Feature badges displayed under hero section
const FEATURES_DATA = [
  "Next.js App Router",
  "shadcn/ui",
  "Tailwind CSS",
]

// Project cards data - Add/remove/edit projects here
const PROJECTS_DATA = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with cart, payments, and admin dashboard.",
    tags: ["Next.js", "Stripe", "Prisma"],
    link: "#",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task manager with real-time updates and team features.",
    tags: ["React", "Firebase", "Tailwind"],
    link: "#",
  },
  {
    id: 3,
    title: "Portfolio Template",
    description: "Modern, responsive portfolio template with dark mode and animations.",
    tags: ["Next.js", "TypeScript", "Framer"],
    link: "#",
  },
]

// Social links - Update with your actual profiles
const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: "https://github.com/yourusername",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/yourusername",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:your.email@example.com",
    icon: Mail,
  },
]

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Background with subtle gradient effect */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-background to-background/95">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Navigation */}
      <SiteNavbar />

      {/* Main Content */}
      <main className="container">
        
        {/* ================================================================
            HERO SECTION
            Edit headline, subtext, and CTA button text/links here
        ================================================================ */}
        <section id="home" className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-20 text-center">
          <div className="mx-auto max-w-3xl space-y-8">
            {/* Status Badge */}
            <Badge variant="outline" className="mb-4">
              ✨ Included: Resume + Portfolio + Interview PDFs
            </Badge>

            {/* Main Headline - EDIT THIS */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Build a modern developer portfolio that looks{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                premium
              </span>
            </h1>

            {/* Subheadline - EDIT THIS */}
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
              A complete Next.js portfolio bundle with dark theme, modern UI components, 
              and production-ready code. Start building in minutes.
            </p>

            {/* CTA Buttons - EDIT LINKS */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" asChild>
                <a href="#download">
                  Get the Bundle
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#projects">See Projects</a>
              </Button>
            </div>

            {/* Feature Badges - EDIT in FEATURES_DATA array above */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-8">
              {FEATURES_DATA.map((feature) => (
                <Badge key={feature} variant="secondary">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* ================================================================
            PROJECTS SECTION
            Edit project cards in PROJECTS_DATA array above
        ================================================================ */}
        <section id="projects" className="py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Featured Projects
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A selection of recent work and side projects
              </p>
            </div>

            {/* Projects Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PROJECTS_DATA.map((project) => (
                <article
                  key={project.id}
                  className="group relative overflow-hidden rounded-lg border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Project Content */}
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-semibold">{project.title}</h3>
                      <a
                        href={project.link}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                        aria-label={`View ${project.title}`}
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* ================================================================
            ABOUT SECTION
            Edit the about content below
        ================================================================ */}
        <section id="about" className="py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              About This Template
            </h2>
            <div className="mt-6 space-y-4 text-lg text-muted-foreground">
              <p>
                This portfolio bundle is designed for developers who want a professional,
                modern web presence without spending weeks on design and development.
              </p>
              <p>
                Built with the latest web technologies and best practices, it includes
                everything you need: responsive design, dark theme, accessible components,
                and clean, maintainable code.
              </p>
              <p className="pt-4">
                <Button variant="outline" asChild>
                  <a href="#contact">Get in Touch</a>
                </Button>
              </p>
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* ================================================================
            CONTACT SECTION
            Edit social links in SOCIAL_LINKS array above
        ================================================================ */}
        <section id="contact" className="py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Get in Touch
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Connect with me on social media or send an email
            </p>

            {/* Social Links */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon
                return (
                  <Button key={social.name} variant="outline" size="lg" asChild>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="gap-2"
                    >
                      <Icon className="h-5 w-5" />
                      {social.name}
                    </a>
                  </Button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t py-8 text-center text-sm text-muted-foreground">
          <p>© 2024 Dark React Bundle. Built with Next.js and Tailwind CSS.</p>
        </footer>
      </main>
    </div>
  )
}

/**
 * ============================================================================
 * DOCS ROADMAP NOTES (for future documentation PDF)
 * ============================================================================
 * 
 * The documentation should cover:
 * 
 * 1. TECH STACK OVERVIEW
 *    - Next.js 14+ with App Router
 *    - TypeScript for type safety
 *    - Tailwind CSS for styling
 *    - shadcn/ui component library
 *    - lucide-react for icons
 * 
 * 2. FOLDER STRUCTURE
 *    - /app - Next.js App Router pages and layouts
 *    - /components - Reusable React components
 *    - /components/ui - shadcn/ui components
 *    - /config - Site configuration files
 *    - /lib - Utility functions
 * 
 * 3. CUSTOMIZATION GUIDE
 *    - How to change colors (Tailwind config + CSS variables)
 *    - Typography customization (fonts, sizes)
 *    - Adding/removing sections
 *    - Editing navigation menu items
 *    - Updating project cards and content
 * 
 * 4. CONTENT MANAGEMENT
 *    - Where to edit hero section text
 *    - How to add/remove projects (PROJECTS_DATA array)
 *    - Editing feature badges
 *    - Updating social links
 *    - Managing site metadata
 * 
 * 5. STYLING & THEMING
 *    - Understanding the dark theme system
 *    - CSS variables in globals.css
 *    - Tailwind configuration
 *    - Adding custom colors
 *    - Component variants
 * 
 * 6. COMPONENTS
 *    - Button variants and usage
 *    - Badge styles
 *    - Sheet (mobile menu) component
 *    - Navigation bar customization
 * 
 * 7. DEPLOYMENT
 *    - Deploying to Vercel (recommended)
 *    - Environment variables setup
 *    - Build optimization
 *    - Custom domain setup
 * 
 * 8. EXTENDING THE TEMPLATE
 *    - Adding new pages
 *    - Creating new sections
 *    - Installing additional shadcn/ui components
 *    - Integrating forms (contact form example)
 *    - Adding analytics
 * 
 * 9. BEST PRACTICES
 *    - SEO optimization tips
 *    - Performance considerations
 *    - Accessibility guidelines
 *    - Mobile responsiveness testing
 * 
 * 10. TROUBLESHOOTING
 *     - Common build errors
 *     - Development setup issues
 *     - Styling problems
 *     - Component import errors
 */

