import { NextRequest, NextResponse } from "next/server";
import {
  addContactTag,
  buildCustomFields,
  createOpportunity,
  getPipelineStageId,
  splitName,
  toE164,
  updateContact,
  upsertContact,
  updateOpportunityStage,
} from "@/lib/ghl";

export const runtime = "nodejs";

const PIPELINE_NAME = "Acquisition Aménagement";
const STAGE_NEW = "Nouveau lead";
const STAGE_QUALIFIED = "Qualifié";

// /amenagement submits once (no separate "step 1 / step 2" like the
// simulator funnel), and the page has no disqualification path — so this
// route does the full upsert-contact + create-opportunity + mark-qualified
// flow in one shot, instead of the two-phase version described for a form
// that actually splits contact capture from qualification answers.
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  try {
    const nomComplet = String(body.nomComplet || "").trim();
    const telephone = String(body.telephone || "").trim();
    const entreprise = String(body.entreprise || "").trim();
    const ville = body.ville ? String(body.ville) : undefined;
    const typesDeProjets = body.typesDeProjets ? String(body.typesDeProjets) : undefined;
    const valeurChantier = body.valeur_chantier ? String(body.valeur_chantier) : undefined;
    const capaciteChantiers = body.capacite_chantiers ? String(body.capacite_chantiers) : undefined;
    const budgetPub = body.budget_investissement ? String(body.budget_investissement) : undefined;
    const decideur = body.decideur ? String(body.decideur) : undefined;
    const sourcePage = body.source ? String(body.source) : "amenagement";

    if (!nomComplet || !telephone) {
      return NextResponse.json({ ok: false, error: "missing name/phone" }, { status: 400 });
    }

    const { firstName, lastName } = splitName(nomComplet);
    const phone = toE164(telephone);

    const tags = ["lead-amenagement", "lp-amenagement"];
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "fbclid"]) {
      const v = body[key];
      if (v) tags.push(`${key}:${v}`);
    }

    const customFields = await buildCustomFields({
      Entreprise: entreprise,
      "Métier": typesDeProjets,
      "Valeur chantier": valeurChantier,
      "Capacité chantiers": capaciteChantiers,
      "Budget pub": budgetPub,
      "Décideur": decideur,
      "Qualifié": "oui",
      "Source page": sourcePage,
    });

    const { contactId } = await upsertContact({
      firstName,
      lastName,
      phone,
      city: ville,
      companyName: entreprise || undefined,
      tags,
      source: "LP Aménagement",
      customFields,
    });

    const { pipelineId, stageId: newStageId } = await getPipelineStageId(PIPELINE_NAME, STAGE_NEW);
    const { opportunityId } = await createOpportunity({
      pipelineId,
      pipelineStageId: newStageId,
      contactId,
      name: `${entreprise || "Sans entreprise"} — ${nomComplet}`,
    });

    // No disqualification path on /amenagement: every completed submission
    // is treated as qualified immediately.
    await updateContact(contactId, {
      customFields: await buildCustomFields({ "Qualifié": "oui" }),
    });
    await addContactTag(contactId, "qualifie");
    const { stageId: qualifiedStageId } = await getPipelineStageId(PIPELINE_NAME, STAGE_QUALIFIED);
    await updateOpportunityStage(opportunityId, pipelineId, qualifiedStageId);

    return NextResponse.json({ ok: true, contactId, opportunityId });
  } catch (err) {
    console.error("ghl-lead error:", err);
    // Never block the visitor's form flow over a GHL failure.
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
