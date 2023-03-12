<script lang="ts">
	import type { Selection } from './Selection';
	//this might be better as a store?
	export let selections: Selection[] = [{ id: 0, name: 'blank', selected: false }];
	export let idModifier: string = '';

	function handleNewSelection(event: any) {
		//getting only the number id from the target's string id
		let id: number = parseInt(event.target.id.replace(/^\D+/g, ''), 10);

		//set all selections to false except for the one that was selected
		selections = selections.map((selection) => {
			if (id === selection.id) {
				return { id: selection.id, name: selection.name, selected: true };
			} else {
				return { id: selection.id, name: selection.name, selected: false };
			}
		});
	}
</script>

<div>
	{#each selections as selection (selection.id)}
		<input
			type="checkbox"
			id={idModifier + '' + selection.id.toString()}
			bind:checked={selection.selected}
			group={idModifier}
			on:change={handleNewSelection}
		/>
		<label for={idModifier + '' + selection.id.toString()}>{selection.name}</label>
	{/each}
</div>

<style>
	input {
		display: none;
	}

	label {
		background-color: rgba(0, 0, 0, 0);
		padding: 0.5rem 1rem;
		border-radius: 100rem;
		box-shadow: var(--btn-drp-shdw);
		outline: 1.8px solid var(--btn-clr-avail);
		color: var(--btn-clr-avail-txt);
	}

	label:hover {
		outline: 3px solid var(--btn-clr-avail);
		filter: brightness(130%) saturate(120%);
	}

	div {
		display: flex;
		flex: 1;
		justify-content: flex-start;
		gap: 2rem;
		flex-wrap: wrap;
	}

	input:checked + label {
		font-weight: 1000;
		background-color: var(--btn-clr-sel);
		color: var(--btn-clr-sel-txt);
		outline: none;
	}

	input:active + label {
		background-color: var(--tertiary-clr);
		color: var(--tertiary-clr-txt);
		outline: none;
		font-weight: 900;
	}

	@media (max-width: 900px) {
		div {
			flex-direction: column;
			gap: 1em;
		}

		label {
			text-align: center;
			word-wrap: break-word;
		}
	}
</style>
