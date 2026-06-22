/**
 * ============================================================================
 * CONTACT SECTION COMPONENT
 * ============================================================================
 *
 * WHAT THIS IS:
 * The main content for the /contact page. Renders a two-column layout with
 * contact information on the left and an inquiry form on the right.
 *
 * DEVELOPER EDIT NOTES:
 *
 * 1. CONTACT DETAILS:
 *    - Edit name, email, location, and social links in config/site.ts
 *    - Edit AVAILABILITY_ITEMS below to change what you're open to.
 *
 * 2. FORM FIELDS:
 *    - The form renders 3 fields: Full name, Email, Message.
 *    - To add fields, add new <div> blocks inside the form.
 *    - To change labels/placeholders, edit the JSX directly.
 *
 * 3. FORM SUBMISSION:
 *    - This is currently UI-only — no backend submission logic.
 *    - To wire it up, replace the handleSubmit function with your API call
 *      (e.g. fetch to /api/contact, or an email service like Resend/SendGrid).
 *
 * 4. LAYOUT:
 *    - Desktop: two-column grid (info left, form right) with vertical divider.
 *    - Mobile: stacked, info above form.
 *    - To change column proportions, edit grid-cols in the grid wrapper.
 *
 * ============================================================================
 */

"use client"

import * as React from "react"
import { Github, Linkedin, Mail, MapPin, Send, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AnimatedSectionTitle } from "@/components/motion/animated-section-title"
import { siteConfig } from "@/config/site"

// ============================================================================
// EDITABLE CONTENT — update availability and note below; name/email/links in config/site.ts
// ============================================================================

/** What you're currently open to — renders as a checked list. */
const AVAILABILITY_ITEMS = [
  "Open to freelance projects",
  "Open to long-term collaborations",
  "Open to employment",
]

const CONTACT_NOTE =
  "Best for web development, UI implementation, WordPress builds, and optimization work."

const SOCIAL_LINKS = [
  { label: "GitHub", href: siteConfig.links.github, icon: Github },
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: Linkedin },
]

// ============================================================================
// INFO GROUP — small reusable label + content block
// ============================================================================

function InfoGroup({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/80">
        {label}
      </h3>
      <div className="text-sm text-foreground/80">{children}</div>
    </div>
  )
}

// ============================================================================
// CONTACT SECTION
// ============================================================================

export function ContactSection() {
  const [submitted, setSubmitted] = React.useState(false)

  /**
   * UI-only submit handler.
   * Replace the body of this function with your actual API call.
   */
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // TODO: wire up to backend (e.g. fetch("/api/contact", { ... }))
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4">

        {/* Header */}
        <div className="mb-16">
          <AnimatedSectionTitle className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Contact
          </AnimatedSectionTitle>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Have a project in mind or need development support? Let&rsquo;s start
            the conversation.
          </p>
        </div>

        {/* Two-column grid */}
        <div className="grid gap-12 md:grid-cols-[0.85fr_1px_1.15fr] md:gap-0">

          {/* ── LEFT COLUMN: Contact info ─────────────────────────── */}
          <div className="flex flex-col gap-8 md:pr-12">

            {/* Location */}
            <InfoGroup label="Based in">
              <span className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground/60" />
                {siteConfig.contact.location}
              </span>
            </InfoGroup>

            {/* Email */}
            <InfoGroup label="Email">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-foreground/80 transition-colors hover:text-foreground"
              >
                {siteConfig.contact.email}
              </a>
            </InfoGroup>

            {/* Availability */}
            <InfoGroup label="Availability">
              <ul className="flex flex-col gap-2">
                {AVAILABILITY_ITEMS.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-foreground/70">
                    <Check className="h-3.5 w-3.5 text-foreground/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </InfoGroup>

            {/* Social links */}
            <InfoGroup label="Follow">
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((link) => {
                  const Icon = link.icon
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="flex items-center gap-2 text-sm text-foreground/60 transition-colors hover:text-foreground"
                    >
                      <Icon className="h-4 w-4" />
                      {link.label}
                    </a>
                  )
                })}
              </div>
            </InfoGroup>

            {/* Extra note */}
            <p className="max-w-xs text-xs leading-relaxed text-muted-foreground/60">
              {CONTACT_NOTE}
            </p>
          </div>

          {/* ── VERTICAL DIVIDER (desktop only) ───────────────────── */}
          <div className="hidden md:block w-px bg-white/10" />

          {/* ── RIGHT COLUMN: Inquiry form ─────────────────────────── */}
          <div className="md:pl-12">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

              {/* Full name — edit label and placeholder here */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-foreground/70">
                  Full name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                  autoComplete="name"
                />
              </div>

              {/* Email — edit label and placeholder here */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-foreground/70">
                  Email address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  autoComplete="email"
                />
              </div>

              {/* Message — edit label and placeholder here */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="message" className="text-foreground/70">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project, timeline, and goals..."
                  rows={6}
                  required
                />
              </div>

              {/* Submit */}
              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  disabled={submitted}
                  className="flex items-center gap-2"
                >
                  {submitted ? (
                    <>
                      <Check className="h-4 w-4" />
                      Sent
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
