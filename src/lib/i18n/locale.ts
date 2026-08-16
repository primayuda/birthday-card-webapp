export type Locale = "en" | "id";

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_STORAGE_KEY = "birthday-card-locale";

export function normalizeLocale(value: string | undefined | null): Locale {
  return value === "id" ? "id" : "en";
}

export function getStoredLocale(): Locale {
  if (typeof localStorage === "undefined") return DEFAULT_LOCALE;
  return normalizeLocale(localStorage.getItem(LOCALE_STORAGE_KEY));
}

export function setStoredLocale(locale: Locale): void {
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
}

export function localeHtmlLang(locale: Locale): string {
  return locale === "id" ? "id" : "en";
}
