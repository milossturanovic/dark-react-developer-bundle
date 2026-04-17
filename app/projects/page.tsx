import type { Metadata } from "next"
import { SiteNavbar } from "@/components/site-navbar"
import { ProjectsSection } from "@/components/sections/projects-section"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Projects | John Doe",
  description: "A curated overview of client and personal web development projects.",
}

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen">
      {/* Grid pattern background — matches homepage */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-background to-background/95">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <SiteNavbar />
      <main className="min-h-screen">
        <ProjectsSection />
      </main>
      <SiteFooter />
    </div>
  )
}
