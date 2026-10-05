// One-time: authorizes this app to upload resumes to your Google Drive and saves the
// refresh token into .env.local. Run with: node scripts/get-drive-token.mjs
import fs from "node:fs";
import http from "node:http";
import { execFile } from "node:child_process";
import { google } from "googleapis";

const ENV_PATH = new URL("../.env.local", import.meta.url).pathname;
const PORT = 53682;
const REDIRECT_URI = `http://localhost:${PORT}/oauth2callback`;
const SCOPE = ["https://www.googleapis.com/auth/drive.file"];

function readEnv() {
  const env = {};
  for (const line of fs.readFileSync(ENV_PATH, "utf8").split("\n")) {
    const match = line.match(/^([A-Z_]+)=(.*)$/);
    if (match) env[match[1]] = match[2].replace(/^"(.*)"$/, "$1");
  }
  return env;
}

function saveRefreshToken(token) {
  const lines = fs.readFileSync(ENV_PATH, "utf8").split("\n");
  const key = "GOOGLE_OAUTH_REFRESH_TOKEN";
  const idx = lines.findIndex((l) => l.startsWith(`${key}=`));
  if (idx >= 0) lines[idx] = `${key}=${token}`;
  else lines.push(`${key}=${token}`);
  fs.writeFileSync(ENV_PATH, lines.join("\n"));
}

const env = readEnv();
if (!env.GOOGLE_OAUTH_CLIENT_ID || !env.GOOGLE_OAUTH_CLIENT_SECRET) {
  console.error("Set GOOGLE_OAUTH_CLIENT_ID and GOOGLE_OAUTH_CLIENT_SECRET in .env.local first.");
  process.exit(1);
}

const oauth2 = new google.auth.OAuth2(
  env.GOOGLE_OAUTH_CLIENT_ID,
  env.GOOGLE_OAUTH_CLIENT_SECRET,
  REDIRECT_URI
);
const authUrl = oauth2.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: SCOPE,
});

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT_URI);
  if (url.pathname !== "/oauth2callback") {
    res.writeHead(404).end();
    return;
  }
  const code = url.searchParams.get("code");
  try {
    const { tokens } = await oauth2.getToken(code);
    if (!tokens.refresh_token) {
      throw new Error("Google did not return a refresh token. Revoke the app at myaccount.google.com/permissions and retry.");
    }
    saveRefreshToken(tokens.refresh_token);
    res.end("Done. GOOGLE_OAUTH_REFRESH_TOKEN saved to .env.local — you can close this tab.");
    console.log("Saved GOOGLE_OAUTH_REFRESH_TOKEN to .env.local");
  } catch (err) {
    res.writeHead(500).end("Failed: " + err.message);
    console.error(err.message);
  } finally {
    server.close();
  }
});

server.listen(PORT, () => {
  console.log("Opening your browser to authorize Google Drive access...");
  console.log("If it doesn't open, visit:\n" + authUrl);
  execFile("open", [authUrl]);
});
