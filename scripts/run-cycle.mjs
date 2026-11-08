// Hero race sprites: the game's three run frames (D:\repos\dash\game\art\painted\character\run_{contact,passing,flight}.png,
// 384×288 canvases sharing one feet pivot) packed into horizontal sheets for a CSS `steps()` animation. The ghost sheet is
// the game's luminance ghost tinted with the in-game ghost gold (squirrel_painter.gd: Color(0.96, 0.79, 0.41)).
// Run again after the game's run frames change: `node scripts/run-cycle.mjs`.
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const GAME = 'D:/repos/dash/game/art/painted/character/';
const FRAMES = ['run_contact', 'run_passing', 'run_flight'];
const W = 288; // 2× of the 144 px display width
const H = 216;
const out = (name) => fileURLToPath(new URL(`../src/lib/assets/sprites/${name}`, import.meta.url));

async function sheet(suffix, tint) {
	const frames = await Promise.all(
		FRAMES.map(async (frame) => {
			let image = sharp(`${GAME}${frame}${suffix}.png`).resize(W, H, { kernel: 'lanczos3' });
			if (tint) image = image.linear(tint, [0, 0, 0, 0]);
			return image.png().toBuffer();
		})
	);
	return sharp({ create: { width: W * FRAMES.length, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
		.composite(frames.map((input, index) => ({ input, left: index * W, top: 0 })))
		.webp({ quality: 90, alphaQuality: 100 });
}

await (await sheet('', null)).toFile(out('run-sheet.webp'));
await (await sheet('_ghost', [0.96, 0.79, 0.41, 1])).toFile(out('run-ghost-sheet.webp'));
console.log('run sheets → src/lib/assets/sprites/');
