import { useState } from "react";
import { Sparkles, Cake } from "lucide-react";

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
import { generateMessage, normalizeInputs, type CardInputs } from "@/lib/messages";
import { cn } from "@/lib/utils";

function createCard(inputs: CardInputs, excludeIndex = -1): GeneratedCard {
  const { text, index } = generateMessage(inputs, excludeIndex);
  return {
    id: crypto.randomUUID(),
    message: text,
    recipientName: inputs.name,
    templateIndex: index,
    inputs,
  };
}

export function BirthdayCardGenerator() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [hobby, setHobby] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [cards, setCards] = useState<GeneratedCard[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  function validate(): CardInputs | null {
    const nextErrors: Record<string, boolean> = {};
    const parsedAge = parseInt(age, 10);

    if (!name.trim()) nextErrors.name = true;
    if (!age || parsedAge < 1 || parsedAge > 120) nextErrors.age = true;
    if (!hobby.trim()) nextErrors.hobby = true;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return null;

    return normalizeInputs(name, parsedAge, hobby);
  }

  function addCard(inputs: CardInputs) {
    setCards((prev) => [createCard(inputs), ...prev]);
    setCopiedId(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const inputs = validate();
    if (inputs) addCard(inputs);
  }

  function handleShuffle(cardId: string) {
    setCards((prev) =>
      prev.map((card) => {
        if (card.id !== cardId) return card;

        const { text, index } = generateMessage(card.inputs, card.templateIndex);
        return { ...card, message: text, templateIndex: index };
      })
    );
    setCopiedId(null);
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

  return (
    <div className="relative mx-auto w-full max-w-6xl space-y-8">
      <header className="space-y-3 text-center">
        <Cake
          className="mx-auto size-8 text-blue-600"
          aria-hidden="true"
          strokeWidth={1.75}
        />
        <div className="space-y-2">
          <p className="text-sm font-medium tracking-widest text-blue-600/80 uppercase">
            Celebrate &amp; Create
          </p>
          <h1 className="font-heading text-4xl font-bold tracking-tight bg-linear-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent sm:text-5xl">
            Birthday Bash Card Maker
          </h1>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Pop in a name, age, and hobby — each new message adds another card
            on top, with older ones stacked below.
          </p>
        </div>
      </header>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10">
        <Card className="border-blue-200/60 bg-card/90 shadow-lg shadow-blue-500/10 backdrop-blur-sm lg:sticky lg:top-8">
          <CardHeader>
            <CardTitle>Card details</CardTitle>
            <CardDescription>
              Tell us about the birthday star and we&apos;ll do the rest.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="space-y-2">
                <Label htmlFor="name">Their name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g. Alex"
                  autoComplete="off"
                  maxLength={50}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={errors.name || undefined}
                  className={cn(errors.name && "border-destructive")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age they&apos;re turning</Label>
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
                  className={cn(errors.age && "border-destructive")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hobby">Favorite hobby</Label>
                <Input
                  id="hobby"
                  name="hobby"
                  placeholder="e.g. baking, hiking, gaming"
                  autoComplete="off"
                  maxLength={80}
                  value={hobby}
                  onChange={(e) => setHobby(e.target.value)}
                  aria-invalid={errors.hobby || undefined}
                  className={cn(errors.hobby && "border-destructive")}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-linear-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700"
              >
                <Sparkles className="size-4" aria-hidden="true" />
                Generate funny message
              </Button>
            </form>
          </CardContent>
        </Card>

        <BirthdayCardPreview
          cards={cards}
          copiedId={copiedId}
          onCopy={handleCopy}
          onShuffle={handleShuffle}
        />
      </div>
    </div>
  );
}
