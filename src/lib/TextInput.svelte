<script lang="ts">
	import '$lib/styles/inputBoxes.css';

	export let value: string = '';
	export let inputId: string;
	export let name: string | null | undefined = null;
	export let required: boolean;
	export let placeholder: string;
</script>

<label class="input-label" for={inputId}>
	<input class="input-text-box" type="text" id={inputId} {name} bind:value {required} />
	<span class="input-label-text">{placeholder}</span>
</label>
