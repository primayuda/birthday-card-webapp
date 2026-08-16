import type { Gender } from "@/lib/gender";
import type { Locale } from "@/lib/i18n/locale";
import { getRandomLuckyFillId } from "@/lib/luckyWordsId";

function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export const LUCKY_NAMES_MALE = [
  "Sir Reginald",
  "Chad Thundercake",
  "Barry the Bold",
  "Professor Wobble",
  "Captain Sparkles",
  "Duke McFluffington",
];

export const LUCKY_NAMES_FEMALE = [
  "Princess Pancake",
  "Auntie Chaos",
  "Grandma Zoom",
  "Lady Confetti",
  "Queen Nacho",
  "Madame Wobbleton",
];

export const LUCKY_NAMES_NEUTRAL = [
  "Pickles McGee",
  "The Honourable Noodle",
  "Captain Sparkles",
  "Professor Wobble",
  "Barry the Bold",
  "Auntie Chaos",
];

export const LUCKY_NAMES = [
  ...LUCKY_NAMES_MALE,
  ...LUCKY_NAMES_FEMALE,
  ...LUCKY_NAMES_NEUTRAL,
];

export const LUCKY_AGES = [3, 7, 13, 16, 21, 29, 37, 42, 50, 69, 100];

export const LUCKY_HOBBIES = [
  "competitive napping",
  "extreme couponing",
  "yelling at clouds",
  "collecting spoons",
  "professional loitering",
  "interpretive sighing",
  "duck herding",
  "karaoke disasters",
  "aggressive gardening",
  "inventing new snacks",
];

export const LUCKY_ADJECTIVES = [
  "suspiciously moist",
  "aggressively wholesome",
  "mildly feral",
  "chaotically elegant",
  "unreasonably sparkly",
  "legally distinct",
  "emotionally available",
  "scientifically spicy",
  "dangerously cozy",
  "surprisingly majestic",
];

export const LUCKY_PLURAL_NOUNS = [
  "rubber ducks",
  "questionable life choices",
  "nachos",
  "emotional support potatoes",
  "disco llamas",
  "mystery meatballs",
  "vintage memes",
  "suspicious pigeons",
  "forbidden snacks",
  "tiny sombreros",
];

export interface LuckyFill {
  name: string;
  age: string;
  hobby: string;
  adjective: string;
  pluralNouns: string;
}

export function getRandomLuckyFill(
  gender: Gender = "undisclosed",
  locale: Locale = "en",
): LuckyFill {
  if (locale === "id") {
    return getRandomLuckyFillId(gender);
  }

  const names =
    gender === "male"
      ? LUCKY_NAMES_MALE
      : gender === "female"
        ? LUCKY_NAMES_FEMALE
        : LUCKY_NAMES_NEUTRAL;

  return {
    name: pick(names),
    age: String(pick(LUCKY_AGES)),
    hobby: pick(LUCKY_HOBBIES),
    adjective: pick(LUCKY_ADJECTIVES),
    pluralNouns: pick(LUCKY_PLURAL_NOUNS),
  };
}
