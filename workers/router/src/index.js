const APP_ORIGIN = "https://birthday-card-webapp.primayuda.workers.dev";
const BASE = "/birthday-card-generator";

export default {
  async fetch(request) {
    const incoming = new URL(request.url);
    const target = new URL(incoming.pathname + incoming.search, APP_ORIGIN);

    const response = await fetch(target.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: "manual",
    });

    const location = response.headers.get("Location");
    if (location && response.status >= 300 && response.status < 400) {
      const locationUrl = new URL(location, APP_ORIGIN);
      if (
        locationUrl.pathname === "/" ||
        locationUrl.pathname === BASE ||
        locationUrl.pathname === `${BASE}/`
      ) {
        const headers = new Headers(response.headers);
        headers.set("Location", `${incoming.origin}${BASE}/`);
        return new Response(response.body, { status: response.status, headers });
      }
    }

    return response;
  },
};
