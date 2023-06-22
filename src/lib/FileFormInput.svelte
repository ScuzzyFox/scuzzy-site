<script lang="ts">
	import '$lib/styles/inputBoxes.css';

	export let inputId: string;
	export let name: string | undefined | null = null;
	export let placeholder: string;
	export let file: string;
	export let accept: string;
	export let multiple: boolean | undefined | null = null;
	let inputElement: HTMLInputElement;
	export let files: any = null;

	function handleChange(event: Event) {
		files = inputElement.files;
	}
</script>

<label for={inputId} class={`file-input-label ${file ? 'full' : ''}`}>
	{placeholder}{#if file}: {file}
	{/if}
	<input
		on:change={handleChange}
		class="file-input"
		type="file"
		{name}
		id={inputId}
		{accept}
		{multiple}
		bind:value={file}
		bind:this={inputElement}
	/>
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
