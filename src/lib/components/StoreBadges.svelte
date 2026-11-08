<!--
	@component
	Google Play and App Store buttons. While a store URL in `#lib/site.ts` is `null` the badge renders as a non-link with the
	"coming soon" label. Generic glyphs on purpose: once the game is live, swap them for the official badge artwork
	(https://play.google.com/intl/en_us/badges/, https://developer.apple.com/app-store/marketing/guidelines/), which the
	store guidelines require for linked badges.
-->
<script lang="ts">
	import { m } from '#lib/paraglide/messages.js';
	import { STORE_URLS } from '#lib/site.ts';

	let { size = 'md' }: { size?: 'md' | 'lg' } = $props();

	const stores = [
		{ id: 'google-play', name: 'Google Play', url: STORE_URLS.googlePlay, label: m.store_badge_google_play_label() },
		{ id: 'app-store', name: 'App Store', url: STORE_URLS.appStore, label: m.store_badge_app_store_label() }
	] as const;
</script>

<ul class="flex flex-wrap gap-3">
	{#each stores as store (store.id)}
		<li>
			<svelte:element
				this={store.url ? 'a' : 'div'}
				href={store.url ?? undefined}
				role={store.url ? undefined : 'img'}
				aria-label={store.label}
				class="badge"
				class:is-lg={size === 'lg'}
				class:is-live={!!store.url}
			>
				{#if store.id === 'google-play'}
					<svg viewBox="0 0 24 24" class="glyph" aria-hidden="true">
						<path d="M5 3.2v17.6c0 .5.5.8.9.6L21 12.6a.7.7 0 0 0 0-1.2L5.9 2.6c-.4-.2-.9.1-.9.6Z" fill="currentColor" />
					</svg>
				{:else}
					<svg viewBox="0 0 24 24" class="glyph" aria-hidden="true">
						<rect x="6" y="2" width="12" height="20" rx="3" fill="none" stroke="currentColor" stroke-width="2" />
						<path d="M10.5 18.5h3" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
					</svg>
				{/if}
				<span class="flex flex-col leading-none">
					{#if !store.url}<span class="text-xs font-extrabold tracking-wide text-gold uppercase">{m.store_badge_coming_soon()}</span>{/if}
					<span class="name font-display">{store.name}</span>
				</span>
			</svelte:element>
		</li>
	{/each}
</ul>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		min-width: 10.25rem;
		padding: 0.55rem 0.9rem 0.55rem 0.75rem;
		border-radius: 1rem;
		background: linear-gradient(180deg, #1d1610, #0b0806);
		border: 1px solid rgb(246 196 83 / 0.35);
		box-shadow:
			0 1px 0 rgb(255 224 138 / 0.12) inset,
			0 12px 28px -14px rgb(0 0 0 / 0.9);
		color: var(--color-cream);
	}

	.badge.is-live {
		transition:
			transform 200ms var(--ease-spring),
			border-color 150ms ease;
	}

	.badge.is-live:hover {
		transform: translateY(-2px);
		border-color: var(--color-gold);
	}

	.glyph {
		width: 1.7rem;
		height: 1.7rem;
		flex: none;
		color: var(--color-gold);
	}

	.name {
		margin-top: 0.2rem;
		font-size: 1.25rem;
	}

	@media (width >= 40rem) {
		.is-lg {
			min-width: 13rem;
			padding: 0.8rem 1.4rem 0.8rem 1.1rem;
		}

		.is-lg .name {
			font-size: 1.6rem;
		}
	}
</style>
