import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { VerifySteps } from "@/components/VerifySteps";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Security Features — Darkelf Browser Privacy & Protection",
  description:
    "Explore Darkelf Browser security features including ephemeral browsing, tracker and ad blocking, canvas fingerprint protection, first-party isolation, WebRTC protection, MiniAI Sentinel, and narrowly scoped compatibility controls.",
  keywords: [
    "Darkelf security",
    "privacy browser security",
    "ephemeral browser",
    "tracker blocking",
    "ad blocking",
    "canvas fingerprint protection",
    "first-party isolation",
    "WebRTC protection",
    "MiniAI Sentinel",
    "anti-fingerprinting browser",
    "non-persistent browser",
    "browser privacy protection",
  ],
  alternates: { canonical: "/security" },
  openGraph: {
    title: "Darkelf Security Features — Privacy Without Blind Trust",
    description:
      "A technical overview of Darkelf's layered privacy, anti-tracking, fingerprint protection, ephemeral browsing, and compatibility architecture.",
    url: "https://darkelfbrowser.com/security",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Darkelf Security Features",
    description:
      "Explore Darkelf's layered browser privacy, anti-tracking, anti-fingerprinting, and ephemeral security architecture.",
  },
};

export default function SecurityPage() {
  const highlights = [
    {
      icon: "bi-incognito",
      title: "Ephemeral by Design",
      body: "Darkelf is built around non-persistent browsing. Session data is designed to disappear with the session rather than becoming a long-lived browser profile.",
    },
    {
      icon: "bi-shield-lock",
      title: "Darkelf Standard Protection",
      body: "A locally compiled protection ruleset combines configured upstream filter subscriptions, removes duplicate rules, excludes unsupported directives, and is parsed as a unified runtime ruleset.",
    },
    {
      icon: "bi-eye-slash",
      title: "Tracker & Ad Blocking",
      body: "Network filtering blocks known advertising and tracking requests while refined first-party, third-party, and resource-type handling reduces unnecessary website breakage.",
    },
    {
      icon: "bi-fingerprint",
      title: "Canvas Fingerprint Protection",
      body: "Canvas readback is blocked by default. Protected and Trusted modes provide narrowly scoped compatibility when a website genuinely requires additional canvas functionality.",
    },
    {
      icon: "bi-box-arrow-in-right",
      title: "First-Party Isolation",
      body: "Darkelf separates first-party browsing context from third-party network activity to reduce cross-site tracking and unwanted correlation between browsing sessions.",
    },
    {
      icon: "bi-broadcast-pin",
      title: "WebRTC Protection",
      body: "Shadow's privacy defaults restrict WebRTC exposure to reduce the risk of network information leaking outside the intended browsing path.",
    },
    {
      icon: "bi-cpu",
      title: "MiniAI Sentinel",
      body: "MiniAI Sentinel monitors active navigations and network calls for suspicious behavior while avoiding unnecessary processing of every static image, font, and stylesheet.",
    },
    {
      icon: "bi-link-45deg",
      title: "Tracking-Parameter Removal",
      body: "Common tracking parameters can be stripped from top-level navigation URLs, reducing passive attribution without rewriting every subresource request.",
    },
    {
      icon: "bi-cursor",
      title: "Hyperlink Ping Protection",
      body: "Hyperlink ping tracking remains disabled, preventing pages from silently sending supported click-tracking beacon requests through that mechanism.",
    },
    {
      icon: "bi-person-check",
      title: "Secure Challenge Compatibility",
      body: "Human-verification flows such as reCAPTCHA, hCaptcha, Cloudflare Turnstile, and Arkose/FunCaptcha receive narrowly scoped compatibility handling instead of globally disabling privacy protections.",
    },
    {
      icon: "bi-hourglass-split",
      title: "Session-Only Trust",
      body: "When a supported verification challenge requires native canvas behavior, Darkelf can grant compatibility for the current session only. The temporary grant is cleared when Darkelf closes.",
    },
    {
      icon: "bi-diagram-3",
      title: "Resource-Aware Filtering",
      body: "ABP-style resource types are evaluated as constraints, helping prevent a rule intended for ping, image, script, or XHR traffic from being incorrectly applied to unrelated request types.",
    },
  ];

  const compatibility = [
    "Authentication-sensitive resources receive narrowly scoped handling rather than broad filter bypasses.",
    "Improved compatibility with Google and Microsoft authentication flows.",
    "Challenge handling supports reCAPTCHA, hCaptcha, Cloudflare Turnstile, and Arkose/FunCaptcha.",
    "Refined cross-origin resource handling reduces broken scripts, images, logos, XHR/fetch requests, and embedded content.",
    "BrowserLeaks diagnostic exceptions remain tightly scoped instead of weakening normal browsing protection.",
    "Network-rule evaluation stops when a definitive blocking match is reached, reducing unnecessary rule scanning.",
  ];

  const privacyModel = [
    {
      title: "Cookies",
      body: "Designed for ephemeral session use rather than persistent cross-session identity.",
    },
    {
      title: "Cache & Session State",
      body: "Darkelf prioritizes temporary browsing state and cleanup instead of building a long-lived browsing profile.",
    },
    {
      title: "History",
      body: "The browser is designed around non-persistent browsing rather than a permanent local activity timeline.",
    },
    {
      title: "Fingerprint Surface",
      body: "Canvas protections and controlled compatibility modes reduce unnecessary fingerprint exposure while preserving functionality where required.",
    },
    {
      title: "Network Privacy",
      body: "Tracker filtering, first/third-party awareness, tracking-parameter removal, ping protection, and WebRTC controls provide multiple independent layers.",
    },
  ];

  return (
    <>
      <div className="security-bg-video-wrap" aria-hidden="true">
        <video
          className="security-bg-video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src={asset("/cyber_red.mp4")} type="video/mp4" />
        </video>
        <div className="security-bg-overlay" />
      </div>

      <div className="orb one" aria-hidden="true" />
      <div className="orb two" aria-hidden="true" />

      <Nav activePath="/security" />

      <main>
        <article className="section security-page" aria-labelledby="sec-title">
          <div className="sec-hero">
            <div className="eyebrow">
              <span className="dot" aria-hidden="true" />
              <span>LAYERED PRIVACY • EPHEMERAL BY DESIGN</span>
            </div>
            <h1 id="sec-title">Security Features</h1>
            <p className="sub">
              Darkelf combines non-persistent browsing, network filtering,
              anti-fingerprinting controls, session isolation, and targeted
              compatibility logic. The goal is strong privacy protection
              without unnecessarily breaking the modern web.
            </p>
          </div>

          <section className="sec-section" aria-labelledby="highlights-title">
            <h2 id="highlights-title">
              <i className="bi bi-shield-check" aria-hidden="true" /> Security
              Highlights
            </h2>
            <div className="sec-cards">
              {highlights.map((item) => (
                <div className="card" key={item.title}>
                  <i className={`bi ${item.icon}`} aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="sec-section" aria-labelledby="defense-title">
            <h2 id="defense-title">
              <i className="bi bi-layers" aria-hidden="true" /> Defense in Depth
            </h2>
            <div className="sec-philosophy">
              <p>
                Darkelf does not rely on a single privacy mechanism. Its security
                model combines several independent layers so that tracking and
                fingerprinting are addressed at different points in the browser.
              </p>
              <ul className="sec-list">
                <li>
                  <i className="bi bi-check2-circle" aria-hidden="true" />
                  <span><strong>Network layer</strong> — compiled tracker/ad rules, request-type constraints, and first/third-party awareness.</span>
                </li>
                <li>
                  <i className="bi bi-check2-circle" aria-hidden="true" />
                  <span><strong>Fingerprint layer</strong> — default canvas readback blocking with Protected and session-only Trusted compatibility modes.</span>
                </li>
                <li>
                  <i className="bi bi-check2-circle" aria-hidden="true" />
                  <span><strong>Navigation layer</strong> — tracking-parameter removal and hyperlink ping protection.</span>
                </li>
                <li>
                  <i className="bi bi-check2-circle" aria-hidden="true" />
                  <span><strong>Session layer</strong> — ephemeral browsing and temporary compatibility grants rather than permanent trust.</span>
                </li>
                <li>
                  <i className="bi bi-check2-circle" aria-hidden="true" />
                  <span><strong>Monitoring layer</strong> — MiniAI Sentinel focuses security monitoring on active navigations and network calls.</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="sec-section" aria-labelledby="compat-title">
            <h2 id="compat-title">
              <i className="bi bi-globe2" aria-hidden="true" /> Security Without
              Sacrificing Compatibility
            </h2>
            <div className="sec-philosophy">
              <p>
                Privacy controls are most useful when websites remain usable.
                Darkelf therefore favors narrowly scoped exceptions and
                resource-aware decisions instead of disabling protection for an
                entire site.
              </p>
              <ul className="sec-list">
                {compatibility.map((item) => (
                  <li key={item}>
                    <i className="bi bi-check2-circle" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="sec-section" aria-labelledby="privacy-title">
            <h2 id="privacy-title">
              <i className="bi bi-incognito" aria-hidden="true" /> Ephemeral
              Privacy Model
            </h2>
            <div className="sec-cards">
              {privacyModel.map((item) => (
                <div className="card" key={item.title}>
                  <i className="bi bi-shield-lock" aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
            <p className="sec-note">
              <i className="bi bi-info-circle" aria-hidden="true" />
              Darkelf is designed for privacy-focused, ephemeral browsing. Some
              websites require authentication or anti-bot features that depend
              on browser capabilities normally restricted for privacy. Darkelf
              handles supported cases with targeted, temporary compatibility
              rather than globally disabling its protections.
            </p>
          </section>

          <section className="sec-section" aria-labelledby="principles-title">
            <h2 id="principles-title">
              <i className="bi bi-lock" aria-hidden="true" /> Core Security
              Principles
            </h2>
            <div className="sec-cards">
              <div className="card">
                <i className="bi bi-slash-circle" aria-hidden="true" />
                <h3>Block by Default</h3>
                <p>
                  Privacy-sensitive capabilities such as canvas readback remain
                  restricted unless a defined compatibility path requires them.
                </p>
              </div>
              <div className="card">
                <i className="bi bi-bullseye" aria-hidden="true" />
                <h3>Scope Exceptions Narrowly</h3>
                <p>
                  Compatibility exceptions target the resource, path, provider,
                  or current session instead of creating unnecessary global
                  bypasses.
                </p>
              </div>
              <div className="card">
                <i className="bi bi-clock-history" aria-hidden="true" />
                <h3>Trust Should Expire</h3>
                <p>
                  Challenge-related trust is designed to be temporary. Session
                  compatibility state is discarded when Darkelf closes.
                </p>
              </div>
            </div>
          </section>

          <div className="rd-nav-links">
            <Link href="/download-center" className="btn">
              <i className="bi bi-download" aria-hidden="true" />
              Download Center
            </Link>
            <Link href="/releases" className="btn">
              <i className="bi bi-clock-history" aria-hidden="true" />
              All Releases
            </Link>
          </div>
        </article>
      </main>

      <footer>
        © 2026 Dr. Kevin Moore — MIT Licensed
        <div className="line">Built for those who refuse to be watched.</div>
      </footer>
    </>
  );
}
