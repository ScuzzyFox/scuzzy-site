<script lang="ts">
	import Wip from '$lib/Wip.svelte';
	let pageDescription = "Check out ScuzzyFox's Furry art on scuzzyfox.com";
	let pageTitle = "ScuzzyFox's Furry Art Gallery";
	//todo: meta image will be either latest submission, or a random submission
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta property="og:type" content="website" />
	<!-- <meta property="og:image" content={metaImage} /> -->
	<meta property="og:description" content={pageDescription} />
	<meta property="og:title" content={pageTitle} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:site" content="@scuzzyfox" />
	<meta name="twitter:creator" content="@scuzzyfox" />
	<meta name="twitter:description" content={pageDescription} />
	<!-- <meta name="twitter:image" content={metaImage} /> -->
</svelte:head>
<Wip />
