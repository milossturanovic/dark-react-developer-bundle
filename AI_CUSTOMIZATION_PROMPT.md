# AI Customization Prompt

Copy the prompt below into ChatGPT, Claude, or Cursor after you unzip the template. Replace the bracketed placeholders with your details.

---

```text
I purchased the Dark React Developer Bundle (Next.js 14 portfolio template). Help me customize it for my job search. Do not add a database, admin panel, or backend unless I ask.

My details:
- Name: [Your Name]
- Role/title: [e.g. Junior Frontend Developer]
- Location: [City, Country]
- Email: [your@email.com]
- GitHub: [URL]
- LinkedIn: [URL]
- Skills to highlight: [e.g. React, TypeScript, Tailwind]
- Target roles: [e.g. junior frontend, freelance web dev]

Project workflow rules (important):
- All projects live in data/projects.json — edit that file only for project content.
- Site name, role, email, location, nav, and social links live in config/site.ts.
- Page title and meta description in app/layout.tsx read from config/site.ts automatically.
- Hero copy is in components/home-page-client.tsx.
- About intro/accordion is in components/sections/about-section.tsx (name and role come from config/site.ts).
- Contact availability note is in components/sections/contact-section.tsx.
- Footer and navbar social links read from config/site.ts — do not duplicate URLs elsewhere.

Tasks (do in order):
1. Update config/site.ts with my real branding and links.
2. Rewrite the hero headline, subheadline, and FEATURES_DATA badges for my profile.
3. Replace the 8 example projects in data/projects.json with [N] real or realistic portfolio projects. Keep valid slugs and required fields (id, slug, title, description, category, tech, completed). Mark my best 3 with "featured": true.
4. Update the About section intro paragraphs to match my background (keep the accordion structure).
5. Update Services section cards to match what I offer.
6. Update contact availability items if needed.
7. List every file you changed and give me a short test checklist (npm run dev, npm run build).

Constraints:
- Keep TypeScript types valid.
- Do not break existing routes (/ , /projects, /projects/[slug], /contact).
- Do not introduce Supabase, Prisma, or env vars unless required for a feature I requested.
- Prefer small, focused edits over rewriting entire components.
```

---

## Tips

- Run **one section at a time** if the model makes mistakes (e.g. "only update config/site.ts and data/projects.json first").
- After AI edits, always run `npm run dev` and click through every page before deploying.
- Commit after each working batch: `git commit -am "Customize hero and projects"`.

## More help

- `QUICK-START.md` — 15-minute setup checklist
- `CUSTOMIZATION.md` — file-by-file reference
- `DEPLOYMENT.md` — publish to Vercel
