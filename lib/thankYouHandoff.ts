// Shared contract between /amenagement, /amenagement-simulateur, and
// /thank-you-amenagement: the two form pages write the visitor's data and a
// one-time "lead just submitted" flag to sessionStorage right before
// redirecting, instead of putting personal data (name/phone/email/company)
// in the thank-you page's URL (Meta Pixel sends the full page URL to Meta,
// so query-string PII would leak there). The thank-you page reads this,
// uses it for personalization, and fires exactly one Lead event if (and
// only if) the pending flag is present — a refresh or direct visit won't
// find it and won't re-fire.

const DATA_KEY = "rf_ty_lead_data";
const PENDING_KEY = "rf_ty_lead_pending";

export type ThankYouLeadData = {
  nom: string;
  phone: string;
  email: string;
  entreprise: string;
  types: string;
};

export function writeThankYouHandoff(data: ThankYouLeadData) {
  try {
    sessionStorage.setItem(DATA_KEY, JSON.stringify(data));
    sessionStorage.setItem(PENDING_KEY, "1");
  } catch {
    /* sessionStorage unavailable (private mode, etc.) — thank-you page
       just won't personalize or fire Lead; it never blocks navigation. */
  }
}

export function readThankYouHandoff(): ThankYouLeadData | null {
  try {
    const raw = sessionStorage.getItem(DATA_KEY);
    return raw ? (JSON.parse(raw) as ThankYouLeadData) : null;
  } catch {
    return null;
  }
}

// Returns true exactly once per redirect: true the first time the
// thank-you page checks after a real submission, false on every
// subsequent check (refresh, direct visit, back/forward).
export function consumeThankYouPendingFlag(): boolean {
  try {
    const pending = sessionStorage.getItem(PENDING_KEY) === "1";
    sessionStorage.removeItem(PENDING_KEY);
    return pending;
  } catch {
    return false;
  }
}
