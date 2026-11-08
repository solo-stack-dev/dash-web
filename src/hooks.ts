import type { Reroute } from '@sveltejs/kit/hooks';
import { baseLocale, deLocalizeUrl } from '#lib/paraglide/runtime.js';

export const reroute: Reroute = (request) => {
	const { pathname } = request.url;
	// Leave `/en/…` unresolved so `handle` (hooks.server.ts) can 308 it; rerouted, SvelteKit would serve the prerendered file first.
	if (pathname === `/${baseLocale}` || pathname.startsWith(`/${baseLocale}/`)) return pathname;
	return deLocalizeUrl(request.url).pathname;
};
