<!--
	/contact: the contact form, the second direct contact channel next to email (§ 5 Abs. 1 Nr. 2 DDG, docs/LEGAL-CONTACT.md).
	Prerendered; only the submission runs in the Worker: `sendContact` (`#lib/contact/contact.remote.ts`), valibot preflight
	plus the same schema on the server, Turnstile against spam, mail via Cloudflare Email Sending. Issue codes map to
	`contact_error_*` messages. Without JS (no Turnstile) the page points to the email address.
-->
<script lang="ts">
	import { tick, untrack } from 'svelte';
	import * as v from 'valibot';
	import { sendContact } from '#lib/contact/contact.remote.ts';
	import { CONTACT_LIMITS, CONTACT_TOPICS, ContactSchema, type ContactTopic } from '#lib/contact/schema.ts';
	import TurnstileWidget from '#lib/contact/TurnstileWidget.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { m } from '#lib/paraglide/messages.js';
	import { localizeHref } from '#lib/paraglide/runtime.js';
	import { CONTACT_EMAIL } from '#lib/site.ts';

	const TOPIC_LABELS: Record<ContactTopic, () => string> = {
		support: m.contact_topic_support,
		purchase: m.contact_topic_purchase,
		feedback: m.contact_topic_feedback,
		privacy: m.contact_topic_privacy,
		other: m.contact_topic_other
	};

	const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	let turnstile = $state<ReturnType<typeof TurnstileWidget>>();

	// Turnstile starts on the first touch of the form, so a quick send can come before its token. While one is on its way,
	// preflight lets the empty token through and the send waits for it (below); the server still requires it.
	const contact = sendContact.preflight(
		v.object({
			...ContactSchema.entries,
			turnstile: v.pipe(
				v.string('turnstile'),
				v.check((value) => value !== '' || !!turnstile?.pending(), 'turnstile')
			)
		})
	);
	const { fields } = contact;

	let sent = $state(false);
	let failed = $state(false);
	let challengeFailed = $state(false);
	let token = $state('');
	let successHeading = $state<HTMLElement>();

	// Runs after preflight passed. A send without a token waits for it, then sends the form as it is now, token included; if
	// none comes on its own, the challenge message shows as for any send without one. Every send that goes out reaches the
	// server and spends the Turnstile token.
	const enhanced = contact.enhance(async (instance) => {
		failed = false;
		let submission: ReturnType<typeof instance.submit>;
		if (token) {
			submission = instance.submit();
		} else {
			try {
				await turnstile?.ready();
				await tick();
			} catch {
				await contact.validate({ preflightOnly: true });
				revealFirstIssue(instance.element);
				return;
			}
			submission = contact.submit();
		}
		try {
			// No arguments: nothing on this page needs a refresh
			if (await submission.updates()) {
				instance.element.reset();
				sent = true;
			}
		} catch {
			failed = true;
		} finally {
			turnstile?.reset();
		}
	});

	// The thanks replaces the form: bring it into view and hand it focus
	$effect(() => {
		if (!sent) return;
		successHeading?.focus({ preventScroll: true });
		successHeading?.scrollIntoView({ block: 'center', behavior: reducedMotion() ? 'instant' : 'smooth' });
	});

	/**
	 * A failed preflight leaves the issues on the fields but focus on the send button, often a screen below the first error.
	 * Once the issues are on the page, scroll that field's block into view (under the sticky nav via `scroll-padding-top`) and
	 * focus its control (the topic: its first choice). The Turnstile input is hidden, so its message is only brought into view.
	 */
	function revealFirstIssue(form: HTMLFormElement) {
		setTimeout(async () => {
			await tick();
			if (sent || contact.pending > 0) return;
			const control = form.querySelector<HTMLElement>('[aria-invalid="true"]');
			if (!control) return;
			const block = control.closest<HTMLElement>('[data-issue-anchor]') ?? control;
			block.scrollIntoView({ block: 'start', behavior: reducedMotion() ? 'instant' : 'smooth' });
			if (!(control instanceof HTMLInputElement && control.type === 'hidden')) control.focus({ preventScroll: true });
		});
	}

	/**
	 * After the first send attempt the form checks itself again as you correct it: a field that is right now clears its message
	 * at once (while typing in it), one you leave wrong shows it again on change. Preflight only, no request.
	 */
	function recheck(event: Event) {
		if (!contact.submitted) return;
		if (event.type === 'input' && (event.target as Element).getAttribute('aria-invalid') !== 'true') return;
		void contact.validate({ preflightOnly: true });
	}

	// A solved challenge clears its message too (its token arrives without an input event)
	$effect(() => {
		if (token && untrack(() => contact.submitted)) void contact.validate({ preflightOnly: true });
	});

	const invalid = {
		topic: () => !!fields.topic.issues(),
		name: () => !!fields.name.issues(),
		email: () => !!fields.email.issues(),
		message: () => !!fields.message.issues(),
		turnstile: () => !!fields.turnstile.issues() || challengeFailed
	};

	const mailto = `mailto:${CONTACT_EMAIL}`;
</script>

<Seo title={m.contact_meta_title()} description={m.contact_meta_description()} path="/contact" />

<svelte:head>
	<link rel="preconnect" href="https://challenges.cloudflare.com" />
</svelte:head>

{#snippet fieldError(id: string, show: boolean, text: string)}
	<p {id} class="error" aria-live="polite">
		{#if show}{text}{/if}
	</p>
{/snippet}

{#snippet emailLink()}
	<a href={mailto} class="font-bold break-all text-cream underline decoration-amber decoration-2 underline-offset-4">{CONTACT_EMAIL}</a>
{/snippet}

<div class="container-page max-w-3xl pt-10 sm:pt-16">
	<h1 class="text-gilded text-6xl leading-none sm:text-7xl">{m.contact_title()}</h1>
	<p class="mt-5 max-w-2xl text-lg leading-relaxed text-parchment">{m.contact_intro()}</p>

	<section class="card relative mt-10 rounded-card p-6 plank sm:p-8">
		{#if sent}
			<div class="grid justify-items-start gap-4 py-6">
				<h2 bind:this={successHeading} tabindex="-1" aria-describedby="contact-sent-body" class="text-4xl text-cream focus:outline-none sm:text-5xl">
					{m.contact_success_title()}
				</h2>
				<p id="contact-sent-body" class="max-w-xl text-lg leading-relaxed text-parchment" role="status">{m.contact_success_body()}</p>
				<button type="button" class="button-secondary mt-2" onclick={() => (sent = false)}>{m.contact_success_again()}</button>
			</div>
		{:else}
			<form {...enhanced} class="relative grid gap-8" novalidate onsubmit={(event) => revealFirstIssue(event.currentTarget)} oninput={recheck} onchange={recheck}>
				<fieldset class="grid min-w-0 gap-3" aria-describedby="contact-topic-error" data-issue-anchor>
					<legend class="label mb-3">{m.contact_topic_legend()}</legend>
					<div class="flex flex-wrap gap-2">
						{#each CONTACT_TOPICS as topic (topic)}
							<label class="chip">
								<input class="sr-only" {...fields.topic.as('radio', topic)} />
								<span>{TOPIC_LABELS[topic]()}</span>
							</label>
						{/each}
					</div>
					{@render fieldError('contact-topic-error', invalid.topic(), m.contact_error_topic())}
				</fieldset>

				<div class="grid gap-8 sm:grid-cols-2 sm:gap-6">
					<div class="grid content-start gap-2" data-issue-anchor>
						<label class="label" for="contact-name">{m.contact_name_label()}</label>
						<input
							id="contact-name"
							class="input"
							autocomplete="name"
							maxlength={CONTACT_LIMITS.name}
							required
							aria-describedby="contact-name-error"
							{...fields.name.as('text')}
						/>
						{@render fieldError('contact-name-error', invalid.name(), m.contact_error_name())}
					</div>

					<div class="grid content-start gap-2" data-issue-anchor>
						<label class="label" for="contact-email">{m.contact_email_label()}</label>
						<input
							id="contact-email"
							class="input"
							autocomplete="email"
							maxlength={CONTACT_LIMITS.email}
							required
							aria-describedby="contact-email-hint contact-email-error"
							{...fields.email.as('email')}
						/>
						<p id="contact-email-hint" class="text-sm text-dust">{m.contact_email_hint()}</p>
						{@render fieldError('contact-email-error', invalid.email(), m.contact_error_email())}
					</div>
				</div>

				<div class="grid gap-2" data-issue-anchor>
					<label class="label" for="contact-message">{m.contact_message_label()}</label>
					<textarea
						id="contact-message"
						class="input resize-y"
						rows="7"
						minlength={CONTACT_LIMITS.messageMin}
						maxlength={CONTACT_LIMITS.messageMax}
						required
						placeholder={m.contact_message_placeholder()}
						aria-describedby="contact-message-error"
						{...fields.message.as('text')}></textarea>
					{@render fieldError('contact-message-error', invalid.message(), m.contact_error_message())}
				</div>

				<!-- Honeypot: off screen, out of the tab order -->
				<div class="honeypot" aria-hidden="true">
					<label for="contact-website">{m.contact_honeypot_label()}</label>
					<input id="contact-website" tabindex="-1" autocomplete="off" {...fields.website.as('text')} />
				</div>

				<div class="grid gap-3" data-issue-anchor>
					<input {...fields.turnstile.as('hidden', token)} />
					<TurnstileWidget bind:this={turnstile} ontoken={(value) => (token = value)} onerror={(value) => (challengeFailed = value)} />
					{@render fieldError('contact-turnstile-error', invalid.turnstile(), m.contact_error_turnstile())}
				</div>

				<div class="flex flex-wrap items-center gap-x-6 gap-y-4">
					<button
						type="submit"
						class="inline-flex items-center rounded-2xl bg-gold px-6 py-3 text-lg font-extrabold text-bark shadow-glow transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
						disabled={contact.pending > 0}
					>
						{contact.pending > 0 ? m.contact_sending() : m.contact_submit()}
					</button>
					<p class="max-w-sm text-sm leading-relaxed text-dust">
						{m.contact_privacy_note()}
						<a href={localizeHref('/privacy')} class="font-bold text-parchment underline decoration-amber decoration-2 underline-offset-4">{m.contact_privacy_link()}</a>
					</p>
				</div>

				<p class="error" role="alert">
					{#if failed}{m.contact_error_failed()} {@render emailLink()}{/if}
				</p>
				<noscript
					><p class="leading-relaxed text-parchment">{m.contact_noscript()} <a href={mailto} class="font-bold text-cream underline">{CONTACT_EMAIL}</a></p></noscript
				>
			</form>
		{/if}
	</section>
</div>

<style>
	.card {
		background:
			radial-gradient(80% 120% at 100% 100%, rgb(240 167 58 / 0.16), transparent 60%), linear-gradient(180deg, rgb(255 224 138 / 0.05), transparent 40%),
			var(--color-walnut);
	}

	.label {
		font-weight: 800;
		color: var(--color-cream);
	}

	.input {
		width: 100%;
		border-radius: 1rem;
		border: 1px solid rgb(246 196 83 / 0.22);
		background: rgb(18 13 9 / 0.55);
		padding: 0.75rem 1rem;
		font-size: 1.0625rem;
		color: var(--color-cream);
		transition:
			border-color 150ms ease,
			box-shadow 150ms ease;
	}

	.input::placeholder {
		color: var(--color-dust);
		opacity: 0.8;
	}

	.input:focus {
		outline: none;
		border-color: var(--color-gold);
		box-shadow: 0 0 0 3px rgb(246 196 83 / 0.25);
	}

	.input[aria-invalid='true'] {
		border-color: var(--color-ember);
	}

	.chip {
		display: inline-flex;
		cursor: pointer;
		border-radius: 999px;
		border: 1px solid rgb(246 196 83 / 0.28);
		background: rgb(18 13 9 / 0.4);
		padding: 0.5rem 1rem;
		font-weight: 700;
		color: var(--color-parchment);
		transition:
			background-color 150ms ease,
			color 150ms ease,
			border-color 150ms ease;
	}

	.chip:hover {
		border-color: var(--color-gold);
	}

	.chip:has(:checked) {
		border-color: var(--color-gold);
		background: var(--color-gold);
		color: var(--color-bark);
	}

	.chip:has(:focus-visible) {
		outline: 2px solid var(--color-butter);
		outline-offset: 2px;
	}

	fieldset:has([aria-invalid='true']) .chip {
		border-color: var(--color-ember);
	}

	.error {
		font-weight: 700;
		color: var(--color-amber);
	}

	.error:empty {
		display: none;
	}

	.honeypot {
		position: absolute;
		left: -9999px;
		width: 1px;
		height: 1px;
		overflow: hidden;
		pointer-events: none;
	}

	.button-secondary {
		border-radius: 1rem;
		border: 1px solid rgb(246 196 83 / 0.4);
		padding: 0.625rem 1.25rem;
		font-weight: 800;
		color: var(--color-cream);
		transition: border-color 150ms ease;
	}

	.button-secondary:hover {
		border-color: var(--color-gold);
	}

	[data-issue-anchor] {
		scroll-margin-top: 6rem;
	}
</style>
