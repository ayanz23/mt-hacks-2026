const SHEET_TAB = "Registrations";

function doPost(e) {
  try {
    const props = PropertiesService.getScriptProperties();
    const payload = JSON.parse(e.postData.contents);

    if (!props.getProperty("SECRET") || payload.secret !== props.getProperty("SECRET")) {
      return respond({ ok: false, error: "Unauthorized" });
    }

    const folderId = props.getProperty("RESUME_FOLDER_ID");
    const resumeUrl = saveFile(payload.resume, folderId);
    const mlhScreenshotUrl = saveFile(payload.mlhScreenshot, folderId);
    const row = Object.assign({}, payload.row, {
      "Resume Link": resumeUrl,
      "MLH Confirmation Screenshot": mlhScreenshotUrl,
    });
    appendRow(payload.columns, row);

    return respond({ ok: true });
  } catch (err) {
    console.error(err);
    return respond({ ok: false, error: String(err) });
  }
}

function saveFile(file, folderId) {
  const bytes = Utilities.base64Decode(file.base64);
  const blob = Utilities.newBlob(bytes, file.mimeType, file.name);
  return DriveApp.getFolderById(folderId).createFile(blob).getUrl();
}

function appendRow(columns, row) {
  // Two first-time submissions at once must not both write the header row.
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName(SHEET_TAB) || spreadsheet.insertSheet(SHEET_TAB);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(columns);
    }
    sheet.appendRow(columns.map((column) => asPlainText(row[column])));
  } finally {
    lock.releaseLock();
  }
}

// Registrants type these values, so a leading "=" must not run as a spreadsheet formula.
function asPlainText(value) {
  const text = value === undefined || value === null ? "" : String(value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function respond(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON
  );
}
