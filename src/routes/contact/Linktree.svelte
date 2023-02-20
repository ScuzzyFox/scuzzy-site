<script lang="ts">
	import type { Link, LinkCF } from '$lib/Link';
	import { fly } from 'svelte/transition';
	let testLink1: Link = { name: 'Link', href: '/contact' };
	let testLink2: LinkCF = { name: 'NSFW Link', href: '/contact', nsfw: true, abdl: false };
	let testLink3: LinkCF = { name: 'ABDL Link', href: '/contact', nsfw: false, abdl: true };

	export let title: string = 'Title';
	export let links: (Link | LinkCF)[] = [testLink1, testLink2, testLink3];
	export let allowNsfw: any = false;
	export let allowAbdl: any = false;

	function kebabCase(string: string) {
		return string
			.replace(/([a-z])([A-Z])/g, '$1-$2')
			.replace(/[\s_]+/g, '-')
			.toLowerCase();
	}
</script>

<div class="linktree">
	<h2 id={kebabCase(title)}>{title}</h2>
	<div class="links">
		{#each links as link (link.name)}
			{#if (link.nsfw && allowNsfw) || (link.abdl && allowAbdl)}
				<a
					in:fly={{ duration: 400, x: -500 }}
					out:fly={{ duration: 400, x: 500 }}
					class="linktree-link"
					href={link.href}>{link.name}</a
				>
			{:else if !link.nsfw && !link.abdl}
				<a
					in:fly={{ duration: 400, x: 500 }}
					out:fly={{ duration: 400, x: -500 }}
					class="linktree-link"
					href={link.href}>{link.name}</a
				>
			{/if}
		{/each}
	</div>
</div>

<style>
	* {
		display: inline;
	}

	.links {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5em;
		margin-top: 1em;
		margin-bottom: 2em;
	}

	.linktree-link {
		color: var(--white-txt);
		text-decoration: none;
		background-color: var(--link-btn-clr);
		min-width: min-content;
		max-width: max-content;
		padding: 1em 2em;
		box-shadow: var(--btn-drp-shdw);
		border-radius: 0.25em;
		font-weight: bold;
	}

	.linktree-link:hover {
		background-color: var(--link-btn-clr-hvr);
	}

	.linktree-link:active {
		background-color: var(--link-btn-clr-actv);
	}
</style>
