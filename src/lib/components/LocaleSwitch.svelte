<!--
	@component
	Language menu of the navbar: a native <details> disclosure (no JS needed) listing every locale in its own language.
	The URL is the only locale source, so each option is a plain link with `data-sveltekit-reload`: messages are not reactive,
	and `/support` and `/de/support` are one route component. The imprint is German in every locale, so it just keeps its path.
-->
<script lang="ts">
	import { page } from '$app/state';
	import { m } from '#lib/paraglide/messages.js';
	import { getLocale, locales, localizeHref, type Locale } from '#lib/paraglide/runtime.js';

	/** A language in its own language: "Deutsch", "English" (CLDR data, not site copy). */
	const languageName = (locale: Locale) => {
		const name = new Intl.DisplayNames([locale], { type: 'language' }).of(locale) ?? locale;
		return name.charAt(0).toLocaleUpperCase(locale) + name.slice(1);
	};

	const current = getLocale();
	let menu = $state<HTMLDetailsElement>();

	// Close on outside click and Escape, like a menu
	const close = (event: Event) => {
		if (!menu?.open) return;
		if (event instanceof KeyboardEvent ? event.key === 'Escape' : !menu.contains(event.target as Node)) menu.open = false;
	};

	$effect(() => {
		document.addEventListener('click', close);
		document.addEventListener('keydown', close);
		return () => {
			document.removeEventListener('click', close);
			document.removeEventListener('keydown', close);
		};
	});
</script>

<details bind:this={menu} class="relative">
	<summary
		aria-label={m.site_locale_label()}
		class="flex cursor-pointer list-none items-center gap-1 rounded-full px-3 py-2 text-parchment uppercase transition-colors hover:bg-cream/8 hover:text-cream"
	>
		{current}
		<svg viewBox="0 0 12 12" class="chevron size-3" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.8" /></svg>
	</summary>
	<ul class="absolute top-full right-0 mt-2 min-w-40 rounded-2xl p-1.5 plank">
		{#each locales as locale (locale)}
			<li>
				<a
					href={localizeHref(page.url.pathname, { locale })}
					hreflang={locale}
					lang={locale}
					data-sveltekit-reload
					aria-current={locale === current ? 'true' : undefined}
					class="flex items-center justify-between gap-4 rounded-xl px-3 py-2 normal-case transition-colors hover:bg-cream/8"
				>
					{languageName(locale)}
					<span class="text-xs text-dust uppercase">{locale}</span>
				</a>
			</li>
		{/each}
	</ul>
</details>

<style>
	summary::-webkit-details-marker {
		display: none;
	}

	.chevron {
		transition: transform 150ms ease;
	}

	[aria-current] {
		color: var(--color-gold);
	}

	details[open] .chevron {
		transform: rotate(180deg);
	}
</style>
