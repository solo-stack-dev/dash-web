<!--
	@component
	A modern phone in landscape around a 16:9 screenshot (the game is landscape only), drawn in CSS. Every measure is in
	container query units of the wrapper, so the frame scales with its box and the corners stay concentric:
	outer radius = screen radius + bezel. Thin black bezel inside a brushed metal band, with volume and power keys on the
	top edge and a front camera in the left bezel.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="device">
	<div class="phone">
		<span class="key is-volume" aria-hidden="true"></span>
		<span class="key is-power" aria-hidden="true"></span>
		<div class="bezel">
			<span class="camera" aria-hidden="true"></span>
			<div class="screen">
				{@render children()}
			</div>
		</div>
	</div>
</div>

<style>
	.device {
		container-type: inline-size;
	}

	.phone {
		--band: 0.55cqw;
		--bezel: 1.9cqw;
		--screen-radius: 3.4cqw;
		position: relative;
		padding: var(--band);
		border-radius: calc(var(--screen-radius) + var(--bezel) + var(--band));
		background: linear-gradient(160deg, #6d655d 0%, #2b2724 22%, #1a1816 50%, #3a3430 78%, #8a8078 100%);
		box-shadow:
			0 0 0 1px rgb(0 0 0 / 0.65),
			0 2.2cqw 4.5cqw -1.5cqw rgb(0 0 0 / 0.85),
			0 0.8cqw 1.6cqw -0.6cqw rgb(0 0 0 / 0.6);
	}

	.bezel {
		position: relative;
		padding: var(--bezel);
		border-radius: calc(var(--screen-radius) + var(--bezel));
		background: #050505;
		box-shadow:
			0 0 0 0.12cqw rgb(255 255 255 / 0.07) inset,
			0 0 1.2cqw rgb(0 0 0 / 0.9) inset;
	}

	/* Glass glare over the whole front */
	.bezel::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		background: linear-gradient(115deg, rgb(255 255 255 / 0.1) 0%, rgb(255 255 255 / 0.02) 28%, transparent 42%);
		pointer-events: none;
	}

	.camera {
		position: absolute;
		top: 50%;
		left: calc(var(--bezel) / 2);
		width: 0.85cqw;
		aspect-ratio: 1;
		border-radius: 50%;
		background: radial-gradient(circle at 35% 35%, #2c3440, #07090c 60%);
		box-shadow: 0 0 0 0.12cqw #141414;
		transform: translate(-50%, -50%);
	}

	.screen {
		position: relative;
		overflow: hidden;
		border-radius: var(--screen-radius);
		background: #000;
	}

	.screen :global(img) {
		display: block;
	}

	/* Side keys on the top edge (the phone is turned sideways) */
	.key {
		position: absolute;
		top: -0.35cqw;
		height: 0.55cqw;
		border-radius: 0.4cqw 0.4cqw 0 0;
		background: linear-gradient(180deg, #8d847b, #3a3430);
	}

	.is-volume {
		left: 14%;
		width: 9%;
	}

	.is-power {
		right: 20%;
		width: 6%;
	}
</style>
