"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// ─── LIGHT THEME PALETTE (same system as /agences-etudes) ──────────────────
const C = {
  bg: "#FFFFFF",
  bgAlt: "#F5F4F1",
  ink: "#0A0A0A",
  inkSoft: "#5A5A5A",
  inkFaint: "#8A8A8A",
  orange: "#FF6B00",
  orangeSoft: "#FFF1E8",
  line: "rgba(10,10,10,0.10)",
  lineStrong: "rgba(10,10,10,0.18)",
};

// ─── LOGOS (shared trust strip, reused across all niche LPs on this site) ──
const logos = [
  { src: "/logos/1.png", alt: "Client 1" },
  { src: "/logos/2.png", alt: "Client 2" },
  { src: "/logos/3.png", alt: "Client 3" },
  { src: "/logos/4.png", alt: "Client 4" },
  { src: "/logos/5.png", alt: "Client 5" },
  { src: "/logos/6.png", alt: "Client 6" },
  { src: "/logos/7.png", alt: "Client 7" },
  { src: "/logos/8.png", alt: "Client 8" },
  { src: "/logos/9.png", alt: "Client 9" },
  { src: "/logos/10.png", alt: "Client 10" },
  { src: "/logos/11.png", alt: "Client 11" },
];
const doubled = [...logos, ...logos];

// ─── QUALIFIER FORM — 5 questions d'éligibilité + 3 champs de contact ──────

const qualifySteps = [
  {
    id: "icp",
    headline: "Votre activité, c'est bien l'aménagement intérieur et/ou la rénovation ?",
    options: [
      { label: "Oui, activité principale", eligible: true },
      { label: "En partie / je démarre", eligible: true },
      { label: "Non, autre activité", eligible: true },
    ],
  },
  {
    id: "satisfaction",
    headline: "Êtes-vous satisfait du nombre de chantiers actuels ?",
    options: [
      { label: "Oui, je suis satisfait", eligible: false },
      { label: "Non, je veux plus", eligible: true },
    ],
  },
  {
    id: "blocage",
    headline: "Votre principal blocage aujourd'hui ?",
    options: [
      { label: "Pas assez de demandes qualifiées", eligible: true },
      { label: "Les devis traînent, pas assez de closing", eligible: true },
      { label: "Pas le temps de prospecter", eligible: true },
      { label: "Je dépends du bouche-à-oreille", eligible: true },
    ],
  },
  {
    id: "budget",
    headline: "Quel budget mensuel total (pub + accompagnement) pouvez-vous allouer ?",
    options: [
      { label: "Moins de 3 000 DH", eligible: false },
      { label: "3 000 – 6 000 DH", eligible: true },
      { label: "Plus de 6 000 DH", eligible: true },
      { label: "Je ne sais pas encore", eligible: true },
    ],
  },
  {
    id: "urgence",
    headline: "Quand voulez-vous commencer à recevoir des chantiers ?",
    options: [
      { label: "Dès que possible / ce mois-ci", eligible: true },
      { label: "Dans 1 – 2 mois", eligible: true },
      { label: "Je me renseigne juste, aucun projet", eligible: false },
    ],
  },
];

const contactFields = [
  { key: "nom" as const,   headline: "Quel est votre nom complet ?",              label: "Nom complet",           type: "text", placeholder: "Votre nom complet" },
  { key: "phone" as const, headline: "Votre numéro WhatsApp ?",                   label: "Téléphone / WhatsApp",  type: "tel",  placeholder: "06 00 00 00 00" },
  { key: "ville" as const, headline: "Quelle est la ville de votre entreprise ?", label: "Ville de l'entreprise", type: "text", placeholder: "Ex : Casablanca, Rabat…" },
];

const TOTAL_STEPS = qualifySteps.length + contactFields.length; // 8

function QualifierFormLight({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [formData, setFormData] = useState({ nom: "", phone: "", ville: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const progress = ((currentStep + 1) / TOTAL_STEPS) * 100;
  const isChoiceStep = currentStep < qualifySteps.length;
  const contactIndex = currentStep - qualifySteps.length;
  const isLastStep = currentStep === TOTAL_STEPS - 1;
  const selected = answers[currentStep] ?? null;

  const computeDisqualified = () =>
    qualifySteps.some((step, i) => {
      const opt = step.options.find((o) => o.label === answers[i]);
      return opt ? !opt.eligible : false;
    });

  const handleSelectOption = (opt: { label: string }) => {
    setAnswers((prev) => ({ ...prev, [currentStep]: opt.label }));
  };

  const handleNext = () => {
    if (isChoiceStep && !answers[currentStep]) return;
    setCurrentStep((s) => s + 1);
  };

  const handleBack = () => {
    if (currentStep === 0) return;
    setCurrentStep((s) => s - 1);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const isDisqualified = computeDisqualified();
    const payload = {
      nomComplet: formData.nom,
      telephone: formData.phone,
      villeEntreprise: formData.ville,
      icp: answers[0] || "",
      satisfaction: answers[1] || "",
      blocage: answers[2] || "",
      budget: answers[3] || "",
      urgence: answers[4] || "",
      eligible: !isDisqualified,
      source: "amenagement",
      datetime: (() => {
        const n = new Date();
        const p = (x: number) => String(x).padStart(2, "0");
        return `${p(n.getDate())}/${p(n.getMonth() + 1)}/${n.getFullYear()} ${p(n.getHours())}:${p(n.getMinutes())}:${p(n.getSeconds())}`;
      })(),
    };
    try {
      await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, isDisqualified }),
      });
    } catch (err) {
      console.error(err);
    }
    try {
      const url = process.env.NEXT_PUBLIC_CRM_WEBHOOK_URL;
      const secret = process.env.NEXT_PUBLIC_CRM_WEBHOOK_SECRET;
      if (url) {
        await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(secret ? { Authorization: `Bearer ${secret}` } : {}),
          },
          body: JSON.stringify({
            name: formData.nom,
            phone: formData.phone,
            company: formData.ville,
            source: "amenagement",
            has_booked_call: false,
            notes: Object.entries(payload).map(([k, v]) => `${k}: ${v}`).join(" | "),
          }),
        });
      }
    } catch (err) {
      console.error(err);
    }
    const params = new URLSearchParams({ nom: formData.nom, phone: formData.phone });
    router.push(isDisqualified ? "/non-eligible" : `/thank-you-amenagement?${params.toString()}`);
  };

  const canProceed = () => {
    if (isChoiceStep) return !!answers[currentStep];
    return formData[contactFields[contactIndex].key].trim().length > 0;
  };

  const btnStyle = (active: boolean) => ({
    flex: 1,
    padding: "15px 20px",
    borderRadius: "12px",
    cursor: active ? "pointer" : "not-allowed",
    backgroundColor: active ? C.orange : "rgba(255,107,0,0.25)",
    border: "none",
    color: "#fff",
    fontWeight: 700 as const,
    fontSize: "14px",
    boxShadow: active ? "0 8px 24px -8px rgba(255,107,0,0.5)" : "none",
    opacity: active ? 1 : 0.6,
  });

  return (
    <section ref={sectionRef} id="candidature" style={{ padding: "24px 32px 96px", backgroundColor: C.ink }}>
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontSize: "clamp(28px,4vw,50px)", fontWeight: 700, textTransform: "uppercase" as const, color: "#fff", marginBottom: "14px", lineHeight: 1.1 }}>
            Réservez votre diagnostic <span className="rf-underline-word">gratuit</span>
          </h2>
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>Quelques questions pour personnaliser votre diagnostic. Moins de 2 minutes.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ backgroundColor: "#fff", borderRadius: "24px", overflow: "hidden", boxShadow: "0 40px 80px -30px rgba(0,0,0,0.6)" }}>
          <div style={{ height: "4px", backgroundColor: "rgba(10,10,10,0.08)" }}>
            <motion.div style={{ height: "100%", backgroundColor: C.orange }} animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease: "easeOut" }} />
          </div>

          <div style={{ padding: "36px 32px" }}>
            <AnimatePresence mode="wait">
              {isChoiceStep ? (
                <motion.div key={`c-${currentStep}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                  <p style={{ fontSize: "12px", color: C.inkFaint, textTransform: "uppercase" as const, letterSpacing: "0.12em", fontWeight: 700, marginBottom: "16px" }}>
                    Étape {currentStep + 1} sur {TOTAL_STEPS}
                  </p>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: C.ink, marginBottom: "24px", lineHeight: 1.4 }}>
                    {qualifySteps[currentStep].headline}
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column" as const, gap: "10px" }}>
                    {qualifySteps[currentStep].options.map((opt) => {
                      const sel = selected === opt.label;
                      return (
                        <button key={opt.label} type="button" onClick={() => handleSelectOption(opt)}
                          style={{ width: "100%", textAlign: "left" as const, padding: "14px 18px", borderRadius: "12px", cursor: "pointer", backgroundColor: sel ? C.orangeSoft : "#fff", border: `1.5px solid ${sel ? C.orange : C.lineStrong}`, color: sel ? C.orange : C.ink, fontWeight: sel ? 700 : 500, fontSize: "15px", display: "flex", alignItems: "center", gap: "12px", transition: "all 0.2s" }}>
                          <div style={{ width: "20px", height: "20px", borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: sel ? C.orange : "transparent", border: `2px solid ${sel ? C.orange : C.lineStrong}` }}>
                            {sel && <svg style={{ width: "12px", height: "12px", color: "#fff" }} fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>}
                          </div>
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                  <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
                    {currentStep > 0 && <button type="button" onClick={handleBack} style={{ flex: 1, padding: "15px 20px", borderRadius: "12px", cursor: "pointer", backgroundColor: "#fff", border: `1.5px solid ${C.lineStrong}`, color: C.inkSoft, fontWeight: 700, fontSize: "14px" }}>← Précédent</button>}
                    <button type="button" onClick={handleNext} disabled={!canProceed()} style={btnStyle(canProceed())}>Suivant →</button>
                  </div>
                </motion.div>
              ) : (
                <motion.form key={`i-${currentStep}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}
                  onSubmit={(e) => { e.preventDefault(); if (isLastStep) handleSubmit(e); else handleNext(); }}>
                  <p style={{ fontSize: "12px", color: C.inkFaint, textTransform: "uppercase" as const, letterSpacing: "0.12em", fontWeight: 700, marginBottom: "16px" }}>
                    Étape {currentStep + 1} sur {TOTAL_STEPS}
                  </p>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: C.ink, marginBottom: "24px" }}>
                    {contactFields[contactIndex].headline}
                  </h3>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", color: C.inkSoft, textTransform: "uppercase" as const, letterSpacing: "0.1em", fontWeight: 600, marginBottom: "8px" }}>
                      {contactFields[contactIndex].label}
                    </label>
                    <input
                      type={contactFields[contactIndex].type} required autoFocus
                      value={formData[contactFields[contactIndex].key]}
                      onChange={(e) => setFormData({ ...formData, [contactFields[contactIndex].key]: e.target.value })}
                      placeholder={contactFields[contactIndex].placeholder}
                      style={{ width: "100%", padding: "15px 16px", borderRadius: "12px", fontSize: "16px", color: C.ink, backgroundColor: "#fff", border: `1.5px solid ${C.lineStrong}`, outline: "none", fontFamily: "Inter Tight, system-ui, sans-serif" }}
                      onFocus={(e) => { e.target.style.borderColor = C.orange; e.target.style.boxShadow = `0 0 0 4px ${C.orangeSoft}`; }}
                      onBlur={(e) => { e.target.style.borderColor = C.lineStrong; e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                  <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
                    <button type="button" onClick={handleBack} style={{ flex: 1, padding: "15px 20px", borderRadius: "12px", cursor: "pointer", backgroundColor: "#fff", border: `1.5px solid ${C.lineStrong}`, color: C.inkSoft, fontWeight: 700, fontSize: "14px" }}>← Précédent</button>
                    <button type="submit" disabled={!canProceed() || (isLastStep && isSubmitting)} style={btnStyle(canProceed())}>
                      {isLastStep ? (isSubmitting ? "Envoi…" : "Confirmer ma demande →") : "Suivant →"}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────
export default function AmenagementPage() {
  const [showSticky, setShowSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const formRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setShowSticky(true);
    const form = formRef.current;
    if (!form) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === form) setShowSticky(!entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ backgroundColor: C.bg, color: C.ink, minHeight: "100vh", fontFamily: "Inter Tight, system-ui, sans-serif", overflowX: "hidden" }}>

      {/* ── HEADER ── */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: "rgba(255,255,255,0.88)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderBottom: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "center", height: "72px" }}>
          <a href="#">
            <img src="/logo.png" alt="Reachflow" style={{ height: "36px", width: "auto" }} />
          </a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{ position: "relative", padding: "36px 0 48px", textAlign: "center", overflow: "hidden", background: "radial-gradient(900px 420px at 50% -8%,rgba(255,107,0,0.10),transparent 70%),linear-gradient(180deg,#fff 0%,#F5F4F1 100%)" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.5, backgroundImage: "radial-gradient(rgba(10,10,10,0.04) 1px,transparent 1px)", backgroundSize: "22px 22px", maskImage: "linear-gradient(180deg,#000,transparent 80%)", WebkitMaskImage: "linear-gradient(180deg,#000,transparent 80%)" }} />

        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          {/* Eyebrow — TODO ACHRAF: chiffre à vérifier */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            style={{ display: "inline-flex", alignItems: "center", gap: "9px", fontWeight: 700, fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase", color: C.orange, backgroundColor: C.orangeSoft, padding: "8px 16px", borderRadius: "100px", marginBottom: "28px", border: "1px solid rgba(255,107,0,0.2)" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: C.orange, display: "inline-block", animation: "rf-pulse 2s infinite" }} />
            +20 entreprises d&rsquo;aménagement &amp; rénovation nous font déjà confiance
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            style={{ fontWeight: 700, fontSize: "clamp(26px,4vw,52px)", maxWidth: "22ch", margin: "0 auto 24px", lineHeight: 1.1, color: C.ink }}>
            Votre potentiel de chantiers est{" "}
            <span style={{ color: C.orange }}>bien supérieur</span>{" "}
            à ce que vous exploitez aujourd&rsquo;hui.
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            style={{ maxWidth: "62ch", margin: "0 auto 40px" }}>
            <p style={{ fontSize: "clamp(16px,2vw,20px)", color: C.inkSoft, lineHeight: 1.6, marginBottom: "20px" }}>
              Bouche-à-oreille, devis qui traînent, mois en dents de scie. Notre système attire{" "}
              <strong style={{ color: C.ink, fontWeight: 800 }}>des demandes qualifiées</strong>, prêtes à lancer leur projet —
              et vous accompagne jusqu&rsquo;à la structuration de votre équipe commerciale.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
            style={{ display: "flex", gap: "18px", justifyContent: "center", flexWrap: "wrap", fontSize: "14px", color: C.inkFaint, marginTop: "32px" }}>
            {["Diagnostic 100% gratuit", "Sans engagement", "Réservé aux entreprises sérieuses"].map((item) => (
              <span key={item} style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke={C.orange} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── STATS STRIP — TODO ACHRAF: chiffres à vérifier ── */}
      <div style={{ maxWidth: "980px", margin: "24px auto 0", position: "relative", zIndex: 5, padding: "0 20px" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ backgroundColor: "#fff", border: `1px solid ${C.line}`, borderRadius: "20px", boxShadow: "0 30px 60px -25px rgba(10,10,10,0.22)", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", overflow: "hidden" }}>
          {[
            { num: "+20", label: "Entreprises d'aménagement & rénovation accompagnées", star: false },
            { num: "+120M DH", label: "De projets accompagnés pour nos partenaires", star: true },
            { num: "< 2 ans", label: "Pour construire ces résultats", star: false },
          ].map((s, i) => (
            <div key={i} style={{
              padding: isMobile ? "28px 32px" : "34px 22px",
              textAlign: isMobile ? "left" : "center",
              borderLeft: !isMobile && i > 0 ? `1px solid ${C.line}` : "none",
              borderTop: isMobile && i > 0 ? `1px solid ${C.line}` : "none",
              backgroundColor: s.star ? C.orangeSoft : "transparent",
              display: isMobile ? "flex" : "block",
              alignItems: "center",
              gap: isMobile ? "20px" : undefined,
            }}>
              <div style={{ fontWeight: 800, fontSize: isMobile ? "42px" : "clamp(36px,5vw,56px)", lineHeight: 1, color: s.star ? C.orange : C.ink, letterSpacing: "-0.02em", flexShrink: 0 }}>{s.num}</div>
              <div style={{ fontSize: "15px", color: C.inkSoft, marginTop: isMobile ? 0 : "10px", fontWeight: 600, lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── FORM ── */}
      <QualifierFormLight sectionRef={formRef} />

      {/* ── TRUST / LOGOS ── */}
      <section style={{ padding: "90px 0 60px", marginTop: "44px", borderBottom: `1px solid ${C.line}` }}>
        <div style={{ textAlign: "center", fontSize: "13px", letterSpacing: "0.14em", textTransform: "uppercase", color: C.inkFaint, fontWeight: 700, marginBottom: "32px" }}>
          Des entreprises qui génèrent déjà des résultats
        </div>
        <div style={{ position: "relative", overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)" }}>
          <div style={{ display: "flex", gap: "64px", width: "max-content", animation: "rf-scroll 36s linear infinite" }}>
            {doubled.map((logo, i) => (
              <div key={i} style={{ flexShrink: 0, width: "160px", height: "72px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={logo.src} alt={logo.alt} style={{ maxWidth: "100%", maxHeight: "100%", width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MECHANISM ── */}
      <section style={{ padding: "96px 0" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "0 24px" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 60px" }}>
            <span style={{ fontWeight: 700, fontSize: "13px", letterSpacing: "0.14em", textTransform: "uppercase", color: C.orange, display: "block", marginBottom: "16px" }}>Le Mécanisme</span>
            <h2 style={{ fontSize: "clamp(30px,4.6vw,52px)", fontWeight: 700, textTransform: "uppercase", marginBottom: "14px", color: C.ink, lineHeight: 1.1 }}>Un système en 3 piliers</h2>
            <p style={{ fontSize: "18px", color: C.inkSoft, lineHeight: 1.6 }}>Pas de hasard, pas de chance. Une machine de croissance sur-mesure, du diagnostic jusqu&rsquo;à la structuration de votre équipe.</p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "24px" }}>
            {[
              {
                num: "PILIER 01",
                icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
                title: "Le Diagnostic",
                desc: "Un audit gratuit de votre entreprise qui détermine votre position exacte sur notre roadmap de croissance en 6 étapes, et ce qui vous bloque précisément.",
              },
              {
                num: "PILIER 02",
                icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
                title: "Le Filtre",
                desc: "Une page et un process conçus pour capter des demandes qualifiées au coût le plus bas — pas des curieux qui font perdre du temps à votre équipe.",
              },
              {
                num: "PILIER 03",
                icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
                title: "L'Accompagnement",
                desc: "On ne s'arrête pas au lead : acquisition, closing des devis, structuration de votre équipe commerciale — toute la chaîne jusqu'au chiffre d'affaires.",
              },
            ].map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -6, boxShadow: "0 30px 60px -25px rgba(10,10,10,0.22)", borderColor: "transparent" }}
                style={{ position: "relative", backgroundColor: C.bg, border: `1px solid ${C.line}`, borderRadius: "18px", padding: "38px 32px", transition: "all 0.3s", overflow: "hidden" }}>
                <span style={{ fontWeight: 700, fontSize: "13px", color: C.orange, letterSpacing: "0.1em" }}>{p.num}</span>
                <div style={{ width: "54px", height: "54px", borderRadius: "14px", backgroundColor: C.orangeSoft, display: "grid", placeItems: "center", margin: "18px 0 22px", color: C.orange }}>{p.icon}</div>
                <h3 style={{ fontSize: "27px", fontWeight: 700, textTransform: "uppercase", marginBottom: "10px", color: C.ink }}>{p.title}</h3>
                <p style={{ color: C.inkSoft, fontSize: "16px", lineHeight: 1.6 }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──
          Intentionally omitted: /agences-etudes plays real client audio
          files (/public/audio/*.mp3). We have no real recordings for this
          niche yet — fabricating names/quotes would repeat the fake-social-
          proof problem already flagged and rejected for this project.
          Add a section here (mirroring AudioCard in /agences-etudes) once
          real recordings exist. */}

      {/* ── FOOTER ── */}
      <footer style={{ padding: "40px 0", textAlign: "center", backgroundColor: C.ink, color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
        <div style={{ marginBottom: "14px", display: "flex", justifyContent: "center" }}>
          <img src="/logo-white.png" alt="Reachflow" style={{ height: "32px", width: "auto" }} />
        </div>
        © 2026 Reachflow. Tous droits réservés.
      </footer>

      {/* ── STICKY CTA ── */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            style={{ position: "fixed", bottom: "24px", left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 100, pointerEvents: "none" }}
          >
            <a href="#candidature" style={{ display: "inline-flex", alignItems: "center", gap: "10px", backgroundColor: C.orange, color: "#fff", fontWeight: 700, fontSize: "16px", padding: "16px 36px", borderRadius: "100px", textDecoration: "none", boxShadow: "0 16px 40px -8px rgba(255,107,0,0.65)", pointerEvents: "auto" }}>
              Découvrez si votre entreprise est éligible →
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── GLOBAL STYLES FOR THIS PAGE ── */}
      <style>{`
        @keyframes rf-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(255,107,0,.45); }
          70%  { box-shadow: 0 0 0 12px rgba(255,107,0,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,107,0,0); }
        }
        @keyframes rf-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes rf-underline {
          0%   { transform: scaleX(0); transform-origin: left; }
          45%  { transform: scaleX(1); transform-origin: left; }
          50%  { transform: scaleX(1); transform-origin: right; }
          95%  { transform: scaleX(0); transform-origin: right; }
          100% { transform: scaleX(0); transform-origin: left; }
        }
        .rf-underline-word {
          position: relative;
          color: #FF6B00;
          display: inline-block;
        }
        .rf-underline-word::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: -3px;
          height: 3px;
          border-radius: 2px;
          background: #FF6B00;
          transform: scaleX(0);
          transform-origin: left;
          animation: rf-underline 2.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
