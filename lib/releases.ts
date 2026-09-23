// ---------------------------------------------------------------------------
// Release data helpers — all pure functions, no side effects
// ---------------------------------------------------------------------------

import {
  releases,
  type Release,
  type Artifact,
  type ProductId,
  type Channel,
  type Platform,
  type FileType,
} from "@/data/releases";

import { ALLOWED_DOWNLOAD_HOSTNAMES } from "@/lib/config";

// Re-export types for convenience
export type {
  Release,
  Artifact,
  ProductId,
  Channel,
  Platform,
  FileType,
};

// ---------------------------------------------------------------------------
// Query helpers
// ---------------------------------------------------------------------------

/** All releases, latest first. */
export function getAllReleases(): Release[] {
  return [...releases].sort(
    (a, b) =>
      new Date(b.dateISO).getTime() -
      new Date(a.dateISO).getTime()
  );
}

/** All releases for a given product, latest first. */
export function getReleasesByProduct(
  product: ProductId
): Release[] {
  return getAllReleases().filter(
    (release) => release.product === product
  );
}

/**
 * Look up a single release by product + version.
 * Returns undefined if not found.
 */
export function getRelease(
  product: ProductId,
  version: string
): Release | undefined {
  return releases.find(
    (release) =>
      release.product === product &&
      release.version === version
  );
}

/**
 * Latest stable release for a product.
 * Falls back to the latest available release if no stable
 * release exists.
 */
export function getLatestRelease(
  product: ProductId
): Release | undefined {
  const list = getReleasesByProduct(product);

  return (
    list.find((release) => release.channel === "stable") ??
    list[0]
  );
}

/**
 * Get the first artifact/distribution for a platform.
 *
 * A platform can have more than one distribution method.
 * For example, macOS Shadow can have both PyPI and DMG.
 */
export function getArtifact(
  release: Release,
  platform: Platform
): Artifact | undefined {
  return release.artifacts.find(
    (artifact) => artifact.platform === platform
  );
}

/**
 * Return every distribution available for a platform.
 *
 * Useful when a platform has both a package-manager
 * installation and a packaged application.
 */
export function getArtifacts(
  release: Release,
  platform: Platform
): Artifact[] {
  return release.artifacts.filter(
    (artifact) => artifact.platform === platform
  );
}

/**
 * Return the PyPI distribution for a release/platform.
 */
export function getPyPIArtifact(
  release: Release,
  platform?: Platform
): Artifact | undefined {
  return release.artifacts.find(
    (artifact) =>
      artifact.fileType === "pypi" &&
      (!platform || artifact.platform === platform)
  );
}

/**
 * Return downloadable file artifacts only.
 *
 * PyPI entries are installation methods rather than
 * direct file downloads handled by the site's download flow.
 */
export function getDownloadArtifacts(
  release: Release
): Artifact[] {
  return release.artifacts.filter(
    (artifact) => artifact.fileType !== "pypi"
  );
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

/**
 * Returns true only if this URL is allowed to be used
 * as a direct download target.
 */
export function isAllowedDownloadUrl(
  url: string
): boolean {
  if (!url) {
    return false;
  }

  try {
    const { hostname } = new URL(url);

    return ALLOWED_DOWNLOAD_HOSTNAMES.has(hostname);
  } catch {
    return false;
  }
}

/**
 * Validate and resolve a direct-download request.
 *
 * PyPI distributions are intentionally excluded from this
 * flow because they use an installation command rather than
 * a direct binary download.
 */
export type DownloadResolveResult =
  | {
      ok: true;
      release: Release;
      artifact: Artifact;
    }
  | {
      ok: false;
      reason:
        | "missing_params"
        | "not_found"
        | "bad_url"
        | "unknown_platform";
    };

export function resolveDownload(
  product: string | null,
  platform: string | null,
  version: string | null
): DownloadResolveResult {
  if (!product || !platform || !version) {
    return {
      ok: false,
      reason: "missing_params",
    };
  }

  const validProducts: ProductId[] = [
    "cocoa",
    "shadow",
  ];

  const validPlatforms: Platform[] = [
    "windows",
    "linux",
    "macos",
  ];

  if (!validProducts.includes(product as ProductId)) {
    return {
      ok: false,
      reason: "not_found",
    };
  }

  if (!validPlatforms.includes(platform as Platform)) {
    return {
      ok: false,
      reason: "unknown_platform",
    };
  }

  const release = getRelease(
    product as ProductId,
    version
  );

  if (!release) {
    return {
      ok: false,
      reason: "not_found",
    };
  }

  /*
   * Direct-download flow only.
   *
   * If a platform has both PyPI and DMG, select the
   * downloadable artifact rather than the PyPI entry.
   */
  const artifact = release.artifacts.find(
    (candidate) =>
      candidate.platform === platform &&
      candidate.fileType !== "pypi"
  );

  if (!artifact) {
    return {
      ok: false,
      reason: "not_found",
    };
  }

  if (!isAllowedDownloadUrl(artifact.url)) {
    return {
      ok: false,
      reason: "bad_url",
    };
  }

  return {
    ok: true,
    release,
    artifact,
  };
}

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

export function formatBytes(
  bytes: number
): string {
  if (bytes <= 0) {
    return "";
  }

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  if (bytes < 1024 * 1024 * 1024) {
    return `${(
      bytes /
      (1024 * 1024)
    ).toFixed(1)} MB`;
  }

  return `${(
    bytes /
    (1024 * 1024 * 1024)
  ).toFixed(2)} GB`;
}

export function formatDate(
  isoDate: string
): string {
  const date = new Date(
    isoDate + "T00:00:00Z"
  );

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function platformLabel(
  platform: Platform
): string {
  if (platform === "windows") {
    return "Windows";
  }

  if (platform === "macos") {
    return "macOS";
  }

  return "Linux";
}

export function fileTypeLabel(
  fileType: FileType
): string {
  switch (fileType) {
    case "pypi":
      return "PyPI";

    case "exe":
      return ".exe";

    case "appimage":
      return ".AppImage";

    case "dmg":
      return ".dmg";

    case "zip":
      return ".zip";

    case "tar.gz":
      return ".tar.gz";

    default:
      return fileType;
  }
}

/**
 * Render markdown safely as structured plain-text lines.
 * No raw HTML is injected.
 */
export function markdownToSafeLines(
  md: string
): string[] {
  return md
    .split("\n")
    .filter((line) => line.trim().length > 0);
}
