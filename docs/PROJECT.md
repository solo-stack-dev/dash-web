# Dashnut website

## Goal

The public home of the game Dashnut (`D:\repos\dash`) for its store listings. Both stores need a public privacy policy URL, Apple also needs a support URL, and a German publisher needs an imprint (§ 5 DDG). Beyond that the site should sell the game the way a store page does: what it is, how it looks, how it plays. Simple, fast, static.

Audience: players arriving from a store listing or a link, and store reviewers checking the policy and support pages.

## Pages

| Path                          | Content                                                                                      | Store field                                  |
| ----------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `/`                           | Hero with store badges, screenshot carousel, features, five worlds, controls, call to action | Marketing URL (Apple), website (Google Play) |
| `/support`                    | Contact email and FAQ (controls, ghost, unlocks, saves, reset, language, offline, privacy)   | Support URL                                  |
| `/privacy`                    | Privacy policy for the app and the website, EN and DE                                        | Privacy policy URL                           |
| `/impressum`                  | Imprint, German in every locale, one canonical URL                                           | –                                            |
| `/robots.txt`, `/sitemap.xml` | Prerendered per build mode; staging disallows crawling                                       | –                                            |

Every page exists at `/…` (English, base locale) and `/de/…` (German). Adding a locale: add it to `project.inlang/settings.json`, generate `messages/<locale>.json` (translation prompt), and add a privacy text file if the policy should be translated (otherwise the English text shows).

## Brand

Taken from the game, so the site feels like the title screen: the mill at golden hour. Dark warm wood (`bark`, `walnut`, `plank`), gold and amber light (`gold`, `amber`, `ember`), cream text. Headings in **Lilita One**, body in **Nunito** (both from the game, OFL). Assets reused from the game repo: the app icon, the world menu paintings, the squirrel and ghost sprites, the acorn and the gold medal. The art is generated (see `art/PROVENANCE.md` in the game repo): never call it hand painted.

## Voice and copy rules

All visitor facing text is generated with `gpt-6.1-sol` (see [AGENTS.md](../AGENTS.md)). Prompts should ask for:

- **English** as the base language and a natural **German** adaptation (du form). German uses the game's own terms: „Strecke“ (course), „Einstellungen“, „Rekorde löschen“.
- Playful, warm and confident, short and concrete like a good store listing. No marketing clichés, no emoji, at most a couple of exclamation marks.
- Natural phrasing **without hyphens or dashes** as punctuation.
- **No invented facts.** Only what [copy/FACTS.md](copy/FACTS.md) states. In particular: no release dates, no "no ads" claims (ads are planned for 1.0), no download numbers, no languages beyond EN/DE.
- Proper nouns stay unchanged in every language: Dashnut, The Mill, The Kitewoods, Frostwell Ruins, Bloomworks, Sunbanner Citadel, Find your feet, Prism.

Copy files: `docs/copy/site-*` (UI strings → `messages/`), `impressum-*`, `privacy-en-*`, `privacy-de-*` (→ `src/content/legal/`).

## Screenshots

Captured from the real game with Godot 4.7.2 at 2560×1440 (content scale 1280×720, so the art renders at 2×), English UI, gold ghost visible, no debug overlays. The capture script lives in the game repo's git-ignored `artifacts/web-shots/` folder (`capture_web_shots.gd`, run via `run.ps1`, which uses a throwaway profile). The raw PNGs (~100 MB) are git-ignored here too; only `shots.json` and the encoded WebPs are committed (see `docs/screens/raw/shots.json` for what each frame shows and how it was made). `pnpm screens` (`scripts/screens.mjs`) encodes the selected frames to WebP in `src/lib/screens/` and builds the 1200×630 `static/og.jpg`. The carousel captions are message keys (`shot_caption_*`).

## Open items (owner)

- **Domain**: placeholder `dashnut.example` in `vite.config.ts` and `wrangler.jsonc` (`TODO(domain)`).
- **Store URLs**: `src/lib/site.ts` → `STORE_URLS`; then replace the generic badges with the official Google Play / App Store badge artwork.
- **Ads**: before the ads build ships, update `docs/copy/FACTS.md` and the privacy prompt with the ad provider, regenerate both privacy texts, update the support FAQ answer about data, and add `static/app-ads.txt` (AdMob).
- **Game links**: set `SUPPORT_URL` and `PRIVACY_URL` in the game's `game/presentation/about_menu.gd` to `/support` and `/privacy` on the final domain.
- **USt-IdNr.**: replace „beantragt“ in the imprint once it is assigned (regenerate with the impressum prompt).
