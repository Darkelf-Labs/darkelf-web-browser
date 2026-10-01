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
  // Darkelf Shadow 7.0.12
  // -------------------------------------------------------------------------

  {
    product: "shadow",
    channel: "stable",
    version: "7.0.12",
    dateISO: "2026-10-01",
    releasePageUrl: "https://github.com/Darkelf-Labs/Darkelf-Shadow-CE/releases/tag/v.7.0.12",
    zipballUrl: "https://api.github.com/repos/Darkelf-Labs/Darkelf-Shadow-CE/zipball/v.7.0.12",
    highlights: [
      "Filter initialization reduced from about 38 seconds to 6 seconds in developer testing",
      "CNN10 playback restored by corrected cookie and scriptlet rule parsing",
      "Independent embedded Darkelf site-boundary rules",
      "Video fullscreen hides and restores browser controls",
      "Quieter canvas logging and optional diagnostics",
      "Smart Canvas behavior preserved"
],
    notesMarkdown: `
## Darkelf Shadow 7.0.12

A performance and compatibility update with faster filter startup, corrected rule parsing and improved browser usability.

### Faster filter startup

- Cache fresh downloaded lists and validated merged subscriptions.
- Match simple rules directly and compile regexes only for complex patterns.
- Reuse duplicate patterns during loading and report startup-stage timings.

Developer measurements with approximately 417,000 network rules reduced filter initialization from about 38 seconds to 6 seconds. This measures filter loading and indexing, not total application startup; timings vary by system and cache state.

### Filtering and CNN playback

- Skip unsupported cookie-modification rules instead of treating them as request blockers.
- Prevent scriptlet and other unsupported page-action rules from becoming network blockers.
- Preserve normal network rules, exceptions, resource-type scopes and supported cosmetic filtering.
- CNN10 playback confirmed working in developer testing after the parser fix.

### Independent Darkelf site boundaries

- Embed independently researched Darkelf rules with source references.
- No separate suffix data file, helper module or suffix download.

Coverage is curated rather than worldwide. Unknown namespaces use exact-host comparison and can cause extra blocking between related subdomains. Unlisted shared-hosting boundaries remain a coverage gap.

### Browser usability and diagnostics

- Hide browser controls during website video fullscreen and restore them on exit.
- Guard delayed keyboard-filter installation against deleted Qt views.
- Reduce repeated canvas messages and remove automatic terminal threat reports.
- Enable optional JavaScript warnings/errors and matched-filter logging with DARKELF_DIAGNOSTICS=1. Normal launches remain quiet.

### Smart Canvas, authentication and media

- Preserve BLOCKED, PROTECTED and TRUSTED modes and temporary session trust for supported human-verification flows.
- Retain the custom macOS ARM64 Qt WebEngine 6.11.2, H.264/AVC support, native WebGL modifications and disabled WebRTC.

Apple-specific passkey availability still depends on signing, keychain entitlements, provisioning and website behavior. This release does not claim to resolve every Apple authentication issue.

H.264 support is separate from DRM support. Widevine is not bundled.

### Distribution

- Python/PyPI uses platform PySide6 / Qt WebEngine with an off-the-record profile; custom macOS engine patches are not included.
- The macOS ARM64 DMG uses the custom engine and a named authentication profile, memory HTTP cache and nonpersistent cookies. Authentication state and saved files can persist separately.

### Acknowledgments

Thanks to the Mecha Comet Team, Tim Burns and everyone testing and supporting Darkelf Shadow.
`,
    artifacts: [
      {
        platform: "macos",
        arch: "any",
        fileType: "pypi",
        url: "",
        installCommand: "pip install --upgrade darkelf-shadow",
      },
      {
        platform: "windows",
        arch: "any",
        fileType: "pypi",
        url: "",
        installCommand: "pip install --upgrade darkelf-shadow",
      },
      {
        platform: "linux",
        arch: "any",
        fileType: "pypi",
        url: "",
        installCommand: "pip install --upgrade darkelf-shadow",
      },
      {
        platform: "macos",
        arch: "arm64",
        fileType: "dmg",
        url: "https://github.com/Darkelf-Labs/Darkelf-Shadow-CE/releases/download/v.7.0.12/Darkelf-Shadow-7.0.12.dmg",
        sizeBytes: 348150956,

        notesUrl: "https://github.com/Darkelf-Labs/Darkelf-Shadow-CE/releases/tag/v.7.0.12",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // Darkelf Cocoa 7.0.7
  // -------------------------------------------------------------------------

  {
    product: "cocoa",
    channel: "stable",
    version: "7.0.7",

    // Replace if the actual Cocoa 7.0.7 release date differs.
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
## Darkelf Cocoa 7.0.7

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
        sizeBytes: 0,

        installCommand: "pip install darkelf-cocoa",
      },
    ],
  },

];
