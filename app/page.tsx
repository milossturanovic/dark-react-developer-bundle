/**
 * ============================================================================
 * HOME PAGE — SERVER ENTRY POINT
 * ============================================================================
 *
 * This file is intentionally tiny. It is a server component that:
 *   1. Reads the featured projects from `data/projects.json`.
 *   2. Hands them to `<HomePageClient />`, which contains the actual UI.
 *
 * EDIT YOUR PORTFOLIO:
 *   - Project content      → `data/projects.json`
 *   - Hero / sections copy → `components/home-page-client.tsx`
 *   - Site config + nav    → `config/site.ts`
 *
 * ============================================================================
 */

import { HomePageClient } from "@/components/home-page-client"
import { getFeaturedProjects } from "@/lib/projects-data"

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects(3)
  return <HomePageClient featuredProjects={featuredProjects} />
}
