/**
 * ============================================================================
 * SERVICE CARD COMPONENT
 * ============================================================================
 * 
 * DEVELOPER EDIT NOTES:
 * 
 * This is a reusable service card component for the Services section.
 * 
 * WHERE TO CUSTOMIZE:
 * 
 * 1. Card Styling:
 *    - Border: Edit `border-border/60` (line ~60)
 *    - Background gradient: Edit `bg-gradient-to-b` classes (line ~60)
 *    - Padding: Edit `p-6` or `p-8` (line ~60)
 *    - Hover lift: Edit `hover:-translate-y-1` (line ~60)
 * 
 * 2. Icon Styling:
 *    - Icon size: Edit `size-8` (line ~70)
 *    - Icon background: Edit `bg-primary/10` (line ~70)
 *    - Icon color: Edit `text-primary` (line ~70)
 * 
 * 3. Content Styling:
 *    - Title size: Edit `text-xl` (line ~75)
 *    - Description size: Edit `text-sm` (line ~80)
 *    - Bullet list size: Edit `text-sm` (line ~95)
 * 
 * ============================================================================
 */

"use client"

import * as React from "react"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  included: string[]
  className?: string
}

export function ServiceCard({
  icon: Icon,
  title,
  description,
  included,
  className,
}: ServiceCardProps) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/50 bg-gradient-to-b from-card/50 to-card p-6 transition-all hover:-translate-y-1 hover:border-white/50 hover:shadow-lg",
        className
      )}
    >
      {/* Icon */}
      <div className="mb-4 flex items-start">
        <div className="rounded-full bg-primary/10 p-3">
          <Icon className="size-6 text-primary" />
        </div>
      </div>

      {/* Title */}
      <h3 className="mb-3 text-xl font-semibold text-foreground">{title}</h3>

      {/* Description */}
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      {/* What's included */}
      <div className="mt-6">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Included:
        </p>
        <ul className="space-y-1.5">
          {included.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

