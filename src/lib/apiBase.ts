/** API base URL — in dev, Astro has no Worker so call production directly (CORS-enabled). */
export function getApiBase(): string {
  if (import.meta.env.DEV) {
    return "https://primayuda.dev/birthday-card-generator/";
  }

  return import.meta.env.BASE_URL;
}
