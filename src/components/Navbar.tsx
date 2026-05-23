"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Logo from "./Logo";

const cx = { maxWidth: 1280, margin: "0 auto", padding: "0 32px" };

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      backgroundColor: scrolled ? "rgba(19,19,30,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
      transition: "background-color 0.4s, backdrop-filter 0.4s, border-color 0.4s",
    }}>
      <div style={cx}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 80 }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Logo size={28} />
          </Link>

          {/* Desktop nav */}
          <div style={{ display: "flex", alignItems: "center", gap: 40 }} className="desktop-nav">
            {[["How It Works", "/how-it-works"], ["About", "/about"], ["Contact", "/contact"]].map(([label, href]) => (
              <Link key={href} href={href} className="nav-link">{label}</Link>
            ))}
            <Link href="/design" className="btn-glow" style={{
              backgroundColor: "#4CAF50", color: "#fff", padding: "10px 24px",
              borderRadius: 999, fontWeight: 700, fontSize: 14, textDecoration: "none",
              transition: "transform 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              Design Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn"
            style={{ background: "none", border: "none", color: "#888", cursor: "pointer", padding: 8 }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div style={{ borderTop: "1px solid #1F1F1F", padding: "20px 0 28px", display: "flex", flexDirection: "column", gap: 18 }}>
            {[["How It Works", "/how-it-works"], ["About", "/about"], ["Contact", "/contact"]].map(([label, href]) => (
              <Link key={href} href={href} style={{ color: "#ccc", textDecoration: "none", fontWeight: 500 }} onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
            <Link href="/design" style={{
              backgroundColor: "#4CAF50", color: "#fff", padding: "13px 24px",
              borderRadius: 999, fontWeight: 700, textAlign: "center", textDecoration: "none",
            }} onClick={() => setMenuOpen(false)}>
              Design Now
            </Link>
          </div>
        )}
      </div>

      <style>{`
        .desktop-nav { display: flex; }
        .mobile-menu-btn { display: none; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
