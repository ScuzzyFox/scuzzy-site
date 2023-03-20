<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import { onMount } from 'svelte';
	import { userSettingsStore } from '$lib/stores';
	import { adminStore } from '$lib/stores';

	export let data: any;
	//populate userSettings and admin Store
	onMount(() => {
		// this data is coming from layout server load function
		$userSettingsStore = data.userSettings;
		$adminStore = data.admin;
	});
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css?family=Montserrat|Gloria+Hallelujah"
		rel="stylesheet"
	/>
	<link rel="manifest" href="/scuzzyfox.webmanifest" />
</svelte:head>

<Header />
<div class="wrapper" id="slot-wrapper">
	<slot />
</div>
<Footer />

<style>
	/* to be used later for global variables ? */
	:global(html) {
		--mobile-trans: 913px;

		--white-txt: #f1f8ff;

		--main-clr: #0b1216;
		--main-lt-clr: #142230;

		--accnt-clr: #1fa0e9;

		--tertiary-clr: #efdb23;
		--tertiary-clr-txt: #68611f;

		--tertiary-lt-clr: #e3db8e;

		--card-clr: #0b2331;
		--card-clr-scnd: #254456;

		--clr-selected: #6fbeea;
		--txt-selected-clr: #11394f;

		--link-txt-clr: #33b2fa;
		--link-txt-clr-actv: var(--tertiary-clr);

		--btn-clr: var(--accnt-clr);

		--btn-clr-sel: #6fbeea;
		--btn-clr-sel-txt: #11394f;

		--btn-clr-avail: #4a758d;
		--btn-clr-avail-txt: #1fa0e9;

		--btn-clr-deact: #1e282e;
		--btn-clr-deact-txt: #84a3b9;

		--drp-shdw-clr: rgba(15, 7, 20, 0.25);
		--drp-shdw-clr-drk: rgba(15, 7, 20, 0.65);
		--drp-shdw: 0 5px 5px var(--drp-shdw-clr);
		--btn-drp-shdw: 5px 5px 5px var(--drp-shdw-clr);

		--radius-btn: 2.5px;
		--radius-card: 10px;
		--radius-img: 16px;

		--main-font: Montserrat, arial, sans-serif;
		--heading-font: Gloria Hallelujah, serif;

		height: 100%;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		line-height: 1.2;
		background-color: var(--main-clr);
		color: var(--white-txt);
		font-family: var(--main-font);
		/* next 3 settings used to get footer on the bottom if there's not enough content */
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		box-sizing: border-box;
	}

	:global(h1, h2, h3, h4, h5, h6) {
		font-family: var(--heading-font);
		font-weight: normal;
	}

	/* used to get the footer to stay at the bottom if not enough content... */
	/* Idk how it works*/
	.wrapper {
		flex: 1;
	}

	/* global ul, ol reset */
	:global(ol, ul) {
		list-style: none;
	}
</style>
