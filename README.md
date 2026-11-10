# dashnut-web

Official website of **Dashnut**, a time trial runner for Android and iOS: the landing page, support page, privacy policy and imprint that the Google Play and App Store listings link to.

## Stack

SvelteKit 3 + Svelte 5 on Cloudflare Workers (fully prerendered), Tailwind CSS 4, mdsvex, Paraglide (`en` + `de`), enhanced-img, super-sitemap.

## Getting started

Requires Node `>=24.18` and pnpm.

```sh
pnpm install
pnpm dev
```

| Command                     | What it does                                                     |
| --------------------------- | ---------------------------------------------------------------- |
| `pnpm dev`                  | Dev server                                                       |
| `pnpm check`                | Type check (also regenerates Worker types)                       |
| `pnpm lint` / `pnpm format` | oxlint / oxfmt                                                   |
| `pnpm build`                | Production build                                                 |
| `pnpm preview`              | Build and run the Worker locally with `wrangler dev`             |
| `pnpm copy <name>`          | Generate copy with gpt-6.1-sol from `docs/copy/<name>-prompt.md` |
| `pnpm screens`              | Encode the selected game screenshots and the OG image            |

## Before launch

- Set the real domain in `vite.config.ts` (`origins`) and `wrangler.jsonc` (`routes`); search for `TODO(domain)`.
- Put the store URLs into `src/lib/site.ts` once the listings are live, and swap the badges for the official artwork.
- Update the privacy policy before a game version with ads ships (and add `static/app-ads.txt` for AdMob).

## Docs

- [docs/PROJECT.md](docs/PROJECT.md): pages, copy rules, screenshots, open items
- [AGENTS.md](AGENTS.md): rules for AI coding agents working in this repo

## License

Proprietary, all rights reserved: see [LICENSE.md](LICENSE.md). Dashnut, its name, characters, artwork and screenshots, and the site's text belong to Peter Ruß. Lilita One and Nunito are licensed under the SIL Open Font License 1.1 (`static/fonts/OFL-*.txt`).
