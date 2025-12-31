# Installation Guide

## Step-by-Step Setup

### 1. Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`

- **Package Manager** (choose one):
  - npm (comes with Node.js)
  - yarn: `npm install -g yarn`
  - pnpm: `npm install -g pnpm`

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

1. **Customize Content**: Edit `app/page.tsx` to update your content
2. **Update Configuration**: Modify `config/site.ts` for branding and links
3. **Change Colors**: Customize theme in `app/globals.css`
4. **Add Projects**: Update the `PROJECTS_DATA` array

See `README.md` for detailed customization instructions.

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

