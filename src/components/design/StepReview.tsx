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

function getTier(qty: number) {
  return PRICING.find((p) => qty >= p.min && qty <= p.max) ?? PRICING[0];
}

export default function StepReview({ order, onBack }: Props) {
  const unitPrice = order.shirt
    ? parseFloat((order.shirt.price * getTier(order.quantity).multiplier).toFixed(2))
    : 0;
  const subtotal = (unitPrice * order.quantity).toFixed(2);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#4CAF50" }}>Step 4</p>
        <h2 className="text-3xl font-extrabold mb-2" style={{ fontFamily: "var(--font-poppins)", color: "#FFFFFF" }}>
          Review Your Order
        </h2>
        <p style={{ color: "#8E8E93" }}>Everything look good? Proceed to checkout when ready.</p>
      </div>

      <div className="rounded-2xl border overflow-hidden mb-5" style={{ backgroundColor: "#2C2C2E", borderColor: "#3A3A3C" }}>
        <div className="px-6 py-4 border-b" style={{ backgroundColor: "#1C1C1E", borderColor: "#3A3A3C" }}>
          <h3 className="font-bold" style={{ fontFamily: "var(--font-poppins)", color: "#FFFFFF" }}>Order Summary</h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl border flex-shrink-0"
              style={{ backgroundColor: order.color?.hex ?? "#2C2C2E", borderColor: "#3A3A3C" }} />
            <div>
              <p className="font-semibold" style={{ color: "#FFFFFF" }}>{order.shirt?.name}</p>
              <p className="text-sm" style={{ color: "#8E8E93" }}>{order.shirt?.brand} · {order.color?.name}</p>
              <p className="text-sm capitalize" style={{ color: "#8E8E93" }}>{order.feel} feel · {order.designSide} print</p>
            </div>
          </div>

          {order.designDataUrl && (
            <div>
              <p className="text-sm font-semibold mb-2" style={{ color: "#8E8E93" }}>Your Design Preview</p>
              <div className="rounded-xl overflow-hidden border w-40 h-48 relative"
                style={{ borderColor: "#3A3A3C" }}>
                <Image src={order.designDataUrl} alt="Your design" fill className="object-contain" />
              </div>
            </div>
          )}

          <div className="space-y-3 pt-4 border-t" style={{ borderColor: "#3A3A3C" }}>
            <div className="flex justify-between text-sm">
              <span style={{ color: "#8E8E93" }}>Quantity</span>
              <span className="font-medium" style={{ color: "#EBEBF0" }}>{order.quantity} shirts</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: "#8E8E93" }}>Price per shirt</span>
              <span className="font-medium" style={{ color: "#EBEBF0" }}>${unitPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-3 border-t" style={{ borderColor: "#3A3A3C" }}>
              <span style={{ color: "#FFFFFF" }}>Subtotal</span>
              <span style={{ fontFamily: "var(--font-poppins)", color: "#4CAF50" }}>${subtotal}</span>
            </div>
            <p className="text-xs" style={{ color: "#8E8E93" }}>Shipping and taxes calculated at checkout.</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl p-5 border flex items-center gap-4 mb-8" style={{ backgroundColor: "#2C2C2E", borderColor: "#3A3A3C" }}>
        <span className="text-3xl">⏱</span>
        <div>
          <p className="font-semibold" style={{ color: "#FFFFFF" }}>Ready in ~1 week</p>
          <p className="text-sm" style={{ color: "#8E8E93" }}>
            Once payment is confirmed, we review your design and get to printing. We&apos;ll reach out if anything needs adjusting.
          </p>
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={onBack}
          className="px-8 py-4 rounded-full font-semibold border"
          style={{ borderColor: "#3A3A3C", color: "#8E8E93" }}>
          ← Edit Design
        </button>
        <Link href="/checkout"
          className="px-10 py-4 rounded-full font-bold text-lg inline-block text-center"
          style={{ backgroundColor: "#4CAF50", color: "#FFFFFF" }}>
          Proceed to Checkout →
        </Link>
      </div>
    </div>
  );
}
