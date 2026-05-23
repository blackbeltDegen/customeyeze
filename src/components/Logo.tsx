export default function Logo({ size = 36 }: { size?: number }) {
  const fontSize = size;
  const eyeH = size * 0.65;
  const eyeW = size * 1.1;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, lineHeight: 1 }}>
      <span style={{
        fontFamily: "var(--font-poppins)",
        fontWeight: 700,
        fontSize,
        color: "#4CAF50",
        letterSpacing: "-0.5px",
      }}>
        custom
      </span>

      {/* Eye icon — matches the logo */}
      <svg
        width={eyeW}
        height={eyeH}
        viewBox="0 0 44 28"
        fill="none"
        style={{ display: "block", margin: `0 2px` }}
      >
        {/* Outer eye shape */}
        <path
          d="M2 14 C10 2 34 2 42 14 C34 26 10 26 2 14Z"
          fill="none"
          stroke="#4CAF50"
          strokeWidth="2.5"
        />
        {/* Iris */}
        <circle cx="22" cy="14" r="7" fill="#4CAF50" opacity="0.9" />
        {/* Pupil */}
        <circle cx="22" cy="14" r="3.5" fill="#1B5E20" />
        {/* Shine */}
        <circle cx="19" cy="11.5" r="1.8" fill="white" opacity="0.7" />
      </svg>

      <span style={{
        fontFamily: "var(--font-poppins)",
        fontWeight: 700,
        fontSize,
        color: "#4CAF50",
        letterSpacing: "-0.5px",
      }}>
        ze
      </span>
    </div>
  );
}
