import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <section className="py-24 text-center relative overflow-hidden" style={{ backgroundColor: "#1C1C1E" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-15"
            style={{ background: "radial-gradient(ellipse, #4CAF50 0%, transparent 70%)" }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#4CAF50" }}>Our Story</p>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-5" style={{ fontFamily: "var(--font-poppins)", color: "#FFFFFF" }}>
            About Customeyeze
          </h1>
          <p className="text-lg" style={{ color: "#8E8E93" }}>
            We started with a simple idea — custom shirts shouldn&apos;t be complicated.
          </p>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: "#111111" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="rounded-2xl p-8 border" style={{ backgroundColor: "#2C2C2E", borderColor: "#3A3A3C" }}>
            <h2 className="text-2xl font-bold mb-5" style={{ fontFamily: "var(--font-poppins)", color: "#FFFFFF" }}>Our Story</h2>
            <p className="leading-relaxed mb-4" style={{ color: "#8E8E93" }}>
              Customeyeze was born out of frustration. Getting custom shirts used to mean confusing order forms,
              high minimums, slow turnaround, and designs that never quite looked the way you imagined.
            </p>
            <p className="leading-relaxed" style={{ color: "#8E8E93" }}>
              We built something better — a design tool that&apos;s actually fun to use, with professional DTF
              printing that brings your vision to life exactly as you see it. No minimums, no runarounds,
              just great shirts delivered fast.
            </p>
          </div>

          <div className="rounded-2xl p-8 border" style={{ backgroundColor: "#2C2C2E", borderColor: "#3A3A3C" }}>
            <h2 className="text-2xl font-bold mb-5" style={{ fontFamily: "var(--font-poppins)", color: "#FFFFFF" }}>What We Do</h2>
            <p className="leading-relaxed mb-4" style={{ color: "#8E8E93" }}>
              We specialize in <strong style={{ color: "#4CAF50" }}>DTF (Direct to Film)</strong> printing — one of the most versatile and vibrant
              printing methods available. It works on virtually any fabric, supports full-color designs with no color
              limits, and produces a soft, wash-resistant print that lasts.
            </p>
            <p className="leading-relaxed" style={{ color: "#8E8E93" }}>
              Whether you need one shirt or hundreds, every order gets the same care and quality.
            </p>
          </div>

          <div className="rounded-2xl p-8 border" style={{ backgroundColor: "#2C2C2E", borderColor: "#3A3A3C" }}>
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-poppins)", color: "#FFFFFF" }}>Who We Serve</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {["Sports Teams", "Schools & Clubs", "Small Businesses", "Brands & Creators", "Events & Parties", "Individuals"].map((item) => (
                <div key={item}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-center border"
                  style={{ backgroundColor: "#1C1C1E", borderColor: "#3A3A3C", color: "#EBEBF0" }}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link href="/design"
              className="inline-block px-9 py-4 rounded-full font-bold text-lg"
              style={{ backgroundColor: "#4CAF50", color: "#FFFFFF" }}>
              Start Designing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
