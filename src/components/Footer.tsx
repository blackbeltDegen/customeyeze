"use client";

import Link from "next/link";
import Logo from "./Logo";

const cx = { maxWidth: 1280, margin: "0 auto", padding: "0 32px" };

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0B0B14", borderTop: "1px solid #2A2A3E" }}>
      <div style={{ ...cx, paddingTop: 64, paddingBottom: 48 }}>
        <div style={{ display: "grid", gap: 48, marginBottom: 48 }} className="footer-grid">
          <div>
            <div style={{ marginBottom: 20 }}><Logo size={26} /></div>
            <p style={{ fontSize: 14, color: "#444", lineHeight: 1.8, maxWidth: 280 }}>
              Professional DTF printing on custom apparel. No minimums, fast turnaround, and a design tool built for everyone.
            </p>
          </div>

          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#333", marginBottom: 20 }}>Navigate</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
              {[["Home", "/"], ["How It Works", "/how-it-works"], ["About", "/about"], ["Contact", "/contact"]].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} style={{ fontSize: 14, color: "#444", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#444")}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#333", marginBottom: 20 }}>Get Started</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
              <li><Link href="/design" style={{ fontSize: 14, color: "#4CAF50", textDecoration: "none", fontWeight: 600 }}>Design Your Shirt →</Link></li>
              <li><Link href="/contact" style={{ fontSize: 14, color: "#444", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "#444")}>Request a Quote</Link></li>
            </ul>
            <div style={{ marginTop: 24 }}>
              <p style={{ fontSize: 12, color: "#333", marginBottom: 6 }}>Questions?</p>
              <a href="mailto:hello@customeyeze.com" style={{ fontSize: 13, color: "#4CAF50", textDecoration: "none", fontWeight: 600 }}>
                hello@customeyeze.com
              </a>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #2A2A3E", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12, color: "#4A4A6A" }}>&copy; {new Date().getFullYear()} Customeyeze. All rights reserved.</p>
          <p style={{ fontSize: 12, color: "#4A4A6A" }}>Made for teams, brands &amp; dreamers.</p>
        </div>
      </div>

      <style>{`
        .footer-grid { grid-template-columns: 2fr 1fr 1fr; }
        @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
