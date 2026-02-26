"use client";

import { Megaphone, Camera, Code2 } from "lucide-react";

type ServiceType = "mediaBuying" | "content" | "webDev";

const icons = {
  mediaBuying: Megaphone,
  content: Camera,
  webDev: Code2,
};

function NetworkGrid() {
  const dots = Array.from({ length: 25 }, (_, i) => ({
    row: Math.floor(i / 5),
    col: i % 5,
    delay: (Math.floor(i / 5) + (i % 5)) * 0.3,
  }));

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative" style={{ width: 200, height: 200 }}>
        {dots.map((dot, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-[#f97316] to-[#fb923c]"
            style={{
              left: `${dot.col * 25}%`,
              top: `${dot.row * 25}%`,
              animation: `pulse-dot 3s ease-in-out ${dot.delay}s infinite`,
            }}
          />
        ))}
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
          {[
            [0, 1], [1, 2], [2, 3], [3, 4],
            [5, 6], [6, 7], [7, 8],
            [10, 11], [11, 12], [12, 13],
            [0, 5], [5, 10], [1, 6], [6, 11],
            [2, 7], [7, 12], [3, 8], [8, 13],
            [4, 9], [9, 14],
          ].map(([from, to], i) => {
            const fx = (from % 5) * 25;
            const fy = Math.floor(from / 5) * 25;
            const tx = (to % 5) * 25;
            const ty = Math.floor(to / 5) * 25;
            return (
              <line
                key={i}
                x1={`${fx}%`}
                y1={`${fy}%`}
                x2={`${tx}%`}
                y2={`${ty}%`}
                stroke="rgba(249, 115, 22, 0.15)"
                strokeWidth="1"
                style={{
                  animation: `pulse-dot 4s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function FloatingShapes() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Orbiting circle */}
      <div
        className="absolute w-5 h-5 rounded-full border-2 border-[#f97316]/40"
        style={{ animation: "orbit-1 12s linear infinite" }}
      />
      {/* Orbiting triangle */}
      <div
        className="absolute"
        style={{ animation: "orbit-2 16s linear infinite" }}
      >
        <div
          className="w-0 h-0"
          style={{
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderBottom: "14px solid rgba(251, 146, 60, 0.4)",
          }}
        />
      </div>
      {/* Orbiting square */}
      <div
        className="absolute w-4 h-4 border-2 border-white/20 rotate-45"
        style={{ animation: "orbit-3 20s linear infinite" }}
      />
      {/* Static rings */}
      <div className="absolute w-32 h-32 rounded-full border border-[#f97316]/10" />
      <div className="absolute w-48 h-48 rounded-full border border-[#fb923c]/5" />
    </div>
  );
}

function CodeLines() {
  const lines = [
    { width: "60%", color: "rgba(249, 115, 22, 0.3)", delay: 0 },
    { width: "80%", color: "rgba(249, 115, 22, 0.2)", delay: 0.3 },
    { width: "45%", color: "rgba(251, 146, 60, 0.3)", delay: 0.6 },
    { width: "70%", color: "rgba(255, 255, 255, 0.1)", delay: 0.9 },
    { width: "55%", color: "rgba(249, 115, 22, 0.25)", delay: 1.2 },
    { width: "90%", color: "rgba(251, 146, 60, 0.2)", delay: 1.5 },
    { width: "40%", color: "rgba(255, 255, 255, 0.08)", delay: 1.8 },
    { width: "65%", color: "rgba(249, 115, 22, 0.2)", delay: 2.1 },
    { width: "50%", color: "rgba(251, 146, 60, 0.15)", delay: 2.4 },
    { width: "75%", color: "rgba(255, 255, 255, 0.06)", delay: 2.7 },
  ];

  return (
    <div className="absolute inset-0 flex flex-col justify-center px-12 gap-2.5">
      {lines.map((line, i) => (
        <div
          key={i}
          className="h-2 rounded-full"
          style={{
            ["--line-width" as string]: line.width,
            background: line.color,
            animation: `code-line-appear 3s ease-out ${line.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function ServiceVisual({ type }: { type: ServiceType }) {
  const Icon = icons[type];

  return (
    <div
      className="relative w-full rounded-2xl border border-white/[0.06] overflow-hidden"
      style={{
        aspectRatio: "4/3",
        background: "radial-gradient(ellipse at center, rgba(249, 115, 22, 0.08), transparent 70%)",
      }}
    >
      {/* Background pattern */}
      {type === "mediaBuying" && <NetworkGrid />}
      {type === "content" && <FloatingShapes />}
      {type === "webDev" && <CodeLines />}

      {/* Center icon with glow */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div
          className="w-20 h-20 rounded-2xl bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center"
          style={{ animation: "glow-ring 4s ease-in-out infinite" }}
        >
          <Icon size={32} className="text-[#f97316]" />
        </div>
      </div>
    </div>
  );
}
