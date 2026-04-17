/**
 * ============================================================================
 * EXPERIENCE METRIC COMPONENT
 * ============================================================================
 * 
 * DEVELOPER EDIT NOTES:
 * 
 * This component displays the years of experience metric.
 * 
 * WHERE TO EDIT:
 * 
 * 1. Change the title:
 *    - Edit `title` prop (line ~45) - currently "Years of professional experience"
 *    - Example: "Professional experience", "Years in development"
 * 
 * 2. Change the number:
 *    - Edit `value` prop (line ~46) - currently "6+"
 *    - Example: "5+", "10+", "3+"
 * 
 * 3. Change bullet points:
 *    - Edit the `bullets` array prop (line ~47)
 *    - Each string becomes one animated bullet line
 *    - Current: ["Frontend-focused development", "Real production environments", "Long-term client work"]
 *    - Example: ["Custom line 1", "Custom line 2", "Custom line 3"]
 *    - To remove bullets: pass empty array or remove bullets prop
 * 
 * ============================================================================
 */

"use client"

import * as React from "react"
import { MetricCard } from "./metric-card"

export function ExperienceMetric() {
  return (
    <MetricCard
      title="Years of professional experience:"
      value="6+"
      bullets={[
        "Frontend-focused development",
        "Real production environments",
        "Long-term client work",
        "Continuous learning and upskilling",
        "Agile methodologies experience",
        "Experience with working in remote settings with international clients",
      ]}
    />
  )
}

