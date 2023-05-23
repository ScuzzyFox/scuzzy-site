<script lang="ts">
	import '$lib/styles/inputBoxes.css';

	export let checked: boolean;
	export let inputId: string;
	export let name: string;
	export let required: boolean | null | undefined = null;
	export let placeholder: string;
	let value: boolean;

	$: value = checked;
</script>

<label class="chkbx-input-label" for={inputId}>
	<span class="chckbx-input-label-text" class:checked>{placeholder}</span>

	<input
		class="chkbx-input"
		type="checkbox"
		id={inputId}
		{name}
		bind:checked
		{required}
		bind:value
	/>
</label>

<style>
	.chkbx-input-label {
		display: flex;
		flex-direction: row;
		width: 100%;
		gap: 0.2rem;
		position: relative;
		--transition-rate: 200ms ease;
	}

	.chckbx-input-label-text {
		color: var(--btn-clr-deact-txt);
		transition: var(--transition-rate);
	}

	.chckbx-input-label-text.checked {
		color: var(--tertiary-clr);
	}

	.chckbx-input-label-text:focus {
		color: var(--accnt-clr);
	}
</style>
