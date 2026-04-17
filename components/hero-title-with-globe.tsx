/**
 * ============================================================================
 * HERO TITLE WITH GLOBE WRAPPER COMPONENT
 * ============================================================================
 * 
 * DEVELOPER NOTES:
 * 
 * This is a reusable wrapper component that places a dotted rotating globe
 * behind a title or heading. It handles the layout, positioning, and
 * responsive behavior automatically.
 * 
 * WHERE IT'S USED:
 * - Hero sections with main headlines
 * - Section headers that need visual interest
 * - Any centered title that needs a subtle animated background
 * 
 * HOW TO USE:
 * 
 * Basic usage:
 * ```tsx
 * <HeroTitleWithGlobe>
 *   <h1>Your Title Here</h1>
 * </HeroTitleWithGlobe>
 * ```
 * 
 * With custom globe settings:
 * ```tsx
 * <HeroTitleWithGlobe
 *   pointCount={1500}
 *   radius={3}
 *   opacity={0.2}
 *   color="#3b82f6"
 * >
 *   <h1>Your Title</h1>
 * </HeroTitleWithGlobe>
 * ```
 * 
 * HOW TO CUSTOMIZE:
 * 
 * 1. Globe Props (passed to DottedGlobe):
 *    - pointCount: Number of dots (default: responsive)
 *    - radius: Globe size (default: 2.5)
 *    - pointSize: Size of each dot (default: 0.02)
 *    - color: Dot color (default: "#ffffff")
 *    - opacity: Globe opacity (default: 0.3)
 *    - rotationSpeed: Rotation speed (default: 0.3)
 * 
 * 2. Container Styling:
 *    - Edit className prop to change container styles
 *    - Default: "relative flex items-center justify-center min-h-[400px] py-20"
 *    - Adjust min-height, padding, or add custom styles
 * 
 * 3. Globe Positioning:
 *    - Globe is absolutely positioned with inset-0
 *    - Edit the Canvas wrapper div className if needed
 *    - Currently: "absolute inset-0 pointer-events-none"
 * 
 * 4. Content Positioning:
 *    - Content wrapper has z-10 to stay above globe
 *    - Edit contentClassName to change content styling
 *    - Default: "relative z-10 text-center"
 * 
 * HOW TO DISABLE/REMOVE:
 * 
 * Option 1: Remove globe, keep wrapper
 *   - Set showGlobe={false} prop
 * 
 * Option 2: Remove component entirely
 *   - Replace with regular div/section
 *   - Keep your title/content as-is
 * 
 * Option 3: Conditional rendering
 *   - Use state or prop to conditionally show/hide
 * 
 * ============================================================================
 */

"use client"

import * as React from "react"
import dynamic from "next/dynamic"

// Dynamically import the globe to avoid SSR issues
const DottedGlobe = dynamic(
  () => import("./dotted-globe").then((mod) => ({ default: mod.DottedGlobe })),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" />
    ),
  }
)

interface HeroTitleWithGlobeProps {
  children: React.ReactNode
  id?: string
  className?: string
  contentClassName?: string
  showGlobe?: boolean
  // Globe customization props
  pointCount?: number
  radius?: number
  pointSize?: number
  color?: string
  opacity?: number
  rotationSpeed?: number
}

/**
 * Wrapper component that places a dotted globe behind centered content
 */
export function HeroTitleWithGlobe({
  children,
  id,
  className = "relative flex items-center justify-center min-h-[400px] py-20",
  contentClassName = "relative z-10 text-center",
  showGlobe = true,
  pointCount,
  radius = 2,
  pointSize = 0.02,
  color = "#ffffff",
  opacity = 0.2,
  rotationSpeed = 0.06,
}: HeroTitleWithGlobeProps) {
  return (
    <section id={id} className={className}>
      {/* Globe background - absolutely positioned behind content */}
      {showGlobe && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <DottedGlobe
            pointCount={pointCount}
            radius={radius}
            pointSize={pointSize}
            color={color}
            opacity={opacity}
            rotationSpeed={rotationSpeed}
          />
        </div>
      )}

      {/* Content - positioned above globe with z-10 */}
      <div className={contentClassName}>{children}</div>
    </section>
  )
}

