/**
 * ============================================================================
 * COBE GLOBE COMPONENT
 * ============================================================================
 * 
 * DEVELOPER EDIT NOTES:
 * 
 * This component renders a minimalist rotating globe using the cobe library.
 * 
 * WHERE TO EDIT:
 * 
 * 1. Rotation Speed:
 *    - Edit `ROTATION_SPEED` constant (line ~50)
 *    - Current: 0.005 (slower = smaller number, faster = larger number)
 *    - Example: 0.002 = very slow, 0.01 = faster
 * 
 * 2. Marker Size:
 *    - Edit `MARKER_SIZE` in `COUNTRY_MARKERS` array (line ~80)
 *    - Current: 0.08 (smaller = smaller number, larger = larger number)
 *    - Example: 0.05 = small, 0.15 = large
 * 
 * 3. Marker Color:
 *    - Edit `markerColor` in `GLOBE_CONFIG` (line ~60)
 *    - Format: [R, G, B] where values are 0-1
 *    - Current: [251/255, 100/255, 21/255] (orange)
 *    - Example: [1, 0, 0] = red, [0, 0, 1] = blue
 * 
 * 4. Add/Remove Countries:
 *    - Edit `COUNTRY_COORDS` object (line ~70)
 *    - Add entries: { "Country Name": { lat: ..., lon: ... } }
 *    - Find coordinates at: https://www.latlong.net/
 *    - Markers are automatically generated from this object
 * 
 * 5. Globe Size:
 *    - Globe size is controlled by container width
 *    - Canvas automatically scales to container
 * 
 * 6. Crop Amount (Bottom Offset):
 *    - This is controlled in the parent card component
 *    - Edit `bottomOffset` in international-globe-card.tsx
 * 
 * ============================================================================
 */

"use client"

import * as React from "react"
import { useEffect, useRef } from "react"
import createGlobe, { COBEOptions } from "cobe"
import { cn } from "@/lib/utils"

// ============================================================================
// EDITABLE CONFIGURATION
// ============================================================================

// Rotation speed - EDIT THIS
const ROTATION_SPEED = 0.005

// Marker size - EDIT THIS (applied to all markers)
const MARKER_SIZE = 0.12 // Increased for better visibility

// Country coordinates - ADD MORE COUNTRIES HERE
// Format: { "Country Name": { lat: latitude, lon: longitude } }
const COUNTRY_COORDS: Record<string, { lat: number; lon: number }> = {
  "United States": { lat: 38.0, lon: -97.0 },
  Lithuania: { lat: 55.2, lon: 23.9 },
  Slovenia: { lat: 46.1, lon: 14.9 },
  Montenegro: { lat: 42.7, lon: 19.3 },
}

// Generate markers from country coordinates
// cobe uses [lat, lon] format directly (not normalized)
const COUNTRY_MARKERS = Object.entries(COUNTRY_COORDS).map(([country, coords]) => {
  return {
    location: [coords.lat, coords.lon] as [number, number],
    size: MARKER_SIZE,
  }
})

// Globe configuration
const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1, // Dark theme
  diffuse: 1,
  mapSamples: 16000,
  mapBrightness: 1.0, // Increased for whiter dots
  baseColor: [1, 1, 1], // White base color for whiter dots
  markerColor: [251 / 255, 100 / 255, 21 / 255], // Orange color
  glowColor: [0.2, 0.2, 0.2], // Subtle glow for dark theme
  markers: COUNTRY_MARKERS,
}

// ============================================================================
// COBE GLOBE COMPONENT
// ============================================================================

interface CobeGlobeProps {
  className?: string
  width?: number
  height?: number
}

export function CobeGlobe({ className, width, height }: CobeGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null)
  const phiRef = useRef(0)

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const containerWidth = width || canvas.offsetWidth || 400
    const containerHeight = height || canvas.offsetHeight || 400

    // Initialize cobe globe
    const globe = createGlobe(canvas, {
      ...GLOBE_CONFIG,
      width: containerWidth * 2,
      height: containerHeight * 2,
      onRender: (state) => {
        if (!prefersReducedMotion) {
          phiRef.current += ROTATION_SPEED
        }
        state.phi = phiRef.current
        state.width = containerWidth * 2
        state.height = containerHeight * 2
      },
    })

    globeRef.current = globe

    // Fade in
    setTimeout(() => {
      if (canvas) {
        canvas.style.opacity = "1"
      }
    }, 0)

    // Cleanup
    return () => {
      globe.destroy()
      globeRef.current = null
    }
  }, [width, height, prefersReducedMotion])

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "size-full opacity-0 transition-opacity duration-500",
        className
      )}
      style={{
        width: width || "100%",
        height: height || "100%",
      }}
    />
  )
}

