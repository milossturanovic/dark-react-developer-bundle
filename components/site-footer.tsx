"use client"

/**
 * SITE FOOTER
 *
 * Global footer used on every page. Includes:
 * - Contact / CTA section with animated social links
 * - Bottom bar with brand name, copyright, and nav links
 *
 * TO CUSTOMIZE:
 * - Edit SOCIAL_LINKS below (keep in sync with app/page.tsx)
 * - Edit copyright text / year (auto-updates)
 * - Add footer columns by extending the bottom bar layout
 */

import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { AnimatedSectionTitle } from "@/components/motion/animated-section-title"

// ============================================================================
// SOCIAL LINKS — update with real URLs
// ============================================================================

const SOCIAL_LINKS = [
  { name: "GitHub",   href: "https://github.com/yourusername",     icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/in/yourusername", icon: Linkedin },
  { name: "Email",    href: "mailto:your.email@example.com",        icon: Mail },
]

// ============================================================================
// COMPONENT
// ============================================================================

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer>
      {/* ── Contact / CTA ─────────────────────────────────────────── */}
      <section id="contact" className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <AnimatedSectionTitle className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Get in Touch
            </AnimatedSectionTitle>
            <p className="mt-4 text-lg text-muted-foreground">
              Connect with me on social media or send an email
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon
                return (
                  <Button key={social.name} variant="outline" size="lg" asChild>
                    <motion.a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2"
                      initial="rest"
                      whileHover="hover"
                    >
                      <motion.span
                        className="relative inline-flex h-5 w-5"
                        variants={{
                          rest: { y: 0, opacity: 1 },
                          hover: {
                            y: [0, 15, -15, 0],
                            opacity: [1, 0, 0, 1],
                            transition: {
                              duration: 0.5,
                              ease: "easeInOut",
                            },
                          },
                        }}
                      >
                        <Icon className="h-5 w-5" />
                      </motion.span>
                      {social.name}
                    </motion.a>
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom bar ────────────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm font-medium text-foreground/70">
              {siteConfig.name}
            </p>

            <p className="text-sm text-muted-foreground">
              © {year} {siteConfig.name}. Built with Next.js &amp; Tailwind CSS.
            </p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link href="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
              <Link href="/projects" className="transition-colors hover:text-foreground">
                Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
