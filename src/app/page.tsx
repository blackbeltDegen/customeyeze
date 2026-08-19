"use client";

import Link from "next/link";
import AnimatedHero from "@/components/AnimatedHero";
import Marquee from "@/components/Marquee";
import AnimatedSection from "@/components/AnimatedSection";
import ProcessTimeline from "@/components/ProcessTimeline";
import SmoothScroll from "@/components/home/SmoothScroll";
import RevealSection from "@/components/home/RevealSection";
import ParallaxLayer from "@/components/home/ParallaxLayer";
import Gallery from "@/components/home/Gallery";
import ExplodedProcess from "@/components/home/ExplodedProcess";
import Testimonials from "@/components/home/Testimonials";
import { Shirt, Palette, Package, Trophy, GraduationCap, Briefcase, PartyPopper, User } from "lucide-react";

const cx = { maxWidth: 1280, margin: "0 auto", padding: "0 32px" };

const steps = [
  { number: "01", icon: <Shirt size={22} strokeWidth={1.75} />, title: "Pick Your Shirt", desc: "Soft, medium, or standard — choose the fabric feel and style that fits your order." },
  { number: "02", icon: <Palette size={22} strokeWidth={1.75} />, title: "Design It", desc: "Upload your artwork, add text, place it on the front or back. Your vision, your rules." },
  { number: "03", icon: <Package size={22} strokeWidth={1.75} />, title: "Pay & We Ship", desc: "Secure checkout via Stripe. We review, print, and deliver in about a week." },
];

const useCases = [
  { Icon: Trophy, title: "Sports Teams", body: "Jerseys, practice tees, fan gear. Match your exact colors down to the thread.", featured: true },
  { Icon: GraduationCap, title: "Schools & Clubs", body: "Spirit wear, graduation, events." },
  { Icon: Briefcase, title: "Brands & Business", body: "Merch, uniforms, and promo drops that actually look premium, not printed in a rush.", featured: true },
  { Icon: PartyPopper, title: "Events", body: "Reunions, bachelorettes, fundraisers." },
  { Icon: User, title: "Just You", body: "One shirt. No minimums." },
  { Icon: Palette, title: "Creators", body: "Drop your own merch line." },
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
      <SmoothScroll />
      <AnimatedHero />
      <Marquee />
      <Gallery />

      {/* HOW IT WORKS */}
      <section style={{ padding: "110px 0", backgroundColor: "#13131E", position: "relative", overflow: "hidden" }}>
        <ParallaxLayer speed={0.25} style={{ position: "absolute", top: "10%", right: "-12%", opacity: 0.45 }}>
          <div className="orb orb-1" />
        </ParallaxLayer>
        <div style={cx}>
          <RevealSection style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "#4CAF50", textTransform: "uppercase", marginBottom: 14, backgroundColor: "rgba(76,175,80,0.1)", padding: "5px 14px", borderRadius: 999, border: "1px solid rgba(76,175,80,0.2)" }}>The Process</span>
            <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(34px, 4vw, 60px)", fontWeight: 400, color: "#fff", letterSpacing: "-0.5px", lineHeight: 1.08, marginTop: 14 }}>
              Simple as 1, 2, 3.
            </h2>
          </RevealSection>

          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <ProcessTimeline
              steps={steps}
              renderStep={(i, node) => (
                <RevealSection key={i} delay={i * 0.1}>
                  {node}
                </RevealSection>
              )}
            />
          </div>

          <AnimatedSection style={{ textAlign: "center", marginTop: 12 }}>
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
          <RevealSection style={{ marginBottom: 64 }}>
            <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "#4CAF50", textTransform: "uppercase", marginBottom: 14, backgroundColor: "rgba(76,175,80,0.1)", padding: "5px 14px", borderRadius: 999, border: "1px solid rgba(76,175,80,0.2)" }}>Who It&apos;s For</span>
            <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(34px, 4vw, 60px)", fontWeight: 400, color: "#fff", letterSpacing: "-0.5px", lineHeight: 1.08, maxWidth: 480, marginTop: 14 }}>
              Built for everyone.
            </h2>
          </RevealSection>

          <div style={{ display: "grid", gap: 16 }} className="use-case-grid">
            {useCases.map((u, i) => (
              <AnimatedSection key={u.title} delay={i * 0.07} className={u.featured ? "use-case-featured" : undefined}>
                <div style={{
                  backgroundColor: "#1D1D2C", border: "1px solid #2A2A3E", borderRadius: 20, height: "100%",
                  padding: u.featured ? "34px 30px" : "24px 22px",
                  display: "flex", flexDirection: u.featured ? "column" : "row", alignItems: u.featured ? "flex-start" : "center",
                  gap: u.featured ? 0 : 14,
                }}>
                  <div style={{
                    width: u.featured ? 48 : 40, height: u.featured ? 48 : 40, borderRadius: 12, flexShrink: 0,
                    backgroundColor: "rgba(76,175,80,0.1)", border: "1px solid rgba(76,175,80,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: u.featured ? 18 : 0,
                  }}>
                    <u.Icon size={u.featured ? 24 : 19} color="#4CAF50" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-poppins)", fontSize: u.featured ? 19 : 15, fontWeight: 400, color: "#fff", marginBottom: u.featured ? 8 : 2 }}>{u.title}</h3>
                    <p style={{ fontSize: u.featured ? 14 : 13, color: "#7A7A9A", lineHeight: 1.6 }}>{u.body}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING — green-tinted dark section for contrast */}
      <section style={{ padding: "110px 0", backgroundColor: "#0C150C", position: "relative", overflow: "hidden" }}>
        <ParallaxLayer speed={-0.2} style={{ position: "absolute", top: "30%", left: "-8%", opacity: 0.5 }}>
          <div className="orb orb-2" />
        </ParallaxLayer>
        <div style={cx}>
          <RevealSection style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "#4CAF50", textTransform: "uppercase", marginBottom: 14, backgroundColor: "rgba(76,175,80,0.1)", padding: "5px 14px", borderRadius: 999, border: "1px solid rgba(76,175,80,0.2)" }}>Pricing</span>
            <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(34px, 4vw, 60px)", fontWeight: 400, color: "#fff", letterSpacing: "-0.5px", lineHeight: 1.08, marginTop: 14 }}>
              More shirts,<br />lower price.
            </h2>
            <p style={{ fontSize: 16, color: "#7A7A9A", marginTop: 12 }}>No minimums. Ever.</p>
          </RevealSection>

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
                  <p style={{ fontFamily: "var(--font-poppins)", fontSize: 40, fontWeight: 400, color: tier.hot ? "#fff" : "#4CAF50", letterSpacing: "-1px", lineHeight: 1 }}>{tier.price}</p>
                  <p style={{ fontSize: 12, color: tier.hot ? "rgba(255,255,255,0.6)" : "#4A4A6A", marginTop: 8 }}>per shirt</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <p style={{ textAlign: "center", fontSize: 12, color: "#4A4A6A", marginTop: 36 }}>* Pricing shown for standard shirts. Premium styles may vary slightly.</p>
        </div>
      </section>

      <ExplodedProcess />

      <Testimonials />

      {/* FINAL CTA */}
      <section style={{ position: "relative", padding: "140px 0", overflow: "hidden", textAlign: "center", backgroundColor: "#0C150C" }}>
        <div className="orb orb-1" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.65 }} />
        <div style={{ position: "relative", ...cx }}>
          <RevealSection>
            <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "#4CAF50", textTransform: "uppercase", marginBottom: 20, backgroundColor: "rgba(76,175,80,0.1)", padding: "5px 14px", borderRadius: 999, border: "1px solid rgba(76,175,80,0.2)" }}>Ready?</span>
            <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(42px, 6vw, 84px)", fontWeight: 400, color: "#fff", letterSpacing: "-1px", lineHeight: 1.0, marginBottom: 20, marginTop: 14 }}>
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
          </RevealSection>
        </div>
      </section>

      <style>{`
        .use-case-grid { grid-template-columns: repeat(3, 1fr); }
        .use-case-featured { grid-column: span 2; }
        .pricing-grid { grid-template-columns: repeat(4, 1fr); }
        @media (max-width: 960px) {
          .use-case-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .use-case-featured { grid-column: span 2 !important; }
          .pricing-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .use-case-grid { grid-template-columns: 1fr !important; }
          .use-case-featured { grid-column: span 1 !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
