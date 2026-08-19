"use client";

import RevealSection from "./RevealSection";

const pieces = [
  { tag: "Sports Teams", title: "Match-day kits", pattern: "linear-gradient(135deg, #1B3A1F 0%, #0F0F18 60%)", span: "tall" },
  { tag: "Schools & Clubs", title: "Spirit wear drop", pattern: "linear-gradient(150deg, #14241A 0%, #0F0F18 65%)", span: "wide" },
  { tag: "Brands", title: "Studio merch run", pattern: "linear-gradient(120deg, #0F0F18 0%, #1D3320 100%)", span: "normal" },
  { tag: "Events", title: "Reunion tees", pattern: "linear-gradient(160deg, #17281A 0%, #0F0F18 70%)", span: "normal" },
  { tag: "Creators", title: "Solo merch drop", pattern: "linear-gradient(140deg, #0F0F18 0%, #1A2E1D 100%)", span: "wide" },
  { tag: "Just You", title: "One-off print", pattern: "linear-gradient(130deg, #122215 0%, #0F0F18 65%)", span: "tall" },
];

export default function Gallery() {
  return (
    <section style={{ padding: "120px 0", backgroundColor: "#13131E" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <RevealSection style={{ marginBottom: 64, maxWidth: 640 }}>
          <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "#4CAF50", textTransform: "uppercase", marginBottom: 14, backgroundColor: "rgba(76,175,80,0.1)", padding: "5px 14px", borderRadius: 999, border: "1px solid rgba(76,175,80,0.2)" }}>
            Recent Work
          </span>
          <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(34px, 4vw, 60px)", fontWeight: 400, color: "#fff", letterSpacing: "-1.5px", lineHeight: 1.08, marginTop: 14 }}>
            Every print starts<br />as someone&apos;s idea.
          </h2>
        </RevealSection>

        <div className="gallery-grid">
          {pieces.map((p, i) => (
            <RevealSection key={p.title} delay={i * 0.08} className={`gallery-item gallery-${p.span}`}>
              <div
                className="gallery-tile"
                style={{
                  background: p.pattern,
                  borderRadius: 20,
                  border: "1px solid #2A2A3E",
                  height: "100%",
                  minHeight: 220,
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: 26,
                  cursor: "pointer",
                }}
              >
                <div className="gallery-sheen" />
                <div className="gallery-peel" aria-hidden="true" />
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: "#4CAF50", textTransform: "uppercase", marginBottom: 8 }}>{p.tag}</span>
                <span style={{ fontFamily: "var(--font-poppins)", fontSize: 21, fontWeight: 400, color: "#fff" }}>{p.title}</span>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>

      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 140px;
          gap: 18px;
        }
        .gallery-item { border-radius: 20px; }
        .gallery-tall { grid-row: span 3; }
        .gallery-wide { grid-column: span 2; grid-row: span 2; }
        .gallery-normal { grid-row: span 2; }

        .gallery-tile { transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.4s ease; }
        .gallery-tile:hover { transform: scale(1.03) skew(-0.5deg, -0.2deg); border-color: rgba(76,175,80,0.5) !important; }

        .gallery-sheen {
          position: absolute; inset: 0;
          background: linear-gradient(115deg, transparent 20%, rgba(76,175,80,0.16) 50%, transparent 80%);
          transform: translateX(-120%);
          transition: transform 0.7s ease;
        }
        .gallery-tile:hover .gallery-sheen { transform: translateX(120%); }

        /* Signature motif: the DTF transfer film lifting at the corner */
        .gallery-peel {
          position: absolute; top: 0; right: 0; width: 26px; height: 26px;
          background: linear-gradient(135deg, #4CAF50 50%, #2E7D32 50%);
          clip-path: polygon(100% 0, 0 0, 100% 100%);
          transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1), height 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          filter: drop-shadow(-2px 2px 4px rgba(0,0,0,0.35));
        }
        .gallery-tile:hover .gallery-peel { width: 58px; height: 58px; }

        @media (max-width: 900px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr); }
          .gallery-wide { grid-column: span 2; }
        }
        @media (max-width: 560px) {
          .gallery-grid { grid-template-columns: 1fr; }
          .gallery-wide, .gallery-tall, .gallery-normal { grid-column: span 1; grid-row: span 2; }
        }
      `}</style>
    </section>
  );
}
