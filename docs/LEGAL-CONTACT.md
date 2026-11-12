# Imprint address and contact channels

**Decided 12 Nov 2026.** Read this before changing the imprint or privacy contact details, or reopening the address question. The full decision, including the store and payment accounts, lives in the game repo: `D:\repos\dash\release\ADDRESS-AND-CONTACT.md`. This repo is public, so no private data goes here.

## What the site shows and why

| Item                        | Value                                                                           | Why                                                                                                                                                                               |
| --------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Imprint and privacy address | The **c/o business-address service** (PostFlex) already in `src/content/legal/` | Legally defensible: the service holds an authorization to accept formal service (§ 171 ZPO), which is what courts check under § 5 Abs. 1 Nr. 1 DDG. Not certain; see risks below. |
| Contact channels            | **Email + contact form**, no phone number                                       | § 5 Abs. 1 Nr. 2 DDG needs a second fast, direct channel next to email. EuGH C-298/07: it need not be a phone; a web form answered by email is enough.                            |

**Email alone is not enough**, so the contact form is required, not optional. Two conditions from C-298/07: answer form messages quickly (the case had 30 to 60 minutes; not a fixed deadline), and if someone who wrote online has no internet access and asks for a non-electronic channel, give them one on request (the business phone number).

**The address does not have to match the stores.** No rule in the DDG, the DSA (Art. 30) or the GDPR requires the imprint address to equal the Google Play or Apple address. Each one only has to be true and reachable for the same person. In practice they will differ: a personal Google Play account shows the address from its payments profile, which must be the verified residence, while the site keeps the c/o address.

**The phone number belongs in the stores only.** The DSA (Art. 30) makes Google and Apple collect and display a trader's phone number. That is a store requirement, not a website one.

## Risks

- Some sources (IHK Berlin, e-recht24) call virtual or c/o addresses not safe for an imprint, and no appellate decision approves one for a sole trader. Once Google Play shows a different address, an opponent could argue the publisher is not established at the c/o address.
- Fallback if a lawyer advises against it: put the residential address in the imprint too.

## Next steps

- [x] **Add the contact form**: `/contact`, a `form` remote function (`src/lib/contact/contact.remote.ts`) validated with valibot, Cloudflare Turnstile against spam (secret `TURNSTILE_SECRET_KEY`), mailed through a Cloudflare Email Sending binding from `contact@solo-stack.dev` to the public contact address, Reply-To the visitor (same setup as solo-stack.dev). The page stays prerendered; only the submission runs in the Worker. There is no separate contact database. Mail is retained in the inbox; successful delivery logs the message ID and topic, while failed delivery logs the full submitted name, email, topic and message in Workers Logs.
- [x] **Update the legal texts**: regenerated the imprint and both privacy policies with `gpt-6.1-sol` through `pnpm copy impressum md`, `pnpm copy privacy-en md` and `pnpm copy privacy-de md`, then copied the outputs into `src/content/legal/`. The imprint links to `/de/contact`; the privacy policies cover the required fields, purpose and legal bases, retention, Turnstile browser processing and provider roles, Email Sending, Email Routing to Gmail, international transfers and full-message logging on delivery failure. Prompts and shared facts now describe the implemented form.
- [x] Link the form from `/support` (and the footer).

## Privacy copy verification (12 Nov 2026)

The form disclosures were checked against `src/lib/contact/schema.ts`, `contact.remote.ts`, `deliver.server.ts`, `turnstile.server.ts` and `TurnstileWidget.svelte`. Keep the mandatory name field, lazy loading before submission, server-side IP/token verification, email routing and failure-log contents in sync when changing the implementation.

Sources for the copy prompts:

- [Cloudflare Turnstile Privacy Addendum](https://www.cloudflare.com/turnstile-privacy-policy/): technical signals, processor role for website protection and separate controller role for improving bot detection. Read together with [Cloudflare's privacy policy](https://www.cloudflare.com/privacypolicy/).
- [Cloudflare Email Service](https://developers.cloudflare.com/email-service/): Email Sending and Email Routing are distinct stages. The existing mailbox destination remains Gmail as documented in the privacy prompt.
- [Turnstile pre-clearance configuration](https://developers.cloudflare.com/turnstile/additional-configuration/hostname-management/pre-clearance/): cookies depend on configuration. The dashboard setting was not verified here; the policy makes no blanket cookie-free claim or claim that pre-clearance is enabled.
- [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng/), especially Articles 6 and 13; [§ 25 TDDDG](https://www.gesetze-im-internet.de/ttdsg/__25.html) for necessary device access; [§ 5 DDG](https://www.gesetze-im-internet.de/ddg/__5.html) for contact information.

No fixed mailbox, log or Turnstile-signal retention duration was verified. The policy gives purpose-based retention criteria and applicable legal obligations rather than inventing a day count or promising immediate deletion. This copy update does not change the form's logging or Cloudflare settings.
