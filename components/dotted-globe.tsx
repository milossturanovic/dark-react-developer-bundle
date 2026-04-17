/**
 * ============================================================================
 * DOTTED ROTATING GLOBE COMPONENT
 * ============================================================================
 * 
 * DEVELOPER NOTES:
 * 
 * This component creates a minimalist rotating globe made of dots (point cloud)
 * using Three.js and React Three Fiber. It's designed to be placed behind hero
 * titles or section headers as a subtle background element.
 * 
 * WHERE IT'S USED:
 * - Hero sections with large titles
 * - Section headers that need visual interest
 * - Background decoration behind centered content
 * 
 * HOW TO CUSTOMIZE:
 * 
 * 1. Point Count:
 *    - Edit `pointCount` prop (default: 2000 on desktop, 800 on mobile)
 *    - More points = denser globe but slower performance
 *    - Fewer points = faster but less detailed
 * 
 * 2. Globe Size:
 *    - Edit `radius` prop (default: 2.5)
 *    - Larger = more prominent, smaller = more subtle
 * 
 * 3. Dot Size:
 *    - Edit `pointSize` prop (default: 0.02)
 *    - Larger dots = more visible, smaller = more subtle
 * 
 * 4. Color:
 *    - Edit `color` prop (default: "#ffffff" - white)
 *    - Use hex colors or CSS color names
 *    - Opacity is controlled separately via `opacity` prop
 * 
 * 5. Rotation Speed:
 *    - Edit `rotationSpeed` prop (default: 0.3)
 *    - Higher = faster rotation, lower = slower
 *    - Set to 0 to disable rotation
 * 
 * 6. Opacity:
 *    - Edit `opacity` prop (default: 0.3)
 *    - Range: 0 (invisible) to 1 (fully opaque)
 *    - Lower opacity = more subtle background
 * 
 * HOW TO DISABLE/REMOVE:
 * 
 * Option 1: Remove the component from parent
 *   - Simply delete or comment out <DottedGlobe /> usage
 * 
 * Option 2: Hide with CSS
 *   - Add `hidden` class or `display: none` to wrapper
 * 
 * Option 3: Conditional rendering
 *   - Use a prop or state to conditionally render
 *   - Example: {showGlobe && <DottedGlobe />}
 * 
 * REQUIRED DEPENDENCIES:
 * - three (Three.js core library)
 * - @react-three/fiber (React renderer for Three.js)
 * - @react-three/drei (Helper utilities for R3F)
 * 
 * INSTALLATION:
 * npm install three @react-three/fiber @react-three/drei
 * 
 * PERFORMANCE NOTES:
 * - Uses BufferGeometry for efficient rendering
 * - Responsive point count (fewer on mobile)
 * - Device pixel ratio capped for performance
 * - Respects prefers-reduced-motion
 * - Canvas has pointer-events-none to avoid interaction
 * 
 * ============================================================================
 * DOCS ROADMAP NOTES (for future documentation PDF)
 * ============================================================================
 * 
 * The documentation should cover:
 * 
 * 1. WHY R3F IS USED
 *    - React Three Fiber provides React-like component API for Three.js
 *    - Easier to integrate with React/Next.js than raw Three.js
 *    - Automatic cleanup and lifecycle management
 *    - Better TypeScript support
 * 
 * 2. WHERE THE GLOBE IS MOUNTED
 *    - Canvas is absolutely positioned behind content
 *    - Uses pointer-events-none to not interfere with interactions
 *    - Centered using flexbox/absolute positioning
 *    - Responsive sizing based on viewport
 * 
 * 3. HOW TO TWEAK PERFORMANCE ON LOW-END DEVICES
 *    - Reduce pointCount prop (e.g., 500-800 points)
 *    - Lower devicePixelRatio cap (dpr={[1, 1]} instead of [1, 1.5])
 *    - Reduce pointSize for less GPU load
 *    - Consider disabling on mobile entirely
 *    - Use React.memo to prevent unnecessary re-renders
 * 
 * 4. WHERE TO EDIT COLORS TO MATCH BRANDING
 *    - Edit `color` prop in dotted-globe.tsx
 *    - Can use theme colors from Tailwind config
 *    - Opacity can be adjusted for subtlety
 *    - Consider using CSS variables for dynamic theming
 * 
 * 5. DEPLOYMENT NOTES (VERCEL)
 *    - No special configuration needed
 *    - Three.js works out of the box on Vercel
 *    - Ensure all dependencies are in package.json
 *    - Build should complete without issues
 *    - If issues occur, check Next.js config for webpack settings
 * 
 * ============================================================================
 */

"use client"

import * as React from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

/**
 * Generates points on a sphere using Fibonacci sphere distribution
 * This creates an even distribution of points across the sphere surface
 */
function generateSpherePoints(count: number, radius: number): Float32Array {
  const points = new Float32Array(count * 3)
  const goldenAngle = Math.PI * (3 - Math.sqrt(5)) // Golden angle in radians

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2 // y goes from 1 to -1
    const radiusAtY = Math.sqrt(1 - y * y) // radius at y
    const theta = goldenAngle * i // golden angle increment

    const x = Math.cos(theta) * radiusAtY
    const z = Math.sin(theta) * radiusAtY

    points[i * 3] = x * radius
    points[i * 3 + 1] = y * radius
    points[i * 3 + 2] = z * radius
  }

  return points
}

interface DottedGlobeProps {
  pointCount?: number
  radius?: number
  pointSize?: number
  color?: string
  opacity?: number
  rotationSpeed?: number
}

/**
 * The actual globe mesh component that renders inside the Canvas
 */
function GlobeMesh({
  pointCount = 2000,
  radius = 2.5,
  pointSize = 0.02,
  color = "#ffffff",
  opacity = 0.3,
  rotationSpeed = 0.3,
}: DottedGlobeProps) {
  const meshRef = React.useRef<THREE.Points>(null)
  const [reducedMotion, setReducedMotion] = React.useState(false)

  // Check for prefers-reduced-motion
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Generate geometry once
  const geometry = React.useMemo(() => {
    const points = generateSpherePoints(pointCount, radius)
    const geom = new THREE.BufferGeometry()
    geom.setAttribute("position", new THREE.BufferAttribute(points, 3))
    return geom
  }, [pointCount, radius])

  // Material for points
  const material = React.useMemo(
    () =>
      new THREE.PointsMaterial({
        size: pointSize,
        color: color,
        transparent: true,
        opacity: opacity,
        sizeAttenuation: true,
      }),
    [pointSize, color, opacity]
  )

  // Rotate on Y axis
  useFrame((_, delta) => {
    if (meshRef.current && !reducedMotion) {
      meshRef.current.rotation.y += rotationSpeed * delta
    }
  })

  return <points ref={meshRef} geometry={geometry} material={material} />
}

/**
 * Main DottedGlobe component
 * Wraps the Canvas and handles responsive point count
 */
export function DottedGlobe({
  pointCount,
  radius = 2.5,
  pointSize = 0.02,
  color = "#ffffff",
  opacity = 0.3,
  rotationSpeed = 0.3,
}: DottedGlobeProps) {
  const [isMobile, setIsMobile] = React.useState(false)

  // Detect mobile for performance optimization
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Responsive point count
  const finalPointCount = pointCount ?? (isMobile ? 800 : 2000)

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 1.5]} // Cap device pixel ratio for performance
      className="pointer-events-none"
      aria-hidden="true"
    >
      <ambientLight intensity={0.5} />
      <GlobeMesh
        pointCount={finalPointCount}
        radius={radius}
        pointSize={pointSize}
        color={color}
        opacity={opacity}
        rotationSpeed={rotationSpeed}
      />
    </Canvas>
  )
}

