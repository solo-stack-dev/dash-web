# AGENTS.md

This repo is the official website of **Dashnut**, the mobile game in `D:\repos\dash` (Godot, separate repo). The site is the game's home for Google Play and the App Store: a landing page with store style screenshots, a support page, the privacy policy and the imprint. Read [docs/PROJECT.md](docs/PROJECT.md) before changing pages or copy.

## Hard rule: public text comes from `gpt-6.1-sol`

Any text that ships to visitors must be generated with OpenAI **`gpt-6.1-sol`**. That covers page copy, titles, meta descriptions, alt text, microcopy, legal texts and translations. Claude and other agents must not write it themselves, because their output may carry watermarks.

- Agents write code, prompts, structure, and docs. Where copy is needed, add a clearly marked placeholder (`TODO(copy): …`) or generate it with the model.
- Prompts live in `docs/copy/<name>-prompt.md` and share the fact sheet [docs/copy/FACTS.md](docs/copy/FACTS.md) via `{{FACTS}}`. Run `pnpm copy <name> [json|md]` (wraps `codex exec -m gpt-6.1-sol`); the reply lands in `docs/copy/<name>-output.*`.
- UI strings: `node scripts/messages.mjs` merges the JSON outputs into `messages/{locale}.json`. Never edit message values by hand.
- Prompts must follow the copy rules in [docs/PROJECT.md](docs/PROJECT.md#voice-and-copy-rules).

## Stack in one glance

SvelteKit 3 + Svelte 5 (runes, experimental `async`) on Cloudflare Workers, every page prerendered. The one dynamic part is the `/contact` form (`src/lib/contact/`): a `form` remote function with valibot, Cloudflare Turnstile (secret `TURNSTILE_SECRET_KEY` in `.env.<env>`, see `.env.example`) and a `send_email` binding. Tailwind CSS 4, mdsvex for the legal Markdown, Paraglide for i18n (`en` base at `/`, `de` at `/de`), `@sveltejs/enhanced-img` for every image, super-sitemap.

## Conventions

- **Every page is static** (`export const prerender = true` in the root layout). For data loading or forms use SvelteKit remote functions (`query`, `prerender`, `command`, `form` in `*.remote.ts`) validated with valibot, not `+page.server.ts` loads or API routes.
- Import from `src/lib` via the `#lib/*` subpath import (see `package.json` `imports`).
- UI strings go through Paraglide messages in `messages/{locale}.json`; `src/lib/paraglide` is generated, never edit it. Game proper nouns (world and course names, "Dashnut") stay in code.
- Game facts and publisher details live in `src/lib/site.ts`; store URLs there switch the "coming soon" badges to links.
- **Performance is a feature.** Images through enhanced-img (AVIF/WebP), animations cheap and paused under `prefers-reduced-motion`. Ask before adding a heavy dependency.
- pnpm only. New packages are subject to a 5 day minimum release age (`pnpm-workspace.yaml`).
- Install packages only via `sfw pnpm …` (e.g. `sfw pnpm add -D foo`).
- Format and lint with oxfmt/oxlint (tabs, single quotes, width 170). Tailwind arbitrary values (`w-[13px]`) are a lint error: add a theme token or use scoped CSS.

## Screenshots

Gameplay screenshots are captured from the game with Godot (see [docs/PROJECT.md](docs/PROJECT.md#screenshots)). Raw 2560×1440 PNGs go to `docs/screens/raw/`, `pnpm screens` encodes the selection into `src/lib/screens/` plus `static/og.jpg`.

## Commands

- `pnpm dev`: dev server
- `pnpm check`: type check (also regenerates Worker types)
- `pnpm lint` / `pnpm format`
- `pnpm build`, `pnpm preview`: production build and local Worker preview
- Deploys (`staging:deploy`, `production:deploy`) are run by the owner only.
