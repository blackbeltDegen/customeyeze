"use client";

import { OrderState, ShirtOption } from "@/app/design/page";

type Props = {
  order: OrderState;
  onUpdate: (updates: Partial<OrderState>) => void;
  onNext: () => void;
  onBack: () => void;
};

const SHIRTS: ShirtOption[] = [
  { id: "bc3001", name: "Unisex Jersey Tee", brand: "Bella+Canvas", feel: "soft", price: 24.99, colors: [{ name: "White", hex: "#FFFFFF" }, { name: "Black", hex: "#1a1a1a" }, { name: "Navy", hex: "#1B2A4A" }, { name: "Red", hex: "#C0392B" }, { name: "Forest Green", hex: "#1B5E20" }, { name: "Heather Gray", hex: "#B0BEC5" }] },
  { id: "nl3600", name: "Premium Fitted Tee", brand: "Next Level", feel: "soft", price: 26.99, colors: [{ name: "White", hex: "#FFFFFF" }, { name: "Black", hex: "#1a1a1a" }, { name: "Royal Blue", hex: "#1565C0" }, { name: "Charcoal", hex: "#455A64" }, { name: "Vintage Pink", hex: "#F8BBD9" }] },
  { id: "cc1717", name: "Garment-Dyed Tee", brand: "Comfort Colors", feel: "medium", price: 22.99, colors: [{ name: "Ivory", hex: "#FFFFF0" }, { name: "Washed Black", hex: "#2C2C2C" }, { name: "Blue Jean", hex: "#4A7B9D" }, { name: "Pepper", hex: "#7D7D7D" }, { name: "Crimson", hex: "#8B0000" }, { name: "Moss", hex: "#5C6B3D" }] },
  { id: "hanes5180", name: "Beefy-T Classic", brand: "Hanes", feel: "medium", price: 19.99, colors: [{ name: "White", hex: "#FFFFFF" }, { name: "Black", hex: "#1a1a1a" }, { name: "Navy", hex: "#1B2A4A" }, { name: "Gold", hex: "#F4C430" }, { name: "Athletic Gray", hex: "#9E9E9E" }] },
  { id: "g5000", name: "Heavy Cotton Tee", brand: "Gildan", feel: "standard", price: 16.99, colors: [{ name: "White", hex: "#FFFFFF" }, { name: "Black", hex: "#1a1a1a" }, { name: "Navy", hex: "#1B2A4A" }, { name: "Red", hex: "#C0392B" }, { name: "Royal Blue", hex: "#1565C0" }, { name: "Military Green", hex: "#3D5A27" }, { name: "Purple", hex: "#6A1B9A" }] },
];

const PRICING = [
  { min: 1, max: 11, label: "1–11", multiplier: 1 },
  { min: 12, max: 23, label: "12–23", multiplier: 0.8 },
  { min: 24, max: 47, label: "24–47", multiplier: 0.68 },
  { min: 48, max: Infinity, label: "48+", multiplier: 0.56 },
];

function getTier(qty: number) { return PRICING.find((p) => qty >= p.min && qty <= p.max) ?? PRICING[0]; }
function getPrice(base: number, qty: number) { return (base * getTier(qty).multiplier).toFixed(2); }

const card: React.CSSProperties = { backgroundColor: "#1D1D2C", border: "1px solid #2A2A3E", borderRadius: 20, padding: "24px" };

export default function StepShirtStyle({ order, onUpdate, onNext, onBack }: Props) {
  const shirts = SHIRTS.filter((s) => s.feel === order.feel);
  const total = order.shirt ? (parseFloat(getPrice(order.shirt.price, order.quantity)) * order.quantity).toFixed(2) : "0.00";

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "#4CAF50", textTransform: "uppercase", marginBottom: 14, backgroundColor: "rgba(76,175,80,0.1)", padding: "5px 14px", borderRadius: 999, border: "1px solid rgba(76,175,80,0.2)" }}>Step 2 of 4</span>
        <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 900, color: "#fff", letterSpacing: "-1px", marginTop: 14, marginBottom: 10 }}>
          Pick your style &amp; color
        </h2>
        <p style={{ fontSize: 15, color: "#7A7A9A" }}>Showing {order.feel} feel options.</p>
      </div>

      {/* Shirt options */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, marginBottom: 20 }} className="shirt-grid">
        {shirts.map((shirt) => {
          const selected = order.shirt?.id === shirt.id;
          return (
            <button key={shirt.id} onClick={() => onUpdate({ shirt, color: shirt.colors[0] })}
              style={{
                backgroundColor: selected ? "rgba(76,175,80,0.08)" : "#1D1D2C",
                border: `2px solid ${selected ? "#4CAF50" : "#2A2A3E"}`,
                borderRadius: 18, padding: "22px 20px", textAlign: "left",
                cursor: "pointer", transition: "all 0.2s",
                boxShadow: selected ? "0 8px 30px rgba(76,175,80,0.12)" : "none",
              }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div>
                  <p style={{ fontFamily: "var(--font-poppins)", fontSize: 16, fontWeight: 800, color: selected ? "#4CAF50" : "#fff", marginBottom: 3 }}>{shirt.name}</p>
                  <p style={{ fontSize: 13, color: "#7A7A9A" }}>{shirt.brand}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontFamily: "var(--font-poppins)", fontSize: 20, fontWeight: 900, color: "#4CAF50" }}>${getPrice(shirt.price, order.quantity)}</p>
                  <p style={{ fontSize: 11, color: "#7A7A9A" }}>per shirt</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {shirt.colors.map((c) => (
                  <div key={c.name} title={c.name} style={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: c.hex, border: "1px solid rgba(255,255,255,0.15)" }} />
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Color picker */}
      {order.shirt && (
        <div style={{ ...card, marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Select Color</h3>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {order.shirt.colors.map((c) => (
              <button key={c.name} onClick={() => onUpdate({ color: c })} title={c.name}
                style={{
                  width: 38, height: 38, borderRadius: "50%", backgroundColor: c.hex,
                  border: `3px solid ${order.color?.name === c.name ? "#4CAF50" : "transparent"}`,
                  outline: order.color?.name === c.name ? "2px solid rgba(76,175,80,0.3)" : "none",
                  transform: order.color?.name === c.name ? "scale(1.18)" : "scale(1)",
                  cursor: "pointer", transition: "all 0.15s",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.12)",
                }} />
            ))}
          </div>
          {order.color && <p style={{ fontSize: 13, color: "#7A7A9A", marginTop: 12 }}>Selected: <strong style={{ color: "#ccc" }}>{order.color.name}</strong></p>}
        </div>
      )}

      {/* Quantity */}
      <div style={{ ...card, marginBottom: 32 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 20 }}>Quantity &amp; Pricing</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <button onClick={() => onUpdate({ quantity: Math.max(1, order.quantity - 1) })}
            style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid #2A2A3E", backgroundColor: "#13131E", color: "#7A7A9A", fontSize: 20, fontWeight: 700, cursor: "pointer" }}>
            −
          </button>
          <input type="number" min={1} value={order.quantity}
            onChange={(e) => onUpdate({ quantity: Math.max(1, parseInt(e.target.value) || 1) })}
            style={{ width: 72, textAlign: "center", borderRadius: 10, padding: "8px", fontSize: 18, fontWeight: 800, border: "1px solid #2A2A3E", backgroundColor: "#13131E", color: "#fff", outline: "none" }} />
          <button onClick={() => onUpdate({ quantity: order.quantity + 1 })}
            style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid #2A2A3E", backgroundColor: "#13131E", color: "#7A7A9A", fontSize: 20, fontWeight: 700, cursor: "pointer" }}>
            +
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
          {PRICING.map((tier) => {
            const active = getTier(order.quantity).label === tier.label;
            return (
              <div key={tier.label} style={{
                border: `2px solid ${active ? "#4CAF50" : "#2A2A3E"}`,
                backgroundColor: active ? "rgba(76,175,80,0.1)" : "#13131E",
                borderRadius: 12, padding: "12px 8px", textAlign: "center",
              }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: active ? "#4CAF50" : "#7A7A9A" }}>{tier.label}</p>
                <p style={{ fontSize: 11, color: "#4A4A6A" }}>shirts</p>
                {order.shirt && <p style={{ fontSize: 12, fontWeight: 800, color: active ? "#4CAF50" : "#ccc", marginTop: 4 }}>${getPrice(order.shirt.price, tier.min)}/ea</p>}
              </div>
            );
          })}
        </div>

        {order.shirt && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 16, borderTop: "1px solid #2A2A3E" }}>
            <span style={{ fontSize: 14, color: "#7A7A9A" }}>{order.quantity} shirt{order.quantity !== 1 ? "s" : ""} × ${getPrice(order.shirt.price, order.quantity)}</span>
            <span style={{ fontFamily: "var(--font-poppins)", fontSize: 24, fontWeight: 900, color: "#4CAF50" }}>${total}</span>
          </div>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={onBack} style={{ padding: "13px 28px", borderRadius: 999, fontWeight: 600, fontSize: 15, border: "1px solid #2A2A3E", color: "#7A7A9A", backgroundColor: "transparent", cursor: "pointer" }}>← Back</button>
        <button onClick={onNext} disabled={!order.shirt || !order.color} style={{
          backgroundColor: "#4CAF50", color: "#fff", border: "none",
          padding: "13px 36px", borderRadius: 999, fontWeight: 700, fontSize: 16,
          cursor: order.shirt && order.color ? "pointer" : "not-allowed",
          opacity: order.shirt && order.color ? 1 : 0.4, transition: "transform 0.2s",
        }}
          onMouseEnter={e => { if (order.shirt && order.color) e.currentTarget.style.transform = "scale(1.04)"; }}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          Continue to Design →
        </button>
      </div>

      <style>{`
        .shirt-grid { grid-template-columns: repeat(2, 1fr); }
        @media (max-width: 600px) { .shirt-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
