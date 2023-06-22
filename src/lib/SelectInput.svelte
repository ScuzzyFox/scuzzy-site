<script lang="ts">
	import { onMount } from 'svelte';

	//import '$lib/styles/inputBoxes.css';

	export let value: string;
	export let inputId: string;
	export let name: string;
	export let required: boolean;
	export let placeholder: string;
	export let options: { label: string; value: any }[];
</script>

<label class="input-label" for={inputId}>
	<select class="input-dropdown" id={inputId} {name} bind:value {required}>
		{#each options as option, index (option.value)}
			<option selected={index == 0 ? true : null} value={option.value} pos={index}
				>{option.label}</option
			>
		{/each}
	</select>
	<span class="input-label-text">{placeholder}</span>
</label>
