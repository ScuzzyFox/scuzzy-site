<script lang="ts">
	import inputBoxesCss from '$lib/styles/inputBoxes.css?url';

	export let value: Number | undefined;
	export let inputId: string;
	export let name: string;
	export let required: boolean;
	export let placeholder: string;
</script>

<svelte:head>
	<link rel="stylesheet" href={inputBoxesCss} />
</svelte:head>

<label class="input-label" for={inputId}>
	<input class="input-text-box" type="number" id={inputId} {name} bind:value {required} />
	<span class="input-label-text">{placeholder}</span>
</label>
