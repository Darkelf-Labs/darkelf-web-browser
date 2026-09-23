// ---------------------------------------------------------------------------
// Darkelf Release Notes Data Store
// ---------------------------------------------------------------------------
// This file powers the Darkelf Release History.
//
// A release may be distributed through one or more methods:
//   - PyPI / pip
//   - macOS DMG
//   - Windows executable
//   - Linux AppImage
//   - ZIP / tar.gz
//
// Installation and download actions are presented separately by the
// Download Center.
// ---------------------------------------------------------------------------

export type ProductId =
  | "cocoa"
  | "shadow";

export type Channel =
  | "stable"
  | "beta"
  | "alpha"
  | "lts";

export type Platform =
  | "windows"
  | "linux"
  | "macos";

export type Architecture =
  | "x64"
  | "arm64"
  | "universal"
  | "any";

export type FileType =
  | "pypi"
  | "exe"
  | "appimage"
  | "dmg"
  | "zip"
  | "tar.gz";

export interface Artifact {
  platform: Platform;
  arch: Architecture;
  fileType: FileType;

  // Direct download or package page when applicable.
  url: string;

  // Optional for package-manager distributions such as PyPI.
  sizeBytes?: number;
  sha256?: string;

  notesUrl?: string;

  // Used for package-manager distributions such as PyPI.
  installCommand?: string;
}

export interface Release {
  product: ProductId;
  channel: Channel;
  version: string;
  dateISO: string;

  releasePageUrl: string;
  zipballUrl: string;

  highlights: string[];
  notesMarkdown?: string;

  artifacts: Artifact[];
}

export const releases: Release[] = [
  // -------------------------------------------------------------------------
  // Darkelf Cocoa 7.0.8
  // -------------------------------------------------------------------------

  {
    product: "cocoa",
    channel: "stable",
    version: "7.0.8",
    dateISO: "2026-07-28",

    releasePageUrl: "",
    zipballUrl: "",

    highlights: [
      "Lightweight native macOS browser built with Cocoa, WebKit and PyObjC",
      "Available through PyPI for pip installation",
      "Ephemeral browsing with no persistent cookies, cache or history",
      "MiniAI Sentinel security monitoring",
      "Canvas fingerprint protection",
      "First-party isolation",
      "Tracker blocking and privacy protections",
    ],

    notesMarkdown: `
## Darkelf Cocoa 7.0.8

Darkelf Cocoa is the lightweight native macOS browser in the Darkelf
Browser ecosystem.

It is built with Cocoa, WebKit and PyObjC and distributed through PyPI.

### Installation

\`\`\`bash
pip install darkelf-cocoa
\`\`\`

## What's New

- Improved MiniAI Sentinel.
- Enhanced tracker blocking.
- Improved session isolation.
- Better toolbar and UI responsiveness.

## Security

- Improved fingerprint protections.
- Hardened ephemeral browsing.
- Updated privacy safeguards.

## Fixes

- Various bug fixes.
- Improved stability.
- Minor UI refinements.
`,

    artifacts: [
      {
        platform: "macos",
        arch: "any",
        fileType: "pypi",
        url: "",
        installCommand: "pip install darkelf-cocoa",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // Darkelf Shadow 7.0.8
  // -------------------------------------------------------------------------

  {
    product: "shadow",
    channel: "stable",
    version: "7.0.8",
    dateISO: "2026-07-28",

    releasePageUrl: "",
    zipballUrl: "",

    highlights: [
      "Flagship Darkelf privacy browser built with PySide6 and QtWebEngine",
      "Cross-platform support for macOS, Windows and Linux",
      "Available through PyPI for cross-platform installation",
      "macOS application also available as a signed DMG release",
      "Ephemeral privacy-focused browsing",
      "MiniAI Sentinel security monitoring",
      "Enhanced tracker protection",
      "WebRTC privacy protections",
      "Performance and compatibility improvements",
    ],

    notesMarkdown: `
## Darkelf Shadow 7.0.8

Darkelf Shadow is the flagship browser in the Darkelf Browser ecosystem.

Built with PySide6 and QtWebEngine, Shadow supports macOS, Windows and Linux.

### PyPI Installation

\`\`\`bash
pip install darkelf-shadow
\`\`\`

The PyPI distribution provides the cross-platform installation path for
macOS, Windows and Linux.

A packaged macOS application is also available separately as a DMG release.

## What's New

- Improved request interception.
- Enhanced tracker blocking.
- Better MiniAI Sentinel detection.
- Updated browser internals.

## Security

- Improved WebRTC protections.
- Better privacy defaults.
- Hardened browsing environment.

## Fixes

- Startup reliability improvements.
- Rendering fixes.
- General stability improvements.
`,

    artifacts: [
      // PyPI — macOS
      {
        platform: "macos",
        arch: "any",
        fileType: "pypi",
        url: "",
        installCommand: "pip install darkelf-shadow",
      },

      // PyPI — Windows
      {
        platform: "windows",
        arch: "any",
        fileType: "pypi",
        url: "",
        installCommand: "pip install darkelf-shadow",
      },

      // PyPI — Linux
      {
        platform: "linux",
        arch: "any",
        fileType: "pypi",
        url: "",
        installCommand: "pip install darkelf-shadow",
      },

      // Packaged macOS application
      {
        platform: "macos",
        arch: "universal",
        fileType: "dmg",
        url: "",
        sizeBytes: 0,
        sha256: "",
        notesUrl: "",
      },
    ],
  },
];
