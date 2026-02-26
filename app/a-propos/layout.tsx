import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/a-propos" },
  title: "Notre ADN - L'Agence Reachflow",
  description:
    "Découvrez l'ADN de Reachflow : qualité sans compromis, vérité data-driven, transparence radicale. Une agence de croissance digitale obsédée par vos résultats.",
  openGraph: {
    title: "Notre ADN | Reachflow - Agence de Croissance Digitale",
    description: "Qualité sans compromis, vérité data-driven, transparence radicale. Découvrez ce qui nous anime.",
    url: "https://reachflow.ma/a-propos",
  },
};

export default function AProposLayout({ children }: { children: React.ReactNode }) {
  return children;
}
