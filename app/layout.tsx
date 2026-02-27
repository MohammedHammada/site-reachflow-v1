import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";
import GrainOverlay from "@/components/layout/GrainOverlay";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import Analytics from "@/components/Analytics";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.reachflow.ma"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Reachflow | Agence de Croissance Digitale au Maroc",
    template: "%s | Reachflow",
  },
  description:
    "Agence de croissance digitale Full-Cycle au Maroc. Media Buying, Production de Contenu, D\u00e9veloppement Web. Votre croissance, notre obsession.",
  keywords: [
    "agence digitale maroc",
    "media buying maroc",
    "production contenu maroc",
    "d\u00e9veloppement web maroc",
    "agence marketing maroc",
    "reachflow",
  ],
  openGraph: {
    title: "Reachflow | Agence de Croissance Digitale au Maroc",
    description:
      "Agence de croissance digitale Full-Cycle. Media Buying, Production de Contenu, D\u00e9veloppement Web.",
    url: "https://www.reachflow.ma",
    siteName: "Reachflow",
    locale: "fr_MA",
    type: "website",
    images: [
      {
        url: "https://www.reachflow.ma/og-image.png",
        width: 1200,
        height: 630,
        alt: "Reachflow - Agence de Croissance Digitale au Maroc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reachflow | Agence de Croissance Digitale",
    description:
      "Agence de croissance digitale Full-Cycle au Maroc.",
    images: ["https://www.reachflow.ma/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Reachflow",
              url: "https://www.reachflow.ma",
              logo: "https://www.reachflow.ma/og-image.png",
              description: "Agence de croissance digitale Full-Cycle au Maroc. Media Buying, Production de Contenu, Développement Web.",
              email: "contact@reachflow.ma",
              telephone: "+212663291741",
              address: {
                "@type": "PostalAddress",
                addressCountry: "MA",
              },
              sameAs: [
                "https://www.instagram.com/reachflow.ma",
                "https://www.facebook.com/profile.php?id=61571066158000",
                "https://www.linkedin.com/in/reachflow-agency-4952953b3/",
              ],
              serviceType: ["Media Buying", "Production de Contenu", "Développement Web"],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "27",
                bestRating: "5",
                worstRating: "1",
              },
              review: [
                {
                  "@type": "Review",
                  author: { "@type": "Person", name: "Yassine B." },
                  reviewRating: { "@type": "Rating", ratingValue: "5" },
                  reviewBody: "Équipe très réactive et résultats concrets sur nos campagnes Meta Ads. ROAS x3 en 2 mois.",
                },
                {
                  "@type": "Review",
                  author: { "@type": "Person", name: "Sara M." },
                  reviewRating: { "@type": "Rating", ratingValue: "5" },
                  reviewBody: "Reachflow a transformé notre présence digitale. Site web moderne et stratégie de contenu efficace.",
                },
              ],
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased font-[family-name:var(--font-body)]">
        {/* Skip navigation for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[99999] focus:bg-accent-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
        >
          Aller au contenu principal
        </a>
        <CustomCursor />
        <GrainOverlay />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
