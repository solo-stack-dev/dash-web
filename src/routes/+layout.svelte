<!--
	Shell of every page: icons, hreflang alternates, skip link, navbar and footer. The site has one fixed warm dark theme.
-->
<script lang="ts">
	import { page } from '$app/state';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import SiteNav from '#lib/components/SiteNav.svelte';
	import { m } from '#lib/paraglide/messages.js';
	import { baseLocale, locales, localizeHref, type Locale } from '#lib/paraglide/runtime.js';
	import './layout.css';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	// Absolute (Google requires it for hreflang). The prerender crawler follows these, so every locale variant gets built.
	const alternateHref = (locale: Locale) => new URL(localizeHref(page.url.pathname, { locale }), page.url.origin).href;

	// The imprint exists in German only and names its own canonical URL (LegalPage.svelte), so no alternates there.
	const SINGLE_LOCALE_ROUTES = new Set(['/impressum']);
	const ownAlternates = $derived(SINGLE_LOCALE_ROUTES.has(page.route.id ?? ''));
</script>

<svelte:head>
	<!-- Renders of the game's app icon (scripts/icons.mjs) -->
	<link rel="icon" href="/favicon.ico" sizes="48x48" />
	<link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<link rel="manifest" href="/manifest.webmanifest" />
	{#if page.status === 200 && !ownAlternates}
		{#each locales as locale (locale)}
			<link rel="alternate" hreflang={locale} href={alternateHref(locale)} />
		{/each}
		<link rel="alternate" hreflang="x-default" href={alternateHref(baseLocale)} />
	{/if}
</svelte:head>

<div class="flex min-h-svh flex-col">
	<a href="#main" class="skip-link fixed top-3 left-1/2 z-50 rounded-full bg-gold px-4 py-2 font-extrabold text-bark">
		{m.site_nav_skip()}
	</a>

	<SiteNav />

	<main id="main" tabindex="-1" class="flex-1 focus:outline-none">
		{@render children()}
	</main>

	<SiteFooter />
</div>

<style>
	.skip-link {
		transform: translate(-50%, -6rem);
	}

	.skip-link:focus-visible {
		transform: translate(-50%, 0);
	}
</style>
