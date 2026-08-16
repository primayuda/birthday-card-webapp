export type Gender = "male" | "female" | "undisclosed";

export const GENDER_VALUES: Gender[] = ["male", "female", "undisclosed"];

export function normalizeGender(value: string | undefined): Gender {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (normalized === "male" || normalized === "female" || normalized === "undisclosed") {
    return normalized;
  }
  return "undisclosed";
}

export function genderPromptLine(gender: Gender): string {
  if (gender === "male") {
    return "Recipient gender: male — use he/him pronouns where natural.";
  }
  if (gender === "female") {
    return "Recipient gender: female — use she/her pronouns where natural.";
  }
  return "Recipient gender: prefer not to disclose — use they/them or the person's name; avoid gendered pronouns or titles.";
}
