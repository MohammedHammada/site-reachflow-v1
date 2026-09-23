"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";
import GrainOverlay from "./GrainOverlay";
import WhatsAppButton from "./WhatsAppButton";

const STANDALONE = ["/agences-etudes", "/merci", "/non-eligible", "/closer-hiring", "/closer-hiring-light", "/amenagement", "/thank-you-amenagement"];

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandalone = STANDALONE.some((r) => pathname.startsWith(r));

  if (isStandalone) return <>{children}</>;

  return (
    <>
      <CustomCursor />
      <GrainOverlay />
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
