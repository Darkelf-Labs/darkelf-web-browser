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
  // Darkelf Shadow 7.0.13
  // -------------------------------------------------------------------------

  {
    "product": "shadow",
    "channel": "stable",
    "version": "7.0.13",
    "dateISO": "2026-10-03",
    "releasePageUrl": "https://github.com/Darkelf-Labs/Darkelf-Shadow-CE/releases/tag/v.7.0.13",
    "zipballUrl": "https://api.github.com/repos/Darkelf-Labs/Darkelf-Shadow-CE/zipball/v.7.0.13",
    "highlights": [
      "Session cleanup on normal application exit",
      "Off-the-record PyPI and named native macOS profiles",
      "Browser controls restored when changing tabs during video fullscreen",
      "Validated View Source fallback with an 8 MiB download limit",
      "Panic and lockdown checks applied before compatibility exceptions",
      "Clearer Smart Canvas and profile status in Settings"
    ],
    "notesMarkdown": `
# Darkelf Shadow CE 7.0.13

A session-cleanup, privacy-status and browser reliability update for the 7.x series, retaining faster filter startup and playback improvements.

## Session profiles and cleanup

- Python/PyPI and ordinary source launches use an **off-the-record profile**.
- The native macOS ARM64 app retains its **named Darkelf profile** for native authentication.
- Both profiles use memory HTTP caching and nonpersistent cookies.
- Normal application exit—including closing the last window, Cmd+Q and Delete & Quit—now schedules session cleanup.
- Named-profile cleanup waits for the browser to exit and its storage files to close before deleting selected website data.
- Preserve native authentication configuration and credentials separately from website-session cleanup.

Downloads, filter caches and other deliberately saved files can remain. Cleanup is not guaranteed after a crash or forced termination.

## Browser reliability

- Restore the tab bar and URL bar when opening or switching tabs during website video fullscreen.
- Ignore stale fullscreen events from background or deleted pages.
- Preserve checks against deleted Qt views during delayed keyboard-filter installation.
- Validate HTTP/HTTPS URLs and redirects used by the View Source fallback.
- Limit fallback source downloads to **8 MiB**, with an explanatory source-tab error for oversized responses.
- Preserve literal HTML display without executing the displayed source.

The source-download limit does not restrict normal browsing or file downloads.

## Privacy controls and settings

- Apply panic and lockdown checks before compatibility exceptions in the request interceptor.
- Recognize private IP addresses through address parsing rather than hostname-prefix matching.
- Report **BLOCKED / PROTECTED / TRUSTED / COMPATIBLE** canvas states more accurately.
- Identify compatibility cases where JavaScript canvas protection is bypassed.
- Show the active profile's off-the-record or named status in Settings.
- Clarify Smart Canvas, compatibility exceptions and Quantum session-state behavior.

Automatic verification compatibility remains enabled. Console-based verification signals remain spoofable; a TRUSTED status is not proof that a human completed verification.

## Retained performance and filtering improvements

- Cached filter-list downloads and merged subscriptions.
- Concurrent list refreshes with preserved source order.
- Direct matching for simple rules and regex compilation for complex patterns.
- Duplicate-pattern reuse and startup timing diagnostics.
- Correct handling of unsupported cookie, scriptlet and page-action rules.
- Embedded Darkelf site-boundary rules without a separate \`.dat\` file.
- Reduced repeated canvas logging and optional diagnostics through \`DARKELF_DIAGNOSTICS=1\`.

Earlier developer measurements reduced filter initialization from approximately **38 seconds to 6 seconds** with about 417,000 network rules. This measures filter loading and indexing, not total application startup.

CNN10 playback was confirmed in developer testing after the parser correction. Site-boundary coverage remains curated rather than worldwide.

## Authentication and media

The custom macOS ARM64 Qt WebEngine **6.11.2** retains native WebAuthn integration, H.264/AVC support, native WebGL modifications and disabled WebRTC.

Apple-specific passkey compatibility still depends on signing, keychain entitlements, provisioning and website behavior. **7.0.13 does not claim to resolve the pending Apple entitlement dependency.**

H.264 support does not provide DRM support. Widevine is not bundled. Custom engine patches are not included in standard PyPI dependencies.

## Release verification

- Corrected the Bandit workflow to fail on findings instead of suppressing the exit status.
- Added post-test framework cleanup and final re-signing to the native build guide.
- Verify the built app and extracted ZIP before notarization.
- Retain Developer ID signing, hardened runtime, notarization, stapling and embedded licensing notices.

Verify the DMG beside its checksum file:

\`\`\`bash
shasum -a 256 -c Darkelf-Shadow-7.0.13.dmg.sha256
\`\`\`

## Validation

Targeted checks covered profile selection, session cleanup, privacy-policy handling and bounded source downloads. Updated files passed applicable syntax, Ruff and Bandit checks.

These checks do not constitute an independent professional security audit.

## Acknowledgments

Thanks to the **Mecha Comet Team**, **Tim Burns**, and everyone testing and supporting Darkelf Shadow.

**Dr. Kevin Moore · Darkelf Project — Shadow Edition**
`,
    "artifacts": [
      {
        "platform": "macos",
        "arch": "any",
        "fileType": "pypi",
        "url": "",
        "installCommand": "pip install --upgrade darkelf-shadow"
      },
      {
        "platform": "windows",
        "arch": "any",
        "fileType": "pypi",
        "url": "",
        "installCommand": "pip install --upgrade darkelf-shadow"
      },
      {
        "platform": "linux",
        "arch": "any",
        "fileType": "pypi",
        "url": "",
        "installCommand": "pip install --upgrade darkelf-shadow"
      },
      {
        "platform": "macos",
        "arch": "arm64",
        "fileType": "dmg",
        "url": "https://github.com/Darkelf-Labs/Darkelf-Shadow-CE/releases/download/v.7.0.13/Darkelf-Shadow-7.0.13.dmg",
        "sizeBytes": 347403851,
        "notesUrl": "https://github.com/Darkelf-Labs/Darkelf-Shadow-CE/releases/tag/v.7.0.13"
      }
    ]
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


