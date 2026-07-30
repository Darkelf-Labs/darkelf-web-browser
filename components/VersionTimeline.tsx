import type { Release, ProductId, Channel, Platform } from "@/lib/releases";
import { formatDate, platformLabel } from "@/lib/releases";
import { PRODUCT_META } from "@/lib/config";
import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";

interface VersionTimelineProps {
  releases: Release[];
  filterProduct?: ProductId | null;
  filterChannel?: Channel | null;
  filterPlatform?: Platform | null;
}

export function VersionTimeline({
  releases,
  filterProduct,
  filterChannel,
  filterPlatform,
}: VersionTimelineProps) {
  const visible = releases.filter((r) => {
    if (filterProduct && r.product !== filterProduct) return false;
    if (filterChannel && r.channel !== filterChannel) return false;
    if (filterPlatform && !r.artifacts.some((a) => a.platform === filterPlatform))
      return false;
    return true;
  });

  if (visible.length === 0) {
    return (
      <div className="releases-empty" role="status">
        <i className="bi bi-inbox" aria-hidden="true" />
        <p>No releases match the selected filters.</p>
        <Link href="/releases" className="dc-link">
          Clear filters
        </Link>
      </div>
    );
  }

  return (
    <ol className="version-timeline" aria-label="Release timeline">
      {visible.map((release) => {
        const meta = PRODUCT_META[release.product];
        return (
          <li
            key={`${release.product}-${release.version}`}
            className="version-timeline__item"
          >
            <div className="vtl-header">
              <div className="vtl-title-row">
                <span className="vtl-product">{meta.displayName}</span>
                <StatusBadge channel={release.channel} />
              </div>
              <h3 className="vtl-version">
                <a
                  href={`/releases/${release.product}/${encodeURIComponent(release.version)}`}
                  aria-label={`${meta.displayName} v${release.version} release details`}
                >
                  v{release.version}
                </a>
              </h3>
              <time className="vtl-date" dateTime={release.dateISO}>
                {formatDate(release.dateISO)}
              </time>
            </div>

            <ul className="vtl-highlights" aria-label="Highlights">
              {release.highlights.slice(0, 3).map((h) => (
                <li key={h}>
                  <i className="bi bi-check2" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="vtl-platforms" aria-label="Available platforms">
              {release.artifacts.map((a) => (
                <span key={a.platform} className="vtl-platform-chip">
                  <i
                    className={`bi ${
                      a.platform === "windows"
                        ? "bi-windows"
                        : a.platform === "macos"
                        ? "bi-apple"
                        : "bi-ubuntu"
                    }`}
                    aria-hidden="true"
                  />
                  {platformLabel(a.platform)}
                </span>
              ))}
            </div>

            {/* Release Notes */}
            {release.notesMarkdown && (
              <section className="vtl-release-notes">
                <div className="vtl-release-notes__header">
                  <i className="bi bi-journal-text" aria-hidden="true" />
                  <span>Release Notes</span>
                </div>

                <div className="vtl-release-notes__content">
                  {release.notesMarkdown
                    .trim()
                    .split("\n")
                    .filter((line) => line.trim())
                    .map((line, i) => {
                      if (line.startsWith("## ")) {
                        return (
                          <h4 key={i} className="vtl-note-heading">
                            {line.replace(/^##\s*/, "")}
                          </h4>
                        );
                      }

                      if (line.startsWith("### ")) {
                        return (
                          <h5 key={i} className="vtl-note-subheading">
                            {line.replace(/^###\s*/, "")}
                          </h5>
                        );
                      }

                      if (line.startsWith("- ")) {
                        return (
                          <div key={i} className="vtl-note-item">
                            <i
                              className="bi bi-arrow-right-circle-fill"
                              aria-hidden="true"
                            />
                            <span>{line.replace(/^-\s*/, "")}</span>
                          </div>
                        );
                      }

                      return <p key={i}>{line}</p>;
                    })}
                </div>
              </section>
            )}

           </li>
        );
      })}
    </ol>
  );
}
