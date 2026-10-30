/**
 * @OnlyCurrentDoc
 * Horizon Builds wishlist -> Google Sheets.
 *
 * Setup (one time):
 * 1. Create a Google Sheet (e.g. "Horizon Wishlist").
 * 2. In the sheet: Extensions > Apps Script. Replace the code with this file and save.
 * 3. Deploy > New deployment > type "Web app".
 *    Execute as: Me. Who has access: Anyone. Deploy and allow access.
 * 4. Copy the web app URL (ends in /exec) into src/data/wishlist.js.
 *
 * After editing this script, use Deploy > Manage deployments > Edit > New version,
 * so the same URL keeps working.
 */

const SHEET_NAME = 'Wishlist';
const HEADERS = ['Timestamp', 'Name', 'Email', 'App', 'Source page'];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function doPost(e) {
  const p = (e && e.parameter) || {};

  // Hidden field that only bots fill in. Pretend it worked.
  if (p.website) return reply({ ok: true });

  const name = clean(p.name, 100);
  const email = clean(p.email, 254).toLowerCase();
  const app = clean(p.app, 50) || 'general';
  const page = clean(p.page, 300);

  if (!name) return reply({ ok: false, error: 'missing_name' });
  if (!EMAIL_PATTERN.test(email)) return reply({ ok: false, error: 'invalid_email' });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheet();

    // Skip if this email is already on the list for this app.
    // Display values drop the leading apostrophe that noFormula adds, so compare the raw text.
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const rows = sheet.getRange(2, 3, lastRow - 1, 2).getDisplayValues();
      if (rows.some((row) => row[0] === email && row[1] === app)) {
        return reply({ ok: true, duplicate: true });
      }
    }

    sheet.appendRow([new Date(), noFormula(name), noFormula(email), noFormula(app), noFormula(page)]);
  } finally {
    lock.releaseLock();
  }
  return reply({ ok: true });
}

// Opening the /exec URL in a browser shows this, which is a quick way to check the deployment.
function doGet() {
  return reply({ ok: true, service: 'horizon-wishlist' });
}

function getSheet() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = book.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = book.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

function clean(value, max) {
  return String(value || '').replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max);
}

// Stop text like "=HYPERLINK(...)" from running as a spreadsheet formula.
function noFormula(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function reply(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
