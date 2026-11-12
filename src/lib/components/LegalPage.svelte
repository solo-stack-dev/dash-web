<!--
	@component
	Frame of the legal pages (privacy, imprint): SEO tags plus readable Markdown typography. The content locale sets `lang`
	and the canonical URL; the imprint passes `de` because its text is German in every locale.
	`noindex, follow`: kept out of search results but crawlable (robots.txt must not block them, or the tag goes unseen) and
	excluded from the sitemap (src/routes/sitemap.xml). The store review only needs the privacy URL to load, not to rank.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getLocale, type Locale } from '#lib/paraglide/runtime.js';
	import { GAME_NAME } from '#lib/site.ts';
	import Seo from './Seo.svelte';

	let {
		title,
		description,
		path,
		locale = getLocale(),
		canonicalLocale = locale,
		children
	}: {
		title: string;
		description: string;
		/** Unlocalized path, e.g. `/privacy` */
		path: string;
		/** Language of the text */
		locale?: Locale;
		/** Locale of the canonical URL */
		canonicalLocale?: Locale;
		children: Snippet;
	} = $props();
</script>

<Seo title={`${title} · ${GAME_NAME}`} {description} {path} locale={canonicalLocale} />

<svelte:head>
	<meta name="robots" content="noindex, follow" />
</svelte:head>

<article class="container-page max-w-3xl pt-10 pb-8 sm:pt-16">
	<h1 class="text-gilded text-section leading-none sm:text-6xl">{title}</h1>
	<div class="legal-text mt-10" lang={locale}>
		{@render children()}
	</div>
</article>

<style>
	.legal-text {
		line-height: 1.75;
		color: var(--color-parchment);
		hyphens: auto;
		overflow-wrap: anywhere;
	}

	.legal-text :global(> * + *) {
		margin-top: 1.1em;
	}

	/* "Last updated" line */
	.legal-text :global(> p:first-child) {
		color: var(--color-dust);
		font-size: 0.95rem;
	}

	.legal-text :global(h2) {
		margin-top: 2.4em;
		font-family: var(--font-display);
		font-size: clamp(1.4rem, 2.6vw, 1.75rem);
		line-height: 1.2;
		color: var(--color-cream);
		hyphens: manual;
	}

	.legal-text :global(h2::before) {
		content: '';
		display: block;
		width: 2.5rem;
		height: 0.3rem;
		margin-bottom: 0.75rem;
		border-radius: 999px;
		background: linear-gradient(90deg, var(--color-gold), var(--color-ember));
	}

	.legal-text :global(> h2:first-child) {
		margin-top: 0;
	}

	.legal-text :global(h3) {
		margin-top: 1.8em;
		font-family: var(--font-sans);
		font-size: 1.1rem;
		font-weight: 800;
		color: var(--color-cream);
	}

	.legal-text :global(h2 + *),
	.legal-text :global(h3 + *) {
		margin-top: 0.6em;
	}

	.legal-text :global(a) {
		color: var(--color-cream);
		text-decoration: underline;
		text-decoration-color: var(--color-amber);
		text-decoration-thickness: 2px;
		text-underline-offset: 0.2em;
	}

	.legal-text :global(a:hover) {
		text-decoration-color: currentColor;
	}

	.legal-text :global(strong) {
		color: var(--color-cream);
		font-weight: 800;
	}

	.legal-text :global(ul) {
		display: grid;
		gap: 0.4em;
		padding-left: 1.4em;
		list-style: disc;
	}

	.legal-text :global(li::marker) {
		color: var(--color-amber);
	}
</style>
