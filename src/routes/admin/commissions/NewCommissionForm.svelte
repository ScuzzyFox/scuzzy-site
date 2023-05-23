<script lang="ts">
	import TextInput from '$lib/TextInput.svelte';
	import BooleanInput from '$lib/BooleanInput.svelte';
	import FormButton from '$lib/FormButton.svelte';
	import NumberInput from '$lib/NumberInput.svelte';
	import '$lib/styles/buttons.css';
	import FileFormInput from '$lib/FileFormInput.svelte';

	let title: string = '';
	let shortDesc: string = '';
	let verboseDesc: string = '';
	let adult: boolean = false;
	let abdl: boolean = false;
	let available: boolean = false;
	let ad_blurb: string = '';
	let ad_image: any;
	let should_be_featured: boolean = false;
	let visible: boolean = true;
	let base_price: number;

	let createCommissionBtnDisabled: boolean = true;
	$: if (title && shortDesc && verboseDesc && ad_blurb && ad_image && base_price) {
		createCommissionBtnDisabled = false;
	} else {
		createCommissionBtnDisabled = true;
	}
</script>

<form
	action="/admin/commissions?/newCommission"
	enctype="multipart/form-data"
	autocomplete="off"
	method="POST"
>
	<TextInput
		name="title"
		bind:value={title}
		inputId="commission-title-input"
		required={true}
		placeholder="Title"
	/>

	<TextInput
		name="short_description"
		bind:value={shortDesc}
		inputId="short-desc-input"
		required={true}
		placeholder="Short Description"
	/>

	<TextInput
		name="verbose_description"
		bind:value={verboseDesc}
		inputId="verbose-desc-input"
		required={true}
		placeholder="Verbose Description"
	/>

	<TextInput
		name="ad_blurb"
		bind:value={ad_blurb}
		inputId="ad_blurb-input"
		required={true}
		placeholder="Ad-Blurb"
	/>

	<FileFormInput
		bind:file={ad_image}
		name="ad_image"
		inputId="ad-image-input"
		placeholder="Upload Ad Image"
		accept="image/*, image/png, image/webp, image/jpg, image/jpeg"
	/>

	<NumberInput
		name="base_price"
		bind:value={base_price}
		required={true}
		placeholder="Base Price"
		inputId="base-price-input"
	/>
	<BooleanInput name="adult" bind:checked={adult} placeholder="NSFW" inputId="adult-input" />
	<BooleanInput name="abdl" bind:checked={abdl} placeholder="ABDL" inputId="abdl-input" />
	<BooleanInput
		name="should_be_featured"
		bind:checked={should_be_featured}
		placeholder="Featured?"
		inputId="featured-input"
	/>
	<BooleanInput
		name="visible"
		bind:checked={visible}
		placeholder="Visible?"
		inputId="visible-input"
	/>
	<BooleanInput
		name="available"
		bind:checked={available}
		placeholder="Available"
		inputId="available-input"
	/>

	<button class="yl-btn" disabled={createCommissionBtnDisabled} type="submit"
		>Create Commission</button
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
