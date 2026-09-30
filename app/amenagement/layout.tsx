import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "3 mois de chantiers en 90 jours — ReachFlow Aménagement" },
  description:
    "Garantie : 3 mois de chantiers réservés en 90 jours, ou on continue gratuitement. Diagnostic offert.",
  openGraph: {
    title: "3 mois de chantiers en 90 jours — ReachFlow Aménagement",
    description:
      "Garantie : 3 mois de chantiers réservés en 90 jours, ou on continue gratuitement. Diagnostic offert.",
  },
  twitter: {
    title: "3 mois de chantiers en 90 jours — ReachFlow Aménagement",
    description:
      "Garantie : 3 mois de chantiers réservés en 90 jours, ou on continue gratuitement. Diagnostic offert.",
  },
};

export default function AmenagementLayout({ children }: { children: React.ReactNode }) {
  return children;
}
