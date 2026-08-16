import { BirthdayCardGenerator } from "@/components/BirthdayCardGenerator";
import { LanguageToggle } from "@/components/LanguageToggle";
import { SiteFooter } from "@/components/SiteFooter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";

export function BirthdayCardApp() {
  return (
    <LocaleProvider>
      <LanguageToggle className="fixed top-[max(0.75rem,env(safe-area-inset-top))] left-[max(0.75rem,env(safe-area-inset-left))] z-20" />
      <ThemeToggle className="fixed top-[max(0.75rem,env(safe-area-inset-top))] right-[max(0.75rem,env(safe-area-inset-right))] z-20 shadow-sm" />
      <BirthdayCardGenerator />
      <SiteFooter />
    </LocaleProvider>
  );
}
