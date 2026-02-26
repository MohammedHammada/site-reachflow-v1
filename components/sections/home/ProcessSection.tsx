"use client";

import { processSteps } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import MagneticButton from "@/components/ui/MagneticButton";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ProcessSection() {
  return (
    <section className="section-padding relative bg-bg-primary">
      <div className="w-full flex flex-col items-center px-6 lg:px-12">
        <div className="text-center" style={{ marginBottom: 56, maxWidth: 600 }}>
          <SectionHeader
            label="M&eacute;thodologie"
            title="Notre Processus"
            description="Quatre &eacute;tapes. Z&eacute;ro improvisation. Des r&eacute;sultats pr&eacute;visibles."
          />
        </div>

        {/* Vertical timeline */}
        <div className="w-full relative" style={{ maxWidth: 560 }}>
          {/* Animated vertical line */}
          <motion.div
            className="absolute left-6 lg:left-8 top-0 bottom-0 w-px origin-top"
            style={{ background: "linear-gradient(to bottom, #f97316, #fb923c, rgba(251,146,60,0.1))" }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {/* Steps */}
          <div className="flex flex-col gap-0">
            {processSteps.map((step, index) => (
              <ScrollReveal key={step.number} delay={index * 0.2}>
                <div className="relative flex items-start gap-6 lg:gap-8" style={{ paddingBottom: index < processSteps.length - 1 ? 48 : 0 }}>
                  {/* Dot on the line */}
                  <div className="relative z-10 shrink-0 flex flex-col items-center">
                    <motion.div
                      className="w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center"
                      style={{
                        background: "rgba(249, 115, 22, 0.08)",
                        border: "1px solid rgba(249, 115, 22, 0.2)",
                      }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.2, type: "spring", stiffness: 200 }}
                    >
                      <span className="font-[family-name:var(--font-display)] font-bold text-lg lg:text-xl text-accent-primary">
                        {step.number}
                      </span>
                    </motion.div>
                  </div>

                  {/* Card content */}
                  <div className="card-hover flex-1" style={{ padding: "28px 28px" }}>
                    <h3 className="font-[family-name:var(--font-display)] font-semibold text-[1.0625rem] tracking-[-0.01em] text-white" style={{ marginBottom: 8 }}>
                      {step.title}
                    </h3>
                    <p className="text-text-secondary text-[0.8125rem] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className="text-center" style={{ marginTop: 56 }}>
          <MagneticButton href="/services" variant="outline">
            D&eacute;couvrir en d&eacute;tail
            <ArrowRight size={15} />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
