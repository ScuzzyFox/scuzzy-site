<script lang="ts">
	import LogoNav from './LogoNav.svelte';
	import LogoNavDD from './LogoNavDD.svelte';
	import type { Link } from './Link';

	let links: Link[] = [
		{ name: 'contact', href: '/contact' },
		{ name: 'about', href: '/about' },
		{ name: 'store', href: '/store' },
		{ name: 'gallery', href: '/gallery' },
		{ name: 'commission', href: '/commissions' },
		{ name: 'goals', href: '/goals' },
		{ name: 'terms of service', href: '/tos' }
	];
	let innerWidth: number;
</script>

<svelte:window bind:innerWidth />

<div class="main">
	{#if innerWidth < 913}
		<LogoNavDD {links} />
	{:else}
		<LogoNav {links} />
	{/if}
</div>

<style>
	.main {
		background-color: #1b252e;
		color: #f9f1ff;
		align-items: center;
		padding: 0.9em;
	}
</style>
