import { useRef, useState } from "react";
import { Sparkles, Cake, Clover, Loader2 } from "lucide-react";

import { ThemeToggle } from "@/components/ThemeToggle";
import {
  BirthdayCardPreview,
  type GeneratedCard,
} from "@/components/BirthdayCardPreview";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { normalizeInputs, type CardInputs } from "@/lib/messages";
import { requestCardMessage } from "@/lib/requestCardMessage";
import { requestLuckyFill } from "@/lib/requestLuckyFill";
import { requestBirthdayImage } from "@/lib/requestBirthdayImage";
import { cn } from "@/lib/utils";

async function createCard(
  inputs: CardInputs,
  excludeIndex = -1,
): Promise<GeneratedCard> {
  const { message, templateIndex, source, fallbackReason } =
    await requestCardMessage(inputs, excludeIndex);
  const image = await requestBirthdayImage();

  return {
    id: crypto.randomUUID(),
    message,
    recipientName: inputs.name,
    templateIndex,
    inputs,
    imageUrl: image.url,
    imageAlt: image.alt,
    imageSource: image.source,
    imageAttribution: image.attribution,
    messageSource: source,
    fallbackReason,
  };
}

export function BirthdayCardGenerator() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [hobby, setHobby] = useState("");
  const [adjective, setAdjective] = useState("");
  const [pluralNouns, setPluralNouns] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [cards, setCards] = useState<GeneratedCard[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLuckyLoading, setIsLuckyLoading] = useState(false);
  const [shufflingId, setShufflingId] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const inputClassName =
    "h-11 text-base md:h-8 md:text-sm";

  function validate(): CardInputs | null {
    const nextErrors: Record<string, boolean> = {};
    const parsedAge = parseInt(age, 10);

    if (!name.trim()) nextErrors.name = true;
    if (!age || parsedAge < 1 || parsedAge > 120) nextErrors.age = true;
    if (!hobby.trim()) nextErrors.hobby = true;
    if (!adjective.trim()) nextErrors.adjective = true;
    if (!pluralNouns.trim()) nextErrors.pluralNouns = true;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return null;

    return normalizeInputs(name, parsedAge, hobby, adjective, pluralNouns);
  }

  async function addCard(inputs: CardInputs) {
    setIsGenerating(true);
    setCopiedId(null);

    try {
      const card = await createCard(inputs);
      setCards((prev) => [card, ...prev]);

      requestAnimationFrame(() => {
        if (window.matchMedia("(max-width: 1023px)").matches) {
          previewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isGenerating) return;

    const inputs = validate();
    if (inputs) await addCard(inputs);
  }

  async function handleShuffle(cardId: string) {
    if (shufflingId) return;

    const card = cards.find((item) => item.id === cardId);
    if (!card) return;

    setShufflingId(cardId);
    setCopiedId(null);

    try {
      const excludeIndex =
        card.messageSource === "template" ? card.templateIndex : -1;
      const next = await createCard(card.inputs, excludeIndex);
      setCards((prev) =>
        prev.map((item) =>
          item.id === cardId
            ? {
                ...item,
                message: next.message,
                templateIndex: next.templateIndex,
                messageSource: next.messageSource,
                fallbackReason: next.fallbackReason,
              }
            : item,
        ),
      );
    } finally {
      setShufflingId(null);
    }
  }

  async function handleCopy(cardId: string, message: string) {
    try {
      await navigator.clipboard.writeText(message);
      setCopiedId(cardId);
      setTimeout(() => setCopiedId((current) => (current === cardId ? null : current)), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  async function handleFeelingLucky() {
    if (isLuckyLoading || isGenerating) return;

    setIsLuckyLoading(true);
    setErrors({});

    try {
      const fill = await requestLuckyFill();

      if (!name.trim()) setName(fill.name);
      if (!age.trim()) setAge(fill.age);
      if (!hobby.trim()) setHobby(fill.hobby);
      if (!adjective.trim()) setAdjective(fill.adjective);
      if (!pluralNouns.trim()) setPluralNouns(fill.pluralNouns);
    } finally {
      setIsLuckyLoading(false);
    }
  }

  return (
    <div className="relative mx-auto w-full max-w-6xl space-y-6 sm:space-y-8">
      <ThemeToggle className="fixed top-[max(0.75rem,env(safe-area-inset-top))] right-[max(0.75rem,env(safe-area-inset-right))] z-20 shadow-sm" />

      <header className="space-y-3 px-1 pt-12 text-center sm:pt-0">
        <Cake
          className="mx-auto size-8 text-primary sm:size-9"
          aria-hidden="true"
          strokeWidth={1.75}
        />
        <div className="space-y-2">
          <p className="text-xs font-medium tracking-widest text-primary/80 uppercase sm:text-sm">
            Celebrate &amp; Create
          </p>
          <h1 className="font-heading text-3xl leading-tight font-bold tracking-tight bg-linear-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent sm:text-4xl lg:text-5xl dark:from-sky-400 dark:via-blue-400 dark:to-indigo-300">
            Birthday Bash Card Maker
          </h1>
          <p className="mx-auto max-w-xl text-sm text-muted-foreground sm:text-base">
            Fill in all five fields — AI writes a fresh message for each card,
            with classic templates as backup.
          </p>
        </div>
      </header>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10">
        <Card className="border-border bg-card/95 shadow-lg shadow-blue-500/10 backdrop-blur-sm lg:sticky lg:top-8 dark:shadow-black/25">
          <CardHeader>
            <CardTitle>Card details</CardTitle>
            <CardDescription>
              Tell us about the birthday star and we&apos;ll do the rest.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g. Alex"
                  autoComplete="off"
                  maxLength={50}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={errors.name || undefined}
                  className={cn(inputClassName, errors.name && "border-destructive")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  placeholder="e.g. 30"
                  min={1}
                  max={120}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  aria-invalid={errors.age || undefined}
                  className={cn(inputClassName, errors.age && "border-destructive")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hobby">Hobby</Label>
                <Input
                  id="hobby"
                  name="hobby"
                  placeholder="e.g. baking"
                  autoComplete="off"
                  maxLength={80}
                  value={hobby}
                  onChange={(e) => setHobby(e.target.value)}
                  aria-invalid={errors.hobby || undefined}
                  className={cn(inputClassName, errors.hobby && "border-destructive")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adjective">Adjective</Label>
                <Input
                  id="adjective"
                  name="adjective"
                  placeholder="e.g. spectacular"
                  autoComplete="off"
                  maxLength={40}
                  value={adjective}
                  onChange={(e) => setAdjective(e.target.value)}
                  aria-invalid={errors.adjective || undefined}
                  className={cn(inputClassName, errors.adjective && "border-destructive")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="plural-nouns">Plural nouns</Label>
                <Input
                  id="plural-nouns"
                  name="pluralNouns"
                  placeholder="e.g. puppies, rainbows"
                  autoComplete="off"
                  maxLength={80}
                  value={pluralNouns}
                  onChange={(e) => setPluralNouns(e.target.value)}
                  aria-invalid={errors.pluralNouns || undefined}
                  className={cn(inputClassName, errors.pluralNouns && "border-destructive")}
                />
              </div>

              <div className="flex flex-col gap-2.5 pt-1 sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  disabled={isGenerating || isLuckyLoading}
                  className="touch-manipulation min-h-12 flex-1 border-border bg-secondary/50 hover:bg-secondary dark:bg-secondary/30 dark:hover:bg-secondary/50"
                  onClick={handleFeelingLucky}
                >
                  {isLuckyLoading ? (
                    <>
                      <Loader2 className="size-4 shrink-0 animate-spin" aria-hidden="true" />
                      <span>Getting lucky…</span>
                    </>
                  ) : (
                    <>
                      <Clover className="size-4 shrink-0" aria-hidden="true" />
                      I&apos;m feeling lucky
                    </>
                  )}
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isGenerating || isLuckyLoading}
                  className="touch-manipulation min-h-12 flex-1 bg-linear-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="size-4 shrink-0 animate-spin" aria-hidden="true" />
                      <span>Generating…</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-4 shrink-0" aria-hidden="true" />
                      <span className="sm:hidden">Generate card</span>
                      <span className="hidden sm:inline">Generate funny message</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <BirthdayCardPreview
          ref={previewRef}
          cards={cards}
          copiedId={copiedId}
          shufflingId={shufflingId}
          onCopy={handleCopy}
          onShuffle={handleShuffle}
        />
      </div>
    </div>
  );
}
