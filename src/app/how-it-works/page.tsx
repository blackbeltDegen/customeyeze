import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Choose Your Shirt",
    desc: "Tell us what feel you want — soft, medium, or standard. We'll show you the available styles and colors, with pricing that scales based on quantity.",
    details: ["Soft, medium, or standard fabric feel", "Multiple styles and colors available", "Bulk pricing shown upfront — no surprises"],
  },
  {
    number: "02",
    title: "Design It Your Way",
    desc: "Jump into our design studio. Upload your artwork, place it on the front or back, scale it, rotate it — get it exactly where you want it.",
    details: [
      "Upload your logo or artwork (PNG, JPG, SVG)",
      "Place design on front or back",
      "Scale, rotate, and reposition freely",
      "Add custom text — pick font, size, and color",
      "Real-time shirt preview as you design",
    ],
  },
  {
    number: "03",
    title: "Review Your Order",
    desc: "See a full summary of your design, shirt selection, quantities, and total price before you commit to anything.",
    details: ["Design preview with final placement", "Itemized pricing breakdown", "Edit anything before checkout"],
  },
  {
    number: "04",
    title: "Pay & We Handle the Rest",
    desc: "Checkout securely with Stripe. Once your payment is confirmed, we review your order and get to printing.",
    details: [
      "Secure Stripe checkout",
      "We review your design before printing",
      "We'll reach out if we spot any issues",
      "Ready in approximately 1 week",
    ],
  },
];

const faqs = [
  { q: "What file types can I upload?", a: "We recommend PNG files with a transparent background for best results. JPG and SVG files are also accepted. The higher the resolution, the sharper your print." },
  { q: "Is there a minimum order?", a: "Nope! You can order as few as one shirt. The more you order, the lower the per-shirt price gets." },
  { q: "How long does it take?", a: "Your order will be ready in approximately one week from when your payment is confirmed and your design is approved." },
  { q: "Can I put a design on both the front and back?", a: "Yes! In the design studio you can toggle between front and back and place artwork on both." },
  { q: "What if I don't have artwork ready?", a: "Head to our Contact page and submit a quote request. Describe your design, upload any references, and we'll get back to you." },
  { q: "What printing method do you use?", a: "We use DTF (Direct to Film) printing — vibrant, full-color prints that work on any fabric and hold up wash after wash." },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="py-24 text-center relative overflow-hidden" style={{ backgroundColor: "#1C1C1E" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-15"
            style={{ background: "radial-gradient(ellipse, #4CAF50 0%, transparent 70%)" }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#4CAF50" }}>The Process</p>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-5" style={{ fontFamily: "var(--font-poppins)", color: "#FFFFFF" }}>
            How It Works
          </h1>
          <p className="text-lg" style={{ color: "#8E8E93" }}>
            From choosing your shirt to your doorstep — here&apos;s exactly what happens.
          </p>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: "#111111" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {steps.map((step) => (
            <div key={step.number} className="rounded-2xl p-8 border" style={{ backgroundColor: "#2C2C2E", borderColor: "#3A3A3C" }}>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-extrabold text-sm"
                  style={{ backgroundColor: "rgba(76,175,80,0.15)", color: "#4CAF50", fontFamily: "var(--font-poppins)" }}>
                  {step.number}
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-poppins)", color: "#FFFFFF" }}>{step.title}</h2>
                  <p className="leading-relaxed mb-4" style={{ color: "#8E8E93" }}>{step.desc}</p>
                  <ul className="space-y-2">
                    {step.details.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm">
                        <span className="mt-0.5" style={{ color: "#4CAF50" }}>✓</span>
                        <span style={{ color: "#EBEBF0" }}>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: "#1C1C1E" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#4CAF50" }}>FAQ</p>
            <h2 className="text-3xl font-extrabold" style={{ fontFamily: "var(--font-poppins)", color: "#FFFFFF" }}>
              Common Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-2xl p-6 border" style={{ backgroundColor: "#2C2C2E", borderColor: "#3A3A3C" }}>
                <h3 className="font-bold mb-2" style={{ fontFamily: "var(--font-poppins)", color: "#FFFFFF" }}>{faq.q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#8E8E93" }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 text-center relative overflow-hidden" style={{ backgroundColor: "#111111" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] rounded-full opacity-15"
            style={{ background: "radial-gradient(ellipse, #4CAF50 0%, transparent 70%)" }} />
        </div>
        <div className="relative max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold mb-4" style={{ fontFamily: "var(--font-poppins)", color: "#FFFFFF" }}>
            Ready to get started?
          </h2>
          <p className="mb-8" style={{ color: "#8E8E93" }}>Jump into the design studio — it&apos;s free and takes minutes.</p>
          <Link href="/design"
            className="inline-block px-9 py-4 rounded-full font-bold text-lg"
            style={{ backgroundColor: "#4CAF50", color: "#FFFFFF" }}>
            Design Now
          </Link>
        </div>
      </section>
    </>
  );
}
