import type { Platform, Release } from "@/lib/releases";

import {
  getArtifact,
  formatBytes,
  platformLabel,
  fileTypeLabel,
  isAllowedDownloadUrl,
} from "@/lib/releases";

interface DownloadCTAProps {
  release: Release;
  platform: Platform;
  className?: string;
  /** Fallback URL to link to when the artifact is a placeholder (e.g. GitHub releases page) */
  fallbackUrl?: string;
}

export function DownloadCTA({
  release,
  platform,
  className = "",
  fallbackUrl,
}: DownloadCTAProps) {
  const artifact = getArtifact(release, platform);

  const isPlaceholder =
    !artifact ||
    artifact.url.includes("TODO_");

  const isValid =
    Boolean(artifact) &&
    isAllowedDownloadUrl(artifact!.url) &&
    !isPlaceholder;

  const label = `Download for ${platformLabel(platform)} (${
    artifact ? fileTypeLabel(artifact.fileType) : ""
  })`;

  // Normalize optional sizeBytes to a definite number.
  const sizeBytes = artifact?.sizeBytes ?? 0;

  const size =
    sizeBytes > 0
      ? ` — ${formatBytes(sizeBytes)}`
      : "";

  if (!isValid) {
    if (fallbackUrl) {
      return (
        <a
          className={`btn primary dl-cta ${className}`}
          href={fallbackUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${platformLabel(platform)} release on GitHub`}
        >
          <i
            className={`bi ${
              platform === "windows"
                ? "bi-windows"
                : platform === "macos"
                ? "bi-apple"
                : "bi-ubuntu"
            }`}
            aria-hidden="true"
          />

          <span>
            {platformLabel(platform)} — View on GitHub
          </span>
        </a>
      );
    }

    return (
      <span
        className={`dl-cta dl-cta--pending ${className}`}
        aria-label={`${label} — not yet available`}
      >
        <i
          className="bi bi-hourglass-split"
          aria-hidden="true"
        />

        <span>
          {platformLabel(platform)} — Coming Soon
        </span>
      </span>
    );
  }

  const confirmUrl =
    `/download?product=${release.product}` +
    `&platform=${platform}` +
    `&version=${encodeURIComponent(release.version)}`;

  return (
    <a
      className={`btn primary dl-cta ${className}`}
      href={confirmUrl}
      aria-label={`${label}${size}`}
    >
      <i
        className={`bi ${
          platform === "windows"
            ? "bi-windows"
            : platform === "macos"
            ? "bi-apple"
            : "bi-ubuntu"
        }`}
        aria-hidden="true"
      />

      <span>{label}</span>
    </a>
  );
}
