"use client";

import Link from "next/link";
import { useState } from "react";
import { MLH_FIELDS_ENABLED } from "@/config/features";

const LINKS = [
  { href: "#about", label: "About", color: "maroon" },
  { href: "#tracks", label: "Tracks", color: "black" },
  { href: "#schedule", label: "Schedule", color: "wine" },
  { href: "#faq", label: "FAQ", color: "black" },
  { href: "#sponsors", label: "Sponsors", color: "maroon" },
];

export default function ArcadeNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav className={`nav${open ? " open" : ""}`} aria-label="Main">
      <div className="wrap">
        <a className="logo" href="#top" onClick={close}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-wordmark.png" alt="MT-haCks" width={1842} height={432} />
        </a>
        <div className="nav-links" id="nav-links">
          {LINKS.map((link) => (
            <a key={link.href} className={`btn ${link.color}`} href={link.href} onClick={close}>
              {link.label}
            </a>
          ))}
          <Link className="btn gold" href="/register">
            Register
          </Link>
        </div>
        <button
          className="btn gold round menu-btn"
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen((o) => !o)}
        >
          <svg viewBox="0 0 6 5" shapeRendering="crispEdges" aria-hidden="true">
            <rect y="0" width="6" height="1" fill="currentColor" />
            <rect y="2" width="6" height="1" fill="currentColor" />
            <rect y="4" width="6" height="1" fill="currentColor" />
          </svg>
        </button>
      </div>
      {MLH_FIELDS_ENABLED && (
        // Official MLH trust badge for the 2027 season (the same image MLH gives every member event).
        <a
          className="mlh"
          href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2027-season&utm_content=white"
          target="_blank"
          rel="noreferrer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://logged-assets.s3.amazonaws.com/trust-badge/2027/mlh-trust-badge-2027-white.svg"
            alt="Major League Hacking 2027 Hackathon Season"
          />
        </a>
      )}
    </nav>
  );
}
