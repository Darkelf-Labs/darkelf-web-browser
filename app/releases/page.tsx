import type { Metadata } from "next";
import Link from "next/link";
import { getAllReleases } from "@/lib/releases";
import { Nav } from "@/components/Nav";
import { ReleasesFilterClient } from "@/components/ReleasesFilterClient";

export const metadata: Metadata = {
  title: "Darkelf Browser Releases — Shadow & Cocoa",
  description:
    "Browse Darkelf Shadow and Darkelf Cocoa releases. Darkelf Shadow is the flagship cross-platform privacy browser for macOS, Windows, and Linux. Darkelf Cocoa is the lightweight native macOS browser available through PyPI.",
  keywords: [
    "Darkelf releases",
    "Darkelf Shadow releases",
    "Darkelf Cocoa releases",
    "Darkelf privacy browser",
    "privacy browser releases",
    "browser changelog",
    "browser release notes",
    "macOS privacy browser",
    "Linux privacy browser",
    "Windows privacy browser",
    "PyPI browser",
    "pip install browser",
    "stable browser release",
    "open source browser releases",
  ],
  alternates: { canonical: "/releases" },
  openGraph: {
    title: "Darkelf Browser Releases — Shadow & Cocoa",
    description:
      "Browse releases for Darkelf Shadow, the flagship cross-platform privacy browser, and Darkelf Cocoa, the lightweight native macOS browser available through PyPI.",
    url: "https://darkelfbrowser.com/releases",
    type: "website",
  },
};

export default function ReleasesPage() {
  const releases = getAllReleases();

  return (
    <>
      <div className="darkelf-releases-backdrop" aria-hidden="true" />

      <Nav activePath="/releases" />

      <main className="darkelf-releases-page">
        <section
          className="section darkelf-releases-hero"
          aria-labelledby="releases-title"
        >
          <div className="section-title">
            <div>
              <span className="darkelf-section-kicker">
                RELEASE HISTORY
              </span>

              <h1 id="releases-title">
                Darkelf Browser Releases
              </h1>

              <p className="darkelf-releases-intro">
                Darkelf Shadow is the flagship Darkelf privacy browser for
                macOS, Windows, and Linux. Darkelf Cocoa is the lightweight
                native macOS browser built with Cocoa, WebKit, and PyObjC and
                distributed through PyPI.
              </p>

              <p className="darkelf-releases-sub">
                Browse the release history below and filter by product,
                channel, or platform.
              </p>
            </div>

            <div className="section-title-actions">
              <Link
                href="/download-center"
                className="btn darkelf-releases-download"
              >
                <i className="bi bi-download" aria-hidden="true" />
                Download Center
              </Link>
            </div>
          </div>

          <div className="darkelf-release-identities" aria-hidden="true">
            <div className="darkelf-release-identity darkelf-release-identity--shadow">
              <span className="darkelf-release-identity__mark">
                <i className="bi bi-shield-lock" />
              </span>

              <span>
                <strong>Shadow</strong>
                <small>QtWebEngine • Cross-platform</small>
              </span>
            </div>

            <div className="darkelf-release-divider" />

            <div className="darkelf-release-identity darkelf-release-identity--cocoa">
              <span className="darkelf-release-identity__mark">
                <i className="bi bi-apple" />
              </span>

              <span>
                <strong>Cocoa</strong>
                <small>WebKit • Native macOS</small>
              </span>
            </div>
          </div>
        </section>

        <section
          className="section darkelf-release-list-section"
          aria-label="Darkelf release history"
        >
          {releases.length === 0 ? (
            <div className="releases-empty" role="status">
              <i className="bi bi-inbox" aria-hidden="true" />
              <p>No releases yet. Check back soon.</p>
            </div>
          ) : (
            <ReleasesFilterClient releases={releases} />
          )}
        </section>
      </main>

      <footer>
        © 2026 Dr. Kevin Moore — MIT Licensed
        <div className="line">
          Built for those who refuse to be watched.
        </div>
      </footer>
    </>
  );
}
