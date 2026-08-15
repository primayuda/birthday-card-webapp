import { getRandomLuckyFill, type LuckyFill } from "@/lib/luckyWords";

export type LuckyFillSource = "ai" | "template";

export interface LuckyFillResult extends LuckyFill {
  source: LuckyFillSource;
}

export async function requestLuckyFill(): Promise<LuckyFillResult> {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}api/lucky`, {
      method: "POST",
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
  } catch {
    /* API unavailable */
  }

  return { ...getRandomLuckyFill(), source: "template" };
}
