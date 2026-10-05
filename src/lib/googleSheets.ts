import { google } from "googleapis";
import { getGoogleAuth } from "@/lib/googleAuth";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const SHEET_TAB = "Registrations";

export const REGISTRATION_COLUMNS = [
  "Timestamp",
  "First Name",
  "Last Name",
  "Email",
  "School",
  "Level of Study",
  "Major",
  "Graduation Year",
  "Experience Level",
  "Role",
  "Teammate Request",
  "Dietary Restrictions / Allergies",
  "LinkedIn",
  "Other Links",
  "How They Heard About Us",
  "Resume Link",
  "18+",
  "MLH Code of Conduct",
  "MLH Data Sharing",
  "MLH Emails Opt-In",
  "Gender",
  "Race / Ethnicity",
  "Underrepresented Group",
] as const;

export type RegistrationRow = Record<(typeof REGISTRATION_COLUMNS)[number], string>;

async function ensureSheetTabExists(sheetId: string) {
  const auth = getGoogleAuth(SCOPES);
  const sheets = google.sheets({ version: "v4", auth });

  const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
  const tabExists = spreadsheet.data.sheets?.some(
    (sheet) => sheet.properties?.title === SHEET_TAB
  );

  if (!tabExists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: sheetId,
      requestBody: {
        requests: [{ addSheet: { properties: { title: SHEET_TAB } } }],
      },
    });
  }
}

async function ensureHeaderRow(sheetId: string) {
  await ensureSheetTabExists(sheetId);

  const auth = getGoogleAuth(SCOPES);
  const sheets = google.sheets({ version: "v4", auth });

  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${SHEET_TAB}!A1:Z1`,
  });

  if (!existing.data.values || existing.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `${SHEET_TAB}!A1`,
      valueInputOption: "RAW",
      requestBody: { values: [[...REGISTRATION_COLUMNS]] },
    });
  }
}

export async function appendRegistration(row: RegistrationRow) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) {
    throw new Error("Missing GOOGLE_SHEET_ID env var. See SETUP.md.");
  }

  await ensureHeaderRow(sheetId);

  const auth = getGoogleAuth(SCOPES);
  const sheets = google.sheets({ version: "v4", auth });

  const values = [REGISTRATION_COLUMNS.map((col) => row[col] ?? "")];

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `${SHEET_TAB}!A1`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values },
  });
}
