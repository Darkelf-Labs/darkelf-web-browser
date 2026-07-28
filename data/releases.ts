// ---------------------------------------------------------------------------
// Darkelf Download Center — Release Data Store
// ---------------------------------------------------------------------------
// TODO: Replace all TODO_* placeholders with real values before publishing.
// TODO: Replace TODO_ORG with the GitHub organisation slug, e.g. "Darkelf2024"
// TODO: Replace TODO_COCOA_REPO with the Cocoa repo name
// TODO: Replace TODO_SHADOW_REPO with the Shadow Lite repo name
// TODO: Replace TODO_SHADOW_OSINT_REPO with the Darkelf Shadow (OSINT) repo name
// TODO: Replace every SHA256 value with the real hex digest of the artifact
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Darkelf Download Center — Core Types
// ---------------------------------------------------------------------------

/** Supported Darkelf products */
export type ProductId =
  | "cocoa"
  | "shadow"
  | "osint_ai";

/** Release channels */
export type Channel =
  | "stable"
  | "beta"
  | "alpha"
  | "nightly"
  | "lts";

/** Supported operating systems */
export type Platform =
  | "windows"
  | "linux"
  | "macos";

/** Supported CPU architectures */
export type Architecture =
  | "x64"
  | "arm64"
  | "universal";

/** Supported downloadable artifact types */
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

// ---------------------------------------------------------------------------
// Seeded release data — 1 example release per product
// ---------------------------------------------------------------------------
export const releases: Release[] = [
  {
    product: "cocoa",
    channel: "stable",
    version: "7.0.4",
    dateISO: "2026-07-28",
    releasePageUrl: "",
    zipballUrl: "",
    highlights: [
      "Native macOS browser built with Cocoa, WebKit and PyObjC",
      "Ephemeral browsing with no persistent cookies, cache or history",
      "Secure Snapshot with optional PDF export",
      "TLS security indicator and certificate awareness",
      "Canvas fingerprint hardening with per-session randomization",
      "First-party isolation and tracker protection",
      "MiniAI Sentinel security monitoring",
    ],
    notesMarkdown: "",
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
    version: "7.0.4",
    dateISO: "2026-07-28",
    releasePageUrl: "",
    zipballUrl: "",
    highlights: [
      "Privacy-first browser built with PySide6 and QtWebEngine",
      "Ephemeral browsing with no persistent cookies, cache, or history",
      "Integrated tracker, advertisement, and malicious content blocking",
      "MiniAI Sentinel security monitoring and threat detection",
      "WebRTC disabled by default to reduce IP address leakage",
      "Request interception and hardened browsing protections",
      "Cross-platform support for Windows, Linux, and macOS",
    ],
    notesMarkdown: "",
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
