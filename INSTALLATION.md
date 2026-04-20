# Installation Guide

## Step-by-Step Setup

### 1. Prerequisites

Before you begin, ensure you have the following installed.

#### Required

- **Node.js** — version **18.17 or higher** (Next.js 14 requirement)
  - Recommended: **Node.js 20 LTS** or **Node.js 22 LTS** (this template is built and tested on Node 22)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify: `node --version` → should output `v18.17.x` or higher

- **Package Manager** — choose one:
  - **npm** — version **9 or higher** (bundled with Node 18.17+, tested on npm 10)
    - Verify: `npm --version`
  - **yarn** — classic `1.22+` or berry `4+`: `npm install -g yarn`
  - **pnpm** — version **8 or higher**: `npm install -g pnpm`

- **Git** — version **2.30 or higher** (required for the content publishing workflow — you edit `data/projects.json` and `git push` to deploy)
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify: `git --version`

#### Recommended

- **VS Code** (latest) with these extensions for the best developer experience:
  - Tailwind CSS IntelliSense
  - ESLint
  - Prettier
  - ES7+ React/Redux/React-Native snippets

- **Modern browser** for local preview: Chrome/Edge 120+, Firefox 120+, or Safari 17+.

#### Installed automatically by `npm install` (informational)

| Package | Version shipped with this template |
|---|---|
| Next.js | `14.2.x` |
| React / React DOM | `18.3.x` |
| TypeScript | `5.9.x` |
| Tailwind CSS | `3.4.x` |
| framer-motion | `10.18.x` |
| three.js | `0.160.x` |
| ESLint | `8.57.x` |

You do not need to install any of the above manually.

### 2. Extract and Navigate

Extract the bundle to your desired location and open a terminal in the project directory:

```bash
cd dark-react-developer-bundle
```

### 3. Install Dependencies

Run one of the following commands based on your package manager:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

This will install all required packages including:
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui components
- lucide-react icons

**Installation time:** Approximately 2-3 minutes depending on your internet connection.

### 4. Start Development Server

Launch the development server:

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev
```

You should see output similar to:

```
✓ Ready in 2.5s
○ Local:   http://localhost:3000
```

### 5. Open in Browser

Open your web browser and navigate to:

```
http://localhost:3000
```

You should now see your portfolio running locally! 🎉

## Common Issues

### Port Already in Use

If port 3000 is already in use, Next.js will automatically try the next available port (3001, 3002, etc.).

To manually specify a different port:

```bash
npm run dev -- -p 3001
```

### Module Not Found Errors

If you see "Module not found" errors:

1. Delete `node_modules` and lock file:
   ```bash
   rm -rf node_modules package-lock.json
   ```

2. Reinstall dependencies:
   ```bash
   npm install
   ```

### TypeScript Errors

If you encounter TypeScript errors:

1. Ensure your `tsconfig.json` is properly configured
2. Try restarting your code editor
3. Clear Next.js cache:
   ```bash
   rm -rf .next
   npm run dev
   ```

## Next Steps

1. **Add your projects**: Open `data/projects.json` — that file is the single source of truth for everything that appears on `/`, `/projects`, and `/projects/<slug>`. The full schema lives at the top of `lib/projects-data.ts`.
2. **Update branding & nav**: Edit `config/site.ts` (site name, nav links, social URLs).
3. **Customize hero copy**: Edit `components/home-page-client.tsx` (headline, subheadline, CTA buttons).
4. **Tweak section content**: About/Services/Footer sections live in `components/sections/`.
5. **Change colors**: CSS variables in `app/globals.css`.

See `CUSTOMIZATION.md` for the full walkthrough or `README.md` for an overview.

## Building for Production

When ready to deploy:

```bash
npm run build
npm run start
```

This creates an optimized production build in the `.next` folder.

## Getting Help

If you encounter issues not covered here:

1. Check the main `README.md` file
2. Review the documentation PDF (included with bundle)
3. Search for similar issues on [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)
4. Check [Next.js documentation](https://nextjs.org/docs)

---

**Happy coding! 🚀**

