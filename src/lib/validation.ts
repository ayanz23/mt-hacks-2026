import { z } from "zod";
import { MLH_FIELDS_ENABLED } from "@/config/features";

export const LEVELS_OF_STUDY = [
  "High School",
  "Freshman",
  "Sophomore",
  "Junior",
  "Senior",
  "Graduate / Masters",
  "PhD",
  "Other",
] as const;

export const EXPERIENCE_LEVELS = [
  "First hackathon",
  "Some experience (1-3 hackathons)",
  "Experienced (4+ hackathons)",
] as const;

export const ROLES = ["Technical", "Non-technical", "A bit of both"] as const;

export const HEAR_ABOUT_OPTIONS = [
  "Instagram",
  "A friend",
  "Email / listserv",
  "Flyer or poster",
  "MTC chapter / club event",
  "Other",
] as const;

export const GENDER_OPTIONS = [
  "Woman",
  "Man",
  "Non-binary",
  "Prefer to self-describe",
  "Prefer not to say",
] as const;

const baseSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("Enter a valid email"),
  school: z.string().trim().min(1, "School is required"),
  levelOfStudy: z.enum(LEVELS_OF_STUDY, {
    message: "Select your level of study",
  }),
  major: z.string().trim().optional(),
  graduationYear: z
    .string()
    .trim()
    .regex(/^\d{4}$/, "Enter a 4-digit year"),
  experienceLevel: z.enum(EXPERIENCE_LEVELS, {
    message: "Select your experience level",
  }),
  role: z.enum(ROLES, { message: "Select technical / non-technical" }),
  teammateRequest: z.string().trim().optional(),
  dietaryRestrictions: z.string().trim().optional(),
  linkedIn: z.string().trim().min(1, "LinkedIn profile is required"),
  links: z.string().trim().optional(),
  hearAbout: z.enum(HEAR_ABOUT_OPTIONS, {
    message: "Let us know how you heard about us",
  }),
});

const mlhSchema = z.object({
  isAdult: z.literal(true, {
    message: "You must confirm you are 18+ or contact organizers for a minor consent form",
  }),
  mlhCodeOfConduct: z.literal(true, {
    message: "You must agree to the MLH Code of Conduct",
  }),
  mlhDataSharing: z.literal(true, {
    message: "You must agree to the MLH data sharing terms to register",
  }),
  mlhEmails: z.boolean().optional(),
  gender: z.enum(GENDER_OPTIONS).optional(),
  raceEthnicity: z.string().trim().optional(),
  underrepresentedGroup: z.enum(["Yes", "No", "Prefer not to say"]).optional(),
});

export const registrationSchema = MLH_FIELDS_ENABLED
  ? baseSchema.merge(mlhSchema)
  : baseSchema;

export type RegistrationInput = z.infer<typeof registrationSchema>;
