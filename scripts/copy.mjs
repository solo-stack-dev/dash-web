// Runs a copy prompt from docs/copy/ through gpt-6.1-sol (AGENTS.md hard rule) and stores the model's reply.
// `{{FACTS}}` in a prompt is replaced with the fenced block from docs/copy/FACTS.md, so every prompt shares one fact sheet.
//
//   node scripts/copy.mjs site           docs/copy/site-prompt.md → docs/copy/site-output.json
//   node scripts/copy.mjs privacy-en md  → docs/copy/privacy-en-output.md
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const [name, extension = 'json'] = process.argv.slice(2);
if (!name) throw new Error('usage: node scripts/copy.mjs <prompt name> [json|md]');

const dir = new URL('../docs/copy/', import.meta.url);
const facts = /```text\n([\s\S]*?)```/.exec(readFileSync(new URL('FACTS.md', dir), 'utf8'))?.[1].trim();
if (!facts) throw new Error('docs/copy/FACTS.md has no ```text block');

const prompt = readFileSync(new URL(`${name}-prompt.md`, dir), 'utf8')
	.replaceAll('{{FACTS}}', facts)
	// A translation prompt embeds the finished English text it translates
	.replace('{{PRIVACY_EN}}', () => readFileSync(new URL('privacy-en-output.md', dir), 'utf8').trim());
const last = join(tmpdir(), `copy-${name}-${Date.now()}.txt`);

// Prompt via stdin: Windows command lines are too short for the longer prompts
execSync(`codex exec -m gpt-6.1-sol -s read-only --skip-git-repo-check --ephemeral -o "${last}" -`, {
	input: prompt,
	stdio: ['pipe', 'ignore', 'inherit'],
	maxBuffer: 64 * 1024 * 1024
});

let reply = readFileSync(last, 'utf8').trim();
if (extension === 'json') reply = JSON.stringify(JSON.parse(reply.replace(/^```(?:json)?\n|\n```$/g, '')), null, '\t');
const out = new URL(`${name}-output.${extension}`, dir);
writeFileSync(out, `${reply}\n`);
console.log(`wrote ${out.pathname}`);
