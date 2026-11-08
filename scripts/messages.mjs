// Builds messages/{locale}.json from the gpt-6.1-sol outputs in docs/copy/ (later files override earlier keys).
// Never edit message values by hand: change the prompt, run `pnpm copy <name>`, then `node scripts/messages.mjs`.
import { readFileSync, writeFileSync } from 'node:fs';

const OUTPUTS = ['site', 'site-fix'];
/** Generated but not used on the site */
const UNUSED = new Set(['legal_updated']);

const dir = new URL('../docs/copy/', import.meta.url);
const merged = {};
for (const name of OUTPUTS) {
	const output = JSON.parse(readFileSync(new URL(`${name}-output.json`, dir), 'utf8'));
	for (const [locale, messages] of Object.entries(output)) Object.assign((merged[locale] ??= {}), messages);
}

for (const [locale, messages] of Object.entries(merged)) {
	const entries = Object.entries(messages).filter(([key]) => !UNUSED.has(key));
	const json = { $schema: 'https://inlang.com/schema/inlang-message-format', ...Object.fromEntries(entries) };
	writeFileSync(new URL(`../messages/${locale}.json`, import.meta.url), `${JSON.stringify(json, null, '\t')}\n`);
	console.log(`messages/${locale}.json: ${entries.length} messages`);
}
