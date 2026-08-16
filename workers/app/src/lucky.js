import {
  LIMITS,
  json,
  isDailyLimitError,
  methodNotAllowed,
  runChat,
} from "./ai-utils.js";
import { genderInstruction, normalizeGender } from "./gender.js";
import {
  luckyLanguageInstruction,
  luckyPromptExample,
  luckySystemPrompt,
  normalizeLocale,
} from "./language.js";

function buildLuckyPrompt(gender, locale) {
  const example = luckyPromptExample(locale);
  const exampleBlock = example ? `\n${example}\n` : "";

  if (locale === "id") {
    return `Buat nilai acak lucu dan ramah keluarga untuk formulir kartu ulang tahun.
Balas HANYA dengan JSON valid dengan bentuk persis ini (tanpa markdown, tanpa teks tambahan):
{"name":"...","age":30,"hobby":"...","adjective":"...","pluralNouns":"..."}
${exampleBlock}
Aturan:
- name: nama lucu kreatif, maks 50 karakter, bahasa Indonesia
- age: bilangan bulat 1–120
- hobby: frasa hobi lucu, maks 80 karakter, bahasa Indonesia
- adjective: frasa kata sifat lucu, maks 40 karakter, bahasa Indonesia
- pluralNouns: kata benda jamak lucu, maks 80 karakter, bahasa Indonesia
- Whimsical dan absurd tapi ramah keluarga
- ${genderInstruction(gender, locale)}
- ${luckyLanguageInstruction(locale)}`;
  }

  return `Generate funny, family-friendly random values for a birthday card form.
Return ONLY valid JSON with this exact shape (no markdown, no extra text):
{"name":"...","age":30,"hobby":"...","adjective":"...","pluralNouns":"..."}

Rules:
- name: creative funny name, max 50 characters
- age: integer from 1 to 120
- hobby: funny hobby phrase, max 80 characters
- adjective: funny adjective phrase, max 40 characters
- pluralNouns: funny plural nouns, max 80 characters
- Be whimsical and absurd but family-friendly
- ${genderInstruction(gender, locale)}
- ${luckyLanguageInstruction(locale)}`;
}

function normalizeKeys(body) {
  if (!body || typeof body !== "object") return body;

  return {
    name: body.name ?? body.Name,
    age: body.age ?? body.Age,
    hobby: body.hobby ?? body.Hobby,
    adjective: body.adjective ?? body.Adjective,
    pluralNouns:
      body.pluralNouns ??
      body.plural_nouns ??
      body.pluralnouns ??
      body["plural nouns"],
  };
}

function parseJsonObject(text) {
  const cleaned = String(text ?? "")
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) return null;

  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}

function parseLuckyPayload(raw) {
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    return normalizeKeys(raw);
  }

  const parsed = parseJsonObject(raw);
  return parsed ? normalizeKeys(parsed) : null;
}

function parseAge(value) {
  const age = Number.parseInt(String(value ?? "").replace(/[^\d-]/g, ""), 10);
  if (!Number.isFinite(age)) return null;
  return age;
}

function validateFill(body) {
  const normalized = normalizeKeys(body);
  if (!normalized || typeof normalized !== "object") return null;

  const name = String(normalized.name ?? "").trim();
  const hobby = String(normalized.hobby ?? "").trim();
  const adjective = String(normalized.adjective ?? "").trim();
  const pluralNouns = String(normalized.pluralNouns ?? "").trim();
  const age = parseAge(normalized.age);

  if (!name || name.length > LIMITS.name) return null;
  if (!hobby || hobby.length > LIMITS.hobby) return null;
  if (!adjective || adjective.length > LIMITS.adjective) return null;
  if (!pluralNouns || pluralNouns.length > LIMITS.pluralNouns) return null;
  if (age === null || age < 1 || age > 120) return null;

  return { name, age, hobby, adjective, pluralNouns };
}

export async function handleLuckyFill(request, env) {
  const methodResponse = methodNotAllowed(request);
  if (methodResponse) return methodResponse;

  if (!env.AI) {
    return json({ error: "ai_unavailable" }, 503, request);
  }

  let body = {};
  try {
    body = await request.json();
  } catch {
    /* empty body is fine — default gender applies */
  }

  const gender = normalizeGender(body.gender);
  const locale = normalizeLocale(body.locale);

  try {
    const result = await runChat(env, {
      system: luckySystemPrompt(locale),
      user: buildLuckyPrompt(gender, locale),
      max_tokens: 200,
      temperature: 0.9,
    });

    const payload = parseLuckyPayload(result.response);
    const fill = validateFill(payload);
    if (!fill) {
      return json({ error: "invalid_response" }, 502, request);
    }

    return json({ fill, source: "ai" }, 200, request);
  } catch (error) {
    if (isDailyLimitError(error)) {
      return json({ error: "daily_limit" }, 429, request);
    }

    return json({ error: "ai_failed" }, 502, request);
  }
}
