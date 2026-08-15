import { json, corsPreflightResponse } from "./ai-utils.js";

const UNSPLASH_API = "https://api.unsplash.com";

const SEARCH_QUERIES = [
  "birthday party",
  "birthday cake candles",
  "celebration balloons",
  "birthday confetti",
  "birthday gifts",
];

function pickQuery() {
  return SEARCH_QUERIES[Math.floor(Math.random() * SEARCH_QUERIES.length)];
}

function buildAlt(photo) {
  const text = photo.alt_description ?? photo.description ?? "";
  const cleaned = String(text).trim();
  if (cleaned) return cleaned.slice(0, 200);
  return "Festive birthday celebration";
}

async function trackDownload(accessKey, downloadLocation) {
  if (!downloadLocation) return;

  try {
    await fetch(downloadLocation, {
      headers: { Authorization: `Client-ID ${accessKey}` },
    });
  } catch {
    /* Unsplash download tracking is best-effort */
  }
}

export async function handleImage(request, env) {
  if (request.method === "OPTIONS") {
    return corsPreflightResponse(request, "GET, POST, OPTIONS");
  }

  if (request.method !== "GET") {
    return json({ error: "method_not_allowed" }, 405, request);
  }

  const accessKey = env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    return json({ error: "unsplash_unavailable" }, 503, request);
  }

  const query = pickQuery();
  const apiUrl = new URL(`${UNSPLASH_API}/photos/random`);
  apiUrl.searchParams.set("query", query);
  apiUrl.searchParams.set("orientation", "landscape");
  apiUrl.searchParams.set("content_filter", "high");

  try {
    const response = await fetch(apiUrl, {
      headers: { Authorization: `Client-ID ${accessKey}` },
    });

    if (!response.ok) {
      return json({ error: "unsplash_failed" }, 502, request);
    }

    const photo = await response.json();
    const imageUrl = photo.urls?.regular ?? photo.urls?.small;
    const photographerName = photo.user?.name;
    const photographerUrl = photo.user?.links?.html;
    const photoUrl = photo.links?.html;

    if (!imageUrl || !photographerName || !photographerUrl || !photoUrl) {
      return json({ error: "invalid_response" }, 502, request);
    }

    await trackDownload(accessKey, photo.links?.download_location);

    return json(
      {
        image: {
          url: imageUrl,
          alt: buildAlt(photo),
          attribution: {
            photographerName,
            photographerUrl: `${photographerUrl}?utm_source=birthday_card_webapp&utm_medium=referral`,
            photoUrl: `${photoUrl}?utm_source=birthday_card_webapp&utm_medium=referral`,
          },
        },
        source: "unsplash",
      },
      200,
      request,
    );
  } catch {
    return json({ error: "unsplash_failed" }, 502, request);
  }
}
