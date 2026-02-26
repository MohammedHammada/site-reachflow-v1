"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section
      className="relative flex items-center justify-center bg-bg-primary"
      style={{ minHeight: "100vh", padding: "clamp(100px, 15vh, 160px) 24px" }}
    >
      <div className="absolute inset-0 grid-bg" />
      <div className="relative z-10 text-center" style={{ maxWidth: 600 }}>
        <p
          className="font-[family-name:var(--font-display)] font-bold text-gradient"
          style={{ fontSize: "clamp(3rem, 10vw, 5rem)", lineHeight: 1 }}
        >
          Oups
        </p>
        <h1
          className="font-[family-name:var(--font-display)] font-bold text-white"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", marginTop: 16, marginBottom: 16 }}
        >
          Une erreur est survenue
        </h1>
        <p className="text-text-secondary text-base leading-relaxed" style={{ marginBottom: 32 }}>
          Quelque chose s&apos;est mal passé. Veuillez réessayer.
        </p>
        <button onClick={reset} className="btn-primary inline-flex items-center gap-2 font-medium">
          Réessayer
        </button>
      </div>
    </section>
  );
}
