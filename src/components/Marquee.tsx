const items = [
  "DTF PRINTING", "NO MINIMUMS", "SHIPS IN ~1 WEEK", "TEAMS & BRANDS",
  "UNLIMITED COLORS", "SOFT FEEL", "WASH RESISTANT", "CUSTOM ARTWORK",
  "SCHOOLS & CLUBS", "EVENTS & MERCH", "DESIGN ONLINE", "FAST TURNAROUND",
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div style={{
      overflow: "hidden",
      backgroundColor: "#4CAF50",
      padding: "13px 0",
    }}>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 20, padding: "0 24px", whiteSpace: "nowrap" }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.22em", color: "#fff" }}>
              {item}
            </span>
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", flexShrink: 0 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
