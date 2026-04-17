/**
 * ============================================================================
 * METRIC CARD COMPONENT
 * ============================================================================
 * 
 * DEVELOPER EDIT NOTES:
 * 
 * This is a reusable metric card component that displays a title, value,
 * and optional animated bullet points.
 * Used by ExperienceMetric and ProjectsMetric components.
 * 
 * WHERE TO CUSTOMIZE:
 * 
 * 1. Title Text:
 *    - Edit the `title` prop in ExperienceMetric or ProjectsMetric
 *    - This becomes the H3 heading at the top
 *    - Example: title="Custom title here"
 * 
 * 2. Bullet Text:
 *    - Edit the `bullets` array prop in ExperienceMetric or ProjectsMetric
 *    - Each string in the array becomes one bullet line
 *    - Example: bullets={["Line 1", "Line 2", "Line 3"]}
 * 
 * 3. Animation Speed:
 *    - Stagger delay: Edit `STAGGER_DELAY` constant (line ~75)
 *    -   Smaller = faster stagger (0.1 = quick, 0.2 = slower)
 *    - Item duration: Edit `ANIMATION_DURATION` constant (line ~78)
 *    -   Smaller = faster fade (0.3 = quick, 0.5 = slower)
 * 
 * 4. Disable Animation:
 *    - Remove `bullets` prop or pass empty array: bullets={[]}
 *    - Or set `ANIMATION_ENABLED = false` constant (line ~72)
 * 
 * 5. Card Height:
 *    - Edit `CARD_HEIGHT` constant (line ~82) - currently 320px
 *    - Must match `cardHeight` in international-globe-card.tsx
 *    - All cards will have the same fixed height regardless of screen size
 * 
 * 6. Styling:
 *    - Card container: Edit className in the outer <div> (line ~130)
 *    - Title size: Edit `text-2xl` (line ~135) - H3 styling
 *    - Value text size: Edit `text-4xl` (line ~155) - big number
 *    - Bullet text size: Edit `text-sm` (line ~180)
 *    - Spacing: Edit `mt-2`, `mt-4`, `space-y-1` for spacing adjustments
 * 
 * 7. Layout:
 *    - Currently left-aligned (text-left)
 *    - All content flows top to bottom: title -> number -> bullets
 * 
 * 8. Colors:
 *    - Title color: Edit `text-muted-foreground` (line ~150)
 *    - Value color: Edit `text-foreground` (line ~155)
 *    - Bullet color: Edit `text-muted-foreground` (line ~180)
 * 
 * ============================================================================
 */

"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string
  bullets?: string[]
  className?: string
}

// ============================================================================
// ANIMATION CONFIGURATION
// ============================================================================

// Animation enabled flag - set to false to disable all animations
const ANIMATION_ENABLED = true

// Stagger delay between each bullet (in seconds)
const STAGGER_DELAY = 0.15

// Duration for each bullet animation (in seconds)
const ANIMATION_DURATION = 0.4

// Initial Y offset for slide-up effect (in pixels)
const INITIAL_Y_OFFSET = 8

// Card height - must match international-globe-card.tsx cardHeight
const CARD_HEIGHT = 320 // pixels

export function MetricCard({
  title,
  value,
  bullets = [],
  className,
}: MetricCardProps) {
  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const shouldAnimate = ANIMATION_ENABLED && !prefersReducedMotion && bullets.length > 0

  // Animation variants for the container (stagger children)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldAnimate ? STAGGER_DELAY : 0,
      },
    },
  }

  // Animation variants for each bullet item
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldAnimate ? INITIAL_Y_OFFSET : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldAnimate ? ANIMATION_DURATION : 0,
        ease: "easeOut",
      },
    },
  }

  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-2xl border border-white/50 bg-card p-6",
        className
      )}
      style={{ height: `${CARD_HEIGHT}px`, transformStyle: "preserve-3d" }}
    >
      <div className="flex flex-col text-left">
        {/* Title and Value - Inline */}
        <h3 className="text-2xl font-semibold text-foreground/80 sm:text-3xl">
          {title} <span className="text-foreground">{value}</span>
        </h3>

        {/* Bullets */}
        {bullets.length > 0 && (
          <motion.ul
            className="mt-4 space-y-1"
            variants={shouldAnimate ? containerVariants : undefined}
            initial={shouldAnimate ? "hidden" : "visible"}
            whileInView={shouldAnimate ? "visible" : undefined}
            viewport={{ once: true, margin: "-50px" }}
          >
            {bullets.map((bullet, index) => (
              <motion.li
                key={index}
                variants={shouldAnimate ? itemVariants : undefined}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <span className="text-muted-foreground/60">•</span>
                <span>{bullet}</span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </div>
  )
}

