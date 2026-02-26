"use client";

import { motion } from "framer-motion";
import PageTransition from "@/components/animations/PageTransition";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerChildren, { StaggerItem } from "@/components/animations/StaggerChildren";
import CounterAnimation from "@/components/animations/CounterAnimation";
import MagneticButton from "@/components/ui/MagneticButton";
import FloatingOrbs from "@/components/layout/FloatingOrbs";
import { values, enemies } from "@/lib/constants";
import { Ban, Layers, Target, TrendingUp, Shield, Code2, Video, BarChart3 } from "lucide-react";

export default function AProposPage() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <FloatingOrbs variant="hero" />
        <div className="absolute inset-0 grid-bg" />
        <div className="relative z-10 w-full flex flex-col items-center px-8 md:px-16 lg:px-24" style={{ paddingTop: "clamp(100px, 12vh, 140px)", paddingBottom: "clamp(40px, 6vh, 60px)" }}>
          <div className="flex flex-col items-center text-center" style={{ maxWidth: 1000 }}>
            <ScrollReveal delay={0.3}>
              <h1 className="font-[family-name:var(--font-display)] font-bold text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-tight text-center" style={{ marginBottom: "clamp(20px, 3vh, 28px)" }}>
                On Ne Fait Pas Du{" "}
                <span className="relative inline-block text-accent-primary">
                  Marketing
                  <span
                    className="absolute bottom-1 left-0 w-full h-[3px] rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #f97316, #fb923c)",
                    }}
                  />
                </span>
                . On Construit Des{" "}
                <span className="relative inline-block text-accent-primary">
                  Ecosystemes
                  <span
                    className="absolute bottom-1 left-0 w-full h-[3px] rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #f97316, #fb923c)",
                    }}
                  />
                </span>
                .
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.8}>
              <p className="text-lg lg:text-xl text-text-secondary max-w-2xl leading-relaxed text-center mx-auto">
                Reachflow est n&eacute; d&apos;une conviction : le digital au Maroc m&eacute;rite mieux.
                Mieux que des pubs moches. Mieux que des sites cass&eacute;s. Mieux que des promesses vides.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="relative bg-bg-secondary overflow-hidden" style={{ paddingTop: "clamp(60px, 8vh, 100px)", paddingBottom: "clamp(60px, 10vh, 120px)" }}>
        <div className="absolute inset-0 grid-bg" />

        {/* Background gradient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-[0.03]"
            style={{
              background: "radial-gradient(circle, #f97316, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-[0.03]"
            style={{
              background: "radial-gradient(circle, #fb923c, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
        </div>

        <div className="relative z-10 w-full flex flex-col items-center px-8 md:px-16 lg:px-24">
          {/* Main headline - full width centered */}
          <ScrollReveal className="w-full flex justify-center" style={{ marginBottom: "clamp(48px, 8vh, 80px)" }}>
            <h2 className="font-[family-name:var(--font-display)] font-bold text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1] tracking-[-0.02em] text-white text-center">
              On Construit Des{" "}
              <span className="text-gradient">Écosystèmes Intégrés</span>
            </h2>
          </ScrollReveal>

          <div className="w-full flex flex-col items-center" style={{ maxWidth: 1200 }}>
            {/* Three pillars */}
            <StaggerChildren className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "clamp(24px, 3vw, 40px)", marginBottom: "clamp(48px, 8vh, 72px)" }} stagger={0.15}>
              {[
                { title: "Développement", description: "Sites performants qui convertissent", icon: Code2, gradient: "from-orange-500 to-orange-600" },
                { title: "Production", description: "Contenu créatif qui engage", icon: Video, gradient: "from-orange-600 to-amber-500" },
                { title: "Media Buying", description: "Diffusion stratégique qui scale", icon: BarChart3, gradient: "from-amber-500 to-orange-500" },
              ].map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <StaggerItem key={pillar.title}>
                    <motion.div
                      whileHover={{ y: -16 }}
                      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                      className="relative h-full overflow-hidden group cursor-pointer"
                      style={{
                        padding: "clamp(44px, 6vw, 60px) clamp(32px, 5vw, 44px)",
                        borderRadius: 32,
                        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)",
                        backdropFilter: "blur(40px)",
                        WebkitBackdropFilter: "blur(40px)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      {/* Animated gradient border */}
                      <motion.div
                        className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100"
                        style={{
                          background: "linear-gradient(135deg, rgba(249, 115, 22, 0.3), rgba(251, 146, 60, 0.2), transparent)",
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

                      <div className="flex flex-col items-center text-center">
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
                                background: `linear-gradient(135deg, ${pillar.gradient.includes('orange-500') ? '#f97316' : '#fb923c'}, ${pillar.gradient.includes('amber-500') ? '#f59e0b' : '#fb923c'})`,
                                filter: "blur(24px)",
                              }}
                            />
                            {/* Icon container */}
                            <div
                              className={`relative w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br ${pillar.gradient} shadow-2xl`}
                              style={{
                                boxShadow: "0 12px 48px rgba(249, 115, 22, 0.5)",
                              }}
                            >
                              <Icon size={36} className="text-white" strokeWidth={2} />
                            </div>
                          </motion.div>
                        </div>

                        {/* Content */}
                        <h3
                          className="font-[family-name:var(--font-display)] font-bold text-white mb-3"
                          style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)" }}
                        >
                          {pillar.title}
                        </h3>
                        <p className="text-text-secondary text-[0.9375rem] leading-relaxed">
                          {pillar.description}
                        </p>

                        {/* Bottom accent */}
                        <div
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
                          style={{
                            background: "linear-gradient(90deg, transparent, #f97316, transparent)",
                          }}
                        />
                      </div>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>

          </div>

          {/* Bottom statement - full width */}
          <ScrollReveal delay={0.6} className="w-full flex justify-center">
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="relative overflow-hidden group cursor-pointer"
              style={{
                width: "100%",
                maxWidth: 1000,
                padding: "clamp(40px, 6vw, 56px) clamp(48px, 7vw, 80px)",
                borderRadius: 32,
                background: "linear-gradient(135deg, rgba(249, 115, 22, 0.12) 0%, rgba(251, 146, 60, 0.06) 100%)",
                backdropFilter: "blur(40px)",
                WebkitBackdropFilter: "blur(40px)",
                border: "1px solid rgba(249, 115, 22, 0.25)",
                boxShadow: "0 20px 60px rgba(249, 115, 22, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              }}
            >
              {/* Top gradient line - enhanced */}
              <div
                className="absolute top-0 left-0 right-0 h-[4px] opacity-70 group-hover:opacity-100 transition-all duration-700"
                style={{
                  background: "linear-gradient(90deg, transparent, #f97316, #fb923c, #fdba74, #fb923c, #f97316, transparent)",
                  backgroundSize: "200% 100%",
                }}
              />

              {/* Animated gradient border */}
              <motion.div
                className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(135deg, rgba(249, 115, 22, 0.4), rgba(251, 146, 60, 0.3), transparent)",
                  padding: "1px",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
                transition={{ duration: 0.5 }}
              />

              {/* Ambient glow - enhanced */}
              <div
                className="absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: "radial-gradient(circle at center, rgba(249, 115, 22, 0.15), transparent 70%)",
                }}
              />

              {/* Content */}
              <p className="relative z-10 text-center text-white font-[family-name:var(--font-display)] font-semibold leading-[1.4]" style={{ fontSize: "clamp(1.125rem, 2.5vw, 1.75rem)" }}>
                L&apos;intégration n&apos;est pas un luxe.{" "}
                <span className="relative inline-block text-accent-primary">
                  C&apos;est une nécessité stratégique.
                  <span
                    className="absolute bottom-0 left-0 w-full h-[2px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "linear-gradient(90deg, #f97316, #fb923c)",
                    }}
                  />
                </span>
              </p>

              {/* Bottom accent glow */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{
                  background: "linear-gradient(90deg, transparent, #f97316, #fb923c, transparent)",
                  filter: "blur(4px)",
                }}
              />
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className="relative bg-bg-primary overflow-hidden" style={{ paddingTop: "clamp(100px, 12vh, 140px)", paddingBottom: "clamp(100px, 12vh, 140px)" }}>
        <div className="absolute inset-0 grid-bg" />

        {/* Ambient gradient background */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.03]"
            style={{
              background: "radial-gradient(circle, #f97316, transparent 70%)",
              filter: "blur(120px)",
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.03]"
            style={{
              background: "radial-gradient(circle, #fb923c, transparent 70%)",
              filter: "blur(120px)",
            }}
          />
        </div>

        <div className="relative z-10 w-full flex flex-col items-center px-8 md:px-16 lg:px-24">
          <div className="w-full" style={{ maxWidth: 1200 }}>
            {/* Section Header */}
            <div className="w-full flex flex-col items-center text-center" style={{ marginBottom: "clamp(64px, 10vh, 96px)" }}>
              <ScrollReveal className="w-full flex flex-col items-center">
                <div className="flex items-center justify-center gap-3" style={{ marginBottom: "clamp(20px, 3vh, 28px)" }}>
                  <div className="w-12 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(249, 115, 22, 0.5))" }} />
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent-primary">
                    Nos principes
                  </span>
                  <div className="w-12 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(249, 115, 22, 0.5))" }} />
                </div>
                <h2 className="font-[family-name:var(--font-display)] font-bold text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.03em] text-white text-center" style={{ marginBottom: "clamp(16px, 2.5vh, 24px)" }}>
                  Ce En Quoi On Croit
                </h2>
                <p className="text-text-secondary text-base lg:text-lg max-w-2xl mx-auto leading-relaxed text-center">
                  Nos valeurs fondamentales qui guident chaque décision
                </p>
              </ScrollReveal>
            </div>

            {/* Values Grid */}
            <StaggerChildren className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "clamp(24px, 3vw, 40px)" }} stagger={0.12}>
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <StaggerItem key={value.title}>
                    <motion.div
                      whileHover={{ y: -12, scale: 1.02 }}
                      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                      className="relative h-full overflow-hidden group cursor-pointer"
                      style={{
                        padding: "clamp(36px, 5vw, 48px)",
                        borderRadius: 28,
                        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
                        backdropFilter: "blur(32px)",
                        WebkitBackdropFilter: "blur(32px)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                      }}
                    >
                      {/* Gradient border on top */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[3px] opacity-60 group-hover:opacity-100 transition-all duration-700"
                        style={{
                          background: "linear-gradient(90deg, #f97316, #fb923c, #fdba74, #fb923c, #f97316)",
                          backgroundSize: "200% 100%",
                        }}
                      />

                      {/* Hover glow effect */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        style={{
                          background: "radial-gradient(circle at 50% 0%, rgba(249, 115, 22, 0.08), transparent 60%)",
                        }}
                      />

                      {/* Number badge */}
                      <div className="absolute top-6 right-6 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                        <span className="font-[family-name:var(--font-display)] font-bold text-4xl text-white/10">
                          0{index + 1}
                        </span>
                      </div>

                      <div className="relative z-10 flex flex-col h-full">
                        {/* Icon container */}
                        <div
                          className="w-16 h-16 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                          style={{
                            background: "linear-gradient(135deg, #f97316, #fb923c)",
                            boxShadow: "0 8px 24px rgba(249, 115, 22, 0.3)",
                            marginBottom: "clamp(24px, 3vh, 32px)",
                          }}
                        >
                          <Icon size={26} className="text-white" strokeWidth={2} />
                        </div>

                        {/* Content */}
                        <h3 className="font-[family-name:var(--font-display)] font-bold text-2xl text-white leading-tight" style={{ marginBottom: "clamp(16px, 2vh, 20px)" }}>
                          {value.title}
                        </h3>

                        <p className="text-accent-primary text-base font-medium italic leading-relaxed" style={{ marginBottom: "clamp(20px, 2.5vh, 24px)" }}>
                          &ldquo;{value.quote}&rdquo;
                        </p>

                        <p className="text-text-secondary text-[0.9375rem] leading-[1.7] flex-1">
                          {value.description}
                        </p>

                        {/* Bottom accent line */}
                        <div style={{ marginTop: "clamp(24px, 3vh, 32px)", paddingTop: "clamp(20px, 2.5vh, 24px)" }} className="border-t border-white/5">
                          <div className="flex items-center gap-2 text-accent-primary/80 group-hover:text-accent-primary transition-colors duration-300">
                            <span className="text-xs font-semibold uppercase tracking-wider">Valeur essentielle</span>
                            <div className="flex-1 h-px bg-gradient-to-r from-accent-primary/20 to-transparent" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* What We Fight */}
      <section className="relative bg-bg-secondary overflow-hidden" style={{ paddingTop: "clamp(100px, 12vh, 140px)", paddingBottom: "clamp(100px, 12vh, 140px)" }}>
        <div className="absolute inset-0 grid-bg" />

        {/* Ambient gradient background - red theme */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.02]"
            style={{
              background: "radial-gradient(circle, #ef4444, transparent 70%)",
              filter: "blur(120px)",
            }}
          />
        </div>

        <div className="relative z-10 w-full flex flex-col items-center px-8 md:px-16 lg:px-24">
          <div className="w-full" style={{ maxWidth: 1200 }}>
            {/* Section Header */}
            <div className="w-full flex flex-col items-center text-center" style={{ marginBottom: "clamp(64px, 10vh, 96px)" }}>
              <ScrollReveal className="w-full flex flex-col items-center">
                <div className="flex items-center justify-center gap-3" style={{ marginBottom: "clamp(20px, 3vh, 28px)" }}>
                  <div className="w-12 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(239, 68, 68, 0.5))" }} />
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-400">
                    Ce qu&apos;on combat
                  </span>
                  <div className="w-12 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(239, 68, 68, 0.5))" }} />
                </div>
                <h2 className="font-[family-name:var(--font-display)] font-bold text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.03em] text-white text-center" style={{ marginBottom: "clamp(16px, 2.5vh, 24px)" }}>
                  Les Ennemis de Votre Croissance
                </h2>
                <p className="text-text-secondary text-base lg:text-lg max-w-2xl mx-auto leading-relaxed text-center">
                  Ce qui freine votre croissance et qu&apos;on élimine ensemble
                </p>
              </ScrollReveal>
            </div>

            {/* Enemies Grid */}
            <StaggerChildren className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "clamp(24px, 3vw, 40px)" }} stagger={0.12}>
              {enemies.map((enemy, index) => {
                const Icon = enemy.icon;
                return (
                  <StaggerItem key={enemy.title}>
                    <motion.div
                      whileHover={{ y: -12, scale: 1.02 }}
                      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                      className="relative h-full overflow-hidden group cursor-pointer"
                      style={{
                        padding: "clamp(36px, 5vw, 48px)",
                        borderRadius: 28,
                        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)",
                        backdropFilter: "blur(32px)",
                        WebkitBackdropFilter: "blur(32px)",
                        border: "1px solid rgba(239, 68, 68, 0.15)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                      }}
                    >
                      {/* Top gradient line - red theme */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[3px] opacity-60 group-hover:opacity-100 transition-all duration-700"
                        style={{
                          background: "linear-gradient(90deg, #ef4444, #f87171, #fca5a5, #f87171, #ef4444)",
                          backgroundSize: "200% 100%",
                        }}
                      />

                      {/* Hover glow effect - red */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        style={{
                          background: "radial-gradient(circle at 50% 0%, rgba(239, 68, 68, 0.06), transparent 60%)",
                        }}
                      />

                      {/* Ban icon in corner */}
                      <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                        <Ban size={28} className="text-red-400" strokeWidth={1.5} />
                      </div>

                      {/* Number badge */}
                      <div className="absolute top-6 right-6 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                        <span className="font-[family-name:var(--font-display)] font-bold text-4xl text-white/10">
                          0{index + 1}
                        </span>
                      </div>

                      <div className="relative z-10 flex flex-col h-full">
                        {/* Icon container */}
                        <div
                          className="group-hover:scale-110 transition-transform duration-500"
                          style={{
                            width: 64,
                            height: 64,
                            borderRadius: 24,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.1))",
                            border: "1px solid rgba(239, 68, 68, 0.3)",
                            boxShadow: "0 8px 24px rgba(239, 68, 68, 0.2)",
                            marginBottom: "clamp(24px, 3vh, 32px)",
                          }}
                        >
                          <Icon size={26} className="text-red-400" strokeWidth={2} />
                        </div>

                        {/* Content */}
                        <h3 className="font-[family-name:var(--font-display)] font-bold text-2xl text-white leading-tight" style={{ marginBottom: "clamp(16px, 2vh, 20px)" }}>
                          {enemy.title}
                        </h3>

                        <p className="text-text-secondary text-[0.9375rem] leading-[1.7] flex-1">
                          {enemy.description}
                        </p>

                        {/* Bottom accent line */}
                        <div className="border-t border-white/5" style={{ marginTop: "clamp(24px, 3vh, 32px)", paddingTop: "clamp(20px, 2.5vh, 24px)" }}>
                          <div className="flex items-center gap-2 text-red-400/80 group-hover:text-red-400 transition-colors duration-300">
                            <span className="text-xs font-semibold uppercase tracking-wider">À éliminer</span>
                            <div className="flex-1 h-px bg-gradient-to-r from-red-400/20 to-transparent" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative bg-bg-primary overflow-hidden" style={{ paddingTop: "clamp(100px, 12vh, 140px)", paddingBottom: "clamp(100px, 12vh, 140px)" }}>
        <div className="absolute inset-0 grid-bg" />

        {/* Background gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.025]"
            style={{
              background: "radial-gradient(circle, #f97316, transparent 70%)",
              filter: "blur(120px)",
            }}
          />
        </div>

        <div className="relative z-10 w-full flex flex-col items-center px-8 md:px-16 lg:px-24">
          <div className="w-full" style={{ maxWidth: 1100 }}>
            {/* Section Header */}
            <div className="w-full flex flex-col items-center text-center" style={{ marginBottom: "clamp(64px, 10vh, 96px)" }}>
              <ScrollReveal className="w-full flex flex-col items-center">
                <div className="flex items-center justify-center gap-3" style={{ marginBottom: "clamp(20px, 3vh, 28px)" }}>
                  <div className="w-12 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(249, 115, 22, 0.5))" }} />
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent-primary">
                    Performance
                  </span>
                  <div className="w-12 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(249, 115, 22, 0.5))" }} />
                </div>
                <h2 className="font-[family-name:var(--font-display)] font-bold text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.03em] text-white text-center" style={{ marginBottom: "clamp(16px, 2.5vh, 24px)" }}>
                  En Chiffres
                </h2>
                <p className="text-text-secondary text-base lg:text-lg max-w-2xl mx-auto leading-relaxed text-center">
                  Les résultats qui parlent pour nous
                </p>
              </ScrollReveal>
            </div>

            {/* Stats Grid */}
            <StaggerChildren className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: "clamp(20px, 3vw, 32px)" }} stagger={0.1}>
              {[
                { value: 50, suffix: "+", label: "Projets livrés", icon: Layers, gradient: "from-orange-500 to-orange-600" },
                { value: 6, suffix: "+", label: "Plateformes maîtrisées", icon: Target, gradient: "from-orange-600 to-amber-500" },
                { value: 10, suffix: "M+", label: "MAD gérés en ads", icon: TrendingUp, gradient: "from-amber-500 to-orange-500" },
                { value: 100, suffix: "%", label: "Transparence", icon: Shield, gradient: "from-orange-500 to-orange-600" },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <StaggerItem key={stat.label}>
                    <motion.div
                      whileHover={{ y: -16 }}
                      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                      className="relative overflow-hidden group text-center cursor-pointer h-full flex flex-col"
                      style={{
                        padding: "clamp(40px, 6vw, 56px) clamp(28px, 4vw, 40px)",
                        borderRadius: 32,
                        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)",
                        backdropFilter: "blur(40px)",
                        WebkitBackdropFilter: "blur(40px)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      {/* Animated gradient border */}
                      <motion.div
                        className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100"
                        style={{
                          background: "linear-gradient(135deg, rgba(249, 115, 22, 0.3), rgba(251, 146, 60, 0.2), transparent)",
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

                      {/* Icon with sophisticated background */}
                      <div className="relative mx-auto" style={{ marginBottom: "clamp(24px, 3vh, 32px)" }}>
                        <motion.div
                          className="relative z-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                          style={{
                            width: 72,
                            height: 72,
                          }}
                        >
                          {/* Outer glow ring */}
                          <div
                            className="absolute inset-0 rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                              background: `linear-gradient(135deg, ${stat.gradient.includes('orange-500') ? '#f97316' : '#fb923c'}, ${stat.gradient.includes('amber-500') ? '#f59e0b' : '#fb923c'})`,
                              filter: "blur(20px)",
                            }}
                          />
                          {/* Icon container */}
                          <div
                            className={`relative w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br ${stat.gradient} shadow-2xl`}
                            style={{
                              boxShadow: "0 10px 40px rgba(249, 115, 22, 0.4)",
                            }}
                          >
                            <Icon size={32} className="text-white" strokeWidth={2} />
                          </div>
                        </motion.div>
                      </div>

                      {/* Number */}
                      <motion.div
                        className="relative"
                        style={{ marginBottom: "clamp(12px, 2vh, 16px)" }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="font-[family-name:var(--font-display)] font-bold text-white block leading-none" style={{ fontSize: "clamp(2.75rem, 6vw, 4rem)" }}>
                          <CounterAnimation target={stat.value} suffix={stat.suffix} />
                        </span>
                        {/* Gradient shimmer on number */}
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer"
                          style={{
                            backgroundSize: "200% 100%",
                          }}
                        />
                      </motion.div>

                      {/* Label */}
                      <span className="text-[0.8125rem] text-text-muted/90 font-semibold uppercase tracking-[0.1em] leading-tight">
                        {stat.label}
                      </span>

                      {/* Bottom accent */}
                      <div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
                        style={{
                          background: "linear-gradient(90deg, transparent, #f97316, transparent)",
                        }}
                      />
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-bg-primary" style={{ paddingTop: "clamp(120px, 14vh, 160px)", paddingBottom: "clamp(120px, 16vh, 180px)" }}>
        <FloatingOrbs variant="cta" />
        <div className="absolute inset-0 grid-bg" />

        {/* Enhanced ambient background */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-[0.06]"
            style={{
              background: "radial-gradient(circle, #f97316, transparent 65%)",
              filter: "blur(180px)",
            }}
          />
        </div>

        <div className="relative z-10 w-full flex flex-col items-center px-6 md:px-12 lg:px-16">
          <div className="w-full flex flex-col items-center text-center" style={{ maxWidth: 900 }}>
            <ScrollReveal className="w-full flex flex-col items-center">
              {/* Badge */}
              <div className="flex items-center justify-center gap-4" style={{ marginBottom: "clamp(32px, 4vh, 44px)" }}>
                <div className="w-16 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(249, 115, 22, 0.6))" }} />
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent-primary">
                  Prêt à démarrer ?
                </span>
                <div className="w-16 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(249, 115, 22, 0.6))" }} />
              </div>

              {/* Title */}
              <h2
                className="font-[family-name:var(--font-display)] font-bold leading-[1.08] tracking-[-0.03em] text-white w-full"
                style={{
                  fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
                  marginBottom: "clamp(24px, 3.5vh, 32px)"
                }}
              >
                Prêt à travailler avec une agence qui pense{" "}
                <span className="relative inline-block text-accent-primary">
                  différemment
                  <span
                    className="absolute bottom-1 left-0 w-full h-[3px] rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #f97316, #fb923c)",
                    }}
                  />
                </span>{" "}
                ?
              </h2>

              {/* Subtitle */}
              <p
                className="text-text-secondary text-lg lg:text-xl leading-[1.7] max-w-2xl mx-auto"
                style={{ marginBottom: "clamp(48px, 7vh, 64px)" }}
              >
                On ne convient pas à tout le monde. Mais si vous lisez encore,
                c&apos;est qu&apos;on pourrait bien être faits pour travailler ensemble.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <MagneticButton href="/contact" variant="primary" className="text-base px-10 py-4 min-w-[220px]">
                  Parlons de votre projet
                </MagneticButton>
                <MagneticButton href="/travaux" variant="ghost" className="text-base px-10 py-4 min-w-[220px]">
                  Voir nos réalisations
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
