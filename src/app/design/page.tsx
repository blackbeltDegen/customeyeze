"use client";

import { useState } from "react";
import StepShirtFeel from "@/components/design/StepShirtFeel";
import StepShirtStyle from "@/components/design/StepShirtStyle";
import StepDesignStudio from "@/components/design/StepDesignStudio";
import StepReview from "@/components/design/StepReview";

export type ShirtFeel = "soft" | "medium" | "standard";

export type ShirtOption = {
  id: string;
  name: string;
  brand: string;
  feel: ShirtFeel;
  colors: { name: string; hex: string }[];
  price: number;
};

export type OrderState = {
  feel: ShirtFeel | null;
  shirt: ShirtOption | null;
  color: { name: string; hex: string } | null;
  quantity: number;
  designDataUrl: string | null;
  designSide: "front" | "back";
};

const STEPS = ["Choose Shirt", "Style & Color", "Design", "Review"];

export default function DesignPage() {
  const [step, setStep] = useState(0);
  const [order, setOrder] = useState<OrderState>({
    feel: null,
    shirt: null,
    color: null,
    quantity: 1,
    designDataUrl: null,
    designSide: "front",
  });

  function goNext() { setStep((s) => Math.min(s + 1, STEPS.length - 1)); }
  function goBack() { setStep((s) => Math.max(s - 1, 0)); }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#1C1C1E" }}>
      {/* Progress bar */}
      <div className="sticky top-[80px] z-40 border-b" style={{ backgroundColor: "#111111", borderColor: "#3A3A3C" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center gap-2">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                    style={
                      i < step
                        ? { backgroundColor: "#4CAF50", color: "#FFFFFF" }
                        : i === step
                        ? { backgroundColor: "#4CAF50", color: "#FFFFFF", boxShadow: "0 0 0 3px rgba(76,175,80,0.3)" }
                        : { backgroundColor: "#2C2C2E", color: "#8E8E93", border: "1px solid #3A3A3C" }
                    }>
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span className="text-sm font-semibold hidden sm:block"
                    style={{ color: i === step ? "#FFFFFF" : i < step ? "#4CAF50" : "#8E8E93" }}>
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="w-10 h-0.5" style={{ backgroundColor: i < step ? "#4CAF50" : "#3A3A3C" }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {step === 0 && <StepShirtFeel order={order} onUpdate={(u) => setOrder((o) => ({ ...o, ...u }))} onNext={goNext} />}
        {step === 1 && <StepShirtStyle order={order} onUpdate={(u) => setOrder((o) => ({ ...o, ...u }))} onNext={goNext} onBack={goBack} />}
        {step === 2 && <StepDesignStudio order={order} onUpdate={(u) => setOrder((o) => ({ ...o, ...u }))} onNext={goNext} onBack={goBack} />}
        {step === 3 && <StepReview order={order} onBack={goBack} />}
      </div>
    </div>
  );
}
