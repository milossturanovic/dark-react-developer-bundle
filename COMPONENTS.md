# Component Reference Guide

This guide provides detailed information about all components included in the Dark React Developer Bundle.

## Table of Contents

1. [Page Components](#page-components)
2. [shadcn/ui Components](#shadcnui-components)
3. [Icons](#icons)
4. [Usage Examples](#usage-examples)

---

## Page Components

### SiteNavbar

**File:** `components/site-navbar.tsx`

The main navigation component with sticky positioning and mobile menu.

**Features:**
- Sticky positioning with backdrop blur
- Desktop horizontal menu
- Mobile slide-out drawer menu
- CTA buttons for GitHub and Download
- Auto-hides/shows based on scroll

**Props:** None (uses `siteConfig` from config/site.ts)

**Usage:**
```typescript
import { SiteNavbar } from "@/components/site-navbar"

<SiteNavbar />
```

**Customization Points:**
- Edit navigation items in `config/site.ts`
- Modify CTA button text/links in the component
- Adjust styling with Tailwind classes
- Change backdrop blur effect

---

## shadcn/ui Components

### Button

**File:** `components/ui/button.tsx`

Versatile button component with multiple variants and sizes.

**Variants:**
- `default` - Primary solid button (white on dark)
- `outline` - Outlined button with border
- `secondary` - Secondary filled button
- `ghost` - Transparent with hover effect
- `link` - Link-styled button
- `destructive` - Red warning/danger button

**Sizes:**
- `default` - Standard height (h-10)
- `sm` - Small (h-9)
- `lg` - Large (h-11)
- `icon` - Square icon button (h-10 w-10)

**Usage Examples:**

```typescript
import { Button } from "@/components/ui/button"

// Primary button
<Button>Click Me</Button>

// Outlined button
<Button variant="outline">Outline</Button>

// Large button
<Button size="lg">Large Button</Button>

// As link
<Button asChild>
  <a href="/page">Link Button</a>
</Button>

// With icon
<Button>
  <Icon className="mr-2 h-4 w-4" />
  Text
</Button>
```

---

### Badge

**File:** `components/ui/badge.tsx`

Small badge/chip component for tags, labels, and status indicators.

**Variants:**
- `default` - Solid primary badge
- `secondary` - Secondary colored badge
- `outline` - Outlined badge
- `destructive` - Red warning badge

**Usage Examples:**

```typescript
import { Badge } from "@/components/ui/badge"

// Default badge
<Badge>New</Badge>

// Outlined badge
<Badge variant="outline">TypeScript</Badge>

// Secondary badge
<Badge variant="secondary">React</Badge>

// Multiple badges
<div className="flex gap-2">
  <Badge>Next.js</Badge>
  <Badge>Tailwind</Badge>
  <Badge>TypeScript</Badge>
</div>
```

**Use Cases:**
- Technology tags on project cards
- Status indicators
- Feature badges
- Category labels

---

### Sheet

**File:** `components/ui/sheet.tsx`

Slide-out drawer component, primarily used for mobile navigation.

**Sub-components:**
- `Sheet` - Container component
- `SheetTrigger` - Button to open the sheet
- `SheetContent` - The drawer content
- `SheetHeader` - Header section
- `SheetTitle` - Title text
- `SheetDescription` - Description text

**Props (SheetContent):**
- `side` - Where drawer slides from: "top" | "right" | "bottom" | "left"

**Usage Example:**

```typescript
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Title</SheetTitle>
    </SheetHeader>
    <div className="mt-4">
      {/* Your content */}
    </div>
  </SheetContent>
</Sheet>
```

**Features:**
- Backdrop overlay
- Click outside to close
- Close button included
- Smooth slide animation
- Keyboard accessible (Escape to close)
- Body scroll lock when open

---

### Separator

**File:** `components/ui/separator.tsx`

Simple horizontal or vertical divider line.

**Props:**
- `orientation` - "horizontal" (default) or "vertical"
- `decorative` - Whether separator is decorative (default: true)

**Usage Examples:**

```typescript
import { Separator } from "@/components/ui/separator"

// Horizontal separator
<Separator />

// With custom spacing
<Separator className="my-6" />

// Vertical separator
<div className="flex items-center h-12">
  <span>Left</span>
  <Separator orientation="vertical" className="mx-4" />
  <span>Right</span>
</div>
```

---

## Icons

**Library:** lucide-react

All icons come from the [Lucide](https://lucide.dev/) icon library.

**Included Icons:**
- `Menu` - Hamburger menu icon
- `ArrowRight` - Right arrow
- `Github` - GitHub logo
- `Linkedin` - LinkedIn logo
- `Mail` - Email icon
- `ExternalLink` - External link icon
- `X` - Close/X icon (used in Sheet)

**Usage:**

```typescript
import { Github, Mail, ArrowRight } from "lucide-react"

// Basic icon
<Github className="h-5 w-5" />

// With button
<Button>
  <Mail className="mr-2 h-4 w-4" />
  Email Me
</Button>

// With custom color
<Github className="h-6 w-6 text-muted-foreground" />
```

**Adding More Icons:**

1. Browse available icons at [lucide.dev](https://lucide.dev/)
2. Import the icon:
   ```typescript
   import { IconName } from "lucide-react"
   ```
3. Use it:
   ```typescript
   <IconName className="h-5 w-5" />
   ```

**Common Icon Sizes:**
- `h-4 w-4` - Small (16px)
- `h-5 w-5` - Medium (20px)
- `h-6 w-6` - Large (24px)

---

## Usage Examples

### Creating a Project Card

```typescript
<article className="group relative overflow-hidden rounded-lg border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
  <div className="space-y-4">
    <div className="flex items-start justify-between">
      <h3 className="text-xl font-semibold">Project Title</h3>
      <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
        <ExternalLink className="h-5 w-5" />
      </a>
    </div>
    
    <p className="text-sm text-muted-foreground">
      Project description goes here.
    </p>

    <div className="flex flex-wrap gap-2">
      <Badge variant="outline">React</Badge>
      <Badge variant="outline">TypeScript</Badge>
    </div>
  </div>
</article>
```

### Creating a CTA Section

```typescript
<section className="py-20 text-center">
  <div className="mx-auto max-w-2xl space-y-6">
    <Badge>✨ New Feature</Badge>
    
    <h2 className="text-3xl font-bold">
      Ready to Get Started?
    </h2>
    
    <p className="text-lg text-muted-foreground">
      Join thousands of developers building amazing portfolios.
    </p>
    
    <div className="flex gap-4 justify-center">
      <Button size="lg">
        Get Started
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      <Button size="lg" variant="outline">
        Learn More
      </Button>
    </div>
  </div>
</section>
```

### Creating a Feature Grid

```typescript
<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
  {features.map((feature) => (
    <div key={feature.id} className="space-y-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-card">
        <feature.icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-semibold">{feature.title}</h3>
      <p className="text-muted-foreground">{feature.description}</p>
    </div>
  ))}
</div>
```

### Creating Social Links

```typescript
<div className="flex gap-4">
  <Button variant="outline" size="icon" asChild>
    <a href="https://github.com/username" target="_blank" rel="noreferrer">
      <Github className="h-5 w-5" />
    </a>
  </Button>
  
  <Button variant="outline" size="icon" asChild>
    <a href="https://linkedin.com/in/username" target="_blank" rel="noreferrer">
      <Linkedin className="h-5 w-5" />
    </a>
  </Button>
  
  <Button variant="outline" size="icon" asChild>
    <a href="mailto:email@example.com">
      <Mail className="h-5 w-5" />
    </a>
  </Button>
</div>
```

---

## Adding More shadcn/ui Components

Want to add more components to your project?

### Available Components

Visit [ui.shadcn.com](https://ui.shadcn.com/) to browse all available components:

- Card
- Dialog
- Dropdown Menu
- Form
- Input
- Textarea
- Select
- Checkbox
- Radio Group
- Tabs
- Accordion
- Alert
- Avatar
- Calendar
- And many more...

### Installation

```bash
# Install a new component
npx shadcn-ui@latest add [component-name]

# Example: Add the Card component
npx shadcn-ui@latest add card

# Example: Add the Input component
npx shadcn-ui@latest add input
```

This will:
1. Download the component code to `components/ui/`
2. Add any required dependencies
3. Update your configuration if needed

### Using New Components

After installation, import and use like any other component:

```typescript
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>
```

---

## Utility Functions

### cn() Helper

**File:** `lib/utils.ts`

Merges Tailwind classes intelligently, resolving conflicts.

**Usage:**

```typescript
import { cn } from "@/lib/utils"

// Merge classes
const buttonClass = cn(
  "px-4 py-2",
  "bg-primary text-white",
  isActive && "bg-primary/90"
)

// In component
<div className={cn("base-class", props.className)}>
```

**Why use cn()?**
- Resolves conflicting Tailwind classes
- Handles conditional classes
- Merges props.className safely

---

## Best Practices

### Component Usage

1. **Always use semantic HTML:**
   ```typescript
   // Good
   <article>, <section>, <nav>
   
   // Avoid
   <div>, <div>, <div>
   ```

2. **Keep components accessible:**
   ```typescript
   // Add aria labels for icons
   <button aria-label="Close menu">
     <X className="h-4 w-4" />
   </button>
   ```

3. **Use the `asChild` prop when wrapping:**
   ```typescript
   // Good - merges props correctly
   <Button asChild>
     <Link href="/page">Link</Link>
   </Button>
   
   // Avoid - nested buttons/links
   <Button>
     <Link href="/page">Link</Link>
   </Button>
   ```

### Styling Tips

1. **Use Tailwind utilities consistently**
2. **Maintain spacing scale:** Use `gap-2`, `gap-4`, `gap-6`, `gap-8`
3. **Keep responsive:** Use `sm:`, `md:`, `lg:` breakpoints
4. **Use theme colors:** `bg-background`, `text-foreground`, not arbitrary colors

---

## Need Help?

- Check component source code in `components/ui/`
- Visit [shadcn/ui documentation](https://ui.shadcn.com/)
- Review [Lucide icons](https://lucide.dev/)
- See usage examples in `app/page.tsx`

---

**Happy building! 🎨**

