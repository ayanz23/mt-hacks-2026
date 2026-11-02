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
    <div className="field">
      <label htmlFor={htmlFor}>
        {label}
      </label>
      {hint && <p className="hint">{hint}</p>}
      {children}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(registrationSchema),
  });

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [resumeError, setResumeError] = useState("");
  const resumeInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (values: FormValues) => {
    setStatus("idle");
    setErrorMessage("");
    setResumeError("");

    const file = resumeInputRef.current?.files?.[0];
    if (!file) {
      setResumeError("Resume is required");
      return;
    }

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      formData.append(key, String(value));
    });
    formData.append("resume", file);

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
      <div className="panel success">
        <h2>Player 1 ready!</h2>
        <p>
          You&apos;re registered.
          Thanks for signing up for MT-haCks. Keep an eye on your email for updates as we get
          closer to Nov 21st.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="panel reg-form" noValidate>
      <section>
        <h2>
          1P info
        </h2>
        <div className="row">
          <Field label="First name" htmlFor="firstName" error={errors.firstName?.message}>
            <input id="firstName" {...register("firstName")} />
          </Field>
          <Field label="Last name" htmlFor="lastName" error={errors.lastName?.message}>
            <input id="lastName" {...register("lastName")} />
          </Field>
        </div>
        <Field label="Email" htmlFor="email" error={errors.email?.message}>
          <input id="email" type="email" {...register("email")} />
        </Field>
      </section>

      <section>
        <h2>
          School
        </h2>
        <div className="row">
          <Field label="School" htmlFor="school" error={errors.school?.message}>
            <input id="school" {...register("school")} />
          </Field>
          <Field
            label="Level of study"
            htmlFor="levelOfStudy"
            error={errors.levelOfStudy?.message}
          >
            <select id="levelOfStudy" {...register("levelOfStudy")}>
              <option value="">Select one</option>
              {LEVELS_OF_STUDY.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Major" htmlFor="major" error={errors.major?.message} hint="Optional">
            <input id="major" {...register("major")} />
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
             
              {...register("graduationYear")}
            />
          </Field>
        </div>
      </section>

      <section>
        <h2>
          XP
        </h2>
        <div className="row">
          <Field
            label="Experience level"
            htmlFor="experienceLevel"
            error={errors.experienceLevel?.message}
          >
            <select id="experienceLevel" {...register("experienceLevel")}>
              <option value="">Select one</option>
              {EXPERIENCE_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Role" htmlFor="role" error={errors.role?.message}>
            <select id="role" {...register("role")}>
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
           
            {...register("teammateRequest")}
          />
        </Field>
      </section>

      <section>
        <h2>
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
           
            {...register("dietaryRestrictions")}
          />
        </Field>
      </section>

      <section>
        <h2>
          Links &amp; resume
        </h2>
        <Field label="LinkedIn" htmlFor="linkedIn" error={errors.linkedIn?.message}>
          <input
            id="linkedIn"
            placeholder="linkedin.com/in/yourname"
           
            {...register("linkedIn")}
          />
        </Field>
        <Field
          label="GitHub / portfolio / other links"
          htmlFor="links"
          hint="Optional — one or more links, separated by commas."
          error={errors.links?.message}
        >
          <input id="links" {...register("links")} />
        </Field>
        <Field
          label="Upload resume"
          htmlFor="resume"
          hint="PDF or Word doc, max 5MB. Shared with MT-haCks sponsors for recruiting purposes."
          error={resumeError}
        >
          <input
            id="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            ref={resumeInputRef}
          />
        </Field>
      </section>

      <section>
        <h2>
          A bit more
        </h2>
        <Field label="How did you hear about us?" htmlFor="hearAbout" error={errors.hearAbout?.message}>
          <select id="hearAbout" {...register("hearAbout")}>
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
        <section>
          <h2>
            MLH agreements
          </h2>

          <div className="check">
            <input id="isAdult" type="checkbox" {...register("isAdult")} />
            <label htmlFor="isAdult">
              I confirm that I am 18 years of age or older.{" "}
              <span className="hint">
                (Under 18? Contact the organizers for a guardian consent form.)
              </span>
            </label>
          </div>
          {errors.isAdult && <p className="error">{errors.isAdult.message}</p>}

          <div className="check">
            <input
              id="mlhCodeOfConduct"
              type="checkbox"
             
              {...register("mlhCodeOfConduct")}
            />
            <label htmlFor="mlhCodeOfConduct">
              I have read and agree to the{" "}
              <a
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
            <p className="error">{errors.mlhCodeOfConduct.message}</p>
          )}

          <div className="check">
            <input
              id="mlhDataSharing"
              type="checkbox"
             
              {...register("mlhDataSharing")}
            />
            <label htmlFor="mlhDataSharing">
              I authorize MT-haCks to share my registration information with Major League
              Hacking for event administration, ranking, and MLH administration in-line with the{" "}
              <a
                href="https://mlh.io/privacy"
                target="_blank"
                rel="noreferrer"
              >
                MLH Privacy Policy
              </a>
              . I further agree to the terms of both the{" "}
              <a
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
            <p className="error">{errors.mlhDataSharing.message}</p>
          )}

          <div className="check">
            <input id="mlhEmails" type="checkbox" {...register("mlhEmails")} />
            <label htmlFor="mlhEmails">
              I authorize MT-haCks and MLH to send me occasional emails about future events.
              (Optional)
            </label>
          </div>

          <p className="hint">
            The next questions are optional and used only in aggregate for MLH demographic
            reporting.
          </p>
          <div className="row">
            <Field label="Gender" htmlFor="gender" hint="Optional">
              <select id="gender" {...register("gender")}>
                <option value="">Prefer not to answer</option>
                {GENDER_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Race / ethnicity" htmlFor="raceEthnicity" hint="Optional">
              <input id="raceEthnicity" {...register("raceEthnicity")} />
            </Field>
          </div>
          <Field
            label="Do you identify as part of an underrepresented group in tech?"
            htmlFor="underrepresentedGroup"
            hint="Optional"
          >
            <select
              id="underrepresentedGroup"
             
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
        <p className="form-error">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn wine big"
      >
        {isSubmitting ? "Submitting…" : "Register for MT-haCks"}
      </button>
    </form>
  );
}
