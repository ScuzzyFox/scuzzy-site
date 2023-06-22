<script lang="ts">
	import BooleanInput from '$lib/BooleanInput.svelte';
	import FileFormInput from '$lib/FileFormInput.svelte';
	import FormButton from '$lib/FormButton.svelte';
	import TextInput from '$lib/TextInput.svelte';
	export let commission: any;
	let buttonDisabled = true;
	let assign: boolean = true;
	let previousAssign: boolean = false;
	let previousUnassign: boolean = true;
	let unassign: boolean = false;
	let selected: number | undefined | null;
	let categoryFilter: string | undefined;
	export let unfilteredCategories: any;
	let categories: any = unfilteredCategories;

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
		if (selected == element.dataset.category) {
			selected = null;
		} else {
			selected = element.dataset.category;
		}
	}

	$: assign, unassign, flipAssign();

	$: if (selected) {
		if (
			assign &&
			commission.categories.filter((category: any) => {
				return category.id == selected;
			}).length > 0
		) {
			buttonDisabled = true;
		} else if (
			unassign &&
			commission.categories.filter((category: any) => {
				return category.id == selected;
			}).length == 0
		) {
			buttonDisabled = true;
		} else {
			buttonDisabled = false;
		}
	} else {
		buttonDisabled = true;
	}

	$: if (categoryFilter?.trim()) {
		categories = unfilteredCategories.filter((category: any) => {
			return category.name.toLocaleLowerCase().includes(categoryFilter?.toLocaleLowerCase().trim());
		});
	} else {
		categories = unfilteredCategories;
	}
</script>

<form action="?/assignCategory" enctype="multipart/form-data" autocomplete="off" method="POST">
	<h3>Assign Category to Commission</h3>
	<TextInput
		name="category-filter"
		placeholder="Filter Category"
		bind:value={categoryFilter}
		required={false}
		inputId="category-filter-input"
	/>
	<div class="options-container">
		{#each categories as category, index (category.id)}
			<div
				class="option"
				on:click={select}
				on:keydown={handleKeyDown}
				data-category={category.id}
				class:selected={selected == category.id}
				class:assigned={commission.categories
					//@ts-ignore
					.map((opt) => {
						return opt.id;
					})
					.includes(category.id)}
			>
				<section class="option-info" data-category={category.id}>
					{category.name}
				</section>

				<!--

                <section data-option={option.id}>
                    {commission.options.includes(option) ? 'Assigned' : 'Not assigned'}
                </section>
            -->
			</div>
		{/each}
	</div>

	<BooleanInput
		name="assign"
		inputId="assign-category-checkbox"
		required={false}
		bind:checked={assign}
		placeholder="Assign?"
	/>
	<BooleanInput
		name="unassign"
		inputId="unassign-category-checkbox"
		required={false}
		bind:checked={unassign}
		placeholder="Unassign?"
	/>
	<input type="hidden" bind:value={commission.id} name="commission" />
	<input type="hidden" bind:value={selected} name="category" />
	<FormButton bind:buttonDisabled label={assign ? 'Assign Category' : 'Unassign Category'} />
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
		flex-direction: row;
		align-items: center;
		justify-content: center;
		outline: 1.8px solid var(--btn-clr-avail);
		border-radius: var(--radius-card);
		transition: background-color 200ms;
		overflow: hidden;
	}

	.selected {
		background-color: var(--btn-clr-sel);
		color: var(--btn-clr-sel-txt);
		font-weight: 900;
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
