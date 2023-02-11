<script lang="ts">
	import CheckedSelector from '$lib/CheckedSelector.svelte';
	import type { Selection } from '../../lib/Selection';
	import favicon from '$lib/images/logos/favicon.png';

	let mySelections: Selection[] = [
		{ id: 0, name: 'Site TOS', selected: true },
		{ id: 1, name: 'Commissions TOS', selected: false },
		{ id: 2, name: 'FAQ', selected: false }
	];

	export let data: any;

	let pageTitle = "ScuzzyFox Terms of Service";
	let pageDescription="Terms of Service for scuzzyfox.com and ScuzzyFox commissions, detailing what you can do with your furry art, commission process, and refund agreement.";
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={favicon} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:title" content={pageTitle} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:site" content="@scuzzyfox" />
	<meta name="twitter:creator" content="@scuzzyfox" />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content={favicon} />
</svelte:head>

<div class="all-content">
	<div class="selector">
		<CheckedSelector bind:selections={mySelections} idModifier="tos" />
	</div>
	<div class="tos">
		{#each mySelections as selection (selection.id)}
			{#if selection.selected && selection.id === 0}
				{@html data.siteTosHtml}
			{:else if selection.selected && selection.id === 1}
				{@html data.commissionTosHtml}
			{:else if selection.selected && selection.id === 2}
				{@html data.FAQHtml}
			{/if}
		{/each}

		{@html "<style>.tos p a {text-decoration: none; color: #027579;} .tos p a:hover {text-decoration: none; color: #32a5a9;}</style>"}
	</div>
</div>

<style>
	.selector {
		margin-top: 2em;
		margin-bottom: 2em;
	}
	.all-content {
		margin: 2em;
		margin-left: 15%;
		margin-right: 15%;
	}

	
</style>
