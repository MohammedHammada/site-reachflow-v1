"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

// GTM is excluded on /amenagement and /thank-you-amenagement: every GTM
// tag these two pages needed now has its own exception trigger, and the
// Meta Pixel on both is hard-coded inline in the root layout (PageView +,
// on the thank-you page, a guarded single Lead fire — see
// lib/thankYouHandoff.ts), so GTM does nothing there except cost
// performance. Every other route (including /amenagement-simulateur,
// which still relies on GTM for its own "simulator_result"/"qualified_lead"
// dataLayer events) keeps loading GTM exactly as before.
//
// This check runs client-side (usePathname) rather than via a
// request-time check (middleware + headers()) deliberately: a dynamic
// server-side check would force every route in the app to render
// dynamically instead of statically (headers()/cookies() are "Dynamic
// APIs" in the App Router and opt the whole route tree out of static
// generation), which would be a much larger regression than this fix is
// worth. The tradeoff: the <noscript> GTM fallback iframe (below) only
// renders once React has mounted, so it won't appear for the small number
// of visitors with JavaScript fully disabled, on any route — not just
// /amenagement. This is the same situation this page's traffic profile
// (Meta/Instagram in-app browser) doesn't experience anyway.
const EXCLUDED_PATHS = ["/amenagement", "/thank-you-amenagement"];

export default function GtmGate() {
  const pathname = usePathname();
  if (EXCLUDED_PATHS.includes(pathname)) return null;

  return (
    <>
      <Script id="google-tag-manager" strategy="lazyOnload">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MJSZV79S');`}
      </Script>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-MJSZV79S"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}
