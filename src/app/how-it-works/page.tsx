"use client";

import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import TiltCard from "@/components/TiltCard";

const cx = { maxWidth: 860, margin: "0 auto", padding: "0 32px" };

const steps = [
  {
    number: "01", emoji: "👕",
    title: "Choose Your Shirt",
    desc: "Tell us what feel you want — soft, medium, or standard. We'll show you the available styles and colors, with pricing that scales based on quantity.",
    details: ["Soft, medium, or standard fabric feel", "Multiple styles and colors available", "Bulk pricing shown upfront — no surprises"],
  },
  {
    number: "02", emoji: "🎨",
    title: "Design It Your Way",
    desc: "Jump into our design studio. Upload your artwork, place it on the front or back, scale it, rotate it — get it exactly where you want it.",
    details: [
      "Upload your logo or artwork (PNG, JPG, SVG)",
      "Place design on front or back",
      "Scale, rotate, and reposition freely",
      "Add custom text — pick font, size, and color",
    ],
  },
  {
    number: "03", emoji: "🔍",
    title: "Review Your Order",
    desc: "See a full summary of your design, shirt selection, quantities, and total price before you commit to anything.",
    details: ["Design preview with final placement", "Itemized pricing breakdown", "Edit anything before checkout"],
  },
  {
    number: "04", emoji: "📦",
    title: "Pay & We Handle the Rest",
    desc: "Checkout securely with Stripe. Once your payment is confirmed, we review your order and get to printing.",
    details: [
      "Secure Stripe checkout",
      "We review your design before printing",
      "We'll reach out if we spot any issues",
      "Ready in approximately 1 week",
    ],
  },
];

const faqs = [
  { q: "What file types can I upload?", a: "We recommend PNG files with a transparent background for best results. JPG and SVG files are also accepted. The higher the resolution, the sharper your print." },
  { q: "Is there a minimum order?", a: "Nope! You can order as few as one shirt. The more you order, the lower the per-shirt price gets." },
  { q: "How long does it take?", a: "Your order will be ready in approximately one week from when your payment is confirmed and your design is approved." },
  { q: "Can I put a design on both front and back?", a: "Yes! In the design studio you can toggle between front and back and place artwork on both." },
  { q: "What if I don't have artwork ready?", a: "Head to our Contact page and submit a quote request. Describe your design, upload any references, and we'll get back to you." },
  { q: "What printing method do you use?", a: "We use DTF (Direct to Film) printing — vibrant, full-color prints that work on any fabric and hold up wash after wash." },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ padding: "140px 0 80px", backgroundColor: "#0F0F18", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 600, height: 300, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(76,175,80,0.18) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", ...cx }}>
          <AnimatedSection>
            <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "#4CAF50", textTransform: "uppercase", marginBottom: 20, backgroundColor: "rgba(76,175,80,0.1)", padding: "5px 14px", borderRadius: 999, border: "1px solid rgba(76,175,80,0.2)" }}>The Process</span>
            <h1 style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 900, color: "#fff", letterSpacing: "-2px", lineHeight: 1.05, marginBottom: 20 }}>
              How It Works
            </h1>
            <p style={{ fontSize: 18, color: "#7A7A9A", maxWidth: 500, margin: "0 auto" }}>
              From choosing your shirt to your doorstep — here&apos;s exactly what happens.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Steps */}
      <section style={{ padding: "80px 0", backgroundColor: "#13131E" }}>
        <div style={{ ...cx, display: "flex", flexDirection: "column", gap: 20 }}>
          {steps.map((step, i) => (
            <AnimatedSection key={step.number} delay={i * 0.1}>
              <TiltCard style={{ backgroundColor: "#1D1D2C", borderRadius: 24, padding: "36px 32px" }}>
                <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flexShrink: 0 }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: "50%",
                      backgroundColor: "rgba(76,175,80,0.12)", border: "1px solid rgba(76,175,80,0.25)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-poppins)", fontWeight: 900, fontSize: 15, color: "#4CAF50",
                    }}>
                      {step.number}
                    </div>
                    <span style={{ fontSize: 28 }}>{step.emoji}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 10 }}>{step.title}</h2>
                    <p style={{ fontSize: 15, color: "#7A7A9A", lineHeight: 1.75, marginBottom: 16 }}>{step.desc}</p>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                      {step.details.map((d) => (
                        <li key={d} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                          <span style={{ color: "#4CAF50", fontWeight: 700, fontSize: 13, marginTop: 1, flexShrink: 0 }}>✓</span>
                          <span style={{ fontSize: 14, color: "#ccc" }}>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TiltCard>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "80px 0", backgroundColor: "#0F0F18" }}>
        <div style={cx}>
          <AnimatedSection style={{ textAlign: "center", marginBottom: 52 }}>
            <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "#4CAF50", textTransform: "uppercase", marginBottom: 16, backgroundColor: "rgba(76,175,80,0.1)", padding: "5px 14px", borderRadius: 999, border: "1px solid rgba(76,175,80,0.2)" }}>FAQ</span>
            <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 900, color: "#fff", letterSpacing: "-1.5px", marginTop: 12 }}>
              Common Questions
            </h2>
          </AnimatedSection>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {faqs.map((faq, i) => (
              <AnimatedSection key={faq.q} delay={i * 0.07}>
                <TiltCard style={{ backgroundColor: "#1D1D2C", borderRadius: 20, padding: "28px 30px" }}>
                  <h3 style={{ fontFamily: "var(--font-poppins)", fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{faq.q}</h3>
                  <p style={{ fontSize: 14, color: "#7A7A9A", lineHeight: 1.75 }}>{faq.a}</p>
                </TiltCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 0", backgroundColor: "#0C150C", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 500, height: 250, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(76,175,80,0.2) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", ...cx }}>
          <AnimatedSection>
            <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 900, color: "#fff", letterSpacing: "-1.5px", marginBottom: 16 }}>
              Ready to get started?
            </h2>
            <p style={{ fontSize: 16, color: "#7A7A9A", marginBottom: 40 }}>Jump into the design studio — it&apos;s free and takes minutes.</p>
            <Link href="/design" className="btn-glow" style={{
              display: "inline-block", backgroundColor: "#4CAF50", color: "#fff",
              padding: "15px 44px", borderRadius: 999, fontWeight: 700, fontSize: 16,
              textDecoration: "none", transition: "transform 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              Design Now
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
