# Verified facts for copy prompts

Paste this block into every copy prompt. Source: the game repo (`D:\repos\dash`: README, `docs/Dashnut-Game-Design.md`,
`game/presentation/course_catalog.gd`, `game/i18n/en.po`, `export_presets.cfg`, `docs/MONETIZATION.md`,
`content/monetization/free_slice.json`) and the owner's publisher record, checked 2026-11-08; purchase facts checked 2026-11-12. Change a fact here first, then regenerate the copy that uses it.

```text
FACTS (use only these, invent nothing):
- Game name: Dashnut. Official subtitle: "Flying squirrel. Beat the ghost."
- Genre: a 2D time trial auto runner for phones, played in landscape. Dashnut is a small flying squirrel with black fur and a gold belly who always runs to the right.
- Each course is short (about 45 seconds). The clock is the opponent. A golden ghost runs a fast line ahead of you; match or beat its time to earn gold. The gold ghost can be hidden in Settings; a ghost of your own personal best can be switched on.
- Medals: bronze, silver and gold per course, plus local personal best times.
- Five worlds with eight courses each, plus the tutorial "Find your feet":
  1. The Mill: warm timber, heavy machinery, saws and presses.
  2. The Kitewoods: copper leaves, kites and cloth in the wind, hawks, silver branches.
  3. Frostwell Ruins: frozen arches, warm water, melting frost pillars, falling ice.
  4. Bloomworks: spring gardens, living roots, a factory in bloom, glass, petals, lasers.
  5. Sunbanner Citadel: sunlit stone, moving defenses, cannons, catapults, knights.
- Every course has exactly two optional large acorns on harder routes. Collect all twelve acorns of a world's six main courses to unlock its seventh course; earn gold on those six courses to unlock its eighth, a faster "Prism" course.
- Controls (touch, no on screen buttons): tap to hop; swipe up for a high leap that floats down; swipe down to slide under things or drop down; swipe right to dash; swipe left to brake briefly.
- Falling restarts the course automatically after a short moment, so the next attempt starts almost immediately.
- Plays offline. No account needed. Progress, records and settings are stored only on the device. An internet connection is needed only to buy or restore the full game.
- Android backup is disabled (user_data_backup/allow=false, allowBackup="false"). Saves are not included in Android/Google backups; progress stays on the device. The purchase itself is restorable through Google Play. For iOS, preserve the existing conditional iCloud backup statements and Apple terms; do not change other iOS facts.
- Android declares four permissions: android.permission.VIBRATE for optional haptic feedback; com.android.vending.BILLING, android.permission.INTERNET and android.permission.ACCESS_NETWORK_STATE added by the Google Play Billing Library, used only to offer, check and restore the optional one-time full-game purchase. Name all four in plain language. The game code itself makes no network requests. Do not add or remove claims about what Google's library does beyond these permission facts. It accesses no location, contacts, camera, microphone, photos or advertising ID (name all six).
- Languages in the game right now: English and German.
- Price: free download with one optional in app purchase, the "full game" (German in the game: „Vollversion“). Free forever: the tutorial Find your feet, all eight courses of The Mill, and Kite Crossing (the first course of The Kitewoods). One one time purchase unlocks the other 31 courses (the rest of The Kitewoods and the worlds Frostwell Ruins, Bloomworks and Sunbanner Citadel). No subscription, no in game currency, no ads in the current version.
- The purchase only removes the purchase lock: medals, acorns, the seventh and eighth courses are still earned by racing as described above. Once bought, the full game stays unlocked, also offline. Never state a price on the website (Google Play shows the local price).
- On Android the purchase is made and paid through Google Play; the developer never sees payment details. Settings has a "Restore purchases" button (German: „Käufe wiederherstellen“) to restore the full game, for example after reinstalling, with the same Google account. "Reset records" does not remove the purchase. The iOS version is not built yet; do not describe how buying works on iOS.
- Platforms: Android (Google Play) and iOS (App Store). NOT released yet, no release date: say "coming soon" at most.
- Made by Solo Stack, the one person studio of Peter Ruß in Germany. Never name a city or region. Built with the Godot Engine. The art has a painted look (it is generated art: never say "hand painted" or "hand drawn").
- Do NOT claim: "free" without saying it is free to start or a free download (the full game is a purchase), "no in app purchases", "no ads, ever" (say only that the current version has no ads), number of downloads, ratings, awards, release dates, multiplayer, online leaderboards, more languages, tablet or controller support.
```
