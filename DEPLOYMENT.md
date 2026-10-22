# Deployment Guide

This guide covers deploying your Dark React Developer Bundle to various hosting platforms.

> **Heads up:** the template requires **no environment variables** out of the box. All content lives in `data/projects.json`, which is tracked in git. Every push to your main branch redeploys the latest portfolio.

## Recommended: Vercel (Easiest)

Vercel is built by the creators of Next.js and offers the best integration.

### Deploy with Vercel

**Option 1: Deploy from GitHub (Recommended)**

> **License note:** This template is **MIT-licensed** and free to host in a public or private repo. See `LICENSE.md`.

1. **Push your code to GitHub** (public or private):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **Done!** Your site will be live in ~2 minutes

**Option 2: Deploy with Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts
```

### Custom Domain on Vercel

1. Go to your project on Vercel
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. SSL certificate auto-generated

---

## Netlify

### Deploy to Netlify

1. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18 or higher

2. **Deploy Options:**

   **Via Git:**
   - Connect your GitHub/GitLab repository
   - Netlify auto-deploys on push

   **Via CLI:**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Deploy
   netlify deploy --prod
   ```

3. **Environment Variables:**
   - Not required by the default template. Add any you introduce later (analytics, contact-form provider, etc.) under "Site settings" → "Environment variables".

---

## Railway

### Deploy to Railway

1. **Via GitHub:**
   - Connect your repository at [railway.app](https://railway.app)
   - Railway auto-detects Next.js
   - Click "Deploy"

2. **Via CLI:**
   ```bash
   # Install Railway CLI
   npm i -g @railway/cli

   # Login and deploy
   railway login
   railway init
   railway up
   ```

3. **Custom Domain:**
   - Go to project settings
   - Add custom domain
   - Update DNS records

---

## AWS Amplify

### Deploy to AWS Amplify

1. **Connect Repository:**
   - Sign in to AWS Amplify Console
   - Connect your GitHub repository
   - Grant access permissions

2. **Build Settings:**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

3. **Deploy:**
   - Save settings and deploy
   - Auto-deploys on git push

---

## DigitalOcean App Platform

### Deploy to DigitalOcean

1. **Create App:**
   - Go to [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform)
   - Connect your repository
   - Choose "Next.js" as framework

2. **Settings:**
   - Build command: `npm run build`
   - Run command: `npm run start`
   - HTTP port: 3000

3. **Deploy:**
   - Click "Create Resources"
   - First deploy takes 5-10 minutes

---

## Traditional VPS (Advanced)

For deploying on your own server (Ubuntu example):

### Prerequisites

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 (process manager)
sudo npm install -g pm2
```

### Deploy

```bash
# Clone your repository
git clone your-repo-url
cd your-project

# Install dependencies
npm install

# Build
npm run build

# Start with PM2
pm2 start npm --name "portfolio" -- start

# Make PM2 restart on reboot
pm2 startup
pm2 save
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com
```

---

## Pre-Deployment Checklist

Before deploying, make sure you've:

- [ ] Edited `data/projects.json` with your real projects (and removed the example ones)
- [ ] Updated `config/site.ts` (name, role, description, contact, nav, social URLs)
- [ ] Customized hero copy in `components/home-page-client.tsx`
- [ ] Replaced placeholder links with real URLs throughout
- [ ] Added your project images under `public/` (if any) and referenced them via `coverImage` / `screenshots` in `data/projects.json`
- [ ] Tested locally with `npm run build && npm run start`
- [ ] Configured any environment variables you introduced (none required by default)
- [ ] Tested on mobile devices
- [ ] Checked all links work
- [ ] Reviewed for typos

---

## Post-Deployment

### Add Analytics

**Vercel Analytics:**
```bash
npm install @vercel/analytics
```

In `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

**Google Analytics:**

Add to `app/layout.tsx` head section.

### Monitor Performance

- Use [PageSpeed Insights](https://pagespeed.web.dev/)
- Check [GTmetrix](https://gtmetrix.com/)
- Monitor Core Web Vitals in search console

### SEO

1. **Submit sitemap:**
   - Google Search Console
   - Bing Webmaster Tools

2. **Create sitemap.xml:**
   ```typescript
   // app/sitemap.ts
   export default function sitemap() {
     return [
       {
         url: 'https://yourdomain.com',
         lastModified: new Date(),
         changeFrequency: 'monthly',
         priority: 1,
       },
     ]
   }
   ```

3. **Add robots.txt:**
   ```typescript
   // app/robots.ts
   export default function robots() {
     return {
       rules: {
         userAgent: '*',
         allow: '/',
       },
       sitemap: 'https://yourdomain.com/sitemap.xml',
     }
   }
   ```

---

## Environment Variables

The default template requires **no** environment variables. You only need them if you introduce backend integrations later (analytics, a contact-form provider, etc.).

### Local (.env.local)

Create the file at the project root only when you need it:

```env
# Examples — these are NOT required by the default template
RESEND_API_KEY=your-key
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yoursite.com
```

`.env.local` is gitignored — secrets stay on your machine.

### Production

Add environment variables in your hosting platform:

- **Vercel:** Project Settings → Environment Variables
- **Netlify:** Site Settings → Environment Variables
- **Railway:** Project → Variables
- **Amplify:** App Settings → Environment Variables

**Note:** Variables starting with `NEXT_PUBLIC_` are exposed to the browser. Never put secrets behind that prefix.

---

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild locally
rm -rf .next node_modules
npm install
npm run build
```

### Port Issues

Make sure your hosting platform is configured for port 3000 or uses the `PORT` environment variable:

```typescript
// If needed in production
const port = process.env.PORT || 3000
```

### 404 on Refresh

This shouldn't happen with Next.js, but if it does:
- Check your hosting platform's routing configuration
- Ensure it's set up for Single Page Applications

---

## Support

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)

---

**Your portfolio is ready to go live! 🚀**

