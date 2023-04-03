<script lang="ts">
	import logo from '$lib/images/logos/scuzzyfox-white-inline.svg';
	import type { Link } from './Link';
	export let links: Link[] = [];
	import { fly } from 'svelte/transition';
	import { clickOutside } from './click_outside';
	import { elasticOut } from 'svelte/easing';
	import NsfwSwitch from './NsfwSwitch.svelte';
	let isChecked: boolean;

	function handleOutclick() {
		if (isChecked) {
			isChecked = false;
		}
	}
</script>

<nav>
	<label
		for="nav-toggle"
		class="imga"
		id="nav-toggle-label"
		use:clickOutside
		on:outclick={handleOutclick}
		in:fly={{ y: -80, duration: 800, easing: elasticOut }}
		><img height="43px" src={logo} alt="scuzzyfox logo" /></label
	>
	<input type="checkbox" id="nav-toggle" class="nav-toggle" bind:checked={isChecked} />
	<div id="dropdown-nav">
		<a href="/" class="links">home</a>
		{#if links.length > 0}
			{#each links as link (link.href)}
				<a href={link.href} class="links">{link.name}</a>
			{/each}
		{/if}
	</div>
</nav>
<NsfwSwitch mobile={true} />

<style>
	.nav-toggle {
		display: none;
	}

	label {
		width: max-content;
	}

	.nav-toggle:checked ~ div {
		display: flex;
		background-color: var(--main-lt-clr);
		box-shadow: 10px 20px 20px var(--drp-shdw-clr);
		height: auto;
		opacity: 1;
		filter: saturate(100%) brightness(100%);
	}

	div {
		margin-left: 0;
		background-color: var(--main-clr);
		flex-direction: column;
		display: flex;
		position: absolute;
		top: 100%;
		left: 0;
		z-index: 90;
		transition: opacity 0.2s ease, background-color 0.25s ease, filter 0.3s ease, height 0.5s ease;
		filter: saturate(0) brightness(0);
		opacity: 0;
		height: 0;
		overflow: hidden;
		border-bottom-right-radius: var(--radius-card);
	}

	nav {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: left;
		height: 100%;
	}

	.imga {
		margin: 0;
		padding: 0;
		padding-right: 1.3em;
		height: 100%;
	}

	.imga:hover {
		cursor: pointer;
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
		margin-left: 1em;
		margin-right: 1em;
		flex-shrink: 0;
	}

	.links:hover {
		color: white;
		text-shadow: #f9f1ff 0 0 4px;
	}

	.links:active {
		color: var(--accnt-clr);
		text-shadow: var(--accnt-clr) 0 0 4px;
	}
</style>
