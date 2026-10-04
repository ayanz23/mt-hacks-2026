import { google } from "googleapis";
import { Readable } from "stream";
import { getGoogleAuth } from "@/lib/googleAuth";

const SCOPES = ["https://www.googleapis.com/auth/drive"];

export async function uploadResume(
  buffer: Buffer,
  filename: string,
  mimeType: string
): Promise<string> {
  const folderId = process.env.GOOGLE_DRIVE_RESUME_FOLDER_ID;
  if (!folderId) {
    throw new Error("Missing GOOGLE_DRIVE_RESUME_FOLDER_ID env var. See SETUP.md.");
  }

  const auth = getGoogleAuth(SCOPES);
  const drive = google.drive({ version: "v3", auth });

  const res = await drive.files.create({
    requestBody: {
      name: filename,
      parents: [folderId],
    },
    media: {
      mimeType,
      body: Readable.from(buffer),
    },
    fields: "id, webViewLink",
  });

  if (!res.data.webViewLink) {
    throw new Error("Resume upload succeeded but Drive returned no link");
  }

  return res.data.webViewLink;
}
