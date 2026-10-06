import shadowReleaseData from "./shadow-release.generated.json";

export type ProductId = "cocoa" | "shadow";

export type Channel = "stable" | "beta" | "alpha" | "lts";

export type Platform = "windows" | "linux" | "macos";

export type Architecture = "x64" | "arm64" | "universal" | "any";

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
  url: string;
  sizeBytes?: number;
  notesUrl?: string;
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

const shadowGenerated = shadowReleaseData as Release & {
  artifacts: Array<Artifact & { sha256?: string }>;
};

// Keep release metadata/downloads generated automatically while presenting
// concise public-facing notes and omitting SHA values from the releases page.
const shadowRelease: Release = {
  ...shadowGenerated,

  highlights: [
    "QtWebEngine privacy browser with layered tracking protection",
    "Canvas, WebGL and fingerprinting defenses",
    "WebRTC, geolocation and media-device privacy controls",
    "Darkelf filtering and MiniAI Sentinel protections",
    "Performance, compatibility and stability improvements",
  ],

  notesMarkdown: `
## Darkelf Shadow ${shadowGenerated.version}

Darkelf Shadow continues to improve privacy protection, content filtering,
browser compatibility, and performance.

### Highlights

- Improved tracker, advertising, telemetry, and nuisance filtering.
- Strengthened Canvas, WebGL, and fingerprinting protections.
- Continued WebRTC, geolocation, battery, and media-device privacy defenses.
- Refined MiniAI Sentinel monitoring and privacy controls.
- Improved website compatibility, performance, and stability.

### Platform

- Qt / QtWebEngine
- Python 3.11+
- Darkelf privacy and filtering stack
`,

  artifacts: shadowGenerated.artifacts.map(
    ({ sha256: _sha256, ...artifact }) => artifact
  ),
};

// Cocoa is maintained here from the official Darkelf Cocoa GitHub release.
const cocoaRelease: Release = {
  product: "cocoa",
  channel: "stable",
  version: "7.0.21",
  dateISO: "2026-10-06",

  releasePageUrl:
    "https://github.com/Darkelf-Labs/Darkelf-Cocoa-Browser/releases/tag/v.7.0.21",

  zipballUrl:
    "https://api.github.com/repos/Darkelf-Labs/Darkelf-Cocoa-Browser/zipball/v.7.0.21",

  highlights: [
    "Native macOS privacy browser built with Cocoa and WebKit",
    "Expanded Canvas, WebGL and fingerprinting protections",
    "Improved native content filtering and tracker resistance",
    "Enhanced Darkelf Sentinel privacy monitoring",
    "Improved stability, compatibility and native macOS behavior",
  ],

  notesMarkdown: `
## Darkelf Cocoa 7.0.21

Darkelf Cocoa 7.0.21 improves privacy protection, native WebKit filtering,
browser stability, and macOS integration.

### Highlights

- Expanded Canvas, WebGL, and fingerprinting protections.
- Improved tracker, advertising, telemetry, and nuisance filtering.
- Enhanced Darkelf Sentinel privacy and tracker detection.
- Improved browsing-session isolation and WebKit security policies.
- Refined tabs, navigation, downloads, bookmarks, and native UI behavior.
- Improved startup, compatibility, and overall stability.

### Platform

- macOS
- Native Cocoa / AppKit / WebKit
- Python 3.11+
- PyObjC
`,

  artifacts: [
    {
      platform: "macos",
      arch: "any",
      fileType: "dmg",

      url:
        "https://github.com/Darkelf-Labs/Darkelf-Cocoa-Browser/releases/download/v.7.0.21/Darkelf-Cocoa-7.0.21.dmg",

      sizeBytes: 24953253,

      notesUrl:
        "https://github.com/Darkelf-Labs/Darkelf-Cocoa-Browser/releases/tag/v.7.0.21",
    },
  ],
};

export const releases: Release[] = [
  shadowRelease,
  cocoaRelease,
];
