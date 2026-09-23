export default function NonEligiblePage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FFFFFF", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", fontFamily: "Inter Tight, system-ui, sans-serif", color: "#0A0A0A" }}>
      {/* Logo */}
      <div style={{ marginBottom: "48px" }}>
        <img src="/logo.png" alt="Reachflow" style={{ height: "40px", width: "auto" }} />
      </div>

      {/* Card */}
      <div style={{ maxWidth: "520px", width: "100%", backgroundColor: "#fff", border: "1px solid rgba(10,10,10,0.10)", borderRadius: "24px", padding: "52px 44px", textAlign: "center", boxShadow: "0 30px 60px -20px rgba(10,10,10,0.12)" }}>
        {/* Icon */}
        <div style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "#F5F4F1", border: "1px solid rgba(10,10,10,0.10)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px" }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="#5A5A5A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 8v4" stroke="#5A5A5A" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="16" r="1" fill="#5A5A5A" />
          </svg>
        </div>

        <h1 style={{ fontSize: "clamp(24px,4vw,34px)", fontWeight: 700, textTransform: "uppercase", marginBottom: "16px", lineHeight: 1.1, color: "#0A0A0A" }}>
          Merci pour votre intérêt !
        </h1>

        <p style={{ fontSize: "17px", color: "#5A5A5A", lineHeight: 1.7, marginBottom: "28px" }}>
          Nous avons bien reçu votre demande. Notre équipe va l'étudier et reviendra vers vous très prochainement si elle correspond à nos disponibilités actuelles.
        </p>

        <p style={{ fontSize: "15px", color: "#8A8A8A", lineHeight: 1.6 }}>
          En attendant, n'hésitez pas à explorer notre site pour en savoir plus sur nos solutions.
        </p>
      </div>

      {/* Footer */}
      <p style={{ marginTop: "40px", fontSize: "13px", color: "#8A8A8A" }}>
        © 2026 Reachflow. Tous droits réservés.
      </p>
    </div>
  );
}
