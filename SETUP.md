# Setup: Google Sheets + Drive backend

Registrations get appended to a Google Sheet, and opted-in resumes get uploaded to a Google
Drive folder, using a Google **service account** (not your personal Google login). You do this
part yourself once, in your own Google account — these are credentials for the app, not
something I can generate for you.

## 1. Create a Google Cloud project + service account

1. Go to [console.cloud.google.com](https://console.cloud.google.com) and create a new project
   (e.g. "mt-hacks-2026").
2. In **APIs & Services → Library**, enable:
   - **Google Sheets API**
   - **Google Drive API** (only needed if you want resume uploads)
3. In **APIs & Services → Credentials**, click **Create Credentials → Service account**. Give it
   any name (e.g. `mt-hacks-registration`). You don't need to grant it project-level roles.
4. Open the service account you just created → **Keys** tab → **Add Key → Create new key → JSON**.
   This downloads a JSON file — keep it private, never commit it.
5. From that JSON file, you need two values for `.env.local`:
   - `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` → `GOOGLE_PRIVATE_KEY` (keep the `\n` characters as-is, wrap the whole value
     in double quotes)

## 2. Create the Google Sheet

1. Create a new Google Sheet (any name, e.g. "MT-haCks Registrations").
2. Share it with the service account's email (the `client_email` from the JSON) as **Editor**.
3. Copy the Sheet ID out of its URL:
   `https://docs.google.com/spreadsheets/d/`**`THIS_PART`**`/edit` → `GOOGLE_SHEET_ID`.
4. The app will create a `Registrations` tab with headers automatically on first submission —
   you don't need to set up columns yourself.

## 3. (Optional) Create the Drive folder for resumes

Only needed if you want the resume upload feature to work.

1. Create a folder in Google Drive (e.g. "MT-haCks Resumes").
2. Share it with the same service account email as **Editor**.
3. Copy the folder ID out of its URL:
   `https://drive.google.com/drive/folders/`**`THIS_PART`** → `GOOGLE_DRIVE_RESUME_FOLDER_ID`.

If you skip this, leave `GOOGLE_DRIVE_RESUME_FOLDER_ID` blank — just don't check the resume
opt-in box when testing, since an upload attempt without a folder ID will fail.

## 4. Fill in `.env.local`

```bash
cp .env.example .env.local
```

Paste in the four values from above. `.env.local` is already git-ignored.

## 5. Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and submit a test registration — it should
show up as a new row in your Sheet within a few seconds.

## Deploying

This is a standard Next.js app — deploys cleanly to [Vercel](https://vercel.com). Add the same
four env vars in the project's Vercel settings (Environment Variables), making sure
`GOOGLE_PRIVATE_KEY` is pasted with the `\n` sequences intact.
