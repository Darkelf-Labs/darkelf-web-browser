import type { Metadata } from "next";
import Link from "next/link";
import { getAllReleases } from "@/lib/releases";
import { Nav } from "@/components/Nav";
import { ReleasesFilterClient } from "@/components/ReleasesFilterClient";
import { asset } from "@/lib/asset";

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
      <div className="releases-bg-video-wrap" aria-hidden="true">
        <video
          className="releases-bg-video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src={asset("/cyber_yellow.mp4")} type="video/mp4" />
        </video>
        <div className="releases-bg-overlay" />
      </div>

      <div className="orb one" aria-hidden="true" />
      <div className="orb two" aria-hidden="true" />

      <Nav activePath="/releases" />

      <main>
        <section className="section" aria-labelledby="releases-title">
          <div className="section-title">
            <div>
              <h1 id="releases-title">Darkelf Browser Releases</h1>

              <p>
                Darkelf Shadow is the flagship Darkelf privacy browser for
                macOS, Windows, and Linux. Darkelf Cocoa is the lightweight
                native macOS browser built with Cocoa, WebKit, and PyObjC and
                distributed through PyPI.
              </p>

              <p>
                Browse the release history below and filter by product,
                channel, or platform.
              </p>
            </div>

            <div className="section-title-actions">
              <Link href="/download-center" className="btn">
                <i className="bi bi-download" aria-hidden="true" />
                Download Center
              </Link>
            </div>
          </div>

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
        <div className="line">Built for those who refuse to be watched.</div>
      </footer>
    </>
  );
}
