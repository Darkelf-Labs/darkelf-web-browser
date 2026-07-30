import type { Metadata } from "next";
import { getLatestRelease } from "@/lib/releases";
import { Nav } from "@/components/Nav";
import { DownloadCenterClient } from "@/components/DownloadCenterClient";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title:
    "Darkelf Download Center — Hardened Privacy Browsers for macOS, Linux & Windows",
  description:
    "Download Darkelf Cocoa (macOS WebKit) and Darkelf Shadow (PySide6). Non-persistent, anti-fingerprinting, SHA-256 verified. Free and open-source.",
  keywords: [
    "download privacy browser",
    "Darkelf Cocoa download",
    "Darkelf Shadow download",
    "macOS privacy browser download",
    "Linux privacy browser download",
    "Windows privacy browser download",
    "hardened browser download",
    "free privacy browser",
    "open source browser download",
    "SHA-256 browser",
    "secure browser download",
    "anti-fingerprinting browser download",
    "non-persistent browser download",
  ],
  alternates: {
    canonical: "/download-center",
  },
  openGraph: {
    title: "Darkelf Download Center — Hardened Privacy Browsers",
    description:
      "Free, open-source hardened privacy browsers. Darkelf Cocoa for macOS and Darkelf Shadow for Windows and Linux. SHA-256 verified.",
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
        <section className="dc-hero section" aria-labelledby="dc-hero-title">
          <div className="eyebrow">
            <span className="dot" aria-hidden="true" />
            <span>SECURE • VERIFIED • NON-PERSISTENT</span>
          </div>

          <h1 id="dc-hero-title" className="dc-hero__title">
            Darkelf Download Center
          </h1>
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
            <h2 id="dc-philosophy-title">Non-Persistent By Design</h2>
            <p>No data leaves the session. No exceptions.</p>
          </div>

          <div className="grid">
            {[
              {
                icon: "bi-trash3",
                title: "Session Wipe",
                body:
                  "Cookies, cache, and history are destroyed on exit. Nothing survives the shutdown.",
              },
              {
                icon: "bi-shield-lock",
                title: "Isolated Tabs",
                body:
                  "Each tab runs in a contained context. Cross-tab contamination is blocked by design.",
              },
              {
                icon: "bi-eye-slash",
                title: "Zero Telemetry",
                body:
                  "No analytics, no crash reporting, no beacons. Your activity is yours alone.",
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
