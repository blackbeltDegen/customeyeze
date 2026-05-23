"use client";

import { OrderState, ShirtOption } from "@/app/design/page";

type Props = {
  order: OrderState;
  onUpdate: (updates: Partial<OrderState>) => void;
  onNext: () => void;
  onBack: () => void;
};

const SHIRTS: ShirtOption[] = [
  {
    id: "bc3001", name: "Unisex Jersey Tee", brand: "Bella+Canvas", feel: "soft", price: 24.99,
    colors: [
      { name: "White", hex: "#FFFFFF" }, { name: "Black", hex: "#1a1a1a" }, { name: "Navy", hex: "#1B2A4A" },
      { name: "Red", hex: "#C0392B" }, { name: "Forest Green", hex: "#1B5E20" }, { name: "Heather Gray", hex: "#B0BEC5" },
    ],
  },
  {
    id: "nl3600", name: "Premium Fitted Tee", brand: "Next Level", feel: "soft", price: 26.99,
    colors: [
      { name: "White", hex: "#FFFFFF" }, { name: "Black", hex: "#1a1a1a" }, { name: "Royal Blue", hex: "#1565C0" },
      { name: "Charcoal", hex: "#455A64" }, { name: "Vintage Pink", hex: "#F8BBD9" },
    ],
  },
  {
    id: "cc1717", name: "Garment-Dyed Tee", brand: "Comfort Colors", feel: "medium", price: 22.99,
    colors: [
      { name: "Ivory", hex: "#FFFFF0" }, { name: "Washed Black", hex: "#2C2C2C" }, { name: "Blue Jean", hex: "#4A7B9D" },
      { name: "Pepper", hex: "#7D7D7D" }, { name: "Crimson", hex: "#8B0000" }, { name: "Moss", hex: "#5C6B3D" },
    ],
  },
  {
    id: "hanes5180", name: "Beefy-T Classic", brand: "Hanes", feel: "medium", price: 19.99,
    colors: [
      { name: "White", hex: "#FFFFFF" }, { name: "Black", hex: "#1a1a1a" }, { name: "Navy", hex: "#1B2A4A" },
      { name: "Gold", hex: "#F4C430" }, { name: "Athletic Gray", hex: "#9E9E9E" },
    ],
  },
  {
    id: "g5000", name: "Heavy Cotton Tee", brand: "Gildan", feel: "standard", price: 16.99,
    colors: [
      { name: "White", hex: "#FFFFFF" }, { name: "Black", hex: "#1a1a1a" }, { name: "Navy", hex: "#1B2A4A" },
      { name: "Red", hex: "#C0392B" }, { name: "Royal Blue", hex: "#1565C0" },
      { name: "Military Green", hex: "#3D5A27" }, { name: "Purple", hex: "#6A1B9A" },
    ],
  },
];

const PRICING = [
  { min: 1, max: 11, label: "1–11", multiplier: 1 },
  { min: 12, max: 23, label: "12–23", multiplier: 0.8 },
  { min: 24, max: 47, label: "24–47", multiplier: 0.68 },
  { min: 48, max: Infinity, label: "48+", multiplier: 0.56 },
];

function getTier(qty: number) {
  return PRICING.find((p) => qty >= p.min && qty <= p.max) ?? PRICING[0];
}

function getPrice(basePrice: number, qty: number) {
  return (basePrice * getTier(qty).multiplier).toFixed(2);
}

export default function StepShirtStyle({ order, onUpdate, onNext, onBack }: Props) {
  const shirts = SHIRTS.filter((s) => s.feel === order.feel);
  const total = order.shirt
    ? (parseFloat(getPrice(order.shirt.price, order.quantity)) * order.quantity).toFixed(2)
    : "0.00";

  return (
    <div>
      <div className="text-center mb-12">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#4CAF50" }}>Step 2</p>
        <h2 className="text-3xl font-extrabold mb-2" style={{ fontFamily: "var(--font-poppins)", color: "#FFFFFF" }}>
          Pick your style &amp; color
        </h2>
        <p style={{ color: "#8E8E93" }}>Showing {order.feel} feel options.</p>
      </div>

      {/* Shirt options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {shirts.map((shirt) => {
          const selected = order.shirt?.id === shirt.id;
          return (
            <button key={shirt.id} onClick={() => onUpdate({ shirt, color: shirt.colors[0] })}
              className="rounded-2xl p-6 border-2 text-left transition-all duration-200 hover:-translate-y-0.5"
              style={selected
                ? { borderColor: "#4CAF50", backgroundColor: "rgba(76,175,80,0.08)" }
                : { borderColor: "#3A3A3C", backgroundColor: "#2C2C2E" }
              }>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold text-lg" style={{ fontFamily: "var(--font-poppins)", color: selected ? "#4CAF50" : "#FFFFFF" }}>
                    {shirt.name}
                  </p>
                  <p className="text-sm" style={{ color: "#8E8E93" }}>{shirt.brand}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold" style={{ fontFamily: "var(--font-poppins)", color: "#4CAF50" }}>
                    ${getPrice(shirt.price, order.quantity)}
                  </p>
                  <p className="text-xs" style={{ color: "#8E8E93" }}>per shirt</p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {shirt.colors.map((c) => (
                  <div key={c.name} title={c.name}
                    className="w-5 h-5 rounded-full border"
                    style={{ backgroundColor: c.hex, borderColor: "#48484A" }} />
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Color picker */}
      {order.shirt && (
        <div className="rounded-2xl p-6 border mb-5" style={{ backgroundColor: "#2C2C2E", borderColor: "#3A3A3C" }}>
          <h3 className="font-bold mb-4" style={{ color: "#FFFFFF" }}>Select Color</h3>
          <div className="flex gap-3 flex-wrap">
            {order.shirt.colors.map((c) => (
              <button key={c.name} onClick={() => onUpdate({ color: c })} title={c.name}
                className="w-10 h-10 rounded-full border-4 transition-all"
                style={{
                  backgroundColor: c.hex,
                  borderColor: order.color?.name === c.name ? "#4CAF50" : "transparent",
                  outline: order.color?.name === c.name ? "2px solid rgba(76,175,80,0.3)" : "none",
                  transform: order.color?.name === c.name ? "scale(1.15)" : "scale(1)",
                }} />
            ))}
          </div>
          {order.color && (
            <p className="text-sm mt-3" style={{ color: "#8E8E93" }}>
              Selected: <strong style={{ color: "#EBEBF0" }}>{order.color.name}</strong>
            </p>
          )}
        </div>
      )}

      {/* Quantity */}
      <div className="rounded-2xl p-6 border mb-8" style={{ backgroundColor: "#2C2C2E", borderColor: "#3A3A3C" }}>
        <h3 className="font-bold mb-5" style={{ color: "#FFFFFF" }}>Quantity &amp; Pricing</h3>
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => onUpdate({ quantity: Math.max(1, order.quantity - 1) })}
            className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xl font-bold transition-colors"
            style={{ borderColor: "#3A3A3C", color: "#8E8E93" }}>
            -
          </button>
          <input type="number" min={1} value={order.quantity}
            onChange={(e) => onUpdate({ quantity: Math.max(1, parseInt(e.target.value) || 1) })}
            className="w-20 text-center rounded-xl py-2 text-lg font-bold"
            style={{ border: "1px solid #3A3A3C", backgroundColor: "#1C1C1E", color: "#FFFFFF", outline: "none" }} />
          <button onClick={() => onUpdate({ quantity: order.quantity + 1 })}
            className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xl font-bold transition-colors"
            style={{ borderColor: "#3A3A3C", color: "#8E8E93" }}>
            +
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-5">
          {PRICING.map((tier) => {
            const active = getTier(order.quantity).label === tier.label;
            return (
              <div key={tier.label} className="rounded-xl p-3 text-center border-2 transition-all text-xs"
                style={active
                  ? { borderColor: "#4CAF50", backgroundColor: "rgba(76,175,80,0.1)", color: "#4CAF50" }
                  : { borderColor: "#3A3A3C", backgroundColor: "#1C1C1E", color: "#8E8E93" }
                }>
                <p className="font-semibold">{tier.label}</p>
                <p>shirts</p>
                {order.shirt && (
                  <p className="font-bold mt-1" style={{ color: active ? "#4CAF50" : "#EBEBF0" }}>
                    ${getPrice(order.shirt.price, tier.min)}/ea
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {order.shirt && (
          <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "#3A3A3C" }}>
            <span className="font-medium" style={{ color: "#8E8E93" }}>
              {order.quantity} shirt{order.quantity !== 1 ? "s" : ""} × ${getPrice(order.shirt.price, order.quantity)}
            </span>
            <span className="text-2xl font-extrabold" style={{ fontFamily: "var(--font-poppins)", color: "#4CAF50" }}>${total}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button onClick={onBack}
          className="px-8 py-4 rounded-full font-semibold border transition-colors"
          style={{ borderColor: "#3A3A3C", color: "#8E8E93" }}>
          ← Back
        </button>
        <button onClick={onNext} disabled={!order.shirt || !order.color}
          className="px-10 py-4 rounded-full font-bold text-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: "#4CAF50", color: "#FFFFFF" }}>
          Continue to Design →
        </button>
      </div>
    </div>
  );
}
