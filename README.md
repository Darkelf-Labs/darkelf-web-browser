# 🌐 Darkelf Website

The official website for **Darkelf Browser**, rebuilt with **Next.js** and **TypeScript** as a fast, secure, and fully static website while preserving Darkelf's signature cyber-inspired design.

## Features

- ⚡ Built with **Next.js 16 (App Router)** and **TypeScript**
- 📦 Fully static export for simple, secure deployment
- 🎨 Modern responsive design with the Darkelf neon aesthetic
- 🔒 Privacy-first architecture with no third-party trackers
- 🖼️ Local assets and Bootstrap Icons (no external CDN dependencies)
- 🔍 SEO-ready with sitemap, robots.txt, metadata, Open Graph, and structured JSON-LD
- 🚀 Optimized for GitHub Pages deployment

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- React
- Static Export (`output: "export"`)
- Bootstrap Icons (bundled locally)
- CSS Modules & Global CSS

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run ESLint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

The static website will be generated in the `out/` directory.

Preview the production build locally:

```bash
npm run serve
```

## Project Structure

```
app/
 ├── layout.tsx        # Root layout, metadata, SEO, CSP
 ├── page.tsx          # Homepage
 ├── globals.css       # Global styling and animations
 ├── robots.ts         # robots.txt
 └── sitemap.ts        # sitemap.xml

public/
 ├── images/
 ├── icons/
 ├── favicon files
 ├── og-image.png
 └── CNAME
```

## Deployment

The website is automatically deployed to **GitHub Pages** using GitHub Actions.

- Static export generated from `out/`
- Custom domain:
  **https://darkelfbrowser.com**
- Workflow:
  `.github/workflows/deploy.yml`

## Security

The website is designed with a security-first approach.

- Content Security Policy (CSP) delivered via `<meta http-equiv>` for GitHub Pages compatibility.
- No third-party JavaScript analytics or tracking.
- Local fonts, images, and icon assets where practical.
- Additional HTTP security headers (HSTS, X-Frame-Options, Permissions-Policy, etc.) require a reverse proxy or CDN (such as Cloudflare) because GitHub Pages cannot serve custom HTTP response headers.

## License

See the repository's LICENSE file for licensing information.
