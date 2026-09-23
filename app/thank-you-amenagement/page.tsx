"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

// Reuses the same confirmation-page style already established at
// /rejoindre-equipe/merci and /closer-hiring/merci on this site, adapted
// for the aménagement/rénovation LP.
//
// NOTE ACHRAF: there is no verified WhatsApp click-to-chat number anywhere
// in this codebase (checked — every existing "merci" page just promises a
// callback within 48h, none has a wa.me link). I did not invent one here.
// If you want an actual "Confirmer sur WhatsApp" button like the earlier
// draft had, give me the real business number and I'll wire a wa.me link.

function ThankYouContent() {
  const params = useSearchParams();
  const nom = params.get("nom")?.trim();
  const firstName = nom?.split(" ")[0];

  return (
    <div
      style={{
        background: "#ffffff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      {/* Logo */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, borderBottom: "1px solid #f3f4f6", padding: "0 20px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src="/logo.png" alt="Reachflow" style={{ height: "32px", width: "auto" }} />
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 480 }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(255,107,0,0.08)",
            border: "2px solid rgba(255,107,0,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 28px",
          }}
        >
          <CheckCircle2 size={38} color="#FF6B00" strokeWidth={1.5} />
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(1.75rem,4vw,2.25rem)",
            letterSpacing: "-0.03em",
            color: "#111827",
            marginBottom: 14,
          }}
        >
          {firstName ? `Merci ${firstName}, votre demande est reçue` : "Votre demande est reçue"}
        </h1>

        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.75,
            color: "#6b7280",
            marginBottom: 32,
          }}
        >
          On analyse chaque dossier sérieusement.
          <br />
          Un de nos experts vous contactera sous <strong style={{ color: "#374151" }}>24 à 48h sur WhatsApp</strong> pour fixer votre appel diagnostic.
        </p>

        <div
          style={{
            padding: "14px 20px",
            borderRadius: 12,
            background: "#f9fafb",
            border: "1px solid #f3f4f6",
            fontSize: "0.875rem",
            color: "#9ca3af",
            lineHeight: 1.6,
          }}
        >
          Pensez à garder votre WhatsApp accessible dans les prochains jours.
        </div>
      </div>
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
