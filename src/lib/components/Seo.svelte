<!--
	@component
	Title, description, canonical and Open Graph/Twitter tags of a page. `path` is the unlocalized path (`/support`);
	the canonical URL is that path in the current locale, or in `locale` for single-language pages (the imprint).
-->
<script lang="ts">
	import { page } from '$app/state';
	import { getLocale, localizeHref, type Locale } from '#lib/paraglide/runtime.js';
	import { GAME_NAME } from '#lib/site.ts';

	let {
		title,
		description,
		path,
		locale = getLocale(),
		image,
		imageAlt
	}: { title: string; description: string; path: string; locale?: Locale; image?: string; imageAlt?: string } = $props();

	const canonical = $derived(new URL(localizeHref(path, { locale }), page.url.origin).href);
	const imageUrl = $derived(image ? new URL(image, page.url.origin).href : undefined);
	const ogLocale = { en: 'en_US', de: 'de_DE' } as Record<string, string>;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={GAME_NAME} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:locale" content={ogLocale[locale] ?? locale} />
	{#if imageUrl}
		<meta property="og:image" content={imageUrl} />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
		{#if imageAlt}<meta property="og:image:alt" content={imageAlt} />{/if}
		<meta name="twitter:card" content="summary_large_image" />
	{/if}
</svelte:head>
