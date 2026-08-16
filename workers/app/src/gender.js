export const GENDERS = ["male", "female", "undisclosed"];

export function normalizeGender(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (GENDERS.includes(normalized)) return normalized;
  return "undisclosed";
}

export function genderInstruction(gender, locale = "en") {
  if (locale === "id") {
    if (gender === "male") {
      return "Jenis kelamin: laki-laki. Gunakan kata ganti dia (laki-laki) bila natural dan pilih nama lucu maskulin saat membuat nama.";
    }
    if (gender === "female") {
      return "Jenis kelamin: perempuan. Gunakan kata ganti dia (perempuan) bila natural dan pilih nama lucu feminin saat membuat nama.";
    }
    return "Jenis kelamin: tidak ingin menyebutkan. Gunakan nama orang saja; hindari kata ganti gender dan stereotip nama.";
  }

  if (gender === "male") {
    return "Recipient gender: male. Use he/him pronouns where natural and pick a traditionally masculine funny name when generating names.";
  }
  if (gender === "female") {
    return "Recipient gender: female. Use she/her pronouns where natural and pick a traditionally feminine funny name when generating names.";
  }
  return "Recipient gender: prefer not to disclose. Use they/them or the person's name only; avoid gendered pronouns, titles (sir/ma'am), or gendered name stereotypes.";
}
