/**
 * SITE NAVIGATION BAR COMPONENT
 * 
 * This is the main navigation component with:
 * - Desktop menu with inline links
 * - Mobile menu using Sheet (slide-out drawer)
 * - Sticky positioning with backdrop blur
 * - CTA buttons (Download Bundle, View GitHub)
 * 
 * TO CUSTOMIZE:
 * - Edit navigation links in config/site.ts
 * - Change CTA button text and links below
 * - Modify styling by editing Tailwind classes
 */

"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SiteNavbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        "border-b border-border/40",
        isScrolled ? "bg-background/60 backdrop-blur-lg" : "bg-background/0"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* ====================================================================
            BRAND / LOGO
            Change the text to customize your brand name
        ==================================================================== */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">{siteConfig.name}</span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-6">
            {siteConfig.navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.title}
              </a>
            ))}
          </nav>
        </div>

        {/* ====================================================================
            CTA BUTTONS (Desktop)
            Edit button text and hrefs to match your needs
        ==================================================================== */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm" asChild>
            <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
              View GitHub
            </a>
          </Button>
          <Button size="sm" asChild>
            <a href={siteConfig.links.downloadBundle}>
              Download Bundle
            </a>
          </Button>
        </div>

        {/* ====================================================================
            MOBILE MENU
            Uses Sheet component for slide-out drawer
        ==================================================================== */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>{siteConfig.shortName}</SheetTitle>
            </SheetHeader>
            <div className="mt-8 flex flex-col gap-4">
              {/* Mobile Navigation Links */}
              {siteConfig.navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-lg font-medium transition-colors hover:text-foreground"
                >
                  {item.title}
                </a>
              ))}
              
              {/* Mobile CTA Buttons */}
              <div className="mt-4 flex flex-col gap-2">
                <Button variant="outline" asChild>
                  <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
                    View GitHub
                  </a>
                </Button>
                <Button asChild>
                  <a href={siteConfig.links.downloadBundle}>
                    Download Bundle
                  </a>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

