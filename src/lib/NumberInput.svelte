<script lang="ts">
	import '$lib/styles/inputBoxes.css';

	export let value: Number | undefined;
	export let inputId: string;
	export let name: string;
	export let required: boolean;
	export let placeholder: string;
</script>

<label class="input-label" for={inputId}>
	<input class="input-text-box" type="number" id={inputId} {name} bind:value {required} step="1" />
	<span class="input-label-text">{placeholder}</span>
</label>
