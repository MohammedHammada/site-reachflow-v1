import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/travaux" },
  title: "Nos Réalisations - Études de Cas & Projets",
  description:
    "Découvrez nos études de cas et projets réalisés en Media Buying, Production de Contenu et Développement Web. Résultats vérifiables et mesurables.",
  openGraph: {
    title: "Réalisations | Reachflow - Agence de Croissance Digitale",
    description: "Études de cas et projets réalisés. Des résultats concrets et mesurables pour nos clients au Maroc.",
    url: "https://reachflow.ma/travaux",
  },
};

export default function TravauxLayout({ children }: { children: React.ReactNode }) {
  return children;
}
