export const MODEL = "@cf/meta/llama-3.2-3b-instruct";

export const LIMITS = {
  name: 50,
  hobby: 80,
  adjective: 40,
  pluralNouns: 80,
};

export function json(data, status = 200, request) {
  const headers = { "Content-Type": "application/json" };
  if (request) {
    Object.assign(headers, corsHeaders(request));
  }

  return Response.json(data, { status, headers });
}

export function corsHeaders(request) {
  const origin = request.headers.get("Origin");
  if (!origin) return {};

  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

export function corsPreflightResponse(request) {
  return new Response(null, {
    status: 204,
    headers: {
      ...corsHeaders(request),
      Allow: "POST, OPTIONS",
    },
  });
}

export function isDailyLimitError(error) {
  const message = String(error?.message ?? error);
  return (
    message.includes("10,000") ||
    message.includes("3036") ||
    message.includes("daily free allocation")
  );
}

export async function runChat(env, { system, user, max_tokens = 200, temperature = 0.8 }) {
  return env.AI.run(MODEL, {
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    max_tokens,
    temperature,
  });
}

export function methodNotAllowed(request) {
  if (request.method === "OPTIONS") {
    return corsPreflightResponse(request);
  }

  if (request.method !== "POST") {
    return json({ error: "method_not_allowed" }, 405, request);
  }

  return null;
}
