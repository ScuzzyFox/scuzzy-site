<script lang="ts">
	//@ts-ignore
	import mainPageBanner from '$lib/images/mainPageBanner.png?width=1024&format=webp';
	//@ts-ignore
	import mainPageBannerFullRes from '$lib/images/mainPageBanner.png?webp';
	import { userSettingsStore, statusStore } from '$lib/stores';
	import PageViewTelemetry from '$lib/PageViewTelemetry.svelte';
	import CommissionCard from './commissions/CommissionCard.svelte';
	import { onMount } from 'svelte';

	let pageDescription = 'ScuzzyFox.com Furry commissions, badges, art, merchandise and more!';
	let pageTitle = 'ScuzzyFox.com | Furry commissions, badges, art, merchandise and more!';
	let hiResLoaded: boolean = false;
	let innerWidth: number;
	let commission: any;

	export let data;

	function assignData() {
		if (!data.commission) {
			setTimeout(assignData, 200);
		} else {
			commission = data.commission;
		}
	}

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

	onMount(assignData);
</script>

<PageViewTelemetry />

<svelte:window bind:innerWidth />

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

<h1>Welcome to ScuzzyFox's Site!</h1>

<div class="main-content">
	{#if commission}
		<div class="featured-commission-container">
			<h2>Featured Commission:</h2>
			<CommissionCard
				{commission}
				bind:innerWidth
				showAbdl={$userSettingsStore.abdlAllowed}
				showAdult={$userSettingsStore.nsfwAllowed}
				orderable={$statusStore.commissions_open}
			/>
		</div>
	{/if}
</div>

<style>
	h1 {
		text-align: center;
	}

	.banner {
		width: 100%;
	}

	.featured-commission-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.main-content {
		margin: 1rem;
	}

	@media (max-width: 913px) {
		.banner {
			width: 100vw;
			min-height: 20vh;
			object-fit: cover;
		}
	}
</style>
