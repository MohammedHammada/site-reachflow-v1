// ReachFlow - Leads Simulateur Aménagement Handler
// Deploy: Extensions → Apps Script → Deploy → New deployment → Web app (Execute as: Me, Access: Anyone)

const SHEET_ID = '1ae6vIJ7oScKZeqe9qfiE4coUfYyVQpfvtJuPTT1wEj8';
const SHEET_NAME = 'Simulateur';

const HEADERS = [
  'Date', 'Lead ID', 'Métier', 'Devis / mois', 'Signés / 10',
  'Montant moyen (label)', 'Montant moyen (MAD)', 'Délai de réponse',
  'Part récupérable', 'Devis perdus / mois', 'MAD perdus / mois', 'MAD perdus / an',
  'Fuite principale', 'Nom', 'WhatsApp', 'Ville', 'Entreprise',
  'Budget pub', 'Décideur', 'Qualifié',
  'UTM Source', 'UTM Medium', 'UTM Campaign', 'fbclid',
  'Source page', 'Note', 'Dernière mise à jour'
];

function getSheet_() {
  let sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  if (!sheet) sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
  return sheet;
}

function rowFromData_(data, now) {
  return [
    data.datetime || now,
    data.lead_id || '',
    data.metier || '',
    data.devis_mois || '',
    data.signes_sur_10 || '',
    data.montant_moyen_label || '',
    data.montant_moyen_value || '',
    data.delai_reponse || '',
    data.part_recuperable || '',
    data.devis_perdus || '',
    data.mad_perdus_mois || '',
    data.mad_perdus_an || '',
    data.main_leak || '',
    data.nom || '',
    data.whatsapp || '',
    data.ville || '',
    data.entreprise || '',
    data.budget_pub || '',
    data.decideur || '',
    data.qualifie === true || data.qualifie === 'true' ? 'Oui' : data.qualifie === false || data.qualifie === 'false' ? 'Non' : '',
    data.utm_source || '',
    data.utm_medium || '',
    data.utm_campaign || '',
    data.fbclid || '',
    data.source_page || 'amenagement-simulateur',
    data.note || '',
    now
  ];
}

function doPost(e) {
  try {
    const data = e.postData.type === 'application/json'
      ? JSON.parse(e.postData.contents)
      : e.parameter;

    const sheet = getSheet_();
    const now = new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Casablanca' });
    const leadId = data.lead_id || '';

    let targetRow = -1;
    if (leadId) {
      const ids = sheet.getRange(2, 2, Math.max(sheet.getLastRow() - 1, 0), 1).getValues();
      for (let i = 0; i < ids.length; i++) {
        if (String(ids[i][0]) === String(leadId)) { targetRow = i + 2; break; }
      }
    }

    const newRow = rowFromData_(data, now);

    if (targetRow > 0) {
      const existing = sheet.getRange(targetRow, 1, 1, HEADERS.length).getValues()[0];
      const merged = newRow.map((v, i) => (v === '' || v === undefined) ? existing[i] : v);
      merged[0] = existing[0];
      merged[HEADERS.length - 1] = now;
      sheet.getRange(targetRow, 1, 1, HEADERS.length).setValues([merged]);
    } else {
      sheet.appendRow(newRow);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, lead_id: leadId }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('ReachFlow Simulateur Aménagement Endpoint - OK');
}
