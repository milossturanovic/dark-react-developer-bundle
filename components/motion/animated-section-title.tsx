"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"

interface AnimatedSectionTitleProps {
  children: React.ReactNode
  className?: string
  as?: "h2" | "h3"
  direction?: "up" | "down" | "left" | "right"
  duration?: number
  delay?: number
  offset?: number
  blur?: number
  rootMargin?: string
}

const directionOffset = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
}

/**
 * Section title (h2/h3) with scroll-triggered fade + slide animation.
 * Uses Framer Motion's whileInView so titles always appear when scrolled into view.
 * Respects prefers-reduced-motion (no animation, title visible immediately).
 */
export function AnimatedSectionTitle({
  children,
  className,
  as: Tag = "h2",
  direction = "up",
  duration = 0.5,
  delay = 0,
  offset = 24,
  blur = 0,
  rootMargin = "-50px 0px -50px 0px",
}: AnimatedSectionTitleProps) {
  const shouldReduceMotion = useReducedMotion()

  const { x: xOffset, y: yOffset } = directionOffset[direction]
  const x = xOffset !== 0 ? (direction === "left" ? offset : -offset) : 0
  const y = yOffset !== 0 ? (direction === "up" ? offset : -offset) : 0

  const MotionHeading = Tag === "h3" ? motion.h3 : motion.h2

  if (shouldReduceMotion) {
    return <MotionHeading className={className}>{children}</MotionHeading>
  }

  return (
    <MotionHeading
      initial={{
        opacity: 0,
        x,
        y,
        filter: blur ? `blur(${blur}px)` : "none",
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        filter: "blur(0px)",
        transition: {
          duration,
          delay,
          ease: "easeOut",
        },
      }}
      viewport={{ once: true, margin: rootMargin, amount: 0.1 }}
      className={className}
    >
      {children}
    </MotionHeading>
  )
}
