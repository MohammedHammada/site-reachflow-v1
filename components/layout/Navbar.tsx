"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[9990] transition-all duration-500 ${
          scrolled
            ? "bg-bg-primary/80 backdrop-blur-xl border-b border-border-subtle"
            : "bg-transparent"
        }`}
      >
        <div className="container-site flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <Link href="/" className="relative z-10 flex-shrink-0" aria-label="Reachflow - Accueil">
            <svg className="sr-only" role="img" aria-label="Reachflow logo"><title>Reachflow</title></svg>
            <span className="text-lg font-semibold font-[family-name:var(--font-display)] tracking-[-0.02em] whitespace-nowrap">
              Reach<span className="text-gradient">flow</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link relative text-[0.875rem] font-medium tracking-[-0.01em] transition-colors duration-300 whitespace-nowrap ${
                  pathname === link.href
                    ? "text-white nav-link-active"
                    : "text-text-muted hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden lg:inline-flex btn-primary-sm flex-shrink-0"
          >
            Lancer votre projet
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Menu"
          >
            <span
              className={`w-5 h-px bg-white transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-[4px]" : ""
              }`}
            />
            <span
              className={`w-5 h-px bg-white transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-5 h-px bg-white transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-[4px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[9989] bg-bg-primary transition-all duration-500 lg:hidden flex flex-col items-center justify-center ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-7">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xl font-semibold font-[family-name:var(--font-display)] tracking-[-0.02em] transition-all duration-500 ${
                pathname === link.href ? "text-white" : "text-text-secondary hover:text-white"
              }`}
              style={{
                transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms",
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "translateY(0)" : "translateY(12px)",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-4 btn-primary"
            style={{
              transitionDelay: mobileOpen ? `${navLinks.length * 60}ms` : "0ms",
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0)" : "translateY(12px)",
            }}
          >
            Lancer votre projet
          </Link>
        </div>
      </div>
    </>
  );
}
