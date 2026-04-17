/**
 * ============================================================================
 * PROJECTS DATA
 * ============================================================================
 *
 * DEVELOPER EDIT NOTES:
 *
 * This is the single source of truth for individual project detail pages.
 *
 * HOW TO ADD A PROJECT:
 * 1. Add a new object to the PROJECTS array below.
 * 2. Set a unique `slug` — this becomes the URL: /projects/your-slug
 * 3. Replace placeholder SVG image strings with real image paths once assets exist.
 *    Use public/ folder: e.g. image: "/images/projects/my-project-hero.jpg"
 *
 * HOW TO LINK FROM THE LIST PAGE:
 * - In components/sections/projects-section.tsx, add `slug` to each project
 *   and wrap the card in <Link href={`/projects/${project.slug}`}>
 *
 * IMAGES:
 * - Currently using inline SVG data URIs as placeholders.
 * - Replace with real paths under /public when available.
 *
 * ============================================================================
 */

// ============================================================================
// TYPES
// ============================================================================

export type ProjectCategory = "creative" | "real-estate" | "corporate"

export type ProjectDetail = {
  slug: string
  title: string
  category: ProjectCategory
  client: string
  logo: string          // Path or data URI — replace with /public asset
  duration: string      // e.g. "6 weeks"
  completionDate: string
  websiteUrl?: string
  description: string
  tech: string[]
  highlights?: string[]
  impact?: { title: string; description: string }[]
  screenshots: {
    homepage: string    // Main hero screenshot
    secondary: string   // Gallery / secondary view
  }
}

// ============================================================================
// SVG PLACEHOLDER HELPERS
// ============================================================================

function makeScreenshot(label: string, accent: string) {
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg width="1280" height="720" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${accent};stop-opacity:1"/>
          <stop offset="100%" style="stop-color:#111111;stop-opacity:1"/>
        </linearGradient>
      </defs>
      <rect width="1280" height="720" fill="url(#bg)"/>
      <rect x="60" y="40" width="200" height="30" rx="4" fill="#ffffff10"/>
      <rect x="60" y="90" width="520" height="60" rx="8" fill="#ffffff15"/>
      <rect x="60" y="170" width="380" height="20" rx="4" fill="#ffffff10"/>
      <rect x="60" y="200" width="300" height="20" rx="4" fill="#ffffff08"/>
      <rect x="60" y="260" width="120" height="40" rx="20" fill="#ffffff20"/>
      <rect x="200" y="260" width="120" height="40" rx="20" fill="#ffffff10"/>
      <rect x="60" y="340" width="1160" height="320" rx="16" fill="#ffffff08"/>
      <text x="640" y="500" font-family="Arial,sans-serif" font-size="18" fill="#666" text-anchor="middle">${label}</text>
    </svg>`
  )}`
}

function makeLogo(initials: string, bg: string) {
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="80" rx="12" fill="${bg}"/>
      <text x="50%" y="55%" font-family="Arial,sans-serif" font-weight="bold" font-size="26" fill="#fff" text-anchor="middle" dominant-baseline="middle">${initials}</text>
    </svg>`
  )}`
}

// ============================================================================
// PROJECTS DATA
// ============================================================================

export const PROJECTS: ProjectDetail[] = [
  {
    slug: "creative-agency-website",
    title: "Creative Agency Website",
    category: "creative",
    client: "Studio North",
    logo: makeLogo("SN", "#3b1f6e"),
    duration: "8 weeks",
    completionDate: "January 2025",
    websiteUrl: "https://example.com",
    description:
      "A visually driven agency website built to communicate brand personality through motion, typography, and scroll-based storytelling. The goal was to balance aesthetic ambition with real-world performance targets.",
    tech: ["Next.js", "React", "Framer Motion", "Tailwind CSS", "TypeScript"],
    highlights: [
      "Custom scroll-triggered animation system built with Framer Motion",
      "Page transition architecture that maintains scroll position across routes",
      "Fully responsive layout tested across 12 device breakpoints",
      "Integrated CMS for the team to manage case studies independently",
      "Core Web Vitals scores maintained above 90 post-launch",
    ],
    impact: [
      { title: "Lower Bounce Rate", description: "Bounce rate reduced by 34% compared to the previous site within the first month post-launch." },
      { title: "Longer Sessions", description: "Average session duration increased from 1:12 to 2:48, reflecting stronger content engagement." },
      { title: "More Enquiries", description: "Client reported a measurable increase in inbound enquiries within 30 days of going live." },
    ],
    screenshots: {
      homepage: makeScreenshot("Homepage — Hero Section", "#1e1a2e"),
      secondary: makeScreenshot("Case Studies Grid", "#2a1e3e"),
    },
  },
  {
    slug: "property-listing-platform",
    title: "Property Listing Platform",
    category: "real-estate",
    client: "Meridian Realty",
    logo: makeLogo("MR", "#1a3d2e"),
    duration: "12 weeks",
    completionDate: "December 2024",
    websiteUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/property-listing",
    description:
      "A WordPress-powered real estate portal with advanced property search, saved listings, and map-based browsing. Built to handle a large and frequently updated property inventory with minimal editorial overhead.",
    tech: ["WordPress", "PHP", "MySQL", "Google Maps API", "ACF Pro", "SASS"],
    highlights: [
      "Custom post type architecture for structured property data",
      "Map-based search with polygon drawing and radius filtering",
      "Agent profile system with listing attribution",
      "Mortgage calculator integrated directly into listing pages",
      "Automated XML feed import from the client's MLS provider",
    ],
    impact: [
      { title: "Search Adoption", description: "Property search usage increased 60% compared to the previous site after launch." },
      { title: "Faster Editing", description: "Editorial team reduced listing update time from 20 minutes to under 5 minutes per entry." },
      { title: "Scalable Architecture", description: "Site handles 500+ active listings without performance degradation under normal traffic." },
    ],
    screenshots: {
      homepage: makeScreenshot("Homepage — Search Bar + Featured Listings", "#1a2e1e"),
      secondary: makeScreenshot("Listing Detail Page with Map", "#1e2e1a"),
    },
  },
  {
    slug: "b2b-saas-dashboard",
    title: "B2B SaaS Dashboard",
    category: "corporate",
    client: "Praxis Analytics",
    logo: makeLogo("PA", "#1a1f3d"),
    duration: "16 weeks",
    completionDate: "August 2024",
    description:
      "An internal analytics dashboard for a B2B SaaS company, providing teams with a real-time view of pipeline health, customer activity, and operational metrics. Focus was on clarity, speed, and role-based data access.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Recharts", "REST API"],
    highlights: [
      "Role-based access control with four permission tiers",
      "Modular widget system allowing teams to configure their own dashboard views",
      "CSV and PDF export for all major data tables",
      "Optimistic UI updates for faster perceived performance",
      "Comprehensive error boundary and fallback state handling",
    ],
    impact: [
      { title: "Consolidated Tooling", description: "Replaced three separate internal tools with one unified interface, reducing context switching." },
      { title: "Faster Reporting", description: "Weekly review reporting time reduced from 2 hours to under 20 minutes across all teams." },
      { title: "Rapid Adoption", description: "Adopted by 4 internal teams within 6 weeks of launch with minimal onboarding required." },
    ],
    screenshots: {
      homepage: makeScreenshot("Dashboard — Pipeline Overview", "#1e1e2e"),
      secondary: makeScreenshot("Customer Activity Detail View", "#1a1a2e"),
    },
  },
]

// ============================================================================
// LOOKUP HELPERS
// ============================================================================

/** Returns a project by its slug, or undefined if not found. */
export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}

/** Returns all slugs — used for generateStaticParams in the dynamic route. */
export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((p) => p.slug)
}
