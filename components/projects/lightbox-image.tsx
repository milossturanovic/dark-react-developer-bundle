"use client"

/**
 * LightboxImage
 *
 * Drop-in replacement for a plain <Image> block.
 * - Shows a hover overlay with an expand icon to signal the image is clickable.
 * - Opens a full-screen lightbox when clicked.
 * - Closes on ESC key or clicking the backdrop / close button.
 * - Locks body scroll while open.
 * - Uses ReactDOM.createPortal so z-index is never an issue.
 *
 * Props:
 *   src            — image source (path or data URI)
 *   alt            — descriptive alt text (required)
 *   sizes          — Next.js Image sizes hint
 *   priority       — set true for above-the-fold images
 *   containerClassName — extra classes applied to the button wrapper
 *   imageClassName     — extra classes applied to the Next.js Image
 */

import * as React from "react"
import ReactDOM from "react-dom"
import Image from "next/image"
import { Expand, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface LightboxImageProps {
  src: string
  alt: string
  sizes?: string
  priority?: boolean
  containerClassName?: string
  imageClassName?: string
}

export function LightboxImage({
  src,
  alt,
  sizes,
  priority,
  containerClassName,
  imageClassName,
}: LightboxImageProps) {
  const [open, setOpen] = React.useState(false)

  // ESC key closes lightbox
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  // Lock body scroll while lightbox is open
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  const lightbox =
    open && typeof document !== "undefined"
      ? ReactDOM.createPortal(
          /* Backdrop */
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            {/* Close button */}
            <button
              type="button"
              aria-label="Close lightbox"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Image panel — stop propagation so clicking the image doesn't close */}
            <div
              className="relative mx-4 w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
              {alt && (
                <p className="mt-3 text-center text-xs text-white/40">{alt}</p>
              )}
            </div>
          </div>,
          document.body
        )
      : null

  return (
    <>
      {/* Trigger — button wrapping the image so it's keyboard-accessible */}
      <button
        type="button"
        aria-label={`View ${alt} fullscreen`}
        onClick={() => setOpen(true)}
        className={cn(
          "group relative block w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
          containerClassName
        )}
      >
        {/* The image */}
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={cn("object-cover", imageClassName)}
          />
        </div>

        {/* Hover overlay — dark tint + centered expand icon */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center transition-all duration-200 group-hover:bg-black/30">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
            <Expand className="h-4 w-4 text-white" />
          </span>
        </div>
      </button>

      {lightbox}
    </>
  )
}
