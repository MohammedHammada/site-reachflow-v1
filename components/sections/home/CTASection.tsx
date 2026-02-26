import FloatingOrbs from "@/components/layout/FloatingOrbs";
import MagneticButton from "@/components/ui/MagneticButton";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function CTASection() {
  return (
    <section className="relative section-padding overflow-hidden">
      <FloatingOrbs variant="cta" />
      <div className="absolute inset-0 grid-bg" />

      <div className="relative z-10 w-full flex flex-col items-center px-6 lg:px-12">
        <div className="flex flex-col items-center text-center" style={{ maxWidth: 600 }}>
          <ScrollReveal>
            <div className="flex flex-col items-center text-center">
              <h2 className="font-[family-name:var(--font-display)] font-bold text-[clamp(1.75rem,4vw,3rem)] leading-[1.1] tracking-[-0.03em]" style={{ marginBottom: 24 }}>
                Pr&ecirc;t &agrave; <span className="text-gradient">dominer</span> votre march&eacute; ?
              </h2>
              <p className="text-text-secondary text-[0.9375rem] leading-[1.7] max-w-md" style={{ marginBottom: 48 }}>
                Chaque jour sans strat&eacute;gie digitale est un jour offert &agrave; vos concurrents.
                Parlons de votre croissance.
              </p>
              <MagneticButton href="/contact" variant="primary">
                Parlons de votre projet
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
