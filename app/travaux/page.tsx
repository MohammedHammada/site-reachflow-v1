"use client";

import PageTransition from "@/components/animations/PageTransition";
import ScrollReveal from "@/components/animations/ScrollReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import FloatingOrbs from "@/components/layout/FloatingOrbs";
import Image from "next/image";

const projects = [
  {
    number: "01",
    badge: "Strategic Retail Protocol",
    type: "CONCEPT",
    typeColor: "muted",
    title: "MARJANE GROUP",
    logo: "/images/clients/marjane.png",
    mission:
      "Analyse et optimisation de l\u2019architecture \u00abGrocery Online\u00bb pour le leader national. Objectif : R\u00e9duire la friction mobile et maximiser le panier moyen.",
    metrics: [
      { value: "+25%", label: "Conversion Rate Target (Mobile)" },
      { value: "4.2x", label: "ROAS Campagnes Saisonni\u00e8res" },
      { value: "UGC", label: "Creative Matrix Int\u00e9gr\u00e9e" },
    ],
    watermark: "MARJANE",
  },
  {
    number: "02",
    badge: "Executed Strategy",
    type: "REAL PROJECT",
    typeColor: "green",
    title: "SCHOLAR ORIENTATION",
    logo: "/images/clients/scholar.svg",
    mission:
      "D\u00e9ploiement complet d\u2019un syst\u00e8me d\u2019acquisition pour un bureau d\u2019orientation leader. De la publicit\u00e9 Meta jusqu\u2019au closing t\u00e9l\u00e9phonique.",
    metrics: [
      { value: "200K MAD", label: "Pipeline G\u00e9n\u00e9r\u00e9 en 90 Jours" },
      { value: "35%", label: "Closing Rate (Lead Quality Protocol)" },
      { value: "Succ\u00e8s", label: "Projet Livr\u00e9 & Actif", isGreen: true },
    ],
    watermark: "SCHOLAR",
  },
  {
    number: "03",
    badge: "Massive Acquisition System",
    type: "CONCEPT",
    typeColor: "muted",
    title: "INWI",
    logo: "/images/clients/inwi.png",
    mission:
      "Mod\u00e9lisation d\u2019un tunnel omnicanal (Fibre & Mobile) capable de g\u00e9rer des volumes massifs tout en maintenant un co\u00fbt d\u2019acquisition stable.",
    metrics: [
      { value: "-40%", label: "Cost Per Lead Target" },
      { value: "10K+", label: "Leads/Mois Architecture" },
      { value: "VSL", label: "Qualification Psychologique Auto" },
    ],
    watermark: "inwi",
  },
  {
    number: "04",
    badge: "Institutional Authority 3.0",
    type: "CONCEPT",
    typeColor: "muted",
    title: "OCP GROUP",
    logo: "/images/clients/ocp.webp",
    mission:
      "Conception d\u2019une interface vitrine en \u00abObsidian Glass\u00bb utilisant Next.js et la 3D pour projeter l\u2019autorit\u00e9 industrielle du groupe \u00e0 l\u2019\u00e9chelle mondiale.",
    metrics: [
      { value: "0.4s", label: "Loading Time (Elite Performance)" },
      { value: "3D", label: "Navigation & Micro-interactions" },
      { value: "F500", label: "Standard Fortune 500 Align\u00e9" },
    ],
    watermark: "OCP",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <div className="card-hover relative overflow-hidden group cursor-default h-full" style={{ padding: "clamp(32px, 5vw, 56px)" }}>
        {/* Background number */}
        <span
          className="absolute font-[family-name:var(--font-display)] font-bold leading-none select-none pointer-events-none"
          style={{
            fontSize: "clamp(5rem, 10vw, 8rem)",
            color: "rgba(249, 115, 22, 0.05)",
            top: "-10px",
            right: "20px",
          }}
        >
          {project.number}
        </span>

        {/* Watermark */}
        <span
          className="absolute font-[family-name:var(--font-display)] font-bold leading-none select-none pointer-events-none opacity-[0.02] text-white"
          style={{
            fontSize: "clamp(3rem, 6vw, 5rem)",
            bottom: "10px",
            left: "20px",
          }}
        >
          {project.watermark}
        </span>

        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
          {/* Left side: Logo */}
          <div className="shrink-0">
            <div
              className="rounded-2xl overflow-hidden flex items-center justify-center"
              style={{
                width: "clamp(100px, 15vw, 150px)",
                height: "clamp(100px, 15vw, 150px)",
                background: "white",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                padding: "clamp(12px, 2vw, 20px)",
              }}
            >
              <Image
                src={project.logo}
                alt={project.title}
                width={150}
                height={150}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Right side: Content */}
          <div className="flex-1">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="tag-pill text-xs">{project.badge}</span>
              <span
                className={`text-[0.6875rem] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-md ${
                  project.typeColor === "green"
                    ? "bg-[rgba(16,185,129,0.1)] text-[#10B981] border border-[rgba(16,185,129,0.2)]"
                    : "bg-white/[0.04] text-text-muted border border-border-subtle"
                }`}
              >
                {project.type}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-[family-name:var(--font-display)] font-bold text-[clamp(1.75rem,3vw,2.5rem)] tracking-[-0.02em] text-white mb-4">
              {project.title}
            </h3>

            {/* Mission */}
            <p
              className="text-text-secondary text-[0.9375rem] leading-[1.7] max-w-2xl"
              style={{ marginBottom: "clamp(28px, 4vh, 36px)" }}
            >
              {project.mission}
            </p>

            {/* Metrics */}
            <div
              className="border-t border-border-subtle"
              style={{ paddingTop: "clamp(24px, 3.5vh, 32px)" }}
            >
              <div className="grid grid-cols-3 gap-6">
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <span
                      className={`font-[family-name:var(--font-display)] font-bold text-xl lg:text-2xl leading-none block mb-2 ${
                        metric.isGreen ? "text-[#10B981]" : "text-white"
                      }`}
                    >
                      {metric.value}
                    </span>
                    <span className="text-text-muted text-[0.75rem] leading-snug block">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function TravauxPage() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden" style={{ paddingTop: "clamp(80px, 12vh, 120px)", paddingBottom: "clamp(60px, 10vh, 100px)" }}>
        <FloatingOrbs variant="hero" />
        <div className="absolute inset-0 grid-bg" />

        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center top, rgba(249, 115, 22, 0.15), transparent 50%)",
          }}
        />

        <div className="relative z-10 w-full flex flex-col items-center justify-center" style={{ paddingLeft: "clamp(24px, 8vw, 100px)", paddingRight: "clamp(24px, 8vw, 100px)" }}>
          <div className="flex flex-col items-center text-center" style={{ maxWidth: 900 }}>
            {/* Badge */}
            <ScrollReveal>
              <div className="relative inline-flex items-center gap-2" style={{ marginBottom: 20 }}>
                <div
                  className="w-8 h-px"
                  style={{
                    background: "linear-gradient(to right, transparent, rgba(249, 115, 22, 0.6))",
                  }}
                />
                <span
                  className="text-[0.6875rem] font-medium uppercase tracking-[0.2em]"
                  style={{
                    color: "rgba(249, 115, 22, 0.9)",
                    letterSpacing: "0.2em",
                  }}
                >
                  Works
                </span>
                <div
                  className="w-8 h-px"
                  style={{
                    background: "linear-gradient(to left, transparent, rgba(249, 115, 22, 0.6))",
                  }}
                />
              </div>
            </ScrollReveal>

            {/* Decorative line top */}
            <div className="w-full max-w-md overflow-hidden" style={{ marginBottom: 28 }}>
              <div
                className="h-px"
                style={{
                  background: "linear-gradient(to right, transparent, rgba(249, 115, 22, 0.5), transparent)",
                }}
              />
            </div>

            {/* Title */}
            <ScrollReveal delay={0.3}>
              <h1
                className="font-[family-name:var(--font-display)] font-bold text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.08] tracking-[-0.03em] text-center"
                style={{ marginBottom: 20 }}
              >
                Strat&eacute;gies{" "}
                <span className="relative inline-block text-accent-primary">
                  D&eacute;ploy&eacute;es
                  <span
                    className="absolute bottom-1 left-0 w-full h-[3px] rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #f97316, #fb923c)",
                    }}
                  />
                </span>{" "}
                &amp; Concepts{" "}
                <span className="relative inline-block text-accent-primary">
                  Visionnaires
                  <span
                    className="absolute bottom-1 left-0 w-full h-[3px] rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #f97316, #fb923c)",
                    }}
                  />
                </span>
              </h1>
            </ScrollReveal>

            {/* Description */}
            <ScrollReveal delay={0.8}>
              <p
                className="text-text-secondary text-[1.0625rem] leading-[1.75] text-center"
                style={{ maxWidth: 680 }}
              >
                Une s&eacute;lection de campagnes ex&eacute;cut&eacute;es et d&apos;&eacute;tudes
                strat&eacute;giques pour les secteurs les plus comp&eacute;titifs du Maroc.
              </p>
            </ScrollReveal>

            {/* Decorative line bottom */}
            <div className="w-full max-w-md overflow-hidden" style={{ marginTop: 28 }}>
              <div
                className="h-px"
                style={{
                  background: "linear-gradient(to right, transparent, rgba(249, 115, 22, 0.3), transparent)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pt-4 pb-[clamp(60px,10vw,120px)] relative bg-bg-primary">
        <div className="w-full flex flex-col items-center px-8 md:px-16 lg:px-24">
          <div className="w-full" style={{ maxWidth: 1200 }}>
            <div className="grid grid-cols-1 gap-6">
              {projects.map((project, index) => (
                <ProjectCard key={project.number} project={project} index={index} />
              ))}
            </div>

            <div className="flex justify-center w-full" style={{ marginTop: 80 }}>
              <p
                className="text-[0.8125rem] text-text-muted/70 text-center leading-[1.8]"
                style={{
                  maxWidth: 700,
                  letterSpacing: "0.01em",
                }}
              >
                Les projets marqu&eacute;s &laquo;Concept&raquo; sont des &eacute;tudes
                strat&eacute;giques R&amp;D. Les projets marqu&eacute;s &laquo;Real Project&raquo;
                sont des campagnes ex&eacute;cut&eacute;es avec des r&eacute;sultats v&eacute;rifiables.
              </p>
            </div>
          </div>
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
                  Votre march&eacute; m&eacute;rite une strat&eacute;gie sur mesure.
                </h2>
                <p className="text-text-secondary text-[0.9375rem] leading-[1.7] max-w-md" style={{ marginBottom: 48 }}>
                  Chaque projet commence par une conversation. Parlons de vos ambitions.
                </p>
                <MagneticButton href="/contact" variant="primary">
                  Discutons de votre projet
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
