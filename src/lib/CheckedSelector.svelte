<script lang="ts">
	import type { Selection } from './Selection';
	export let selections: Selection[] = [{ id: 0, name: 'blank', selected: false }];
	export let idModifier: string = '';

	function handleNewSelection(event: any) {
		let id: number = parseInt(event.target.id.replace(/^\D+/g, ''), 10);
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
		background-color: #004e58;
		padding: 0.5em 1em;
		border-radius: 1em;
		box-shadow: 3px 3px 5px #0f141b;
	}

	label:hover {
		background-color: #004050;
	}

	div {
		display: flex;
		flex: 1;
		justify-content: flex-start;
		gap: 2em;
	}

	input:checked + label {
		background-color: #027579;
	}

	@media (max-width: 600px) {
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
