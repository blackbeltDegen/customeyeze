"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";

const ThreeScene = dynamic(() => import("./ThreeScene"), { ssr: false });

const cx = { maxWidth: 1280, margin: "0 auto", padding: "0 32px", width: "100%" };

function a(delay: number) {
  return {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: "easeOut" as const },
  };
}

export default function AnimatedHero() {
  return (
    <section style={{
      position: "relative", minHeight: "100vh", display: "flex",
      alignItems: "center", overflow: "hidden", paddingTop: 80,
      background: "linear-gradient(135deg, #0D0D18 0%, #13131E 55%, #0C1A0C 100%)",
    }}>

      <div style={cx}>
        <div style={{ display: "grid", gap: 48, alignItems: "center" }} className="hero-grid">
          {/* Text */}
          <div>
            <motion.div {...a(0)}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontSize: 11, fontWeight: 700, letterSpacing: "0.18em",
                textTransform: "uppercase", color: "#4CAF50",
                border: "1px solid rgba(76,175,80,0.35)", borderRadius: 999,
                padding: "7px 18px", marginBottom: 32,
                backgroundColor: "rgba(76,175,80,0.08)",
              }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "#4CAF50", display: "inline-block" }} />
                Custom shirts · No minimums · ~1 week delivery
              </span>
            </motion.div>

            <motion.h1 {...a(0.1)} style={{
              fontFamily: "var(--font-poppins)",
              fontSize: "clamp(42px, 5.5vw, 84px)",
              fontWeight: 900, lineHeight: 1.0,
              letterSpacing: "-2px", color: "#FFFFFF", marginBottom: 8,
            }}>
              Your design.
            </motion.h1>

            <motion.h1 {...a(0.18)} className="text-shimmer" style={{
              fontFamily: "var(--font-poppins)",
              fontSize: "clamp(42px, 5.5vw, 84px)",
              fontWeight: 900, lineHeight: 1.0,
              letterSpacing: "-2px", marginBottom: 28,
              display: "block",
            }}>
              Any shirt.
            </motion.h1>

            <motion.p {...a(0.28)} style={{
              fontSize: 17, color: "#9090B0", lineHeight: 1.8,
              maxWidth: 400, marginBottom: 40,
            }}>
              Upload your artwork, pick your style, and get
              professional DTF-printed shirts at your door in about a week.
            </motion.p>

            {/* Quick stats */}
            <motion.div {...a(0.34)} style={{ display: "flex", gap: 28, marginBottom: 40, flexWrap: "wrap" }}>
              {[["No", "Minimums"], ["~1 Wk", "Turnaround"], ["∞", "Colors"]].map(([big, small]) => (
                <div key={big} style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontFamily: "var(--font-poppins)", fontSize: 24, fontWeight: 900, color: "#4CAF50", lineHeight: 1 }}>{big}</span>
                  <span style={{ fontSize: 11, color: "#7A7A9A", marginTop: 4, letterSpacing: "0.08em" }}>{small}</span>
                </div>
              ))}
            </motion.div>

            <motion.div {...a(0.4)} style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="/design" className="btn-glow" style={{
                display: "inline-block", backgroundColor: "#4CAF50", color: "#fff",
                padding: "15px 36px", borderRadius: 999, fontWeight: 700, fontSize: 16,
                textDecoration: "none", transition: "transform 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              >
                Start Designing — It&apos;s Free
              </Link>
              <Link href="/how-it-works" style={{
                display: "inline-flex", alignItems: "center", gap: 8, color: "#9090B0",
                textDecoration: "none", fontSize: 15, fontWeight: 500,
                padding: "15px 24px", border: "1px solid #2A2A3E", borderRadius: 999,
                transition: "color 0.2s, border-color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#4CAF50"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#9090B0"; e.currentTarget.style.borderColor = "#2A2A3E"; }}
              >
                See how it works →
              </Link>
            </motion.div>
          </div>

          {/* 3D scene */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="hero-three"
            style={{ position: "relative" }}
          >
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: 360, height: 360, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(76,175,80,0.2) 0%, transparent 70%)",
              filter: "blur(50px)", pointerEvents: "none",
            }} />
            <ThreeScene />
          </motion.div>
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 100,
        background: "linear-gradient(to bottom, transparent, #13131E)",
        pointerEvents: "none",
      }} />

      <style>{`
        .hero-grid { grid-template-columns: 1fr 1fr; }
        .hero-three { display: block; height: 500px; }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-three { display: none !important; }
        }
      `}</style>
    </section>
  );
}
