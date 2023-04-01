<script lang="ts">
	import mainPageBanner from '$lib/images/mainPageBanner.png?width=1024&format=webp';
	import mainPageBannerFullRes from '$lib/images/mainPageBanner.png?webp';
	import { userSettingsStore } from '$lib/stores';
	let pageDescription = 'ScuzzyFox.com Furry commissions, badges, art, merchandise and more!';
	let pageTitle = 'ScuzzyFox.com | Furry commissions, badges, art, merchandise and more!';
	let hiResLoaded: boolean = false;

	function handleLoad(event: any) {
		const myImg = event.target;
		setTimeout(() => {
			if (!hiResLoaded) {
				console.log('src', myImg.src);
				console.log('fullres', mainPageBannerFullRes);

				myImg.src = mainPageBannerFullRes;
				hiResLoaded = true;
			}
		}, 500);
	}
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
<img
	src={mainPageBanner}
	alt="Site page banner of scuzzy's art"
	class="banner"
	on:load={handleLoad}
	on:mouseover={handleLoad}
	on:focus={handleLoad}
/>

<h1>This is the home page. More to come soon!</h1>

<style>
	h1 {
		text-align: center;
	}

	.banner {
		width: 100%;
	}

	@media (max-width: 913px) {
		.banner {
			width: 100vw;
			min-height: 20vh;
			object-fit: cover;
		}
	}
</style>
