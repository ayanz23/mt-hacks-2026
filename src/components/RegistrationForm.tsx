"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registrationSchema,
  type RegistrationInput,
  LEVELS_OF_STUDY,
  EXPERIENCE_LEVELS,
  ROLES,
  TSHIRT_SIZES,
  HEAR_ABOUT_OPTIONS,
  GENDER_OPTIONS,
} from "@/lib/validation";
import { MLH_FIELDS_ENABLED } from "@/config/features";

type FormValues = RegistrationInput & {
  isAdult?: boolean;
  mlhCodeOfConduct?: boolean;
  mlhDataSharing?: boolean;
  mlhEmails?: boolean;
  gender?: string;
  raceEthnicity?: string;
  underrepresentedGroup?: string;
};

function Field({
  label,
  htmlFor,
  error,
  children,
  hint,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={htmlFor} className="text-sm font-medium text-maroon-900">
        {label}
      </label>
      {hint && <p className="text-xs text-gray-500">{hint}</p>}
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

const inputClass =
  "rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-maroon-600 focus:outline-none focus:ring-1 focus:ring-maroon-600";

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(registrationSchema),
  });

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const resumeOptIn = watch("resumeOptIn");

  const onSubmit = async (values: FormValues) => {
    setStatus("idle");
    setErrorMessage("");

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      formData.append(key, String(value));
    });

    const file = resumeInputRef.current?.files?.[0];
    if (file) {
      formData.append("resume", file);
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-lg border border-maroon-100 bg-maroon-50 p-8 text-center">
        <h2 className="text-xl font-semibold text-maroon-800">You&apos;re registered! 🎉</h2>
        <p className="mt-2 text-sm text-gray-700">
          Thanks for signing up for MT-haCks. Keep an eye on your email for updates as we get
          closer to Nov 21st.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10" noValidate>
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-maroon-800 border-b border-maroon-100 pb-2">
          Personal info
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="First name" htmlFor="firstName" error={errors.firstName?.message}>
            <input id="firstName" className={inputClass} {...register("firstName")} />
          </Field>
          <Field label="Last name" htmlFor="lastName" error={errors.lastName?.message}>
            <input id="lastName" className={inputClass} {...register("lastName")} />
          </Field>
        </div>
        <Field label="Email" htmlFor="email" error={errors.email?.message}>
          <input id="email" type="email" className={inputClass} {...register("email")} />
        </Field>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-maroon-800 border-b border-maroon-100 pb-2">
          School
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="School" htmlFor="school" error={errors.school?.message}>
            <input id="school" className={inputClass} {...register("school")} />
          </Field>
          <Field
            label="Level of study"
            htmlFor="levelOfStudy"
            error={errors.levelOfStudy?.message}
          >
            <select id="levelOfStudy" className={inputClass} {...register("levelOfStudy")}>
              <option value="">Select one</option>
              {LEVELS_OF_STUDY.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Major" htmlFor="major" error={errors.major?.message} hint="Optional">
            <input id="major" className={inputClass} {...register("major")} />
          </Field>
          <Field
            label="Graduation year"
            htmlFor="graduationYear"
            error={errors.graduationYear?.message}
          >
            <input
              id="graduationYear"
              inputMode="numeric"
              placeholder="2027"
              className={inputClass}
              {...register("graduationYear")}
            />
          </Field>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-maroon-800 border-b border-maroon-100 pb-2">
          Hackathon experience
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Experience level"
            htmlFor="experienceLevel"
            error={errors.experienceLevel?.message}
          >
            <select id="experienceLevel" className={inputClass} {...register("experienceLevel")}>
              <option value="">Select one</option>
              {EXPERIENCE_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Role" htmlFor="role" error={errors.role?.message}>
            <select id="role" className={inputClass} {...register("role")}>
              <option value="">Select one</option>
              {ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Field
          label="Teammate request"
          htmlFor="teammateRequest"
          hint="Optional — names/emails of people you'd like to be teamed with. No teammates yet? Leave this blank and we'll match you at the start."
          error={errors.teammateRequest?.message}
        >
          <textarea
            id="teammateRequest"
            rows={2}
            className={inputClass}
            {...register("teammateRequest")}
          />
        </Field>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-maroon-800 border-b border-maroon-100 pb-2">
          Logistics
        </h2>
        <Field
          label="Dietary restrictions / allergies"
          htmlFor="dietaryRestrictions"
          hint="Optional — let us know so we can plan food accordingly."
          error={errors.dietaryRestrictions?.message}
        >
          <textarea
            id="dietaryRestrictions"
            rows={2}
            className={inputClass}
            {...register("dietaryRestrictions")}
          />
        </Field>
        <Field label="T-shirt size" htmlFor="tshirtSize" error={errors.tshirtSize?.message}>
          <select id="tshirtSize" className={inputClass} {...register("tshirtSize")}>
            <option value="">Select one</option>
            {TSHIRT_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </Field>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-maroon-800 border-b border-maroon-100 pb-2">
          Links &amp; resume
        </h2>
        <Field
          label="GitHub / LinkedIn / portfolio links"
          htmlFor="links"
          hint="Optional — one or more links, separated by commas."
          error={errors.links?.message}
        >
          <input id="links" className={inputClass} {...register("links")} />
        </Field>
        <div className="flex items-start gap-2">
          <input
            id="resumeOptIn"
            type="checkbox"
            className="mt-1"
            {...register("resumeOptIn")}
          />
          <label htmlFor="resumeOptIn" className="text-sm text-gray-700">
            Share my resume with MT-haCks sponsors for recruiting purposes
          </label>
        </div>
        {resumeOptIn && (
          <Field
            label="Upload resume"
            htmlFor="resume"
            hint="PDF or Word doc, max 5MB"
          >
            <input
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              ref={resumeInputRef}
              className="text-sm"
            />
          </Field>
        )}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-maroon-800 border-b border-maroon-100 pb-2">
          A bit more
        </h2>
        <Field label="How did you hear about us?" htmlFor="hearAbout" error={errors.hearAbout?.message}>
          <select id="hearAbout" className={inputClass} {...register("hearAbout")}>
            <option value="">Select one</option>
            {HEAR_ABOUT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>
      </section>

      {MLH_FIELDS_ENABLED && (
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-maroon-800 border-b border-maroon-100 pb-2">
            MLH agreements
          </h2>

          <div className="flex items-start gap-2">
            <input id="isAdult" type="checkbox" className="mt-1" {...register("isAdult")} />
            <label htmlFor="isAdult" className="text-sm text-gray-700">
              I confirm that I am 18 years of age or older.{" "}
              <span className="text-gray-500">
                (Under 18? Contact the organizers for a guardian consent form.)
              </span>
            </label>
          </div>
          {errors.isAdult && <p className="text-xs text-red-600">{errors.isAdult.message}</p>}

          <div className="flex items-start gap-2">
            <input
              id="mlhCodeOfConduct"
              type="checkbox"
              className="mt-1"
              {...register("mlhCodeOfConduct")}
            />
            <label htmlFor="mlhCodeOfConduct" className="text-sm text-gray-700">
              I have read and agree to the{" "}
              <a
                className="underline text-maroon-700"
                href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
                target="_blank"
                rel="noreferrer"
              >
                MLH Code of Conduct
              </a>
              .
            </label>
          </div>
          {errors.mlhCodeOfConduct && (
            <p className="text-xs text-red-600">{errors.mlhCodeOfConduct.message}</p>
          )}

          <div className="flex items-start gap-2">
            <input
              id="mlhDataSharing"
              type="checkbox"
              className="mt-1"
              {...register("mlhDataSharing")}
            />
            <label htmlFor="mlhDataSharing" className="text-sm text-gray-700">
              I authorize MT-haCks to share my registration information with Major League
              Hacking for event administration, ranking, and MLH administration in-line with the{" "}
              <a
                className="underline text-maroon-700"
                href="https://mlh.io/privacy"
                target="_blank"
                rel="noreferrer"
              >
                MLH Privacy Policy
              </a>
              . I further agree to the terms of both the{" "}
              <a
                className="underline text-maroon-700"
                href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md"
                target="_blank"
                rel="noreferrer"
              >
                MLH Contest Terms and Conditions
              </a>{" "}
              and the MLH Privacy Policy.
            </label>
          </div>
          {errors.mlhDataSharing && (
            <p className="text-xs text-red-600">{errors.mlhDataSharing.message}</p>
          )}

          <div className="flex items-start gap-2">
            <input id="mlhEmails" type="checkbox" className="mt-1" {...register("mlhEmails")} />
            <label htmlFor="mlhEmails" className="text-sm text-gray-700">
              I authorize MT-haCks and MLH to send me occasional emails about future events.
              (Optional)
            </label>
          </div>

          <p className="text-xs text-gray-500">
            The next questions are optional and used only in aggregate for MLH demographic
            reporting.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Gender" htmlFor="gender" hint="Optional">
              <select id="gender" className={inputClass} {...register("gender")}>
                <option value="">Prefer not to answer</option>
                {GENDER_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Race / ethnicity" htmlFor="raceEthnicity" hint="Optional">
              <input id="raceEthnicity" className={inputClass} {...register("raceEthnicity")} />
            </Field>
          </div>
          <Field
            label="Do you identify as part of an underrepresented group in tech?"
            htmlFor="underrepresentedGroup"
            hint="Optional"
          >
            <select
              id="underrepresentedGroup"
              className={inputClass}
              {...register("underrepresentedGroup")}
            >
              <option value="">Prefer not to answer</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </Field>
        </section>
      )}

      {status === "error" && (
        <p className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-maroon-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-maroon-800 disabled:opacity-60"
      >
        {isSubmitting ? "Submitting…" : "Register for MT-haCks"}
      </button>
    </form>
  );
}
