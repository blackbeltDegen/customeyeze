"use client";

import { OrderState, ShirtFeel } from "@/app/design/page";

type Props = {
  order: OrderState;
  onUpdate: (updates: Partial<OrderState>) => void;
  onNext: () => void;
};

const feels: { id: ShirtFeel; label: string; emoji: string; desc: string; example: string }[] = [
  {
    id: "soft",
    label: "Soft & Premium",
    emoji: "☁️",
    desc: "Super soft, lightweight, and comfortable. Great for everyday wear and premium brands.",
    example: "e.g. Bella+Canvas, Next Level",
  },
  {
    id: "medium",
    label: "Medium Weight",
    emoji: "👕",
    desc: "Balanced comfort and durability. The go-to for most teams, events, and schools.",
    example: "e.g. Comfort Colors, Hanes Beefy",
  },
  {
    id: "standard",
    label: "Standard / Classic",
    emoji: "💪",
    desc: "Heavier, more structured feel. Great for workwear, outdoor use, and lasting gear.",
    example: "e.g. Gildan Heavy Cotton",
  },
];

export default function StepShirtFeel({ order, onUpdate, onNext }: Props) {
  return (
    <div>
      <div className="text-center mb-12">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#4CAF50" }}>Step 1</p>
        <h2 className="text-3xl font-extrabold mb-2" style={{ fontFamily: "var(--font-poppins)", color: "#FFFFFF" }}>
          What kind of shirt do you want?
        </h2>
        <p style={{ color: "#8E8E93" }}>Pick the feel that fits your order.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        {feels.map((feel) => {
          const selected = order.feel === feel.id;
          return (
            <button key={feel.id} onClick={() => onUpdate({ feel: feel.id, shirt: null, color: null })}
              className="rounded-2xl p-8 border-2 text-left transition-all duration-200 hover:-translate-y-1"
              style={selected
                ? { borderColor: "#4CAF50", backgroundColor: "rgba(76,175,80,0.1)" }
                : { borderColor: "#3A3A3C", backgroundColor: "#2C2C2E" }
              }>
              <div className="text-5xl mb-5">{feel.emoji}</div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-poppins)", color: selected ? "#4CAF50" : "#FFFFFF" }}>
                {feel.label}
              </h3>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "#8E8E93" }}>{feel.desc}</p>
              <p className="text-xs font-medium" style={{ color: selected ? "#4CAF50" : "#48484A" }}>{feel.example}</p>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end">
        <button onClick={onNext} disabled={!order.feel}
          className="px-10 py-4 rounded-full font-bold text-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: "#4CAF50", color: "#FFFFFF" }}>
          Continue →
        </button>
      </div>
    </div>
  );
}
