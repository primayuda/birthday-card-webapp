const BASE = "/birthday-card-generator";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/" || url.pathname === BASE) {
      return Response.redirect(`${url.origin}${BASE}/`, 301);
    }

    if (url.pathname.startsWith(`${BASE}/`)) {
      let assetPath = url.pathname.slice(BASE.length) || "/";
      if (assetPath.endsWith("/")) {
        assetPath = "/index.html";
      }

      const assetUrl = new URL(assetPath + url.search, url.origin);
      return env.ASSETS.fetch(
        new Request(assetUrl.toString(), {
          method: request.method,
          headers: request.headers,
        }),
      );
    }

    return env.ASSETS.fetch(request);
  },
};
