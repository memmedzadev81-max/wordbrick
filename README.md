# WordBrick

Analitiklər üçün interaktiv ingilis dili öyrənmə platforması: Leitner təkrar kartları, Test, Söz Blitz, Kərpic cümlə, Kölgə (shadowing) üsulu, AI Dialoq (Gemini), lüğət və analitika paneli.

**Stack:** React 19 + Vite + Tailwind 4 · Express · Google Gemini (yalnız serverdə) · Vitest

## İşə salmaq

```bash
npm install
cp .env.example .env      # GEMINI_API_KEY yazın (istəyə görə)
npm run dev               # http://localhost:3000
```

AI açarı yoxdursa: kartlar, test, blitz, lüğət, kərpic qaydası, kölgə, analitika işləyir. AI Dialoq, AI söz yaradıcı və AI cümlə rəyi söndürülmüş görünür.

## Yoxlama

```bash
npm run check             # tsc + vitest + vite build
```

## Yayım (production)

```bash
npm run build
npm start                 # dist/ qovluğunu və /api-ni PORT-da verir
```

- API açarı **yalnız** serverdə qalır (`.env` və ya host-un Secrets bölməsi). `.env` heç vaxt GitHub-a yüklənmir (`.gitignore`-dadır).
- Proxy arxasında (Render, Cloud Run) `TRUST_PROXY=1` qoyun ki, sürət limiti real IP ilə işləsin.
- Server: IP üzrə dəqiqədə 20 AI sorğusu, sorğu həcmi 100 KB, giriş sahələri `zod` ilə yoxlanır, Gemini cavabı sxemə uyğun deyilsə istifadəçiyə göstərilmir.

## Windows üçün WordBrick.exe

```bash
npm run build:exe         # release/WordBrick.exe
```

## Məlumat harada saxlanır?

Hər şey (sözlər, XP, zəncir) istifadəçinin **brauzerində** (`localStorage`) saxlanır.

## Öyrənmə məntiqi

| Rejim | Qayda |
|---|---|
| Kartlar | Again / Hard / Good / Easy — Leitner qutuları |
| Test | Cavab Leitner qutusunu yeniləyir |
| Blitz | Yalnız düz/səhv sayğacı |
| XP | Sandıq, günlük tapşırıq, kərpic, kölgə və Blitz |

## Qovluq

```
server.ts          Express + Gemini API, rate limit, zod
src/App.tsx        əsas qabıq
src/components/    rejimlərin ekranları
src/utils/         leitner, gamification, storage, api
tests/             vitest testləri
```
