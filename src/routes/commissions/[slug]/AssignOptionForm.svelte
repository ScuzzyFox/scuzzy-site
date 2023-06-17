<script lang="ts">
	import BooleanInput from '$lib/BooleanInput.svelte';
	import FileFormInput from '$lib/FileFormInput.svelte';
	import FormButton from '$lib/FormButton.svelte';
	import NumberInput from '$lib/NumberInput.svelte';
	export let commission: any;
	export let options: any;
	let option: number;
	let buttonDisabled = true;
	let assign: boolean = true;
	let previousAssign: boolean = false;
	let previousUnassign: boolean = true;
	let unassign: boolean = false;
	let selected: number | undefined | null;

	function flipAssign() {
		if (previousAssign == assign) {
			previousAssign = !assign;
			unassign = !assign;
			previousUnassign = !unassign;
		} else if (previousUnassign == unassign) {
			previousUnassign = !unassign;
			assign = !unassign;
			previousAssign = !assign;
		}
	}

	function handleKeyDown(event: any) {
		if (event.code === 'Space') {
			select(event);
		}
	}

	function select(event: any) {
		let element = event.target;
		if (selected == element.dataset.option) {
			selected = null;
		} else {
			selected = element.dataset.option;
		}
	}

	$: assign, unassign, flipAssign();

	$: if (selected) {
		if (
			assign &&
			commission.options.filter((option: any) => {
				return option.id == selected;
			}).length > 0
		) {
			buttonDisabled = true;
		} else if (
			unassign &&
			commission.options.filter((option: any) => {
				return option.id == selected;
			}).length == 0
		) {
			buttonDisabled = true;
		} else {
			buttonDisabled = false;
		}
	} else {
		buttonDisabled = true;
	}
</script>

<form action="?/assignOption" enctype="multipart/form-data" autocomplete="off" method="POST">
	<h3>Assign Option to Commission</h3>
	{#each options as option, index (option.id)}
		<div
			class="option"
			on:click={select}
			on:keydown={handleKeyDown}
			data-option={option.id}
			class:selected={selected == option.id}
			class:assigned={commission.options.includes(option)}
		>
			<section class="option-info" data-option={option.id}>
				Option {option.id}: {option.name}
			</section>
			{#if option.example_image_url}
				<img
					class="option-image"
					src={option.example_image_url}
					alt={'Thumbnail for commission option ' + option.name}
					data-option={option.id}
				/>
			{/if}
			<!--

                <section data-option={option.id}>
                    {commission.options.includes(option) ? 'Assigned' : 'Not assigned'}
                </section>
            -->
		</div>
	{/each}
	<BooleanInput
		name="assign"
		inputId="assign-checkbox"
		required={false}
		bind:checked={assign}
		placeholder="Assign?"
	/>
	<BooleanInput
		name="unassign"
		inputId="unassign-checkbox"
		required={false}
		bind:checked={unassign}
		placeholder="Unassign?"
	/>
	<input type="hidden" bind:value={commission.id} name="commission" />
	<input type="hidden" bind:value={selected} name="option" />
	<FormButton bind:buttonDisabled label={assign ? 'Assign Option' : 'Unassign Option'} />
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

	.option {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.selected {
		background-color: var(--btn-clr-sel);
		color: var(--btn-clr-sel-txt);
		font-weight: 900;
	}

	.assigned {
		background-color: var(--tertiary-clr);
		color: var(--tertiary-clr-txt);
	}

	.assigned.selected,
	.selected.assigned {
		background-color: green;
		color: var(--white-txt);
		font-weight: 900;
	}

	.option-image {
		height: 5rem;
		object-fit: cover;
		align-self: flex-end;
	}

	.option-info {
		margin: 0.5rem;
	}
</style>
