<script lang="ts">
	import LegalPage from '#lib/components/LegalPage.svelte';
	import { m } from '#lib/paraglide/messages.js';
	import { baseLocale } from '#lib/paraglide/runtime.js';
	import Text from '../../content/legal/impressum.md';
</script>

<!-- German legal notice (§ 5 DDG) in every locale; one canonical URL (the unprefixed one), see the sitemap and root layout. -->
<LegalPage title={m.site_footer_imprint()} description={m.imprint_meta_description()} path="/impressum" locale="de" canonicalLocale={baseLocale}>
	<Text />
</LegalPage>
