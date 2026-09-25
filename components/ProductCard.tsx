import type {
  Release,
  ProductId,
} from "@/lib/releases";

import {
  formatDate,
  formatBytes,
  isAllowedDownloadUrl,
} from "@/lib/releases";

import {
  PRODUCT_META,
  REPO_CONFIG,
} from "@/lib/config";

import { StatusBadge } from "@/components/StatusBadge";

interface ProductCardProps {
  release: Release | undefined;
  productId: ProductId;

  /** Highlight the user's selected/detected platform. */
  highlightPlatform?: "windows" | "linux" | "macos" | null;
}

export function ProductCard({
  release,
  productId,
  highlightPlatform,
}: ProductCardProps) {
  const meta = PRODUCT_META[productId];
  const repo = REPO_CONFIG[productId];

  /*
   * Cocoa is a native macOS browser distributed through PyPI.
   *
   * Shadow is cross-platform through PyPI, with a signed macOS
   * DMG also available as a direct download.
   */
  const supportedPlatforms =
    productId === "cocoa"
      ? ["macos"]
      : ["macos", "windows", "linux"];

  const isFiltering =
    highlightPlatform != null;

  const isSupported =
    isFiltering &&
    supportedPlatforms.includes(
      highlightPlatform!
    );

  const isUnsupported =
    isFiltering &&
    !supportedPlatforms.includes(
      highlightPlatform!
    );

  /*
   * Only actual downloadable files belong in the download
   * button area. PyPI entries are installation methods,
   * not separate binary download buttons.
   */
  const downloadableArtifacts =
    release?.artifacts.filter(
      (artifact) =>
        artifact.fileType !== "pypi" &&
        Boolean(artifact.url) &&
        !artifact.url.includes("TODO_") &&
        isAllowedDownloadUrl(artifact.url)
    ) ?? [];

  /*
   * Shadow currently has one directly downloadable binary:
   * the signed macOS DMG.
   */
  const macDmg =
    productId === "shadow"
      ? downloadableArtifacts.find(
          (artifact) =>
            artifact.platform === "macos" &&
            artifact.fileType === "dmg"
        )
      : undefined;

  const pipCommand =
    productId === "shadow"
      ? "pip install darkelf-shadow"
      : "pip install darkelf-cocoa";

  const pipPlatformLabel =
    productId === "shadow"
      ? "macOS • Windows • Linux"
      : "macOS";

  return (
    <article
      className={`dc-product-card${
        isSupported
          ? " dc-product-card--supported"
          : ""
      }${
        isUnsupported
          ? " dc-product-card--unsupported"
          : ""
      }`}
      aria-label={`${meta.displayName} download card`}
      style={
        {
          "--card-accent": meta.color,
          "--card-accent-rgb": meta.colorRgb,
        } as React.CSSProperties
      }
    >
      {/* Header */}
      <div className="dc-product-card__header">
        <div className="dc-product-card__title-row">
          <h2 className="dc-product-card__name">
            {meta.displayName}
          </h2>

          {release && (
            <StatusBadge
              channel={release.channel}
            />
          )}

          {!release && (
            <span className="status-badge status-badge--nightly">
              <span
                className="status-badge__dot"
                aria-hidden="true"
              />
              No Releases
            </span>
          )}
        </div>

        <p className="dc-product-card__tagline">
          {meta.tagline}
        </p>

        <p className="dc-product-card__desc">
          {meta.shortDescription}
        </p>
      </div>

      {/* Highlights */}
      {release && (
        <ul
          className="dc-product-card__highlights"
          aria-label="Key features"
        >
          {release.highlights.map(
            (highlight) => (
              <li key={highlight}>
                <i
                  className="bi bi-check2"
                  aria-hidden="true"
                />
                <span>{highlight}</span>
              </li>
            )
          )}
        </ul>
      )}

      {/* Release metadata */}
      {release && (
        <div className="dc-product-card__meta">
          <span>
            <i
              className="bi bi-tag"
              aria-hidden="true"
            />{" "}
            v{release.version}
          </span>

          <span>
            <i
              className="bi bi-calendar3"
              aria-hidden="true"
            />{" "}
            {formatDate(release.dateISO)}
          </span>
        </div>
      )}

      {/* Installation / Download */}
      {release ? (
        <div
          className="dc-product-card__ctas"
          role="group"
          aria-label={`${meta.displayName} installation and download options`}
        >
          {/* PyPI */}
          <div className="dc-install-option">
            <div className="dc-install-option__label">
              <i
                className="bi bi-terminal"
                aria-hidden="true"
              />

              <span>
                Install with PyPI
              </span>
            </div>

            <div className="dc-install-option__command-row">
              <code className="mono dc-install-option__command">
                {pipCommand}
              </code>

              <span className="dc-install-option__platform">
                {pipPlatformLabel}
              </span>
            </div>
          </div>

          {/* Shadow macOS DMG */}
          {macDmg && (
            <a
              className={`btn primary dl-cta ${
                highlightPlatform === "macos"
                  ? "dl-cta--highlighted"
                  : ""
              }`}
              href={macDmg.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Download ${meta.displayName} v${release.version} for macOS`}
            >
              <i
                className="bi bi-apple"
                aria-hidden="true"
              />

              <span>
                Download macOS DMG
                {typeof macDmg.sizeBytes ===
                  "number" &&
                macDmg.sizeBytes > 0
                  ? ` — ${formatBytes(
                      macDmg.sizeBytes
                    )}`
                  : ""}
              </span>
            </a>
          )}
        </div>
      ) : (
        <div className="dc-product-card__ctas">
          <p className="dc-product-card__no-release">
            No release available yet. Check
            the repository for updates.
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="dc-product-card__footer">
        <a
          href={repo.url}
          className="dc-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${meta.displayName} repository on GitHub`}
        >
          <i
            className="bi bi-github"
            aria-hidden="true"
          />
          <span>Repository</span>
        </a>

        {release && (
          <a
            href={`/releases/${productId}/${encodeURIComponent(
              release.version
            )}`}
            className="dc-link"
            aria-label={`Release notes for ${meta.displayName} v${release.version}`}
          >
            <i
              className="bi bi-file-text"
              aria-hidden="true"
            />
            <span>Release Notes</span>
          </a>
        )}

        <a
          href={`/releases?product=${productId}`}
          className="dc-link"
          aria-label={`All ${meta.displayName} releases`}
        >
          <i
            className="bi bi-clock-history"
            aria-hidden="true"
          />
          <span>All Releases</span>
        </a>
      </div>
    </article>
  );
}
