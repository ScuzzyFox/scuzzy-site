<script lang="ts">
	import '$lib/styles/inputBoxes.css';

	export let value: string = '';
	export let inputId: string;
	export let name: string;
	export let required: boolean;
	export let placeholder: string;
	export let autocomplete: string | null | undefined = null;
	let valid: any;

	$: if (value) {
		valid = true;
	} else {
		valid = false;
	}
</script>

<label class="input-label" for={inputId}>
	<input
		class="input-text-box"
		type="email"
		id={inputId}
		{name}
		bind:value
		{required}
		{autocomplete}
		class:valid
	/>
	<span class="input-label-text">{placeholder}</span>
</label>
