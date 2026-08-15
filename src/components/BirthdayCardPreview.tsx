import { forwardRef, useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";

import { PlayBirthdaySongButton } from "@/components/PlayBirthdaySongButton";
import { Button } from "@/components/ui/button";
import type { CardInputs } from "@/lib/messages";
import { BIRTHDAY_IMAGES } from "@/lib/birthdayImages";
import { cn } from "@/lib/utils";

export interface GeneratedCard {
  id: string;
  message: string;
  recipientName: string;
  templateIndex: number;
  inputs: CardInputs;
  imageUrl: string;
  imageAlt: string;
}

interface BirthdayCardItemProps {
  card: GeneratedCard;
  copied: boolean;
  onCopy: () => void;
  onShuffle: () => void;
  isNewest?: boolean;
}

function BirthdayCardItem({
  card,
  copied,
  onCopy,
  onShuffle,
  isNewest,
}: BirthdayCardItemProps) {
  const [imageError, setImageError] = useState(false);
  const fallbackImage = BIRTHDAY_IMAGES[0];

  return (
    <article className={cn(!isNewest && "opacity-95")}>
      <div className="mb-3 grid grid-cols-3 gap-2 sm:mb-2 sm:flex sm:justify-end">
        <PlayBirthdaySongButton />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onCopy}
          title="Copies plain text only"
          className="touch-manipulation min-h-11 w-full sm:min-h-8 sm:w-auto"
        >
          {copied ? (
            <>
              <Check className="size-4 shrink-0" aria-hidden="true" />
              <span className="truncate">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="size-4 shrink-0" aria-hidden="true" />
              <span className="truncate">Copy</span>
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onShuffle}
          className="touch-manipulation min-h-11 w-full sm:min-h-8 sm:w-auto"
        >
          <RefreshCw className="size-4 shrink-0" aria-hidden="true" />
          <span className="truncate">Shuffle</span>
        </Button>
      </div>

      <div className="relative w-full sm:mx-auto sm:max-w-md">
        <div
          className={cn(
            "animate-card-pop rounded-2xl bg-linear-to-br from-blue-200/80 via-sky-100 to-indigo-200/70 p-2.5 shadow-xl shadow-blue-900/15 ring-1 ring-blue-300/50 sm:p-3 dark:from-blue-950/80 dark:via-slate-800/90 dark:to-indigo-950/80 dark:shadow-black/40 dark:ring-border",
            isNewest && "shadow-2xl shadow-primary/25 ring-2 ring-primary/30 dark:shadow-primary/15"
          )}
        >
          <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-inner">
            <img
              src={imageError ? fallbackImage.url : card.imageUrl}
              alt={imageError ? fallbackImage.alt : card.imageAlt}
              width={640}
              height={240}
              loading="lazy"
              decoding="async"
              onError={() => setImageError(true)}
              className="h-32 w-full object-cover sm:h-36 dark:brightness-95"
            />

            <div className="relative min-h-[260px] sm:min-h-[340px]">
              <div
                className="pointer-events-none absolute top-3 left-3 size-8 border-t-2 border-l-2 border-sky-400/70 rounded-tl-lg"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute top-3 right-3 size-8 border-t-2 border-r-2 border-sky-400/70 rounded-tr-lg"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute bottom-3 left-3 size-8 border-b-2 border-l-2 border-indigo-400/60 rounded-bl-lg"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute right-3 bottom-3 size-8 border-r-2 border-b-2 border-indigo-400/60 rounded-br-lg"
                aria-hidden="true"
              />

              <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
                <span className="absolute top-[12%] left-[18%] size-1.5 rounded-full bg-sky-400/70" />
                <span className="absolute top-[22%] right-[15%] size-2 rounded-full bg-blue-500/50" />
                <span className="absolute top-[38%] left-[8%] size-1 rounded-full bg-indigo-400/60" />
                <span className="absolute top-[55%] right-[10%] size-1.5 rounded-full bg-cyan-400/55" />
                <span className="absolute bottom-[28%] left-[22%] size-1 rounded-full bg-blue-400/50" />
                <span className="absolute bottom-[18%] right-[25%] size-2 rounded-full bg-sky-300/65" />
              </div>

              <div className="relative flex min-h-[260px] flex-col px-5 py-6 sm:min-h-[340px] sm:px-10 sm:py-8">
              <div className="mb-6 flex justify-center sm:mb-8">
                <div className="relative">
                  <div className="rounded-full bg-linear-to-r from-sky-500 via-blue-500 to-indigo-500 px-5 py-1.5 shadow-md shadow-blue-500/25 sm:px-6 sm:py-2">
                    <p className="font-heading text-base font-semibold tracking-wide text-white sm:text-xl">
                      Happy Birthday!
                    </p>
                  </div>
                  <span className="absolute -top-2 -right-3 text-lg" aria-hidden="true">
                    ✨
                  </span>
                  <span className="absolute -bottom-1 -left-3 text-sm" aria-hidden="true">
                    🎈
                  </span>
                </div>
              </div>

              <p className="mb-4 text-center text-sm font-medium tracking-wide text-primary uppercase">
                For {card.recipientName}
              </p>

              <div className="flex flex-1 flex-col justify-center">
                <p className="text-center text-base leading-relaxed text-card-foreground sm:text-lg">
                  {card.message}
                </p>
              </div>

              <div className="mt-6 border-t border-dashed border-border pt-5 text-center sm:mt-8 sm:pt-6">
                <p className="text-sm text-muted-foreground italic">
                  Wishing you laughter, cake, and a year to remember!
                </p>
                <p className="mt-2 text-xs tracking-widest text-primary/70 uppercase">
                  🎉 Celebrate big 🎉
                </p>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

interface BirthdayCardPreviewProps {
  cards: GeneratedCard[];
  copiedId: string | null;
  onCopy: (id: string, message: string) => void;
  onShuffle: (id: string) => void;
  className?: string;
}

export const BirthdayCardPreview = forwardRef<
  HTMLDivElement,
  BirthdayCardPreviewProps
>(function BirthdayCardPreview(
  { cards, copiedId, onCopy, onShuffle, className },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn("flex scroll-mt-20 flex-col gap-3 sm:scroll-mt-8", className)}
    >
      <div className="px-1">
        <p className="text-sm font-medium text-primary/80">
          {cards.length === 0
            ? "Inside your card"
            : cards.length === 1
              ? "Inside your card"
              : `Your cards (${cards.length})`}
        </p>
      </div>

      {cards.length === 0 ? (
        <div className="relative w-full sm:mx-auto sm:max-w-md">
          <div className="rounded-2xl bg-linear-to-br from-blue-200/80 via-sky-100 to-indigo-200/70 p-2.5 shadow-xl shadow-blue-900/15 ring-1 ring-blue-300/50 sm:p-3 dark:from-blue-950/80 dark:via-slate-800/90 dark:to-indigo-950/80 dark:shadow-black/40 dark:ring-border">
            <div
              className="relative flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-border bg-card px-6 shadow-inner sm:min-h-[420px] sm:px-8"
              aria-live="polite"
            >
              <p className="text-4xl" aria-hidden="true">
                🎂
              </p>
              <p className="mt-3 text-center text-sm leading-relaxed text-muted-foreground">
                Fill in the details and generate a message — it&apos;ll show up
                here like the inside of a real birthday card.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 sm:gap-8" aria-live="polite">
          {cards.map((card, index) => (
            <BirthdayCardItem
              key={card.id}
              card={card}
              isNewest={index === 0}
              copied={copiedId === card.id}
              onCopy={() => onCopy(card.id, card.message)}
              onShuffle={() => onShuffle(card.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
});
