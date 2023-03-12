<script lang="ts">
	import LogoNav from './LogoNav.svelte';
	import LogoNavDD from './LogoNavDD.svelte';
	import type { Link } from './Link';
	import { userSettingsStore } from '$lib/stores';

	let links: Link[] = [
		{ name: 'store', href: '/store' },
		{ name: 'commission', href: '/commissions' },
		{ name: 'gallery', href: '/gallery' },
		{ name: 'goals', href: '/goals' },
		{ name: 'about', href: '/about' },
		{ name: 'contact', href: '/contact' },
		{ name: 'terms of service', href: '/tos' }
	];
	let innerWidth: number;

	let animating: boolean;
</script>

<svelte:window bind:innerWidth />

<div class="main">
	{#if innerWidth < 1010 && !animating}
		<LogoNavDD {links} />
	{:else if innerWidth >= 1010}
		<LogoNav {links} bind:animating />
	{/if}
</div>

<style>
	.main {
		background-color: var(--main-lt-clr);
		color: var(--white-txt);
		align-items: center;
		padding: 0.9em;
		box-shadow: 0 5px 20px var(--drp-shdw-clr);
		position: relative;
	}
</style>
