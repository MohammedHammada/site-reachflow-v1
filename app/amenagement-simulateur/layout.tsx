import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Combien de chantiers laissez-vous partir ? — ReachFlow" },
  description:
    "Calculez en 30 secondes combien de MAD de chantiers vous perdez chaque mois, et d'où vient la fuite.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Combien de chantiers laissez-vous partir ? — ReachFlow",
    description:
      "Calculez en 30 secondes combien de MAD de chantiers vous perdez chaque mois, et d'où vient la fuite.",
  },
  twitter: {
    title: "Combien de chantiers laissez-vous partir ? — ReachFlow",
    description:
      "Calculez en 30 secondes combien de MAD de chantiers vous perdez chaque mois, et d'où vient la fuite.",
  },
};

export default function AmenagementSimulateurLayout({ children }: { children: React.ReactNode }) {
  return children;
}
