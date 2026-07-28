// ---------------------------------------------------------------------------
// Download resolver config — SAFE DOMAIN ALLOWLIST
// ---------------------------------------------------------------------------
// Only artifact URLs originating from these hostnames will be followed.
// NEVER add untrusted domains here.
// ---------------------------------------------------------------------------

export const ALLOWED_DOWNLOAD_HOSTNAMES: ReadonlySet<string> = new Set([
  "github.com",
  "objects.githubusercontent.com",
]);

// TODO: Replace slugs once real repos are created
export const REPO_CONFIG = {
  cocoa: {
    org: "Darkelf2024",
    repo: "Darkelf-Cocoa-Browser",
    url: "https://github.com/Darkelf2024/Darkelf-Cocoa-Browser",
    releasesUrl: "https://github.com/Darkelf2024/Darkelf-Cocoa-Browser/releases",
  },
  shadow: {
    org: "Darkelf2024",
    repo: "Darkelf-Shadow-CE",
    url: "https://github.com/Darkelf2024/Darkelf-Shadow-CE",
    releasesUrl: "https://github.com/Darkelf2024/Darkelf-Shadow-CE/releases",
  },
  osint_ai: {
    org: "Darkelf2024",
    repo: "Darkelf-OSINT-Ai",
    url: "https://github.com/Darkelf2024/Darkelf-OSINT-Ai",
    releasesUrl: "https://github.com/Darkelf2024/Darkelf-OSINT-Ai/releases",
  },
} as const;

export const PRODUCT_META = {
  cocoa: {
    displayName: "Darkelf Cocoa",
    tagline: "Native macOS Privacy Browser",
    shortDescription:
      "Native macOS browser built with Cocoa, WebKit, and PyObjC. Designed for ephemeral browsing, privacy by default, first-party isolation, tracker blocking, and hardened WebKit security.",
    color: "var(--accent)",
    colorRgb: "54,255,154",
  },

  shadow: {
    displayName: "Darkelf Shadow",
    tagline: "Cross-Platform Privacy Browser",
    shortDescription:
      "Privacy-first browser built with PySide6 and QtWebEngine. Features ephemeral browsing, tracker and advertisement blocking, hardened network protections, MiniAI Sentinel, and cross-platform support for Windows, Linux, and macOS.",
    color: "var(--accent-2)",
    colorRgb: "0,234,255",
  },

  osint_ai: {
    displayName: "Darkelf OSINT AI",
    tagline: "AI-Assisted Open-Source Intelligence",
    shortDescription:
      "AI-powered OSINT toolkit combining traditional investigative workflows with local AI reasoning for privacy-conscious research and analysis.",
    color: "var(--accent-4)",
    colorRgb: "255,152,0",
  },
} as const;
