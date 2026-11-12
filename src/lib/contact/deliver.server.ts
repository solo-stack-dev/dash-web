/* oxlint-disable no-console -- server logs end up in Workers Logs (observability), the only place to see form failures */
import { env } from 'cloudflare:workers';
import { CONTACT_EMAIL, GAME_NAME } from '#lib/site.ts';
import type { ContactMessage } from './schema.ts';

/**
 * Same sender as the contact form of solo-stack.dev: the domain is onboarded to Cloudflare Email Sending in the same account.
 * Pinned by `allowed_sender_addresses` of `CONTACT_MAIL` (`wrangler.jsonc`).
 */
const FROM = { email: 'contact@solo-stack.dev', name: `${GAME_NAME} Contact` } as const;

/**
 * The public contact address (`CONTACT_EMAIL`); Email Routing (dashboard) forwards it to the owner's private inbox, which thus
 * stays out of this public repo. Must match the binding's `destination_address`.
 */
const TO = CONTACT_EMAIL;

/**
 * Mails a verified message to the owner. The binding pins sender and recipient, so the Worker cannot mail anyone else;
 * `Reply-To` is the visitor. `pnpm dev`/`preview` only print the mail. Throws on failure (the form asks to retry later).
 */
export async function deliverContactMessage(message: ContactMessage): Promise<void> {
	const { messageId } = await env.CONTACT_MAIL.send({
		from: FROM,
		to: TO,
		replyTo: { email: message.email, name: message.name },
		subject: `[${GAME_NAME}/${message.topic}] ${message.name}`,
		text: [`Topic: ${message.topic}`, `Name: ${message.name}`, `Email: ${message.email}`, '', message.message].join('\n')
	});
	console.log('Contact form message sent', { messageId, topic: message.topic });
}
