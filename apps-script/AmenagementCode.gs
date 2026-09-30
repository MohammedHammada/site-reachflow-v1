// ReachFlow - Leads Aménagement Handler
// Deploy: Extensions → Apps Script → Deploy → New deployment → Web app (Execute as: Me, Access: Anyone)

const SHEET_ID = '1sWE3-NhNC3jKt1VTder0LgoRzDiZjPYCXB-NqS46YGo';
const SHEET_NAME = 'Aménagement';

function doPost(e) {
  try {
    const data = e.postData.type === 'application/json'
      ? JSON.parse(e.postData.contents)
      : e.parameter;

    let sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Date', 'Nom complet', 'Téléphone', 'Email', 'Entreprise',
        'Types de projets', 'Valeur chantier', 'Capacité chantiers', 'Source', 'Note'
      ]);
    }

    sheet.appendRow([
      data.datetime || new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Casablanca' }),
      data.nomComplet || '',
      data.telephone || '',
      data.email || '',
      data.entreprise || '',
      data.typesDeProjets || '',
      data.valeur_chantier || '',
      data.capacite_chantiers || '',
      data.source || 'amenagement',
      data.note || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('ReachFlow Aménagement Endpoint - OK');
}
