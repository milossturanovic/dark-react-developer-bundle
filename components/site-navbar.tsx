/**
 * SITE NAVIGATION BAR COMPONENT
 *
 * - Desktop: brand name + inline nav links (no CTA buttons)
 * - Mobile: hamburger opens Sheet with nav links only (menu visible only on mobile)
 * - Sticky with backdrop blur on scroll
 *
 * TO CUSTOMIZE: Edit brand name and nav links in config/site.ts
 */

"use client"

import * as React from "react"
import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

import { AnimatedBurgerIcon } from "@/components/animated-burger-icon"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sidemenu,
  SidemenuContent,
  SidemenuHeader,
  SidemenuTitle,
  SidemenuTrigger,
} from "@/components/ui/sidemenu"

const SHEET_DURATION_MS = 450
const SCROLL_DURATION_MS = 800

function smoothScrollToElement(el: Element, durationMs: number) {
  const start = window.scrollY
  const target = el.getBoundingClientRect().top + start
  const distance = target - start
  const startTime = performance.now()

  function step(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / durationMs, 1)
    const eased = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2
    window.scrollTo(0, start + distance * eased)
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export function SiteNavbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [sheetOpen, setSheetOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeSheet = React.useCallback(() => setSheetOpen(false), [])

  const handleAnchorClick = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith("#")) {
        e.preventDefault()
        const el = document.querySelector(href)
        if (el) smoothScrollToElement(el, SCROLL_DURATION_MS)
      }
    },
    []
  )

  const handleSidemenuNavClick = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith("#")) {
        e.preventDefault()
        closeSheet()
        setTimeout(() => {
          const el = document.querySelector(href)
          if (el) smoothScrollToElement(el, SCROLL_DURATION_MS)
        }, SHEET_DURATION_MS)
      } else {
        closeSheet()
      }
    },
    [closeSheet]
  )

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        "border-b border-border/40",
        isScrolled ? "bg-background/60 backdrop-blur-lg" : "bg-background/0"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">{siteConfig.name}</span>
        </Link>

        {/* Right side: desktop nav + mobile trigger */}
        <div className="flex items-center gap-6">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {siteConfig.navItems.map((item) => (
              item.href.startsWith("/") ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.title}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.href)}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.title}
                </a>
              )
            ))}
          </nav>

          {/* Mobile menu */}
          <Sidemenu open={sheetOpen} onOpenChange={setSheetOpen}>
          <SidemenuTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <AnimatedBurgerIcon open={sheetOpen} className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SidemenuTrigger>
          <SidemenuContent side="right" duration={SHEET_DURATION_MS}>
              <SidemenuHeader>
                <SidemenuTitle>{siteConfig.shortName}</SidemenuTitle>
              </SidemenuHeader>
              <div className="mt-8 flex flex-col gap-6">
                {/* Nav links – close sheet on click */}
                <nav className="flex flex-col gap-3">
                  {siteConfig.navItems.map((item) =>
                    item.href.startsWith("/") ? (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeSheet}
                        className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={(e) => handleSidemenuNavClick(e, item.href)}
                        className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {item.title}
                      </a>
                    )
                  )}
                </nav>

                {/* Email link */}
                <a
                  href={siteConfig.links.email}
                  onClick={closeSheet}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {siteConfig.links.email.replace("mailto:", "")}
                </a>

                {/* Social / contact buttons */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="icon" asChild>
                    <a href={siteConfig.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href={siteConfig.links.email} aria-label="Email">
                      <Mail className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
          </SidemenuContent>
          </Sidemenu>
        </div>
      </div>
    </header>
  )
}

