import { NextResponse } from "next/server";

const FORMSUBMIT_URL = "https://formsubmit.co/ajax/reachflow.ma@gmail.com";

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60_000 });
    return false;
  }

  entry.count++;
  return entry.count > 5; // Max 5 submissions per minute per IP
}

function validateFormData(data: Record<string, unknown>): string | null {
  const required = ["name", "email", "phone", "service", "message"];
  for (const field of required) {
    if (!data[field] || typeof data[field] !== "string" || (data[field] as string).trim().length === 0) {
      return `Le champ ${field} est requis.`;
    }
  }

  const email = data.email as string;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Email invalide.";
  }

  const phone = data.phone as string;
  if (phone.length < 8 || phone.length > 20) {
    return "Numéro de téléphone invalide.";
  }

  const message = data.message as string;
  if (message.length > 5000) {
    return "Le message est trop long (max 5000 caractères).";
  }

  // Honeypot check
  if (data._honey && (data._honey as string).length > 0) {
    return null; // Silently reject bots but return success
  }

  return null;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { status: "error", message: "Trop de tentatives. Réessayez dans une minute." },
        { status: 429 }
      );
    }

    const data = await req.json();

    // Honeypot - bot detected, return fake success
    if (data._honey && data._honey.length > 0) {
      return NextResponse.json({ status: "success" });
    }

    const error = validateFormData(data);
    if (error) {
      return NextResponse.json({ status: "error", message: error }, { status: 400 });
    }

    // Send via FormSubmit (server-side for email obfuscation)
    const formSubmitRes = await fetch(FORMSUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company || "Non renseigné",
        service: data.service,
        message: data.message,
        _subject: `Nouveau lead ReachFlow - ${data.name}`,
        _template: "table",
        _captcha: "false",
      }),
    });

    if (!formSubmitRes.ok) {
      return NextResponse.json(
        { status: "error", message: "Erreur lors de l'envoi." },
        { status: 500 }
      );
    }

    return NextResponse.json({ status: "success" });
  } catch {
    return NextResponse.json(
      { status: "error", message: "Erreur serveur." },
      { status: 500 }
    );
  }
}
