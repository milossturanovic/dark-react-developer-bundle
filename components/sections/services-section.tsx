/**
 * ============================================================================
 * SERVICES SECTION COMPONENT
 * ============================================================================
 * 
 * DEVELOPER EDIT NOTES:
 * 
 * This component displays a services section with service cards.
 * 
 * WHERE TO UPDATE CONTENT:
 * 
 * 1. Section Title:
 *    - Edit `sectionTitle` constant (line ~50) - currently "Services"
 *    - Example: "What I do", "What I offer"
 * 
 * 2. Section Intro:
 *    - Edit `sectionIntro` constant (line ~51) - short intro text
 *    - Keep it to 1 sentence max
 * 
 * 3. Services Data:
 *    - Edit `SERVICES_DATA` array (line ~53)
 *    - Add/remove services by adding/removing objects
 *    - Each service needs: icon, title, description, included array
 * 
 * 4. Change Icons:
 *    - Import different icons from lucide-react (line ~30)
 *    - Replace icon names in SERVICES_DATA array
 *    - Available options: Code2, Palette, Rocket, Layers, etc.
 * 
 * 5. Layout:
 *    - Grid columns: Edit `md:grid-cols-3` (line ~90)
 *    - Change to `md:grid-cols-2` for 2 columns on desktop
 *    - Change to `md:grid-cols-4` for 4 columns on desktop
 * 
 * ============================================================================
 */

"use client"

import * as React from "react"
import { Code2, Palette, Zap } from "lucide-react"
import { AnimatedSectionTitle } from "@/components/motion/animated-section-title"
import { ServiceCard } from "@/components/services/service-card"

// ============================================================================
// EDITABLE CONTENT - CUSTOMIZE YOUR SERVICES HERE
// ============================================================================

// Section header
const sectionTitle = "Services"
const sectionIntro = "Focused expertise in modern web development and product engineering."

// Services data - Add/remove/edit services here
const SERVICES_DATA = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Developing modern, reliable web applications using both custom frameworks and CMS-driven architectures.",
    included: [
      "React & Next.js applications",
      "WordPress frontend & backend development",
      "PHP, MySQL & API integrations",
    ],
  },
  {
    icon: Palette,
    title: "UI Engineering",
    description:
      "Turning design systems and product interfaces into clean, reusable, production-ready code.",
    included: [
      "Figma-to-code workflows",
      "Reusable UI components & design systems",
      "Accessibility-first implementation",
    ],
  },
  {
    icon: Zap,
    title: "Performance & Optimization",
    description:
      "Improving real-world applications by optimizing performance across frontend, backend, and infrastructure.",
    included: [
      "Core Web Vitals & runtime optimization",
      "WordPress, server & hosting optimization",
      "Production debugging & troubleshooting",
    ],
  },
]

// ============================================================================
// SERVICES SECTION COMPONENT
// ============================================================================

export function ServicesSection() {
  return (
    <section id="services" className="py-20">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <AnimatedSectionTitle className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {sectionTitle}
          </AnimatedSectionTitle>
          <p className="mt-4 text-lg text-muted-foreground">{sectionIntro}</p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {SERVICES_DATA.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              included={service.included}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

