// ---------------------------------------------------------------------------
// Darkelf Release Notes Data Store
// ---------------------------------------------------------------------------
// This file powers the Release History pages.
// Downloads are managed separately by the Download Center.
// ---------------------------------------------------------------------------

export type ProductId =
  | "cocoa"
  | "shadow";

export type Channel =
  | "stable"
  | "beta"
  | "alpha"
  | "nightly"
  | "lts";

export type Platform =
  | "windows"
  | "linux"
  | "macos";

export type Architecture =
  | "x64"
  | "arm64"
  | "universal";

export type FileType =
  | "exe"
  | "appimage"
  | "dmg"
  | "zip"
  | "tar.gz";

export interface Artifact {
  platform: Platform;
  arch: Architecture;
  fileType: FileType;
  url: string;
  sizeBytes: number;
  sha256: string;
  notesUrl?: string;
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
  {
    product: "cocoa",
    channel: "stable",
    version: "7.0.7",
    dateISO: "2026-07-28",
    releasePageUrl: "",
    zipballUrl: "",
    highlights: [
      "Native macOS browser built with Cocoa, WebKit and PyObjC",
      "Ephemeral browsing with no persistent cookies, cache or history",
      "MiniAI Sentinel security monitoring",
      "Canvas fingerprint protection",
      "First-party isolation",
      "Improved tracker blocking",
      "Performance and stability improvements",
    ],
    notesMarkdown: `
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
        arch: "universal",
        fileType: "dmg",
        url: "",
        sizeBytes: 0,
        sha256: "",
        notesUrl: "",
      },
    ],
  },
  {
    product: "shadow",
    channel: "stable",
    version: "7.0.5",
    dateISO: "2026-07-28",
    releasePageUrl: "",
    zipballUrl: "",
    highlights: [
      "Privacy-first browser built with PySide6 and QtWebEngine",
      "Ephemeral browsing",
      "MiniAI Sentinel improvements",
      "Enhanced tracker protection",
      "WebRTC disabled by default",
      "Cross-platform support",
      "Performance improvements",
    ],
    notesMarkdown: `
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
      {
        platform: "windows",
        arch: "x64",
        fileType: "exe",
        url: "",
        sizeBytes: 0,
        sha256: "",
        notesUrl: "",
      },
      {
        platform: "linux",
        arch: "x64",
        fileType: "appimage",
        url: "",
        sizeBytes: 0,
        sha256: "",
        notesUrl: "",
      },
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
