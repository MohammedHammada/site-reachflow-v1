import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SiteShell from "@/components/layout/SiteShell";
import Analytics from "@/components/Analytics";
import GtmGate from "@/components/GtmGate";

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
    icon: "/icon.png",
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
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* Meta Pixel — inline in <head> so PageView fires as early as
            possible, independent of GTM (which loads lazily below). The
            matching GTM PageView tag must be paused/removed to avoid
            double counting — see perf summary. */}
        <Script id="meta-pixel-inline" strategy="beforeInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','2207138159844806');
fbq('track','PageView');`}
        </Script>
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
        <GtmGate />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2207138159844806&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* Skip navigation for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[99999] focus:bg-accent-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
        >
          Aller au contenu principal
        </a>
        <SiteShell>{children}</SiteShell>
        <Analytics />
        <Script
          src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
          strategy="lazyOnload"
          id="trustpilot-bootstrap"
        />
      </body>
    </html>
  );
}
