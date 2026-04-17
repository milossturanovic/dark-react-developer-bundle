# Security Guide

A practical, beginner-friendly security reference for this portfolio template.
This document is reused across every template in the portfolio-sets family.

> **TL;DR** — This template is **UI-first**. It ships safely out of the box,
> but the moment you connect it to real users, real forms, or real data,
> **you** (the developer) become responsible for securing the backend.
> Use the checklist below before you deploy.

---

## 1. Overview

### What this template is

- A polished, production-quality **frontend** portfolio template.
- Built with Next.js (App Router), TypeScript, Tailwind CSS and shadcn/ui.
- Includes an optional local admin dashboard (JSON-file based) for managing
  project content during development.

### What this template is NOT

- It is **not** a full backend. There is no database, no user system,
  no email service, and no production authentication provider.
- The contact form is UI-only until you wire it to a real service
  (Resend, SendGrid, Formspree, your own API, etc.).
- The admin dashboard uses a single password and local JSON files —
  it is designed for **single-developer local content editing**, not for
  multi-user production use.

### Why security still matters

Even a "just a portfolio" site can leak secrets, expose APIs, or be abused
if deployed carelessly. The goal of this document is to give you **safe
defaults** and a clear path to making the site production-ready.

---

## 2. Developer Checklist

Run through this before every deployment. If something is unchecked,
fix it before going live.

- [ ] **No secrets exposed in the frontend**
  Nothing sensitive is imported into client components. API keys, DB URLs,
  and passwords are only read on the server (no `NEXT_PUBLIC_` prefix for secrets).
- [ ] **`ADMIN_PASSWORD` is set in production**
  The admin login will refuse to run if this env var is missing.
  Use a strong, unique password (not `admin123`, not your email password).
- [ ] **Forms connected to a secure backend**
  The contact form is a placeholder. Wire it to a real service
  (Resend, SendGrid, Formspree, or your own API route) before going live.
- [ ] **Inputs validated and sanitized**
  All user input (contact form, admin form, query params) is validated
  on the **server**, not just in the browser. Never trust the client.
- [ ] **Dependencies updated**
  Run `npm audit` and `npm outdated` regularly. Patch high-severity issues.
- [ ] **Environment variables configured properly**
  A real `.env.local` exists on your machine and on your host.
  The `.env.example` file is committed; the real `.env.local` is **not**.
- [ ] **`data/` folder is gitignored**
  User-edited admin content must not be committed to a public repo.
  The template's seed (`data/projects.example.json`) is safe to commit.
- [ ] **HTTPS in production**
  Deploy behind HTTPS (Vercel, Netlify, Cloudflare Pages — all do this
  by default). The admin auth cookie is already set with `Secure` in prod.
- [ ] **Removed or disabled the admin in production (if unused)**
  If you don't plan to use the admin dashboard, delete `app/admin`,
  `app/api/admin` and `middleware.ts`, or keep `ADMIN_PASSWORD` unset
  so login returns a clear error.

---

## 3. Safe Defaults Shipped With the Template

These are already in place. You don't need to configure anything for them:

- **No default admin password.** The login API refuses to authenticate if
  `ADMIN_PASSWORD` is not set. No "forgot to change it" accidents.
- **HTTP-only, SameSite=strict auth cookie.** The admin session cookie
  cannot be read by JavaScript and is not sent cross-site.
- **`Secure` cookie in production.** The cookie is only transmitted over HTTPS.
- **Server-side route protection via `middleware.ts`.** Unauthenticated
  visitors to `/admin/*` are redirected **before** any page HTML is rendered.
- **Rate-limited login.** Failed attempts are tracked per IP with a
  temporary lockout window to slow brute-force attacks.
- **No `dangerouslySetInnerHTML`.** All text content passes through React's
  default escaping, so strings are safe against XSS by default.
- **Gitignored user data.** The `/data/*.json` folder is ignored by git
  so real project content never leaks into public repos.

---

## 4. Environment Variables

### Required

| Variable         | Used by             | Description                                    |
| ---------------- | ------------------- | ---------------------------------------------- |
| `ADMIN_PASSWORD` | `/api/admin/login`  | Password for the admin dashboard. No default.  |

### Rules

- Put secrets in `.env.local` (gitignored). Never in `.env` committed to git.
- Never prefix secrets with `NEXT_PUBLIC_` — that exposes them to the browser.
- On hosts (Vercel, Netlify, etc.), set env vars via the dashboard, not in code.
- Rotate `ADMIN_PASSWORD` if you suspect it was leaked (e.g. pushed by mistake).

Example `.env.local`:

```bash
ADMIN_PASSWORD=replace-me-with-a-strong-password
```

---

## 5. Forms (Contact & Inquiry)

The template includes a contact form that **does not send anything** out of
the box. It shows a success state after submission so the UX can be reviewed.

### Before going live

1. Pick a backend:
   - **Resend** or **SendGrid** — send email from your own API route.
   - **Formspree** or **Getform** — no-code form endpoints.
   - **Your own API** — full control, requires you to handle validation,
     storage, and anti-spam.
2. Validate every input on the **server**:
   - Name: length 1–100, trimmed.
   - Email: valid format (`zod`, `validator`, or a simple regex).
   - Message: length 10–2000, trimmed.
3. Add anti-spam:
   - **Honeypot field** (hidden input that bots fill and humans don't).
   - **Cloudflare Turnstile** or **hCaptcha** for real traffic.
   - **Rate limit by IP** (similar to the admin login limiter).
4. Never reflect user input into HTML with `dangerouslySetInnerHTML`.
   React's default `{text}` escaping is safe — keep it that way.

---

## 6. Admin Dashboard

The admin at `/admin` is **local-first** by design.

- **Authentication:** single password, stored as an HTTP-only cookie.
- **Storage:** `data/projects.json` (JSON on disk) — simple and portable.
- **Protected by:** `middleware.ts` (server-side redirect) and
  per-API guards via `isAuthenticated()`.

### Safe usage

- Only enable it on hosts where the filesystem is writable and persistent
  (a VPS, a Docker container with a volume, a local dev machine).
- Serverless platforms like Vercel have **ephemeral filesystems** — admin
  edits made in production will be lost on the next deploy.
  If you want a production admin, migrate `data/` to a real database
  (Neon, Supabase, PlanetScale, Turso, etc.).
- If you don't need it, delete `app/admin`, `app/api/admin`,
  `middleware.ts`, `lib/admin-auth.ts`, and `lib/rate-limiter.ts`.

### Hardening for small production use

If you keep the local admin and host it yourself:

- Use a long, randomly generated `ADMIN_PASSWORD` (20+ characters).
- Put the site behind HTTPS.
- Consider IP-allowlisting `/admin` at the host or CDN level.
- Back up `data/projects.json` regularly.

---

## 7. XSS (Cross-Site Scripting)

React escapes text content by default, so `{userInput}` in JSX is safe.

Stay safe by following these rules:

- **Never** use `dangerouslySetInnerHTML` with user-provided content.
- Don't build HTML strings manually and inject them into the DOM.
- When rendering Markdown from users, use a sanitizer
  (`rehype-sanitize`, `DOMPurify`) with a conservative allowlist.
- When rendering user-provided URLs (like `links.live` in projects),
  validate the scheme — only allow `http://` and `https://`, never `javascript:`.

---

## 8. API Exposure

All API routes live under `app/api/`.

- Admin routes under `app/api/admin/*` are guarded by `isAuthenticated()`
  **in addition to** `middleware.ts`. Never remove the in-route guard —
  middleware can be misconfigured.
- Public API routes (if you add any) must **assume hostile input**:
  validate, rate-limit, and return generic error messages (don't leak
  stack traces or internal paths).
- Never echo raw request bodies back to clients.

---

## 9. Dependency Risks

Third-party packages are the most common source of modern web vulnerabilities.

- Run `npm audit` before every release. Fix `high` and `critical` first.
- Run `npm outdated` monthly. Keep frameworks (Next.js, React) close to latest.
- Prefer well-maintained packages (recent commits, many downloads, few deps).
- Remove unused dependencies — every extra package is extra attack surface.

---

## 10. Deployment Checklist

Final pass before you hit deploy:

- [ ] `ADMIN_PASSWORD` set in the host's environment (not in code).
- [ ] `.env.local` is **not** in the repo (`git status` shows it as ignored).
- [ ] `data/projects.json` is **not** in the repo.
- [ ] HTTPS is active on the production domain.
- [ ] Contact form is wired to a real backend with validation and anti-spam.
- [ ] `npm audit` shows no high/critical issues.
- [ ] The site has been loaded in an incognito window to confirm
      no secrets appear in the browser (check Network tab + `view-source:`).

---

## 11. Reporting a Vulnerability

If you find a security issue in this template:

1. **Do not** open a public GitHub issue.
2. Email the template author directly (see the site's contact page or
   the repository owner's profile).
3. Include steps to reproduce and the affected template version.

You will get a response within a few business days.

---

_Last reviewed: keep this file updated whenever auth, forms, or the admin
dashboard change in a meaningful way._
