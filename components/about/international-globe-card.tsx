/**
 * ============================================================================
 * INTERNATIONAL GLOBE CARD COMPONENT
 * ============================================================================
 * 
 * DEVELOPER EDIT NOTES:
 * 
 * This component displays a rotating globe with highlighted countries
 * using the cobe library.
 * 
 * WHERE TO EDIT:
 * 
 * 1. Change title:
 *    - Edit `title` prop default (line ~85) or pass custom title
 *    - Current: "Worked with international clients"
 * 
 * 2. Change country pills:
 *    - Edit `COUNTRY_NAMES` array (line ~80)
 *    - Add/remove country names to match the highlighted countries on the globe
 *    - Countries must match the ones in cobe-globe.tsx COUNTRY_COORDS
 * 
 * 3. Change crop amount (bottom offset):
 *    - Edit `bottomOffset` constant (line ~71)
 *    - Current: -120px (more negative = more crop, less negative = less crop)
 *    - Example: -100px = less crop, -150px = more crop
 * 
 * 4. Card height:
 *    - Edit `cardHeight` constant (line ~74)
 *    - Current: 320px
 *    - Adjust to fit your design
 * 
 * 5. Globe container size:
 *    - Edit `globeContainerHeight` constant (line ~78)
 *    - Current: 360px
 *    - Should be larger than card height to allow cropping
 * 
 * ============================================================================
 */

"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

// Dynamically import the cobe globe to avoid SSR issues
const CobeGlobe = dynamic(
  () => import("./cobe-globe").then((mod) => ({ default: mod.CobeGlobe })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-32 w-32 rounded-full border border-border/40 bg-muted/20" />
      </div>
    ),
  }
)

interface InternationalGlobeCardProps {
  title?: string
  className?: string
}

// ============================================================================
// EDITABLE CONFIGURATION
// ============================================================================

// Crop amount (bottom offset) - EDIT THIS
// More negative = more of the globe is cropped (shows less)
// Less negative = less crop (shows more)
const bottomOffset = -120 // pixels

// Card height - EDIT THIS
const cardHeight = 320 // pixels

// Globe container height - EDIT THIS
// Should be larger than card height to allow cropping
const globeContainerHeight = 360 // pixels

// Country names for pills - EDIT THIS ARRAY
const COUNTRY_NAMES = [
  "United States",
  "Lithuania",
  "Slovenia",
  "Montenegro",
]

// ============================================================================
// INTERNATIONAL GLOBE CARD COMPONENT
// ============================================================================

export function InternationalGlobeCard({
  title = "Worked with international clients",
  className,
}: InternationalGlobeCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/50 bg-background p-6",
        className
      )}
      style={{ height: `${cardHeight}px`, transformStyle: "preserve-3d" }}
    >
      {/* Title and Country Pills - Positioned in top-left */}
      <div className="absolute top-8 left-8 right-8 z-10 max-w-xs">
        {/* Title - Left-aligned */}
        <h3 className="text-2xl font-semibold text-foreground/80 sm:text-3xl">
          {title}
        </h3>

        {/* Country Pills */}
        <div className="mt-3 flex flex-wrap gap-2">
          {COUNTRY_NAMES.map((country) => (
            <Badge
              key={country}
              variant="secondary"
              className="rounded-full border border-white/10 bg-muted/100 text-xs text-muted-foreground"
            >
              {country}
            </Badge>
          ))}
        </div>
      </div>

      {/* Globe Container - Positioned to show only top hemisphere */}
      <div
        className="relative w-full"
        style={{
          height: `${globeContainerHeight}px`,
          position: "absolute",
          bottom: `${bottomOffset}px`,
          left: 0,
          right: 0,
        }}
        aria-hidden="true"
      >
        <CobeGlobe
          width={400}
          height={globeContainerHeight}
          className="mx-auto"
        />
      </div>
    </div>
  )
}
