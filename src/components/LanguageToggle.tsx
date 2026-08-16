import { Languages } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import type { Locale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  className?: string;
}

const OPTIONS: { value: Locale; labelKey: string }[] = [
  { value: "en", labelKey: "language.en" },
  { value: "id", labelKey: "language.id" },
];

export function LanguageToggle({ className }: LanguageToggleProps) {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-md border border-border bg-card/90 p-1 shadow-sm backdrop-blur-sm",
        className,
      )}
      role="group"
      aria-label={t("language.label")}
    >
      {OPTIONS.map((option) => (
        <Button
          key={option.value}
          type="button"
          variant={locale === option.value ? "default" : "ghost"}
          size="sm"
          onClick={() => setLocale(option.value)}
          className={cn(
            "touch-manipulation h-8 px-2.5 text-xs sm:text-sm",
            locale === option.value && "shadow-sm",
          )}
          aria-pressed={locale === option.value}
          aria-label={
            option.value === "en" ? t("language.switchToEn") : t("language.switchToId")
          }
        >
          <Languages className="mr-1 size-3.5 shrink-0 sm:hidden" aria-hidden="true" />
          {t(option.labelKey)}
        </Button>
      ))}
    </div>
  );
}
