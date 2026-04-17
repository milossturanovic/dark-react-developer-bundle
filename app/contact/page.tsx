/**
 * ============================================================================
 * CONTACT PAGE
 * ============================================================================
 *
 * Route: /contact
 *
 * This page renders the contact section with info panel + inquiry form.
 * It follows the same page shell pattern used by /projects:
 * - Grid pattern background
 * - SiteNavbar
 * - Main content
 * - SiteFooter (includes the "Get in Touch" CTA + bottom bar)
 *
 * TO CUSTOMIZE:
 * - Page title and description: edit the metadata export below.
 * - Contact content: edit components/sections/contact-section.tsx
 *
 * ============================================================================
 */

import type { Metadata } from "next"
import { SiteNavbar } from "@/components/site-navbar"
import { ContactSection } from "@/components/sections/contact-section"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Contact | John Doe",
  description:
    "Get in touch for web development projects, collaborations, or freelance work.",
}

export default function ContactPage() {
  return (
    <div className="relative min-h-screen">
      {/* Grid pattern background — matches homepage */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-background to-background/95">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <SiteNavbar />
      <main className="min-h-screen">
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  )
}
