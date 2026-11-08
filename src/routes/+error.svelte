<!--
	All errors, incl. unmatched URLs (404 at runtime): the fallen squirrel from the game's death pose. No hreflang: the root
	layout emits alternates only for status 200.
-->
<script lang="ts">
	import { page } from '$app/state';
	import ghost from '#lib/assets/sprites/squirrel-ghost.webp?enhanced';
	import { m } from '#lib/paraglide/messages.js';
	import { localizeHref } from '#lib/paraglide/runtime.js';

	const status = $derived(page.status);
	const notFound = $derived(status === 404);
</script>

<svelte:head>
	<title>{m.error_title({ status: String(status) })}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="container-page flex flex-col items-center pt-16 pb-8 text-center sm:pt-24">
	<p class="text-gilded font-display text-9xl leading-none">{status}</p>
	<enhanced:img src={ghost} alt="" class="mt-6 h-auto w-40 opacity-80" />
	<h1 class="mt-6 text-4xl leading-tight text-cream sm:text-5xl">{notFound ? m.error_not_found_heading() : m.error_generic_heading()}</h1>
	<p class="mt-4 max-w-md text-lg text-parchment">{notFound ? m.error_not_found_text() : m.error_generic_text()}</p>
	<a href={localizeHref('/')} class="mt-8 rounded-2xl bg-gold px-6 py-3 text-lg font-extrabold text-bark shadow-glow transition-transform hover:-translate-y-0.5">
		{m.error_back_home()}
	</a>
</div>
