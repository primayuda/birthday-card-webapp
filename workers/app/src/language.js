export const LOCALES = ["en", "id"];

export function normalizeLocale(value) {
  return value === "id" ? "id" : "en";
}

export function messageLanguageInstruction(locale) {
  if (locale === "id") {
    return `Bahasa: WAJIB 100% Bahasa Indonesia. Tulis seluruh pesan dalam bahasa Indonesia santai dan ramah. DILARANG menggunakan kata atau frasa Inggris (termasuk "Happy Birthday", "Dear", "level up", "main quest", dll).`;
  }
  return "Language: English. Write the entire message in English.";
}

export function luckyLanguageInstruction(locale) {
  if (locale === "id") {
    return `Bahasa: WAJIB 100% Bahasa Indonesia. Semua nilai string JSON harus dalam bahasa Indonesia informal dan lucu. DILARANG menggunakan kata Inggris (contoh terlarang: "scuba diving", "Master of Mischief", "Disco Balls"). Contoh benar: hobby "selam agresif", adjective "jago bikin onar", pluralNouns "t-rex mini dan bola disko".`;
  }
  return "Language: English. All JSON string values must be in English.";
}

export function messageSystemPrompt(locale) {
  if (locale === "id") {
    return "Kamu menulis pesan kartu ulang tahun singkat, lucu, dan ramah keluarga HANYA dalam Bahasa Indonesia. Jangan pernah menulis dalam bahasa Inggris.";
  }
  return "You write short, witty, family-friendly birthday card messages.";
}

export function luckySystemPrompt(locale) {
  if (locale === "id") {
    return "Kamu menghasilkan nilai acak lucu untuk formulir kartu ulang tahun HANYA dalam Bahasa Indonesia. Balas dengan JSON saja. Jangan pernah menulis dalam bahasa Inggris.";
  }
  return "You generate silly birthday card form values and respond with JSON only.";
}

export function luckyPromptExample(locale) {
  if (locale === "id") {
    return `Contoh output valid:
{"name":"Pak Budi si Gila","age":59,"hobby":"selam agresif","adjective":"jago bikin onar","pluralNouns":"t-rex mini dan bola disko"}`;
  }
  return "";
}
