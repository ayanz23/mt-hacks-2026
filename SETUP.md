# Setup

Registrations go through a small Google Apps Script attached to the Sheet. It runs as your Google
account, adds a row for each registration, and saves each resume to a Drive folder. It needs no
Google Cloud project and no billing.

## 1. Create the resume folder

In your Google Drive, create a folder (e.g. "MT-haCks Resumes") and copy its ID from the URL
(`/drive/folders/THIS_PART`). Share the folder with the organizers who need to read resumes.

## 2. Add the script

1. Open your registration Sheet, then **Extensions → Apps Script**.
2. Replace everything in `Code.gs` with the contents of
   [`scripts/apps-script.gs`](./scripts/apps-script.gs), then save.
3. Under **Project Settings → Script Properties**, add:
   - `RESUME_FOLDER_ID`: the folder ID from step 1
   - `SECRET`: the value of `APPS_SCRIPT_SECRET` in `.env.local` (generate one with
     `openssl rand -hex 32` if it's empty)

## 3. Deploy it

1. **Deploy → New deployment**, then click the gear icon and choose **Web app**.
2. Set **Execute as** to **Me** and **Who has access** to **Anyone**.

   "Anyone" lets the site reach the script without a Google login. The `SECRET` is what keeps
   everyone else out, so never commit or share it.
3. Click **Deploy** and approve access with the account that owns the Sheet and folder. Google
   warns that the app isn't verified because it's your own script: choose **Advanced**, then
   **Go to (project name)**. Google describes the access as all of your Drive, because that's how
   it labels scripts that use `DriveApp`. This script only writes to the folder above.
4. Copy the **Web app URL** into `.env.local` as `APPS_SCRIPT_URL`.

If you edit the script later, publish it with **Deploy → Manage deployments → Edit → New version**.
Saving alone doesn't change what the live URL runs.

## 4. Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and submit a test registration. It should
show up as a new row in a `Registrations` tab, with the resume file in the Drive folder. If it
fails, the terminal running `npm run dev` shows why, and so does **Executions** in Apps Script.

## Deploying

Standard Next.js app, deploys cleanly to [Vercel](https://vercel.com). Add `APPS_SCRIPT_URL` and
`APPS_SCRIPT_SECRET` to the project's Environment Variables.
