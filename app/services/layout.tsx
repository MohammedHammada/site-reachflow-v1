import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "Nos Services - Media Buying, Contenu & Web",
  description:
    "Découvrez nos services : Media Buying (Meta, Google, TikTok), Production de Contenu premium, et Développement Web sur mesure. Agence digitale au Maroc.",
  openGraph: {
    title: "Services | Reachflow - Agence de Croissance Digitale",
    description: "Media Buying, Production de Contenu, Développement Web. Des services Full-Cycle pour votre croissance digitale au Maroc.",
    url: "https://reachflow.ma/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
