import { Copy, Check, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { generateMessage, type CardInputs } from "@/lib/messages";
import { cn } from "@/lib/utils";

export interface GeneratedCard {
  id: string;
  message: string;
  recipientName: string;
  templateIndex: number;
  inputs: CardInputs;
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
  return (
    <article
      className={cn(
        "animate-in fade-in slide-in-from-top-4 duration-300",
        !isNewest && "opacity-95"
      )}
    >
      <div className="mb-2 flex items-center justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onCopy}
          title="Copies plain text only"
        >
          {copied ? (
            <>
              <Check className="size-4" aria-hidden="true" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="size-4" aria-hidden="true" />
              Copy text
            </>
          )}
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={onShuffle}>
          <RefreshCw className="size-4" aria-hidden="true" />
          Shuffle
        </Button>
      </div>

      <div className="relative mx-auto w-full max-w-md">
        <div className="rounded-2xl bg-linear-to-br from-blue-200/80 via-sky-100 to-indigo-200/70 p-3 shadow-xl shadow-blue-900/15 ring-1 ring-blue-300/50">
          <div className="relative min-h-[380px] overflow-hidden rounded-xl border border-blue-200/60 bg-[linear-gradient(160deg,#fffef9_0%,#f8fbff_45%,#eef6ff_100%)] shadow-inner">
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

            <div className="relative flex min-h-[380px] flex-col px-8 py-10 sm:px-10">
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <div className="rounded-full bg-linear-to-r from-sky-500 via-blue-500 to-indigo-500 px-6 py-2 shadow-md shadow-blue-500/25">
                    <p className="font-heading text-lg font-semibold tracking-wide text-white sm:text-xl">
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

              <p className="mb-4 text-center text-sm font-medium tracking-wide text-blue-600/90 uppercase">
                For {card.recipientName}
              </p>

              <div className="flex flex-1 flex-col justify-center">
                <p className="text-center text-base leading-relaxed text-slate-700 sm:text-lg">
                  {card.message}
                </p>
              </div>

              <div className="mt-8 border-t border-dashed border-blue-200/80 pt-6 text-center">
                <p className="text-sm text-blue-600/75 italic">
                  Wishing you laughter, cake, and a year to remember!
                </p>
                <p className="mt-2 text-xs tracking-widest text-blue-400/80 uppercase">
                  🎉 Celebrate big 🎉
                </p>
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

export function BirthdayCardPreview({
  cards,
  copiedId,
  onCopy,
  onShuffle,
  className,
}: BirthdayCardPreviewProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="px-1">
        <p className="text-sm font-medium text-blue-700/80">
          {cards.length === 0
            ? "Inside your card"
            : cards.length === 1
              ? "Inside your card"
              : `Your cards (${cards.length})`}
        </p>
      </div>

      {cards.length === 0 ? (
        <div className="relative mx-auto w-full max-w-md">
          <div className="rounded-2xl bg-linear-to-br from-blue-200/80 via-sky-100 to-indigo-200/70 p-3 shadow-xl shadow-blue-900/15 ring-1 ring-blue-300/50">
            <div
              className="relative flex min-h-[420px] flex-col items-center justify-center rounded-xl border border-blue-200/60 bg-[linear-gradient(160deg,#fffef9_0%,#f8fbff_45%,#eef6ff_100%)] px-8 shadow-inner"
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
        <div className="flex flex-col gap-8" aria-live="polite">
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
}
