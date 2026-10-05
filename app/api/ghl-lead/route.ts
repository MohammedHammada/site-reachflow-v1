import { NextRequest, NextResponse } from "next/server";
import { syncLeadToGhl } from "@/lib/ghl";

export const runtime = "nodejs";

// Production traffic no longer calls this route — /api/submit-lead runs
// syncLeadToGhl() server-side via waitUntil right after the Sheets write.
// Kept as a thin manual-test endpoint (curl this directly to debug GHL in
// isolation without touching the Sheet).
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  try {
    const { contactId, opportunityId } = await syncLeadToGhl(body);
    return NextResponse.json({ ok: true, contactId, opportunityId });
  } catch (err) {
    console.error("ghl-lead (manual test) error:", err instanceof Error ? err.message : err);
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : String(err) }, { status: 200 });
  }
}
