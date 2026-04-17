/**
 * ============================================================================
 * PROJECTS METRIC COMPONENT
 * ============================================================================
 * 
 * DEVELOPER EDIT NOTES:
 * 
 * This component displays the projects completed metric.
 * 
 * WHERE TO EDIT:
 * 
 * 1. Change the title:
 *    - Edit `title` prop (line ~45) - currently "Projects delivered in production"
 *    - Example: "Projects completed", "Delivered projects"
 * 
 * 2. Change the number:
 *    - Edit `value` prop (line ~46) - currently "50+"
 *    - Example: "25+", "100+", "30+"
 * 
 * 3. Change bullet points:
 *    - Edit the `bullets` array prop (line ~47)
 *    - Each string becomes one animated bullet line
 *    - Current: ["Web apps & platforms", "Client & internal products", "Shipped, optimized, maintained"]
 *    - Example: ["Custom line 1", "Custom line 2", "Custom line 3"]
 *    - To remove bullets: pass empty array or remove bullets prop
 * 
 * ============================================================================
 */

"use client"

import * as React from "react"
import { MetricCard } from "./metric-card"

export function ProjectsMetric() {
  return (
    <MetricCard
      title="Projects delivered in production:"
      value="50+"
      bullets={[
        "Web projects & platforms",
        "Client & internal products",
        "Shipped, optimized, maintained",
        "Modern UI/UX best practices",
        "Collaborative team delivery",
        "Agile & rapid iteration cycles",
      ]}
    />
  )
}

 