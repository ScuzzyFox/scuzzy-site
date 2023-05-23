<script lang="ts">
	import TextInput from '$lib/TextInput.svelte';
	import BooleanInput from '$lib/BooleanInput.svelte';
	import FormButton from '$lib/FormButton.svelte';
	import NumberInput from '$lib/NumberInput.svelte';
	import '$lib/styles/buttons.css';
	import FileFormInput from '$lib/FileFormInput.svelte';
	import FloatInput from '$lib/FloatInput.svelte';

	let name: string;
	let description: string;
	let cost: number;
	let adult: boolean;
	let abdl: boolean;
	let exclusive_with: string;
	let required: string;
	let example_image: any;

	let createOptionButtonDisabled: boolean = true;

	$: if (name && description && cost && example_image) {
		createOptionButtonDisabled = false;
	} else {
		createOptionButtonDisabled = true;
	}
</script>

<form
	method="POST"
	action="/admin/commissions?/newOption"
	enctype="multipart/form-data"
	autocomplete="off"
>
	<TextInput
		required={true}
		placeholder="Option Name"
		bind:value={name}
		inputId="option-name-input"
		name="name"
	/>

	<TextInput
		required={true}
		placeholder="Description"
		bind:value={description}
		inputId="option-description-input"
		name="description"
	/>
	<FloatInput
		required={true}
		placeholder="Cost"
		bind:value={cost}
		inputId="option-cost-input"
		name="cost"
	/>
	<TextInput
		required={false}
		placeholder="Exclusivity String"
		bind:value={exclusive_with}
		inputId="option-exclusivity-input"
		name="exclusive_with"
	/>

	<TextInput
		required={false}
		placeholder="Requiredness String"
		bind:value={required}
		inputId="option-required-input"
		name="required"
	/>

	<FileFormInput
		inputId="option-example-image-input"
		name="example_image"
		placeholder="Example Option Image"
		bind:file={example_image}
		accept="image/*, image/png, image/webp, image/jpg, image/jpeg"
	/>
	<BooleanInput inputId="option-adult-input" placeholder="NSFW" name="adult" bind:checked={adult} />

	<BooleanInput inputId="option-abdl-input" placeholder="ABDL" name="abdl" bind:checked={abdl} />

	<button class="yl-btn" disabled={createOptionButtonDisabled} type="submit"
		>Create Commission Option</button
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
