# Dotted Globe Component - Installation Guide

## Quick Setup

### 1. Install Required Dependencies

```bash
npm install three @react-three/fiber @react-three/drei
```

Or with yarn:

```bash
yarn add three @react-three/fiber @react-three/drei
```

Or with pnpm:

```bash
pnpm add three @react-three/fiber @react-three/drei
```

### 2. Components Created

The following components have been added to your project:

- ✅ `components/dotted-globe.tsx` - Main globe component
- ✅ `components/hero-title-with-globe.tsx` - Wrapper component

### 3. Usage Example

The globe is already integrated into your hero section in `app/page.tsx`. 

**Basic Usage:**

```tsx
import { HeroTitleWithGlobe } from "@/components/hero-title-with-globe"

<HeroTitleWithGlobe>
  <h1>Your Title Here</h1>
</HeroTitleWithGlobe>
```

**With Customization:**

```tsx
<HeroTitleWithGlobe
  pointCount={1500}
  radius={3}
  opacity={0.2}
  color="#3b82f6"
  rotationSpeed={0.4}
>
  <h1>Your Title</h1>
</HeroTitleWithGlobe>
```

### 4. Verify Installation

After installing dependencies, restart your dev server:

```bash
npm run dev
```

The globe should appear behind your hero title, rotating slowly.

## Troubleshooting

### Canvas Not Rendering

- Ensure you've installed all dependencies
- Check browser console for errors
- Verify Next.js version is 14+ (App Router)

### Performance Issues

- Reduce `pointCount` prop (try 800-1000)
- Lower `dpr` in dotted-globe.tsx (change `dpr={[1, 1.5]}` to `dpr={[1, 1]}`)
- Disable on mobile by setting `showGlobe={false}` conditionally

### TypeScript Errors

If you see TypeScript errors:
- Ensure `@types/three` is installed (usually comes with three)
- Restart your TypeScript server in your IDE

## Next Steps

- Customize colors to match your brand
- Adjust opacity for subtlety
- Modify rotation speed
- Add to other sections as needed

For detailed customization, see the comments in `components/dotted-globe.tsx` and `components/hero-title-with-globe.tsx`.

