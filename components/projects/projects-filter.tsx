"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// ============================================================================
// FILTER TYPES
// ============================================================================

export type ProjectCategory = "all" | "creative" | "real-estate" | "corporate"
export type ProjectTech = "wordpress" | "react" | "nextjs" | "php"

export interface FilterState {
  category: ProjectCategory
  tech: ProjectTech | null
}

interface ProjectsFilterProps {
  filter: FilterState
  onChange: (filter: FilterState) => void
}

// ============================================================================
// FILTER DATA
// ============================================================================

const CATEGORY_TABS: { value: ProjectCategory; label: string }[] = [
  { value: "all", label: "All" },
  { value: "creative", label: "Creative" },
  { value: "real-estate", label: "Real Estate" },
  { value: "corporate", label: "Corporate" },
]

const TECH_CHIPS: { value: ProjectTech; label: string }[] = [
  { value: "wordpress", label: "WordPress" },
  { value: "react", label: "React" },
  { value: "nextjs", label: "Next.js" },
  { value: "php", label: "PHP" },
]

// ============================================================================
// PROJECTS FILTER COMPONENT
// ============================================================================

export function ProjectsFilter({ filter, onChange }: ProjectsFilterProps) {
  const handleCategoryChange = (category: ProjectCategory) => {
    onChange({ ...filter, category })
  }

  const handleTechToggle = (tech: ProjectTech) => {
    onChange({ ...filter, tech: filter.tech === tech ? null : tech })
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Category tabs */}
      <div
        role="group"
        aria-label="Filter by category"
        className="flex flex-wrap gap-2"
      >
        {CATEGORY_TABS.map(({ value, label }) => {
          const isActive = filter.category === value
          return (
            <button
              key={value}
              type="button"
              aria-pressed={isActive}
              onClick={() => handleCategoryChange(value)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "border-white/40 bg-white/10 text-foreground"
                  : "border-white/10 bg-transparent text-muted-foreground hover:border-white/20 hover:text-foreground"
              )}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* Tech chips */}
      <div
        role="group"
        aria-label="Filter by technology"
        className="flex flex-wrap gap-2"
      >
        {TECH_CHIPS.map(({ value, label }) => {
          const isActive = filter.tech === value
          return (
            <button
              key={value}
              type="button"
              aria-pressed={isActive}
              onClick={() => handleTechToggle(value)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200",
                isActive
                  ? "border-white/30 bg-white/10 text-foreground"
                  : "border-white/10 bg-transparent text-muted-foreground hover:border-white/20 hover:text-foreground"
              )}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
