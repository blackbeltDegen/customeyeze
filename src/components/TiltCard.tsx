"use client";

import { useRef, MouseEvent as ReactMouseEvent } from "react";

type Props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

export default function TiltCard({ children, style, className }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) translateY(-6px) scale(1.02)`;
    card.style.boxShadow = `${-x * 20}px ${-y * 20}px 60px rgba(76,175,80,0.15), 0 0 40px rgba(76,175,80,0.08)`;
    card.style.borderColor = "rgba(76,175,80,0.4)";
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0) scale(1)";
    card.style.boxShadow = "none";
    card.style.borderColor = "#1F1F1F";
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: "transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease",
        border: "1px solid #1F1F1F",
        willChange: "transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
