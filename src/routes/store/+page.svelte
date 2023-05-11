<script lang="ts">
	import Wip from '$lib/Wip.svelte';
	import mainPageBanner from '$lib/images/mainPageBanner.png';
	import PageViewTelemetry from '$lib/PageViewTelemetry.svelte';
	import { statusStore } from '$lib/stores';

	let pageTitle = 'ScuzzyFox Store | Furry merchandise and novelty items';
	let pageDescription =
		"Looking for some fun furry gifts? Check out ScuzzyFox's store where you can get lanyards, stickers, and more!";
</script>

<PageViewTelemetry />

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={mainPageBanner} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:title" content={pageTitle} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:site" content="@scuzzyfox" />
	<meta name="twitter:creator" content="@scuzzyfox" />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content={mainPageBanner} />
</svelte:head>
{#if $statusStore.store_open}
	<Wip />
{:else}
	<h1>Sorry, Store Is Currently Closed!</h1>
{/if}
