// Markdown files compile to Svelte components through mdsvex (vite.config.ts)
declare module '*.md' {
	import type { Component } from 'svelte';
	const component: Component;
	export default component;
}
