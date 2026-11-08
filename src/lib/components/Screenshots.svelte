<!--
	@component
	Store style screenshot carousel: each slide is a caption over a landscape phone frame, like a Play Store / App Store
	listing. Native horizontal scroll with snap points (touch, trackpad, keyboard); the arrow buttons scroll one slide.
	Images are lazy except the first two.
-->
<script lang="ts">
	import { m } from '#lib/paraglide/messages.js';
	import type { Shot } from '#lib/screens/index.ts';
	import PhoneFrame from './PhoneFrame.svelte';

	let { shots }: { shots: Shot[] } = $props();

	let track = $state<HTMLUListElement>();
	let atStart = $state(true);
	let atEnd = $state(false);

	const update = () => {
		if (!track) return;
		atStart = track.scrollLeft < 8;
		atEnd = track.scrollLeft + track.clientWidth > track.scrollWidth - 8;
	};

	const step = (direction: -1 | 1) => {
		if (!track) return;
		const slide = track.querySelector('li');
		const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
		const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
		track.scrollBy({ left: direction * ((slide?.clientWidth ?? track.clientWidth) + gap), behavior: reduce ? 'auto' : 'smooth' });
	};

	$effect(() => {
		update();
		window.addEventListener('resize', update);
		return () => window.removeEventListener('resize', update);
	});
</script>

<div class="relative">
	<ul bind:this={track} onscroll={update} class="track" tabindex="-1">
		{#each shots as shot, index (shot.id)}
			<li class="slide">
				<figure class="card flex h-full flex-col rounded-card p-4 plank sm:p-5">
					<figcaption class="caption px-2 pt-1 pb-4 font-display text-2xl leading-tight text-cream sm:text-3xl">{shot.caption()}</figcaption>
					<PhoneFrame>
						<enhanced:img
							src={shot.image}
							alt={shot.caption()}
							sizes="(min-width: 1024px) 680px, (min-width: 640px) 75vw, 88vw"
							loading={index < 2 ? 'eager' : 'lazy'}
							fetchpriority={index === 0 ? 'high' : undefined}
							class="block aspect-video h-auto w-full object-cover"
						/>
					</PhoneFrame>
				</figure>
			</li>
		{/each}
	</ul>

	<div class="container-page mt-6 flex justify-end gap-2 sm:mt-8">
		<button type="button" class="arrow" onclick={() => step(-1)} disabled={atStart} aria-label={m.home_shots_prev()}>
			<svg viewBox="0 0 24 24" class="size-5" aria-hidden="true"
				><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" /></svg
			>
		</button>
		<button type="button" class="arrow" onclick={() => step(1)} disabled={atEnd} aria-label={m.home_shots_next()}>
			<svg viewBox="0 0 24 24" class="size-5" aria-hidden="true"
				><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" /></svg
			>
		</button>
	</div>
</div>

<style>
	.track {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: 88%;
		column-gap: 1rem;
		overflow-x: auto;
		overscroll-behavior-x: contain;
		scroll-snap-type: x mandatory;
		scroll-padding-inline: max(1rem, calc((100vw - 76rem) / 2 + 2rem));
		padding-inline: max(1rem, calc((100vw - 76rem) / 2 + 2rem));
		padding-block: 0.5rem 1rem;
		scrollbar-width: none;
	}

	.track::-webkit-scrollbar {
		display: none;
	}

	@media (width >= 40rem) {
		.track {
			grid-auto-columns: 75%;
			column-gap: 1.5rem;
		}
	}

	@media (width >= 64rem) {
		.track {
			grid-auto-columns: 44rem;
		}
	}

	.slide {
		scroll-snap-align: start;
	}

	.card {
		background:
			radial-gradient(120% 80% at 50% 0%, rgb(240 167 58 / 0.22), transparent 60%), linear-gradient(180deg, rgb(255 224 138 / 0.05), transparent 40%), var(--color-walnut);
	}

	.caption {
		text-shadow: 0 2px 0 rgb(18 13 9 / 0.8);
	}

	/* Phones: some captions wrap, so every caption reserves two lines and the phones line up */
	@media (width < 40rem) {
		.caption {
			min-height: 2lh;
		}
	}

	.arrow {
		display: grid;
		place-items: center;
		width: 3rem;
		height: 3rem;
		border-radius: 999px;
		background: var(--color-walnut);
		border: 1px solid rgb(246 196 83 / 0.4);
		color: var(--color-gold);
		cursor: pointer;
		transition:
			transform 200ms var(--ease-spring),
			opacity 150ms ease;
	}

	.arrow:hover:not(:disabled) {
		transform: scale(1.08);
	}

	.arrow:disabled {
		opacity: 0.35;
		cursor: default;
	}
</style>
