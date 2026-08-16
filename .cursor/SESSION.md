# Birthday Card Webapp — Session Resume

**Last updated:** 2026-08-16  
**Live URL:** https://primayuda.dev/birthday-card-generator/  
**Repo:** https://github.com/primayuda/birthday-card-webapp  
**Latest commit:** `12b4c42` — Fix AI substituting recipient name in generated birthday messages.

To resume in Cursor, say: **"Read `.cursor/SESSION.md` and continue where we left off."**

---

## What this app is

Astro 7 + React + Tailwind + shadcn/ui birthday card generator. Users fill a form (name, gender, age, hobby, adjective, plural nouns), get an AI-written funny message, a random birthday image, and a festive card preview. Cards stack; copy is plain text only.

**Languages:** English (default) and Bahasa Indonesia — toggle top-left; preference stored in `localStorage` (`birthday-card-locale`).

Deployed on **Cloudflare Workers** (not Pages), hosted at subpath `/birthday-card-generator/` on `primayuda.dev`.

---

## Stack & layout

| Layer | Path / detail |
|-------|----------------|
| App shell | `src/components/BirthdayCardApp.tsx` — `LocaleProvider`, language + theme toggles, footer |
| Generator | `src/components/BirthdayCardGenerator.tsx` |
| Preview | `src/components/BirthdayCardPreview.tsx` |
| Language toggle | `src/components/LanguageToggle.tsx` |
| Astro page | `src/pages/index.astro` → `<BirthdayCardApp client:load />` |
| i18n | `src/lib/i18n/` — `locale.ts`, `translations.ts`, `LocaleProvider.tsx`, `localeContent.ts` |
| AI client helpers | `src/lib/requestCardMessage.ts`, `requestLuckyFill.ts`, `requestBirthdayImage.ts` |
| EN templates | `src/lib/messages.ts`, `src/lib/luckyWords.ts` |
| ID templates | `src/lib/messagesId.ts`, `src/lib/luckyWordsId.ts` |
| Gender | `src/lib/gender.ts` — `male` \| `female` \| `undisclosed` (default); labels via `t()` |
| Local images fallback | `public/birthday/*.jpg` (7 photos) |
| App Worker (API + assets) | `workers/app/` — `birthday-card-webapp` |
| Worker i18n | `workers/app/src/language.js` |
| Worker gender prompts | `workers/app/src/gender.js` — `messageGenderInstruction` vs `luckyGenderInstruction` |
| Router Worker | `workers/router/` — proxies `primayuda.dev/birthday-card-generator*` |

---

## API endpoints (Worker)

All under `/birthday-card-generator/api/`:

| Route | Method | Body | Purpose |
|-------|--------|------|---------|
| `/api/generate` | POST | `{ name, age, hobby, adjective, pluralNouns, gender, locale }` | Workers AI birthday message |
| `/api/lucky` | POST | `{ gender, locale }` | AI random form fill |
| `/api/image` | GET | — | Unsplash random birthday photo |

**Client fallbacks** when API fails, daily limit, AI returns English for `locale: "id"`, or AI omits/replaces recipient name → EN/ID templates via `generateMessage()` / `getRandomLuckyFill()`.

Model: `@cf/meta/llama-3.2-3b-instruct` (`workers/app/src/ai-utils.js`).

---

## i18n behavior

- **Default locale:** `en`
- **UI:** all strings in `src/lib/i18n/translations.ts` (`t("key")` via `useLocale()`)
- **AI:** worker prompts in Indonesian when `locale === "id"` (`language.js`, localized `buildPrompt` in `generate.js` / `lucky.js`)
- **Template fallbacks:** `messagesId.ts` (12 message patterns), `luckyWordsId.ts` (names, hobbies, adjectives, plural nouns)
- **Guards:** `localeContent.ts` — `looksLikeEnglish()`, `fillLooksEnglish()`, `messageUsesRecipientName()`

### Indonesian template notes (reviewed by user)

- **Names localized** (e.g. Rendi, Candra, Bambang, Kue Lapis) — only for lucky fill, not message substitution
- **Hobi / kata benda jamak / komentar usia:** kept with original mix (some loanwords OK)
- **Message templates:** `#6` lewati, `#9` keahlian, `#11` suasana, `#12` super + mantap; gaming phrases kept (`naik level`, `Misi utama`, etc.)

---

## Secrets setup (values not in repo)

```bash
npx wrangler secret put UNSPLASH_ACCESS_KEY --config workers/app/wrangler.jsonc
```

GitHub Actions: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.  
Workers AI binding in `workers/app/wrangler.jsonc` (`env.AI`).

---

## Local development

```bash
npm run dev              # foreground
npm run dev:background   # background
npm run dev:stop
npm run dev:status
npm run dev:logs
```

Open: http://localhost:4321/birthday-card-generator/

**Important:** Astro dev has no Worker. API calls go to **production** via `src/lib/apiBase.ts`. Worker/i18n prompt changes require deploy (or `wrangler dev --remote`) to affect AI in dev.

---

## Deploy

```bash
npm run deploy:all   # app Worker + router Worker
```

CI: `.github/workflows/deploy.yml` on push to `main`.

---

## Features completed (through latest session)

- [x] Subpath hosting on `primayuda.dev/birthday-card-generator/`
- [x] Workers AI message generation + template fallback
- [x] Workers AI “I'm feeling lucky” + preset fallback
- [x] Unsplash random card images + photographer attribution
- [x] Gender selection: Male / Female / Prefer not to disclose
- [x] README screenshots + links; Unsplash production review screenshots
- [x] **Bahasa Indonesia:** language toggle, full UI translation, ID templates, localized AI prompts
- [x] Client guards: reject English AI output for ID locale; reject AI messages that don't use entered name
- [x] **Fix:** AI was substituting recipient name (e.g. “Bambang” instead of “Prima”) — separate message vs lucky gender prompts
- [x] npm scripts: `dev:background`, `dev:stop`, `dev:status`, `dev:logs`
- [x] Session resume doc: `.cursor/SESSION.md` (tracked on GitHub)

---

## Known behavior

- **Template messages** — UI shows “Classic message — AI unavailable.” or daily limit note (localized in ID).
- **Shuffle** re-rolls message only; image stays the same per card.
- **Unsplash:** user applied for production; demo limit 50/hr until approved.
- **Workers AI free tier:** ~10,000 Neurons/day.
- **Dev + production API:** lucky fill / generate use deployed Worker; push to `main` for prompt fixes to take effect in dev.

---

## Possible next steps (not started)

- Refresh image on shuffle
- Confirm Unsplash production approval
- Proxy API through Astro dev without hitting production
- Further Indonesian template polish (user may want more name/hobby tweaks)
- Print-friendly card layout

---

## Recent commits

```
12b4c42 Fix AI substituting recipient name in generated birthday messages.
83b153c Add Bahasa Indonesia support with language toggle and localized templates.
85f2641 Add Unsplash attribution screenshots for production review.
c41f797 Clarify that secrets are not stored in the repository.
549736d Update README with screenshots, links, and refreshed docs.
6c4a6b9 Add gender selection for AI messages and lucky fill.
```

---

## Agent transcript (full chat history)

Cursor transcript ID: `5cca56b4-676e-41c9-a481-d232d7f3b82b`
