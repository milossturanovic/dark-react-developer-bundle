/**
 * SITE CONFIGURATION
 * 
 * Edit this file to customize your portfolio brand, navigation, and links.
 * This is the central place for all site-wide settings.
 */

export type SiteConfig = typeof siteConfig

// ============================================================================
// BRAND & METADATA
// Change these to customize your portfolio branding
// ============================================================================
export const siteConfig = {
  name: "John Doe",
  shortName: "John", // Used in mobile view or as logo abbreviation
  role: "Full Stack Developer",
  description:
    "Full stack developer portfolio showcasing web projects, client work, and modern front-end builds.",
  url: "https://johndoe.dev",
  contact: {
    location: "United States",
    email: "john.doe@example.com",
  },
  
  // ============================================================================
  // NAVIGATION LINKS
  // Add/remove/edit navigation items here
  // Format: { title: "Display Text", href: "#section-id" }
  // ============================================================================
  navItems: [
    { title: "Home", href: "/" },
    { title: "Projects", href: "/projects" },
    { title: "Contact", href: "/contact" },
  ],
  
  // ============================================================================
  // CALL-TO-ACTION LINKS
  // Update these URLs with your actual links
  // ============================================================================
  links: {
    github: "https://github.com/yourusername",
    downloadBundle: "#download", // Update with actual download link
    twitter: "https://twitter.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    email: "mailto:john.doe@example.com",
  },
}

