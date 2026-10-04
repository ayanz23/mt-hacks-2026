import { google } from "googleapis";

function getCredentials() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!email || !rawKey) {
    throw new Error(
      "Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_PRIVATE_KEY env vars. See SETUP.md."
    );
  }

  // .env files store the key with literal \n escapes; convert back to real newlines.
  const privateKey = rawKey.replace(/\\n/g, "\n");

  return { email, privateKey };
}

export function getGoogleAuth(scopes: string[]) {
  const { email, privateKey } = getCredentials();
  return new google.auth.JWT({
    email,
    key: privateKey,
    scopes,
  });
}
