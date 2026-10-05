# Setup

Two Google pieces, both done once in your own Google account:

- **Service account** — writes each registration as a row in a Google Sheet.
- **OAuth client** — uploads resume files to a Google Drive folder as you. A service account
  can't do this on a personal Google account (it has no Drive storage quota), so resumes go
  through your own login instead.

## 1. Google Cloud project + APIs

1. Go to [console.cloud.google.com](https://console.cloud.google.com) and create a project
   (e.g. "mt-hacks-2026").
2. **APIs & Services → Library** → enable **Google Sheets API** and **Google Drive API**.

## 2. Service account (for the Sheet)

1. **APIs & Services → Credentials → Create Credentials → Service account**. Any name.
2. Open it → **Keys** → **Add Key → Create new key → JSON**. Keep this file private.
3. From the JSON, copy into `.env.local`:
   - `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` → `GOOGLE_PRIVATE_KEY` (keep the `\n` sequences, value in double quotes)
4. Create a Google Sheet, **Share** it with the service account's email as **Editor**, and copy
   its ID from the URL (`/spreadsheets/d/THIS_PART/edit`) → `GOOGLE_SHEET_ID`.

The app creates a `Registrations` tab with headers on the first submission.

## 3. OAuth client (for resume uploads)

1. **APIs & Services → OAuth consent screen**: user type **External**, fill in an app name and
   your email. Under **Audience / Test users**, leave it alone, then click **Publish app**.
   Publishing matters: while the app is in "Testing", Google expires the refresh token after 7
   days. The Drive scope used here is non-sensitive, so publishing doesn't need verification.
2. **APIs & Services → Credentials → Create Credentials → OAuth client ID** → application type
   **Desktop app** → create. Copy the client ID and secret into `.env.local`:
   - `GOOGLE_OAUTH_CLIENT_ID`
   - `GOOGLE_OAUTH_CLIENT_SECRET`
3. In your Google Drive, create a folder (e.g. "MT-haCks Resumes") and copy its ID from the URL
   (`/drive/folders/THIS_PART`) → `GOOGLE_DRIVE_RESUME_FOLDER_ID`. Share the folder with the
   organizers who need to read resumes.
4. Authorize once:
   ```bash
   node scripts/get-drive-token.mjs
   ```
   A browser opens — sign in with the Google account that owns the folder and click Allow. The
   script writes `GOOGLE_OAUTH_REFRESH_TOKEN` into `.env.local` for you.

## 4. Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and submit a test registration. It should
show up as a new row in the Sheet, with the resume file in the Drive folder.

## Deploying

Standard Next.js app, deploys cleanly to [Vercel](https://vercel.com). Add every variable from
`.env.example` to the project's Environment Variables, keeping `GOOGLE_PRIVATE_KEY` with its
`\n` sequences intact.
