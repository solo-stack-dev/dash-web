/**
 * Facts about the game and its publisher, shared by every page (names and addresses, not copy; copy lives in messages/).
 * Keep in sync with docs/copy/FACTS.md and the legal texts in src/content/legal/.
 */
export const GAME_NAME = 'Dashnut';

/** Public contact for support, privacy requests and the imprint */
export const CONTACT_EMAIL = 'business@solo-stack.dev';

export const PUBLISHER = 'Peter Ruß';

/** Developer brand, linked in the footer */
export const STUDIO = { name: 'Solo Stack', url: 'https://solo-stack.dev' } as const;

/**
 * Store listings. `null` until the game is live: the badges then render as "coming soon" without a link.
 * Google Play: https://play.google.com/store/apps/details?id=com.dashnut.game (package `com.dashnut.game`)
 * App Store: https://apps.apple.com/app/id<numeric id>
 */
export const STORE_URLS: { googlePlay: string | null; appStore: string | null } = {
	googlePlay: null,
	appStore: null
};

/** Number of courses per world (course_catalog.gd in the game repo) */
export const COURSES_PER_WORLD = 8;

/** Year shown in the copyright line: the build year, so a yearly rebuild keeps it current */
export const COPYRIGHT_YEAR = new Date().getFullYear();
