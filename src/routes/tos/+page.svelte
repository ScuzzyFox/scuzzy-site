<script lang="ts">
	import CheckedSelector from '$lib/CheckedSelector.svelte';
	import type { Selection } from '../../lib/Selection';

	let mySelections: Selection[] = [
		{ id: 0, name: 'Site TOS', selected: true },
		{ id: 1, name: 'Commissions TOS', selected: false },
		{ id: 2, name: 'FAQ', selected: false }
	];

	export let data: any;
</script>

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
