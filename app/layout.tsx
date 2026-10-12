import type { Metadata } from 'next';
import { releases } from '@/data/releases';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
// Self-hosted (bundled by Next, served from same origin) — no third-party CDN.
// Keeps the CSP tight and avoids leaking visitor IPs to a CDN.
import 'bootstrap-icons/font/bootstrap-icons.css';

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const siteTitle = 'Darkelf Browser — Privacy-First, Hardened, Non-Persistent';
const siteDescription =
  'Darkelf Browser: open-source, hardened, non-persistent privacy browsers for macOS, Linux, and Windows. Anti-fingerprinting, tracker protection, and reduced browsing persistence. Built for security researchers, privacy advocates, and everyday users.';
const siteUrl = 'https://darkelfbrowser.com';
const ogImage = '/icon.png';

// Keep structured-data versions in sync with the site's release history.
const cocoaRelease = releases.find(
  (release) => release.product === 'cocoa' && release.channel === 'stable',
);
const shadowRelease = releases.find(
  (release) => release.product === 'shadow' && release.channel === 'stable',
);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s — Darkelf Browser',
  },
  description: siteDescription,
  // A focused set — modern search engines ignore long keyword lists and may
  // treat stuffing as a spam signal. Topical relevance comes from page content.
  keywords: [
    'Darkelf Browser',
    'Darkelf Cocoa',
    'Darkelf Shadow',
    'privacy browser',
    'hardened browser',
    'non-persistent browser',
    'anti-fingerprinting browser',
    'open source privacy browser',
    'macOS privacy browser',
    'Linux privacy browser',
    'Windows privacy browser',
  ],
  authors: [{ name: 'Dr. Kevin Moore', url: siteUrl }],
  creator: 'Dr. Kevin Moore',
  publisher: 'Darkelf Browser',
  category: 'Technology',
  classification: 'Privacy & Security Software',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: 'Darkelf Browser',
    images: [
      {
        url: ogImage,
        width: 512,
        height: 512,
        alt: 'Darkelf Browser — Privacy-First Secure Browser',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
    creator: '@DarkelfBrowser',
    site: '@DarkelfBrowser',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/icon.png',
  },
  manifest: '/manifest.json',
  other: {
    'msapplication-TileColor': '#0a0e17',
    'theme-color': '#0a0e17',
    'application-name': 'Darkelf Browser',
    'apple-mobile-web-app-title': 'Darkelf Browser',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'mobile-web-app-capable': 'yes',
    'format-detection': 'telephone=no',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Darkelf Browser',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: siteDescription,
    foundingDate: '2024',
    founder: { '@type': 'Person', name: 'Dr. Kevin Moore' },
    knowsAbout: [
      'Privacy Browsers', 'Browser Security', 'Tracker Protection',
      'Browser Privacy', 'Anti-Fingerprinting', 'Cybersecurity',
    ],
    sameAs: [
      'https://github.com/Darkelf-Labs',
      'https://github.com/Darkelf-Labs/Darkelf-Cocoa-Browser',
      'https://github.com/Darkelf-Labs/Darkelf-Shadow-CE',
    ],
  } as const;

  const schemaWebSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Darkelf Browser',
    alternateName: 'Darkelf Download Center',
    url: siteUrl,
    description: siteDescription,
    inLanguage: 'en-US',
  } as const;

  const schemaSoftwareList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Darkelf Browser Products',
    description: 'Hardened, non-persistent, privacy-first browsers for security researchers and privacy-conscious users.',
    url: siteUrl,
    numberOfItems: 2,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'SoftwareApplication',
          name: 'Darkelf Cocoa',
          applicationCategory: 'BrowserApplication',
          operatingSystem: 'macOS',
          description: 'macOS-native Cocoa/WebKit privacy browser. Hardened, non-persistent, session-isolated. Secure Snapshot, TLS indicator, canvas hardening.',
          url: `${siteUrl}/`,
          downloadUrl: 'https://pypi.org/project/darkelf-cocoa/',
          softwareVersion: cocoaRelease?.version,
          releaseNotes: cocoaRelease
            ? `${siteUrl}/releases/cocoa/${cocoaRelease.version}`
            : undefined,
          license: 'https://opensource.org/licenses/MIT',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'SoftwareApplication',
          name: 'Darkelf Shadow',
          applicationCategory: 'BrowserApplication',
          operatingSystem: 'macOS, Linux, Windows',
          description: 'PySide6/QtWebEngine privacy browser for Linux and Windows. Hardened sandbox, request interception, no persistence, no WebRTC.',
          url: `${siteUrl}/`,
          downloadUrl: 'https://github.com/Darkelf-Labs/Darkelf-Shadow-CE/releases',
          softwareVersion: shadowRelease?.version,
          releaseNotes: shadowRelease
            ? `${siteUrl}/releases/shadow/${shadowRelease.version}`
            : undefined,
          license: 'https://opensource.org/licenses/MIT',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        },
      },
    ],
  } as const;

  const schemaFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Darkelf Browser?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Darkelf Browser is a suite of open-source, hardened, non-persistent privacy browsers built for security researchers and privacy advocates. Products include Darkelf Cocoa (macOS) and Darkelf Shadow (macOS/Linux/Windows).',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Darkelf Browser free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Darkelf Cocoa and Darkelf Shadow are available as open-source software. Consult each project repository for its current license and download options.',
        },
      },
      {
        '@type': 'Question',
        name: 'What platforms does Darkelf Browser support?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Darkelf Cocoa is macOS-only. Darkelf Shadow is developed for macOS, Linux, and Windows. Consult individual project releases for available builds.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I verify a Darkelf Browser download?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Download Darkelf only from the official project links. When a release provides a checksum, calculate the downloaded file’s SHA-256 hash and compare it with the published value.',
        },
      },
    ],
  } as const;

  return (
    <html lang="en">
      <head>
        {/* CSP enforced via meta because GitHub Pages cannot set HTTP headers.
            Header-only directives (HSTS, X-Frame-Options, frame-ancestors) are
            ignored in meta form and require a real server/CDN to enforce.
            'unsafe-eval' is added ONLY in development — Next/React dev mode needs
            eval() for debugging; the production export never includes it. */}
        <meta
          httpEquiv="Content-Security-Policy"
          content={[
            "default-src 'self'",
            `script-src 'self' 'unsafe-inline'${
              process.env.NODE_ENV !== "production" ? " 'unsafe-eval'" : ""
            }`,
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: blob:",
            "font-src 'self' data:",
            "media-src 'self' blob:",
            "connect-src 'self'",
            "base-uri 'self'",
            "form-action 'self'",
            "object-src 'none'",
            "upgrade-insecure-requests",
          ].join("; ")}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftwareList) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
        />
      </head>
      <body className={mono.className}>
        {children}
      </body>
    </html>
  );
}
