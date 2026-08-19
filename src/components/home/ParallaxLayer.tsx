"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  speed?: number;
};

export default function ParallaxLayer({ children, className, style, speed = 0.15 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
