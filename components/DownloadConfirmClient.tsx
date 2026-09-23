"use client";

import Link from "next/link";
import { useState } from "react";

import type {
  Release,
  Artifact,
} from "@/lib/releases";

import {
  formatBytes,
  platformLabel,
  fileTypeLabel,
  formatDate,
} from "@/lib/releases";

import { PRODUCT_META } from "@/lib/config";

interface DownloadConfirmClientProps {
  release: Release;
  artifact: Artifact;
}

export function DownloadConfirmClient({
  release,
  artifact,
}: DownloadConfirmClientProps) {
  const [confirmed, setConfirmed] = useState(false);

  const meta = PRODUCT_META[release.product];

  const isPyPI = artifact.fileType === "pypi";

  // Normalize optional size to a definite number.
  const sizeBytes = artifact.sizeBytes ?? 0;

  const sizeLabel =
    sizeBytes > 0
      ? formatBytes(sizeBytes)
      : "—";

  return (
    <div className="dl-confirm">
      <div className="dl-confirm__card">
        <div className="dl-confirm__header">
          <i
            className="bi bi-shield-check dl-confirm__icon"
            aria-hidden="true"
          />

          <h1 className="dl-confirm__title">
            {isPyPI ? "Confirm Installation" : "Confirm Download"}
          </h1>

          <p className="dl-confirm__subtitle">
            Review the details below before{" "}
            {isPyPI ? "installing." : "downloading."}
          </p>
        </div>

        {/* Details */}
        <dl className="dl-confirm__details">
          <div className="dl-confirm__row">
            <dt>Product</dt>
            <dd>{meta.displayName}</dd>
          </div>

          <div className="dl-confirm__row">
            <dt>Version</dt>

            <dd>
              <span className="mono">
                v{release.version}
              </span>

              <span
                className={`status-badge status-badge--${release.channel}`}
                style={{ marginLeft: 8 }}
              >
                <span
                  className="status-badge__dot"
                  aria-hidden="true"
                />

                {release.channel.charAt(0).toUpperCase() +
                  release.channel.slice(1)}
              </span>
            </dd>
          </div>

          <div className="dl-confirm__row">
            <dt>Platform</dt>

            <dd>
              <i
                className={`bi ${
                  artifact.platform === "windows"
                    ? "bi-windows"
                    : artifact.platform === "macos"
                    ? "bi-apple"
                    : "bi-ubuntu"
                }`}
                aria-hidden="true"
                style={{ marginRight: 6 }}
              />

              {platformLabel(artifact.platform)}{" "}
              {fileTypeLabel(artifact.fileType)}
            </dd>
          </div>

          <div className="dl-confirm__row">
            <dt>Release Date</dt>

            <dd>
              <time dateTime={release.dateISO}>
                {formatDate(release.dateISO)}
              </time>
            </dd>
          </div>

          {isPyPI ? (
            <div className="dl-confirm__row">
              <dt>Install</dt>

              <dd>
                <code className="mono">
                  {artifact.installCommand ??
                    `pip install ${
                      release.product === "shadow"
                        ? "darkelf-shadow"
                        : "darkelf-cocoa"
                    }`}
                </code>
              </dd>
            </div>
          ) : (
            <div className="dl-confirm__row">
              <dt>File Size</dt>

              <dd className="mono">
                {sizeLabel}
              </dd>
            </div>
          )}
        </dl>

        {/* Actions */}
        <div className="dl-confirm__actions">
          <Link
            href="/releases"
            className="btn dl-confirm__back-btn"
          >
            <i
              className="bi bi-arrow-left"
              aria-hidden="true"
            />
            Back to Releases
          </Link>

          {isPyPI ? (
            <Link
              href="/download-center"
              className="btn primary dl-confirm__go-btn"
            >
              <i
                className="bi bi-terminal"
                aria-hidden="true"
              />
              Installation Instructions
            </Link>
          ) : (
            <a
              href={artifact.url}
              className="btn primary dl-confirm__go-btn"
              onClick={() => setConfirmed(true)}
              aria-label={`Continue and download ${meta.displayName} for ${platformLabel(
                artifact.platform
              )}`}
            >
              {confirmed ? (
                <>
                  <i
                    className="bi bi-hourglass-split"
                    aria-hidden="true"
                  />
                  Starting download…
                </>
              ) : (
                <>
                  <i
                    className="bi bi-download"
                    aria-hidden="true"
                  />
                  Continue Download
                </>
              )}
            </a>
          )}
        </div>

        {/* Security */}
        <p className="dl-confirm__verify-note">
          <i
            className="bi bi-info-circle"
            aria-hidden="true"
          />

          Not sure how to verify?{" "}

          <Link
            href="/security"
            className="dc-link"
          >
            Review Security Features
          </Link>
        </p>
      </div>
    </div>
  );
}

