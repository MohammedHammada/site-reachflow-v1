import { NextRequest, NextResponse } from "next/server";

const QUALIFIED_URL =
  "https://script.google.com/macros/s/AKfycbwjS8xZwKWeZ0s-vJ2Zt1a9S_04lsHODdzWEc7RkZPTeddn2pSP2LzIF4jBQVo6pmTZFw/exec";
const JUNK_URL =
  "https://script.google.com/macros/s/AKfycbx2ubYkSJMA_eH5uR0ewpcp5rcqP27MxLZvg6dLNVK2gPDeUDmEBi-bvlShY8gEQJ0u/exec";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { isDisqualified, ...payload } = body;

    const sheetUrl = isDisqualified ? JUNK_URL : QUALIFIED_URL;

    const params = new URLSearchParams();
    Object.entries(payload).forEach(([k, v]) => params.append(k, String(v)));

    await fetch(sheetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      redirect: "follow",
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("submit-lead error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
