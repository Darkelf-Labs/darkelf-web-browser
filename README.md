# What is this? Home of Darkelf Web-Page!
- Darkelf Browser Next.js Site, built with Zero trust and deep love for the TS Community. 

Single-page marketing site for Darkelf Browser rebuilt with Next.js (App Router) while matching the original neon cyber aesthetic like a boss. 

## Tech
- Next.js 16 (App Router) with TypeScript
- Static export (`output: 'export'`, unoptimized images) — `npm run build` writes `out/`
- Bootstrap Icons bundled locally (no third-party CDN)
- Global CSS mirrors the original landing page styling

## Getting Started
- Install deps: `npm install`
- Dev server: `npm run dev`
- Lint: `npm run lint`
- Production build + static export: `npm run build` (output in `out/`)
- Preview the export locally: `npm run serve` (serves `out/` on http://localhost:3000)

## Project Layout
- `app/page.tsx` — main page content
- `app/layout.tsx` — metadata, global head links, JSON-LD
- `app/globals.css` — theme, layout, and animation styles
- `app/robots.ts` / `app/sitemap.ts` — SEO surfaces
- `public/` — Darkelf images, favicons, OG image

## Deployment Notes
- Deploys to **GitHub Pages** via `.github/workflows/deploy.yml` (static export uploaded from `out/`).
- Canonical domain: `https://darkelfbrowser.com` (served via `public/CNAME`).
- Security headers: GitHub Pages cannot set HTTP headers, so the CSP is delivered
  as a `<meta http-equiv>` tag in `app/layout.tsx`. Header-only protections (HSTS,
  X-Frame-Options) require a server/CDN in front (e.g. Cloudflare) to be enforced.
