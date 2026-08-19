"use client";

import { useEffect, useRef } from "react";
import { Shirt, Film, Flame, Sparkles } from "lucide-react";
import { gsap } from "@/lib/gsap";

const layers = [
  { n: "01", label: "The Blank", body: "Cotton, poly, or a blend — dark or light, any fabric holds the print.", icon: Shirt, tint: "rgba(255,255,255,0.06)" },
  { n: "02", label: "The Film", body: "Your artwork is printed onto DTF film in full, unlimited color.", icon: Film, tint: "rgba(76,175,80,0.10)" },
  { n: "03", label: "The Press", body: "Heat and pressure bond the film into the fibers — not on top of them.", icon: Flame, tint: "rgba(76,175,80,0.16)" },
  { n: "04", label: "The Print", body: "Soft to the touch, wash-resistant, and vivid for years.", icon: Sparkles, tint: "rgba(76,175,80,0.24)" },
];

export default function ExplodedProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const stack = stackRef.current;
    if (!section || !stack) return;

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

      gsap.set(cards, { y: 0, z: 0, opacity: 0, rotateX: 0 });
      gsap.set(cards[0], { opacity: 1 });

      // Sticky-based pin (CSS `position: sticky` on the inner wrapper) instead of
      // ScrollTrigger's `pin: true` — the latter reparents the pinned node into a
      // pin-spacer div, which fights React's own DOM diffing on route change and
      // throws "removeChild" NotFoundErrors when navigating away mid-pin.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;
        tl.to(
          card,
          { opacity: 1, duration: 0.3 },
          i * 0.9 - 0.3
        );
      });

      cards.forEach((card, i) => {
        tl.to(
          card,
          {
            y: -i * 120,
            z: i * 90,
            rotateX: 8,
            duration: 0.9,
            ease: "power2.out",
          },
          i * 0.9
        );
      });

      tl.to(cards, { rotateX: 8 }, ">-0.5");
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ position: "relative", height: "300vh" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#0F0F18",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 32px",
            width: "100%",
            display: "grid",
            gap: 60,
            alignItems: "center",
          }}
          className="exploded-grid"
        >
          <div>
            <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "#4CAF50", textTransform: "uppercase", marginBottom: 14, backgroundColor: "rgba(76,175,80,0.1)", padding: "5px 14px", borderRadius: 999, border: "1px solid rgba(76,175,80,0.2)" }}>
              How It&apos;s Made
            </span>
            <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(32px, 3.5vw, 54px)", fontWeight: 400, color: "#fff", letterSpacing: "-1.5px", lineHeight: 1.08, marginTop: 14, marginBottom: 28 }}>
              Four layers.<br />One print that lasts.
            </h2>
            <p style={{ fontSize: 15, color: "#7A7A9A", lineHeight: 1.8, maxWidth: 400, marginBottom: 32 }}>
              Direct-to-film printing builds your design into the fabric itself —
              scroll to see how it comes together.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {layers.map((l) => (
                <div key={l.n} style={{ display: "flex", gap: 14, alignItems: "baseline", padding: "10px 0", borderTop: "1px solid #1D1D2C" }}>
                  <span style={{ fontFamily: "var(--font-poppins)", fontSize: 13, fontWeight: 400, color: "#4CAF50", width: 24 }}>{l.n}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#ddd", width: 90, flexShrink: 0 }}>{l.label}</span>
                  <span style={{ fontSize: 13, color: "#6A6A8A", lineHeight: 1.5 }}>{l.body}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ perspective: 1400, height: 460, position: "relative" }}>
            <div
              ref={stackRef}
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                transformStyle: "preserve-3d",
              }}
            >
              {layers.map((l, i) => (
                <div
                  key={l.n}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  className="film-strip"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 340,
                    height: 108,
                    border: "1px solid rgba(76,175,80,0.3)",
                    backgroundColor: "#1D1D2C",
                    backgroundImage: `linear-gradient(100deg, ${l.tint} 0%, transparent 60%)`,
                    boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
                    display: "flex",
                    alignItems: "center",
                    gap: 18,
                    padding: "0 28px",
                    willChange: "transform, opacity",
                  }}
                >
                  <l.icon size={30} color="#4CAF50" strokeWidth={1.5} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: "#4CAF50", textTransform: "uppercase" }}>{l.n} — {l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          .exploded-grid { grid-template-columns: 1fr 1fr; }
          @media (max-width: 900px) {
            .exploded-grid { grid-template-columns: 1fr !important; }
          }

          /* Signature motif: each layer reads as a strip of DTF transfer film —
             sprocket holes along the top edge, a torn edge on the right. */
          .film-strip {
            background-repeat: no-repeat;
          }
          .film-strip::before {
            content: '';
            position: absolute; top: 0; left: 0; right: 0; height: 10px;
            background-image: radial-gradient(circle, rgba(76,175,80,0.45) 2.5px, transparent 2.5px);
            background-size: 22px 10px;
            background-position: 11px 0;
            opacity: 0.7;
          }
          .film-strip::after {
            content: '';
            position: absolute; top: 0; right: -1px; bottom: 0; width: 14px;
            background-color: #0F0F18;
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 30% 91%, 0 82%, 30% 73%, 0 64%, 30% 55%, 0 46%, 30% 37%, 0 28%, 30% 19%, 0 10%);
          }
        `}</style>
      </div>
    </section>
  );
}
