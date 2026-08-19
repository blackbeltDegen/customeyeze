"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

// Placeholder quotes — swap for real customer reviews.
const quotes = [
  { role: "Team Manager, Local Soccer League", quote: "Ordered 30 jerseys with zero minimums stress. Colors came out exactly like the mockup." },
  { role: "Booster Club President", quote: "Bulk pricing made our spirit wear drop actually affordable. Turnaround was right on schedule." },
  { role: "Small Brand Owner", quote: "The print quality is what sold me — it feels bonded into the fabric, not sitting on top of it." },
  { role: "Event Organizer", quote: "Single shirt orders for a reunion, no minimums, no hassle. Exactly what we needed." },
  { role: "Independent Creator", quote: "I handed off the art, they handled printing. My merch finally looks as good as it does on screen." },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const distance = track.scrollWidth - section.clientWidth;
      if (distance <= 0) return;

      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance + window.innerHeight * 0.4}`,
          scrub: 0.6,
          pin: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ position: "relative", height: "100vh", overflow: "hidden", backgroundColor: "#0C150C", display: "flex", alignItems: "center" }}>
      <div style={{ position: "absolute", top: 60, left: 0, right: 0, maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "#4CAF50", textTransform: "uppercase", marginBottom: 14, backgroundColor: "rgba(76,175,80,0.1)", padding: "5px 14px", borderRadius: 999, border: "1px solid rgba(76,175,80,0.2)" }}>
          What People Say
        </span>
      </div>

      <div ref={trackRef} style={{ display: "flex", gap: 24, paddingLeft: "max(32px, calc((100vw - 1280px) / 2 + 32px))", willChange: "transform" }}>
        {quotes.map((q) => (
          <div
            key={q.role}
            style={{
              flex: "0 0 auto",
              width: "min(560px, 82vw)",
              backgroundColor: "#13201A",
              border: "1px solid #223322",
              borderRadius: 28,
              padding: "48px 44px",
            }}
          >
            <span style={{ fontFamily: "var(--font-poppins)", fontSize: 60, color: "rgba(76,175,80,0.35)", lineHeight: 1, display: "block", marginBottom: 12 }}>&ldquo;</span>
            <p style={{ fontSize: 22, color: "#fff", lineHeight: 1.5, fontWeight: 500, marginBottom: 28 }}>{q.quote}</p>
            <p style={{ fontSize: 13, color: "#4CAF50", fontWeight: 700, letterSpacing: "0.04em" }}>{q.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
