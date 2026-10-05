// GoHighLevel (API v2) server-side client.
// Never import this from a client component — GHL_TOKEN must stay server-only.

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";

function headers() {
  const token = process.env.GHL_TOKEN;
  if (!token) throw new Error("GHL_TOKEN is not set");
  return {
    Authorization: `Bearer ${token}`,
    Version: GHL_VERSION,
    "Content-Type": "application/json",
  };
}

function locationId(): string {
  const id = process.env.GHL_LOCATION_ID;
  if (!id) throw new Error("GHL_LOCATION_ID is not set");
  return id;
}

async function ghlFetch(path: string, init: RequestInit, retried = false): Promise<Response> {
  const res = await fetch(`${GHL_BASE}${path}`, { ...init, headers: { ...headers(), ...(init.headers || {}) } });
  if (!retried && (res.status === 429 || res.status >= 500)) {
    await new Promise((r) => setTimeout(r, 600));
    return ghlFetch(path, init, true);
  }
  return res;
}

function normalizeName(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

// Moroccan-friendly E.164 formatter: "0612345678" -> "+212612345678".
// Already-international numbers ("+212..." or "212...") pass through.
export function toE164(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.startsWith("212")) return `+${digits}`;
  if (digits.startsWith("0")) return `+212${digits.slice(1)}`;
  return `+212${digits}`;
}

export function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/);
  const firstName = parts[0] || "";
  const lastName = parts.slice(1).join(" ") || "";
  return { firstName, lastName };
}

// ---- Custom field ID cache (module-level; resets on cold start) ----
let customFieldCache: Map<string, string> | null = null;

export async function getCustomFieldMap(): Promise<Map<string, string>> {
  if (customFieldCache) return customFieldCache;
  const res = await ghlFetch(`/locations/${locationId()}/customFields`, { method: "GET" });
  if (!res.ok) throw new Error(`customFields fetch failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  const fields: Array<{ id: string; name: string }> = data.customFields || data.fields || [];
  const map = new Map<string, string>();
  for (const f of fields) {
    if (f?.name && f?.id) map.set(normalizeName(f.name), f.id);
  }
  customFieldCache = map;
  return map;
}

export async function buildCustomFields(
  values: Record<string, string | undefined>
): Promise<Array<{ id: string; field_value: string }>> {
  const map = await getCustomFieldMap();
  const out: Array<{ id: string; field_value: string }> = [];
  for (const [displayName, value] of Object.entries(values)) {
    if (!value) continue;
    const id = map.get(normalizeName(displayName));
    if (!id) {
      console.error(`GHL custom field not found for name "${displayName}" — check it exists in GHL with this exact display name.`);
      continue;
    }
    out.push({ id, field_value: value });
  }
  return out;
}

// ---- Pipeline/stage cache ----
let pipelineCache: { pipelineId: string; stages: Map<string, string> } | null = null;

async function getPipeline(pipelineName: string): Promise<{ pipelineId: string; stages: Map<string, string> }> {
  if (pipelineCache) return pipelineCache;
  const res = await ghlFetch(`/opportunities/pipelines?locationId=${locationId()}`, { method: "GET" });
  if (!res.ok) throw new Error(`pipelines fetch failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  const pipelines: Array<{ id: string; name: string; stages: Array<{ id: string; name: string }> }> = data.pipelines || [];
  const pipeline = pipelines.find((p) => normalizeName(p.name) === normalizeName(pipelineName));
  if (!pipeline) throw new Error(`GHL pipeline "${pipelineName}" not found`);
  const stages = new Map<string, string>();
  for (const s of pipeline.stages || []) stages.set(normalizeName(s.name), s.id);
  pipelineCache = { pipelineId: pipeline.id, stages };
  return pipelineCache;
}

export async function getPipelineStageId(pipelineName: string, stageName: string) {
  const { pipelineId, stages } = await getPipeline(pipelineName);
  const stageId = stages.get(normalizeName(stageName));
  if (!stageId) throw new Error(`GHL stage "${stageName}" not found in pipeline "${pipelineName}"`);
  return { pipelineId, stageId };
}

// ---- Contacts ----
export async function upsertContact(payload: {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  city?: string;
  companyName?: string;
  tags: string[];
  source: string;
  customFields: Array<{ id: string; field_value: string }>;
}): Promise<{ contactId: string }> {
  const res = await ghlFetch(`/contacts/upsert`, {
    method: "POST",
    body: JSON.stringify({
      locationId: locationId(),
      firstName: payload.firstName,
      lastName: payload.lastName,
      phone: payload.phone,
      email: payload.email,
      city: payload.city,
      companyName: payload.companyName,
      tags: payload.tags,
      source: payload.source,
      customFields: payload.customFields,
    }),
  });
  if (!res.ok) throw new Error(`contacts/upsert failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  const contactId = data.contact?.id || data.id;
  if (!contactId) throw new Error(`contacts/upsert: no contact id in response: ${JSON.stringify(data)}`);
  return { contactId };
}

export async function updateContact(
  contactId: string,
  payload: { customFields: Array<{ id: string; field_value: string }> }
) {
  const res = await ghlFetch(`/contacts/${contactId}`, {
    method: "PUT",
    body: JSON.stringify({ customFields: payload.customFields }),
  });
  if (!res.ok) throw new Error(`contacts update failed: ${res.status} ${await res.text()}`);
  return res.json();
}

export async function addContactTag(contactId: string, tag: string) {
  const res = await ghlFetch(`/contacts/${contactId}/tags`, {
    method: "POST",
    body: JSON.stringify({ tags: [tag] }),
  });
  if (!res.ok) throw new Error(`contacts/tags failed: ${res.status} ${await res.text()}`);
  return res.json();
}

// ---- Opportunities ----
export async function createOpportunity(payload: {
  pipelineId: string;
  pipelineStageId: string;
  contactId: string;
  name: string;
}): Promise<{ opportunityId: string }> {
  const res = await ghlFetch(`/opportunities/`, {
    method: "POST",
    body: JSON.stringify({
      locationId: locationId(),
      pipelineId: payload.pipelineId,
      pipelineStageId: payload.pipelineStageId,
      contactId: payload.contactId,
      status: "open",
      name: payload.name,
    }),
  });
  if (!res.ok) throw new Error(`opportunities create failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  const opportunityId = data.opportunity?.id || data.id;
  if (!opportunityId) throw new Error(`opportunities create: no id in response: ${JSON.stringify(data)}`);
  return { opportunityId };
}

export async function updateOpportunityStage(opportunityId: string, pipelineId: string, pipelineStageId: string) {
  const res = await ghlFetch(`/opportunities/${opportunityId}`, {
    method: "PUT",
    body: JSON.stringify({ pipelineId, pipelineStageId }),
  });
  if (!res.ok) throw new Error(`opportunities update failed: ${res.status} ${await res.text()}`);
  return res.json();
}

// ---- Full lead sync, shared by /api/submit-lead (server-side, via
// waitUntil) and /api/ghl-lead (kept as a thin manual-test endpoint). ----
const PIPELINE_NAME = "Acquisition Aménagement";
const STAGE_NEW = "Nouveau lead";

export async function syncLeadToGhl(body: Record<string, unknown>): Promise<{ contactId: string; opportunityId: string }> {
  const nomComplet = String(body.nomComplet || "").trim();
  const telephone = String(body.telephone || "").trim();
  const email = body.email ? String(body.email).trim() : undefined;
  const entreprise = String(body.entreprise || "").trim();
  const ville = body.ville ? String(body.ville) : undefined;
  const typesDeProjets = body.typesDeProjets ? String(body.typesDeProjets) : undefined;
  const valeurChantier = body.valeur_chantier ? String(body.valeur_chantier) : undefined;
  const capaciteChantiers = body.capacite_chantiers ? String(body.capacite_chantiers) : undefined;
  const budgetPub = body.budget_investissement ? String(body.budget_investissement) : undefined;
  const decideur = body.decideur ? String(body.decideur) : undefined;
  const sourcePage = body.source ? String(body.source) : "amenagement";

  if (!nomComplet || !telephone) {
    throw new Error(`syncLeadToGhl: missing name/phone (nomComplet="${nomComplet}", telephone="${telephone}")`);
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
    "Source page": sourcePage,
  });

  const { contactId } = await upsertContact({
    firstName,
    lastName,
    phone,
    email,
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

  return { contactId, opportunityId };
}

// ---- Notes ----
export async function createNote(contactId: string, body: string) {
  const res = await ghlFetch(`/contacts/${contactId}/notes`, {
    method: "POST",
    body: JSON.stringify({ body }),
  });
  if (!res.ok) throw new Error(`contacts/notes failed: ${res.status} ${await res.text()}`);
  return res.json();
}

// Finds an existing OPEN opportunity for this contact in the given
// pipeline, so repeated syncs for the same person never create a second
// opportunity.
export async function findOpenOpportunity(contactId: string, pipelineId: string): Promise<string | null> {
  const res = await ghlFetch(
    `/opportunities/search?location_id=${locationId()}&contact_id=${contactId}`,
    { method: "GET" }
  );
  if (!res.ok) throw new Error(`opportunities search failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  const opportunities: Array<{ id: string; pipelineId: string; status: string }> = data.opportunities || [];
  const match = opportunities.find((o) => o.pipelineId === pipelineId && o.status === "open");
  return match?.id || null;
}

// ---- Simulator ( /amenagement-simulateur ) lead sync — kept entirely
// separate from syncLeadToGhl() above so /amenagement's working path is
// never touched. Different tags, different custom-field mapping (the
// simulator's calculator fields have no /amenagement equivalent and go
// into a note instead), and upsert-by-phone de-dupes contact + opportunity
// across repeated calls for the same person. ----
export async function syncSimulatorLeadToGhl(body: Record<string, unknown>): Promise<{ contactId: string; opportunityId: string }> {
  const nom = String(body.nom || "").trim();
  const whatsapp = String(body.whatsapp || "").trim();
  const email = body.email ? String(body.email).trim() : undefined;
  const entreprise = String(body.entreprise || "").trim();
  const ville = body.ville ? String(body.ville) : undefined;
  const metier = body.metier ? String(body.metier) : undefined;
  const montantMoyenLabel = body.montant_moyen_label ? String(body.montant_moyen_label) : undefined;
  const budgetPub = body.budget_pub ? String(body.budget_pub) : undefined;
  const decideur = body.decideur ? String(body.decideur) : undefined;

  if (!nom || !whatsapp) {
    throw new Error(`syncSimulatorLeadToGhl: missing nom/whatsapp (nom="${nom}", whatsapp="${whatsapp}")`);
  }

  const { firstName, lastName } = splitName(nom);
  const phone = toE164(whatsapp);

  const tags = ["lead-amenagement", "lp-simulateur"];
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "fbclid"]) {
    const v = body[key];
    if (v) tags.push(`${key}:${v}`);
  }

  const customFields = await buildCustomFields({
    Entreprise: entreprise,
    "Métier": metier,
    "Valeur chantier": montantMoyenLabel,
    "Budget pub": budgetPub,
    "Décideur": decideur,
    "Source page": "amenagement-simulateur",
  });

  const { contactId } = await upsertContact({
    firstName,
    lastName,
    phone,
    email,
    city: ville,
    companyName: entreprise || undefined,
    tags,
    source: "LP Simulateur",
    customFields,
  });

  const { pipelineId, stageId: newStageId } = await getPipelineStageId(PIPELINE_NAME, STAGE_NEW);
  let opportunityId = await findOpenOpportunity(contactId, pipelineId);
  if (!opportunityId) {
    const created = await createOpportunity({
      pipelineId,
      pipelineStageId: newStageId,
      contactId,
      name: `${entreprise || "Sans entreprise"} — ${nom}`,
    });
    opportunityId = created.opportunityId;
  }

  const datetime = body.datetime ? String(body.datetime) : new Date().toLocaleString("fr-FR", { timeZone: "Africa/Casablanca" });
  const noteLines = [
    `Simulateur Chantiers Perdus — ${datetime}`,
    `Métier : ${metier || "—"} | Devis/mois : ${body.devis_mois ?? "—"} | Signés sur 10 : ${body.signes_sur_10 ?? "—"} | Montant moyen : ${montantMoyenLabel || "—"} | Délai de réponse : ${body.delai_reponse || "—"}`,
    `Devis perdus/mois : ${body.devis_perdus ?? "—"} | Perdu/mois : ${body.mad_perdus_mois ?? "—"} MAD | Perdu/an : ${body.mad_perdus_an ?? "—"} MAD | Principale fuite : ${body.main_leak || "—"}`,
    `Budget pub : ${budgetPub || "—"} | Décideur : ${decideur || "—"}`,
  ];
  try {
    await createNote(contactId, noteLines.join("\n"));
  } catch (err) {
    // Surfaced by the caller's catch/log — if this is a 401/403, it's a
    // Private Integration scope issue (needs "contacts.notes" write access).
    throw new Error(`createNote failed: ${err instanceof Error ? err.message : String(err)}`);
  }

  return { contactId, opportunityId };
}
