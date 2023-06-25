<script lang="ts">
	import '$lib/styles/buttons.css';
	import type { CharacterReference } from '$lib/CommissionTypes';
	import TextAreaInput from '$lib/TextAreaInput.svelte';
	import TextInput from '$lib/TextInput.svelte';
	import FileFormInput from '$lib/FileFormInput.svelte';

	//NEED TO BE ABLE TO DELETE A CHARACTER FROM REFERENCES!!!!!!!!!
	export let characterReferences: CharacterReference[] = [
		{
			character_name: '',
			link: '',
			text_description: '',
			adult: false,
			abdl: false,
			image: undefined,
			type: 'link'
		}
	];

	function deleteCharacter(e: Event) {
		let btn: any = e.target;
		if (!btn) return;
		if (!btn.dataset.index) return;
		let ind = parseInt(btn.dataset.index);
		characterReferences = characterReferences.filter((ref, i) => {
			return i != ind;
		});
	}

	function addCharacter(e: Event) {
		characterReferences = [
			...characterReferences,
			{
				character_name: '',
				link: '',
				text_description: '',
				adult: false,
				abdl: false,
				image: undefined,
				type: 'link'
			}
		];
	}

	function switchType(event: Event) {
		let btn = event.target;
		if (!btn) return false;
		if (!(btn instanceof HTMLButtonElement)) return false;
		let index: number = parseInt(btn.dataset.index || '-1');
		if (index < 0) return false;
		let type: string = btn.dataset.type || '';
		if (!type) return false;
		characterReferences[index].type = type;
		characterReferences = [...characterReferences];
	}
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
	/>
</svelte:head>

<h3 style="margin-bottom:0;">Character References</h3>
<div class="button-row" style="width:100%">
	<button on:click={addCharacter} style="width:100%" class="yl-btn add-char-btn" type="button"
		>Add Reference</button
	>
</div>
{#each characterReferences as reference, index}
	{#if reference && reference.type}
		<div class="reference-container">
			<h4 data-index={index}>
				{reference.character_name
					? '' + (index + 1) + ': ' + reference.character_name
					: 'Character Reference ' + (index + 1)}{#if index != 0}<button
						class="trash-btn"
						data-index={index}
						type="button"
						on:click={deleteCharacter}
						><span data-index={index} class="material-symbols-outlined"> delete </span></button
					>{/if}
			</h4>
			<p style="margin:0;">Reference Type: (only one type per reference)</p>
			<div class="button-row">
				<button
					class:yl-btn={reference.type.toLocaleLowerCase() == 'link'}
					class:yl-lt-btn={reference.type.toLocaleLowerCase() != 'link'}
					data-index={index}
					data-type={'link'}
					on:click={switchType}
					type="button">Link</button
				>

				<button
					class:yl-btn={reference.type.toLocaleLowerCase() == 'file'}
					type="button"
					class:yl-lt-btn={reference.type.toLocaleLowerCase() != 'file'}
					data-index={index}
					data-type={'file'}
					on:click={switchType}>Upload Image</button
				>
				<button
					class:yl-btn={reference.type.toLocaleLowerCase() == 'text_description'}
					class:yl-lt-btn={reference.type.toLocaleLowerCase() != 'text_description'}
					data-index={index}
					data-type={'text_description'}
					type="button"
					on:click={switchType}>Text Description</button
				>
			</div>
			<div class="reference-inputs">
				<TextInput
					placeholder="Character Name"
					inputId={`character-${index}-input`}
					required={true}
					bind:value={characterReferences[index].character_name}
				/>
				{#if reference.type == 'link'}
					<TextAreaInput
						placeholder="Ref Link(s)"
						required={true}
						inputId={`reference-${index}-link`}
						bind:value={characterReferences[index].link}
					/>
				{:else if reference.type == 'file'}
					<FileFormInput
						accept="image/*"
						placeholder="Upload Image"
						inputId={`character-${index}-file-input`}
						bind:files={characterReferences[index].image}
						file=""
						name={`${index}|${reference.character_name}|file`}
					/>
				{:else if reference.type == 'text_description'}
					<TextAreaInput
						placeholder="Character Description"
						required={true}
						inputId={`character-${index}-description-input`}
						bind:value={characterReferences[index].text_description}
					/>
				{/if}
			</div>
		</div>
	{/if}
{/each}

<style>
	.button-row {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		flex: 1;
		gap: 0.3rem;
		align-items: center;
		justify-content: center;
	}

	.reference-inputs {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 1rem;
	}

	.add-char-btn {
		background-color: var(--accnt-clr);
		color: var(--white-txt);
	}

	.reference-container {
		border: 2px solid var(--card-clr-scnd);
		padding-bottom: 1rem;
		padding-left: 1rem;
		padding-right: 1rem;
	}

	.trash-btn {
		border: none;
		box-sizing: border-box;
		background-color: transparent;
		box-shadow: none;
		width: min-content;
		height: min-content;
		color: red;
		font-size: 1rem;
	}
	.trash-btn > span {
		filter: drop-shadow(var(----btn-drp-shdw));
	}

	.trash-btn:hover {
		filter: brightness(120%) saturate(120%);
	}

	.trash-btn:active {
		filter: brightness(60%) saturate(150%);
	}
</style>
