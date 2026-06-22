/**
 * ============================================================================
 * ABOUT SECTION COMPONENT
 * ============================================================================
 * 
 * DEVELOPER EDIT NOTES:
 * 
 * This component creates a modern "About" section with an intro block and
 * an accordion showcasing developer skills, work process, and technologies.
 * 
 * WHERE TO UPDATE CONTENT:
 * 
 * 1. Developer Name & Role:
 *    - Edit name and role in config/site.ts
 * 
 * 2. Intro Text:
 *    - Edit `introParagraphs` array (line ~53) - Update the paragraph text
 *    - Add/remove paragraphs by adding/removing items to the array
 * 
 * 3. Accordion Items:
 *    - Edit `accordionItems` array (line ~60) - Update titles and content
 *    - To add a 4th item: Add a new object to the array with:
 *      {
 *        id: "item-4",
 *        icon: YourIcon, // Import from lucide-react
 *        title: "Your Title",
 *        content: "Your content text here..."
 *      }
 * 
 * 4. Change Icons:
 *    - Accordion category icons: Import from lucide-react at the top
 *    - Technology brand icons: Import from react-icons/si (Simple Icons)
 *    - Replace icon names in the `accordionItems` array for category icons
 *    - Technology icons are automatically mapped in `getTechIcon` function
 *    - Available lucide-react icons: Code2, Workflow, Layers, Terminal, Cpu, etc.
 *    - Available react-icons: SiReact, SiVue, SiAngular, SiNodedotjs, etc.
 * 
 * 5. Layout Changes:
 *    - To change from 2 columns to 1 column:
 *      - Remove `lg:grid-cols-2` from the grid className (line ~120)
 *      - Or change to `lg:grid-cols-1` if you want explicit single column
 *    - To adjust column widths:
 *      - Change `lg:col-span-1` classes (lines ~125, ~130)
 *      - Use Tailwind grid column spans (col-span-1 to col-span-12)
 * 
 * 6. Section ID:
 *    - The section uses id="about" for anchor linking
 *    - Change if needed in the <section> tag (line ~115)
 * 
 * ============================================================================
 */

"use client"

import * as React from "react"
import {
  Code2,
  Server,
  Palette,
  GitBranch,
  Rocket,
  Wrench,
  FileText,
  TestTube,
  // Technology icons
  FileCode,
  Layers,
  Box,
  Database,
  Key,
  Globe,
  Package,
  Circle,
  Square,
  Hexagon,
  // Generic fallback
  Code,
} from "lucide-react"
// Technology brand icons from react-icons
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiAngular,
  SiTailwindcss,
  SiSass,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiGraphql,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiPrisma,
  SiSequelize,
  SiFigma,
  SiGit,
  SiGithub,
  SiGitlab,
  SiBitbucket,
  SiDocker,
  SiVercel,
  SiNetlify,
  SiEslint,
  SiPrettier,
  SiNpm,
  SiPnpm,
  SiYarn,
  SiVite,
  SiSanity,
  SiContentful,
  SiStrapi,
  SiMarkdown,
  SiMdx,
  SiJest,
  SiVitest,
  SiCypress,
} from "react-icons/si"
import { AnimatedSectionTitle } from "@/components/motion/animated-section-title"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { InternationalGlobeCard } from "@/components/about/international-globe-card"
import { ExperienceMetric } from "@/components/about/experience-metric"
import { ProjectsMetric } from "@/components/about/projects-metric"
import { siteConfig } from "@/config/site"

// ============================================================================
// EDITABLE CONTENT - CUSTOMIZE YOUR INFORMATION HERE
// ============================================================================

// Intro paragraphs - Add/remove as needed
const introParagraphs = [
  "I'm a passionate developer who loves creating digital experiences that make a difference. With a focus on clean code, user experience, and modern technologies, I bring ideas to life through thoughtful design and robust development.",
  "Whether it's building responsive web applications, crafting intuitive user interfaces, or solving complex technical challenges, I approach every project with attention to detail and a commitment to excellence.",
  "I continuously stay updated with the latest industry trends and best practices, ensuring that every solution I deliver is not only functional but also scalable, maintainable, and future-proof. Collaboration and continuous learning drive my passion for development.",
]

// Technology icon mapping - maps technology names to react-icons brand icons
// Falls back to lucide-react icons for technologies without brand icons
const getTechIcon = (techName: string) => {
  const iconMap: Record<string, React.ComponentType<any>> = {
    // Frontend - using react-icons brand icons
    HTML: SiHtml5,
    CSS: SiCss3,
    JavaScript: SiJavascript,
    TypeScript: SiTypescript,
    React: SiReact,
    "Next.js": SiNextdotjs,
    Vue: SiVuedotjs,
    Angular: SiAngular,
    "Tailwind CSS": SiTailwindcss,
    Sass: SiSass,
    "shadcn/ui": Box, // No brand icon, using lucide-react
    "Radix UI": Box, // No brand icon, using lucide-react
    "Material UI": Box, // No brand icon, using lucide-react
    // Backend - using react-icons brand icons
    "Node.js": SiNodedotjs,
    Express: SiExpress,
    NestJS: SiNestjs,
    "REST API": Globe, // No brand icon, using lucide-react
    GraphQL: SiGraphql,
    PostgreSQL: SiPostgresql,
    MySQL: SiMysql,
    MongoDB: SiMongodb,
    Prisma: SiPrisma,
    Drizzle: Database, // No brand icon, using lucide-react
    Sequelize: SiSequelize,
    JWT: Key, // No brand icon, using lucide-react
    OAuth: Key, // No brand icon, using lucide-react
    Clerk: Key, // No brand icon, using lucide-react
    NextAuth: Key, // No brand icon, using lucide-react
    // Design - using react-icons brand icons
    Figma: SiFigma,
    // Version Control - using react-icons brand icons
    Git: SiGit,
    GitHub: SiGithub,
    GitLab: SiGitlab,
    Bitbucket: SiBitbucket,
    // DevOps - using react-icons brand icons
    Vercel: SiVercel,
    Netlify: SiNetlify,
    Docker: SiDocker,
    // Tooling - using react-icons brand icons
    "VS Code": Code, // No brand icon, using lucide-react
    ESLint: SiEslint,
    Prettier: SiPrettier,
    npm: SiNpm,
    pnpm: SiPnpm,
    yarn: SiYarn,
    Vite: SiVite,
    Turbopack: Rocket, // No brand icon, using lucide-react
    // Content - using react-icons brand icons
    Sanity: SiSanity,
    Contentful: SiContentful,
    Strapi: SiStrapi,
    Markdown: SiMarkdown,
    MDX: SiMdx,
    // Testing - using react-icons brand icons
    Jest: SiJest,
    Vitest: SiVitest,
    Playwright: TestTube, // No brand icon, using lucide-react
    Cypress: SiCypress,
  }

  // Try to find exact match first
  if (iconMap[techName]) {
    return iconMap[techName]
  }

  // Try case-insensitive match
  const lowerTech = techName.toLowerCase()
  for (const [key, icon] of Object.entries(iconMap)) {
    if (key.toLowerCase() === lowerTech) {
      return icon
    }
  }

  // Return generic icon based on tech name pattern
  if (lowerTech.includes("css") || lowerTech.includes("style")) return Layers
  if (lowerTech.includes("db") || lowerTech.includes("database")) return Database
  if (lowerTech.includes("api") || lowerTech.includes("graphql")) return Globe
  if (lowerTech.includes("auth") || lowerTech.includes("security")) return Key
  if (lowerTech.includes("test")) return TestTube
  if (lowerTech.includes("deploy") || lowerTech.includes("host")) return Rocket
  if (lowerTech.includes("git")) return GitBranch
  if (lowerTech.includes("tool") || lowerTech.includes("build")) return Wrench

  // Default generic icon
  return Circle
}

// Accordion items - Add/remove/edit items here
const accordionItems = [
  {
    id: "item-1",
    icon: Code2,
    title: "Frontend Development",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Vue",
      "Angular",
      "Tailwind CSS",
      "Sass",
      "shadcn/ui",
      "Radix UI",
      "Material UI",
    ],
  },
  {
    id: "item-2",
    icon: Server,
    title: "Backend Development",
    technologies: [
      "Node.js",
      "Express",
      "NestJS",
      "REST API",
      "GraphQL",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Prisma",
      "Drizzle",
      "Sequelize",
      "JWT",
      "OAuth",
      "NextAuth",
    ],
  },
  {
    id: "item-3",
    icon: Palette,
    title: "UI/UX & Design",
    technologies: ["Figma", "Wireframing", "UI Systems", "Design Tokens"],
  },
  {
    id: "item-4",
    icon: GitBranch,
    title: "Version Control & Collaboration",
    technologies: ["Git", "GitHub", "GitLab", "Bitbucket"],
  },
  {
    id: "item-5",
    icon: Rocket,
    title: "DevOps & Deployment",
    technologies: ["Vercel", "Netlify", "Docker"],
  },
  {
    id: "item-6",
    icon: Wrench,
    title: "Tooling & Developer Experience",
    technologies: ["VS Code", "ESLint", "Prettier", "npm", "pnpm", "yarn", "Vite", "Turbopack"],
  },
  {
    id: "item-7",
    icon: FileText,
    title: "Content & Data Management",
    technologies: ["Sanity", "Contentful", "Strapi", "Markdown", "MDX"],
  },
  {
    id: "item-8",
    icon: TestTube,
    title: "Testing & Quality",
    technologies: ["Jest", "Vitest", "Playwright", "Cypress"],
  },
]

// ============================================================================
// ABOUT SECTION COMPONENT
// ============================================================================

export function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Responsive Grid: 2 columns on desktop, stacked on mobile */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Intro Text */}
          <div className="lg:col-span-1">
            <AnimatedSectionTitle className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              About {siteConfig.name}
            </AnimatedSectionTitle>
            <p className="mt-2 text-lg text-muted-foreground">{siteConfig.role}</p>

            {/* Intro Paragraphs */}
            <div className="mt-6 space-y-4">
              {introParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-1">
            <h3 className="mb-6 text-2xl font-semibold text-foreground/80 sm:text-3xl">
              My tech stack:
            </h3>
            <Accordion
              type="single"
              collapsible
              defaultValue="item-1"
              className="w-full"
            >
              {accordionItems.map((item) => {
                const Icon = item.icon
                return (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="border-white/50"
                  >
                    <AccordionTrigger className="justify-start gap-3 text-left hover:no-underline [&>svg]:order-first">
                      <Icon className="size-4 shrink-0 text-muted-foreground" />
                      <span className="font-medium">{item.title}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-wrap gap-3 pt-2">
                        {item.technologies.map((tech, techIndex) => {
                          const TechIcon = getTechIcon(tech)
                          return (
                            <div
                              key={techIndex}
                              className="flex items-center gap-2 rounded-md border border-border/40 bg-card/50 px-3 py-2 transition-colors hover:border-border hover:bg-card"
                              title={tech}
                            >
                              <TechIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                {tech}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </div>
        </div>

        {/* Bento Grid Row - Metrics & Globe */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <InternationalGlobeCard />
          <ExperienceMetric />
          <ProjectsMetric />
        </div>
      </div>
    </section>
  )
}

