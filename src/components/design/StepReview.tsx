"use client";

import { OrderState } from "@/app/design/page";
import Image from "next/image";
import Link from "next/link";

type Props = { order: OrderState; onBack: () => void };

const PRICING = [
  { min: 1, max: 11, multiplier: 1 },
  { min: 12, max: 23, multiplier: 0.8 },
  { min: 24, max: 47, multiplier: 0.68 },
  { min: 48, max: Infinity, multiplier: 0.56 },
];

function getTier(qty: number) { return PRICING.find((p) => qty >= p.min && qty <= p.max) ?? PRICING[0]; }

const card: React.CSSProperties = { backgroundColor: "#1D1D2C", border: "1px solid #2A2A3E", borderRadius: 20 };

export default function StepReview({ order, onBack }: Props) {
  const unitPrice = order.shirt ? parseFloat((order.shirt.price * getTier(order.quantity).multiplier).toFixed(2)) : 0;
  const subtotal = (unitPrice * order.quantity).toFixed(2);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "#4CAF50", textTransform: "uppercase", marginBottom: 14, backgroundColor: "rgba(76,175,80,0.1)", padding: "5px 14px", borderRadius: 999, border: "1px solid rgba(76,175,80,0.2)" }}>Step 4 of 4</span>
        <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 900, color: "#fff", letterSpacing: "-1px", marginTop: 14, marginBottom: 10 }}>Review Your Order</h2>
        <p style={{ fontSize: 15, color: "#7A7A9A" }}>Everything look good? Proceed to checkout when ready.</p>
      </div>

      {/* Order summary card */}
      <div style={{ ...card, overflow: "hidden", marginBottom: 16 }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid #2A2A3E", backgroundColor: "#13131E" }}>
          <h3 style={{ fontFamily: "var(--font-poppins)", fontSize: 15, fontWeight: 700, color: "#fff" }}>Order Summary</h3>
        </div>
        <div style={{ padding: "24px" }}>
          {/* Shirt info */}
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 24 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, border: "1px solid #2A2A3E", flexShrink: 0, backgroundColor: order.color?.hex ?? "#1D1D2C" }} />
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{order.shirt?.name}</p>
              <p style={{ fontSize: 13, color: "#7A7A9A", marginBottom: 2 }}>{order.shirt?.brand} · {order.color?.name}</p>
              <p style={{ fontSize: 13, color: "#7A7A9A", textTransform: "capitalize" }}>{order.feel} feel · {order.designSide} print</p>
            </div>
          </div>

          {/* Design preview */}
          {order.designDataUrl && (
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#7A7A9A", marginBottom: 10 }}>Your Design Preview</p>
              <div style={{ width: 140, height: 176, borderRadius: 12, overflow: "hidden", border: "1px solid #2A2A3E", position: "relative" }}>
                <Image src={order.designDataUrl} alt="Your design" fill style={{ objectFit: "contain" }} />
              </div>
            </div>
          )}

          {/* Pricing breakdown */}
          <div style={{ borderTop: "1px solid #2A2A3E", paddingTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 14, color: "#7A7A9A" }}>Quantity</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#ccc" }}>{order.quantity} shirts</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 14, color: "#7A7A9A" }}>Price per shirt</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#ccc" }}>${unitPrice.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid #2A2A3E" }}>
              <span style={{ fontSize: 17, fontWeight: 700, color: "#fff" }}>Subtotal</span>
              <span style={{ fontFamily: "var(--font-poppins)", fontSize: 22, fontWeight: 900, color: "#4CAF50" }}>${subtotal}</span>
            </div>
            <p style={{ fontSize: 12, color: "#4A4A6A" }}>Shipping and taxes calculated at checkout.</p>
          </div>
        </div>
      </div>

      {/* Turnaround note */}
      <div style={{ ...card, padding: "20px 24px", display: "flex", gap: 16, alignItems: "center", marginBottom: 32 }}>
        <span style={{ fontSize: 32 }}>⏱️</span>
        <div>
          <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Ready in ~1 week</p>
          <p style={{ fontSize: 13, color: "#7A7A9A", lineHeight: 1.65 }}>
            Once payment is confirmed, we review your design and get to printing. We&apos;ll reach out if anything needs adjusting.
          </p>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={onBack} style={{ padding: "13px 28px", borderRadius: 999, fontWeight: 600, fontSize: 15, border: "1px solid #2A2A3E", color: "#7A7A9A", backgroundColor: "transparent", cursor: "pointer" }}>← Edit Design</button>
        <Link href="/checkout" className="btn-glow" style={{
          display: "inline-block", backgroundColor: "#4CAF50", color: "#fff",
          padding: "13px 36px", borderRadius: 999, fontWeight: 700, fontSize: 16,
          textDecoration: "none", transition: "transform 0.2s",
        }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          Proceed to Checkout →
        </Link>
      </div>
    </div>
  );
}
