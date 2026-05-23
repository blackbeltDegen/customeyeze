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
    feel: null, shirt: null, color: null,
    quantity: 1, designDataUrl: null, designSide: "front",
  });

  function goNext() { setStep((s) => Math.min(s + 1, STEPS.length - 1)); }
  function goBack() { setStep((s) => Math.max(s - 1, 0)); }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#13131E", paddingTop: 80 }}>
      {/* Progress bar */}
      <div style={{
        position: "sticky", top: 80, zIndex: 40,
        backgroundColor: "#0F0F18", borderBottom: "1px solid #2A2A3E",
      }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "16px 32px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {STEPS.map((label, i) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-poppins)", fontWeight: 800, fontSize: 13,
                    transition: "all 0.3s",
                    ...(i < step
                      ? { backgroundColor: "#4CAF50", color: "#fff" }
                      : i === step
                      ? { backgroundColor: "#4CAF50", color: "#fff", boxShadow: "0 0 0 4px rgba(76,175,80,0.25)" }
                      : { backgroundColor: "#1D1D2C", color: "#7A7A9A", border: "1px solid #2A2A3E" })
                    }}>
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span style={{
                    fontSize: 13, fontWeight: 600,
                    color: i === step ? "#fff" : i < step ? "#4CAF50" : "#7A7A9A",
                  }} className="step-label">
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ width: 32, height: 2, borderRadius: 1, backgroundColor: i < step ? "#4CAF50" : "#2A2A3E", transition: "background-color 0.3s" }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 32px" }}>
        {step === 0 && <StepShirtFeel order={order} onUpdate={(u) => setOrder((o) => ({ ...o, ...u }))} onNext={goNext} />}
        {step === 1 && <StepShirtStyle order={order} onUpdate={(u) => setOrder((o) => ({ ...o, ...u }))} onNext={goNext} onBack={goBack} />}
        {step === 2 && <StepDesignStudio order={order} onUpdate={(u) => setOrder((o) => ({ ...o, ...u }))} onNext={goNext} onBack={goBack} />}
        {step === 3 && <StepReview order={order} onBack={goBack} />}
      </div>

      <style>{`
        @media (max-width: 560px) { .step-label { display: none; } }
      `}</style>
    </div>
  );
}
