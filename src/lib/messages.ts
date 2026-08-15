export interface CardInputs {
  name: string;
  age: number;
  hobby: string;
  adjective: string;
  pluralNouns: string;
}

function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function lower(str: string): string {
  return str.trim().toLowerCase();
}

function normalizeHobby(hobby: string): string {
  return lower(hobby);
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

type MessageTemplate = (inputs: CardInputs) => string;

const templates: MessageTemplate[] = [
  (inputs) =>
    `Happy Birthday, ${inputs.name}! You're ${ageComment(inputs.age)}. May your year be filled with ${lower(inputs.adjective)} ${lower(inputs.pluralNouns)}, ${normalizeHobby(inputs.hobby)}—and zero awkward small talk.`,

  (inputs) =>
    `Dear ${inputs.name}, at ${inputs.age} you've officially spent more time on ${normalizeHobby(inputs.hobby)} than most people spend chasing ${lower(inputs.pluralNouns)}. Stay ${lower(inputs.adjective)}. Happy Birthday!`,

  (inputs) =>
    `${inputs.name}, congrats on level ${inputs.age}! Main quest: ${normalizeHobby(inputs.hobby)}. Bonus loot: ${lower(inputs.adjective)} ${lower(inputs.pluralNouns)}. Side quest: smile when everyone sings.`,

  (inputs) =>
    `Happy ${inputs.age}th, ${inputs.name}! They say age is just a number—yours explains the ${lower(inputs.adjective)} ${lower(inputs.pluralNouns)} and the ${normalizeHobby(inputs.hobby)} obsession perfectly.`,

  (inputs) =>
    `To ${inputs.name}: You're not getting older, you're leveling up into someone who collects ${lower(inputs.pluralNouns)} and calls it ${lower(inputs.adjective)}. ${inputs.age} years of excellence!`,

  (inputs) =>
    `Happy Birthday, ${inputs.name}! At ${inputs.age}, you're ${ageComment(inputs.age)}. We skipped the ${lower(inputs.pluralNouns)} and got you this card about ${hobbyWithArticle(inputs.hobby)} instead—you're welcome.`,

  (inputs) =>
    `${inputs.name}, turning ${inputs.age} means one thing: you're old enough to know better, ${lower(inputs.adjective)} enough to ${normalizeHobby(inputs.hobby)} anyway, and wise enough to appreciate ${lower(inputs.pluralNouns)}.`,

  (inputs) =>
    `Roses are red, violets are blue, ${inputs.name} is ${inputs.age} and loves ${lower(inputs.pluralNouns)} too. You're ${lower(inputs.adjective)} at ${capitalize(inputs.hobby)}—facts only.`,

  (inputs) =>
    `Happy Birthday, ${inputs.name}! ${inputs.age} candles on the cake, ${lower(inputs.adjective)} ${lower(inputs.pluralNouns)} on the horizon, and your ${normalizeHobby(inputs.hobby)} skills already on fire.`,

  (inputs) =>
    `${inputs.name}, at ${inputs.age} you've mastered three things: ${normalizeHobby(inputs.hobby)}, finding ${lower(inputs.adjective)} ${lower(inputs.pluralNouns)}, and pretending birthday cake calories don't count.`,

  (inputs) =>
    `Breaking news: ${inputs.name} turns ${inputs.age} today! Witnesses report ${lower(inputs.adjective)} vibes, excessive ${normalizeHobby(inputs.hobby)}, and a suspicious number of ${lower(inputs.pluralNouns)}.`,

  (inputs) =>
    `Happy Birthday, ${inputs.name}! You're ${inputs.age} years young, infinitely ${lower(inputs.adjective)}, and officially overdue for ${lower(inputs.pluralNouns)} and a solid ${normalizeHobby(inputs.hobby)} session.`,
];

export function normalizeInputs(
  name: string,
  age: number,
  hobby: string,
  adjective: string,
  pluralNouns: string
): CardInputs {
  return {
    name: capitalize(name.trim()),
    age,
    hobby: capitalize(hobby.trim()),
    adjective: lower(adjective),
    pluralNouns: lower(pluralNouns),
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
    text: templates[index](inputs),
    index,
  };
}
