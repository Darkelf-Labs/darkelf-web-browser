"use client";

import Link from 'next/link';
import { useState } from 'react';
import { asset } from '@/lib/asset';

interface NavProps {
  activePath?: string;
}

export function Nav({ activePath = "" }: NavProps) {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/home", label: "Home" },
    { href: "/download-center", label: "Download" },
    { href: "/releases", label: "Releases" },
    { href: "/security", label: "Security" },
  ];

  const closeMenu = () => setOpen(false);

  return (
    <header>
      <div className="nav">
        <Link className="brand" href="/home" aria-label="Darkelf Browser home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/logo.png")} alt="Darkelf" width={32} height={32} style={{ borderRadius: '8px', objectFit: 'cover' }} />
          <span>Darkelf Browser</span>
          <span className="badge">Mission + Security</span>
        </Link>
        <nav aria-label="Main navigation">
          <button
            type="button"
            className={`nav-toggle${open ? " nav-toggle--open" : ""}`}
            aria-expanded={open}
            aria-controls="main-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="nav-toggle__bar" />
            <span className="nav-toggle__bar" />
            <span className="nav-toggle__bar" />
          </button>
          <div className={`right${open ? " right--open" : ""}`} id="main-menu">
            {links.map((link) => {
              const isActive = activePath === link.href;
              return (
                <Link
                  key={link.href}
                  className={`btn${isActive ? " btn--nav-active" : ""}`}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}
