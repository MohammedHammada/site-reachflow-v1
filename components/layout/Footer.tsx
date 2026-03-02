import Link from "next/link";
import { siteConfig, navLinks, services } from "@/lib/constants";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import TrustpilotWidget from "@/components/layout/TrustpilotWidget";

export default function Footer() {
  return (
    <footer className="bg-bg-secondary">
      <div className="w-full px-8 lg:px-16" style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Main footer content */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10"
          style={{ paddingTop: 64, paddingBottom: 64 }}
        >
          {/* Brand + contact email */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block" style={{ marginBottom: 24 }}>
              <span className="text-2xl font-bold font-[family-name:var(--font-display)] tracking-[-0.02em]">
                Reach<span className="text-gradient">flow</span>
              </span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed" style={{ marginBottom: 20 }}>
              Agence de croissance digitale Full-Cycle.
              L&agrave; o&ugrave; la performance et l&rsquo;esth&eacute;tique convergent.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm text-text-secondary hover:text-white transition-colors duration-300"
            >
              {siteConfig.email}
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="font-[family-name:var(--font-display)] font-semibold text-white text-base"
              style={{ marginBottom: 20 }}
            >
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3
              className="font-[family-name:var(--font-display)] font-semibold text-white text-base"
              style={{ marginBottom: 20 }}
            >
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.title}>
                  <Link
                    href="/services"
                    className="text-sm text-text-secondary hover:text-white transition-colors duration-300"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="font-[family-name:var(--font-display)] font-semibold text-white text-base"
              style={{ marginBottom: 20 }}
            >
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="text-sm text-text-secondary hover:text-white transition-colors duration-300"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="text-sm text-text-secondary">{siteConfig.location}</li>
            </ul>
            {/* Social icons */}
            <div className="flex items-center gap-4" style={{ marginTop: 24 }}>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group relative"
              >
                <div className="relative z-10 w-11 h-11 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  {/* Outer glow ring */}
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "linear-gradient(135deg, #f97316, #fb923c)",
                      filter: "blur(12px)",
                    }}
                  />
                  {/* Icon container */}
                  <div className="relative w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-orange-600 group-hover:border-transparent transition-all duration-500">
                    <Instagram size={17} className="text-text-muted group-hover:text-white transition-colors duration-500" strokeWidth={2} />
                  </div>
                </div>
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="group relative"
              >
                <div className="relative z-10 w-11 h-11 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  {/* Outer glow ring */}
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "linear-gradient(135deg, #fb923c, #fdba74)",
                      filter: "blur(12px)",
                    }}
                  />
                  {/* Icon container */}
                  <div className="relative w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br from-orange-600/10 to-amber-500/5 border border-orange-600/20 group-hover:bg-gradient-to-br group-hover:from-orange-600 group-hover:to-amber-500 group-hover:border-transparent transition-all duration-500">
                    <Facebook size={17} className="text-text-muted group-hover:text-white transition-colors duration-500" strokeWidth={2} />
                  </div>
                </div>
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group relative"
              >
                <div className="relative z-10 w-11 h-11 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  {/* Outer glow ring */}
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "linear-gradient(135deg, #ea580c, #f97316)",
                      filter: "blur(12px)",
                    }}
                  />
                  {/* Icon container */}
                  <div className="relative w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br from-orange-600/10 via-orange-500/8 to-orange-600/5 border border-orange-600/20 group-hover:bg-gradient-to-br group-hover:from-orange-600 group-hover:via-orange-500 group-hover:to-orange-600 group-hover:border-transparent transition-all duration-500">
                    <Linkedin size={17} className="text-text-muted group-hover:text-white transition-colors duration-500" strokeWidth={2} />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div
          style={{
            paddingTop: 48,
            paddingBottom: 48,
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 20,
              padding: "40px 36px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 8,
            }}
          >
            {/* Tag */}
            <span
              style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#f97316",
                marginBottom: 4,
              }}
            >
              Newsletter
            </span>

            {/* Title */}
            <h3
              className="font-[family-name:var(--font-display)]"
              style={{
                fontSize: "1.375rem",
                fontWeight: 700,
                color: "#FAFAFA",
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              Restez dans la boucle
            </h3>

            {/* Description */}
            <p
              style={{
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.5)",
                maxWidth: 380,
                lineHeight: 1.6,
                margin: 0,
                marginBottom: 16,
              }}
            >
              Conseils growth, tendances digitales et insights &mdash; directement dans votre boîte.
            </p>

            {/* Form */}
            <form
              action="#"
              style={{
                display: "flex",
                width: "100%",
                maxWidth: 420,
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(9, 9, 11, 0.6)",
              }}
            >
              <input
                type="email"
                placeholder="votre@email.com"
                required
                style={{
                  flex: 1,
                  height: 48,
                  padding: "0 18px",
                  fontSize: "0.875rem",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#FAFAFA",
                  minWidth: 0,
                }}
              />
              <button
                type="submit"
                className="hover:bg-orange-700"
                style={{
                  height: 48,
                  padding: "0 24px",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  background: "#f97316",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "background 0.2s ease",
                }}
              >
                S&apos;inscrire
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border-subtle" />

        {/* Trustpilot Review Collector */}
        <TrustpilotWidget />

        {/* Divider */}
        <div className="border-t border-border-subtle" />

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ paddingTop: 24, paddingBottom: 24 }}
        >
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Reachflow. Tous droits r&eacute;serv&eacute;s.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/mentions-legales" className="text-xs text-text-muted hover:text-white transition-colors duration-300">
              Mentions l&eacute;gales
            </Link>
            <Link href="/politique-de-confidentialite" className="text-xs text-text-muted hover:text-white transition-colors duration-300">
              Confidentialit&eacute;
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
