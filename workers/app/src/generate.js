import {
  LIMITS,
  json,
  isDailyLimitError,
  methodNotAllowed,
  runChat,
} from "./ai-utils.js";
import { messageGenderInstruction, normalizeGender } from "./gender.js";
import {
  messageLanguageInstruction,
  messageSystemPrompt,
  normalizeLocale,
} from "./language.js";

function buildPrompt(inputs) {
  if (inputs.locale === "id") {
    return `Tulis satu pesan kartu ulang tahun lucu dan ramah keluarga (2–4 kalimat, di bawah 320 karakter).
WAJIB masukkan SEMUA detail ini secara natural:
- Nama penerima: ${inputs.name}
- Usia: ${inputs.age}
- Hobi: ${inputs.hobby}
- Kata sifat: ${inputs.adjective}
- Kata benda jamak: ${inputs.pluralNouns}
- ${messageGenderInstruction(inputs.gender, inputs.locale, inputs.name)}
- ${messageLanguageInstruction(inputs.locale)}

Nada: playful dan witty. Output HANYA teks pesan, tanpa tanda kutip atau label.`;
  }

  return `Write one funny, family-friendly birthday card message (2-4 sentences, under 320 characters).
Must naturally include ALL of these details:
- Recipient name: ${inputs.name}
- Age: ${inputs.age}
- Hobby: ${inputs.hobby}
- Adjective: ${inputs.adjective}
- Plural nouns: ${inputs.pluralNouns}
- ${messageGenderInstruction(inputs.gender, inputs.locale, inputs.name)}
- ${messageLanguageInstruction(inputs.locale)}

Tone: playful and witty. Output ONLY the message text, no quotes or labels.`;
}

function validateInputs(body) {
  if (!body || typeof body !== "object") return null;

  const name = String(body.name ?? "").trim();
  const hobby = String(body.hobby ?? "").trim();
  const adjective = String(body.adjective ?? "").trim();
  const pluralNouns = String(body.pluralNouns ?? "").trim();
  const age = Number(body.age);

  if (!name || name.length > LIMITS.name) return null;
  if (!hobby || hobby.length > LIMITS.hobby) return null;
  if (!adjective || adjective.length > LIMITS.adjective) return null;
  if (!pluralNouns || pluralNouns.length > LIMITS.pluralNouns) return null;
  if (!Number.isInteger(age) || age < 1 || age > 120) return null;

  const gender = normalizeGender(body.gender);
  const locale = normalizeLocale(body.locale);

  return { name, age, hobby, adjective, pluralNouns, gender, locale };
}

function cleanMessage(text) {
  return String(text ?? "")
    .trim()
    .replace(/^```(?:text|markdown)?\s*/i, "")
    .replace(/\s*```$/, "")
    .replace(/^["']|["']$/g, "")
    .slice(0, 500);
}

function extractMessage(raw) {
  if (raw == null) return "";

  if (typeof raw === "string") {
    return cleanMessage(raw);
  }

  if (typeof raw === "object" && !Array.isArray(raw)) {
    const nested =
      raw.message ?? raw.text ?? raw.content ?? raw.response ?? raw.output;
    if (typeof nested === "string") {
      return cleanMessage(nested);
    }
  }

  return "";
}

export async function handleGenerate(request, env) {
  const methodResponse = methodNotAllowed(request);
  if (methodResponse) return methodResponse;

  if (!env.AI) {
    return json({ error: "ai_unavailable" }, 503, request);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid_json" }, 400, request);
  }

  const inputs = validateInputs(body);
  if (!inputs) {
    return json({ error: "invalid_input" }, 400, request);
  }

  try {
    const result = await runChat(env, {
      system: messageSystemPrompt(inputs.locale),
      user: buildPrompt(inputs),
      max_tokens: 200,
      temperature: 0.8,
    });

    const message = extractMessage(result.response);
    if (!message) {
      return json({ error: "empty_response" }, 502, request);
    }

    return json({ message, source: "ai" }, 200, request);
  } catch (error) {
    if (isDailyLimitError(error)) {
      return json({ error: "daily_limit" }, 429, request);
    }

    return json({ error: "ai_failed" }, 502, request);
  }
}
