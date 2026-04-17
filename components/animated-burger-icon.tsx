"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface AnimatedBurgerIconProps {
  open: boolean
  className?: string
}

/**
 * Hamburger icon that animates to X when open.
 * Top and bottom bars rotate 45deg; middle bar fades out.
 */
export function AnimatedBurgerIcon({ open, className }: AnimatedBurgerIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("transition-transform duration-300", className)}
      aria-hidden
    >
      <line
        x1="4"
        y1="7"
        x2="20"
        y2="7"
        className={cn(
          "origin-center transition-all duration-300 ease-in-out",
          open && "translate-y-[5px] rotate-45"
        )}
      />
      <line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        className={cn(
          "transition-opacity duration-300 ease-in-out",
          open && "opacity-0"
        )}
      />
      <line
        x1="4"
        y1="17"
        x2="20"
        y2="17"
        className={cn(
          "origin-center transition-all duration-300 ease-in-out",
          open && "-translate-y-[5px] -rotate-45"
        )}
      />
    </svg>
  )
}
