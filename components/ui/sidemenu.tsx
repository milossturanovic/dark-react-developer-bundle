"use client"

import * as React from "react"
import ReactDOM from "react-dom"
import { cn } from "@/lib/utils"

interface SidemenuContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const SidemenuContext = React.createContext<SidemenuContextValue | undefined>(undefined)

function useSidemenu() {
  const context = React.useContext(SidemenuContext)
  if (!context) {
    throw new Error("Sidemenu components must be used within a Sidemenu")
  }
  return context
}

interface SidemenuProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

const Sidemenu = ({ open: controlledOpen, onOpenChange, children }: SidemenuProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)

  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen
  const handleOpenChange = onOpenChange || setUncontrolledOpen

  return (
    <SidemenuContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      {children}
    </SidemenuContext.Provider>
  )
}

interface SidemenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const SidemenuTrigger = React.forwardRef<HTMLButtonElement, SidemenuTriggerProps>(
  ({ className, onClick, asChild, children, ...props }, ref) => {
    const { onOpenChange } = useSidemenu()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      onOpenChange(true)
    }

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        className: cn(children.props.className, className),
        onClick: handleClick,
      } as any)
    }

    return (
      <button
        ref={ref}
        className={className}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    )
  }
)
SidemenuTrigger.displayName = "SidemenuTrigger"

const SIDEMENU_DURATION_DEFAULT = 300

interface SidemenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "right" | "bottom" | "left"
  /** Duration in ms for enter/exit animation */
  duration?: number
}

const sidePositionClasses = {
  right: "top-0 right-0 bottom-0 h-full w-3/4 sm:max-w-sm",
  left: "top-0 left-0 bottom-0 h-full w-3/4 sm:max-w-sm",
  top: "top-0 left-0 right-0 w-full",
  bottom: "bottom-0 left-0 right-0 w-full",
}

function getTranslateClass(side: "top" | "right" | "bottom" | "left", isExiting: boolean, isEntered: boolean) {
  if (side === "right") return isExiting || !isEntered ? "translate-x-full" : "translate-x-0"
  if (side === "left") return isExiting || !isEntered ? "-translate-x-full" : "translate-x-0"
  if (side === "top") return isExiting || !isEntered ? "-translate-y-full" : "translate-y-0"
  return isExiting || !isEntered ? "translate-y-full" : "translate-y-0"
}

// Phase-based state machine — avoids the unmount-before-exit race condition
type SidemenuPhase = "closed" | "entering" | "open" | "exiting"

const SidemenuContent = React.forwardRef<HTMLDivElement, SidemenuContentProps>(
  ({ side = "right", duration = SIDEMENU_DURATION_DEFAULT, className, children, ...props }, ref) => {
    const { open, onOpenChange } = useSidemenu()
    const [phase, setPhase] = React.useState<SidemenuPhase>(open ? "open" : "closed")

    React.useEffect(() => {
      if (open) {
        document.body.style.overflow = "hidden"
        if (phase === "closed" || phase === "exiting") {
          setPhase("entering")
          const raf = requestAnimationFrame(() => {
            requestAnimationFrame(() => setPhase("open"))
          })
          return () => cancelAnimationFrame(raf)
        }
      } else {
        document.body.style.overflow = ""
        if (phase === "open" || phase === "entering") {
          setPhase("exiting")
          const t = setTimeout(() => setPhase("closed"), duration)
          return () => clearTimeout(t)
        }
      }
    }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

    const show = phase !== "closed"
    const isEntered = phase === "open"
    const isExiting = phase === "exiting"

    if (!show) return null

    const durationMs = `${duration}ms`
    const overlayOpacity = isExiting ? "opacity-0" : isEntered ? "opacity-100" : "opacity-0"

    const easing = "cubic-bezier(0.32, 0.72, 0, 1)"

    const overlayStyle: React.CSSProperties = {
      transition: `opacity ${durationMs} ${easing}`,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      backdropFilter: "blur(4px)",
    }
    const panelStyle: React.CSSProperties = {
      transition: `transform ${durationMs} ${easing}`,
      backgroundColor: "hsl(var(--background))",
    }

    const content = (
      <>
        <div
          className={cn("sidemenu-overlay", overlayOpacity)}
          style={overlayStyle}
          onClick={() => onOpenChange(false)}
          aria-hidden
        />
        <div
          ref={ref}
          className={cn(
            "sidemenu-panel",
            sidePositionClasses[side],
            getTranslateClass(side, isExiting, isEntered),
            className
          )}
          style={panelStyle}
          {...props}
        >
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span className="sr-only">Close</span>
          </button>
          {children}
        </div>
      </>
    )

    return typeof document !== "undefined"
      ? ReactDOM.createPortal(content, document.body)
      : content
  }
)
SidemenuContent.displayName = "SidemenuContent"

const SidemenuHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
    {...props}
  />
)
SidemenuHeader.displayName = "SidemenuHeader"

const SidemenuTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))
SidemenuTitle.displayName = "SidemenuTitle"

const SidemenuDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SidemenuDescription.displayName = "SidemenuDescription"

export {
  Sidemenu,
  SidemenuTrigger,
  SidemenuContent,
  SidemenuHeader,
  SidemenuTitle,
  SidemenuDescription,
}
