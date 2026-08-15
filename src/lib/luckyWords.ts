function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export const LUCKY_NAMES = [
  "Captain Sparkles",
  "Sir Reginald",
  "Pickles McGee",
  "Grandma Zoom",
  "Professor Wobble",
  "Chad Thundercake",
  "Auntie Chaos",
  "The Honourable Noodle",
  "Barry the Bold",
  "Princess Pancake",
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

export function getRandomLuckyFill(): LuckyFill {
  return {
    name: pick(LUCKY_NAMES),
    age: String(pick(LUCKY_AGES)),
    hobby: pick(LUCKY_HOBBIES),
    adjective: pick(LUCKY_ADJECTIVES),
    pluralNouns: pick(LUCKY_PLURAL_NOUNS),
  };
}
