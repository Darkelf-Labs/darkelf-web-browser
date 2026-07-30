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
export type { Release, Artifact, ProductId, Channel, Platform, FileType };

// ---------------------------------------------------------------------------
// Query helpers
// ---------------------------------------------------------------------------

/** All releases, latest first. */
export function getAllReleases(): Release[] {
  return [...releases].sort(
    (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
  );
}

/** All releases for a given product, latest first. */
export function getReleasesByProduct(product: ProductId): Release[] {
  return getAllReleases().filter((r) => r.product === product);
}

/** Look up a single release by product + version. Returns undefined if not found. */
export function getRelease(
  product: ProductId,
  version: string
): Release | undefined {
  return releases.find(
    (r) => r.product === product && r.version === version
  );
}

/**
 * Latest stable release for a product; falls back to latest nightly if no
 * stable release exists (e.g. Shadow Lite during rewrite).
 */
export function getLatestRelease(product: ProductId): Release | undefined {
  const list = getReleasesByProduct(product);
  return list.find((r) => r.channel === "stable") ?? list[0];
}

/** Get a specific artifact from a release. */
export function getArtifact(
  release: Release,
  platform: Platform
): Artifact | undefined {
  return release.artifacts.find((a) => a.platform === platform);
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

/** Returns true only if this URL is allowed to be used as a download target. */
export function isAllowedDownloadUrl(url: string): boolean {
  try {
    const { hostname } = new URL(url);
    return ALLOWED_DOWNLOAD_HOSTNAMES.has(hostname);
  } catch {
    return false;
  }
}

/** Validate and resolve a download request from query params.
 *  Returns the artifact + release, or a typed error. */
export type DownloadResolveResult =
  | { ok: true; release: Release; artifact: Artifact }
  | { ok: false; reason: "missing_params" | "not_found" | "bad_url" | "unknown_platform" };

export function resolveDownload(
  product: string | null,
  platform: string | null,
  version: string | null
): DownloadResolveResult {
  if (!product || !platform || !version) {
    return { ok: false, reason: "missing_params" };
  }

  const validProducts: ProductId[] = ["cocoa", "shadow"];
  const validPlatforms: Platform[] = ["windows", "linux", "macos"];

  if (!validProducts.includes(product as ProductId)) {
    return { ok: false, reason: "not_found" };
  }
  if (!validPlatforms.includes(platform as Platform)) {
    return { ok: false, reason: "unknown_platform" };
  }

  const release = getRelease(product as ProductId, version);
  if (!release) {
    return { ok: false, reason: "not_found" };
  }

  const artifact = getArtifact(release, platform as Platform);
  if (!artifact) {
    return { ok: false, reason: "not_found" };
  }

  if (!isAllowedDownloadUrl(artifact.url)) {
    return { ok: false, reason: "bad_url" };
  }

  return { ok: true, release, artifact };
}

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

export function formatDate(isoDate: string): string {
  const d = new Date(isoDate + "T00:00:00Z");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function platformLabel(platform: Platform): string {
  if (platform === "windows") return "Windows";
  if (platform === "macos") return "macOS";
  return "Linux";
}

export function fileTypeLabel(fileType: FileType): string {
  if (fileType === "exe") return ".exe";
  if (fileType === "dmg") return ".dmg";
  if (fileType === "zip") return ".zip (source)";
  return ".AppImage";
}

/** Render markdown safely as plain text paragraphs (no raw HTML). */
export function markdownToSafeLines(md: string): string[] {
  return md.split("\n").filter(Boolean);
}
