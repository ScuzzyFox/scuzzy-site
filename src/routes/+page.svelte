<script>
	import mainPageBanner from '$lib/images/mainPageBanner.png';
	let pageDescription = 'ScuzzyFox.com Furry commissions, badges, art, merchandise and more!';
	let pageTitle = 'ScuzzyFox.com: Furry commissions, badges, art, merchandise and more!';
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
<img src={mainPageBanner} width="100%" alt="" />
<h1>This is HOME page</h1>
