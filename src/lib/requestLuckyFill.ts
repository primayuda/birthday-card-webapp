import { getRandomLuckyFill, type LuckyFill } from "@/lib/luckyWords";
import { getApiBase } from "@/lib/apiBase";
import type { Gender } from "@/lib/gender";
import { fillLooksEnglish } from "@/lib/i18n/localeContent";
import type { Locale } from "@/lib/i18n/locale";

export type LuckyFillSource = "ai" | "template";

export interface LuckyFillResult extends LuckyFill {
  source: LuckyFillSource;
}

export async function requestLuckyFill(
  gender: Gender = "undisclosed",
  locale: Locale = "en",
): Promise<LuckyFillResult> {
  try {
    const response = await fetch(`${getApiBase()}api/lucky`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gender, locale }),
    });

    if (response.ok) {
      const data = (await response.json()) as {
        fill?: {
          name: string;
          age: number;
          hobby: string;
          adjective: string;
          pluralNouns: string;
        };
      };

      if (data.fill) {
        if (locale === "id" && fillLooksEnglish(data.fill)) {
          /* AI ignored locale — use Indonesian templates */
        } else {
          return {
            name: data.fill.name,
            age: String(data.fill.age),
            hobby: data.fill.hobby,
            adjective: data.fill.adjective,
            pluralNouns: data.fill.pluralNouns,
            source: "ai",
          };
        }
      }
    }
  } catch {
    /* API unavailable */
  }

  return { ...getRandomLuckyFill(gender, locale), source: "template" };
}
