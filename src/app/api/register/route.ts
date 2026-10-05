import { NextRequest, NextResponse } from "next/server";
import { registrationSchema } from "@/lib/validation";
import { appendRegistration, type RegistrationRow } from "@/lib/googleSheets";
import { uploadResume } from "@/lib/googleDrive";
import { MLH_FIELDS_ENABLED } from "@/config/features";

const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

// `instanceof File` is unreliable across the runtimes this may run under (Node 18 has no File global).
function isUploadedFile(
  value: unknown
): value is { name: string; type: string; size: number; arrayBuffer: () => Promise<ArrayBuffer> } {
  return (
    typeof value === "object" &&
    value !== null &&
    "arrayBuffer" in value &&
    typeof (value as { arrayBuffer: unknown }).arrayBuffer === "function" &&
    "size" in value
  );
}

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

  const resumeFile = form.get("resume");
  if (!isUploadedFile(resumeFile) || resumeFile.size === 0) {
    return NextResponse.json({ error: "Resume is required" }, { status: 400 });
  }
  if (resumeFile.size > MAX_RESUME_BYTES) {
    return NextResponse.json({ error: "Resume file is too large (max 5MB)" }, { status: 400 });
  }
  if (!ALLOWED_RESUME_TYPES.has(resumeFile.type)) {
    return NextResponse.json(
      { error: "Resume must be a PDF or Word document" },
      { status: 400 }
    );
  }

  let resumeLink: string;
  try {
    const buffer = Buffer.from(await resumeFile.arrayBuffer());
    resumeLink = await uploadResume(
      buffer,
      `${data.firstName}_${data.lastName}_resume_${resumeFile.name}`,
      resumeFile.type
    );
  } catch (err) {
    console.error("Resume upload failed", err);
    return NextResponse.json(
      { error: "Resume upload failed. Please try again." },
      { status: 502 }
    );
  }

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
    "Resume Link": resumeLink,
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
