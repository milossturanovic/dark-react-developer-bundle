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
 * - framer-motion (for animations)
 */

"use client"

import { motion } from "framer-motion"
import { SiteNavbar } from "@/components/site-navbar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { HeroTitleWithGlobe } from "@/components/hero-title-with-globe"
import { AboutSection } from "@/components/sections/about-section"
import { FeaturedProjects } from "@/components/sections/featured-projects"
import { ServicesSection } from "@/components/sections/services-section"
import { AnimatedSectionTitle } from "@/components/motion/animated-section-title"
import { SiteFooter } from "@/components/site-footer"
import { ArrowRight, ExternalLink } from "lucide-react"

// ============================================================================
// EDITABLE DATA - CUSTOMIZE YOUR CONTENT HERE
// ============================================================================

// Feature badges displayed under hero section
const FEATURES_DATA = [
  "Web Development",
  "MERN Dev",
  "Mobile Dev",
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
      <main>
        
        {/* ================================================================
            HERO SECTION
            Edit headline, subtext, and CTA button text/links here
            
            EXAMPLE: Using HeroTitleWithGlobe wrapper with dotted globe background
            The globe rotates slowly behind the title for visual interest.
        ================================================================ */}
        <HeroTitleWithGlobe
          id="home"
          className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-20"
          contentClassName="relative z-10 mx-auto max-w-6xl px-4 space-y-8 text-center"
          // Globe customization (optional - defaults are fine)
          // pointCount={2000}      // Desktop: 2000, Mobile: 800 (auto)
          // radius={2.5}            // Globe size
          // pointSize={0.02}        // Dot size
          // color="#ffffff"         // Dot color (white)
          // opacity={0.3}           // Globe opacity (30%)
          // rotationSpeed={0.3}     // Rotation speed
        >
          {/* Main Headline - EDIT THIS */}
          <motion.h1
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl pb-2 overflow-visible"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.08, delayChildren: 0.2 }
              }
            }}
          >
            {/* First part: "Creating unique websites" */}
            {["Creating", "unique", "websites"].map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 4, ease: [0.4, 1, 0.4, 1] }
                  }
                }}
                className="inline-block mr-2 pb-1"
              >
                {word}
              </motion.span>
            ))}
            {" "}
            {/* Gradient part: "tailored to your needs" */}
            {["tailored", "to", "your", "needs"].map((word, i) => (
              <motion.span
                key={i}
                className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent inline-block mr-2 pb-1"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 4, ease: [0.4, 1, 0.4, 1] }
                  }
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subheadline - EDIT THIS */}
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Designing and creating digital, professional, innovative and modern solutions 
            in the fields of web development.
          </p>

          {/* CTA Buttons - EDIT LINKS */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Download Resume Button with Hover Animation */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              initial="rest"
              animate="rest"
            >
              <Button size="lg" asChild>
                <motion.a
                  href="#download"
                  className="group relative overflow-hidden"
                  initial="rest"
                  whileHover="hover"
                >
                  <span className="relative z-10 flex items-center">
                    Download Resume
                    <motion.span
                      className="ml-2 inline-flex relative w-4 h-4"
                      variants={{
                        rest: { x: 0, opacity: 1 },
                        hover: {
                          x: [0, 10, -10, 0],
                          opacity: [1, 0, 0, 1],
                          transition: {
                            duration: 0.8,
                            ease: "easeInOut"
                          }
                        }
                      }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  </span>
                  {/* Shimmer effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                  {/* Subtle glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-md bg-primary/20 blur-xl opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </Button>
            </motion.div>
            
            <Button size="lg" variant="outline" asChild>
              <a href="/contact">Contact</a>
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
        </HeroTitleWithGlobe>

        <Separator className="mt-12" />

        {/* ================================================================
            ABOUT SECTION
            Edit content in components/sections/about-section.tsx
        ================================================================ */}
        <AboutSection />

        <Separator />

        {/* ================================================================
            SERVICES SECTION
            Edit services in components/sections/services-section.tsx
        ================================================================ */}
        <ServicesSection />

        <Separator />

        {/* ================================================================
            PROJECTS SECTION
            Edit project cards in components/sections/featured-projects.tsx
        ================================================================ */}
        <FeaturedProjects />

 
        <Separator />

      </main>
      <SiteFooter />
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

