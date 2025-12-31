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
  name: "Dark React Bundle",
  shortName: "DRB", // Used in mobile view or as logo abbreviation
  description: "A modern dark-themed developer portfolio template",
  url: "https://yoursite.com",
  
  // ============================================================================
  // NAVIGATION LINKS
  // Add/remove/edit navigation items here
  // Format: { title: "Display Text", href: "#section-id" }
  // ============================================================================
  navItems: [
    {
      title: "Home",
      href: "#home",
    },
    {
      title: "Projects",
      href: "#projects",
    },
    {
      title: "About",
      href: "#about",
    },
    {
      title: "Contact",
      href: "#contact",
    },
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
  },
}

