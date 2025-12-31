# Customization Guide

This guide walks you through customizing every aspect of your Dark React Developer Bundle.

## Table of Contents

1. [Site Configuration](#site-configuration)
2. [Hero Section](#hero-section)
3. [Projects Section](#projects-section)
4. [About Section](#about-section)
5. [Contact Section](#contact-section)
6. [Navigation](#navigation)
7. [Colors & Theme](#colors--theme)
8. [Typography](#typography)
9. [Adding New Sections](#adding-new-sections)

---

## Site Configuration

**File:** `config/site.ts`

This is the central configuration file for your portfolio.

### Update Branding

```typescript
export const siteConfig = {
  name: "Your Name",              // Change to your name
  shortName: "YN",                // 2-3 letter abbreviation
  description: "Your custom description",
  url: "https://yoursite.com",    // Your domain
  // ...
}
```

### Edit Navigation Items

Add, remove, or modify navigation links:

```typescript
navItems: [
  {
    title: "Home",      // Display text
    href: "#home",      // Anchor link (must match section ID)
  },
  {
    title: "Projects",
    href: "#projects",
  },
  // Add more items...
],
```

### Update Social Links

```typescript
links: {
  github: "https://github.com/yourusername",
  downloadBundle: "#download",
  twitter: "https://twitter.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
},
```

---

## Hero Section

**File:** `app/page.tsx` (lines ~95-140)

### Change the Main Headline

Find and edit:

```typescript
<h1 className="text-4xl font-bold...">
  Your new headline text
  <span className="bg-gradient-to-r...">
    highlighted word
  </span>
</h1>
```

### Update Subheadline

```typescript
<p className="mx-auto max-w-2xl...">
  Your custom description text goes here.
</p>
```

### Modify CTA Buttons

```typescript
<Button size="lg" asChild>
  <a href="#your-link">
    Your Button Text
    <ArrowRight className="ml-2 h-4 w-4" />
  </a>
</Button>
```

### Edit Feature Badges

At the top of the file, modify:

```typescript
const FEATURES_DATA = [
  "Your Technology 1",
  "Your Technology 2",
  "Your Technology 3",
]
```

### Change Status Badge

```typescript
<Badge variant="outline" className="mb-4">
  ✨ Your custom status message
</Badge>
```

---

## Projects Section

**File:** `app/page.tsx` (lines ~54-76)

### Add/Edit Projects

Modify the `PROJECTS_DATA` array:

```typescript
const PROJECTS_DATA = [
  {
    id: 1,                          // Unique ID
    title: "Project Name",          // Project title
    description: "Brief description of your project.",
    tags: ["Tech1", "Tech2"],       // Technology tags
    link: "https://project-url.com", // Project URL or "#"
  },
  {
    id: 2,
    title: "Another Project",
    description: "Description here.",
    tags: ["React", "Node.js"],
    link: "#",
  },
  // Add more projects...
]
```

### Tips for Projects

- **Keep descriptions concise**: 1-2 sentences max
- **Use 2-4 tags**: Don't overcrowd with tags
- **Update links**: Replace "#" with actual project URLs
- **Add more projects**: Just add new objects to the array

---

## About Section

**File:** `app/page.tsx` (lines ~196-217)

Edit the about text directly:

```typescript
<section id="about" className="py-20">
  <div className="mx-auto max-w-3xl text-center">
    <h2 className="text-3xl font-bold...">
      About Me  {/* Change heading */}
    </h2>
    <div className="mt-6 space-y-4...">
      <p>
        Your first paragraph about yourself or your work.
      </p>
      <p>
        Your second paragraph with more details.
      </p>
      <p>
        Optional third paragraph.
      </p>
    </div>
  </div>
</section>
```

---

## Contact Section

**File:** `app/page.tsx` (lines ~65-77 and ~227-260)

### Update Social Links

Modify the `SOCIAL_LINKS` array:

```typescript
const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: "https://github.com/yourusername",  // Your URL
    icon: Github,                              // Icon from lucide-react
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/yourusername",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:your.email@example.com",
    icon: Mail,
  },
  // Add more social links...
]
```

### Available Icons

Import from `lucide-react`:
- `Github`
- `Linkedin`
- `Mail`
- `Twitter`
- `Facebook`
- `Instagram`
- And many more at [lucide.dev](https://lucide.dev/)

---

## Navigation

**File:** `components/site-navbar.tsx`

### Change Brand Display

```typescript
<Link href="/" className="flex items-center space-x-2">
  <span className="text-xl font-bold">
    {siteConfig.name}  {/* Automatically uses config */}
  </span>
</Link>
```

### Modify CTA Buttons

Desktop buttons (lines ~86-95):

```typescript
<Button variant="outline" size="sm" asChild>
  <a href={siteConfig.links.github}>
    Your Button Text
  </a>
</Button>
```

---

## Colors & Theme

**File:** `app/globals.css`

### Understanding CSS Variables

The theme uses CSS variables that can be customized:

```css
.dark {
  --background: 240 10% 3.9%;      /* Main background */
  --foreground: 0 0% 98%;          /* Text color */
  --primary: 0 0% 98%;             /* Primary buttons */
  --secondary: 240 3.7% 15.9%;     /* Secondary elements */
  --muted: 240 3.7% 15.9%;         /* Muted text/elements */
  --border: 240 3.7% 15.9%;        /* Border colors */
  /* ... more colors ... */
}
```

### Changing Colors

Colors use HSL format: `hue saturation% lightness%`

Example - Make primary color blue:

```css
--primary: 217 91% 60%;  /* Blue instead of white */
```

### Quick Color Presets

**Purple theme:**
```css
--primary: 270 91% 65%;
--primary-foreground: 0 0% 100%;
```

**Green theme:**
```css
--primary: 142 76% 36%;
--primary-foreground: 0 0% 100%;
```

**Orange theme:**
```css
--primary: 24 95% 53%;
--primary-foreground: 0 0% 100%;
```

---

## Typography

**File:** `app/layout.tsx`

### Change Font

Currently uses Inter font. To use a different Google Font:

```typescript
import { YourFont } from 'next/font/google'

const yourFont = YourFont({ subsets: ['latin'] })

// Then in the body:
<body className={yourFont.className}>{children}</body>
```

Popular alternatives:
- `Roboto`
- `Poppins`
- `Montserrat`
- `Open_Sans`

### Font Sizes

Controlled by Tailwind classes. Common text sizes:

- Headings: `text-4xl`, `text-5xl`, `text-6xl`
- Body: `text-base`, `text-lg`
- Small: `text-sm`, `text-xs`

---

## Adding New Sections

### Step 1: Add to Navigation

In `config/site.ts`:

```typescript
navItems: [
  // ... existing items
  {
    title: "New Section",
    href: "#new-section",
  },
],
```

### Step 2: Create Section in Page

In `app/page.tsx`, add before the footer:

```typescript
<Separator className="my-12" />

<section id="new-section" className="py-20">
  <div className="mx-auto max-w-3xl text-center">
    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
      New Section Title
    </h2>
    <p className="mt-4 text-lg text-muted-foreground">
      Section content goes here
    </p>
  </div>
</section>
```

### Step 3: Add Content

Fill in your section content using existing components like `Button`, `Badge`, `Card` styles, etc.

---

## Advanced Customization

### Adding shadcn/ui Components

Install additional components:

```bash
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add form
```

### Custom Animations

Add to `tailwind.config.ts`:

```typescript
extend: {
  keyframes: {
    'custom-animation': {
      '0%': { opacity: '0', transform: 'translateY(10px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' },
    },
  },
  animation: {
    'custom': 'custom-animation 0.5s ease-out',
  },
}
```

Use in components:

```typescript
<div className="animate-custom">Content</div>
```

---

## Tips for Buyers

1. **Start Simple**: Customize one section at a time
2. **Test Changes**: Run `npm run dev` and check browser after each change
3. **Keep Backups**: Save original files before major changes
4. **Use Git**: Track your changes with version control
5. **Check Mobile**: Test on mobile devices or use browser dev tools

---

Need more help? Check out:
- `README.md` for general information
- `INSTALLATION.md` for setup help
- Next.js documentation at [nextjs.org](https://nextjs.org/docs)

