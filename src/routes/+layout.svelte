<script>
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" />
</svelte:head>

<Header />
<div class="wrapper" id="slot-wrapper">
	<slot />
</div>
<Footer />

<style>
	/* to be used later for global variables ? */
	:global(html) {
		--white-txt: #f9f1ff;
		--main-clr: #151c24;
		--scnd-clr: #1b252e;
		--accnt-clr: #004e58;
		--accnt-clr-2: #027579;

		--link-txt-clr: #fff;
		--link-txt-clr-hvr: #ddd;
		--link-txt-clr-actv: #0ee;

		--drp-shdw: 0 5px 5px rgba(15, 7, 20, 0.25);
		--btn-drp-shdw: 5px 5px 5px rgba(15, 7, 20, 0.25);

		--sans-family: Montserrat;
		--serif-family: serif;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
		line-height: 1.2;
		background-color: #151c24;
		color: #f9f1ff;
		font-family: Montserrat, sans-serif;
		/* next 3 settings used to get footer on the bottom if there's not enough content */
		display: flex;
		flex-direction: column;
		min-height: 100vh;
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
