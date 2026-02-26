export default function FloatingOrbs({ variant = "hero" }: { variant?: "hero" | "cta" }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="orb orb-purple"
        style={{
          width: variant === "hero" ? "600px" : "400px",
          height: variant === "hero" ? "600px" : "400px",
          top: variant === "hero" ? "-10%" : "10%",
          right: variant === "hero" ? "-10%" : "-5%",
        }}
      />
      <div
        className="orb orb-blue"
        style={{
          width: variant === "hero" ? "500px" : "350px",
          height: variant === "hero" ? "500px" : "350px",
          bottom: variant === "hero" ? "0%" : "5%",
          left: variant === "hero" ? "-5%" : "-5%",
        }}
      />
      {variant === "hero" && (
        <div
          className="orb orb-purple"
          style={{
            width: "300px",
            height: "300px",
            top: "50%",
            left: "30%",
            opacity: 0.5,
          }}
        />
      )}
    </div>
  );
}
