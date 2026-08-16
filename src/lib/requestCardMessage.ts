import { generateMessage, type CardInputs } from "@/lib/messages";
import { getApiBase } from "@/lib/apiBase";
import { looksLikeEnglish, messageUsesRecipientName } from "@/lib/i18n/localeContent";

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
    const response = await fetch(`${getApiBase()}api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
    });

    if (response.status === 429) {
      fallbackReason = "daily_limit";
    } else if (response.ok) {
      const data = (await response.json()) as { message?: string; source?: string };
      if (data.message) {
        const wrongLocale =
          inputs.locale === "id" && looksLikeEnglish(data.message);
        const wrongName = !messageUsesRecipientName(data.message, inputs.name);

        if (wrongLocale || wrongName) {
          /* AI ignored locale or substituted the recipient name — use templates */
        } else {
          return {
            message: data.message,
            templateIndex: -1,
            source: "ai",
          };
        }
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
