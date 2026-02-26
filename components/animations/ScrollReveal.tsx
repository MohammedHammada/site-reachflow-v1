"use client";

import { useEffect, useRef, CSSProperties } from "react";
import { initScrollReveal } from "@/lib/animations";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  style?: CSSProperties;
}

export default function ScrollReveal({ children, className = "", delay = 0, y = 40, style }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Check for reduced motion or mobile
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      ref.current.style.opacity = "1";
      return;
    }

    initScrollReveal(ref.current, { delay, y });
  }, [delay, y]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0, ...style }}>
      {children}
    </div>
  );
}
