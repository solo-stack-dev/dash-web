<!--
	Support page: the store "support URL" (required by Apple, used for Google Play too). Contact card plus FAQ as native
	<details> (works without JS, searchable with Ctrl+F in Chromium).
-->
<script lang="ts">
	import squirrel from '#lib/assets/sprites/squirrel-finished.webp?enhanced';
	import Seo from '#lib/components/Seo.svelte';
	import { m } from '#lib/paraglide/messages.js';
	import { localizeHref } from '#lib/paraglide/runtime.js';
	import { CONTACT_EMAIL, GAME_NAME } from '#lib/site.ts';

	const faq = [
		{ id: 'controls', q: m.faq_controls_q(), a: m.faq_controls_a() },
		{ id: 'ghost', q: m.faq_ghost_q(), a: m.faq_ghost_a() },
		{ id: 'unlock', q: m.faq_unlock_q(), a: m.faq_unlock_a() },
		{ id: 'progress', q: m.faq_progress_q(), a: m.faq_progress_a() },
		{ id: 'reset', q: m.faq_reset_q(), a: m.faq_reset_a() },
		{ id: 'language', q: m.faq_language_q(), a: m.faq_language_a() },
		{ id: 'offline', q: m.faq_offline_q(), a: m.faq_offline_a() },
		{ id: 'privacy', q: m.faq_privacy_q(), a: m.faq_privacy_a() }
	];

	const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${GAME_NAME} Support`)}`;
</script>

<Seo title={m.support_meta_title()} description={m.support_meta_description()} path="/support" />

<div class="container-page max-w-4xl pt-10 sm:pt-16">
	<h1 class="text-gilded text-6xl leading-none sm:text-7xl">{m.support_title()}</h1>
	<p class="mt-5 max-w-2xl text-lg leading-relaxed text-parchment">{m.support_intro()}</p>

	<section class="contact relative mt-10 overflow-hidden rounded-card p-6 plank sm:p-8">
		<enhanced:img src={squirrel} alt="" class="squirrel pointer-events-none absolute hidden sm:block" />
		<div class="relative max-w-xl">
			<h2 class="text-3xl text-cream sm:text-4xl">{m.support_contact_heading()}</h2>
			<p class="mt-3 leading-relaxed text-parchment">{m.support_contact_text()}</p>
			<a
				href={mailto}
				class="mt-6 inline-flex items-center gap-3 rounded-2xl bg-gold px-5 py-3 text-lg font-extrabold break-all text-bark shadow-glow transition-transform hover:-translate-y-0.5"
			>
				<svg viewBox="0 0 24 24" class="size-6 flex-none" aria-hidden="true"
					><path
						d="M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5zM3.5 6l8.5 7 8.5-7"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linejoin="round"
					/></svg
				>
				{CONTACT_EMAIL}
			</a>
		</div>
	</section>

	<section class="mt-16">
		<h2 class="text-4xl text-cream sm:text-5xl">{m.support_faq_heading()}</h2>
		<div class="mt-8 grid gap-3">
			{#each faq as item (item.id)}
				<details id={item.id} class="faq rounded-3xl plank">
					<summary class="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-lg font-extrabold text-cream sm:px-6 sm:py-5">
						{item.q}
						<span class="plus" aria-hidden="true"></span>
					</summary>
					<p class="px-5 pb-5 leading-relaxed text-parchment sm:px-6 sm:pb-6">
						{item.a}
						{#if item.id === 'privacy'}
							<a href={localizeHref('/privacy')} class="ml-1 font-bold text-cream underline decoration-amber decoration-2 underline-offset-4">{m.site_footer_privacy()}</a
							>
						{/if}
					</p>
				</details>
			{/each}
		</div>
	</section>
</div>

<style>
	.contact {
		background:
			radial-gradient(80% 120% at 100% 100%, rgb(240 167 58 / 0.22), transparent 60%), linear-gradient(180deg, rgb(255 224 138 / 0.05), transparent 40%),
			var(--color-walnut);
	}

	.squirrel {
		right: -1rem;
		bottom: -1.5rem;
		width: 15rem;
		height: auto;
		opacity: 0.95;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	.plus {
		position: relative;
		flex: none;
		width: 1.75rem;
		height: 1.75rem;
		border-radius: 50%;
		background: rgb(246 196 83 / 0.14);
	}

	.plus::before,
	.plus::after {
		content: '';
		position: absolute;
		inset: 50% 25% auto;
		height: 2px;
		margin-top: -1px;
		border-radius: 2px;
		background: var(--color-gold);
		transition: transform 200ms ease;
	}

	.plus::after {
		transform: rotate(90deg);
	}

	.faq[open] .plus::after {
		transform: rotate(0deg);
	}

	.faq[open] {
		box-shadow:
			0 0 0 1px rgb(246 196 83 / 0.3),
			var(--shadow-plank);
	}
</style>
