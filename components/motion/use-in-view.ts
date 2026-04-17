"use client"

import { useEffect, useState } from "react"

interface UseInViewOptions {
  rootMargin?: string
  threshold?: number
  triggerOnce?: boolean
}

/**
 * Hook that detects when an element enters the viewport using IntersectionObserver.
 * Returns true when the element is in view (and stays true if triggerOnce is true).
 */
export function useInView(
  ref: React.RefObject<Element | null>,
  options: UseInViewOptions = {}
) {
  const { rootMargin = "0px", threshold = 0.1, triggerOnce = true } = options
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (triggerOnce && isInView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        } else if (!triggerOnce) {
          setIsInView(false)
        }
      },
      { rootMargin, threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, rootMargin, threshold, triggerOnce, isInView])

  return isInView
}
