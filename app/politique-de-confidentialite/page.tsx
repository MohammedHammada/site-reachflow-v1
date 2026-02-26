import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description: "Politique de confidentialité du site Reachflow.ma - Protection de vos données personnelles.",
};

export default function PolitiqueConfidentialite() {
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
          Politique de Confidentialité
        </h1>

        <div className="space-y-10 text-text-secondary text-[0.9375rem] leading-[1.8]">
          <div>
            <h2 className="text-white font-[family-name:var(--font-display)] font-semibold text-lg mb-4">
              1. Collecte des données
            </h2>
            <p>
              Lorsque vous utilisez le formulaire de contact sur notre site, nous collectons les
              informations suivantes :
            </p>
            <ul className="mt-3 space-y-1 list-disc list-inside">
              <li>Nom complet</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Nom de l&apos;entreprise (optionnel)</li>
              <li>Service souhaité</li>
              <li>Message</li>
            </ul>
          </div>

          <div>
            <h2 className="text-white font-[family-name:var(--font-display)] font-semibold text-lg mb-4">
              2. Utilisation des données
            </h2>
            <p>
              Les données collectées sont utilisées exclusivement pour :
            </p>
            <ul className="mt-3 space-y-1 list-disc list-inside">
              <li>Répondre à vos demandes de contact</li>
              <li>Vous envoyer des informations relatives à nos services</li>
              <li>Améliorer notre offre de services</li>
            </ul>
            <p className="mt-3">
              Vos données ne sont jamais vendues, louées ou partagées avec des tiers à des fins commerciales.
            </p>
          </div>

          <div>
            <h2 className="text-white font-[family-name:var(--font-display)] font-semibold text-lg mb-4">
              3. Durée de conservation
            </h2>
            <p>
              Vos données personnelles sont conservées pendant une durée maximale de 3 ans à compter de
              votre dernier contact avec Reachflow, conformément à la réglementation en vigueur.
            </p>
          </div>

          <div>
            <h2 className="text-white font-[family-name:var(--font-display)] font-semibold text-lg mb-4">
              4. Protection des données
            </h2>
            <p>
              Conformément à la Loi n° 09-08 relative à la protection des personnes physiques à l&apos;égard
              du traitement des données à caractère personnel au Maroc, nous mettons en œuvre toutes les
              mesures techniques et organisationnelles nécessaires pour protéger vos données.
            </p>
          </div>

          <div>
            <h2 className="text-white font-[family-name:var(--font-display)] font-semibold text-lg mb-4">
              5. Vos droits
            </h2>
            <p>
              Vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et d&apos;opposition
              concernant vos données personnelles. Pour exercer ces droits, contactez-nous à :
            </p>
            <p className="mt-3">
              <strong className="text-white">contact@reachflow.ma</strong>
            </p>
          </div>

          <div>
            <h2 className="text-white font-[family-name:var(--font-display)] font-semibold text-lg mb-4">
              6. Cookies
            </h2>
            <p>
              Ce site utilise des cookies techniques nécessaires à son fonctionnement. Des cookies
              analytiques peuvent être utilisés pour mesurer l&apos;audience du site. Vous pouvez configurer
              votre navigateur pour refuser les cookies.
            </p>
          </div>

          <div>
            <h2 className="text-white font-[family-name:var(--font-display)] font-semibold text-lg mb-4">
              7. Modification de la politique
            </h2>
            <p>
              Reachflow se réserve le droit de modifier cette politique de confidentialité à tout moment.
              Les modifications prendront effet dès leur publication sur le site.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
