"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const circle = circleRef.current;
    if (!dot || !circle) return;

    // Check if touch device
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let circleX = 0;
    let circleY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const animate = () => {
      circleX += (mouseX - circleX) * 0.15;
      circleY += (mouseY - circleY) * 0.15;
      circle.style.transform = `translate(${circleX - 20}px, ${circleY - 20}px)`;
      requestAnimationFrame(animate);
    };

    const handleMouseEnterInteractive = () => {
      circle.style.width = "60px";
      circle.style.height = "60px";
      circle.style.marginLeft = "-10px";
      circle.style.marginTop = "-10px";
      circle.style.borderColor = "rgba(249, 115, 22, 0.5)";
    };

    const handleMouseLeaveInteractive = () => {
      circle.style.width = "40px";
      circle.style.height = "40px";
      circle.style.marginLeft = "0px";
      circle.style.marginTop = "0px";
      circle.style.borderColor = "rgba(255, 255, 255, 0.3)";
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    const interactives = document.querySelectorAll("a, button, [role='button'], input, textarea, select");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnterInteractive);
      el.addEventListener("mouseleave", handleMouseLeaveInteractive);
    });

    // Re-observe for dynamically added elements
    const observer = new MutationObserver(() => {
      const newInteractives = document.querySelectorAll("a, button, [role='button'], input, textarea, select");
      newInteractives.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnterInteractive);
        el.addEventListener("mouseleave", handleMouseLeaveInteractive);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10001] hidden md:block"
        style={{ transition: "none" }}
      />
      <div
        ref={circleRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[10000] hidden md:block"
        style={{
          border: "1px solid rgba(255, 255, 255, 0.3)",
          transition: "width 0.3s, height 0.3s, margin 0.3s, border-color 0.3s",
        }}
      />
    </>
  );
}
