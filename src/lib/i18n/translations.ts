import type { Locale } from "@/lib/i18n/locale";

const en = {
  meta: {
    title: "Birthday Bash Card Maker",
  },
  language: {
    label: "Language",
    en: "English",
    id: "Bahasa Indonesia",
    switchToEn: "Switch to English",
    switchToId: "Switch to Bahasa Indonesia",
  },
  theme: {
    light: "Light mode",
    dark: "Dark mode",
    switchToLight: "Switch to light mode",
    switchToDark: "Switch to dark mode",
  },
  header: {
    tagline: "Celebrate & Create",
    title: "Birthday Bash Card Maker",
    subtitle:
      "Fill in the details below — AI writes a fresh message for each card, with classic templates as backup.",
  },
  form: {
    title: "Card details",
    description: "Tell us about the birthday star and we'll do the rest.",
    name: "Name",
    namePlaceholder: "e.g. Alex",
    gender: "Gender",
    genderMale: "Male",
    genderFemale: "Female",
    genderUndisclosed: "Prefer not to disclose",
    age: "Age",
    agePlaceholder: "e.g. 30",
    hobby: "Hobby",
    hobbyPlaceholder: "e.g. baking",
    adjective: "Adjective",
    adjectivePlaceholder: "e.g. spectacular",
    pluralNouns: "Plural nouns",
    pluralNounsPlaceholder: "e.g. puppies, rainbows",
    lucky: "I'm feeling lucky",
    luckyLoading: "Getting lucky…",
    generateShort: "Generate card",
    generateLong: "Generate funny message",
    generating: "Generating…",
  },
  preview: {
    insideEmpty: "Inside your card",
    insideOne: "Inside your card",
    insideMany: "Your cards ({count})",
    empty:
      "Fill in the details and generate a message — it'll show up here like the inside of a real birthday card.",
    happyBirthday: "Happy Birthday!",
    forRecipient: "For {name}",
    footerWish: "Wishing you laughter, cake, and a year to remember!",
    footerCelebrate: "🎉 Celebrate big 🎉",
    copy: "Copy",
    copyTitle: "Copies plain text only",
    copied: "Copied!",
    shuffle: "Shuffle",
    shuffling: "Shuffling…",
    playSong: "Play song",
    playing: "Playing…",
    playSongAria: "Play Happy Birthday song",
    photoBy: "Photo by",
    onUnsplash: "on",
    unsplash: "Unsplash",
    fallbackDailyLimit: "Classic message — AI daily limit reached.",
    fallbackUnavailable: "Classic message — AI unavailable.",
  },
  footer: {
    tagline: "Made with too much cake and questionable humor.",
  },
} as const;

const id = {
  meta: {
    title: "Pembuat Kartu Ulang Tahun",
  },
  language: {
    label: "Bahasa",
    en: "English",
    id: "Bahasa Indonesia",
    switchToEn: "Ganti ke English",
    switchToId: "Ganti ke Bahasa Indonesia",
  },
  theme: {
    light: "Mode terang",
    dark: "Mode gelap",
    switchToLight: "Ganti ke mode terang",
    switchToDark: "Ganti ke mode gelap",
  },
  header: {
    tagline: "Rayakan & Berkarya",
    title: "Pembuat Kartu Ulang Tahun",
    subtitle:
      "Isi detail di bawah — AI menulis pesan baru untuk setiap kartu, dengan template klasik sebagai cadangan.",
  },
  form: {
    title: "Detail kartu",
    description: "Ceritakan tentang bintang ulang tahun, sisanya kami yang urus.",
    name: "Nama",
    namePlaceholder: "cth. Alex",
    gender: "Jenis kelamin",
    genderMale: "Laki-laki",
    genderFemale: "Perempuan",
    genderUndisclosed: "Tidak ingin menyebutkan",
    age: "Usia",
    agePlaceholder: "cth. 30",
    hobby: "Hobi",
    hobbyPlaceholder: "cth. baking",
    adjective: "Kata sifat",
    adjectivePlaceholder: "cth. spektakuler",
    pluralNouns: "Kata benda jamak",
    pluralNounsPlaceholder: "cth. anak anjing, pelangi",
    lucky: "Saya lagi beruntung",
    luckyLoading: "Mengisi otomatis…",
    generateShort: "Buat kartu",
    generateLong: "Buat pesan lucu",
    generating: "Membuat…",
  },
  preview: {
    insideEmpty: "Isi kartumu",
    insideOne: "Isi kartumu",
    insideMany: "Kartumu ({count})",
    empty:
      "Isi detail dan buat pesan — akan muncul di sini seperti isi kartu ulang tahun asli.",
    happyBirthday: "Selamat Ulang Tahun!",
    forRecipient: "Untuk {name}",
    footerWish: "Semoga tahunmu penuh tawa, kue, dan kenangan indah!",
    footerCelebrate: "🎉 Rayakan dengan riang 🎉",
    copy: "Salin",
    copyTitle: "Menyalin teks biasa saja",
    copied: "Tersalin!",
    shuffle: "Acak",
    shuffling: "Mengacak…",
    playSong: "Putar lagu",
    playing: "Memutar…",
    playSongAria: "Putar lagu Selamat Ulang Tahun",
    photoBy: "Foto oleh",
    onUnsplash: "di",
    unsplash: "Unsplash",
    fallbackDailyLimit: "Pesan klasik — batas harian AI tercapai.",
    fallbackUnavailable: "Pesan klasik — AI tidak tersedia.",
  },
  footer: {
    tagline: "Dibuat dengan terlalu banyak kue dan humor yang meragukan.",
  },
} as const;

export type TranslationKey = keyof typeof en extends infer K
  ? K extends string
    ? `${K}.${keyof (typeof en)[K & keyof typeof en] & string}`
    : never
  : never;

/** Flat dot-path keys for type-safe lookups */
export type Messages = typeof en;

export const translations: Record<Locale, Messages> = { en, id };

function getByPath(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

export function translate(
  locale: Locale,
  key: string,
  params?: Record<string, string | number>,
): string {
  const value = getByPath(translations[locale] as unknown as Record<string, unknown>, key);
  let text = typeof value === "string" ? value : key;

  if (params) {
    for (const [param, replacement] of Object.entries(params)) {
      text = text.replace(`{${param}}`, String(replacement));
    }
  }

  return text;
}
