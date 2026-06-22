# Dark React Developer Bundle

A modern, dark-themed developer portfolio template built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)

---

## What's inside

- **Pages**: Home, `/projects`, `/projects/[slug]` (dynamic detail pages), `/contact`.
- **Sections**: Hero with rotating dotted globe, About (8-item accordion), Services, Featured Projects, Site Footer with CTA.
- **Filtering**: Category + tech filters on the projects page.
- **Animations**: Framer Motion hero, animated section titles, social-link micro-interactions, image lightbox.
- **Single content source**: every project on the site is read from `data/projects.json`.
- **No backend, no database, no env vars required.**

---

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

To build for production:

```bash
npm run build
npm run start
```

---

## How to edit your portfolio

This template is intentionally simple to publish:

1. **Edit `data/projects.json`** — add, edit, reorder, or remove projects.
2. **Run `npm run dev`** to preview.
3. **`git commit` and `git push`** — your hosting platform redeploys automatically.

No CMS, no database, no admin login.

### Project schema

Required fields: `id`, `slug`, `title`, `description`, `category`, `tech`, `completed`.

Common optional fields: `featured`, `status`, `client`, `duration`, `completionDate`, `websiteUrl`, `githubUrl`, `tags`, `highlights`, `impact`, `coverImage`, `screenshots`.

Enums:

- `category`: `"creative" | "real-estate" | "corporate"`
- `tech`: any combination of `"wordpress" | "react" | "nextjs" | "php"`
- `status`: `"published"` (default) or `"draft"` (hidden everywhere)

The full schema (with JSDoc) lives at the top of `lib/projects-data.ts`.

### Featured projects

Mark a project with `"featured": true` to make it eligible for the homepage strip. The first 3 featured (or first 3 published, if none are featured) appear on `/`.

---

## Where to edit other content

| What you want to change           | File                                              |
| --------------------------------- | ------------------------------------------------- |
| Site name, role, email, social    | `config/site.ts`                                  |
| Page title & meta description     | `config/site.ts` (used by `app/layout.tsx`)       |
| Hero headline, subheadline, CTAs  | `components/home-page-client.tsx`                 |
| About intro & accordion           | `components/sections/about-section.tsx`           |
| Services section                  | `components/sections/services-section.tsx`        |
| Contact availability & form note  | `components/sections/contact-section.tsx`         |
| Projects (every page)             | `data/projects.json`                              |
| Theme colors                      | `app/globals.css` (CSS variables)                 |

See `CUSTOMIZATION.md` for a deeper walkthrough.

---

## Project structure

```
dark-react-developer-bundle/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx                       # server entry → HomePageClient
│   ├── contact/page.tsx
│   └── projects/
│       ├── page.tsx                   # /projects list
│       └── [slug]/page.tsx            # /projects/<slug> detail
├── components/
│   ├── home-page-client.tsx           # homepage UI (motion-driven)
│   ├── site-navbar.tsx
│   ├── site-footer.tsx
│   ├── hero-title-with-globe.tsx
│   ├── dotted-globe.tsx               # three.js point-cloud globe
│   ├── motion/                        # animated section-title primitives
│   ├── projects/                      # filter + lightbox
│   ├── sections/                      # about, services, featured-projects, projects-section, contact-section
│   └── ui/                            # shadcn primitives (button, badge, accordion, …)
├── config/
│   └── site.ts                        # branding, nav, social links
├── data/
│   ├── projects.json                  # YOUR PORTFOLIO CONTENT
│   └── globe.json                     # globe geometry (do not edit)
├── lib/
│   ├── projects-data.ts               # JSON loader + types + mappers
│   └── utils.ts
└── public/
```

---

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [lucide-react](https://lucide.dev/) icons
- [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) for the dotted globe
- [cobe](https://cobe.vercel.app/) for the international card globe

---

## Scripts

| Command         | What it does                          |
| --------------- | ------------------------------------- |
| `npm run dev`   | Start the dev server on `:3000`       |
| `npm run build` | Production build                      |
| `npm run start` | Run the production build              |
| `npm run lint`  | Lint the project with `next lint`     |

---

## Deployment

The template is a standard Next.js app — deploy it anywhere Next.js runs.

- **Vercel** (recommended): import the repo, accept defaults, deploy. No env vars to configure.
- **Netlify / Railway / DigitalOcean App Platform / your own VPS**: also work out of the box. See `DEPLOYMENT.md`.

Because content is stored in `data/projects.json` (a tracked file), every push deploys the latest portfolio. Use a **private** Git repository for deployment; see `LICENSE.md` for what you may and may not publish.

---

## License

This is a digital product template. Once purchased, you may use it for personal or commercial projects. See `LICENSE.md`.

---

## Documentation

| File | Purpose |
| ---- | ------- |
| `QUICK-START.md` | 15-minute setup and launch checklist |
| `CUSTOMIZATION.md` | Section-by-section editing guide |
| `DEPLOYMENT.md` | Vercel and other hosting platforms |
| `AI_CUSTOMIZATION_PROMPT.md` | Copy-paste prompt for ChatGPT / Cursor |
| `LICENSE.md` | Terms of use for this template |

Start with `QUICK-START.md`, then use the others as needed.
