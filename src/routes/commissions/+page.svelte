<script lang="ts">
	import Wip from '$lib/Wip.svelte';
	import mainPageBanner from '$lib/images/mainPageBanner.png'; // todo: replace with appropriate banner image
	let pageTitle = 'ScuzzyFox Commissions | Custom furry art for you and your friends!';
	let pageDescription =
		'Looking for a Furry artist to draw your next idea? ScuzzyFox offers commissions! SFW, NSFW, and ABDL commissions are available.';
</script>

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
<Wip />
