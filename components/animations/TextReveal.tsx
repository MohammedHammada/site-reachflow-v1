"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
}

export default function TextReveal({ children, className = "", as: Tag = "h1", delay = 0 }: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.style.opacity = "1";
      return;
    }

    const words = children.split(" ");
    el.innerHTML = "";

    words.forEach((word, i) => {
      const wrapper = document.createElement("span");
      wrapper.style.display = "inline-block";
      wrapper.style.overflow = "hidden";
      wrapper.style.verticalAlign = "top";

      const inner = document.createElement("span");
      inner.textContent = word + "\u00A0";
      inner.style.display = "inline-block";
      inner.style.transform = "translateY(100%)";

      wrapper.appendChild(inner);
      el.appendChild(wrapper);

      gsap.to(inner, {
        y: 0,
        duration: 0.6,
        delay: delay + i * 0.06,
        ease: "power3.out",
      });
    });
  }, [children, delay]);

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className} style={{ opacity: 1 }}>
      {children}
    </Tag>
  );
}
