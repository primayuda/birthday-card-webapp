import { useState } from "react";
import { Music, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { isHappyBirthdayPlaying, getHappyBirthdayDurationMs, playHappyBirthday } from "@/lib/happyBirthdaySong";
import { cn } from "@/lib/utils";

interface PlayBirthdaySongButtonProps {
  className?: string;
}

export function PlayBirthdaySongButton({ className }: PlayBirthdaySongButtonProps) {
  const { t } = useLocale();
  const [playing, setPlaying] = useState(false);

  async function handlePlay() {
    if (isHappyBirthdayPlaying()) return;

    setPlaying(true);
    try {
      await playHappyBirthday();
    } catch {
      setPlaying(false);
      return;
    }

    setTimeout(() => setPlaying(false), getHappyBirthdayDurationMs());
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handlePlay}
      disabled={playing}
      className={cn(
        "touch-manipulation min-h-11 w-full border-border bg-card/80 backdrop-blur-sm sm:min-h-8 sm:w-auto",
        className
      )}
      aria-label={t("preview.playSongAria")}
    >
      {playing ? (
        <>
          <Loader2 className="size-4 shrink-0 animate-spin" aria-hidden="true" />
          <span className="truncate">{t("preview.playing")}</span>
        </>
      ) : (
        <>
          <Music className="size-4 shrink-0" aria-hidden="true" />
          <span className="truncate">{t("preview.playSong")}</span>
        </>
      )}
    </Button>
  );
}
