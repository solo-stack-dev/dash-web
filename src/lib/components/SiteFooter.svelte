<!--
	@component
	Footer: legal and support links (reachable from every page, as the stores and § 5 DDG require), studio credit, copyright.
-->
<script lang="ts">
	import appIcon from '#lib/assets/app-icon.webp?w=96;192&enhanced';
	import { m } from '#lib/paraglide/messages.js';
	import { localizeHref } from '#lib/paraglide/runtime.js';
	import { COPYRIGHT_YEAR, GAME_NAME, STUDIO } from '#lib/site.ts';

	const href = (path: string) => localizeHref(path);
</script>

<footer class="footer mt-24 border-t border-plank/80">
	<div class="container-page flex flex-col gap-8 py-12 sm:flex-row sm:items-center sm:justify-between">
		<div class="flex items-center gap-3">
			<enhanced:img src={appIcon} alt="" class="size-11 rounded-xl ring-1 ring-gold/30" />
			<div>
				<p class="font-display text-2xl leading-none">{GAME_NAME}</p>
				<p class="mt-1 text-sm text-dust">
					{m.site_footer_made_by()}
					<a href={STUDIO.url} class="font-bold text-parchment underline decoration-amber/60 underline-offset-4 hover:decoration-amber">{STUDIO.name}</a>
				</p>
			</div>
		</div>

		<nav class="flex flex-wrap gap-x-6 gap-y-2 font-bold text-parchment">
			<a href={href('/support')} class="footer-link">{m.site_footer_support()}</a>
			<a href={href('/privacy')} class="footer-link">{m.site_footer_privacy()}</a>
			<a href={href('/impressum')} class="footer-link">{m.site_footer_imprint()}</a>
		</nav>
	</div>
	<div class="container-page pb-10 text-sm text-dust">
		{m.site_footer_copyright({ year: String(COPYRIGHT_YEAR) })}
	</div>
</footer>

<style>
	.footer {
		background: linear-gradient(180deg, transparent, rgb(42 29 20 / 0.55));
	}

	.footer-link {
		text-decoration: underline;
		text-decoration-color: transparent;
		text-underline-offset: 0.3em;
		text-decoration-thickness: 2px;
		transition: text-decoration-color 150ms ease;
	}

	.footer-link:hover {
		text-decoration-color: var(--color-amber);
	}
</style>
