import { useLocale } from "@/lib/i18n/LocaleProvider";

export function SiteFooter() {
  const { t } = useLocale();

  return (
    <footer className="relative mt-12 text-center text-sm text-muted-foreground">
      <p>{t("footer.tagline")}</p>
      <p className="mt-2">
        <a
          href="https://primayuda.dev"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          @primayuda.dev
        </a>
      </p>
    </footer>
  );
}
