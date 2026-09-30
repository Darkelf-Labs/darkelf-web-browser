import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";

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
      <div className="darkelf-home-backdrop" aria-hidden="true" />

      <Nav activePath="/home" />

      <main className="darkelf-home">
        <section
          className="entry-hero section darkelf-hero"
          aria-labelledby="entry-title"
        >
          <div className="eyebrow">
            <span className="dot" aria-hidden="true" />
            <span>PRIVACY • SECURITY • OPEN SOURCE</span>
          </div>

          <h1 id="entry-title" className="entry-hero__title darkelf-title">
            Darkelf Labs
          </h1>

          <p className="entry-hero__sub darkelf-hero-copy">
            Open-source privacy and security software engineered to reduce
            tracking, strengthen browser privacy, and give users greater
            control over their browsing environment.
          </p>

          <div className="entry-hero__actions">
            <Link
              href="/download-center"
              className="btn primary darkelf-main-cta"
            >
              <i className="bi bi-download" aria-hidden="true" />
              Download Center
            </Link>

            <Link href="/security" className="btn darkelf-secondary-cta">
              <i className="bi bi-shield-check" aria-hidden="true" />
              Security Features
            </Link>
          </div>

          <div className="darkelf-tech-line" aria-hidden="true">
            <span />
            <strong>SHADOW</strong>
            <span />
            <strong>COCOA</strong>
            <span />
          </div>
        </section>

        <section className="section" aria-labelledby="browsers-title">
          <div className="section-title">
            <span className="darkelf-section-kicker">THE BROWSERS</span>
            <h2 id="browsers-title">Choose your Darkelf</h2>
            <p>
              Two privacy-focused browsers built on different technologies
              while sharing the same privacy-first philosophy.
            </p>
          </div>

          <div className="grid browser-grid darkelf-browser-grid">
            <article className="card darkelf-product darkelf-product--shadow">
              <div className="darkelf-product__top">
                <div
                  className="darkelf-product__icon darkelf-product__icon--shadow"
                  aria-hidden="true"
                >
                  <i className="bi bi-shield-lock" />
                </div>

                <div>
                  <span className="darkelf-product__type">
                    QtWebEngine Browser
                  </span>
                  <h3>Darkelf Shadow</h3>
                </div>
              </div>

              <p>
                The flagship Darkelf privacy browser. Built with PySide6 and
                QtWebEngine for macOS, Windows, and Linux with tracker
                blocking, anti-fingerprinting protections, MiniAI Sentinel,
                and an ephemeral browsing architecture.
              </p>

              <div className="darkelf-product__tags" aria-label="Shadow features">
                <span>QtWebEngine</span>
                <span>Anti-Fingerprinting</span>
                <span>Ephemeral</span>
              </div>

              <Link
                href="/download-center"
                className="btn darkelf-product__button darkelf-product__button--shadow"
              >
                <i className="bi bi-download" aria-hidden="true" />
                Get Darkelf Shadow
              </Link>
            </article>

            <article className="card darkelf-product darkelf-product--cocoa">
              <div className="darkelf-product__top">
                <div
                  className="darkelf-product__icon darkelf-product__icon--cocoa"
                  aria-hidden="true"
                >
                  <i className="bi bi-apple" />
                </div>

                <div>
                  <span className="darkelf-product__type">
                    Native macOS Browser
                  </span>
                  <h3>Darkelf Cocoa</h3>
                </div>
              </div>

              <p>
                A lightweight native macOS privacy browser built with Cocoa,
                WebKit, and PyObjC. Cocoa provides a streamlined alternative
                for users who prefer Apple&apos;s native browser technology.
              </p>

              <div className="darkelf-product__tags" aria-label="Cocoa features">
                <span>WebKit</span>
                <span>Native macOS</span>
                <span>Lightweight</span>
              </div>

              <Link
                href="/download-center"
                className="btn darkelf-product__button darkelf-product__button--cocoa"
              >
                <i className="bi bi-download" aria-hidden="true" />
                Get Darkelf Cocoa
              </Link>
            </article>
          </div>
        </section>

        <section className="section" aria-labelledby="mission-title">
          <div className="section-title">
            <span className="darkelf-section-kicker">ENGINEERING PRINCIPLES</span>
            <h2 id="mission-title">Privacy without unnecessary complexity</h2>
            <p>
              Darkelf Labs develops privacy-focused technology for users,
              researchers, analysts, and security professionals who want
              greater control over their browsing environment.
            </p>
          </div>

          <div className="grid entry-grid darkelf-principles">
            <article className="card darkelf-info-card">
              <i className="bi bi-shield-check" aria-hidden="true" />
              <h3>Privacy by Design</h3>
              <p>
                Privacy protections are integrated into the browser
                architecture rather than treated as optional additions.
              </p>
            </article>

            <article className="card darkelf-info-card">
              <i className="bi bi-cpu" aria-hidden="true" />
              <h3>Research-Driven</h3>
              <p>
                Darkelf evolves through practical security research,
                compatibility testing, and evaluation of modern tracking and
                fingerprinting techniques.
              </p>
            </article>

            <article className="card darkelf-info-card">
              <i className="bi bi-eye-slash" aria-hidden="true" />
              <h3>Ephemeral Browsing</h3>
              <p>
                Session isolation and reduced persistence help minimize
                residual browsing data while maintaining compatibility with
                modern websites.
              </p>
            </article>
          </div>
        </section>

        <section
          className="section dc-philosophy"
          aria-labelledby="mindset-title"
        >
          <div className="section-title">
            <span className="darkelf-section-kicker">CORE PROTECTIONS</span>
            <h2 id="mindset-title">Security-focused by default</h2>
            <p>
              Privacy and security controls are fundamental parts of the
              Darkelf browser architecture.
            </p>
          </div>

          <div className="grid darkelf-security-grid">
            {[
              {
                icon: "bi-fingerprint",
                title: "Anti-Fingerprinting",
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
                icon: "bi-incognito",
                title: "Reduced Persistence",
                body:
                  "Darkelf minimizes persistent browsing state and limits unnecessary storage of cookies, cache, history, and other session data.",
              },
            ].map((item) => (
              <article className="card darkelf-security-card" key={item.title}>
                <i className={`bi ${item.icon}`} aria-hidden="true" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="section entry-legal darkelf-open-source"
          aria-labelledby="lawful-title"
        >
          <div>
            <span className="darkelf-section-kicker">OPEN SOURCE</span>
            <h2 id="lawful-title">Inspect it. Verify it. Use it responsibly.</h2>
            <p>
              Darkelf software is developed for privacy, security research,
              education, and legitimate professional use. Users remain
              responsible for compliance with applicable laws and policies in
              their jurisdiction.
            </p>
          </div>

          <div className="entry-hero__actions">
            <Link
              href="/download-center"
              className="btn primary darkelf-main-cta"
            >
              <i className="bi bi-arrow-right-circle" aria-hidden="true" />
              Explore Downloads
            </Link>

            <Link href="/releases" className="btn darkelf-secondary-cta">
              <i className="bi bi-box-seam" aria-hidden="true" />
              Release History
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
