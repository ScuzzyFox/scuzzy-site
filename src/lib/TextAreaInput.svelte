<script lang="ts">
	import '$lib/styles/inputBoxes.css';
	import { onMount } from 'svelte';

	export let value: string = '';
	export let inputId: string;
	export let name: string | undefined | null = null;
	export let required: boolean;
	export let placeholder: string;
	let textArea: any;

	function fitContent() {
		textArea.style.height = '';
		textArea.style.height = textArea.scrollHeight + 'px';
	}

	onMount(() => {
		setTimeout(fitContent, 500);
	});
</script>

<label class="input-label" for={inputId}>
	<textarea
		class="input-text-box"
		id={inputId}
		{name}
		bind:value
		bind:this={textArea}
		{required}
		on:input={fitContent}
	/>
	<span class="input-label-text">{placeholder}</span>
</label>
