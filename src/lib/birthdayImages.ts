export type ImageSource = "unsplash" | "local";

export interface ImageAttribution {
  photographerName: string;
  photographerUrl: string;
  photoUrl: string;
}

export interface BirthdayImage {
  url: string;
  alt: string;
}

const withBase = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

/** Local birthday images bundled in /public/birthday */
export const BIRTHDAY_IMAGES: BirthdayImage[] = [
  {
    url: withBase("/birthday/cake-candles.jpg"),
    alt: "Chocolate birthday cake with lit candles",
  },
  {
    url: withBase("/birthday/balloons.jpg"),
    alt: "Colorful festive balloons",
  },
  {
    url: withBase("/birthday/balloons-cluster.jpg"),
    alt: "Cluster of party balloons",
  },
  {
    url: withBase("/birthday/gifts.jpg"),
    alt: "Wrapped birthday gifts with ribbon",
  },
  {
    url: withBase("/birthday/party-table.jpg"),
    alt: "Party table with decorations and treats",
  },
  {
    url: withBase("/birthday/confetti.jpg"),
    alt: "Confetti falling at a celebration",
  },
  {
    url: withBase("/birthday/dinner-party.jpg"),
    alt: "Festive table setting with candles",
  },
];

export function getRandomBirthdayImage(excludeUrl?: string): BirthdayImage {
  const pool =
    excludeUrl && BIRTHDAY_IMAGES.length > 1
      ? BIRTHDAY_IMAGES.filter((img) => img.url !== excludeUrl)
      : BIRTHDAY_IMAGES;

  return pool[Math.floor(Math.random() * pool.length)];
}
