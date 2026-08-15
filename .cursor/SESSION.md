# Birthday Card Webapp — Session Resume

**Last updated:** 2026-08-15  
**Live URL:** https://primayuda.dev/birthday-card-generator/  
**Repo:** https://github.com/primayuda/birthday-card-webapp  
**Latest commit:** `6c4a6b9` — Add gender selection for AI messages and lucky fill.

To resume in Cursor, say: **"Read `.cursor/SESSION.md` and continue where we left off."**

---

## What this app is

Astro 7 + React + Tailwind + shadcn/ui birthday card generator. Users fill a form (name, gender, age, hobby, adjective, plural nouns), get an AI-written funny message, a random birthday image, and a festive card preview. Cards stack; copy is plain text only.

Deployed on **Cloudflare Workers** (not Pages), hosted at subpath `/birthday-card-generator/` on `primayuda.dev`.

---

## Stack & layout

| Layer | Path / detail |
|-------|----------------|
| Frontend | `src/components/BirthdayCardGenerator.tsx`, `BirthdayCardPreview.tsx` |
| Astro page | `src/pages/index.astro` |
| AI client helpers | `src/lib/requestCardMessage.ts`, `requestLuckyFill.ts`, `requestBirthdayImage.ts` |
| Templates fallback | `src/lib/messages.ts`, `src/lib/luckyWords.ts` |
| Gender | `src/lib/gender.ts` — `male` \| `female` \| `undisclosed` (default) |
| Local images fallback | `public/birthday/*.jpg` (7 photos) |
| App Worker (API + assets) | `workers/app/` — `birthday-card-webapp` |
| Router Worker | `workers/router/` — proxies `primayuda.dev/birthday-card-generator*` |

---

## API endpoints (Worker)

All under `/birthday-card-generator/api/`:

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/generate` | POST | Workers AI birthday message (`@cf/meta/llama-3.2-3b-instruct`) |
| `/api/lucky` | POST | AI random form fill (accepts `{ gender }`) |
| `/api/image` | GET | Unsplash random birthday photo |

Template/local fallbacks run client-side when API fails or limits hit.

---

## Secrets & env

Set on Cloudflare Worker `birthday-card-webapp`:

```bash
npx wrangler secret put UNSPLASH_ACCESS_KEY --config workers/app/wrangler.jsonc
```

GitHub Actions deploy secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.

Workers AI binding is in `workers/app/wrangler.jsonc` (`env.AI`).

---

## Local development

```bash
npm run dev          # foreground
npm run dev:background # background
npm run dev:stop
npm run dev:status
```

Open: http://localhost:4321/birthday-card-generator/

**Important:** Astro dev has no Worker. In dev, API calls go to **production** via `src/lib/apiBase.ts` (CORS enabled on Worker). Use `npx astro` or `npm run` — `astro` is not global.

Full local Worker + AI: `npx wrangler dev --remote --config workers/app/wrangler.jsonc`

---

## Deploy

```bash
npm run deploy:all   # app Worker + router Worker
```

CI: `.github/workflows/deploy.yml` on push to `main`.

---

## Features completed this session

- [x] Subpath hosting on `primayuda.dev/birthday-card-generator/`
- [x] Workers AI message generation + template fallback
- [x] Workers AI “I'm feeling lucky” + preset fallback
- [x] Fixed lucky-fill JSON object parsing (Workers AI returns objects, not strings)
- [x] Fixed card messages in local dev (production API proxy + CORS)
- [x] Unsplash random card images + photographer attribution
- [x] Gender selection: Male / Female / Prefer not to disclose
- [x] npm scripts: `dev:background`, `dev:stop`, `dev:status`, `dev:logs`

---

## Known behavior

- **Template messages** use fixed phrases like “hitting the big 30” — if you see those, AI fallback was used. UI shows “Classic message — AI unavailable.” or daily limit note.
- **Shuffle** re-rolls message only; image stays the same per card.
- **Unsplash demo mode:** 50 requests/hour until production approval.
- **Workers AI free tier:** ~10,000 Neurons/day on Free plan.

---

## Possible next steps (not started)

- Refresh image on shuffle
- Apply for Unsplash production rate limit
- Proxy API through Astro dev without hitting production
- More shadcn components / print-friendly card layout

---

## Recent commits

```
6c4a6b9 Add gender selection for AI messages and lucky fill.
085f4e1 Add Unsplash API for random birthday card images.
7a4e9b7 Fix AI card messages in local dev and harden generate parsing.
65e1383 Fix lucky-fill parsing when Workers AI returns JSON objects.
72b7f8c Use Workers AI for I'm feeling lucky form fills.
6522595 Add Workers AI message generation with template fallback.
```

---

## Agent transcript (full chat history)

Cursor transcript ID: `5cca56b4-676e-41c9-a481-d232d7f3b82b`
