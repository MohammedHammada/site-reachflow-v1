"use client";

import { useEffect, useRef } from "react";
import { Star } from "lucide-react";

declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (el: Element, replaceContent?: boolean) => void;
    };
  }
}

export default function TrustpilotWidget() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = () => {
      if (ref.current && window.Trustpilot) {
        window.Trustpilot.loadFromElement(ref.current, true);
      }
    };

    if (window.Trustpilot) {
      init();
    } else {
      const interval = setInterval(() => {
        if (window.Trustpilot) {
          init();
          clearInterval(interval);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div style={{ paddingTop: 32, paddingBottom: 32 }}>
      <div
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          padding: "28px 32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* CTA text */}
        <p
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "0.875rem",
            fontWeight: 500,
            letterSpacing: "0.02em",
            textAlign: "center",
            margin: 0,
          }}
        >
          Votre avis compte pour nous
        </p>

        {/* Stars + Trustpilot widget row */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* 5 green stars */}
          <div style={{ display: "flex", gap: 3 }}>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: 24,
                  height: 24,
                  background: "#00b67a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 3,
                }}
              >
                <Star size={14} fill="#fff" color="#fff" strokeWidth={0} />
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.12)" }} />

          {/* Trustpilot widget */}
          <div
            ref={ref}
            className="trustpilot-widget"
            data-locale="fr-FR"
            data-template-id="5419b6ffb0d04a076446a9af"
            data-businessunit-id="69a373a20ea9ad1c3a972a94"
            data-style-height="28px"
            data-style-width="180px"
            data-theme="dark"
          >
            <a
              href="https://fr.trustpilot.com/review/reachflow.ma"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#00b67a", fontWeight: 600, fontSize: "0.875rem", textDecoration: "none" }}
            >
              Trustpilot
            </a>
          </div>
        </div>

        {/* Review CTA button */}
        <a
          href="https://fr.trustpilot.com/evaluate/reachflow.ma"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 24px",
            borderRadius: 10,
            background: "rgba(0, 182, 122, 0.12)",
            border: "1px solid rgba(0, 182, 122, 0.25)",
            color: "#00b67a",
            fontSize: "0.8125rem",
            fontWeight: 600,
            textDecoration: "none",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0, 182, 122, 0.2)";
            e.currentTarget.style.borderColor = "rgba(0, 182, 122, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(0, 182, 122, 0.12)";
            e.currentTarget.style.borderColor = "rgba(0, 182, 122, 0.25)";
          }}
        >
          <Star size={14} fill="#00b67a" color="#00b67a" strokeWidth={0} />
          Donnez-nous votre avis
        </a>
      </div>
    </div>
  );
}
