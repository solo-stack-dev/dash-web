<!--
	@component
	Sticky navbar: app icon + wordmark (home), section links, support, language menu. Turns into a solid plank once scrolled.
	On phones only the wordmark, Support and the language menu stay; the section links live on the homepage itself.
-->
<script lang="ts">
	import appIcon from '#lib/assets/app-icon.webp?w=96;192&enhanced';
	import { m } from '#lib/paraglide/messages.js';
	import { localizeHref } from '#lib/paraglide/runtime.js';
	import { GAME_NAME } from '#lib/site.ts';
	import LocaleSwitch from './LocaleSwitch.svelte';

	const href = (path: string) => localizeHref(path);

	let scrolled = $state(false);

	const update = () => (scrolled = window.scrollY > 12);

	$effect(() => {
		update();
		window.addEventListener('scroll', update, { passive: true });
		return () => window.removeEventListener('scroll', update);
	});
</script>

<header class="nav sticky top-0 z-40" class:is-scrolled={scrolled}>
	<nav class="container-page flex h-16 items-center gap-3 sm:h-18">
		<a href={href('/')} class="flex items-center gap-2.5 rounded-2xl pr-2">
			<enhanced:img src={appIcon} alt="" sizes="40px" class="size-9 rounded-xl shadow-lg ring-1 ring-gold/40 sm:size-10" />
			<span class="font-display text-2xl text-cream sm:text-3xl">{GAME_NAME}</span>
		</a>

		<div class="ml-auto flex items-center gap-1 text-sm font-extrabold sm:gap-2 sm:text-base">
			<a href={`${href('/')}#features`} class="nav-link hidden md:inline-flex">{m.site_nav_features()}</a>
			<a href={`${href('/')}#screenshots`} class="nav-link hidden md:inline-flex">{m.site_nav_screenshots()}</a>
			<a href={href('/support')} class="nav-link">{m.site_nav_support()}</a>
			<LocaleSwitch />
		</div>
	</nav>
</header>

<style>
	.nav {
		transition:
			background-color 200ms ease,
			box-shadow 200ms ease,
			backdrop-filter 200ms ease;
	}

	.nav.is-scrolled {
		background: rgb(18 13 9 / 0.82);
		backdrop-filter: blur(14px) saturate(140%);
		box-shadow:
			0 1px 0 rgb(90 64 41 / 0.6),
			0 10px 30px -12px rgb(0 0 0 / 0.7);
	}

	.nav-link {
		align-items: center;
		border-radius: 999px;
		padding: 0.5rem 0.85rem;
		color: var(--color-parchment);
		transition:
			color 150ms ease,
			background-color 150ms ease;
	}

	.nav-link:hover {
		color: var(--color-cream);
		background: rgb(255 243 218 / 0.08);
	}
</style>
