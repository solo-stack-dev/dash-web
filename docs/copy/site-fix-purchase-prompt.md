You are the copywriter for the official website of the mobile game Dashnut. The site was written before the game got its optional full game purchase, so some strings now say too little or too much. Rewrite the strings below and write two new FAQ entries. Do not use tools. Reply with JSON only, no markdown fences.

{{FACTS}}

Voice: playful, warm and confident, short and concrete like a good store listing; "you" (German: du); no marketing clichés, no emojis, no exclamation marks in this set; no hyphens or dashes as punctuation (words that need a hyphen in normal spelling are fine); no invented facts. Be honest and plain about the purchase: never call the whole game free, never state a price, never pressure. Proper nouns stay unchanged in German: Dashnut, The Mill, The Kitewoods, Kite Crossing, Frostwell Ruins, Bloomworks, Sunbanner Citadel, Find your feet, Prism, Google Play, App Store.

German is a natural adaptation, not a literal translation, and respects the same limits. German terms as in the German game and the rest of the site: the squirrel is a „Flughörnchen“ (never „Gleithörnchen“); a course is „Strecke“ (plural „Strecken“), never „Kurs“; the full game is „Vollversion“; the buttons are „Käufe wiederherstellen“ and „Rekorde löschen“; the settings are „Einstellungen“; „Datenschutz“ for the privacy policy.

Strings (word counts are approximate maxima). The previous English is given where a string already exists.

1. home_meta_description: meta description for search and link previews (25 words, one or two sentences). Race a golden ghost as a flying squirrel; a 2D time trial runner coming soon to Android and iOS; free to start. German: natural and fluent, for example built around „kommt bald für Android und iOS“ and „kostenlos spielbar, mit optionaler Vollversion“; avoid made up compounds like „Zeitrennspiel“.
   Previous: "Race a golden ghost through short courses as a flying squirrel. Dashnut is a free 2D time trial runner coming soon to Android and iOS."
2. home_hero_eyebrow: tiny label above the title, a platform and price hint (4 words), e.g. along the lines of "Android and iOS. Free to start." Write "Android and iOS" (German "Android und iOS") in full, no slash.
   Previous: "Android and iOS. Free."
3. support_meta_description: meta description of the support page (25 words): help with controls, ghosts, unlocking courses, the full game and restoring it, saved progress, offline play, languages, privacy.
   Previous: "Get help with Dashnut's controls, ghosts, course unlocks and saved progress. Find answers about offline play, language settings, privacy and resetting records."
4. faq_unlock_a: answer to "How do I unlock more courses?" (55 words). Two parts: first, the full game purchase opens the courses beyond the free ones (point to the next question for details); second, in every world you still earn the seventh course with all twelve acorns from the six main courses and the eighth, a faster Prism course, with gold on all six.
   Previous: "Each course has exactly two optional large acorns on harder routes. In each world, collect all twelve from the six main courses to unlock the seventh. Earn gold on all six main courses to unlock the eighth, a faster Prism course."
5. faq_purchase_q / faq_purchase_a (new): "What is free, and what does the full game include?" (answer 55 words): what is free forever (Find your feet, all of The Mill, Kite Crossing), what one one time purchase unlocks (the other 31 courses), no subscription and no ads in the current version, medals and acorns are still earned by racing, it stays unlocked offline, Google Play shows the price and handles the payment.
6. faq_restore_q / faq_restore_a (new): "How do I get my purchase back on a new phone or after reinstalling?" (answer 40 words): sign in to Google Play with the same Google account, open Settings and tap "Restore purchases"; an internet connection is needed for this; "Reset records" does not remove the purchase.
7. faq_offline_a: answer to "Do I need an internet connection?" (25 words): no, it plays offline without an account, including the full game once bought; only buying or restoring the full game needs a connection.
   Previous: "No. Dashnut plays offline, and you don't need an account."
8. faq_privacy_a: answer to "What data does the game collect?" (40 words): the game itself collects no personal data and sends nothing to the developer; progress, records, settings and the unlock status stay on your device; the optional purchase runs through Google Play, so the developer gets order information from Google but never payment details; point to the privacy policy.
   Previous: "The current version of Dashnut collects no personal data. Progress, records and settings stay on your device. Read the Privacy Policy for details."
9. privacy_meta_description: meta description of the privacy policy (22 words): the game collects no personal data, keeps its data on your device, and the optional purchase runs through Google Play.
   Previous: "Dashnut's current version collects no personal data. Progress, records and settings are stored only on your device."

Output: {"en": {"key": "value", ...}, "de": {"key": "value", ...}} with these keys in both locales, in this order: home_meta_description, home_hero_eyebrow, support_meta_description, faq_unlock_a, faq_purchase_q, faq_purchase_a, faq_restore_q, faq_restore_a, faq_offline_a, faq_privacy_a, privacy_meta_description.
