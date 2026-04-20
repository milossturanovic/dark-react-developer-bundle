/**
 * ============================================================================
 * HOME PAGE — CLIENT COMPONENT
 * ============================================================================
 *
 * Renders the homepage. Lives as a client component because of the framer-
 * motion hero animations. The list of featured projects is fetched server-
 * side in `app/page.tsx` and passed in as a prop.
 *
 * EDIT YOUR HERO COPY:
 *   - Headline words → arrays in the H1 below.
 *   - Subheadline    → <p> below the H1.
 *   - CTA buttons    → "Download Resume" + "Contact" links.
 *   - FEATURES_DATA  → small badges under the hero CTAs.
 *
 * ============================================================================
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
import { SiteFooter } from "@/components/site-footer"
import { ArrowRight } from "lucide-react"
import type { FeaturedProjectCard } from "@/lib/projects-data"

// ----------------------------------------------------------------------------
// EDITABLE COPY — feature badges under the hero
// ----------------------------------------------------------------------------

const FEATURES_DATA = ["Web Development", "MERN Dev", "Mobile Dev"]

interface HomePageClientProps {
  featuredProjects: FeaturedProjectCard[]
}

export function HomePageClient({ featuredProjects }: HomePageClientProps) {
  return (
    <div className="relative min-h-screen">
      {/* Background grid pattern */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-background to-background/95">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <SiteNavbar />

      <main>
        {/* ================================================================
            HERO SECTION
        ================================================================ */}
        <HeroTitleWithGlobe
          id="home"
          className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-20"
          contentClassName="relative z-10 mx-auto max-w-6xl px-4 space-y-8 text-center"
        >
          <motion.h1
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl pb-2 overflow-visible"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.08, delayChildren: 0.2 },
              },
            }}
          >
            {["Creating", "unique", "websites"].map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 4, ease: [0.4, 1, 0.4, 1] },
                  },
                }}
                className="inline-block mr-2 pb-1"
              >
                {word}
              </motion.span>
            ))}
            {" "}
            {["tailored", "to", "your", "needs"].map((word, i) => (
              <motion.span
                key={i}
                className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent inline-block mr-2 pb-1"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 4, ease: [0.4, 1, 0.4, 1] },
                  },
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Designing and creating digital, professional, innovative and modern solutions
            in the fields of web development.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* "Download Resume" with hover animation */}
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
                          transition: { duration: 0.8, ease: "easeInOut" },
                        },
                      }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
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

          <div className="flex flex-wrap items-center justify-center gap-2 pt-8">
            {FEATURES_DATA.map((feature) => (
              <Badge key={feature} variant="secondary">
                {feature}
              </Badge>
            ))}
          </div>
        </HeroTitleWithGlobe>

        <Separator className="mt-12" />

        <AboutSection />

        <Separator />

        <ServicesSection />

        <Separator />

        <FeaturedProjects projects={featuredProjects} />

        <Separator />
      </main>

      <SiteFooter />
    </div>
  )
}
