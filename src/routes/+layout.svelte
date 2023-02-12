<script>
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" />
</svelte:head>

<Header />
<div class="wrapper">
	<slot />
</div>
<Footer />

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
		line-height: 1;
		background-color: #151c24;
		color: #f9f1ff;
		font-family: Montserrat, sans-serif;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	/* used to get the footer to stay at the bottom if not enough content... */
	.wrapper {
		flex: 1;
	}

	:global(ol, ul) {
		list-style: none;
	}
</style>
