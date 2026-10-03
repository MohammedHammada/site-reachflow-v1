"use client";

import { Suspense, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

// Faithful port of the approved thank-you-amenagement-renovation design,
// wired to the real backend instead of a fabricated n8n lead_id lookup:
// the "update my number" form resubmits to /api/submit-lead (same real
// endpoint the LP uses) tagged as a correction, carrying the name/phone
// this page was opened with via the URL.
//
// NOTE ACHRAF: the WhatsApp number below (+212 6 63 29 17 41) is what was
// in your uploaded file — I'm trusting that's your real business number
// since you told me directly to deploy exactly what you gave me. Flag me
// immediately if that's wrong, since every visitor who completes the form
// gets sent to click-to-chat that exact number.

const PAGE_STYLES = `
  :root{
    --bg:#000000; --bg-elevated:#1C1C1E; --surface:#151517;
    --text:#F5F5F7; --text-muted:#98989D;
    --accent:#FF6B29; --accent-2:#FF3D68; --accent-ink:#D6551D;
    --gradient-brand:linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%);
    --border:rgba(255,255,255,0.10); --hairline:rgba(255,255,255,0.14);
    --check:#1E8E5A; --check-bg:rgba(30,142,90,0.16);
    --whatsapp:#25D366;
    --shadow-s:0 1px 2px rgba(0,0,0,0.5); --shadow-m:0 8px 24px rgba(0,0,0,0.45); --shadow-l:0 24px 60px rgba(0,0,0,0.55);
    --radius-s:10px; --radius-m:18px; --radius-l:28px; --radius-pill:980px;
    --font: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Inter", "Helvetica Neue", Arial, sans-serif;
    --ease: cubic-bezier(0.22, 1, 0.36, 1);
  }
  #rf-ty{ background:var(--bg); color:var(--text); font-family:var(--font); line-height:1.5; -webkit-font-smoothing:antialiased; font-size:17px; position:relative; overflow-x:clip; }
  #rf-ty *{box-sizing:border-box;}
  #rf-ty .bg-glow{ position:fixed; z-index:0; border-radius:50%; filter:blur(90px); pointer-events:none; }
  #rf-ty .bg-glow-1{ top:-180px; right:-160px; width:460px; height:460px; background:radial-gradient(circle, color-mix(in srgb, var(--accent) 28%, transparent) 0%, transparent 70%); }
  #rf-ty .bg-glow-2{ top:520px; left:-200px; width:420px; height:420px; background:radial-gradient(circle, color-mix(in srgb, var(--accent-2) 18%, transparent) 0%, transparent 70%); }
  #rf-ty .gradient-text{ background:var(--gradient-brand); -webkit-background-clip:text; background-clip:text; color:transparent; }
  #rf-ty img{max-width:100%; display:block;}
  #rf-ty .wrap{max-width:640px; margin:0 auto; padding:0 24px; min-width:0; position:relative; z-index:1;}
  #rf-ty h1,#rf-ty h2,#rf-ty h3{font-weight:700; color:var(--text);}
  #rf-ty h1{font-size:clamp(1.9rem, 6vw, 2.6rem); line-height:1.1; letter-spacing:-0.02em;}
  #rf-ty h2{font-size:clamp(1.3rem, 4vw, 1.6rem); line-height:1.18; letter-spacing:-0.01em;}
  #rf-ty h3{font-size:1.05rem; font-weight:700;}
  #rf-ty p{color:var(--text-muted); font-size:1rem; line-height:1.6;}
  #rf-ty a{color:inherit;}
  #rf-ty section{padding:48px 0; position:relative; z-index:1;}
  #rf-ty section + section{ border-top:1px solid var(--hairline); }
  #rf-ty [data-reveal]{ opacity:0; transform:translateY(14px); transition:opacity 650ms var(--ease), transform 650ms var(--ease); }
  #rf-ty [data-reveal].is-visible{ opacity:1; transform:none; }
  @media (prefers-reduced-motion: reduce){ #rf-ty [data-reveal]{ opacity:1; transform:none; transition:none; } }

  #rf-ty .site-header{ padding:20px 24px 16px; text-align:center; }
  #rf-ty .brand-tag{ display:inline-block; margin-top:8px; font-size:0.76rem; color:var(--text-muted); border:1px solid var(--border); padding:5px 12px; border-radius:var(--radius-pill); }
  #rf-ty .success-hero{ text-align:center; padding-top:12px; }
  #rf-ty .success-icon{ width:64px; height:64px; margin:0 auto 20px; border-radius:50%; background:var(--check-bg); color:var(--check); display:flex; align-items:center; justify-content:center; }
  #rf-ty .success-hero h1{ margin-bottom:12px; }
  #rf-ty .success-hero .lede{ font-size:1.05rem; max-width:42ch; margin:0 auto; }

  #rf-ty .btn{
    position:relative; overflow:hidden; display:inline-flex; align-items:center; justify-content:center; gap:8px;
    background:var(--gradient-brand); color:#fff; font-weight:700; font-size:1.02rem; letter-spacing:-0.005em;
    padding:16px 30px; border-radius:var(--radius-pill); border:none; cursor:pointer; text-decoration:none;
    transition:transform 120ms var(--ease), box-shadow 200ms var(--ease);
    box-shadow:0 10px 26px color-mix(in srgb, var(--accent) 38%, transparent);
  }
  #rf-ty .btn:hover{ transform:translateY(-1px); }
  #rf-ty .btn-whatsapp{ background:var(--whatsapp); box-shadow:0 10px 26px rgba(37,211,102,0.35); }
  #rf-ty .btn-block{ width:100%; }

  #rf-ty .step{ display:flex; gap:16px; margin-bottom:8px; }
  #rf-ty .step-num{ flex-shrink:0; width:32px; height:32px; border-radius:50%; background:var(--gradient-brand); color:#fff; font-weight:700; font-size:0.9rem; display:flex; align-items:center; justify-content:center; }
  #rf-ty .step-body h2{ margin-bottom:8px; }
  #rf-ty .step-body p{ margin-bottom:16px; }
  #rf-ty .step-block{ margin-bottom:36px; }
  #rf-ty .step-block:last-child{ margin-bottom:0; }
  #rf-ty .step-connector{ width:1px; background:var(--hairline); margin:4px 0 4px 16px; height:20px; }
  #rf-ty .whatsapp-note{ background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-s); padding:14px 16px; font-size:0.86rem; color:var(--text-muted); margin-top:16px; }
  #rf-ty .whatsapp-note a{ color:var(--accent-ink); font-weight:600; text-decoration:underline; }

  #rf-ty .belief-eyebrow{ font-weight:600; color:var(--accent-ink); font-size:0.86rem; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:6px; display:block; }
  #rf-ty .belief-list{ display:flex; flex-direction:column; gap:16px; margin-top:20px; }
  #rf-ty .belief-card{ background:var(--bg-elevated); border:1px solid var(--border); border-radius:var(--radius-m); padding:20px; box-shadow:var(--shadow-s); }
  #rf-ty .belief-card h3{ margin-bottom:8px; }
  #rf-ty .belief-card p{ font-size:0.92rem; }
  #rf-ty .closing-line{ text-align:center; font-weight:700; font-size:1.1rem; color:var(--text); max-width:38ch; margin:32px auto 0; line-height:1.4; }

  #rf-ty .proof-banner{ position:relative; text-align:center; padding:40px 28px; border-radius:var(--radius-l); background:linear-gradient(135deg, color-mix(in srgb, var(--accent) 92%, black) 0%, color-mix(in srgb, var(--accent-2) 88%, black) 100%); overflow:hidden; }
  #rf-ty .proof-number{ font-weight:700; font-size:clamp(2rem, 8vw, 2.8rem); color:#fff; letter-spacing:-0.02em; }
  #rf-ty .proof-banner p{ margin-top:8px; color:rgba(255,255,255,0.92); font-size:0.96rem; }
  #rf-ty .proof-split{ display:flex; gap:16px; margin-top:24px; }
  #rf-ty .proof-split > div{ flex:1; background:rgba(255,255,255,0.12); border-radius:var(--radius-s); padding:14px; text-align:left; }
  #rf-ty .proof-split strong{ display:block; color:#fff; font-size:0.78rem; letter-spacing:0.03em; margin-bottom:4px; }
  #rf-ty .proof-split span{ display:block; color:rgba(255,255,255,0.88); font-size:0.84rem; line-height:1.4; }
  @media (max-width:480px){ #rf-ty .proof-split{ flex-direction:column; } }

  #rf-ty .form-card{ background:var(--bg-elevated); border:1px solid var(--border); border-radius:var(--radius-m); padding:26px 22px; box-shadow:var(--shadow-s); margin-top:16px; }
  #rf-ty .field{ margin-bottom:14px; }
  #rf-ty .field label{ display:block; font-size:0.86rem; font-weight:600; margin-bottom:6px; }
  #rf-ty .field input{ width:100%; padding:13px 14px; border-radius:var(--radius-s); border:1px solid var(--border); background:var(--surface); color:var(--text); font-size:0.96rem; font-family:var(--font); outline:none; transition:border-color 150ms var(--ease); }
  #rf-ty .field input:focus{ border-color:var(--accent); }
  #rf-ty #updateSuccess{ display:none; text-align:center; }
  #rf-ty #updateSuccess.active{ display:block; }
  #rf-ty #updateSuccess h3{ margin-bottom:6px; }

  #rf-ty .site-footer{ border-top:1px solid var(--hairline); padding:36px 0; text-align:center; }
  #rf-ty .site-footer .brand-logo{ margin-bottom:8px; display:flex; justify-content:center; }
  #rf-ty .site-footer p{ font-size:0.82rem; }
`;

const PAGE_HTML = `
<div class="bg-glow bg-glow-1" aria-hidden="true"></div>
<div class="bg-glow bg-glow-2" aria-hidden="true"></div>

<header class="site-header">
  <span class="brand-logo"><img src="/reachflow-logo-light-text.png" alt="ReachFlow" style="height:22px;width:auto;margin:0 auto;"></span>
  <div class="brand-tag">Aménagement &amp; Rénovation</div>
</header>

<section class="success-hero">
  <div class="wrap">
    <div class="success-icon" data-reveal>
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
    </div>
    <h1 data-reveal id="tyHeadline">Félicitations, votre demande est <span class="gradient-text">enregistrée</span> !</h1>
    <p class="lede" data-reveal>Voici les prochaines étapes pour planifier votre diagnostic gratuit.</p>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="step-block">
      <div class="step">
        <div class="step-num">1</div>
        <div class="step-body">
          <h2>Confirmation WhatsApp <span style="font-weight:500; color:var(--text-muted); font-size:0.7em;">(action immédiate)</span></h2>
          <p data-reveal>Cliquez sur le bouton ci-dessous pour <strong>confirmer vos données sur WhatsApp</strong>. Un de nos experts vous contactera très prochainement pour convenir du meilleur moment pour votre appel de 30 minutes.</p>
          <a href="https://wa.me/212663291741?text=Bonjour%2C%20je%20confirme%20mes%20donn%C3%A9es%20%E2%9C%85%20J%27attends%20votre%20message%20pour%20convenir%20du%20meilleur%20moment%20pour%20l%27appel%20de%2030%20minutes." class="btn btn-whatsapp btn-block" data-reveal>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.09c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.11.11-1.79-.11-.41-.13-.95-.31-1.63-.6-2.87-1.24-4.74-4.14-4.89-4.33-.14-.19-1.17-1.56-1.17-2.98 0-1.41.74-2.11 1-2.4.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.14.07.15.12.32.02.51-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.61-.07.16-.19.68-.79.87-1.07.18-.28.37-.23.62-.14.26.09 1.64.77 1.92.91.28.14.47.21.53.33.07.12.07.7-.17 1.38z"/></svg>
            Je confirme
          </a>
          <div class="whatsapp-note" data-reveal>
            <strong>Note importante :</strong> si le numéro renseigné n'est pas lié à un compte WhatsApp actif, merci de le <a href="#update-number">mettre à jour ci-dessous</a> afin qu'on puisse échanger dans les meilleures conditions.
          </div>
        </div>
      </div>
    </div>

    <div class="step-connector" aria-hidden="true"></div>

    <div class="step-block">
      <div class="step">
        <div class="step-num">2</div>
        <div class="step-body">
          <h2>L'appel de 30 minutes</h2>
          <p data-reveal>Une fois votre numéro confirmé, l'un de nos experts vous contactera très prochainement pour planifier votre appel de 30 minutes.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <span class="belief-eyebrow" data-reveal>À lire attentivement</span>
    <h2 data-reveal>En attendant notre appel, voici 3 éléments fondamentaux sur notre vision pour votre entreprise</h2>

    <div class="belief-list">
      <div class="belief-card" data-reveal>
        <h3>Nous ne sommes pas une agence de publicité</h3>
        <p>Ce qu'on vous propose n'est pas une simple "gestion de vos publicités Meta". Notre intervention touche directement et uniquement votre carnet de chantiers et votre chiffre d'affaires encaissé.</p>
      </div>
      <div class="belief-card" data-reveal>
        <h3>Le mythe de la pub seule</h3>
        <p>S'appuyer uniquement sur la publicité payante est une stratégie perdante. On ne s'arrête pas au lead — on travaille sur toute la chaîne, de l'acquisition jusqu'au closing, pour augmenter ce qui arrive réellement jusqu'au revenu.</p>
      </div>
      <div class="belief-card" data-reveal>
        <h3>Travailler dur n'a jamais été la clé</h3>
        <p>Beaucoup d'entreprises d'aménagement s'épuisent à courir après le bouche-à-oreille avant même d'avoir structuré leur acquisition. Le but : vous permettre de vous concentrer sur vos chantiers, pas sur la chasse aux clients.</p>
      </div>
    </div>

    <p class="closing-line" data-reveal>Ne perdez plus votre temps ni votre argent à tester seul. Construisons ensemble une entreprise qui ne dépend plus du bouche-à-oreille.</p>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="proof-banner" data-reveal>
      <div class="proof-number">+120 millions de dirhams</div>
      <p>de projets accompagnés pour nos partenaires en moins de 2 ans.</p>
      <div class="proof-split">
        <div><strong>POUR NOUS</strong><span>Cela signale une seule chose : un concept éprouvé.</span></div>
        <div><strong>POUR VOUS</strong><span>C'est exactement ce que vous avez toujours cherché.</span></div>
      </div>
    </div>
  </div>
</section>

<section id="update-number">
  <div class="wrap">
    <h2 data-reveal>Mise à jour du numéro</h2>
    <p data-reveal style="margin-top:8px;">Veuillez entrer votre numéro WhatsApp correct ci-dessous.</p>

    <div class="form-card" data-reveal>
      <form id="updateForm">
        <div class="field">
          <label for="waPhone">Numéro WhatsApp *</label>
          <input type="tel" id="waPhone" required placeholder="06 XX XX XX XX">
        </div>
        <button type="submit" class="btn btn-block">Mettre à jour mon numéro</button>
      </form>
      <div id="updateSuccess">
        <h3>Numéro mis à jour.</h3>
        <p>Merci — on vous contacte très prochainement sur WhatsApp.</p>
      </div>
    </div>
  </div>
</section>

<footer class="site-footer">
  <div class="wrap">
    <span class="brand-logo"><img src="/reachflow-logo-light-text.png" alt="ReachFlow" style="height:20px;width:auto;"></span>
    <p>Le partenaire de croissance pour les entreprises d'aménagement et de rénovation ambitieuses.</p>
    <p style="margin-top:6px;">© 2026 ReachFlow. Tous droits réservés.</p>
  </div>
</footer>
`;

function ThankYouContent() {
  const rootRef = useRef<HTMLDivElement>(null);
  const params = useSearchParams();
  const nom = params.get("nom")?.trim();
  const phoneFromLp = params.get("phone")?.trim() || "";
  const emailFromLp = params.get("email")?.trim() || "";
  const entrepriseFromLp = params.get("entreprise")?.trim() || "";
  const typesFromLp = params.get("types")?.trim() || "";

  useEffect(() => {
    // GTM listens for this and fires the Meta standard "Lead" event.
    const w = window as typeof window & { dataLayer?: unknown[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: "lead_conversion" });
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (nom) {
      const firstName = nom.split(" ")[0];
      const headline = root.querySelector("#tyHeadline");
      if (headline) {
        headline.innerHTML = `Félicitations ${firstName}, votre demande est <span class="gradient-text">enregistrée</span> !`;
      }
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealTargets = root.querySelectorAll<HTMLElement>("[data-reveal]");
    let io: IntersectionObserver | null = null;
    if (!reduceMotion && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );
      revealTargets.forEach((el) => io!.observe(el));
    } else {
      revealTargets.forEach((el) => el.classList.add("is-visible"));
    }

    const waPhoneEl = root.querySelector<HTMLInputElement>("#waPhone");
    const onWaPhoneInput = () => {
      if (!waPhoneEl) return;
      const filtered = waPhoneEl.value.replace(/[^\d\s()+-]/g, "");
      if (filtered !== waPhoneEl.value) waPhoneEl.value = filtered;
    };
    waPhoneEl?.addEventListener("input", onWaPhoneInput);

    const updateForm = root.querySelector<HTMLFormElement>("#updateForm");
    const onSubmit = async (e: Event) => {
      e.preventDefault();
      const phoneInput = root.querySelector<HTMLInputElement>("#waPhone");
      const newPhone = (phoneInput?.value || "").trim();
      const digits = newPhone.replace(/\D/g, "");
      if (digits.length < 9 || digits.length > 14 || !/^[\d\s()+-]+$/.test(newPhone)) {
        alert("Merci d'entrer un numéro de téléphone valide (chiffres uniquement).");
        phoneInput?.focus();
        return;
      }
      try {
        await fetch("/api/submit-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nomComplet: nom || "",
            telephone: newPhone,
            email: emailFromLp,
            entreprise: entrepriseFromLp,
            typesDeProjets: typesFromLp,
            note: `Correction de numéro — ancien: ${phoneFromLp || "inconnu"}`,
            source: "amenagement-correction-numero",
            isDisqualified: false,
          }),
        });
      } catch (err) {
        console.error(err);
      }
      if (updateForm) updateForm.style.display = "none";
      root.querySelector("#updateSuccess")?.classList.add("active");
    };
    updateForm?.addEventListener("submit", onSubmit);

    return () => {
      io?.disconnect();
      updateForm?.removeEventListener("submit", onSubmit);
      waPhoneEl?.removeEventListener("input", onWaPhoneInput);
    };
  }, [nom, phoneFromLp, emailFromLp, entrepriseFromLp, typesFromLp]);

  return (
    <div id="rf-ty" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: PAGE_STYLES }} />
      <div dangerouslySetInnerHTML={{ __html: PAGE_HTML }} />
    </div>
  );
}

export default function ThankYouAmenagementPage() {
  return (
    <Suspense fallback={null}>
      <ThankYouContent />
    </Suspense>
  );
}
