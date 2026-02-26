"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const tools = [
  { name: "Meta Ads", logo: "/images/logos/meta.svg" },
  { name: "Google Ads", logo: "/images/logos/google.svg" },
  { name: "TikTok Ads", logo: "/images/logos/tiktok.svg" },
  { name: "Shopify", logo: "/images/logos/shopify.svg" },
  { name: "WordPress", logo: "/images/logos/wordpress.svg" },
  { name: "Figma", logo: "/images/logos/figma.svg" },
  { name: "Adobe Creative Cloud", logo: "/images/logos/adobe-creative-cloud.svg" },
  { name: "Google Analytics", logo: "/images/logos/google-analytics.svg" },
  { name: "Stripe", logo: "/images/logos/stripe.svg" },
];

function LogoCard({ tool }: { tool: (typeof tools)[number] }) {
  return (
    <div
      className="shrink-0 flex items-center justify-center rounded-2xl border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.08] hover:border-accent-primary/30 transition-all duration-400 group cursor-default"
      style={{ padding: "28px 48px", gap: 18 }}
    >
      <Image
        src={tool.logo}
        alt={tool.name}
        width={32}
        height={32}
        className="w-8 h-8 object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-400"
      />
      <span className="text-base font-medium text-white/70 group-hover:text-white transition-colors duration-400 whitespace-nowrap">
        {tool.name}
      </span>
    </div>
  );
}

export default function MarqueeSection() {
  const row = [...tools, ...tools, ...tools, ...tools];

  return (
    <section className="relative overflow-hidden" style={{ paddingTop: 56, paddingBottom: 56 }}>
      {/* Subtle top/bottom dividers */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px" style={{ width: "70%", background: "linear-gradient(to right, transparent, rgba(249,115,22,0.25), transparent)" }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px" style={{ width: "70%", background: "linear-gradient(to right, transparent, rgba(249,115,22,0.25), transparent)" }} />

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
        style={{ marginBottom: 36 }}
      >
        <p
          className="inline-block text-[0.8125rem] font-semibold uppercase tracking-[0.15em] text-transparent bg-clip-text relative"
          style={{
            background: "linear-gradient(90deg, #fdba74 0%, #f97316 35%, #fb923c 65%, #fdba74 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "0 0 30px rgba(249, 115, 22, 0.15)",
          }}
        >
          Propuls&eacute; par les meilleurs outils
        </p>
      </motion.div>

      {/* Marquee container */}
      <div className="relative">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 h-full z-10 pointer-events-none" style={{ width: 200, background: "linear-gradient(to right, var(--color-bg-primary), transparent)" }} />
        <div className="absolute right-0 top-0 h-full z-10 pointer-events-none" style={{ width: 200, background: "linear-gradient(to left, var(--color-bg-primary), transparent)" }} />

        {/* Track */}
        <div className="marquee-track flex items-center" style={{ gap: 24 }}>
          {row.map((tool, i) => (
            <LogoCard key={`${tool.name}-${i}`} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
