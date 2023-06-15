<script lang="ts">
	import TextInput from '$lib/TextInput.svelte';
	import BooleanInput from '$lib/BooleanInput.svelte';
	import FormButton from '$lib/FormButton.svelte';
	import NumberInput from '$lib/NumberInput.svelte';
	import '$lib/styles/buttons.css';
	import FileFormInput from '$lib/FileFormInput.svelte';
	import FloatInput from '$lib/FloatInput.svelte';

	let name: string;

	let adult: boolean;
	let abdl: boolean;

	let createCategoryButtonDisabled: boolean = true;

	$: if (name) {
		createCategoryButtonDisabled = false;
	} else {
		createCategoryButtonDisabled = true;
	}
</script>

<form
	method="POST"
	action="/admin/commissions?/newCategory"
	enctype="multipart/form-data"
	autocomplete="off"
>
	<TextInput
		required={true}
		placeholder="Category Name"
		bind:value={name}
		inputId="category-name-input"
		name="name"
	/>

	<BooleanInput inputId="option-adult-input" placeholder="NSFW" name="adult" bind:checked={adult} />

	<BooleanInput inputId="option-abdl-input" placeholder="ABDL" name="abdl" bind:checked={abdl} />

	<button class="yl-btn" disabled={createCategoryButtonDisabled} type="submit"
		>Create Commission Category</button
	>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 1rem;
	}
</style>
