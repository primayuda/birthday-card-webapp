export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "birthday-card-theme";

export function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return null;
}

/** Default to dark when no preference is saved. */
export function getPreferredTheme(): Theme {
  return getStoredTheme() ?? "dark";
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function setTheme(theme: Theme) {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  applyTheme(theme);
}

export function toggleTheme(): Theme {
  const next: Theme = document.documentElement.classList.contains("dark")
    ? "light"
    : "dark";
  setTheme(next);
  return next;
}
