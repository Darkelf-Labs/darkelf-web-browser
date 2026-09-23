"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import type {
  Release,
  ProductId,
  Channel,
  Platform,
} from "@/lib/releases";
import { VersionTimeline } from "@/components/VersionTimeline";
import { PlatformPills } from "@/components/PlatformPills";

interface ReleasesFilterClientProps {
  releases: Release[];
}

/**
 * Determine whether a release supports a selected platform.
 *
 * Darkelf Cocoa is a native macOS browser distributed through PyPI,
 * so it does not require a downloadable DMG artifact in the release
 * history in order to be considered a macOS release.
 *
 * Darkelf Shadow uses its artifact metadata for platform matching.
 */
function supportsPlatform(
  release: Release,
  platform: Platform | null
): boolean {
  if (!platform) {
    return true;
  }

  if (release.product === "cocoa") {
    return platform === "macos";
  }

  return release.artifacts.some(
    (artifact) => artifact.platform === platform
  );
}

function ReleasesFilterInner({
  releases,
}: ReleasesFilterClientProps) {
  /*
   * Release data is baked in at build time for static export.
   * No API polling is required.
   */
  const releasesData = releases;

  const searchParams = useSearchParams();

  const rawProduct = searchParams?.get("product") || null;

  const parsedProduct: ProductId | null =
    rawProduct === "cocoa" || rawProduct === "shadow"
      ? rawProduct
      : null;

  const [product, setProduct] =
    useState<ProductId | null>(parsedProduct);

  const [channel, setChannel] =
    useState<Channel | null>(null);

  const [platform, setPlatform] =
    useState<Platform | null>(null);

  /**
   * Count the releases matching the currently selected filters.
   */
  const totalVisible = releasesData.filter(
    (release: Release) => {
      if (product && release.product !== product) {
        return false;
      }

      if (channel && release.channel !== channel) {
        return false;
      }

      if (!supportsPlatform(release, platform)) {
        return false;
      }

      return true;
    }
  ).length;

  const clearFilters = () => {
    setProduct(null);
    setChannel(null);
    setPlatform(null);
  };

  const filtersActive =
    product !== null ||
    channel !== null ||
    platform !== null;

  return (
    <div className="releases-filter-wrap">
      {/* Filter bar */}
      <div
        className="releases-filters"
        role="group"
        aria-label="Filter release history"
      >
        {/* Product */}
        <div className="filter-group">
          <span className="filter-label">
            Product
          </span>

          <div className="platform-pills">
            <button
              className={`platform-pill ${
                product === null
                  ? "platform-pill--active"
                  : ""
              }`}
              onClick={() => setProduct(null)}
              aria-pressed={product === null}
              type="button"
            >
              All
            </button>

            <button
              className={`platform-pill ${
                product === "shadow"
                  ? "platform-pill--active"
                  : ""
              }`}
              onClick={() => setProduct("shadow")}
              aria-pressed={product === "shadow"}
              type="button"
            >
              Shadow
            </button>

            <button
              className={`platform-pill ${
                product === "cocoa"
                  ? "platform-pill--active"
                  : ""
              }`}
              onClick={() => setProduct("cocoa")}
              aria-pressed={product === "cocoa"}
              type="button"
            >
              Cocoa
            </button>
          </div>
        </div>

        {/* Channel */}
        <div className="filter-group">
          <span className="filter-label">
            Channel
          </span>

          <div className="platform-pills">
            <button
              className={`platform-pill ${
                channel === null
                  ? "platform-pill--active"
                  : ""
              }`}
              onClick={() => setChannel(null)}
              aria-pressed={channel === null}
              type="button"
            >
              All
            </button>

            <button
              className={`platform-pill ${
                channel === "stable"
                  ? "platform-pill--active"
                  : ""
              }`}
              onClick={() => setChannel("stable")}
              aria-pressed={channel === "stable"}
              type="button"
            >
              <span
                className="status-badge__dot"
                style={{
                  background: "var(--accent)",
                }}
                aria-hidden="true"
              />
              Stable
            </button>
          </div>
        </div>

        {/* Platform */}
        <div className="filter-group">
          <span className="filter-label">
            Platform
          </span>

          <PlatformPills
            value={platform}
            onChange={setPlatform}
          />
        </div>

        {/* Clear filters */}
        {filtersActive && (
          <div className="filter-group">
            <span
              className="filter-label"
              aria-hidden="true"
            >
              Reset
            </span>

            <button
              className="platform-pill"
              type="button"
              onClick={clearFilters}
            >
              <i
                className="bi bi-x-lg"
                aria-hidden="true"
              />
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Result count */}
      <p
        className="releases-count"
        aria-live="polite"
        aria-atomic="true"
      >
        Showing{" "}
        <strong>{totalVisible}</strong>{" "}
        {totalVisible === 1
          ? "release"
          : "releases"}
      </p>

      {/* Release history */}
      <VersionTimeline
        releases={releasesData}
        filterProduct={product}
        filterChannel={channel}
        filterPlatform={platform}
      />
    </div>
  );
}

export function ReleasesFilterClient(
  props: ReleasesFilterClientProps
) {
  return (
    <Suspense
      fallback={
        <div className="releases-count">
          Loading release history…
        </div>
      }
    >
      <ReleasesFilterInner {...props} />
    </Suspense>
  );
}
