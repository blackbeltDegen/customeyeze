"use client";

import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import TiltCard from "@/components/TiltCard";

const cx = { maxWidth: 900, margin: "0 auto", padding: "0 32px" };

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ padding: "140px 0 80px", backgroundColor: "#0F0F18", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 600, height: 300, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(76,175,80,0.18) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", ...cx }}>
          <AnimatedSection>
            <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "#4CAF50", textTransform: "uppercase", marginBottom: 20, backgroundColor: "rgba(76,175,80,0.1)", padding: "5px 14px", borderRadius: 999, border: "1px solid rgba(76,175,80,0.2)" }}>Our Story</span>
            <h1 style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 900, color: "#fff", letterSpacing: "-2px", lineHeight: 1.05, marginBottom: 20 }}>
              About Customeyeze
            </h1>
            <p style={{ fontSize: 18, color: "#7A7A9A", maxWidth: 500, margin: "0 auto" }}>
              We started with a simple idea — custom shirts shouldn&apos;t be complicated.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "80px 0 100px", backgroundColor: "#13131E" }}>
        <div style={{ ...cx, display: "flex", flexDirection: "column", gap: 24 }}>
          <AnimatedSection>
            <TiltCard style={{ backgroundColor: "#1D1D2C", borderRadius: 24, padding: "40px 36px" }}>
              <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 16 }}>Our Story</h2>
              <p style={{ fontSize: 15, color: "#7A7A9A", lineHeight: 1.8, marginBottom: 14 }}>
                Customeyeze was born out of frustration. Getting custom shirts used to mean confusing order forms,
                high minimums, slow turnaround, and designs that never quite looked the way you imagined.
              </p>
              <p style={{ fontSize: 15, color: "#7A7A9A", lineHeight: 1.8 }}>
                We built something better — a design tool that&apos;s actually fun to use, with professional DTF
                printing that brings your vision to life exactly as you see it. No minimums, no runarounds,
                just great shirts delivered fast.
              </p>
            </TiltCard>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <TiltCard style={{ backgroundColor: "#1D1D2C", borderRadius: 24, padding: "40px 36px" }}>
              <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 16 }}>What We Do</h2>
              <p style={{ fontSize: 15, color: "#7A7A9A", lineHeight: 1.8, marginBottom: 14 }}>
                We specialize in <strong style={{ color: "#4CAF50" }}>DTF (Direct to Film)</strong> printing — one of the most versatile and vibrant
                printing methods available. It works on virtually any fabric, supports full-color designs with no color
                limits, and produces a soft, wash-resistant print that lasts.
              </p>
              <p style={{ fontSize: 15, color: "#7A7A9A", lineHeight: 1.8 }}>
                Whether you need one shirt or hundreds, every order gets the same care and quality.
              </p>
            </TiltCard>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <TiltCard style={{ backgroundColor: "#1D1D2C", borderRadius: 24, padding: "40px 36px" }}>
              <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 24 }}>Who We Serve</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }} className="who-grid">
                {["Sports Teams", "Schools & Clubs", "Small Businesses", "Brands & Creators", "Events & Parties", "Individuals"].map((item) => (
                  <div key={item} style={{
                    backgroundColor: "#13131E", border: "1px solid #2A2A3E",
                    borderRadius: 12, padding: "12px 16px", fontSize: 13,
                    fontWeight: 600, color: "#ccc", textAlign: "center",
                  }}>
                    {item}
                  </div>
                ))}
              </div>
            </TiltCard>
          </AnimatedSection>

          <AnimatedSection delay={0.2} style={{ textAlign: "center", paddingTop: 16 }}>
            <Link href="/design" className="btn-glow" style={{
              display: "inline-block", backgroundColor: "#4CAF50", color: "#fff",
              padding: "15px 44px", borderRadius: 999, fontWeight: 700, fontSize: 16,
              textDecoration: "none", transition: "transform 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              Start Designing
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <style>{`
        .who-grid { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 560px) { .who-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </>
  );
}
