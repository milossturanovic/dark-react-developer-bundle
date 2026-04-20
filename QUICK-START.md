# Quick Start Checklist

Get your portfolio up and running in about 15 minutes.

## ✅ Setup (5 minutes)

- [ ] **Extract the bundle** to your desired location
- [ ] **Open a terminal** in the project folder
- [ ] **Install dependencies:**
  ```bash
  npm install
  ```
- [ ] **Start the dev server:**
  ```bash
  npm run dev
  ```
- [ ] **Open** <http://localhost:3000> and confirm the template loads

> No environment variables are required for the default template.

---

## ✅ Essential customization (10 minutes)

### 1. Site branding (2 min)

**File:** `config/site.ts`

- [ ] Change `name` to your name / brand
- [ ] Update `description`
- [ ] Set `shortName`
- [ ] Replace social URLs in `links`

### 2. Hero section (3 min)

**File:** `components/home-page-client.tsx`

- [ ] Edit the headline words (the two `[…].map((word, i) => …)` arrays)
- [ ] Update the subheadline `<p>`
- [ ] Tweak the `FEATURES_DATA` badge list at the top of the file
- [ ] Replace the `Download Resume` and `Contact` button targets if needed

### 3. Projects (5 min)

**File:** `data/projects.json`

- [ ] Replace the example projects with your own
- [ ] Mark up to 3 with `"featured": true` to show on the homepage
- [ ] Set `"status": "draft"` to temporarily hide a project

Required fields per project: `id`, `slug`, `title`, `description`, `category`, `tech`, `completed`. See `lib/projects-data.ts` for the full schema and optional fields (`client`, `duration`, `highlights`, `impact`, `screenshots`, etc.).

---

## ✅ Optional polish

### Other sections

- [ ] About accordion → `components/sections/about-section.tsx`
- [ ] Services cards → `components/sections/services-section.tsx`
- [ ] Footer CTA + social links → `components/site-footer.tsx`
- [ ] Contact page form → `components/sections/contact-section.tsx`

### Styling

- [ ] Tweak theme colors in `app/globals.css` (CSS variables on `.dark`)
- [ ] Change the global font in `app/layout.tsx`

---

## ✅ Pre-launch

### Content review

- [ ] Spell-check all text
- [ ] Verify every external link works
- [ ] Test the mobile menu and the lightbox on a phone
- [ ] Confirm metadata in `app/layout.tsx`

### Technical

- [ ] Run a clean production build:
  ```bash
  npm run build
  npm run start
  ```
- [ ] Fix any errors or warnings
- [ ] Optimize any project images you added under `public/`

---

## ✅ Deployment

The shortest path:

- [ ] Commit your changes:
  ```bash
  git add .
  git commit -m "Initial portfolio content"
  ```
- [ ] Push to GitHub
- [ ] Import the repo into [Vercel](https://vercel.com)
- [ ] Click Deploy — no environment variables required

When you want to publish more projects later: edit `data/projects.json`, commit, push. Done.

See `DEPLOYMENT.md` for Netlify, Railway, AWS Amplify, DigitalOcean and VPS instructions.

---

## 💡 Pro tips

1. **Use Git from day one.** Editing `data/projects.json` and pushing is the entire publishing workflow.
2. **Preview after each change.** `npm run dev` reloads automatically.
3. **Test on mobile early.** Browser dev tools or your actual phone.
4. **Don't over-customize on day one.** Ship a basic version, iterate later.

---

## 📚 Need help?

- `README.md` — overview
- `INSTALLATION.md` — detailed setup
- `CUSTOMIZATION.md` — section-by-section guide
- `DEPLOYMENT.md` — host-specific deploy steps

---

**Ready to launch.**
