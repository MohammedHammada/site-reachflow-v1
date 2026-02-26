import ScrollReveal from "@/components/animations/ScrollReveal";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  label,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  return (
    <ScrollReveal
      className={`${align === "center" ? "text-center" : "text-left"} ${className}`}
      style={{ marginBottom: 64 }}
    >
      {label && (
        <span className="inline-block text-[0.75rem] font-medium uppercase tracking-[0.15em] text-accent-primary" style={{ marginBottom: 16 }}>
          {label}
        </span>
      )}
      <h2 className="font-[family-name:var(--font-display)] font-bold text-[clamp(1.75rem,4vw,3rem)] leading-[1.1] tracking-[-0.03em] text-white" style={{ marginBottom: 16 }}>
        {title}
      </h2>
      {description && (
        <p className={`text-text-secondary text-base leading-[1.7] tracking-[-0.01em] ${align === "center" ? "max-w-xl mx-auto" : "max-w-lg"}`}>
          {description}
        </p>
      )}
    </ScrollReveal>
  );
}
