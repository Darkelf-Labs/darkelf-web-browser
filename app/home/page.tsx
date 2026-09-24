import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Darkelf Labs — Privacy-First Browsers & Security Tools",
  description:
    "Darkelf Labs develops privacy-first, open-source browser technology focused on security, anti-fingerprinting, tracker protection, ephemeral browsing, and advanced privacy research.",
  keywords: [
    "Darkelf Labs",
    "Darkelf Browser",
    "Darkelf Shadow",
    "Darkelf Cocoa",
    "privacy browser",
    "open source browser",
    "security browser",
    "anti-fingerprinting browser",
    "tracker blocking",
    "ephemeral browser",
    "cybersecurity research tools",
    "privacy tools",
  ],
  alternates: { canonical: "/home" },
  openGraph: {
    title: "Darkelf Labs — Privacy-First Browser Technology",
    description:
      "Explore Darkelf Shadow and Darkelf Cocoa — open-source browsers built around privacy, security, tracker protection, and anti-fingerprinting technology.",
    url: "https://darkelfbrowser.com/home",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <div className="entry-bg-video-wrap" aria-hidden="true">
        <video
          className="entry-bg-video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src={asset("/cyber_orange.mp4")} type="video/mp4" />
        </video>
        <div className="entry-bg-overlay" />
      </div>

      <div className="orb one" aria-hidden="true" />
      <div className="orb two" aria-hidden="true" />
      <div className="orb three" aria-hidden="true" />

      <Nav activePath="/home" />

      <main>
        <section
          className="entry-hero section"
          aria-labelledby="entry-title"
        >
          <div className="eyebrow">
            <span className="dot" aria-hidden="true" />
            <span>PRIVACY • SECURITY • OPEN SOURCE</span>
          </div>

          <h1 id="entry-title" className="entry-hero__title">
            Darkelf Labs
          </h1>

          <p className="entry-hero__sub">
            Open-source privacy and security software engineered to reduce
            tracking, strengthen browser privacy, and give users greater
            control over their browsing environment.
          </p>

          <div className="entry-hero__actions">
            <Link href="/download-center" className="btn primary">
              <i className="bi bi-download" aria-hidden="true" />
              Go to Download Center
            </Link>

            <Link href="/security" className="btn">
              <i className="bi bi-shield-check" aria-hidden="true" />
              Security Features
            </Link>
          </div>
        </section>

        <section className="section" aria-labelledby="browsers-title">
          <div className="section-title">
            <h2 id="browsers-title">Darkelf Browsers</h2>
            <p>
              Two privacy-focused browsers built around different browser
              technologies while sharing the Darkelf security philosophy.
            </p>
          </div>

          <div className="grid entry-grid">
            <div className="card">
              <i className="bi bi-shield-lock" aria-hidden="true" />

              <h3>Darkelf Shadow</h3>

              <p>
                The flagship Darkelf privacy browser. Built with PySide6 and
                QtWebEngine for macOS, Windows, and Linux with tracker
                blocking, anti-fingerprinting protections, MiniAI Sentinel,
                and an ephemeral browsing architecture.
              </p>

              <Link href="/download-center" className="btn primary">
                <i className="bi bi-download" aria-hidden="true" />
                Get Darkelf Shadow
              </Link>
            </div>

            <div className="card">
              <i className="bi bi-apple" aria-hidden="true" />

              <h3>Darkelf Cocoa</h3>

              <p>
                A lightweight native macOS privacy browser built with Cocoa,
                WebKit, and PyObjC. Cocoa provides a streamlined alternative
                for users who prefer Apple&apos;s native browser technology.
              </p>

              <Link href="/download-center" className="btn">
                <i className="bi bi-box-arrow-down" aria-hidden="true" />
                Get Darkelf Cocoa
              </Link>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="mission-title">
          <div className="section-title">
            <h2 id="mission-title">Mission & Drive</h2>

            <p>
              Darkelf Labs develops privacy-focused technology for users,
              researchers, analysts, and security professionals who want
              greater control over their browsing environment.
            </p>
          </div>

          <div className="grid entry-grid">
            <div className="card">
              <h3>Privacy by Design</h3>
              <p>
                Privacy protections are integrated into the browser
                architecture rather than treated as optional additions.
              </p>
            </div>

            <div className="card">
              <h3>Research-Driven Development</h3>
              <p>
                Darkelf evolves through practical security research,
                compatibility testing, and continuous evaluation of modern
                tracking and fingerprinting techniques.
              </p>
            </div>

            <div className="card">
              <h3>Ephemeral Browsing</h3>
              <p>
                Session isolation and reduced persistence help minimize
                residual browsing data while maintaining compatibility with
                modern websites.
              </p>
            </div>
          </div>
        </section>

        <section
          className="section dc-philosophy"
          aria-labelledby="mindset-title"
        >
          <div className="section-title">
            <h2 id="mindset-title">Security-Focused Mindset</h2>
            <p>
              Privacy and security controls are fundamental parts of the
              Darkelf browser architecture.
            </p>
          </div>

          <div className="grid">
            {[
              {
                icon: "bi-shield-lock",
                title: "Anti-Fingerprinting Controls",
                body:
                  "Canvas, WebGL, WebRTC, and other identifying browser surfaces are protected to reduce fingerprinting and tracking exposure.",
              },
              {
                icon: "bi-funnel",
                title: "Tracker Protection",
                body:
                  "Network filtering and declarative tracker blocking help prevent known advertising, analytics, telemetry, and tracking infrastructure from loading.",
              },
              {
                icon: "bi-eye-slash",
                title: "Ephemeral Privacy",
                body:
                  "Darkelf minimizes persistent browsing state and limits unnecessary storage of cookies, cache, history, and other session data.",
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

        <section
          className="section entry-legal"
          aria-labelledby="lawful-title"
        >
          <div className="section-title">
            <h2 id="lawful-title">Open Source & Responsible Use</h2>

            <p>
              Darkelf software is developed for privacy, security research,
              education, and legitimate professional use. Users remain
              responsible for compliance with applicable laws and policies in
              their jurisdiction.
            </p>
          </div>

          <div className="entry-hero__actions">
            <Link href="/download-center" className="btn primary">
              <i
                className="bi bi-arrow-right-circle"
                aria-hidden="true"
              />
              Explore Darkelf Browsers
            </Link>

            <Link href="/security" className="btn">
              <i className="bi bi-shield-check" aria-hidden="true" />
              Security Features
            </Link>
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