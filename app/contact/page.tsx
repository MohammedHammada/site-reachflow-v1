"use client";

import { useState } from "react";
import PageTransition from "@/components/animations/PageTransition";
import ScrollReveal from "@/components/animations/ScrollReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import FloatingOrbs from "@/components/layout/FloatingOrbs";
import { siteConfig } from "@/lib/constants";
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", company: "", service: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setError(true);
      setTimeout(() => setError(false), 4000);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputStyles =
    "w-full text-[0.9375rem] text-white placeholder:text-text-muted/70 focus:outline-none transition-all duration-500";

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative flex items-center overflow-hidden bg-bg-primary" style={{ paddingTop: "clamp(140px, 18vh, 180px)", paddingBottom: "clamp(40px, 5vh, 56px)" }}>
        <FloatingOrbs variant="hero" />
        <div className="absolute inset-0 grid-bg" />

        {/* Enhanced ambient background */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.04]"
            style={{
              background: "radial-gradient(circle, #f97316, transparent 70%)",
              filter: "blur(120px)",
            }}
          />
        </div>

        <div className="relative z-10 w-full flex flex-col items-center px-6 md:px-12 lg:px-16">
          <div className="w-full flex flex-col items-center text-center" style={{ maxWidth: 900 }}>
            <ScrollReveal className="w-full flex flex-col items-center">
              {/* Badge */}
              <div className="flex items-center justify-center gap-4" style={{ marginBottom: "clamp(28px, 3.5vh, 36px)" }}>
                <div className="w-12 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(249, 115, 22, 0.5))" }} />
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent-primary">
                  Contactez-nous
                </span>
                <div className="w-12 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(249, 115, 22, 0.5))" }} />
              </div>

              <h1 className="font-[family-name:var(--font-display)] font-bold leading-[1.05] tracking-[-0.03em] mb-6 w-full" style={{ fontSize: "clamp(2.5rem,5.5vw,4rem)" }}>
                Parlons de{" "}
                <span className="relative inline-block text-accent-primary">
                  Votre Projet
                  <span
                    className="absolute bottom-1 left-0 w-full h-[3px] rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #f97316, #fb923c)",
                    }}
                  />
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-text-secondary max-w-2xl leading-[1.7]">
                Chaque grande collaboration commence par une conversation.
                Dites-nous où vous en êtes, on vous dit où on peut vous amener.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="relative bg-bg-secondary overflow-hidden" style={{ paddingTop: "clamp(60px, 8vh, 80px)", paddingBottom: "clamp(80px, 10vh, 120px)" }}>
        <div className="absolute inset-0 grid-bg" />

        {/* Background ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.03]"
            style={{
              background: "radial-gradient(circle, #f97316, transparent 70%)",
              filter: "blur(100px)",
            }}
          />
          <div
            className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.03]"
            style={{
              background: "radial-gradient(circle, #fb923c, transparent 70%)",
              filter: "blur(100px)",
            }}
          />
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-16" style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-5 items-start" style={{ gap: "clamp(40px, 5vw, 60px)" }}>
            {/* Left — Info */}
            <ScrollReveal className="lg:col-span-2 h-full">
              <div
                className="relative overflow-hidden h-full"
                style={{
                  padding: "clamp(40px, 5vw, 56px)",
                  borderRadius: 32,
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)",
                  backdropFilter: "blur(40px)",
                  WebkitBackdropFilter: "blur(40px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                }}
              >
                {/* Top gradient line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] opacity-70"
                  style={{
                    background: "linear-gradient(90deg, #f97316, #fb923c, #fdba74, #fb923c, #f97316)",
                    backgroundSize: "200% 100%",
                  }}
                />

                {/* Background glow */}
                <div
                  className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full opacity-[0.03] pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, #f97316, transparent 70%)",
                    filter: "blur(60px)",
                  }}
                />

                <div style={{ display: "flex", flexDirection: "column", gap: "clamp(40px, 6vh, 56px)", position: "relative", zIndex: 10 }}>
                  {/* Header */}
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(249, 115, 22, 0.4))" }} />
                      <span className="text-[0.6875rem] font-bold uppercase tracking-[0.25em] text-accent-primary">
                        Contact
                      </span>
                    </div>
                    <h2 className="font-[family-name:var(--font-display)] font-bold text-white mb-5" style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.5rem)", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
                      Restons en{" "}
                      <span className="text-gradient">contact</span>
                    </h2>
                    <p className="text-text-secondary leading-[1.75] text-base max-w-lg">
                      Que vous ayez un projet précis en tête ou que vous cherchiez à structurer votre présence digitale, on est là pour en discuter. Sans engagement, sans jargon.
                    </p>
                  </div>

                  {/* Contact Methods */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "clamp(24px, 4vh, 32px)" }}>
                    <a href={`mailto:${siteConfig.email}`} className="group">
                      <div
                        className="relative overflow-hidden transition-all duration-500"
                        style={{
                          padding: "clamp(20px, 3vw, 28px)",
                          borderRadius: 20,
                          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)",
                          border: "1px solid rgba(255, 255, 255, 0.05)",
                        }}
                      >
                        {/* Top line */}
                        <div
                          className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: "linear-gradient(90deg, #f97316, #fb923c, transparent)",
                          }}
                        />

                        <div className="flex items-center gap-5">
                          <div className="relative flex-shrink-0">
                            <div className="relative z-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500" style={{ width: 56, height: 56 }}>
                              {/* Outer glow ring */}
                              <div
                                className="absolute inset-0 rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                  background: "linear-gradient(135deg, #f97316, #fb923c)",
                                  filter: "blur(16px)",
                                }}
                              />
                              {/* Icon container */}
                              <div
                                className="relative w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 shadow-2xl"
                                style={{
                                  boxShadow: "0 10px 36px rgba(249, 115, 22, 0.5)",
                                }}
                              >
                                <Mail size={22} className="text-white" strokeWidth={2} />
                              </div>
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-[0.6875rem] text-text-muted mb-1.5 font-bold uppercase tracking-[0.15em]">Email</p>
                            <p className="text-[0.9375rem] text-white font-semibold group-hover:text-accent-primary transition-colors duration-300">{siteConfig.email}</p>
                          </div>
                        </div>
                      </div>
                    </a>

                    <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="group">
                      <div
                        className="relative overflow-hidden transition-all duration-500"
                        style={{
                          padding: "clamp(20px, 3vw, 28px)",
                          borderRadius: 20,
                          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)",
                          border: "1px solid rgba(255, 255, 255, 0.05)",
                        }}
                      >
                        {/* Top line */}
                        <div
                          className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: "linear-gradient(90deg, #fb923c, #fdba74, transparent)",
                          }}
                        />

                        <div className="flex items-center gap-5">
                          <div className="relative flex-shrink-0">
                            <div className="relative z-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500" style={{ width: 56, height: 56 }}>
                              {/* Outer glow ring */}
                              <div
                                className="absolute inset-0 rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                  background: "linear-gradient(135deg, #fb923c, #fdba74)",
                                  filter: "blur(16px)",
                                }}
                              />
                              {/* Icon container */}
                              <div
                                className="relative w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br from-orange-600 to-amber-500 shadow-2xl"
                                style={{
                                  boxShadow: "0 10px 36px rgba(251, 146, 60, 0.5)",
                                }}
                              >
                                <Phone size={22} className="text-white" strokeWidth={2} />
                              </div>
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-[0.6875rem] text-text-muted mb-1.5 font-bold uppercase tracking-[0.15em]">Téléphone</p>
                            <p className="text-[0.9375rem] text-white font-semibold group-hover:text-accent-primary transition-colors duration-300">{siteConfig.phone}</p>
                          </div>
                        </div>
                      </div>
                    </a>

                    <div
                      className="relative overflow-hidden"
                      style={{
                        padding: "clamp(20px, 3vw, 28px)",
                        borderRadius: 20,
                        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                      }}
                    >
                      <div className="flex items-center gap-5">
                        <div className="relative flex-shrink-0">
                          <div className="relative z-10 flex items-center justify-center" style={{ width: 56, height: 56 }}>
                            {/* Outer glow ring */}
                            <div
                              className="absolute inset-0 rounded-full opacity-35"
                              style={{
                                background: "linear-gradient(135deg, #f97316, #fb923c)",
                                filter: "blur(16px)",
                              }}
                            />
                            {/* Icon container */}
                            <div
                              className="relative w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br from-orange-600 via-orange-500 to-orange-600 shadow-2xl"
                              style={{
                                boxShadow: "0 10px 36px rgba(234, 88, 12, 0.4)",
                              }}
                            >
                              <MapPin size={22} className="text-white" strokeWidth={2} />
                            </div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-[0.6875rem] text-text-muted mb-1.5 font-bold uppercase tracking-[0.15em]">Localisation</p>
                          <p className="text-[0.9375rem] text-white font-semibold">{siteConfig.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-3 mb-12">
                      <div className="w-8 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(249, 115, 22, 0.4))" }} />
                      <h3 className="text-[0.6875rem] font-bold uppercase tracking-[0.25em] text-text-muted">
                        Suivez-nous
                      </h3>
                      <div className="w-8 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(249, 115, 22, 0.4))" }} />
                    </div>
                    <div className="flex items-center justify-center gap-5">
                      <a
                        href={siteConfig.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="group relative"
                      >
                        <div className="relative z-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500" style={{ width: 56, height: 56 }}>
                          {/* Outer glow ring */}
                          <div
                            className="absolute inset-0 rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                              background: "linear-gradient(135deg, #f97316, #fb923c)",
                              filter: "blur(20px)",
                            }}
                          />
                          {/* Icon container */}
                          <div
                            className="relative w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 shadow-2xl"
                            style={{
                              boxShadow: "0 10px 40px rgba(249, 115, 22, 0.5)",
                            }}
                          >
                            <Instagram size={22} className="text-white" strokeWidth={2} />
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
                        <div className="relative z-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500" style={{ width: 56, height: 56 }}>
                          {/* Outer glow ring */}
                          <div
                            className="absolute inset-0 rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                              background: "linear-gradient(135deg, #fb923c, #fdba74)",
                              filter: "blur(20px)",
                            }}
                          />
                          {/* Icon container */}
                          <div
                            className="relative w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br from-orange-600 to-amber-500 shadow-2xl"
                            style={{
                              boxShadow: "0 10px 40px rgba(251, 146, 60, 0.5)",
                            }}
                          >
                            <Facebook size={22} className="text-white" strokeWidth={2} />
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
                        <div className="relative z-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500" style={{ width: 56, height: 56 }}>
                          {/* Outer glow ring */}
                          <div
                            className="absolute inset-0 rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                              background: "linear-gradient(135deg, #ea580c, #f97316)",
                              filter: "blur(20px)",
                            }}
                          />
                          {/* Icon container */}
                          <div
                            className="relative w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br from-orange-600 via-orange-500 to-orange-600 shadow-2xl"
                            style={{
                              boxShadow: "0 10px 40px rgba(234, 88, 12, 0.5)",
                            }}
                          >
                            <Linkedin size={22} className="text-white" strokeWidth={2} />
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right — Form */}
            <ScrollReveal delay={0.15} className="lg:col-span-3 h-full">
              <form
                onSubmit={handleSubmit}
                className="relative overflow-hidden h-full flex flex-col"
                style={{
                  padding: "clamp(40px, 5vw, 56px)",
                  borderRadius: 32,
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)",
                  backdropFilter: "blur(40px)",
                  WebkitBackdropFilter: "blur(40px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                }}
              >
                {/* Top gradient line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] opacity-70"
                  style={{
                    background: "linear-gradient(90deg, #f97316, #fb923c, #fdba74, #fb923c, #f97316)",
                    backgroundSize: "200% 100%",
                  }}
                />

                {/* Background glow */}
                <div
                  className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-[0.03] pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, #f97316, transparent 70%)",
                    filter: "blur(60px)",
                  }}
                />

                {submitted && (
                  <div
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-5"
                    style={{
                      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)",
                      backdropFilter: "blur(40px)",
                      WebkitBackdropFilter: "blur(40px)",
                      borderRadius: 32,
                    }}
                  >
                    <div className="relative">
                      <div
                        className="absolute inset-0 rounded-full opacity-50"
                        style={{
                          background: "radial-gradient(circle, #10b981, transparent 70%)",
                          filter: "blur(30px)",
                        }}
                      />
                      <CheckCircle2 size={56} className="text-green-400 relative z-10" strokeWidth={2} />
                    </div>
                    <div className="text-center">
                      <p className="text-white font-[family-name:var(--font-display)] font-bold text-2xl mb-2">Message envoyé !</p>
                      <p className="text-text-secondary text-base">On vous recontacte sous 24h.</p>
                    </div>
                  </div>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: "clamp(36px, 5vh, 48px)", position: "relative", zIndex: 10 }}>
                  {/* Form Header */}
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(249, 115, 22, 0.4))" }} />
                      <span className="text-[0.6875rem] font-bold uppercase tracking-[0.25em] text-accent-primary">
                        Formulaire
                      </span>
                    </div>
                    <h3 className="font-[family-name:var(--font-display)] font-bold text-white mb-8" style={{ fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
                      Parlez-nous de votre{" "}
                      <span className="text-gradient">projet</span>
                    </h3>
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-[0.8125rem] font-semibold text-white/90 mb-4">
                      Nom complet <span className="text-accent-primary">*</span>
                    </label>
                    <div className="relative group">
                      {/* Top gradient line */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 rounded-t-3xl"
                        style={{
                          background: "linear-gradient(90deg, #f97316, #fb923c, transparent)",
                        }}
                      />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="Votre nom complet"
                        value={formData.name}
                        onChange={handleChange}
                        className={inputStyles}
                        style={{
                          padding: "18px 24px",
                          borderRadius: 24,
                          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
                          backdropFilter: "blur(40px)",
                          WebkitBackdropFilter: "blur(40px)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "clamp(20px, 3vw, 28px)" }}>
                    <div>
                      <label htmlFor="email" className="block text-[0.8125rem] font-semibold text-white/90 mb-4">
                        Email <span className="text-accent-primary">*</span>
                      </label>
                      <div className="relative group">
                        {/* Top gradient line */}
                        <div
                          className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 rounded-t-3xl"
                          style={{
                            background: "linear-gradient(90deg, #f97316, #fb923c, transparent)",
                          }}
                        />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          placeholder="votre@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          className={inputStyles}
                          style={{
                            padding: "18px 24px",
                            borderRadius: 24,
                            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
                            backdropFilter: "blur(40px)",
                            WebkitBackdropFilter: "blur(40px)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-[0.8125rem] font-semibold text-white/90 mb-4">
                        Téléphone <span className="text-accent-primary">*</span>
                      </label>
                      <div className="relative group">
                        {/* Top gradient line */}
                        <div
                          className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 rounded-t-3xl"
                          style={{
                            background: "linear-gradient(90deg, #f97316, #fb923c, transparent)",
                          }}
                        />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          placeholder="06 XX XX XX XX"
                          value={formData.phone}
                          onChange={handleChange}
                          className={inputStyles}
                          style={{
                            padding: "18px 24px",
                            borderRadius: 24,
                            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
                            backdropFilter: "blur(40px)",
                            WebkitBackdropFilter: "blur(40px)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-[0.8125rem] font-semibold text-white/90 mb-4">
                      Entreprise <span className="text-text-muted/70 text-xs">(optionnel)</span>
                    </label>
                    <div className="relative group">
                      {/* Top gradient line */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 rounded-t-3xl"
                        style={{
                          background: "linear-gradient(90deg, #f97316, #fb923c, transparent)",
                        }}
                      />
                      <input
                        type="text"
                        id="company"
                        name="company"
                        placeholder="Nom de votre entreprise"
                        value={formData.company}
                        onChange={handleChange}
                        className={inputStyles}
                        style={{
                          padding: "18px 24px",
                          borderRadius: 24,
                          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
                          backdropFilter: "blur(40px)",
                          WebkitBackdropFilter: "blur(40px)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-[0.8125rem] font-semibold text-white/90 mb-4">
                      Service qui vous intéresse <span className="text-accent-primary">*</span>
                    </label>
                    <div className="relative group">
                      {/* Top gradient line */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 rounded-t-3xl"
                        style={{
                          background: "linear-gradient(90deg, #f97316, #fb923c, transparent)",
                        }}
                      />
                      <select
                        id="service"
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className={`${inputStyles} appearance-none cursor-pointer`}
                        style={{
                          padding: "18px 24px",
                          paddingRight: "3rem",
                          borderRadius: 24,
                          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
                          backdropFilter: "blur(40px)",
                          WebkitBackdropFilter: "blur(40px)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23f97316' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: "right 1.25rem center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "1.5em 1.5em",
                        }}
                      >
                        <option value="">Sélectionnez un service</option>
                        <option value="media-buying">Media Buying</option>
                        <option value="content-production">Production de Contenu</option>
                        <option value="web-development">Développement Web</option>
                        <option value="full-pack">Pack Complet</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-[0.8125rem] font-semibold text-white/90 mb-4">
                      Message <span className="text-accent-primary">*</span>
                    </label>
                    <div className="relative group">
                      {/* Top gradient line */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 rounded-t-3xl"
                        style={{
                          background: "linear-gradient(90deg, #f97316, #fb923c, transparent)",
                        }}
                      />
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Décrivez brièvement votre projet et vos objectifs..."
                        value={formData.message}
                        onChange={handleChange}
                        className={`${inputStyles} resize-none`}
                        style={{
                          padding: "18px 24px",
                          lineHeight: 1.7,
                          borderRadius: 24,
                          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
                          backdropFilter: "blur(40px)",
                          WebkitBackdropFilter: "blur(40px)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: "clamp(12px, 2vh, 20px)" }}>
                    {error && (
                      <p className="text-red-400 text-sm text-center mb-4">
                        Une erreur est survenue. Veuillez réessayer.
                      </p>
                    )}
                    <MagneticButton type="submit" variant="primary" className="w-full justify-center text-base py-4" disabled={submitting}>
                      <Send size={18} strokeWidth={2} />
                      {submitting ? "Envoi en cours..." : "Envoyer votre demande"}
                    </MagneticButton>
                  </div>
                </div>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
