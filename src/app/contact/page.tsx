"use client";

import { useState } from "react";
import Link from "next/link";

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

  const inputStyle = {
    backgroundColor: "#1C1C1E",
    border: "1px solid #3A3A3C",
    color: "#FFFFFF",
    borderRadius: "12px",
    padding: "12px 16px",
    width: "100%",
    fontSize: "14px",
    outline: "none",
  };

  const labelStyle = { display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#EBEBF0" };

  return (
    <>
      <section className="py-24 text-center relative overflow-hidden" style={{ backgroundColor: "#1C1C1E" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-15"
            style={{ background: "radial-gradient(ellipse, #4CAF50 0%, transparent 70%)" }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#4CAF50" }}>Get in Touch</p>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-5" style={{ fontFamily: "var(--font-poppins)", color: "#FFFFFF" }}>
            Let&apos;s Talk Shirts
          </h1>
          <p className="text-lg" style={{ color: "#8E8E93" }}>
            Prefer to describe your vision? Send us a quote request and we&apos;ll get back to you fast.
          </p>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: "#111111" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: "var(--font-poppins)", color: "#FFFFFF" }}>
              We&apos;d Love to Hear From You
            </h2>
            <div className="space-y-6">
              {[
                { icon: "✉", label: "Email", value: "hello@customeyeze.com", link: "mailto:hello@customeyeze.com" },
                { icon: "⏱", label: "Response Time", value: "Within 1 business day", link: null },
                { icon: "🖨", label: "Turnaround", value: "Orders ready in ~1 week", link: null },
              ].map(({ icon, label, value, link }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                    style={{ backgroundColor: "rgba(76,175,80,0.1)", color: "#4CAF50" }}>
                    {icon}
                  </div>
                  <div>
                    <p className="font-semibold mb-0.5" style={{ color: "#FFFFFF" }}>{label}</p>
                    {link
                      ? <a href={link} className="text-sm" style={{ color: "#4CAF50" }}>{value}</a>
                      : <p className="text-sm" style={{ color: "#8E8E93" }}>{value}</p>
                    }
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl p-6 border" style={{ backgroundColor: "#2C2C2E", borderColor: "#3A3A3C" }}>
              <p className="font-semibold mb-1" style={{ color: "#FFFFFF" }}>Prefer to design it yourself?</p>
              <p className="text-sm mb-4" style={{ color: "#8E8E93" }}>Use our design studio to upload your artwork and build your shirt in minutes.</p>
              <Link href="/design"
                className="inline-block px-6 py-3 rounded-full font-semibold text-sm"
                style={{ backgroundColor: "#4CAF50", color: "#FFFFFF" }}>
                Open Design Studio
              </Link>
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-5">🎉</div>
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-poppins)", color: "#FFFFFF" }}>Got it, thanks!</h3>
                <p style={{ color: "#8E8E93" }}>We&apos;ll review your request and get back to you within 1 business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label style={labelStyle}>Your Name *</label>
                  <input type="text" name="name" required value={form.name} onChange={handleChange}
                    style={inputStyle} placeholder="John Smith" />
                </div>
                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input type="email" name="email" required value={form.email} onChange={handleChange}
                    style={inputStyle} placeholder="you@example.com" />
                </div>
                <div>
                  <label style={labelStyle}>Phone (optional)</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                    style={inputStyle} placeholder="(555) 000-0000" />
                </div>
                <div>
                  <label style={labelStyle}>Estimated Quantity</label>
                  <select name="qty" value={form.qty} onChange={handleChange}
                    style={{ ...inputStyle, backgroundColor: "#1C1C1E" }}>
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
                    placeholder="Describe what you want — shirt colors, design placement, text, event purpose, etc." />
                </div>
                <button type="submit"
                  className="w-full py-4 rounded-full font-bold text-lg transition-all"
                  style={{ backgroundColor: "#4CAF50", color: "#FFFFFF" }}>
                  Send Quote Request
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
