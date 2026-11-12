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

- [ ] **Add the contact form** (owner, separate thread). Per AGENTS.md: a SvelteKit `form` remote function in a `*.remote.ts` file, validated with valibot. This ends "no secrets" (a mail service needs an API key) and the page with the form can no longer be purely prerendered.
- [ ] Then update `docs/copy/impressum-prompt.md` to list email and the form as contact channels, regenerate with `pnpm copy impressum md`, and copy the result into `src/content/legal/impressum.md`. Mention the form in the privacy policy (what it collects, why, how long it is kept) via the privacy prompts.
- [ ] Link the form from `/support` as well.
