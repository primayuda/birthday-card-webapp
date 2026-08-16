import type { Gender } from "@/lib/gender";

function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export const LUCKY_NAMES_MALE_ID = [
  "Pak Rendi si Gila",
  "Mas Candra Kue Petir",
  "Bambang si Pemberani",
  "Profesor Goyang",
  "Kapten Kilau",
  "Bangsawan Si Bulu",
];

export const LUCKY_NAMES_FEMALE_ID = [
  "Putri Kue Lapis",
  "Tante Kacau",
  "Nenek Panggilan Video",
  "Nyonya Serpihan Warna",
  "Ratu Keripik Keju",
  "Nyonya Goyang",
];

export const LUCKY_NAMES_NEUTRAL_ID = [
  "Acar Si Asam",
  "Yang Mulia Mie",
  "Kapten Kilau",
  "Profesor Goyang",
  "Bambang si Pemberani",
  "Tante Kacau",
];

export const LUCKY_HOBBIES_ID = [
  "tidur kompetitif",
  "koleksi kupon ekstrem",
  "teriak ke awan",
  "koleksi sendok",
  "menganggur profesional",
  "menghela napas interpretatif",
  "menggembalakan bebek",
  "karaoke yang malu-maluin",
  "berkebun agresif",
  "menemukan camilan baru",
  "debate dengan kucing",
  "scroll media sosial tanpa tujuan",
  "memelihara tanaman palsu",
  "latihan selam di kolam renang",
  "membuat meme jadul",
];

export const LUCKY_ADJECTIVES_ID = [
  "lembap mencurigakan",
  "baik hati tapi agresif",
  "liar tapi ringan",
  "elegan kaotik",
  "berkilau berlebihan",
  "unik secara legal",
  "siap secara emosional",
  "pedas ilmiah",
  "nyaman berbahaya",
  "megah mengejutkan",
  "jago bikin onar",
  "penuh kejutan",
];

export const LUCKY_PLURAL_NOUNS_ID = [
  "bebek karet",
  "pilihan hidup meragukan",
  "keripik jagung",
  "kentang penenang hati",
  "llama pesta disko",
  "bakso misteri",
  "meme jadul",
  "merpati mencurigakan",
  "camilan terlarang",
  "topi kecil lucu",
  "t-rex mini",
  "bola disko kecil",
];

export function getRandomLuckyFillId(gender: Gender = "undisclosed") {
  const names =
    gender === "male"
      ? LUCKY_NAMES_MALE_ID
      : gender === "female"
        ? LUCKY_NAMES_FEMALE_ID
        : LUCKY_NAMES_NEUTRAL_ID;

  return {
    name: pick(names),
    age: String(pick([3, 7, 13, 16, 21, 29, 37, 42, 50, 59, 69, 100])),
    hobby: pick(LUCKY_HOBBIES_ID),
    adjective: pick(LUCKY_ADJECTIVES_ID),
    pluralNouns: pick(LUCKY_PLURAL_NOUNS_ID),
  };
}
