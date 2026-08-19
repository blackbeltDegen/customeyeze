"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
};

export default function RevealSection({ children, className, style, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: "inset(0% 0% 100% 0%)", y: 40, opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          y: 0,
          opacity: 1,
          duration: 1.1,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
