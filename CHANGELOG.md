# Changelog

All notable changes to the Dark React Developer Bundle will be documented in this file.

## [1.1.4] - 2026-06-18

### Code hygiene

- Fixed ESLint warning in `components/about/cobe-globe.tsx` (effect cleanup uses local `globe` instance; removed unused `animationFrameRef`).
- Ran `npm audit fix` (dev dependency patches). Remaining advisories require a major Next.js upgrade and are tracked for a future release.

---

## [1.1.3] - 2026-06-18

### License

- Clarified Git hosting: **private repos for deployment are allowed**; public redistribution of the template source is not.
- Added *Git Hosting and Deployment* section to `LICENSE.md`; aligned `DEPLOYMENT.md`, `QUICK-START.md`, and `README.md`.

---

## [1.1.2] - 2026-06-18

### Documentation

- Consolidated buyer docs to five files: `README.md`, `QUICK-START.md`, `CUSTOMIZATION.md`, `DEPLOYMENT.md`, `LICENSE.md`, plus new `AI_CUSTOMIZATION_PROMPT.md`.
- Removed redundant `TECHNICAL-GUIDE.md` and `INSTALLATION.md` (content covered by the split guides).
- Updated all cross-references; `CHANGELOG.md` excluded from buyer zip via `create-bundle.mjs`.

### Content / DX

- Unified demo persona to **John Doe** in `config/site.ts`; navbar, footer, about, contact, and layout metadata read from one config file.

---

## [1.1.1] - 2026-05-10

### Documentation

- **`TECHNICAL-GUIDE.md`** — single buyer-facing handbook: lifecycle from install through customization (`data/projects.json`, sections, theme) to deployment (Vercel, Netlify, Railway, Amplify, DigitalOcean, VPS), checklist, analytics/SEO notes, env vars, troubleshooting, and file appendix. Maintained directly as Markdown (no doc build script).
- Removed **`scripts/build-technical-guide-once.mjs`**; the guide is not assembled by Node tooling.
- **`README.md`** — link **`TECHNICAL-GUIDE.md`** under Support.

### Seller workflow

- Remove **`bundle`** npm script from **`package.json`**; sellers run **`node scripts/create-bundle.mjs`** when assembling buyer zips (buyers do not ship the `scripts/` folder).

---

## [1.1.0] - 2026-04-19

### Major changes

- **Single source of truth for all projects.** Every project on the site now reads from `data/projects.json`. The hardcoded `PROJECTS_DATA` arrays in `app/page.tsx`, `components/sections/featured-projects.tsx`, and `components/sections/projects-section.tsx` are gone, along with `lib/projects-data.ts`'s former hardcoded detail array.
- **New `lib/projects-data.ts`.** Server-side JSON loader (cached with `react/cache`) plus typed mappers (`getFeaturedProjects`, `getListProjects`, `getProjectBySlug`, `getAllProjectSlugs`, `getAllProjectDetails`). Includes shared types (`ProjectCategory`, `ProjectTech`, `JsonProject`, `ProjectDetail`, …) used across the public site.
- **`app/page.tsx` split into a server entry + a client component.** The new `components/home-page-client.tsx` houses the hero animations and section composition; `app/page.tsx` is now a small server component that fetches `featuredProjects` and passes them in.
- **Async pages.** `app/projects/page.tsx` and `app/projects/[slug]/page.tsx` are now async server components. `generateStaticParams` and `generateMetadata` were updated accordingly.
- **Filter / card components are prop-driven.** `FeaturedProjects`, `ProjectsSection`, and `RelatedCard` accept project data via props instead of importing it from a constant.

### Removed (admin dashboard era)

- `app/admin/**` — login, dashboard, projects CRUD, content/media/settings placeholders.
- `app/api/admin/**` — login / logout / check-auth / projects API routes.
- `middleware.ts` — server-side admin route protection.
- `lib/admin-auth.ts` and `lib/rate-limiter.ts`.
- `components/admin/**` — sidebar, header, project form.
- Admin-only shadcn primitives: `card`, `table`, `dialog`, `select`, `dropdown-menu`, `skeleton`.
- `data/projects.example.json`, `.env.example`, `.env.local`, `SECURITY.md`.
- Outdated docs: `COMPONENTS.md`, `GLOBE-INSTALLATION.md`.

### Dependencies removed

- `sonner`
- `react-simple-maps`
- `@radix-ui/react-dialog`
- `@radix-ui/react-dropdown-menu`
- `@radix-ui/react-select`

(52 packages uninstalled in total.)

### Docs

- Rewrote `README.md`, `CUSTOMIZATION.md`, `QUICK-START.md` around the JSON content workflow.
- Updated `INSTALLATION.md` and `DEPLOYMENT.md` to drop admin/env-var references.

### Why

The admin dashboard added significant code (~1,500 lines), required filesystem-write hosts, and introduced its own security model. For a portfolio template aimed at junior developers, "edit JSON, push, done" is simpler, safer, and works on Vercel out of the box.

---

## [1.0.0] - 2024-01-01

### Initial Release

#### Features

- ✨ Modern dark-themed portfolio homepage
- 🎨 Minimalist design with premium aesthetics
- 📱 Fully responsive mobile-first layout
- ⚡ Built with Next.js 14 App Router
- 🎯 TypeScript for type safety
- 💅 Tailwind CSS styling
- 🧩 shadcn/ui components included
- 🔍 SEO-ready structure
- ♿ Accessible components and keyboard navigation
- 🎭 Smooth hover animations and transitions

#### Components

- Sticky navigation bar with backdrop blur
- Mobile-friendly hamburger menu (Sheet component)
- Hero section with gradient text and CTA buttons
- Feature badges display
- Project cards grid with hover effects
- About section
- Contact section with social links
- Responsive footer

#### Documentation

- Comprehensive README with setup instructions
- Installation guide
- Detailed customization guide
- Deployment guide for multiple platforms
- Quick start checklist
- Inline code comments for easy editing

#### Tech Stack

- Next.js 14.0.4
- React 18.2.0
- TypeScript 5.3.3
- Tailwind CSS 3.4.0
- shadcn/ui components (Button, Badge, Sheet, Separator)
- lucide-react icons

---

## Future Enhancements (Coming Soon)

### Potential Features

- [ ] Contact form with email integration
- [ ] Blog section with MDX support
- [ ] Project detail pages
- [ ] Theme toggle (light/dark mode)
- [ ] Animated scroll effects
- [ ] Skills/tech stack section
- [ ] Testimonials component
- [ ] Case study templates
- [ ] Newsletter signup
- [ ] Analytics integration guide
- [ ] More color theme presets

---

## Version History

### [1.0.0] - Initial Release
- Complete portfolio template with all core features
- Full documentation suite
- Ready for production deployment

---

## Upgrade Guide

When updates are released, follow these steps:

1. **Backup your customizations:**
   - Save your modified files
   - Note any custom code added

2. **Review the changelog:**
   - Check what's new
   - Identify breaking changes

3. **Update dependencies:**
   ```bash
   npm update
   ```

4. **Test thoroughly:**
   ```bash
   npm run dev
   npm run build
   ```

5. **Merge new features:**
   - Add new components as needed
   - Update configuration files
   - Test all functionality

---

## Support

For questions or issues with this version:
- Check the documentation files
- Review inline code comments
- Refer to Next.js official docs

---

**Note:** This is a digital product template. Customize freely for your needs!

