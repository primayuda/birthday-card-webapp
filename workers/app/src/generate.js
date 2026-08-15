import {
  LIMITS,
  json,
  isDailyLimitError,
  methodNotAllowed,
  runChat,
} from "./ai-utils.js";

function buildPrompt(inputs) {
  return `Write one funny, family-friendly birthday card message (2-4 sentences, under 320 characters).
Must naturally include ALL of these details:
- Recipient name: ${inputs.name}
- Age: ${inputs.age}
- Hobby: ${inputs.hobby}
- Adjective: ${inputs.adjective}
- Plural nouns: ${inputs.pluralNouns}

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

  return { name, age, hobby, adjective, pluralNouns };
}

function cleanMessage(text) {
  return String(text ?? "")
    .trim()
    .replace(/^["']|["']$/g, "")
    .slice(0, 500);
}

export async function handleGenerate(request, env) {
  const methodResponse = methodNotAllowed(request);
  if (methodResponse) return methodResponse;

  if (!env.AI) {
    return json({ error: "ai_unavailable" }, 503);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const inputs = validateInputs(body);
  if (!inputs) {
    return json({ error: "invalid_input" }, 400);
  }

  try {
    const result = await runChat(env, {
      system: "You write short, witty, family-friendly birthday card messages.",
      user: buildPrompt(inputs),
      max_tokens: 200,
      temperature: 0.8,
    });

    const message = cleanMessage(result.response);
    if (!message) {
      return json({ error: "empty_response" }, 502);
    }

    return json({ message, source: "ai" });
  } catch (error) {
    if (isDailyLimitError(error)) {
      return json({ error: "daily_limit" }, 429);
    }

    return json({ error: "ai_failed" }, 502);
  }
}
