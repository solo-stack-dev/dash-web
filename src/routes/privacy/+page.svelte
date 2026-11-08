<script lang="ts">
	import LegalPage from '#lib/components/LegalPage.svelte';
	import { m } from '#lib/paraglide/messages.js';
	import { getLocale } from '#lib/paraglide/runtime.js';
	import GermanText from '../../content/legal/privacy.de.md';
	import EnglishText from '../../content/legal/privacy.en.md';
</script>

<!-- Store "privacy policy URL" for Google Play and the App Store. English everywhere but in German (add a file per new locale). -->
<LegalPage title={m.site_footer_privacy()} description={m.privacy_meta_description()} path="/privacy" locale={getLocale() === 'de' ? 'de' : 'en'}>
	{#if getLocale() === 'de'}
		<GermanText />
	{:else}
		<EnglishText />
	{/if}
</LegalPage>
