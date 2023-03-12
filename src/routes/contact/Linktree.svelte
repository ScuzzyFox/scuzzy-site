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
	.links {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		gap: 0.5em;
		margin-top: 1em;
		margin-bottom: 2em;
		width: 280px;
	}

	.linktree-link {
		text-align: center;
		color: var(--white-txt);
		text-decoration: none;
		background-color: var(--accnt-clr);
		/* min-width: min-content;
		max-width: max-content; */
		width: 60%;
		padding: 1rem 2rem;
		box-shadow: var(--btn-drp-shdw);
		border-radius: 0.25rem;
		font-weight: bold;
		transition-property: border-radius, outline, font-weight;
		transition-duration: 0.2s;
		display: inline-block;
	}

	.linktree-link:hover {
		outline: 5px solid var(--accnt-clr);
		filter: brightness(120%) saturate(120%);
		border-radius: 0.75rem;
		font-weight: 900;
	}

	.linktree-link:active {
		outline: 2px solid var(--accnt-clr);
		filter: brightness(80%) saturate(150%);
		border-radius: 1rem;
	}
</style>
