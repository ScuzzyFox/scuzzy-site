<script lang="ts">
	import Wip from '$lib/Wip.svelte';
	let pageTitle = 'Contact ScuzzyFox';
	let pageDescription = 'Need to get in touch with scuzzy? Here are multiple ways to reach out!';
	import scuzzyPfp from '$lib/images/scuzzyPfp.png';
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={scuzzyPfp} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:title" content={pageTitle} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:site" content="@scuzzyfox" />
	<meta name="twitter:creator" content="@scuzzyfox" />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content={scuzzyPfp} />
</svelte:head>

<Wip />
