export const GENDERS = ["male", "female", "undisclosed"];

export function normalizeGender(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (GENDERS.includes(normalized)) return normalized;
  return "undisclosed";
}

export function genderInstruction(gender) {
  if (gender === "male") {
    return "Recipient gender: male. Use he/him pronouns where natural and pick a traditionally masculine funny name when generating names.";
  }
  if (gender === "female") {
    return "Recipient gender: female. Use she/her pronouns where natural and pick a traditionally feminine funny name when generating names.";
  }
  return "Recipient gender: prefer not to disclose. Use they/them or the person's name only; avoid gendered pronouns, titles (sir/ma'am), or gendered name stereotypes.";
}
