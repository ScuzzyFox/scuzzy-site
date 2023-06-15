<script lang="ts">
	import BooleanInput from '$lib/BooleanInput.svelte';
	import FileFormInput from '$lib/FileFormInput.svelte';
	import FormButton from '$lib/FormButton.svelte';
	import NumberInput from '$lib/NumberInput.svelte';
	let file: any;
	let buttonDisabled: boolean;
	let isAdult: boolean = false;
	let isAbdl: boolean = false;
	let isVideo: boolean = false;
	let imageOrder: number;
	export let commission: number;

	$: if (!file && !imageOrder) {
		buttonDisabled = true;
	} else {
		buttonDisabled = false;
	}
</script>

<form action="?/addVisual" method="POST" enctype="multipart/form-data">
	<h3>Add Commission Visual</h3>
	<FileFormInput
		name="visual"
		inputId="visual-input"
		placeholder="Commission visual file"
		bind:file
		accept="*/*"
	/>

	<NumberInput
		name="order"
		inputId="visual-order-input"
		placeholder="Image order"
		bind:value={imageOrder}
		required={true}
	/>

	<BooleanInput
		name="adult"
		inputId="visual-adult-input"
		placeholder="NSFW?"
		bind:checked={isAdult}
	/>

	<BooleanInput name="abdl" inputId="visual-abdl-input" placeholder="ABDL?" bind:checked={isAbdl} />
	<BooleanInput
		name="is_video"
		inputId="visual-video-input"
		placeholder="Is this a video?"
		bind:checked={isVideo}
	/>
	<input type="hidden" name="commission" bind:value={commission} />
	<FormButton bind:buttonDisabled label="Create Visual" />
</form>

<style>
	form {
		box-sizing: border-box;
		border: 2px solid var(--card-clr-scnd);
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
