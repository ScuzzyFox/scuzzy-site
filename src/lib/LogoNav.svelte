<script lang="ts">
	import logo from '$lib/images/logos/scuzzyfox-white-inline.svg';

	import type { Link } from './Link';
	export let links: Link[] = [];
</script>

<nav>
	<a href="/" class="imga"
		><img src={logo} alt="scuzzyfox logo" /></a
	>
	{#if links.length > 0}
		{#each links as link (link.href)}
			<a href={link.href} class="links">{link.name}</a>
		{/each}
	{/if}
</nav>

<style>
	nav {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		height: 100%;
	}

	.imga {
		margin: 0;
		padding: 0;
		padding-right: 1.3em;
		height: 100%;
	}

	img {
		height: 2.7em;
	}

	.links {
		font-size: 1.2rem;
		font-weight: bold;
		text-decoration: none;
		color: #f9f1ff;
		font-family: Montserrat, sans-serif;
		padding: 0.6em;
		flex-shrink: 0;
	}

	.links:hover {
		color: white;
		text-shadow: #f9f1ff 0 0 4px;
	}
</style>
