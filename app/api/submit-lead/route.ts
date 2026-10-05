import { NextRequest, NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";
import { syncLeadToGhl, syncSimulatorLeadToGhl } from "@/lib/ghl";

export const runtime = "nodejs";

const QUALIFIED_URL =
  "https://script.google.com/macros/s/AKfycbwjS8xZwKWeZ0s-vJ2Zt1a9S_04lsHODdzWEc7RkZPTeddn2pSP2LzIF4jBQVo6pmTZFw/exec";
const JUNK_URL =
  "https://script.google.com/macros/s/AKfycbx2ubYkSJMA_eH5uR0ewpcp5rcqP27MxLZvg6dLNVK2gPDeUDmEBi-bvlShY8gEQJ0u/exec";
const AMENAGEMENT_URL =
  "https://script.google.com/macros/s/AKfycbyeG2nwuAwDoekcnSyT7DTh_4YgKr6tHTANCarywAW450lYlnmaWXsGt467v-R6FaGDmg/exec";
const SIMULATEUR_URL =
  "https://script.google.com/macros/s/AKfycbx0HXb4gZbpApwVS2NCF7iysbIztP8aexO85VhB45jblGkbMJBMxZjcXlIJY-wcMK54/exec";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch (err) {
    console.error("submit-lead: invalid json", err);
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { isDisqualified, ...payload } = body;
  const source = String((payload as Record<string, unknown>).source || "");

  // Sheets write. Independent of GHL below: a GHL failure must never affect
  // this, and vice versa.
  try {
    const sheetUrl = source === "amenagement-simulateur"
      ? SIMULATEUR_URL
      : source.startsWith("amenagement")
      ? AMENAGEMENT_URL
      : isDisqualified
      ? JUNK_URL
      : QUALIFIED_URL;

    const params = new URLSearchParams();
    Object.entries(payload).forEach(([k, v]) => params.append(k, String(v)));

    await fetch(sheetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      redirect: "follow",
    });
  } catch (err) {
    console.error("submit-lead: Google Sheets write failed:", err);
  }

  // GHL sync — server-side, not tied to the browser connection. A plain
  // fire-and-forget fetch from the client can get cancelled mid-flight by
  // the page navigating to the thank-you page right after; running it here
  // with waitUntil keeps it alive past the response without making the
  // visitor wait for it.
  // /amenagement-simulateur has its own field mapping and tags (see
  // syncSimulatorLeadToGhl) — kept fully separate from syncLeadToGhl so
  // /amenagement's working path is never touched by this.
  if (source === "amenagement-simulateur") {
    waitUntil(
      syncSimulatorLeadToGhl(payload as Record<string, unknown>)
        .then(({ contactId, opportunityId }) => {
          console.log(`submit-lead -> GHL (simulateur) ok: contact=${contactId} opportunity=${opportunityId}`);
        })
        .catch((err) => {
          console.error("submit-lead -> GHL (simulateur) sync failed:", err instanceof Error ? err.message : err);
        })
    );
  } else if (source.startsWith("amenagement")) {
    waitUntil(
      syncLeadToGhl(payload as Record<string, unknown>)
        .then(({ contactId, opportunityId }) => {
          console.log(`submit-lead -> GHL ok: contact=${contactId} opportunity=${opportunityId}`);
        })
        .catch((err) => {
          console.error("submit-lead -> GHL sync failed:", err instanceof Error ? err.message : err);
        })
    );
  }

  return NextResponse.json({ ok: true });
}
