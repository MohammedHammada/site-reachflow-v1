"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { writeThankYouHandoff } from "@/lib/thankYouHandoff";

// All interactive behavior for the (server-rendered, static) /amenagement
// markup, split out so its JS chunk loads off the critical path (see
// page.tsx: dynamic import with ssr:false). Operates on the DOM directly
// since the markup it controls lives in a sibling server component, not in
// this component's own render tree.
export default function AmenagementBehavior() {
  const router = useRouter();

  useEffect(() => {
    const root = document.getElementById("rf-lp");
    if (!root) return;

    const header = root.querySelector<HTMLElement>("#rfHeader");
    const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    root.querySelectorAll<HTMLLabelElement>(".check-opt").forEach((opt) => {
      const input = opt.querySelector("input");
      input?.addEventListener("change", () => opt.classList.toggle("active", input.checked));
    });

    const phoneInputEl = root.querySelector<HTMLInputElement>("#phone");
    const onPhoneInput = () => {
      if (!phoneInputEl) return;
      const filtered = phoneInputEl.value.replace(/[^\d\s()+-]/g, "");
      if (filtered !== phoneInputEl.value) phoneInputEl.value = filtered;
    };
    phoneInputEl?.addEventListener("input", onPhoneInput);

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
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
      );
      revealTargets.forEach((el) => io!.observe(el));
    } else {
      revealTargets.forEach((el) => el.classList.add("is-visible"));
    }

    const heroBtn = root.querySelector<HTMLElement>(".hero .btn");
    const formSection = root.querySelector<HTMLElement>("#form");
    const stickyCta = root.querySelector<HTMLElement>("#stickyCta");
    let heroPast = false;
    let formInView = false;
    let stickyIo1: IntersectionObserver | null = null;
    let stickyIo2: IntersectionObserver | null = null;
    if (heroBtn && formSection && stickyCta && "IntersectionObserver" in window) {
      const update = () => stickyCta.classList.toggle("is-visible", heroPast && !formInView);
      stickyIo1 = new IntersectionObserver(
        (entries) => { heroPast = !entries[0].isIntersecting; update(); },
        { rootMargin: "0px 0px -85% 0px" }
      );
      stickyIo1.observe(heroBtn);
      stickyIo2 = new IntersectionObserver(
        (entries) => { formInView = entries[0].isIntersecting; update(); },
        { threshold: 0.1 }
      );
      stickyIo2.observe(formSection);
    }

    const form = root.querySelector<HTMLFormElement>("#leadForm");
    const submitBtn = root.querySelector<HTMLButtonElement>("#leadSubmitBtn");
    const steps = Array.from(root.querySelectorAll<HTMLElement>(".form-step"));
    const totalSteps = steps.length;
    const progressFill = root.querySelector<HTMLElement>("#formProgressFill");
    const progressLabel = root.querySelector<HTMLElement>("#formProgressLabel");
    let currentStep = 1;

    const focusTargets: Record<number, string> = { 1: "#company", 6: "#fullname" };
    const goToStep = (n: number) => {
      currentStep = n;
      steps.forEach((step) => step.classList.toggle("is-active", Number(step.dataset.step) === n));
      if (progressFill) progressFill.style.width = `${(n / totalSteps) * 100}%`;
      if (progressLabel) progressLabel.textContent = `Étape ${n} sur ${totalSteps}`;
      const target = focusTargets[n];
      if (target) form?.querySelector<HTMLInputElement>(target)?.focus();
    };

    const validateStep = (n: number): boolean => {
      if (n === 1) {
        const company = form?.querySelector<HTMLInputElement>("#company");
        if (!company?.value.trim()) {
          alert("Merci d'indiquer le nom de votre entreprise.");
          company?.focus();
          return false;
        }
      }
      if (n === 2) {
        const checks = form?.querySelectorAll<HTMLInputElement>('input[name="type"]:checked') ?? [];
        if (checks.length === 0) {
          alert("Merci de sélectionner au moins un type de projet.");
          return false;
        }
      }
      if (n === 3) {
        const valeurChecked = form?.querySelector<HTMLInputElement>('input[name="valeur_chantier"]:checked');
        if (!valeurChecked) {
          alert("Merci d'indiquer la valeur moyenne d'un chantier.");
          return false;
        }
      }
      if (n === 4) {
        const capaciteChecked = form?.querySelector<HTMLInputElement>('input[name="capacite_chantiers"]:checked');
        if (!capaciteChecked) {
          alert("Merci d'indiquer combien de chantiers votre équipe peut gérer en parallèle.");
          return false;
        }
      }
      if (n === 5) {
        const budgetChecked = form?.querySelector<HTMLInputElement>('input[name="budget_investissement"]:checked');
        if (!budgetChecked) {
          alert("Merci d'indiquer le budget envisagé.");
          return false;
        }
      }
      return true;
    };

    const onStepNext = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement;
      const step = btn.closest<HTMLElement>(".form-step");
      const n = Number(step?.dataset.step);
      if (!validateStep(n)) return;
      goToStep(n + 1);
    };
    const onStepBack = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement;
      const step = btn.closest<HTMLElement>(".form-step");
      const n = Number(step?.dataset.step);
      goToStep(n - 1);
    };
    const nextBtns = Array.from(root.querySelectorAll<HTMLButtonElement>(".step-next"));
    const backBtns = Array.from(root.querySelectorAll<HTMLButtonElement>(".step-back"));
    nextBtns.forEach((btn) => btn.addEventListener("click", onStepNext));
    backBtns.forEach((btn) => btn.addEventListener("click", onStepBack));

    const nicheTagButtons = root.querySelectorAll<HTMLButtonElement>(".niche-tag");
    const onNicheTagClick = (btn: HTMLButtonElement) => {
      const value = btn.dataset.projectType;
      const targetCheckbox = form?.querySelector<HTMLInputElement>(`input[name="type"][value="${value}"]`);
      if (targetCheckbox && !targetCheckbox.checked) {
        targetCheckbox.checked = true;
        targetCheckbox.dispatchEvent(new Event("change", { bubbles: true }));
      }
      nicheTagButtons.forEach((b) => b.classList.toggle("is-selected", b === btn));
      document.querySelector("#form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    nicheTagButtons.forEach((btn) => btn.addEventListener("click", () => onNicheTagClick(btn)));

    const onSubmit = async (e: Event) => {
      e.preventDefault();
      if (!form) return;
      const checks = form.querySelectorAll<HTMLInputElement>('input[name="type"]:checked');
      const valeurChantier = form.querySelector<HTMLInputElement>('input[name="valeur_chantier"]:checked')?.value || "";
      const capaciteChantiers = form.querySelector<HTMLInputElement>('input[name="capacite_chantiers"]:checked')?.value || "";
      const budgetInvestissement = form.querySelector<HTMLInputElement>('input[name="budget_investissement"]:checked')?.value || "";
      if (checks.length === 0) {
        goToStep(2);
        alert("Merci de sélectionner au moins un type de projet.");
        return;
      }
      if (!valeurChantier) {
        goToStep(3);
        alert("Merci d'indiquer la valeur moyenne d'un chantier.");
        return;
      }
      if (!capaciteChantiers) {
        goToStep(4);
        alert("Merci d'indiquer combien de chantiers votre équipe peut gérer en parallèle.");
        return;
      }
      if (!budgetInvestissement) {
        goToStep(5);
        alert("Merci d'indiquer le budget envisagé.");
        return;
      }
      const fullname = (form.querySelector<HTMLInputElement>("#fullname")?.value || "").trim();
      const phone = (form.querySelector<HTMLInputElement>("#phone")?.value || "").trim();
      const email = (form.querySelector<HTMLInputElement>("#email")?.value || "").trim();
      const villeEl = form.querySelector<HTMLInputElement>("#ville");
      const ville = (villeEl?.value || "").trim();
      const phoneDigits = phone.replace(/\D/g, "");
      if (phoneDigits.length < 9 || phoneDigits.length > 14 || !/^[\d\s()+-]+$/.test(phone)) {
        alert("Merci d'entrer un numéro de téléphone valide (chiffres uniquement).");
        form.querySelector<HTMLInputElement>("#phone")?.focus();
        return;
      }
      if (!ville) {
        alert("Merci d'indiquer votre ville.");
        villeEl?.focus();
        return;
      }
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Envoi…"; }
      const company = (form.querySelector<HTMLInputElement>("#company")?.value || "").trim();
      const projectTypes = Array.from(checks).map((c) => c.value);
      const datetime = (() => {
        const n = new Date();
        const p = (x: number) => String(x).padStart(2, "0");
        return `${p(n.getDate())}/${p(n.getMonth() + 1)}/${n.getFullYear()} ${p(n.getHours())}:${p(n.getMinutes())}:${p(n.getSeconds())}`;
      })();

      const sheetPayload = {
        nomComplet: fullname,
        telephone: phone,
        email,
        ville,
        entreprise: company,
        typesDeProjets: projectTypes.join(", "),
        valeur_chantier: valeurChantier,
        capacite_chantiers: capaciteChantiers,
        budget_investissement: budgetInvestissement,
        source: "amenagement",
        datetime,
      };

      // /api/submit-lead writes to Google Sheets and, server-side via
      // waitUntil, syncs to GHL too — no separate client call needed, and
      // nothing here can get cancelled by the router.push() navigation
      // right after, since it's awaited.
      try {
        await fetch("/api/submit-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...sheetPayload, isDisqualified: false }),
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
            headers: { "Content-Type": "application/json", ...(secret ? { Authorization: `Bearer ${secret}` } : {}) },
            body: JSON.stringify({
              name: fullname,
              phone,
              company,
              source: "amenagement",
              has_booked_call: false,
              notes: Object.entries(sheetPayload).map(([k, v]) => `${k}: ${v}`).join(" | "),
            }),
          });
        }
      } catch (err) {
        console.error(err);
      }

      // Lead now fires once on the thank-you page itself (guarded by the
      // pending flag below), not here — this used to call fbq('track',
      // 'Lead') directly, but that duplicated the signal once GTM's own
      // lead_conversion-triggered tag was also live, and still left
      // personal data (nom/phone/email/entreprise) sitting in the
      // thank-you page's URL, which the Meta Pixel sends to Meta as part
      // of every pageview. Handoff is now via sessionStorage instead.
      writeThankYouHandoff({
        nom: fullname,
        phone,
        email,
        entreprise: company,
        types: projectTypes.join(", "),
      });
      router.push("/thank-you-amenagement");
    };
    form?.addEventListener("submit", onSubmit);

    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
      stickyIo1?.disconnect();
      stickyIo2?.disconnect();
      form?.removeEventListener("submit", onSubmit);
      nextBtns.forEach((btn) => btn.removeEventListener("click", onStepNext));
      backBtns.forEach((btn) => btn.removeEventListener("click", onStepBack));
      phoneInputEl?.removeEventListener("input", onPhoneInput);
    };
  }, [router]);

  return null;
}
