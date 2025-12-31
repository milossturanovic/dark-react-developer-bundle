# Dark React Developer Bundle 🌙

A modern, minimalist dark-themed portfolio template built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui.

![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- **Modern Dark Theme** - Carefully crafted dark color scheme with subtle gradients
- **Fully Responsive** - Mobile-first design that looks great on all devices
- **Next.js App Router** - Built with the latest Next.js features
- **TypeScript** - Type-safe code for better developer experience
- **shadcn/ui Components** - Beautiful, accessible UI components
- **Easy Customization** - Clear code structure with editable data arrays
- **SEO Ready** - Proper meta tags and semantic HTML
- **Fast Performance** - Optimized for speed and Core Web Vitals

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, or pnpm

### Installation

1. **Install dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. **Run the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000) to see your portfolio.

## 📝 Customization Guide

### 1. Site Branding & Navigation

Edit `config/site.ts` to customize:
- Site name and description
- Navigation menu items
- Social media links

```typescript
export const siteConfig = {
  name: "Your Name",
  shortName: "YN",
  description: "Your custom description",
  navItems: [
    // Add/remove navigation items
  ],
  links: {
    // Update your social links
  },
}
```

### 2. Hero Section

Edit `app/page.tsx` to customize the hero section:
- Main headline (line ~104)
- Subheadline text (line ~113)
- CTA button text and links (line ~119)
- Feature badges in `FEATURES_DATA` array (line ~48)

### 3. Projects

Update the `PROJECTS_DATA` array in `app/page.tsx`:

```typescript
const PROJECTS_DATA = [
  {
    id: 1,
    title: "Your Project",
    description: "Project description",
    tags: ["Tech", "Stack"],
    link: "#",
  },
  // Add more projects...
]
```

### 4. About & Contact

- **About section:** Edit content in `app/page.tsx` (line ~196)
- **Contact links:** Update `SOCIAL_LINKS` array (line ~65)

### 5. Colors & Styling

Customize the dark theme in `app/globals.css`:
- CSS variables for colors (line ~15)
- Modify Tailwind config in `tailwind.config.ts`

## 📁 Project Structure

```
dark-react-developer-bundle/
├── app/
│   ├── globals.css          # Global styles and theme variables
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main homepage component
├── components/
│   ├── site-navbar.tsx      # Navigation bar component
│   └── ui/                  # shadcn/ui components
│       ├── button.tsx
│       ├── badge.tsx
│       ├── separator.tsx
│       └── sheet.tsx
├── config/
│   └── site.ts              # Site configuration
├── lib/
│   └── utils.ts             # Utility functions
└── public/                  # Static assets
```

## 🎨 Tech Stack

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **[shadcn/ui](https://ui.shadcn.com/)** - UI component library
- **[lucide-react](https://lucide.dev/)** - Icon library

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚢 Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Other Platforms

This project can also be deployed to:
- Netlify
- Railway
- AWS Amplify
- Any platform supporting Node.js

## 📚 shadcn/ui Components Used

This template includes the following shadcn/ui components:

- Button
- Badge
- Separator
- Sheet

To add more components, use:

```bash
npx shadcn-ui@latest add [component-name]
```

## 🔧 Adding More Features

### Adding a New Section

1. Create a new section in `app/page.tsx`
2. Add an ID for anchor linking
3. Update navigation in `config/site.ts`

### Adding a Contact Form

Consider integrating:
- [React Hook Form](https://react-hook-form.com/)
- [EmailJS](https://www.emailjs.com/)
- [Resend](https://resend.com/)

### Adding Analytics

Easy integrations:
- [Vercel Analytics](https://vercel.com/analytics)
- [Google Analytics](https://analytics.google.com/)
- [Plausible](https://plausible.io/)

## 🐛 Troubleshooting

### Build Errors

If you encounter build errors:

```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

### TypeScript Errors

Check your `tsconfig.json` settings and ensure all types are properly imported.

### Styling Issues

Make sure Tailwind CSS is properly configured and your `globals.css` is imported in `layout.tsx`.

## 📄 License

This is a digital product template. Once purchased, you can use it for personal or commercial projects.

## 🤝 Support

For questions or issues, please refer to the documentation PDF included with your purchase.

---

**Built with ❤️ using Next.js and Tailwind CSS**

