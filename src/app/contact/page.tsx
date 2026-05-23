"use client";

import { useState } from "react";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";

const cxWide = { maxWidth: 1100, margin: "0 auto", padding: "0 32px" };
const cx = { maxWidth: 860, margin: "0 auto", padding: "0 32px" };

const inputStyle: React.CSSProperties = {
  backgroundColor: "#13131E",
  border: "1px solid #2A2A3E",
  color: "#fff",
  borderRadius: 12,
  padding: "13px 16px",
  width: "100%",
  fontSize: 14,
  outline: "none",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: 13, fontWeight: 600,
  marginBottom: 7, color: "#ccc",
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", qty: "", description: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      {/* Hero */}
      <section style={{ padding: "140px 0 80px", backgroundColor: "#0F0F18", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 600, height: 300, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(76,175,80,0.18) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", ...cx }}>
          <AnimatedSection>
            <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "#4CAF50", textTransform: "uppercase", marginBottom: 20, backgroundColor: "rgba(76,175,80,0.1)", padding: "5px 14px", borderRadius: 999, border: "1px solid rgba(76,175,80,0.2)" }}>Get in Touch</span>
            <h1 style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 900, color: "#fff", letterSpacing: "-2px", lineHeight: 1.05, marginBottom: 20 }}>
              Let&apos;s Talk Shirts
            </h1>
            <p style={{ fontSize: 18, color: "#7A7A9A", maxWidth: 480, margin: "0 auto" }}>
              Prefer to describe your vision? Send us a quote request and we&apos;ll get back to you fast.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "80px 0 100px", backgroundColor: "#13131E" }}>
        <div style={{ ...cxWide, display: "grid", gap: 56, alignItems: "flex-start" }} className="contact-grid">
          {/* Left — info */}
          <AnimatedSection>
            <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 32 }}>
              We&apos;d love to hear from you
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 36 }}>
              {[
                { icon: "✉️", label: "Email", value: "hello@customeyeze.com", link: "mailto:hello@customeyeze.com" },
                { icon: "⏱️", label: "Response Time", value: "Within 1 business day", link: null },
                { icon: "🖨️", label: "Turnaround", value: "Orders ready in ~1 week", link: null },
              ].map(({ icon, label, value, link }) => (
                <div key={label} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    backgroundColor: "rgba(76,175,80,0.1)", border: "1px solid rgba(76,175,80,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                  }}>
                    {icon}
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 3 }}>{label}</p>
                    {link
                      ? <a href={link} style={{ fontSize: 14, color: "#4CAF50", textDecoration: "none" }}>{value}</a>
                      : <p style={{ fontSize: 14, color: "#7A7A9A" }}>{value}</p>
                    }
                  </div>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: "#1D1D2C", border: "1px solid #2A2A3E", borderRadius: 20, padding: "28px 28px" }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Prefer to design it yourself?</p>
              <p style={{ fontSize: 14, color: "#7A7A9A", marginBottom: 20, lineHeight: 1.7 }}>Use our design studio to upload your artwork and build your shirt in minutes.</p>
              <Link href="/design" className="btn-glow" style={{
                display: "inline-block", backgroundColor: "#4CAF50", color: "#fff",
                padding: "11px 28px", borderRadius: 999, fontWeight: 700, fontSize: 14,
                textDecoration: "none", transition: "transform 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              >
                Open Design Studio
              </Link>
            </div>
          </AnimatedSection>

          {/* Right — form */}
          <AnimatedSection delay={0.12}>
            <div style={{ backgroundColor: "#1D1D2C", border: "1px solid #2A2A3E", borderRadius: 24, padding: "40px 36px" }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "48px 0" }}>
                  <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
                  <h3 style={{ fontFamily: "var(--font-poppins)", fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 10 }}>Got it, thanks!</h3>
                  <p style={{ fontSize: 15, color: "#7A7A9A" }}>We&apos;ll review your request and get back to you within 1 business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div>
                    <label style={labelStyle}>Your Name *</label>
                    <input type="text" name="name" required value={form.name} onChange={handleChange}
                      style={inputStyle} placeholder="John Smith"
                      onFocus={e => (e.currentTarget.style.borderColor = "#4CAF50")}
                      onBlur={e => (e.currentTarget.style.borderColor = "#2A2A3E")} />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address *</label>
                    <input type="email" name="email" required value={form.email} onChange={handleChange}
                      style={inputStyle} placeholder="you@example.com"
                      onFocus={e => (e.currentTarget.style.borderColor = "#4CAF50")}
                      onBlur={e => (e.currentTarget.style.borderColor = "#2A2A3E")} />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone (optional)</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                      style={inputStyle} placeholder="(555) 000-0000"
                      onFocus={e => (e.currentTarget.style.borderColor = "#4CAF50")}
                      onBlur={e => (e.currentTarget.style.borderColor = "#2A2A3E")} />
                  </div>
                  <div>
                    <label style={labelStyle}>Estimated Quantity</label>
                    <select name="qty" value={form.qty} onChange={handleChange}
                      style={{ ...inputStyle, backgroundColor: "#13131E" }}>
                      <option value="">Select quantity range</option>
                      <option>1–11 shirts</option>
                      <option>12–23 shirts</option>
                      <option>24–47 shirts</option>
                      <option>48+ shirts</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Tell us about your order *</label>
                    <textarea name="description" required value={form.description} onChange={handleChange}
                      rows={5} style={{ ...inputStyle, resize: "none" }}
                      placeholder="Describe what you want — shirt colors, design placement, text, event purpose, etc."
                      onFocus={e => (e.currentTarget.style.borderColor = "#4CAF50")}
                      onBlur={e => (e.currentTarget.style.borderColor = "#2A2A3E")} />
                  </div>
                  <button type="submit" className="btn-glow" style={{
                    backgroundColor: "#4CAF50", color: "#fff", border: "none",
                    padding: "15px", borderRadius: 999, fontWeight: 700, fontSize: 16,
                    cursor: "pointer", transition: "transform 0.2s",
                  }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.02)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    Send Quote Request
                  </button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <style>{`
        .contact-grid { grid-template-columns: 1fr 1.4fr; }
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
