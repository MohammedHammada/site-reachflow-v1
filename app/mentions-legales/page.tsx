import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description: "Mentions légales du site Reachflow.ma - Agence de croissance digitale au Maroc.",
};

export default function MentionsLegales() {
  return (
    <section
      className="relative bg-bg-primary"
      style={{ paddingTop: "clamp(140px, 18vh, 180px)", paddingBottom: "clamp(80px, 10vh, 120px)" }}
    >
      <div className="absolute inset-0 grid-bg" />
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-16" style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1
          className="font-[family-name:var(--font-display)] font-bold text-white"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: 48, letterSpacing: "-0.02em" }}
        >
          Mentions Légales
        </h1>

        <div className="space-y-10 text-text-secondary text-[0.9375rem] leading-[1.8]">
          <div>
            <h2 className="text-white font-[family-name:var(--font-display)] font-semibold text-lg mb-4">
              1. Éditeur du site
            </h2>
            <p>
              Le site <strong className="text-white">reachflow.ma</strong> est édité par Reachflow, agence de croissance digitale.
            </p>
            <ul className="mt-3 space-y-1">
              <li>Raison sociale : Reachflow</li>
              <li>Email : contact@reachflow.ma</li>
              <li>Téléphone : +212 663 291 741</li>
              <li>Pays : Maroc</li>
            </ul>
          </div>

          <div>
            <h2 className="text-white font-[family-name:var(--font-display)] font-semibold text-lg mb-4">
              2. Hébergement
            </h2>
            <p>
              Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.
            </p>
          </div>

          <div>
            <h2 className="text-white font-[family-name:var(--font-display)] font-semibold text-lg mb-4">
              3. Propriété intellectuelle
            </h2>
            <p>
              L&apos;ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, vidéos, etc.)
              est la propriété exclusive de Reachflow, sauf mention contraire. Toute reproduction,
              représentation, modification, publication ou adaptation de tout ou partie des éléments du site
              est interdite sans autorisation écrite préalable.
            </p>
          </div>

          <div>
            <h2 className="text-white font-[family-name:var(--font-display)] font-semibold text-lg mb-4">
              4. Responsabilité
            </h2>
            <p>
              Reachflow s&apos;efforce de fournir des informations aussi précises que possible sur le site.
              Toutefois, Reachflow ne pourra être tenu responsable des omissions, des inexactitudes ou des
              carences dans la mise à jour des informations.
            </p>
          </div>

          <div>
            <h2 className="text-white font-[family-name:var(--font-display)] font-semibold text-lg mb-4">
              5. Droit applicable
            </h2>
            <p>
              Les présentes mentions légales sont régies par le droit marocain. En cas de litige, les
              tribunaux marocains seront seuls compétents.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
