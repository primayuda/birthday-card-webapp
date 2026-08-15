export interface BirthdayImage {
  url: string;
  alt: string;
}

/** Local birthday images bundled in /public/birthday */
export const BIRTHDAY_IMAGES: BirthdayImage[] = [
  {
    url: "/birthday/cake-candles.jpg",
    alt: "Chocolate birthday cake with lit candles",
  },
  {
    url: "/birthday/balloons.jpg",
    alt: "Colorful festive balloons",
  },
  {
    url: "/birthday/balloons-cluster.jpg",
    alt: "Cluster of party balloons",
  },
  {
    url: "/birthday/gifts.jpg",
    alt: "Wrapped birthday gifts with ribbon",
  },
  {
    url: "/birthday/party-table.jpg",
    alt: "Party table with decorations and treats",
  },
  {
    url: "/birthday/confetti.jpg",
    alt: "Confetti falling at a celebration",
  },
  {
    url: "/birthday/dinner-party.jpg",
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
