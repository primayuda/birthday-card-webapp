/**
 * Proxies primayuda.dev/birthday-card-generator/* to the Cloudflare Pages project.
 * Route (set in wrangler.jsonc): primayuda.dev/birthday-card-generator*
 */
const PAGES_ORIGIN = "https://birthday-card-webapp.pages.dev";

export default {
  async fetch(request) {
    const incoming = new URL(request.url);
    const target = new URL(incoming.pathname + incoming.search, PAGES_ORIGIN);

    return fetch(target.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: "manual",
    });
  },
};
