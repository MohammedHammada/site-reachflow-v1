import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4, ease: "easeInOut" },
};

export function initScrollReveal(element: HTMLElement, options?: { delay?: number; y?: number }) {
  const { delay = 0, y = 40 } = options || {};

  gsap.fromTo(
    element,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    }
  );
}

export function initTextReveal(element: HTMLElement) {
  const text = element.textContent || "";
  element.textContent = "";
  const words = text.split(" ");

  words.forEach((word, i) => {
    const span = document.createElement("span");
    span.textContent = word + " ";
    span.style.opacity = "0";
    span.style.display = "inline-block";
    span.style.transform = "translateY(20px)";
    element.appendChild(span);

    gsap.to(span, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      delay: i * 0.08,
      ease: "power2.out",
    });
  });
}

export function initCounterAnimation(element: HTMLElement, target: number, duration: number = 2) {
  const obj = { value: 0 };
  gsap.to(obj, {
    value: target,
    duration,
    ease: "power2.out",
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      toggleActions: "play none none none",
    },
    onUpdate: () => {
      element.textContent = Math.round(obj.value).toString();
    },
  });
}
