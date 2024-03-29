<script lang="ts">
	import BooleanInput from '$lib/BooleanInput.svelte';
	import FormButton from '$lib/FormButton.svelte';
	import TextInput from '$lib/TextInput.svelte';
	export let commission: any;
	export let unfilteredOptions: any;
	let options: any = unfilteredOptions;
	let buttonDisabled = true;
	let assign: boolean = true;
	let previousAssign: boolean = false;
	let previousUnassign: boolean = true;
	let unassign: boolean = false;
	let selected: number | undefined | null;
	let optionFilter: string | undefined;

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

	$: if (optionFilter?.trim()) {
		options = unfilteredOptions.filter((option: any) => {
			return (
				option.name.toLocaleLowerCase().includes(optionFilter?.toLocaleLowerCase().trim()) ||
				option.description.toLocaleLowerCase().includes(optionFilter?.toLocaleLowerCase().trim())
			);
		});
	} else {
		options = unfilteredOptions;
	}
</script>

<form action="?/assignOption" enctype="multipart/form-data" autocomplete="off" method="POST">
	<h3>Assign Option to Commission</h3>
	<TextInput
		name="option-filter"
		placeholder="Filter Options"
		bind:value={optionFilter}
		required={false}
		inputId="option-filter-input"
	/>
	<div class="options-container">
		{#each options as option, index (option.id)}
			<div
				class="option"
				on:click={select}
				on:keydown={handleKeyDown}
				data-option={option.id}
				class:selected={selected == option.id}
				class:assigned={commission.options
					//@ts-ignore
					.map((opt) => {
						return opt.id;
					})
					.includes(option.id)}
			>
				<div class="horizontal-option-info" data-option={option.id}>
					<section class="option-info" data-option={option.id}>
						{option.name}
					</section>
					{#if option.example_image_url}
						<img
							class="option-image"
							src={option.example_image_url}
							alt={'Thumbnail for commission option ' + option.name}
							data-option={option.id}
						/>
					{/if}
				</div>
				{#if selected == option.id}
					<div
						class="option-description"
						class:descriptionSelected={selected == option.id}
						data-option={option.id}
					>
						<p data-option={option.id}>{option.description}</p>
					</div>
				{/if}
			</div>
		{/each}
	</div>

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

	.options-container {
		display: flex;
		flex-direction: column;
	}

	.option {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		outline: 1.8px solid var(--btn-clr-avail);
		border-radius: var(--radius-card);
		transition: background-color 200ms;
		overflow: hidden;
		background-color: var(--card-clr-scnd);
	}

	.horizontal-option-info {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	.selected {
		background-color: var(--btn-clr-sel);
		color: var(--btn-clr-sel-txt);
		font-weight: 900;
	}
	.descriptionSelected {
		border-top: 1.8px solid var(--btn-clr-avail);
	}

	.option-description {
		width: 100%;
	}

	.option-description > p {
		margin: 0.5rem;
	}

	.assigned {
		background-color: var(--tertiary-lt-clr);
		color: var(--tertiary-clr-txt);
	}

	.assigned.selected,
	.selected.assigned {
		background-color: #a9cdbc;
		color: var(--white-txt);
		font-weight: 900;
	}

	.option-image {
		width: 5rem;
		object-fit: cover;
		align-self: flex-end;
	}

	.option-info {
		margin: 0.5rem;
	}
</style>
