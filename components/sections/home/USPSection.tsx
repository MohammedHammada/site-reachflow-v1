"use client";

import { usps } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import StaggerChildren, { StaggerItem } from "@/components/animations/StaggerChildren";
import { motion } from "framer-motion";

const gradientClasses = [
  "from-orange-500 to-orange-600",
  "from-orange-600 to-amber-500",
  "from-orange-600 via-orange-500 to-orange-600",
];
const gradientColors = [
  ["#f97316", "#fb923c"],
  ["#fb923c", "#fdba74"],
  ["#ea580c", "#f97316"],
];

export default function USPSection() {
  return (
    <section className="section-padding relative bg-bg-secondary overflow-hidden">
      <div className="absolute inset-0 grid-bg" />

      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/3 w-96 h-96 rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, #f97316, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-1/2 right-1/3 w-96 h-96 rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, #fb923c, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
          style={{ marginBottom: 72, maxWidth: 640 }}
        >
          <SectionHeader
            label="Pourquoi Reachflow"
            title="Pas une agence de plus. Un partenaire de croissance."
            description="L&rsquo;int&eacute;gration compl&egrave;te de la cha&icirc;ne de valeur digitale. Du premier pixel au dernier dirham converti."
          />
        </motion.div>

        {/* Cards Grid */}
        <StaggerChildren
          className="grid grid-cols-1 md:grid-cols-3 w-full items-stretch"
          style={{ maxWidth: 1200, gap: "clamp(16px, 2vw, 24px)" }}
          stagger={0.15}
        >
          {usps.map((usp, index) => {
            const Icon = usp.icon;
            return (
              <StaggerItem key={usp.title} className="flex">
                <motion.div
                  whileHover={{ y: -12 }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  className="relative h-full w-full overflow-hidden group cursor-pointer"
                  style={{
                    padding: "clamp(44px, 6vw, 56px) clamp(32px, 5vw, 44px)",
                    borderRadius: 32,
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)",
                    backdropFilter: "blur(40px)",
                    WebkitBackdropFilter: "blur(40px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {/* Number background */}
                  <span
                    className="absolute top-6 right-6 font-[family-name:var(--font-display)] font-bold leading-none select-none pointer-events-none transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      fontSize: "4rem",
                      color: `${gradientColors[index][0]}12`,
                      opacity: 0.4,
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Animated gradient border */}
                  <motion.div
                    className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(135deg, ${gradientColors[index][0]}40, ${gradientColors[index][1]}30, transparent)`,
                      padding: "1px",
                      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Background glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: "radial-gradient(circle at 50% 0%, rgba(249, 115, 22, 0.12), transparent 60%)",
                    }}
                  />

                  {/* Top gradient line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px] opacity-60 group-hover:opacity-100 transition-all duration-700"
                    style={{
                      background: `linear-gradient(90deg, ${gradientColors[index][0]}, ${gradientColors[index][1]}, transparent)`,
                      backgroundSize: "200% 100%",
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center h-full">
                    {/* Icon with sophisticated background */}
                    <div className="relative" style={{ marginBottom: "clamp(28px, 4vh, 36px)" }}>
                      <motion.div
                        className="relative z-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                        style={{
                          width: 80,
                          height: 80,
                        }}
                      >
                        {/* Outer glow ring */}
                        <div
                          className="absolute inset-0 rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: `linear-gradient(135deg, ${gradientColors[index][0]}, ${gradientColors[index][1]})`,
                            filter: "blur(24px)",
                          }}
                        />
                        {/* Icon container */}
                        <div
                          className={`relative w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br ${gradientClasses[index]} shadow-2xl`}
                          style={{
                            boxShadow: `0 12px 48px ${gradientColors[index][0]}60`,
                          }}
                        >
                          <Icon size={36} className="text-white" strokeWidth={2} />
                        </div>
                      </motion.div>
                    </div>

                    {/* Title */}
                    <h3
                      className="font-[family-name:var(--font-display)] font-bold text-white mb-4"
                      style={{
                        fontSize: "1.125rem",
                        lineHeight: 1.2,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {usp.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-text-secondary/90 leading-relaxed flex-1 mx-auto"
                      style={{
                        fontSize: "0.9375rem",
                        lineHeight: 1.7,
                        maxWidth: 300,
                      }}
                    >
                      {usp.description}
                    </p>

                    {/* Bottom accent */}
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${gradientColors[index][0]}, transparent)`,
                      }}
                    />
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
