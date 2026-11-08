<!--
	Homepage: the game's store page on the web. Hero (wordmark, pitch, store badges, phone with gameplay, the squirrel racing
	its golden ghost on a beam), store style screenshot carousel, features as an editorial list beside a medal shelf, the five
	worlds, the controls as touch pads on a beam, closing call to action. Fully static; the only motion is the run cycle,
	which stands still for `prefers-reduced-motion`.
-->
<script lang="ts">
	import appIcon from '#lib/assets/app-icon.webp?w=160;320&enhanced';
	import acorn from '#lib/assets/sprites/acorn.webp?enhanced';
	import medal from '#lib/assets/sprites/medal-gold.webp?enhanced';
	import runGhostSheet from '#lib/assets/sprites/run-ghost-sheet.webp?url';
	import runSheet from '#lib/assets/sprites/run-sheet.webp?url';
	import finished from '#lib/assets/sprites/squirrel-finished.webp?enhanced';
	import bloomworks from '#lib/assets/worlds/bloomworks.webp?enhanced';
	import citadel from '#lib/assets/worlds/citadel.webp?enhanced';
	import frostwell from '#lib/assets/worlds/frostwell.webp?enhanced';
	import kitewoods from '#lib/assets/worlds/kitewoods.webp?enhanced';
	import mill from '#lib/assets/worlds/mill.webp?enhanced';
	import PhoneFrame from '#lib/components/PhoneFrame.svelte';
	import Screenshots from '#lib/components/Screenshots.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import StoreBadges from '#lib/components/StoreBadges.svelte';
	import { m } from '#lib/paraglide/messages.js';
	import { hero, ogImage, shots } from '#lib/screens/index.ts';
	import { COURSES_PER_WORLD, GAME_NAME } from '#lib/site.ts';

	// World names are the game's proper nouns (course_catalog.gd), identical in every locale
	const worlds = [
		{ id: 'mill', name: 'The Mill', image: mill, text: m.world_mill_text() },
		{ id: 'kitewoods', name: 'The Kitewoods', image: kitewoods, text: m.world_kitewoods_text() },
		{ id: 'frostwell', name: 'Frostwell Ruins', image: frostwell, text: m.world_frostwell_text() },
		{ id: 'bloomworks', name: 'Bloomworks', image: bloomworks, text: m.world_bloomworks_text() },
		{ id: 'citadel', name: 'Sunbanner Citadel', image: citadel, text: m.world_citadel_text() }
	];

	const features = [
		{ id: 'ghost', title: m.feature_ghost_title(), text: m.feature_ghost_text() },
		{ id: 'worlds', title: m.feature_worlds_title(), text: m.feature_worlds_text() },
		{ id: 'controls', title: m.feature_controls_title(), text: m.feature_controls_text() },
		{ id: 'acorns', title: m.feature_acorns_title(), text: m.feature_acorns_text() },
		{ id: 'retry', title: m.feature_retry_title(), text: m.feature_retry_text() }
	];

	/** Swipe direction in degrees (0 = right); `null` is a tap */
	const controls = [
		{ id: 'hop', angle: null, gesture: m.control_hop_gesture(), text: m.control_hop_text() },
		{ id: 'leap', angle: -90, gesture: m.control_leap_gesture(), text: m.control_leap_text() },
		{ id: 'slide', angle: 90, gesture: m.control_slide_gesture(), text: m.control_slide_text() },
		{ id: 'dash', angle: 0, gesture: m.control_dash_gesture(), text: m.control_dash_text() },
		{ id: 'brake', angle: 180, gesture: m.control_brake_gesture(), text: m.control_brake_text() }
	];
</script>

<Seo title={m.home_meta_title()} description={m.home_meta_description()} path="/" image={ogImage} imageAlt={m.home_og_image_alt()} />

<!-- Hero -->
<section class="hero relative -mt-16 overflow-hidden pt-24 sm:-mt-18 sm:pt-32">
	<div class="sun" aria-hidden="true"></div>
	<div class="rays" aria-hidden="true"></div>

	<div class="relative container-page grid items-center gap-12 pb-28 lg:grid-cols-12 lg:gap-8 lg:pb-36">
		<div class="lg:col-span-6">
			<p class="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-bark/60 px-4 py-1.5 text-sm font-extrabold tracking-wide text-gold uppercase">
				<enhanced:img src={acorn} alt="" class="size-5" />
				{m.home_hero_eyebrow()}
			</p>
			<h1 class="mt-5 text-gilded text-8xl leading-none sm:text-9xl">{GAME_NAME}</h1>
			<p class="mt-4 font-display text-3xl leading-tight text-cream sm:text-4xl">{m.home_hero_subtitle()}</p>
			<p class="mt-5 max-w-xl text-lg leading-relaxed text-parchment">{m.home_hero_intro()}</p>
			<div class="mt-8">
				<StoreBadges size="lg" />
			</div>
		</div>

		<div class="relative lg:col-span-6">
			<div class="hero-phone">
				<PhoneFrame>
					<enhanced:img
						src={hero}
						alt={m.home_hero_image_alt()}
						sizes="(min-width: 1024px) 720px, 94vw"
						fetchpriority="high"
						class="block aspect-video h-auto w-full object-cover"
					/>
				</PhoneFrame>
			</div>
		</div>
	</div>

	<!-- The squirrel chasing its golden ghost along the beam: the game's own three-frame run cycle (scripts/run-cycle.mjs) -->
	<div class="race" aria-hidden="true" style:--run-sheet="url({runSheet})" style:--ghost-sheet="url({runGhostSheet})">
		<div class="beam"></div>
		<div class="lane is-ghost"><div class="runner"></div></div>
		<div class="lane"><div class="runner"></div></div>
	</div>
</section>

<!-- Screenshots -->
<section id="screenshots" class="pt-20 sm:pt-28">
	<div class="container-page">
		<h2 class="text-5xl leading-none sm:text-6xl">{m.home_shots_heading()}</h2>
		<p class="mt-4 max-w-2xl text-lg text-parchment">{m.home_shots_intro()}</p>
	</div>
	<div class="mt-10">
		<Screenshots {shots} />
	</div>
</section>

<!-- Features: an editorial list next to a sticky medal shelf, no cards -->
<section id="features" class="container-page pt-24 sm:pt-32">
	<div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
		<div class="lg:col-span-5">
			<div class="lg:sticky lg:top-28">
				<h2 class="text-5xl leading-none sm:text-6xl">{m.home_features_heading()}</h2>
				<div class="shelf mt-10" aria-hidden="true">
					<div class="shelf-glow"></div>
					<enhanced:img src={finished} alt="" class="shelf-squirrel" />
					<enhanced:img src={medal} alt="" class="shelf-medal" />
					<enhanced:img src={acorn} alt="" class="shelf-acorn is-first" />
					<enhanced:img src={acorn} alt="" class="shelf-acorn is-second" />
					<div class="shelf-board"></div>
				</div>
			</div>
		</div>

		<ol class="lg:col-span-7">
			{#each features as feature, index (feature.id)}
				<li class="feature gap-x-5 py-8 sm:gap-x-8 sm:py-10">
					<span class="feature-number text-gilded font-display text-5xl leading-none sm:text-6xl" aria-hidden="true">{index + 1}</span>
					<div>
						<h3 class="text-3xl leading-tight text-cream sm:text-4xl">{feature.title}</h3>
						<p class="mt-3 max-w-xl text-lg leading-relaxed text-parchment">{feature.text}</p>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>

<!-- Worlds -->
<section id="worlds" class="container-page pt-24 sm:pt-32">
	<h2 class="text-5xl leading-none sm:text-6xl">{m.home_worlds_heading()}</h2>
	<p class="mt-4 max-w-2xl text-lg text-parchment">{m.home_worlds_intro()}</p>
	<ol class="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
		{#each worlds as world, index (world.id)}
			<li class="world group relative overflow-hidden rounded-card {index < 2 ? 'lg:col-span-3' : 'lg:col-span-2'}">
				<enhanced:img
					src={world.image}
					alt=""
					sizes="(min-width: 1024px) 600px, (min-width: 768px) 50vw, 94vw"
					loading="lazy"
					class="world-art absolute inset-0 size-full object-cover"
				/>
				<div class="relative flex h-full min-h-72 flex-col justify-end p-6 sm:min-h-80 sm:p-7">
					<p class="text-sm font-extrabold tracking-widest text-gold uppercase">{String(index + 1).padStart(2, '0')}</p>
					<h3 class="mt-1 text-3xl leading-tight text-cream sm:text-4xl">{world.name}</h3>
					<p class="mt-2 max-w-md leading-relaxed text-parchment">{world.text}</p>
					<p class="mt-4 inline-flex w-fit rounded-full bg-bark/70 px-3 py-1 text-sm font-extrabold text-butter ring-1 ring-gold/30">
						{m.home_worlds_courses({ count: String(COURSES_PER_WORLD) })}
					</p>
				</div>
			</li>
		{/each}
	</ol>
</section>

<!-- Controls: five glowing touch pads standing on a timber beam, no cards -->
<section id="controls" class="controls relative pt-24 sm:pt-32">
	<div class="container-page text-center">
		<h2 class="text-5xl leading-none sm:text-6xl">{m.home_controls_heading()}</h2>
		<p class="mx-auto mt-4 max-w-2xl text-lg text-parchment">{m.home_controls_intro()}</p>
	</div>
	<div class="container-page">
		<ul class="pads mt-14 grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-6">
			{#each controls as control (control.id)}
				<li class="flex flex-col items-center text-center">
					<div class="pad" aria-hidden="true">
						{#if control.angle === null}
							<span class="tap"></span>
						{:else}
							<svg viewBox="0 0 48 48" style:transform="rotate({control.angle}deg)">
								<circle cx="11" cy="24" r="5" fill="currentColor" opacity="0.4" />
								<path d="M11 24h25m-8-8 8 8-8 8" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
							</svg>
						{/if}
					</div>
					<p class="mt-6 font-display text-3xl text-gold">{control.gesture}</p>
					<p class="mt-2 max-w-56 leading-snug text-parchment">{control.text}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- Call to action -->
<section class="container-page pt-24 text-center sm:pt-32">
	<enhanced:img src={appIcon} alt="" class="mx-auto size-28 rounded-3xl shadow-glow sm:size-36" />
	<h2 class="mt-8 text-gilded text-5xl leading-none sm:text-6xl">{m.home_cta_heading()}</h2>
	<p class="mx-auto mt-4 max-w-xl text-lg text-parchment">{m.home_cta_text()}</p>
	<div class="mt-8 flex justify-center">
		<StoreBadges size="lg" />
	</div>
</section>

<style>
	/* Golden hour behind the hero, like the app icon */
	.hero {
		background:
			radial-gradient(70% 60% at 72% 38%, rgb(240 167 58 / 0.32), transparent 70%), radial-gradient(50% 50% at 10% 90%, rgb(224 112 43 / 0.16), transparent 70%),
			linear-gradient(180deg, #24170d, var(--color-bark) 92%);
	}

	.sun {
		position: absolute;
		top: 4%;
		right: 8%;
		width: min(46rem, 80vw);
		aspect-ratio: 1;
		border-radius: 50%;
		background: radial-gradient(circle, rgb(255 224 138 / 0.5), rgb(246 196 83 / 0.16) 38%, transparent 66%);
		filter: blur(8px);
	}

	.rays {
		position: absolute;
		inset: -20% -10% 0 30%;
		background: repeating-conic-gradient(from 200deg at 70% 30%, rgb(255 224 138 / 0.07) 0deg 4deg, transparent 4deg 13deg);
		mask: radial-gradient(60% 60% at 70% 30%, #000, transparent 75%);
	}

	.hero-phone {
		transform: perspective(1600px) rotateY(-9deg) rotateX(3deg) rotate(1.5deg);
		filter: drop-shadow(0 40px 60px rgb(0 0 0 / 0.55));
	}

	@media (width < 64rem) {
		.hero-phone {
			transform: none;
		}
	}

	/*
	 * Race: each lane crosses the screen (translate), the runner inside steps through the sheet (background position).
	 * Run cycle as in the game (squirrel_painter.gd): contact 0–24 %, passing 24–48 %, flight 48–82 %, contact again,
	 * one stride per 0.42 s. Lap speed is set per breakpoint so the stride roughly matches the ground covered.
	 * The ghost lane starts a little earlier, so the gold ghost keeps a short lead.
	 */
	.race {
		--runner: 7rem;
		--lap: 3.6s;
		position: absolute;
		inset: auto 0 0;
		height: calc(var(--runner) * 0.75 + 1.5rem);
		pointer-events: none;
	}

	@media (width >= 40rem) {
		.race {
			--runner: 8.5rem;
			--lap: 5s;
		}
	}

	@media (width >= 64rem) {
		.race {
			--runner: 9.5rem;
			--lap: 6.8s;
		}
	}

	.beam {
		position: absolute;
		inset: auto 0 0.9rem;
		height: 0.6rem;
		background: linear-gradient(180deg, #a0703c, #5a3a1c 60%, #3a2410);
		box-shadow:
			0 1px 0 rgb(255 224 138 / 0.45) inset,
			0 8px 18px rgb(0 0 0 / 0.55);
	}

	.lane {
		position: absolute;
		bottom: calc(1.5rem - var(--runner) * 0.75 * 0.07);
		left: 0;
		animation: lap var(--lap) linear infinite;
	}

	.lane.is-ghost {
		animation-delay: calc(var(--lap) * -0.075);
		opacity: 0.78;
	}

	.runner {
		width: var(--runner);
		aspect-ratio: 4 / 3;
		background: var(--run-sheet) 0 0 / 300% 100% no-repeat;
		animation: stride 0.42s step-end infinite;
	}

	.is-ghost .runner {
		background-image: var(--ghost-sheet);
		animation-delay: -0.21s;
	}

	@keyframes lap {
		from {
			transform: translateX(calc(var(--runner) * -1.2));
		}
		to {
			transform: translateX(calc(100vw + var(--runner) * 0.2));
		}
	}

	@keyframes stride {
		0% {
			background-position-x: 0%;
		}
		24% {
			background-position-x: 50%;
		}
		48% {
			background-position-x: 100%;
		}
		82% {
			background-position-x: 0%;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.lane,
		.runner {
			animation: none;
		}

		.lane {
			transform: translateX(10vw);
		}

		.lane.is-ghost {
			transform: translateX(calc(10vw + var(--runner) * 0.85));
		}

		.is-ghost .runner {
			background-position-x: 100%;
		}
	}

	/* Features: medal shelf */
	.shelf {
		position: relative;
		max-width: 26rem;
		aspect-ratio: 5 / 3;
	}

	.shelf-glow {
		position: absolute;
		inset: -10% 0 10%;
		background: radial-gradient(50% 55% at 50% 55%, rgb(246 196 83 / 0.28), transparent 70%);
	}

	.shelf-board {
		position: absolute;
		inset: auto 0 0;
		height: 0.9rem;
		border-radius: 0.3rem;
		background: linear-gradient(180deg, #a0703c, #5a3a1c 60%, #3a2410);
		box-shadow:
			0 1px 0 rgb(255 224 138 / 0.45) inset,
			0 14px 24px -6px rgb(0 0 0 / 0.7);
	}

	.shelf-squirrel {
		position: absolute;
		bottom: 0.4rem;
		left: -4%;
		width: 62%;
		height: auto;
	}

	.shelf-medal {
		position: absolute;
		right: 14%;
		bottom: 0.9rem;
		width: 28%;
		height: auto;
		filter: drop-shadow(0 10px 18px rgb(0 0 0 / 0.55));
		transform: rotate(6deg);
	}

	.shelf-acorn {
		position: absolute;
		bottom: 0.9rem;
		width: 11%;
		height: auto;
	}

	.shelf-acorn.is-first {
		right: 2%;
	}

	.shelf-acorn.is-second {
		right: 40%;
		transform: rotate(-14deg);
	}

	/* Features: editorial list, separated by thin gold rules */
	.feature {
		display: grid;
		grid-template-columns: auto 1fr;
		border-top: 1px solid transparent;
		border-image: linear-gradient(90deg, rgb(246 196 83 / 0.55), rgb(246 196 83 / 0.05)) 1;
	}

	.feature:first-child {
		padding-top: 0;
		border-top: 0;
	}

	.feature-number {
		min-width: 1.3ch;
		font-variant-numeric: tabular-nums;
	}

	/* Worlds */
	.world {
		box-shadow:
			0 0 0 1px rgb(90 64 41 / 0.8),
			var(--shadow-plank);
	}

	.world::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, rgb(18 13 9 / 0.05) 20%, rgb(18 13 9 / 0.65) 55%, rgb(18 13 9 / 0.96));
	}

	.world > div {
		z-index: 1;
	}

	.world-art {
		transition: transform 600ms ease;
	}

	.world:hover .world-art {
		transform: scale(1.04);
	}

	/* Controls: a warm light pool behind the pads, and the timber beam they stand on (desktop) */
	.controls::before {
		content: '';
		position: absolute;
		inset: 10% 0 -10%;
		background: radial-gradient(45% 50% at 50% 55%, rgb(240 167 58 / 0.12), transparent 70%);
		pointer-events: none;
	}

	.pads {
		position: relative;
	}

	@media (width >= 64rem) {
		.pads::before {
			content: '';
			position: absolute;
			top: 6.4rem;
			left: -2rem;
			right: -2rem;
			height: 0.6rem;
			border-radius: 0.3rem;
			background: linear-gradient(180deg, #a0703c, #5a3a1c 60%, #3a2410);
			box-shadow:
				0 1px 0 rgb(255 224 138 / 0.45) inset,
				0 10px 20px rgb(0 0 0 / 0.5);
		}
	}

	.pad {
		position: relative;
		display: grid;
		place-items: center;
		width: 6.4rem;
		height: 6.4rem;
		border-radius: 50%;
		background: radial-gradient(circle at 35% 30%, #4a3421, #1f160e 70%);
		box-shadow:
			0 0 0 2px rgb(246 196 83 / 0.55),
			0 0 0 9px rgb(246 196 83 / 0.08),
			0 0 40px rgb(240 167 58 / 0.35),
			0 18px 30px -12px rgb(0 0 0 / 0.9);
		color: var(--color-gold);
		transition: transform 250ms var(--ease-spring);
	}

	li:hover > .pad {
		transform: translateY(-4px) scale(1.04);
	}

	.pad svg {
		width: 3.2rem;
		height: 3.2rem;
	}

	.tap {
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		background: var(--color-gold);
		box-shadow:
			0 0 0 0.5rem rgb(246 196 83 / 0.25),
			0 0 0 1rem rgb(246 196 83 / 0.1);
	}
</style>
