export interface CardInputs {
  name: string;
  age: number;
  hobby: string;
}

function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function normalizeHobby(hobby: string): string {
  return hobby.trim().toLowerCase();
}

function hobbyWithArticle(hobby: string): string {
  const h = normalizeHobby(hobby);
  return /^[aeiou]/.test(h) ? `an ${h}` : `a ${h}`;
}

function ageComment(age: number): string {
  if (age === 1) return "officially allowed to smash cake with both hands";
  if (age < 13) return "old enough to negotiate for extra frosting";
  if (age === 13) return "officially a teenager (our condolences to your parents)";
  if (age === 16) return "old enough to drive away from your responsibilities";
  if (age === 18) return "legally an adult, emotionally still figuring out the microwave";
  if (age === 21) return "finally old enough for the fun stuff (and the hangover)";
  if (age === 30) return "entering your 'I need a nap after fun' era";
  if (age === 40) return "vintage, like fine wine or a suspicious knee";
  if (age === 50) return "half a century young, which sounds better than it is";
  if (age === 60) return "senior discount eligible and absolutely not ready to act like it";
  if (age === 100) return "a centenarian, which is just a fancy word for legend";
  if (age > 100) return "older than most historical events you complain about";
  if (age % 10 === 0)
    return `hitting the big ${age}, which is just a number (a loud, judgmental number)`;
  return `turning ${age}, which is basically ${age - 5} plus experience points`;
}

type MessageTemplate = (name: string, age: number, hobby: string) => string;

const templates: MessageTemplate[] = [
  (name, age, hobby) =>
    `Happy Birthday, ${name}! You're ${ageComment(age)}. May your year be filled with ${normalizeHobby(hobby)}—and zero people asking "so, what's next?"`,

  (name, age, hobby) =>
    `Dear ${name}, at ${age} you've officially spent more time on ${normalizeHobby(hobby)} than some people spend sleeping. No regrets. Happy Birthday!`,

  (name, age, hobby) =>
    `${name}, congrats on level ${age}! Your main quest this year: ${normalizeHobby(hobby)}. Side quest: pretend you love the song everyone sings at you.`,

  (name, age, hobby) =>
    `Happy ${age}th, ${name}! They say age is just a number. In your case, it's a number that clearly explains your obsession with ${normalizeHobby(hobby)}.`,

  (name, age, hobby) =>
    `To ${name}: You're not getting older, you're just becoming a more advanced ${normalizeHobby(hobby)} enthusiast. ${age} years of practice shows!`,

  (name, age, hobby) =>
    `Happy Birthday, ${name}! At ${age}, you're ${ageComment(age)}. We got you a card instead of ${hobbyWithArticle(hobby)} equipment—you're welcome.`,

  (name, age, hobby) =>
    `${name}, turning ${age} means one thing: you're now old enough to know better, but young enough to ${normalizeHobby(hobby)} anyway. Perfect balance.`,

  (name, age, hobby) =>
    `Roses are red, violets are blue, ${name} is ${age} and loves ${normalizeHobby(hobby)} too. (Poetry is not our hobby. ${capitalize(hobby)} clearly is yours.)`,

  (name, age, hobby) =>
    `Happy Birthday, ${name}! ${age} candles on the cake, zero candles on your ${normalizeHobby(hobby)} skills—they're already on fire.`,

  (name, age, hobby) =>
    `${name}, at ${age} you've mastered two things: ${normalizeHobby(hobby)} and pretending the calories from birthday cake don't count. Cheers to both!`,

  (name, age, hobby) =>
    `Breaking news: ${name} turns ${age} today! Witnesses report excessive ${normalizeHobby(hobby)} and suspiciously good vibes. Happy Birthday!`,

  (name, age, hobby) =>
    `Happy Birthday, ${name}! You're ${age} years young and ${normalizeHobby(hobby)} years awesome. (We did the math. It checks out.)`,
];

export function normalizeInputs(
  name: string,
  age: number,
  hobby: string
): CardInputs {
  return {
    name: capitalize(name.trim()),
    age,
    hobby: capitalize(hobby.trim()),
  };
}

export function generateMessage(
  inputs: CardInputs,
  excludeIndex = -1
): { text: string; index: number } {
  let index: number;
  do {
    index = Math.floor(Math.random() * templates.length);
  } while (index === excludeIndex && templates.length > 1);

  return {
    text: templates[index](inputs.name, inputs.age, inputs.hobby),
    index,
  };
}
