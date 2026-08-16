export const GENDERS = ["male", "female", "undisclosed"];

export function normalizeGender(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (GENDERS.includes(normalized)) return normalized;
  return "undisclosed";
}

/** For birthday card messages — use the provided recipient name exactly. */
export function messageGenderInstruction(gender, locale = "en", recipientName = "") {
  const nameRuleId = recipientName
    ? ` WAJIB sebut penerima dengan nama persis "${recipientName}". Jangan ganti, singkat, atau buat nama baru.`
    : " WAJIB gunakan nama penerima persis seperti diberikan. Jangan ganti atau buat nama baru.";
  const nameRuleEn = recipientName
    ? ` MUST address the recipient using the exact name "${recipientName}". Do not substitute, shorten, or invent a different name.`
    : " MUST use the exact recipient name provided. Do not substitute or invent a different name.";

  if (locale === "id") {
    if (gender === "male") {
      return `Jenis kelamin: laki-laki. Gunakan kata ganti dia (laki-laki) bila natural.${nameRuleId}`;
    }
    if (gender === "female") {
      return `Jenis kelamin: perempuan. Gunakan kata ganti dia (perempuan) bila natural.${nameRuleId}`;
    }
    return `Jenis kelamin: tidak ingin menyebutkan. Gunakan nama orang saja; hindari kata ganti gender dan stereotip nama.${nameRuleId}`;
  }

  if (gender === "male") {
    return `Recipient gender: male. Use he/him pronouns where natural.${nameRuleEn}`;
  }
  if (gender === "female") {
    return `Recipient gender: female. Use she/her pronouns where natural.${nameRuleEn}`;
  }
  return `Recipient gender: prefer not to disclose. Use they/them or the person's name only; avoid gendered pronouns, titles (sir/ma'am), or gendered name stereotypes.${nameRuleEn}`;
}

/** For lucky fill — AI invents funny form values including names. */
export function luckyGenderInstruction(gender, locale = "en") {
  if (locale === "id") {
    if (gender === "male") {
      return "Jenis kelamin: laki-laki. Pilih nama lucu maskulin saat membuat nama.";
    }
    if (gender === "female") {
      return "Jenis kelamin: perempuan. Pilih nama lucu feminin saat membuat nama.";
    }
    return "Jenis kelamin: tidak ingin menyebutkan. Pilih nama netral; hindari stereotip gender.";
  }

  if (gender === "male") {
    return "Recipient gender: male. Pick a traditionally masculine funny name when generating names.";
  }
  if (gender === "female") {
    return "Recipient gender: female. Pick a traditionally feminine funny name when generating names.";
  }
  return "Recipient gender: prefer not to disclose. Pick a gender-neutral funny name; avoid gendered stereotypes.";
}

/** @deprecated Use messageGenderInstruction or luckyGenderInstruction */
export function genderInstruction(gender, locale = "en") {
  return luckyGenderInstruction(gender, locale);
}
