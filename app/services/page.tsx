"use client";

import { motion } from "framer-motion";
import PageTransition from "@/components/animations/PageTransition";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerChildren, { StaggerItem } from "@/components/animations/StaggerChildren";
import MagneticButton from "@/components/ui/MagneticButton";
import ServiceVisual from "@/components/ui/ServiceVisual";
import FloatingOrbs from "@/components/layout/FloatingOrbs";
import { services } from "@/lib/constants";
import { ArrowRight, Check, Layers } from "lucide-react";

const visualTypes = ["mediaBuying", "content", "webDev"] as const;

function ServiceSection({ service, index }: { service: typeof services[number]; index: number }) {
  const Icon = service.icon;
  const isReversed = index % 2 !== 0;

  return (
    <section className={`relative ${index % 2 === 0 ? "bg-bg-primary" : "bg-bg-secondary"}`} style={{ paddingTop: index === 0 ? 60 : 120, paddingBottom: 120 }}>
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center" style={{ gap: "clamp(60px, 8vw, 100px)" }}>
          {/* Text side */}
          <div className={isReversed ? "lg:order-2" : ""}>
            <ScrollReveal>
              <div
                className="inline-flex items-center gap-2.5 rounded-full border relative overflow-hidden group"
                style={{
                  padding: "10px 20px",
                  background: "linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(251, 146, 60, 0.04) 100%)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(249, 115, 22, 0.2)",
                  marginBottom: 32,
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.15), transparent 70%)",
                  }}
                />
                <Icon size={16} className="text-accent-primary relative z-10" strokeWidth={2} />
                <span className="text-xs font-semibold text-white/80 relative z-10 tracking-wider">
                  {String(index + 1).padStart(2, "0")} / Service
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2
                className="font-[family-name:var(--font-display)] font-bold text-white leading-[1.05] tracking-[-0.03em]"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  marginBottom: 24,
                }}
              >
                {service.title}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p
                className="text-text-secondary leading-[1.75]"
                style={{
                  fontSize: "1.125rem",
                  marginBottom: 48,
                }}
              >
                {service.description}
              </p>
            </ScrollReveal>

            <StaggerChildren className="space-y-8" stagger={0.1} delayStart={0.3}>
              {"platforms" in service && service.platforms && (
                <StaggerItem>
                  <h4
                    className="font-semibold uppercase tracking-[0.12em] text-white/60"
                    style={{ fontSize: "0.8125rem", marginBottom: 28 }}
                  >
                    Plateformes
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {service.platforms.map((p: string) => (
                      <span
                        key={p}
                        className="relative group overflow-hidden"
                        style={{
                          padding: "10px 18px",
                          borderRadius: 12,
                          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)",
                          backdropFilter: "blur(12px)",
                          WebkitBackdropFilter: "blur(12px)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          fontSize: "0.8125rem",
                          fontWeight: 500,
                          color: "rgba(255, 255, 255, 0.85)",
                          transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
                        }}
                      >
                        <span className="relative z-10">{p}</span>
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: "linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(251, 146, 60, 0.1))",
                          }}
                        />
                      </span>
                    ))}
                  </div>
                </StaggerItem>
              )}
              {"formats" in service && service.formats && (
                <StaggerItem>
                  <h4
                    className="font-semibold uppercase tracking-[0.12em] text-white/60"
                    style={{ fontSize: "0.8125rem", marginBottom: 28 }}
                  >
                    Formats
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {service.formats.map((f: string) => (
                      <span
                        key={f}
                        className="relative group overflow-hidden"
                        style={{
                          padding: "10px 18px",
                          borderRadius: 12,
                          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)",
                          backdropFilter: "blur(12px)",
                          WebkitBackdropFilter: "blur(12px)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          fontSize: "0.8125rem",
                          fontWeight: 500,
                          color: "rgba(255, 255, 255, 0.85)",
                          transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
                        }}
                      >
                        <span className="relative z-10">{f}</span>
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: "linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(251, 146, 60, 0.1))",
                          }}
                        />
                      </span>
                    ))}
                  </div>
                </StaggerItem>
              )}
              {"types" in service && service.types && (
                <StaggerItem>
                  <h4
                    className="font-semibold uppercase tracking-[0.12em] text-white/60"
                    style={{ fontSize: "0.8125rem", marginTop: 24, marginBottom: 28 }}
                  >
                    Types de projets
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {service.types.map((t: string) => (
                      <span
                        key={t}
                        className="relative group overflow-hidden"
                        style={{
                          padding: "10px 18px",
                          borderRadius: 12,
                          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)",
                          backdropFilter: "blur(12px)",
                          WebkitBackdropFilter: "blur(12px)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          fontSize: "0.8125rem",
                          fontWeight: 500,
                          color: "rgba(255, 255, 255, 0.85)",
                          transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
                        }}
                      >
                        <span className="relative z-10">{t}</span>
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: "linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(251, 146, 60, 0.1))",
                          }}
                        />
                      </span>
                    ))}
                  </div>
                </StaggerItem>
              )}
              <StaggerItem>
                <h4
                  className="font-semibold uppercase tracking-[0.12em] text-white/60"
                  style={{ fontSize: "0.8125rem", marginTop: 40, marginBottom: 28 }}
                >
                  Ce qui est inclus
                </h4>
                <ul className="space-y-4">
                  {service.includes.map((item: string) => (
                    <li key={item} className="flex items-start gap-3.5 group">
                      <div
                        className="shrink-0 rounded-lg flex items-center justify-center transition-all duration-300"
                        style={{
                          width: 24,
                          height: 24,
                          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.08))",
                          border: "1px solid rgba(16, 185, 129, 0.3)",
                        }}
                      >
                        <Check size={14} className="text-[#10B981]" strokeWidth={2.5} />
                      </div>
                      <span
                        className="text-text-secondary group-hover:text-white/90 transition-colors duration-300 leading-relaxed pt-0.5"
                        style={{ fontSize: "0.9375rem" }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            </StaggerChildren>
          </div>

          {/* Visual side */}
          <div className={isReversed ? "lg:order-1" : ""}>
            <ScrollReveal delay={0.2}>
              <ServiceVisual type={visualTypes[index]} />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <FloatingOrbs variant="hero" />
        <div className="absolute inset-0 grid-bg" />
        <div className="relative z-10 w-full flex flex-col items-center px-8 md:px-16 lg:px-24" style={{ paddingTop: "clamp(100px, 12vh, 140px)", paddingBottom: "clamp(40px, 6vh, 60px)" }}>
          <div className="flex flex-col items-center text-center" style={{ maxWidth: 900 }}>
            <ScrollReveal delay={0.3}>
              <h1 className="font-[family-name:var(--font-display)] font-bold text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-[-0.03em] text-center" style={{ marginBottom: "clamp(20px, 3vh, 28px)" }}>
                Ce Qu&apos;on{" "}
                <span className="relative inline-block text-accent-primary">
                  Construit
                  <span
                    className="absolute bottom-1 left-0 w-full h-[3px] rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #f97316, #fb923c)",
                    }}
                  />
                </span>{" "}
                Pour{" "}
                <span className="relative inline-block text-accent-primary">
                  Vous
                  <span
                    className="absolute bottom-1 left-0 w-full h-[3px] rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #f97316, #fb923c)",
                    }}
                  />
                </span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.8}>
              <p className="text-[1.0625rem] lg:text-xl text-text-secondary max-w-2xl leading-[1.7] text-center mx-auto">
                Trois piliers interconnect&eacute;s. Un seul objectif : transformer votre
                pr&eacute;sence digitale en machine de croissance.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Service Sections */}
      {services.map((service, index) => (
        <ServiceSection key={service.title} service={service} index={index} />
      ))}

      {/* Integration Section */}
      <section className="relative bg-bg-secondary overflow-hidden" style={{ paddingTop: 100, paddingBottom: 100 }}>
        <div className="absolute inset-0 grid-bg" />

        {/* Background ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full opacity-[0.03]"
            style={{
              background: "radial-gradient(circle, #f97316, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
          <div
            className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full opacity-[0.03]"
            style={{
              background: "radial-gradient(circle, #fb923c, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
        </div>

        <div className="relative z-10 container-site">
          <ScrollReveal className="text-center" style={{ marginBottom: 64 }}>
            <div
              className="inline-flex items-center gap-2.5 rounded-full border relative overflow-hidden group mx-auto"
              style={{
                padding: "10px 20px",
                background: "linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(251, 146, 60, 0.04) 100%)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(249, 115, 22, 0.2)",
                marginBottom: 32,
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.15), transparent 70%)",
                }}
              />
              <Layers size={16} className="text-accent-primary relative z-10" strokeWidth={2} />
              <span className="text-xs font-semibold text-white/80 relative z-10 tracking-wider">
                L&apos;avantage Reachflow
              </span>
            </div>
            <h2
              className="font-[family-name:var(--font-display)] font-bold text-white leading-[1.05] tracking-[-0.03em] text-center"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3rem)",
                marginBottom: 20,
              }}
            >
              Le Pouvoir de l&apos;Int&eacute;gration
            </h2>
            <p
              className="text-text-secondary leading-[1.75] mx-auto text-center"
              style={{
                fontSize: "1.125rem",
                maxWidth: 680,
                textAlign: "center",
              }}
            >
              Quand une seule &eacute;quipe ma&icirc;trise le site, le contenu, et la diffusion, tout s&apos;aligne.
            </p>
          </ScrollReveal>

          <StaggerChildren
            className="grid grid-cols-1 md:grid-cols-3 items-stretch"
            style={{ gap: "clamp(16px, 2vw, 24px)", maxWidth: 1200, margin: "0 auto" }}
            stagger={0.15}
          >
            {[
              { from: "Développement Web", to: "Media Buying", text: "Le pixel marche parce qu'on a construit le site." },
              { from: "Production", to: "Média Buying", text: "La pub performe parce qu'on a tourné la vidéo." },
              { from: "Stratégie", to: "Exécution", text: "Le funnel convertit parce qu'on contrôle chaque étape." },
            ].map((item, index) => (
              <StaggerItem key={item.text} className="flex">
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="relative h-full w-full overflow-hidden group"
                  style={{
                    padding: "40px 28px 36px",
                    borderRadius: 24,
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                  }}
                >
                  {/* Top gradient bar */}
                  <div
                    className="absolute top-0 left-0 right-0 transition-opacity duration-500 overflow-hidden"
                    style={{
                      height: 2,
                      borderTopLeftRadius: 24,
                      borderTopRightRadius: 24,
                    }}
                  >
                    <div
                      className="w-full h-full"
                      style={{
                        background: `linear-gradient(90deg, #f97316, #fb923c, transparent)`,
                        opacity: 0.7,
                      }}
                    />
                  </div>
                  <div
                    className="absolute top-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden"
                    style={{
                      height: 2,
                      borderTopLeftRadius: 24,
                      borderTopRightRadius: 24,
                    }}
                  >
                    <div
                      className="w-full h-full"
                      style={{
                        background: `linear-gradient(90deg, #f97316, #fb923c, transparent)`,
                        filter: "blur(3px)",
                      }}
                    />
                  </div>

                  {/* Mesh gradient background overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      borderRadius: 24,
                      background: `radial-gradient(circle at 30% 20%, #f9731608, transparent 50%),
                                   radial-gradient(circle at 70% 80%, #fb923c06, transparent 50%)`,
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center h-full">
                    {/* From → To */}
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <span
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{
                          color: "rgba(249, 115, 22, 0.9)",
                          textShadow: "0 0 20px rgba(249, 115, 22, 0.3)",
                        }}
                      >
                        {item.from}
                      </span>
                      <ArrowRight size={14} className="text-accent-primary" strokeWidth={2.5} />
                      <span
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{
                          color: "rgba(251, 146, 60, 0.9)",
                          textShadow: "0 0 20px rgba(251, 146, 60, 0.3)",
                        }}
                      >
                        {item.to}
                      </span>
                    </div>

                    {/* Description */}
                    <p
                      className="text-text-secondary/90 leading-relaxed flex-1 mx-auto"
                      style={{
                        fontSize: "0.9375rem",
                        lineHeight: 1.7,
                        maxWidth: 260,
                      }}
                    >
                      {item.text}
                    </p>
                  </div>

                  {/* Bottom shine effect */}
                  <div
                    className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden"
                    style={{
                      height: 1,
                      borderBottomLeftRadius: 24,
                      borderBottomRightRadius: 24,
                    }}
                  >
                    <div
                      className="w-full h-full"
                      style={{
                        background: `linear-gradient(90deg, transparent, #fb923c40, transparent)`,
                      }}
                    />
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden">
        <FloatingOrbs variant="cta" />
        <div className="absolute inset-0 grid-bg" />

        <div className="relative z-10 w-full flex flex-col items-center px-8 md:px-16 lg:px-24">
          <div className="flex flex-col items-center text-center" style={{ maxWidth: 600 }}>
            <ScrollReveal>
              <div className="flex flex-col items-center text-center">
                <h2 className="font-[family-name:var(--font-display)] font-bold text-[clamp(1.75rem,4vw,3rem)] leading-[1.1] tracking-[-0.03em]" style={{ marginBottom: 24 }}>
                  Quel service vous correspond ?
                </h2>
                <p className="text-text-secondary text-[0.9375rem] leading-[1.7] max-w-md" style={{ marginBottom: 48 }}>
                  Discutons de vos objectifs. On vous propose la combinaison id&eacute;ale.
                </p>
                <MagneticButton href="/contact" variant="primary">
                  Parlons de votre projet
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
