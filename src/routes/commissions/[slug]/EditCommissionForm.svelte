<script lang="ts">
	import BooleanInput from '$lib/BooleanInput.svelte';
	import FileFormInput from '$lib/FileFormInput.svelte';
	import NumberInput from '$lib/NumberInput.svelte';
	import TextAreaInput from '$lib/TextAreaInput.svelte';
	import TextInput from '$lib/TextInput.svelte';
	import FormButton from '$lib/FormButton.svelte';
	import { onMount } from 'svelte';

	export let commission: any;
	let file: any;
	let title: string;
	let shortDescription: string;
	let verboseDescription: string;
	let adBlurb: string;
	let basePrice: number;
	let adult: boolean;
	let abdl: boolean;
	let featured: boolean;
	let available: boolean;
	let visible: boolean;
	let buttonDisabled: boolean = true;

	onMount(() => {
		title = commission.title;
		shortDescription = commission.short_description;
		verboseDescription = commission.verbose_description;
		adBlurb = commission.ad_blurb;
		basePrice = commission.base_price;
		adult = commission.adult;
		abdl = commission.abdl;
		featured = commission.should_be_featured;
		available = commission.available;
		visible = commission.visible;
	});

	$: if (title && shortDescription && verboseDescription && adBlurb && basePrice) {
		buttonDisabled = false;
	} else {
		buttonDisabled = true;
	}
</script>

<form method="POST" action="?/editCommission" autocomplete="off" enctype="multipart/form-data">
	<h3>Edit Commission</h3>

	<input type="hidden" name="com_id" bind:value={commission.id} />

	<TextInput
		name="title"
		placeholder="Title"
		bind:value={title}
		required={true}
		inputId="commission-title-input"
	/>

	<TextInput
		name="short_description"
		placeholder="Short Description"
		bind:value={shortDescription}
		required={true}
		inputId="commission-short-description-input"
	/>

	<TextAreaInput
		name="verbose_description"
		placeholder="Verbose Description"
		bind:value={verboseDescription}
		required={true}
		inputId="commission-verbose-description-input"
	/>

	<TextInput
		name="ad_blurb"
		placeholder="Ad Blurb"
		bind:value={adBlurb}
		required={true}
		inputId="commission-ad-blurb-input"
	/>

	<NumberInput
		name="base_price"
		placeholder="Base Price"
		bind:value={basePrice}
		required={true}
		inputId="commission-base-price-input"
	/>

	<FileFormInput
		name="ad_image"
		inputId="ad-image-file-input"
		bind:file
		placeholder="Ad Image"
		accept="image/*"
	/>

	<BooleanInput
		name="adult"
		inputId="commission-adult-input"
		bind:checked={adult}
		placeholder="NSFW?"
	/>

	<BooleanInput
		name="abdl"
		inputId="commission-abdl-input"
		bind:checked={abdl}
		placeholder="ABDL?"
	/>

	<BooleanInput
		name="should_be_featured"
		inputId="commission-featured-input"
		bind:checked={featured}
		placeholder="Featured?"
	/>

	<BooleanInput
		name="visible"
		inputId="commission-visible-input"
		bind:checked={visible}
		placeholder="Visible?"
	/>

	<BooleanInput
		name="available"
		inputId="commission-available-input"
		bind:checked={available}
		placeholder="Available?"
	/>

	<FormButton bind:buttonDisabled label="Edit Commission" />
</form>

<style>
	form {
		box-sizing: border-box;
		border: 2px solid var(--card-clr-scnd);
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;
	}
</style>
