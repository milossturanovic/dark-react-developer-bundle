# Customization Guide

A section-by-section walkthrough for personalizing the Dark React Developer Bundle.

## Table of contents

1. [Site configuration](#site-configuration)
2. [Hero section](#hero-section)
3. [Projects (the JSON content workflow)](#projects-the-json-content-workflow)
4. [About section](#about-section)
5. [Services section](#services-section)
6. [Contact page](#contact-page)
7. [Site footer](#site-footer)
8. [Navigation](#navigation)
9. [Colors & theme](#colors--theme)
10. [Typography](#typography)
11. [Adding a new top-level page](#adding-a-new-top-level-page)
12. [Tips for buyers](#tips-for-buyers)

---

## Site configuration

**File:** `config/site.ts`

This is the central configuration file for your portfolio.

```typescript
export const siteConfig = {
  name: "John Doe",
  shortName: "John",
  role: "Full Stack Developer",
  description: "Your custom description",
  url: "https://johndoe.dev",
  contact: {
    location: "United States",
    email: "john.doe@example.com",
  },
  navItems: [
    { title: "Home", href: "/" },
    { title: "Projects", href: "/projects" },
    { title: "Contact", href: "/contact" },
  ],
  links: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
    email: "mailto:john.doe@example.com",
  },
}
```

The same `siteConfig` is consumed by `components/site-navbar.tsx`, `components/ui/sidemenu.tsx`, `components/site-footer.tsx`, `components/sections/about-section.tsx` (name + role), `components/sections/contact-section.tsx` (location + email + social), and `app/layout.tsx` (page title + meta description).

---

## Hero section

**File:** `components/home-page-client.tsx`

This is a client component (because of the framer-motion title animation). The page entry point at `app/page.tsx` is a tiny server component that fetches featured projects and hands them to this file.

### Headline

Two arrays power the staggered word reveal:

```tsx
{["Creating", "unique", "websites"].map((word, i) => ( … ))}
{["tailored", "to", "your", "needs"].map((word, i) => ( … ))}
```

The second array is the gradient-highlighted half of the headline. Edit the words in either array.

### Subheadline & CTAs

Just below the headline:

```tsx
<p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
  Designing and creating digital, professional, innovative and modern solutions
  in the fields of web development.
</p>
```

The two CTA buttons (`Download Resume` and `Contact`) are right under it. Update their `href`s as needed.

### Feature badges

At the top of the file:

```tsx
const FEATURES_DATA = ["Web Development", "MERN Dev", "Mobile Dev"]
```

---

## Projects (the JSON content workflow)

All projects on the site (homepage strip, `/projects` list, `/projects/<slug>` detail pages) read from a single file:

**File:** `data/projects.json`

### The flow

1. Open `data/projects.json`.
2. Add / edit / reorder / remove entries in the `projects` array.
3. Save → `npm run dev` reloads → check the browser.
4. `git commit -am "Update portfolio"` and `git push`.
5. Vercel (or your host) redeploys automatically.

There is no admin panel, no database, no CMS.

### Schema (summary)

Required:

| Field         | Type                                                  | Example                                |
| ------------- | ----------------------------------------------------- | -------------------------------------- |
| `id`          | string                                                | `"1"`                                  |
| `slug`        | string (used in URL)                                  | `"creative-agency-website"`            |
| `title`       | string                                                | `"Creative Agency Website"`            |
| `description` | string                                                | `"A visually rich agency site …"`      |
| `category`    | `"creative" \| "real-estate" \| "corporate"`          | `"creative"`                           |
| `tech`        | array of `"wordpress" \| "react" \| "nextjs" \| "php"`| `["nextjs", "react"]`                  |
| `completed`   | string (short label)                                  | `"Jan 2025"`                           |

Common optional fields:

| Field            | Effect                                                                              |
| ---------------- | ----------------------------------------------------------------------------------- |
| `featured`       | `true` makes the project eligible for the homepage strip (top 3 win).               |
| `status`         | `"draft"` hides the project everywhere. Defaults to `"published"`.                  |
| `tags`           | Display tags shown on cards; defaults to a humanised `tech` list (`Next.js`, etc.). |
| `completionDate` | Long label (e.g. `"January 2025"`); defaults to `completed`.                        |
| `client`         | Client name for the detail page; defaults to `"Confidential client"`.               |
| `duration`       | E.g. `"8 weeks"`; defaults to `"—"`.                                                |
| `websiteUrl`     | Renders the "Live" / "Live Preview" button.                                         |
| `githubUrl`      | Renders the "GitHub" button.                                                        |
| `coverImage`     | Public path or full URL; defaults to a generated SVG placeholder.                   |
| `screenshots`    | `{ homepage, secondary }` — overrides the auto-generated detail-page previews.      |
| `highlights`     | Array of strings rendered as a checked list on the detail page.                     |
| `impact`         | Array of `{ title, description }` for the Impact card grid.                         |

The full TypeScript shape (with JSDoc) lives in `lib/projects-data.ts` (`JsonProject`).

### Example

```json
{
  "id": "9",
  "slug": "my-new-project",
  "status": "published",
  "featured": true,
  "title": "My New Project",
  "description": "What this project does, who it was for, and why it mattered.",
  "category": "corporate",
  "tech": ["nextjs", "react"],
  "completed": "Apr 2026",
  "completionDate": "April 2026",
  "client": "Acme Inc.",
  "duration": "10 weeks",
  "websiteUrl": "https://example.com",
  "githubUrl": "https://github.com/me/example",
  "highlights": [
    "Built X with Y.",
    "Improved performance by Z."
  ],
  "impact": [
    { "title": "+50% conversion", "description": "Landing page rewrite shipped 50% more sign-ups." }
  ]
}
```

### Editing the section headers (not the data)

- Homepage "Featured Projects" title → `components/sections/featured-projects.tsx` (`sectionTitle`, `sectionSubtitle`)
- `/projects` page title → `components/sections/projects-section.tsx` (`SECTION_TITLE`, `SECTION_SUBTITLE`)
- Filter labels → `components/projects/projects-filter.tsx`

---

## About section

**File:** `components/sections/about-section.tsx`

Your **name** and **role** in the section header come from `config/site.ts` (`siteConfig.name` and `siteConfig.role`).

Edit the **intro paragraphs** and **accordion items** in this file — the markup is well-commented.

---

## Services section

**File:** `components/sections/services-section.tsx`

Three minimalist cards. Edit the title, description, and bullets per card directly in the file.

---

## Contact page

**Page:** `app/contact/page.tsx`
**Section:** `components/sections/contact-section.tsx`

Left column: location, email, availability list, and social links (location, email, and social URLs read from `config/site.ts`). Right column: inquiry form.

Edit **availability items** and the **contact note** at the top of `contact-section.tsx`.

The form is **UI-only** by default — submitting it shows a success state but does not send anything. To wire it up, replace the `handleSubmit` body with a `fetch` call to your provider of choice (Resend, Formspree, your own API route).

When you do, add server-side validation (length, email format) and basic anti-spam (honeypot field or Turnstile/hCaptcha).

---

## Site footer

**File:** `components/site-footer.tsx`

A global "Get in Touch" CTA block plus animated social icons. Used on every page.

- Edit the headline / subhead text directly in the file.
- Social icon URLs come from `config/site.ts` (`siteConfig.links`) — do not duplicate them here.
- Hover animation: top-to-bottom slide that plays once per hover (already configured).

---

## Navigation

**File:** `components/site-navbar.tsx`
**Mobile drawer:** `components/ui/sidemenu.tsx`

The nav reads `siteConfig.navItems` for desktop links and the mobile drawer. The brand label uses `siteConfig.name`.

If you change a nav `href` to a same-page anchor like `/#about`, the smooth-scroll handler in the navbar takes care of the scroll animation.

---

## Colors & theme

**File:** `app/globals.css`

The dark theme is defined as CSS variables on `.dark`:

```css
.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --secondary: 240 3.7% 15.9%;
  --muted: 240 3.7% 15.9%;
  --border: 240 3.7% 15.9%;
  /* … */
}
```

Values are HSL (`hue saturation% lightness%`). To shift the accent to blue:

```css
--primary: 217 91% 60%;
```

Some quick presets:

```css
/* Purple */
--primary: 270 91% 65%;
--primary-foreground: 0 0% 100%;

/* Green */
--primary: 142 76% 36%;
--primary-foreground: 0 0% 100%;

/* Orange */
--primary: 24 95% 53%;
--primary-foreground: 0 0% 100%;
```

---

## Typography

**File:** `app/layout.tsx`

The template uses the Inter font by default. To switch:

```typescript
import { Poppins } from "next/font/google"

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] })

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
```

Heading sizes use Tailwind utility classes (`text-4xl`, `text-5xl`, `text-6xl`, …) and can be tuned per-section.

---

## Adding a new top-level page

1. Create `app/<your-route>/page.tsx`.
2. Render `<SiteNavbar />`, your content, and `<SiteFooter />` to keep visual consistency.
3. (Optional) Reuse the homepage's grid background:
   ```tsx
   <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-background to-background/95">
     <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
   </div>
   ```
4. Add it to `siteConfig.navItems` in `config/site.ts` so it shows up in the navbar and the mobile drawer.

---

## Adding shadcn/ui components

The template ships with a curated subset of shadcn primitives (`button`, `badge`, `accordion`, `input`, `label`, `textarea`, `separator`, `sidemenu`). To add more:

```bash
npx shadcn-ui@latest add tabs
```

This drops the source into `components/ui/`, where you can edit it directly.

---

## Tips for buyers

1. **Edit one section at a time.** Don't try to refactor the whole template on day one.
2. **Use Git.** Every meaningful change should be a commit — that's also your publish trigger.
3. **Test on mobile.** Browser dev tools first, then a real phone.
4. **Keep an eye on `npm audit`.** Patch high/critical issues regularly.
5. **Strip what you don't need.** Removed sections you won't use (e.g. Services), so the codebase stays small.

---

Need more help?

- `README.md` — high-level overview
- `QUICK-START.md` — 15-minute checklist
- `DEPLOYMENT.md` — host-specific instructions
- `AI_CUSTOMIZATION_PROMPT.md` — AI-assisted customization
