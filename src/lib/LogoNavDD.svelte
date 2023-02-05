<script lang="ts">
	import type { Link } from './Link';
	export let links: Link[] = [];
	import { clickOutside } from './click_outside';
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
		><img src="https://scuzzyfox.com/scuzzyfox-white-inline.svg" alt="scuzzyfox logo" /></label
	>
	<input type="checkbox" id="nav-toggle" class="nav-toggle" bind:checked={isChecked} />
	<div>
		<a href="/" class="links">home</a>
		{#if links.length > 0}
			{#each links as link (link.href)}
				<a href={link.href} class="links">{link.name}</a>
			{/each}
		{/if}
	</div>
</nav>

<style>
	.nav-toggle {
		display: none;
	}

	label {
		width: max-content;
	}

	.nav-toggle:checked ~ div {
		display: flex;
	}

	div {
		margin-left: 0;
		background-color: #1b252e;
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 4.5em;
		left: 0;
		display: none;
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
		margin-left: 1em;
		margin-right: 1em;
		flex-shrink: 0;
	}

	.links:hover {
		color: white;
		text-shadow: #f9f1ff 0 0 4px;
	}
</style>
