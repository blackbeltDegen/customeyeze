"use client";

import Link from "next/link";
import AnimatedHero from "@/components/AnimatedHero";
import Marquee from "@/components/Marquee";
import AnimatedSection from "@/components/AnimatedSection";
import TiltCard from "@/components/TiltCard";

const cx = { maxWidth: 1280, margin: "0 auto", padding: "0 32px" };

const steps = [
  { n: "01", emoji: "👕", title: "Pick Your Shirt", body: "Soft, medium, or standard — choose the fabric feel and style that fits your order." },
  { n: "02", emoji: "🎨", title: "Design It", body: "Upload your artwork, add text, place it on the front or back. Your vision, your rules." },
  { n: "03", emoji: "📦", title: "Pay & We Ship", body: "Secure checkout via Stripe. We review, print, and deliver in about a week." },
];

const useCases = [
  { icon: "⚽", title: "Sports Teams", body: "Jerseys, practice tees, fan gear. Match your exact colors." },
  { icon: "🎓", title: "Schools & Clubs", body: "Spirit wear, graduation, events. Bulk pricing makes it painless." },
  { icon: "👔", title: "Brands & Business", body: "Merch, uniforms, promo drops that actually look premium." },
  { icon: "🎉", title: "Events", body: "Reunions, bachelorettes, fundraisers — make every event memorable." },
  { icon: "🙋", title: "Just You", body: "Order a single shirt. No minimums, no questions asked." },
  { icon: "🎨", title: "Creators", body: "Drop your own merch. We handle printing, you keep the vision." },
];

const pricing = [
  { qty: "1–11", price: "$24.99", label: "Single order" },
  { qty: "12–23", price: "$19.99", label: "Small batch", hot: true },
  { qty: "24–47", price: "$16.99", label: "Team order" },
  { qty: "48+", price: "$13.99", label: "Bulk order" },
];

export default function HomePage() {
  return (
    <>
      <AnimatedHero />
      <Marquee />

      {/* HOW IT WORKS */}
      <section style={{ padding: "110px 0", backgroundColor: "#13131E", position: "relative", overflow: "hidden" }}>
        <div className="orb orb-1" style={{ position: "absolute", top: "10%", right: "-12%", opacity: 0.45 }} />
        <div style={cx}>
          <AnimatedSection style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "#4CAF50", textTransform: "uppercase", marginBottom: 14, backgroundColor: "rgba(76,175,80,0.1)", padding: "5px 14px", borderRadius: 999, border: "1px solid rgba(76,175,80,0.2)" }}>The Process</span>
            <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(34px, 4vw, 60px)", fontWeight: 900, color: "#fff", letterSpacing: "-1.5px", lineHeight: 1.08, marginTop: 14 }}>
              Simple as 1, 2, 3.
            </h2>
          </AnimatedSection>

          <div style={{ display: "grid", gap: 20 }} className="steps-grid">
            {steps.map((s, i) => (
              <AnimatedSection key={s.n} delay={i * 0.12}>
                <TiltCard style={{ backgroundColor: "#1D1D2C", borderRadius: 24, padding: "40px 32px", height: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                    <span style={{ fontSize: 40 }}>{s.emoji}</span>
                    <span style={{ fontFamily: "var(--font-poppins)", fontSize: 56, fontWeight: 900, color: "rgba(76,175,80,0.12)", lineHeight: 1 }}>{s.n}</span>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-poppins)", fontSize: 21, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ fontSize: 15, color: "#7A7A9A", lineHeight: 1.7 }}>{s.body}</p>
                </TiltCard>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection style={{ textAlign: "center", marginTop: 52 }}>
            <Link href="/design" className="btn-glow" style={{
              display: "inline-block", backgroundColor: "#4CAF50", color: "#fff",
              padding: "15px 40px", borderRadius: 999, fontWeight: 700, fontSize: 16,
              textDecoration: "none", transition: "transform 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              Design Your Shirt Now
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Reverse marquee — lighter version */}
      <div style={{ overflow: "hidden", backgroundColor: "#1D1D2C", padding: "13px 0" }}>
        <div className="marquee-track" style={{ animationDirection: "reverse", animationDuration: "20s" }}>
          {[...Array(30)].map((_, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 20, padding: "0 24px", whiteSpace: "nowrap" }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "#4CAF50" }}>CUSTOMEYEZE</span>
              <span style={{ color: "#2A2A4A", fontSize: 14 }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* WHO IT'S FOR */}
      <section style={{ padding: "110px 0", backgroundColor: "#0F0F18", position: "relative" }}>
        <div style={cx}>
          <AnimatedSection style={{ marginBottom: 64 }}>
            <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "#4CAF50", textTransform: "uppercase", marginBottom: 14, backgroundColor: "rgba(76,175,80,0.1)", padding: "5px 14px", borderRadius: 999, border: "1px solid rgba(76,175,80,0.2)" }}>Who It&apos;s For</span>
            <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(34px, 4vw, 60px)", fontWeight: 900, color: "#fff", letterSpacing: "-1.5px", lineHeight: 1.08, maxWidth: 480, marginTop: 14 }}>
              Built for everyone.
            </h2>
          </AnimatedSection>

          <div style={{ display: "grid", gap: 16 }} className="use-case-grid">
            {useCases.map((u, i) => (
              <AnimatedSection key={u.title} delay={i * 0.07}>
                <TiltCard style={{ backgroundColor: "#1D1D2C", borderRadius: 24, padding: "30px 26px", height: "100%" }}>
                  <span style={{ fontSize: 38, display: "block", marginBottom: 16 }}>{u.icon}</span>
                  <h3 style={{ fontFamily: "var(--font-poppins)", fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{u.title}</h3>
                  <p style={{ fontSize: 14, color: "#7A7A9A", lineHeight: 1.7 }}>{u.body}</p>
                </TiltCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING — green-tinted dark section for contrast */}
      <section style={{ padding: "110px 0", backgroundColor: "#0C150C", position: "relative", overflow: "hidden" }}>
        <div className="orb orb-2" style={{ position: "absolute", top: "30%", left: "-8%", opacity: 0.5 }} />
        <div style={cx}>
          <AnimatedSection style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "#4CAF50", textTransform: "uppercase", marginBottom: 14, backgroundColor: "rgba(76,175,80,0.1)", padding: "5px 14px", borderRadius: 999, border: "1px solid rgba(76,175,80,0.2)" }}>Pricing</span>
            <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(34px, 4vw, 60px)", fontWeight: 900, color: "#fff", letterSpacing: "-1.5px", lineHeight: 1.08, marginTop: 14 }}>
              More shirts,<br />lower price.
            </h2>
            <p style={{ fontSize: 16, color: "#7A7A9A", marginTop: 12 }}>No minimums. Ever.</p>
          </AnimatedSection>

          <div style={{ display: "grid", gap: 16, maxWidth: 860, margin: "0 auto" }} className="pricing-grid">
            {pricing.map((tier, i) => (
              <AnimatedSection key={tier.qty} delay={i * 0.1}>
                <div style={{
                  backgroundColor: tier.hot ? "#4CAF50" : "#1D1D2C",
                  borderRadius: 22, padding: "38px 20px", textAlign: "center",
                  border: tier.hot ? "none" : "1px solid #2A2A3E",
                  transform: tier.hot ? "scale(1.06)" : "scale(1)",
                  boxShadow: tier.hot ? "0 0 70px rgba(76,175,80,0.4)" : "none",
                  position: "relative", overflow: "hidden",
                }}>
                  {tier.hot && <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 60%)", pointerEvents: "none" }} />}
                  <p style={{ fontSize: 11, color: tier.hot ? "rgba(255,255,255,0.75)" : "#4A4A6A", marginBottom: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>{tier.label}</p>
                  {tier.hot && <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.2em", color: "rgba(255,255,255,0.9)", textTransform: "uppercase", marginBottom: 8, backgroundColor: "rgba(0,0,0,0.15)", display: "inline-block", padding: "3px 10px", borderRadius: 999 }}>MOST POPULAR</p>}
                  <p style={{ fontSize: 12, fontWeight: 700, color: tier.hot ? "rgba(255,255,255,0.8)" : "#7A7A9A", marginBottom: 10, letterSpacing: "0.12em", textTransform: "uppercase" }}>{tier.qty} shirts</p>
                  <p style={{ fontFamily: "var(--font-poppins)", fontSize: 40, fontWeight: 900, color: tier.hot ? "#fff" : "#4CAF50", letterSpacing: "-1px", lineHeight: 1 }}>{tier.price}</p>
                  <p style={{ fontSize: 12, color: tier.hot ? "rgba(255,255,255,0.6)" : "#4A4A6A", marginTop: 8 }}>per shirt</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <p style={{ textAlign: "center", fontSize: 12, color: "#4A4A6A", marginTop: 36 }}>* Pricing shown for standard shirts. Premium styles may vary slightly.</p>
        </div>
      </section>

      {/* WHY DTF */}
      <section style={{ padding: "110px 0", backgroundColor: "#13131E", position: "relative", overflow: "hidden" }}>
        <div style={cx}>
          <div style={{ display: "grid", gap: 72, alignItems: "center" }} className="dtf-grid">
            <AnimatedSection>
              <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "#4CAF50", textTransform: "uppercase", marginBottom: 14, backgroundColor: "rgba(76,175,80,0.1)", padding: "5px 14px", borderRadius: 999, border: "1px solid rgba(76,175,80,0.2)" }}>Why DTF?</span>
              <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 900, color: "#fff", letterSpacing: "-1.5px", lineHeight: 1.08, marginBottom: 36, marginTop: 14 }}>
                Print quality<br />you can feel.
              </h2>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 18 }}>
                {[
                  ["Full-color prints", "No color limits, no setup fees per color."],
                  ["Any fabric", "Cotton, polyester, blends — dark or light."],
                  ["Soft to the touch", "The print bonds to the shirt, not on top."],
                  ["Built to last", "Wash-resistant and vibrant for years."],
                ].map(([b, rest]) => (
                  <li key={b as string} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <span style={{
                      width: 24, height: 24, borderRadius: "50%",
                      backgroundColor: "rgba(76,175,80,0.18)", color: "#4CAF50",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 800, flexShrink: 0, marginTop: 2,
                    }}>✓</span>
                    <span style={{ fontSize: 15, color: "#9090B0", lineHeight: 1.65 }}>
                      <strong style={{ color: "#ddd", fontWeight: 600 }}>{b as string}</strong> — {rest as string}
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="/design" className="btn-glow" style={{
                display: "inline-block", marginTop: 40, backgroundColor: "#4CAF50", color: "#fff",
                padding: "15px 36px", borderRadius: 999, fontWeight: 700, fontSize: 16,
                textDecoration: "none", transition: "transform 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              >
                Start Your Order
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <TiltCard style={{
                backgroundColor: "#1D1D2C",
                borderRadius: 28, padding: "52px 40px", textAlign: "center",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: "50%", left: "50%",
                  transform: "translate(-50%,-50%)",
                  width: 280, height: 280, borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(76,175,80,0.14) 0%, transparent 70%)",
                  pointerEvents: "none",
                }} />
                <div style={{ fontSize: 90, marginBottom: 20 }}>👕</div>
                <p style={{ fontFamily: "var(--font-poppins)", fontSize: 21, fontWeight: 800, color: "#fff", marginBottom: 8 }}>DTF Printing</p>
                <p style={{ fontSize: 14, color: "#7A7A9A", lineHeight: 1.7 }}>Direct to Film — the gold standard<br />for custom apparel printing</p>
                <div style={{ marginTop: 28, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                  {["Vivid Colors", "Any Fabric", "Wash-Safe", "No Minimums"].map(tag => (
                    <span key={tag} style={{
                      fontSize: 11, fontWeight: 700, color: "#4CAF50",
                      border: "1px solid rgba(76,175,80,0.3)", borderRadius: 999,
                      padding: "5px 12px", backgroundColor: "rgba(76,175,80,0.08)",
                    }}>{tag}</span>
                  ))}
                </div>
              </TiltCard>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ position: "relative", padding: "140px 0", overflow: "hidden", textAlign: "center", backgroundColor: "#0C150C" }}>
        <div className="orb orb-1" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.65 }} />
        <div style={{ position: "relative", ...cx }}>
          <AnimatedSection>
            <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "#4CAF50", textTransform: "uppercase", marginBottom: 20, backgroundColor: "rgba(76,175,80,0.1)", padding: "5px 14px", borderRadius: 999, border: "1px solid rgba(76,175,80,0.2)" }}>Ready?</span>
            <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(42px, 6vw, 84px)", fontWeight: 900, color: "#fff", letterSpacing: "-2px", lineHeight: 1.0, marginBottom: 20, marginTop: 14 }}>
              Let&apos;s build<br />something.
            </h2>
            <p style={{ fontSize: 18, color: "#7A7A9A", marginBottom: 48 }}>Free to start. Easy to use. Ready in about a week.</p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/design" className="btn-glow" style={{
                display: "inline-block", backgroundColor: "#4CAF50", color: "#fff",
                padding: "17px 52px", borderRadius: 999, fontWeight: 700, fontSize: 18,
                textDecoration: "none", transition: "transform 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              >
                Design Now — It&apos;s Free
              </Link>
              <Link href="/contact" style={{
                display: "inline-block", color: "#7A7A9A", textDecoration: "none",
                padding: "17px 40px", borderRadius: 999, fontWeight: 600, fontSize: 16,
                border: "1px solid #2A2A3E", transition: "color 0.2s, border-color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#4CAF50"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#7A7A9A"; e.currentTarget.style.borderColor = "#2A2A3E"; }}
              >
                Request a Quote
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <style>{`
        .steps-grid { grid-template-columns: repeat(3, 1fr); }
        .use-case-grid { grid-template-columns: repeat(3, 1fr); }
        .dtf-grid { grid-template-columns: 1fr 1fr; }
        .pricing-grid { grid-template-columns: repeat(4, 1fr); }
        @media (max-width: 960px) {
          .steps-grid { grid-template-columns: 1fr !important; }
          .use-case-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .dtf-grid { grid-template-columns: 1fr !important; }
          .pricing-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .use-case-grid { grid-template-columns: 1fr !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
