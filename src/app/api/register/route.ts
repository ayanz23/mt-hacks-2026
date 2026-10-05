import { NextRequest, NextResponse } from "next/server";
import { registrationSchema } from "@/lib/validation";
import { appendRegistration, type RegistrationRow } from "@/lib/googleSheets";
import { MLH_FIELDS_ENABLED } from "@/config/features";

export async function POST(request: NextRequest) {
  const form = await request.formData();

  const raw: Record<string, unknown> = {};
  for (const key of Array.from(form.keys())) {
    const value = form.get(key);
    if (typeof value === "string") {
      if (value === "true" || value === "false") {
        raw[key] = value === "true";
      } else {
        raw[key] = value;
      }
    }
  }

  const parsed = registrationSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const data = parsed.data;

  const mlh = MLH_FIELDS_ENABLED
    ? (data as typeof data & {
        isAdult: boolean;
        mlhCodeOfConduct: boolean;
        mlhDataSharing: boolean;
        mlhEmails?: boolean;
        gender?: string;
        raceEthnicity?: string;
        underrepresentedGroup?: string;
      })
    : null;

  const row: RegistrationRow = {
    Timestamp: new Date().toISOString(),
    "First Name": data.firstName,
    "Last Name": data.lastName,
    Email: data.email,
    School: data.school,
    "Level of Study": data.levelOfStudy,
    Major: data.major ?? "",
    "Graduation Year": data.graduationYear,
    "Experience Level": data.experienceLevel,
    Role: data.role,
    "Teammate Request": data.teammateRequest ?? "",
    "Dietary Restrictions / Allergies": data.dietaryRestrictions ?? "",
    LinkedIn: data.linkedIn,
    "Other Links": data.links ?? "",
    "How They Heard About Us": data.hearAbout,
    "Resume Link": data.resumeLink,
    "18+": mlh ? (mlh.isAdult ? "Yes" : "No") : "",
    "MLH Code of Conduct": mlh ? (mlh.mlhCodeOfConduct ? "Agreed" : "") : "",
    "MLH Data Sharing": mlh ? (mlh.mlhDataSharing ? "Agreed" : "") : "",
    "MLH Emails Opt-In": mlh ? (mlh.mlhEmails ? "Yes" : "No") : "",
    Gender: mlh?.gender ?? "",
    "Race / Ethnicity": mlh?.raceEthnicity ?? "",
    "Underrepresented Group": mlh?.underrepresentedGroup ?? "",
  };

  try {
    await appendRegistration(row);
  } catch (err) {
    console.error("Failed to append registration to Google Sheet", err);
    return NextResponse.json(
      { error: "Could not save your registration right now. Please try again shortly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
