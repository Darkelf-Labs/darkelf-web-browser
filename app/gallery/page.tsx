import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Darkelf Gallery — Shadow & Cocoa",
  description:
    "Explore the Darkelf Shadow and Darkelf Cocoa browser homepages.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Darkelf Gallery — Shadow & Cocoa",
    description:
      "A look inside the Darkelf Shadow and Darkelf Cocoa browsers.",
    url: "https://darkelfbrowser.com/gallery",
    type: "website",
  },
};

const screenshots = [
  {
    id: "shadow",
    name: "Darkelf Shadow",
    technology: "QtWebEngine • macOS, Windows & Linux",
    icon: "bi-shield-lock",
    image: "/gallery/shadow-homepage.png",
    alt: "Darkelf Shadow browser showing its homepage",
    description:
      "The Shadow homepage and browser interface, built with PySide6 and QtWebEngine.",
  },
  {
    id: "cocoa",
    name: "Darkelf Cocoa",
    technology: "Cocoa & WebKit • Native macOS",
    icon: "bi-apple",
    image: "/gallery/cocoa-homepage.png",
    alt: "Darkelf Cocoa browser showing its homepage",
    description:
      "The Cocoa homepage and native macOS browser interface, built with WebKit and PyObjC.",
  },
] as const;

export default function GalleryPage() {
  return (
    <>
      <div className="darkelf-home-backdrop" aria-hidden="true" />
      <Nav activePath="/gallery" />

      <main className="darkelf-home darkelf-gallery">
        <section className="section" aria-labelledby="gallery-title">
          <div className="section-title">
            <span className="darkelf-section-kicker">BROWSER GALLERY</span>
            <h1 id="gallery-title">Meet Shadow and Cocoa</h1>
            <p>
              Explore both Darkelf browser homepages. Select a screenshot
              to open the full-size image in a new tab.
            </p>
          </div>

          <div
            className="grid darkelf-gallery-grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 28rem), 1fr))",
              gap: "1.5rem",
            }}
          >
            {screenshots.map((screenshot) => (
              <article
                key={screenshot.id}
                className={`card darkelf-product darkelf-product--${screenshot.id}`}
                aria-labelledby={`${screenshot.id}-gallery-title`}
                style={{ minWidth: 0 }}
              >
                <div className="darkelf-product__top">
                  <div
                    className={`darkelf-product__icon darkelf-product__icon--${screenshot.id}`}
                    aria-hidden="true"
                  >
                    <i className={`bi ${screenshot.icon}`} />
                  </div>
                  <div>
                    <span className="darkelf-product__type">
                      {screenshot.technology}
                    </span>
                    <h2 id={`${screenshot.id}-gallery-title`}>
                      {screenshot.name}
                    </h2>
                  </div>
                </div>

                <figure className="darkelf-gallery-figure" style={{ margin: "1.5rem 0" }}>
                  <a
                    href={asset(screenshot.image)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${screenshot.name} homepage screenshot in a new tab`}
                    style={{ display: "block" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset(screenshot.image)}
                      alt={screenshot.alt}
                      loading="lazy"
                      decoding="async"
                      style={{
                        display: "block",
                        width: "100%",
                        height: "auto",
                        borderRadius: "12px",
                      }}
                    />
                  </a>
                  <figcaption style={{ marginTop: "1rem" }}>
                    {screenshot.description}
                  </figcaption>
                </figure>

                <Link
                  href="/download-center"
                  className={`btn darkelf-product__button darkelf-product__button--${screenshot.id}`}
                >
                  <i className="bi bi-download" aria-hidden="true" />
                  Get {screenshot.name}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="section" aria-label="Explore Darkelf">
          <div className="entry-hero__actions">
            <Link href="/home" className="btn darkelf-secondary-cta">
              <i className="bi bi-house" aria-hidden="true" />
              Home
            </Link>
            <Link href="/releases" className="btn darkelf-secondary-cta">
              <i className="bi bi-box-seam" aria-hidden="true" />
              Release History
            </Link>
          </div>
        </section>
      </main>

      <footer>
        © 2026 Dr. Kevin Moore — Darkelf Labs
        <div className="line">Built for those who refuse to be watched.</div>
      </footer>
    </>
  );
}
