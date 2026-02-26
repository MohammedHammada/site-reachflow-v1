import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contactez-nous - Parlons de Votre Projet",
  description:
    "Contactez Reachflow pour discuter de votre projet digital. Media Buying, Production de Contenu, Développement Web. Réponse sous 24h.",
  openGraph: {
    title: "Contact | Reachflow - Agence de Croissance Digitale",
    description: "Parlons de votre projet. Contactez notre équipe pour une consultation gratuite.",
    url: "https://reachflow.ma/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
