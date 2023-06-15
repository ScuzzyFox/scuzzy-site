<script lang="ts">
	import '$lib/styles/inputBoxes.css';

	export let inputId: string;
	export let name: string;
	export let placeholder: string;
	export let file: string;
	export let accept: string;
</script>

<label for={inputId} class={`file-input-label ${file ? 'full' : ''}`}>
	{placeholder}{#if file}: {file}
	{/if}
	<input class="file-input" type="file" {name} id={inputId} {accept} bind:value={file} />
</label>

<style>
	.file-input {
		display: none;
	}

	.file-input-label {
		background-color: var(--tertiary-lt-clr);
		color: var(--tertiary-clr-txt);
		font-weight: normal;
		transition: 250ms;
		text-align: center;
		padding: 0.5rem 1rem;
		display: block;
		border-radius: var(--radius-btn);
		box-shadow: var(--btn-drp-shdw);
		overflow: hidden;
	}

	.file-input-label.full {
		background-color: var(--tertiary-clr);
	}

	label,
	input {
		box-sizing: border-box;
	}
</style>
