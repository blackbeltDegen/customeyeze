"use client";

import { OrderState, ShirtFeel } from "@/app/design/page";

type Props = {
  order: OrderState;
  onUpdate: (updates: Partial<OrderState>) => void;
  onNext: () => void;
};

const feels: { id: ShirtFeel; label: string; emoji: string; desc: string; example: string }[] = [
  { id: "soft", label: "Soft & Premium", emoji: "☁️", desc: "Super soft, lightweight, and comfortable. Great for everyday wear and premium brands.", example: "e.g. Bella+Canvas, Next Level" },
  { id: "medium", label: "Medium Weight", emoji: "👕", desc: "Balanced comfort and durability. The go-to for most teams, events, and schools.", example: "e.g. Comfort Colors, Hanes Beefy" },
  { id: "standard", label: "Standard / Classic", emoji: "💪", desc: "Heavier, more structured feel. Great for workwear, outdoor use, and lasting gear.", example: "e.g. Gildan Heavy Cotton" },
];

export default function StepShirtFeel({ order, onUpdate, onNext }: Props) {
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "#4CAF50", textTransform: "uppercase", marginBottom: 14, backgroundColor: "rgba(76,175,80,0.1)", padding: "5px 14px", borderRadius: 999, border: "1px solid rgba(76,175,80,0.2)" }}>Step 1 of 4</span>
        <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 900, color: "#fff", letterSpacing: "-1px", marginTop: 14, marginBottom: 10 }}>
          What kind of shirt do you want?
        </h2>
        <p style={{ fontSize: 15, color: "#7A7A9A" }}>Pick the feel that fits your order.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }} className="feel-grid">
        {feels.map((feel) => {
          const selected = order.feel === feel.id;
          return (
            <button key={feel.id} onClick={() => onUpdate({ feel: feel.id, shirt: null, color: null })}
              style={{
                backgroundColor: selected ? "rgba(76,175,80,0.1)" : "#1D1D2C",
                border: `2px solid ${selected ? "#4CAF50" : "#2A2A3E"}`,
                borderRadius: 20, padding: "32px 24px", textAlign: "left",
                cursor: "pointer", transition: "all 0.2s",
                transform: selected ? "translateY(-4px)" : "translateY(0)",
                boxShadow: selected ? "0 12px 40px rgba(76,175,80,0.15)" : "none",
              }}
              onMouseEnter={e => { if (!selected) { e.currentTarget.style.borderColor = "rgba(76,175,80,0.4)"; e.currentTarget.style.transform = "translateY(-2px)"; } }}
              onMouseLeave={e => { if (!selected) { e.currentTarget.style.borderColor = "#2A2A3E"; e.currentTarget.style.transform = "translateY(0)"; } }}
            >
              <div style={{ fontSize: 44, marginBottom: 18 }}>{feel.emoji}</div>
              <h3 style={{ fontFamily: "var(--font-poppins)", fontSize: 18, fontWeight: 800, color: selected ? "#4CAF50" : "#fff", marginBottom: 10 }}>{feel.label}</h3>
              <p style={{ fontSize: 13, color: "#7A7A9A", lineHeight: 1.7, marginBottom: 12 }}>{feel.desc}</p>
              <p style={{ fontSize: 11, color: selected ? "#4CAF50" : "#4A4A6A", fontWeight: 600 }}>{feel.example}</p>
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={onNext} disabled={!order.feel} style={{
          backgroundColor: "#4CAF50", color: "#fff", border: "none",
          padding: "14px 40px", borderRadius: 999, fontWeight: 700, fontSize: 16,
          cursor: order.feel ? "pointer" : "not-allowed", opacity: order.feel ? 1 : 0.4,
          transition: "transform 0.2s",
        }}
          onMouseEnter={e => { if (order.feel) e.currentTarget.style.transform = "scale(1.04)"; }}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          Continue →
        </button>
      </div>

      <style>{`
        .feel-grid { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 680px) { .feel-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
