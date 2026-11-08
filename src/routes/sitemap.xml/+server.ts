import * as sitemap from 'super-sitemap/sveltekit';
import { baseLocale, locales, localizeHref, type Locale } from '#lib/paraglide/runtime.js';
import type { RequestHandler } from './$types';

/*
 * /sitemap.xml, prerendered (rebuilt with every deploy). super-sitemap discovers the page routes itself; new pages appear
 * automatically, and a new parameterized route fails the build until it gets `paramValues` or an exclusion.
 *
 * Locales: routes carry no `[[locale]]` param (Paraglide's `reroute` strips `/de`), so super-sitemap's own `locales`
 * option does not apply. `processPaths` localizes instead, mirroring the page heads:
 * - pages that exist in every locale: one entry per locale, each with hreflang alternates + x-default (= the root layout)
 * - imprint: German text in one URL only (= its canonical in src/routes/impressum)
 */

export const prerender = true;

const SINGLE_LOCALE = new Set(['/impressum']);

const localized = (path: string, locale: Locale) => localizeHref(path, { locale });

export const GET: RequestHandler = async ({ url }) =>
	sitemap.response({
		origin: url.origin,
		processPaths: (paths) =>
			paths.flatMap((entry) => {
				if (SINGLE_LOCALE.has(entry.path)) return [{ ...entry, path: localized(entry.path, baseLocale) }];
				const alternates = [
					...locales.map((locale) => ({ hreflang: locale, path: localized(entry.path, locale) })),
					{ hreflang: 'x-default', path: localized(entry.path, baseLocale) }
				];
				return locales.map((locale) => ({ ...entry, path: localized(entry.path, locale), alternates }));
			}),
		sort: 'alpha'
	});
