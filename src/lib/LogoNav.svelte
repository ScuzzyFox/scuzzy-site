<script lang="ts">
	import logo from '$lib/images/logos/scuzzyfox-white-inline.svg';

	import type { Link } from './Link';
	export let links: Link[] = [];
	import { fly } from 'svelte/transition';
	import NsfwSwitch from './NsfwSwitch.svelte';
	export let animating: boolean;
</script>

<nav>
	<a href="/" class="imga"><img height="43px" width="125.7px" src={logo} alt="scuzzyfox logo" /></a>
	{#if links.length > 0}
		{#each links as link (link.href)}
			<a
				href={link.href}
				class="links"
				transition:fly={{ x: -500, duration: 150 }}
				on:introstart={() => (animating = true)}
				on:introend={() => (animating = false)}
				on:outrostart={() => (animating = true)}
				on:outroend={() => (animating = false)}>{link.name}</a
			>
		{/each}
	{/if}
	<NsfwSwitch />
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

	/* img {
		height: 2.7em;
	} */

	img:hover {
		filter: drop-shadow(0 0 4px #f9f1ff);
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
