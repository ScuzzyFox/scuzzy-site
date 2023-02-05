<script lang="ts">
	import LogoNav from './LogoNav.svelte';
	import type { Link } from './Link';
	let links: Link[] = [
		{ name: 'contact', href: '/contact' },
		{ name: 'about', href: '/about' },
		{ name: 'store', href: '/store' },
		{ name: 'gallery', href: '/gallery' },
		{ name: 'commission', href: '/commissions' },
		{ name: 'goals', href: '/goals' },
		{ name: 'Terms of Service', href: '/tos' }
	];
</script>

<div class="main">
	<LogoNav {links} />
</div>

<style>
	.main {
		background-color: #1b252e;
		color: #f9f1ff;
		align-items: center;
		padding: 0.9em;
	}
</style>
