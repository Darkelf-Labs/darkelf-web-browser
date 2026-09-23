import type { Metadata } from "next";
import { getLatestRelease } from "@/lib/releases";
import { Nav } from "@/components/Nav";
import { DownloadCenterClient } from "@/components/DownloadCenterClient";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title:
    "Darkelf Download Center — Privacy Browsers for macOS, Linux & Windows",
  description:
    "Get Darkelf Shadow, the flagship cross-platform privacy browser for macOS, Windows and Linux, or Darkelf Cocoa, the lightweight native macOS WebKit browser available through PyPI.",
  keywords: [
    "Darkelf browser",
    "Darkelf download",
    "Darkelf Shadow download",
    "Darkelf Cocoa PyPI",
    "Darkelf Cocoa pip install",
    "macOS privacy browser",
    "Linux privacy browser",
    "Windows privacy browser",
    "privacy browser download",
    "hardened privacy browser",
    "free privacy browser",
    "open source privacy browser",
    "anti-fingerprinting browser",
    "non-persistent browser",
    "PyPI privacy browser",
  ],
  alternates: {
    canonical: "/download-center",
  },
  openGraph: {
    title: "Darkelf Download Center — Shadow & Cocoa",
    description:
      "Darkelf Shadow is the flagship cross-platform privacy browser for macOS, Windows and Linux. Darkelf Cocoa is the lightweight native macOS WebKit browser distributed through PyPI.",
    url: "https://darkelfbrowser.com/download-center",
    type: "website",
  },
};

export default function DownloadCenterPage() {
  const cocoaRelease = getLatestRelease("cocoa");
  const shadowRelease = getLatestRelease("shadow");

  return (
    <>
      <div className="home-bg-video-wrap" aria-hidden="true">
        <video
          className="home-bg-video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src={asset("/cyber_blue.mp4")} type="video/mp4" />
        </video>
        <div className="home-bg-overlay" />
      </div>

      <div className="orb one" aria-hidden="true" />
      <div className="orb two" aria-hidden="true" />
      <div className="orb three" aria-hidden="true" />

      <Nav activePath="/download-center" />

      <main>
        <section
          className="dc-hero section"
          aria-labelledby="dc-hero-title"
        >
          <div className="eyebrow">
            <span className="dot" aria-hidden="true" />
            <span>PRIVATE • OPEN SOURCE • CROSS-PLATFORM</span>
          </div>

          <h1 id="dc-hero-title" className="dc-hero__title">
            Darkelf Download Center
          </h1>

          <p>
            Choose Darkelf Shadow for the flagship Darkelf browsing
            experience across macOS, Windows and Linux, or Darkelf Cocoa
            for a lightweight native macOS browser built with Cocoa,
            WebKit and PyObjC.
          </p>
        </section>

        <section className="section">
          <DownloadCenterClient
            cocoaRelease={cocoaRelease}
            shadowRelease={shadowRelease}
          />
        </section>

        <section
          className="section dc-philosophy"
          aria-labelledby="dc-philosophy-title"
        >
          <div className="section-title">
            <h2 id="dc-philosophy-title">Privacy By Design</h2>
            <p>
              Designed to minimize persistent browsing data and unnecessary
              tracking.
            </p>
          </div>

          <div className="grid">
            {[
              {
                icon: "bi-trash3",
                title: "Session Privacy",
                body:
                  "Darkelf is designed to minimize persistent browsing data and reduce what remains after a browsing session.",
              },
              {
                icon: "bi-shield-lock",
                title: "Privacy Protection",
                body:
                  "Built-in protections target trackers, fingerprinting techniques, and unwanted network activity.",
              },
              {
                icon: "bi-eye-slash",
                title: "Zero Telemetry",
                body:
                  "Darkelf does not depend on behavioral analytics or advertising telemetry to operate.",
              },
            ].map((item) => (
              <div className="card" key={item.title}>
                <i className={`bi ${item.icon}`} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
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
