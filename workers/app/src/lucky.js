import {
  LIMITS,
  json,
  isDailyLimitError,
  methodNotAllowed,
  runChat,
} from "./ai-utils.js";

const LUCKY_PROMPT = `Generate funny, family-friendly random values for a birthday card form.
Return ONLY valid JSON with this exact shape (no markdown, no extra text):
{"name":"...","age":30,"hobby":"...","adjective":"...","pluralNouns":"..."}

Rules:
- name: creative funny name, max 50 characters
- age: integer from 1 to 120
- hobby: funny hobby phrase, max 80 characters
- adjective: funny adjective phrase, max 40 characters
- pluralNouns: funny plural nouns, max 80 characters
- Be whimsical and absurd but family-friendly`;

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

function validateFill(body) {
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

  return { name, age, hobby, adjective, pluralNouns };
}

export async function handleLuckyFill(request, env) {
  const methodResponse = methodNotAllowed(request);
  if (methodResponse) return methodResponse;

  if (!env.AI) {
    return json({ error: "ai_unavailable" }, 503);
  }

  try {
    const result = await runChat(env, {
      system: "You generate silly birthday card form values and respond with JSON only.",
      user: LUCKY_PROMPT,
      max_tokens: 180,
      temperature: 1,
    });

    const parsed = parseJsonObject(result.response);
    const fill = validateFill(parsed);
    if (!fill) {
      return json({ error: "invalid_response" }, 502);
    }

    return json({ fill, source: "ai" });
  } catch (error) {
    if (isDailyLimitError(error)) {
      return json({ error: "daily_limit" }, 429);
    }

    return json({ error: "ai_failed" }, 502);
  }
}
