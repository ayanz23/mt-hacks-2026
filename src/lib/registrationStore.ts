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

// The Apps Script fills in "Resume Link" once it has saved the file to Drive.
export type RegistrationRow = Record<
  Exclude<(typeof REGISTRATION_COLUMNS)[number], "Resume Link">,
  string
>;

type Resume = {
  buffer: Buffer;
  name: string;
  mimeType: string;
};

const REQUEST_TIMEOUT_MS = 55_000;

export async function saveRegistration(row: RegistrationRow, resume: Resume) {
  const url = process.env.APPS_SCRIPT_URL;
  const secret = process.env.APPS_SCRIPT_SECRET;
  if (!url || !secret) {
    throw new Error("Missing APPS_SCRIPT_URL or APPS_SCRIPT_SECRET env vars. See SETUP.md.");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret,
      columns: REGISTRATION_COLUMNS,
      row,
      resume: {
        name: resume.name,
        mimeType: resume.mimeType,
        base64: resume.buffer.toString("base64"),
      },
    }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  // Apps Script answers 200 even when the script fails, and an HTML sign-in page if the
  // deployment isn't set to "Anyone", so success is only what the script itself reports.
  const result: { ok?: boolean; error?: string } = await response
    .json()
    .catch(() => ({ error: `Non-JSON response (HTTP ${response.status}). See SETUP.md.` }));

  if (!result.ok) {
    throw new Error(`Apps Script rejected the registration: ${result.error ?? "unknown error"}`);
  }
}
