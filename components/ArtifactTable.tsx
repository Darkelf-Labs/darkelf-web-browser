import type {
  Release,
  Artifact,
  Platform,
} from "@/lib/releases";

import {
  formatBytes,
  platformLabel,
  fileTypeLabel,
  isAllowedDownloadUrl,
} from "@/lib/releases";

interface ArtifactRowProps {
  artifact: Artifact;
  release: Release;
}

function ArtifactRow({
  artifact,
  release,
}: ArtifactRowProps) {
  const isPyPI = artifact.fileType === "pypi";

  const isPlaceholderUrl =
    artifact.url?.includes("TODO_") ?? false;

  const isValidUrl =
    Boolean(artifact.url) &&
    isAllowedDownloadUrl(artifact.url) &&
    !isPlaceholderUrl;

  // Normalize optional/empty size to a definite number.
  // This prevents number | undefined from reaching formatBytes().
  const sizeBytes = artifact.sizeBytes ?? 0;
  const hasSize = sizeBytes > 0;

  return (
    <tr className="artifact-row">
      {/* Platform */}
      <td className="artifact-cell artifact-cell--platform">
        <i
          className={`bi ${
            artifact.platform === "windows"
              ? "bi-windows"
              : artifact.platform === "macos"
              ? "bi-apple"
              : "bi-ubuntu"
          }`}
          aria-hidden="true"
        />

        <span>
          {platformLabel(artifact.platform)}
        </span>

        <span className="artifact-filetype">
          {fileTypeLabel(artifact.fileType)}
        </span>
      </td>

      {/* Architecture */}
      <td className="artifact-cell artifact-cell--arch">
        <span className="mono">
          {artifact.arch === "any"
            ? "Any"
            : artifact.arch}
        </span>
      </td>

      {/* Distribution / Size */}
      <td className="artifact-cell artifact-cell--size">
        {isPyPI ? (
          <span className="mono">
            PyPI
          </span>
        ) : hasSize ? (
          <span className="mono">
            {formatBytes(sizeBytes)}
          </span>
        ) : (
          <span className="mono">
            —
          </span>
        )}
      </td>

      {/* Actions */}
      <td className="artifact-cell artifact-cell--actions">
        {artifact.notesUrl && (
          <a
            className="artifact-notes-link"
            href={artifact.notesUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Release notes for ${platformLabel(
              artifact.platform
            )} build`}
          >
            Notes
          </a>
        )}

        {isPyPI && artifact.installCommand ? (
          <code
            className="mono"
            aria-label={`Install ${release.product} using PyPI`}
          >
            {artifact.installCommand}
          </code>
        ) : isValidUrl ? (
          <a
            className="btn primary artifact-dl-btn"
            href={artifact.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Download ${platformLabel(
              artifact.platform
            )} build (${fileTypeLabel(
              artifact.fileType
            )})`}
          >
            <i
              className="bi bi-download"
              aria-hidden="true"
            />
            <span>Download</span>
          </a>
        ) : release.zipballUrl ? (
          <a
            className="btn primary artifact-dl-btn"
            href={release.zipballUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download source archive"
          >
            <i
              className="bi bi-download"
              aria-hidden="true"
            />
            <span>Source</span>
          </a>
        ) : (
          <span
            className="artifact-unavailable"
            aria-label="Download not available"
          >
            —
          </span>
        )}
      </td>
    </tr>
  );
}

interface ArtifactTableProps {
  release: Release;
  platforms?: Platform[];
}

export function ArtifactTable({
  release,
  platforms,
}: ArtifactTableProps) {
  const artifacts = platforms
    ? release.artifacts.filter((artifact) =>
        platforms.includes(artifact.platform)
      )
    : release.artifacts;

  if (artifacts.length === 0) {
    return (
      <div className="artifact-empty">
        No distribution information available for this release.
      </div>
    );
  }

  return (
    <div
      className="artifact-table-wrap"
      role="region"
      aria-label="Release distributions"
    >
      <table className="artifact-table">
        <thead>
          <tr>
            <th scope="col">
              Platform
            </th>
            <th scope="col">
              Arch
            </th>
            <th scope="col">
              Distribution
            </th>
            <th scope="col">
              Install / Download
            </th>
          </tr>
        </thead>

        <tbody>
          {artifacts.map((artifact, index) => (
            <ArtifactRow
              key={`${artifact.platform}-${artifact.arch}-${artifact.fileType}-${index}`}
              artifact={artifact}
              release={release}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
