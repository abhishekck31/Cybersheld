# CyberShield

A compact, demo-focused security tools web app built with Next.js (app router), TypeScript and Tailwind CSS. The project provides a collection of small security utilities (URL checker, QR analyzer, phone validator, password checker, etc.). Many tools in this repo are implemented as offline/demo flows that return deterministic or pseudo-random hardcoded results so the UX remains stable without external APIs.

This README summarizes project structure, how to run the app locally (Windows PowerShell), which tools are real vs demo/hardcoded, and recommended next steps to turn demos into production features.

---

## Quick start (Windows PowerShell)

- Install dependencies and start the dev server:

```powershell
pnpm install
pnpm dev
# or with npm:
# npm install
# npm run dev
```

- Open http://localhost:3000 and go to the Tools page `/tools` to explore the utilities.

Notes:
- The project uses Next.js (app directory). Tailwind classes are used across components.
- If you use npm instead of pnpm, run the npm commands above.

---

## What this repo contains (high-level)

- Next.js app (app dir) with client components and shared UI in `components/`.
- Tools are mounted under `app/tools/` — each tool page is a simple client page that either performs a small client-side action, or returns demo results.
- Mock/demo pattern: many tools use deterministic pseudo-random logic to produce realistic-looking results without external services (useful for demos and offline development).

Key demo pages added or updated during recent work:
- `app/tools/qr-analyzer/page.tsx` — QR Code Analyzer (hardcoded demo: analysis result derived deterministically from uploaded file name/size; simulated 3–5s scan for UX).
- `app/tools/qr-scanner/page.tsx` — redirect page: redirects `/tools/qr-scanner` → `/tools/qr-analyzer` (keeps older links working).
- `app/tools/phone-validator/page.tsx` — phone validator updated to return arrays of possible carriers/locations with explanatory note about heuristics and porting.

New fast demo tool pages (hardcoded deterministic results):
- `app/tools/social-checker/page.tsx` — Social Profile Checker (URL input).
- `app/tools/domain-analyzer/page.tsx` — Domain Age Checker (domain input).
- `app/tools/ip-lookup/page.tsx` — IP Address Lookup (IP input).
- `app/tools/file-analyzer/page.tsx` — File Hash Checker (upload or paste hash).
- `app/tools/wifi-analyzer/page.tsx` — Wi‑Fi Security Scanner (SSID input).
- `app/tools/ssl-checker/page.tsx` — SSL Certificate Checker (URL input).
- `app/tools/breach-monitor/page.tsx` — Data Breach Monitor (email input).

Other notable places:
- `components/language-switcher.tsx` — language switcher that persists language selection; a Google Translate widget loader was added in earlier iterations (client-side approach, demo only).
- `app/tools/page.tsx` — main Tools grid, lists all the tools and links to `/tools/<id>`.

---

## How the demo tools behave

- All demo tools are client-side pages and intentionally lightweight.
- Each demo page uses a simple deterministic hash of the user input (e.g., sum of character codes + file size) to pick a bucket of pre-written results. This makes results feel realistic but reproducible for a given input.
- A short simulated delay (~300–800 ms, or 3–5s for the QR demo) is used to mimic real analysis and improve UX.

Why this approach?
- Avoids external API dependencies (no network, no keys).
- Keeps the app stable for demos, QA, and offline testing.

---

## Converting demos into production features (recommended roadmap)

1. QR decoding
   - For real decoding of images, integrate a client-side decoder such as `jsqr` (lightweight) or `@zxing/library` (more robust). The QR analyzer currently uses a hardcoded demo; enabling a real decoder requires reading the uploaded image into a canvas and decoding the pixels.

2. Threat intelligence / reputation
   - For URL/domain reputation, integrate a trusted API or local threat database. Consider caching results and respecting rate limits.

3. Phone lookup improvements
   - Replace demo prefix maps with an authoritative numbering plan dataset or a phone number intelligence API to accurately identify carrier and geolocation and to detect ported numbers.

4. Breach monitoring
   - Integrate a responsibly used breach dataset (e.g., Have I Been Pwned) and implement privacy-safeguards (hashing, rate-limiting, clear consent).

5. Security & privacy
   - Avoid sending raw user secrets (passwords, files) to external services unless explicitly consented. Use local-first checks and hashed queries when possible.

---

## Developer notes & structure

- Root
  - `package.json` — project manifest. (Note: recent edits removed an optional jsQR dependency when demos were selected.)
  - `next.config.mjs`, `tsconfig.json`, `tailwind.config.ts` — standard Next/Tailwind config files.

- App
  - `app/tools/` — tool pages (listed above).
  - `app/news`, `app/quiz`, `app/tools/*` — other app routes.

- Components
  - `components/` — shared UI (cards, buttons, navigation, language switcher, etc.).

- Hooks & lib
  - `hooks/`, `lib/` — small utilities and data fetch helpers used by some pages.

---

## How to test manually

1. Start the dev server (see Quick start).  
2. Visit `/tools` and click any tool tile.  
3. Use the sample inputs or your own inputs — the demo logic will produce reproducible results per input.

Tip: if you want deterministic test cases, choose or share specific input strings (I can add a small mapping so inputs like `test-bad` always return a malicious report).

---

## Contributing

- This repo is set up for local development with Next.js. If you add real integrations, please:
  - Add configuration options to a secure environment file (do not hardcode API keys),
  - Add unit/integration tests for external integrations, and
  - Document any required provider keys and rate limits in this README.

---


