import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Votre carnet de chantiers plein pour 3 mois. Garanti. — ReachFlow" },
  description:
    "Garantie : 3 mois de chantiers réservés en 90 jours, ou on continue gratuitement. Diagnostic offert.",
  openGraph: {
    title: "Votre carnet de chantiers plein pour 3 mois. Garanti. — ReachFlow",
    description:
      "Garantie : 3 mois de chantiers réservés en 90 jours, ou on continue gratuitement. Diagnostic offert.",
  },
  twitter: {
    title: "Votre carnet de chantiers plein pour 3 mois. Garanti. — ReachFlow",
    description:
      "Garantie : 3 mois de chantiers réservés en 90 jours, ou on continue gratuitement. Diagnostic offert.",
  },
};

export default function AmenagementLayout({ children }: { children: React.ReactNode }) {
  return children;
}
