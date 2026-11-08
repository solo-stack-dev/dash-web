// Site icons from the game's app icon (D:\repos\dash\game\art\icon\icon_1024.png, copied to docs/art/app-icon-1024.png).
// Writes static/favicon.ico (48 px PNG inside an ICO container), static/apple-touch-icon.png (180 px) and the
// web manifest icons. Run again after the app icon changes: `node scripts/icons.mjs`.
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const source = fileURLToPath(new URL('../docs/art/app-icon-1024.png', import.meta.url));
const out = (name) => new URL(`../static/${name}`, import.meta.url);
mkdirSync(out(''), { recursive: true });

const png = (size) => sharp(source).resize(size, size, { kernel: 'lanczos3' }).png({ compressionLevel: 9 }).toBuffer();

// ICO with one embedded PNG image (supported by every current browser)
const ico48 = await png(48);
const header = Buffer.alloc(6 + 16);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // image count
header.writeUInt8(48, 6); // width
header.writeUInt8(48, 7); // height
header.writeUInt8(0, 8); // palette
header.writeUInt8(0, 9); // reserved
header.writeUInt16LE(1, 10); // color planes
header.writeUInt16LE(32, 12); // bits per pixel
header.writeUInt32LE(ico48.length, 14); // image size
header.writeUInt32LE(22, 18); // image offset
writeFileSync(out('favicon.ico'), Buffer.concat([header, ico48]));

writeFileSync(out('apple-touch-icon.png'), await png(180));
writeFileSync(out('icon-192.png'), await png(192));
writeFileSync(out('icon-512.png'), await png(512));
console.log('icons written to static/');
