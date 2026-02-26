"use client";

import MagneticButton from "@/components/ui/MagneticButton";
import CounterAnimation from "@/components/animations/CounterAnimation";
import FloatingOrbs from "@/components/layout/FloatingOrbs";
import { heroStats } from "@/lib/constants";
import { ArrowRight, Rocket, BarChart3, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <FloatingOrbs variant="hero" />
      <div className="absolute inset-0 grid-bg" />

      {/* Center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 w-full px-6 pb-20 lg:pb-28 flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          className="inline-flex items-center gap-3 rounded-full relative group cursor-default"
          style={{
            marginTop: 140,
            marginBottom: 40,
            padding: "12px 28px 12px 20px",
            background: "rgba(9, 9, 11, 0.4)",
            border: "1px solid rgba(249, 115, 22, 0.3)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 8px 32px rgba(249, 115, 22, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          }}
        >
          <span className="relative flex items-center justify-center w-3 h-3 z-10">
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(249, 115, 22, 0.5), transparent 70%)",
              }}
              animate={{
                scale: [1, 2.5, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
            <span
              className="relative w-2.5 h-2.5 rounded-full"
              style={{
                background: "linear-gradient(135deg, #f97316, #fb923c)",
                boxShadow: "0 0 12px rgba(249, 115, 22, 0.8)",
              }}
            />
          </span>

          <span className="relative z-10 text-[0.8125rem] font-semibold tracking-[0.01em] text-white/90 group-hover:text-white transition-colors duration-300">
            Agence de Croissance Digitale
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-[family-name:var(--font-display)] font-bold text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] tracking-[-0.03em] text-text-primary"
          style={{ maxWidth: 800 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          La{" "}
          <span className="relative inline-block">
            <span
              className="hero-shimmer"
              style={{
                background: "linear-gradient(90deg, #f97316, #fdba74, #ffffff, #fdba74, #f97316)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              croissance
            </span>
            <motion.span
              className="absolute -bottom-2 left-0 h-[3px] rounded-full"
              style={{ background: "linear-gradient(90deg, #f97316, #fdba74, transparent)" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
            />
          </span>{" "}
          n&apos;attend pas.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1 }}
          className="text-base lg:text-[1.0625rem] text-text-secondary leading-[1.7]"
          style={{ maxWidth: 560, marginTop: 40, marginBottom: 48 }}
        >
          On ne fait pas de la pub. On construit des machines de croissance.
          Media Buying. Contenu Premium. D&eacute;veloppement Web.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <MagneticButton href="/contact" variant="primary">
            Lancer votre projet
          </MagneticButton>
          <MagneticButton href="/services" variant="ghost" className="group">
            D&eacute;couvrir notre expertise
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="grid grid-cols-3"
          style={{ maxWidth: 780, width: "100%", marginTop: 56, marginBottom: 72, gap: "clamp(16px, 2.5vw, 24px)" }}
        >
          {[
            { ...heroStats[0], icon: Rocket },
            { ...heroStats[1], icon: BarChart3 },
            { ...heroStats[2], icon: TrendingUp },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                whileHover={{ y: -4, borderColor: "rgba(249, 115, 22, 0.2)" }}
                transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                className="relative group text-center cursor-pointer flex flex-col items-center"
                style={{
                  padding: "32px 24px 28px",
                  borderRadius: 20,
                  background: "rgba(255, 255, 255, 0.025)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                }}
              >
                {/* Icon */}
                <div style={{ marginBottom: 16 }}>
                  <Icon
                    size={20}
                    className="text-orange-500/60 group-hover:text-orange-400 transition-colors duration-300"
                    strokeWidth={1.8}
                  />
                </div>

                {/* Number */}
                <span
                  className="font-[family-name:var(--font-display)] font-bold text-white block leading-none"
                  style={{ fontSize: "clamp(2rem, 4.5vw, 2.75rem)", marginBottom: 10 }}
                >
                  <CounterAnimation target={stat.value} suffix={stat.suffix} />
                </span>

                {/* Label */}
                <span className="text-[0.75rem] text-text-muted/60 font-medium uppercase tracking-[0.08em] leading-snug">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-bg-primary to-transparent" />
    </section>
  );
}
