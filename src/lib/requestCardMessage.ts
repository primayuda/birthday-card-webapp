import { generateMessage, type CardInputs } from "@/lib/messages";

export type MessageSource = "ai" | "template";
export type FallbackReason = "daily_limit" | "unavailable";

export interface CardMessageResult {
  message: string;
  templateIndex: number;
  source: MessageSource;
  fallbackReason?: FallbackReason;
}

export async function requestCardMessage(
  inputs: CardInputs,
  excludeIndex = -1,
): Promise<CardMessageResult> {
  let fallbackReason: FallbackReason = "unavailable";

  try {
    const response = await fetch(`${import.meta.env.BASE_URL}api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
    });

    if (response.status === 429) {
      fallbackReason = "daily_limit";
    } else if (response.ok) {
      const data = (await response.json()) as { message?: string; source?: string };
      if (data.message) {
        return {
          message: data.message,
          templateIndex: -1,
          source: "ai",
        };
      }
    }
  } catch {
    fallbackReason = "unavailable";
  }

  const { text, index } = generateMessage(inputs, excludeIndex);
  return {
    message: text,
    templateIndex: index,
    source: "template",
    fallbackReason,
  };
}
