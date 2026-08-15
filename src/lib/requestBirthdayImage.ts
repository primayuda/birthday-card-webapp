import {
  getRandomBirthdayImage,
  type BirthdayImage,
  type ImageAttribution,
  type ImageSource,
} from "@/lib/birthdayImages";
import { getApiBase } from "@/lib/apiBase";

export interface BirthdayImageResult extends BirthdayImage {
  source: ImageSource;
  attribution?: ImageAttribution;
}

export async function requestBirthdayImage(
  excludeUrl?: string,
): Promise<BirthdayImageResult> {
  try {
    const response = await fetch(`${getApiBase()}api/image`);

    if (response.ok) {
      const data = (await response.json()) as {
        image?: {
          url: string;
          alt: string;
          attribution?: ImageAttribution;
        };
      };

      if (data.image?.url) {
        return {
          url: data.image.url,
          alt: data.image.alt,
          source: "unsplash",
          attribution: data.image.attribution,
        };
      }
    }
  } catch {
    /* API unavailable — use bundled images */
  }

  const local = getRandomBirthdayImage(excludeUrl);
  return { ...local, source: "local" };
}
