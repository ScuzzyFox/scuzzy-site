<script lang="ts">
	import type { Option } from '$lib/CommissionTypes';
	import { userSettingsStore } from '$lib/stores';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	export let options: Option[];
	let exclusiveSections: string[];
	export let requiredSections: string[] = [];
	export let selectedOptionIds: number[] = [];
	let characterModifier: number = 0.45;
	export let characterCount: number;
	export let commission: any;

	function addToSelected(event: any) {
		let element = event.target;
		//forcing the id to be a string (not sure if necessary)
		let idToAdd = parseInt(element.dataset.id);

		let opt = options.find((option) => {
			return idToAdd == option.id;
		});

		if (!opt) return false;

		let exclusive_with = opt?.exclusive_with;
		let required = opt?.required;

		//if id already in array, remove it.
		if (selectedOptionIds.includes(idToAdd)) {
			selectedOptionIds = selectedOptionIds.filter((id) => {
				return !(id == idToAdd);
			});
		} else {
			// Remove options with the same exclusive_with property
			if (exclusive_with != '' && exclusive_with != undefined && exclusive_with != null) {
				selectedOptionIds = selectedOptionIds.filter((id) => {
					let option = options.find((o) => o.id === id);
					return option?.exclusive_with !== exclusive_with;
				});
			}
			//add id to array
			//selectedOptionIds.push(idToAdd);
			selectedOptionIds = [...selectedOptionIds, idToAdd];
		}
	}

	function generateSections() {
		if (!options) {
			setTimeout(generateSections, 500);
			return;
		}
		exclusiveSections = [];
		//fill the sections variable with each unique entry option.exclusive_with
		const exclusiveSet = new Set<string>();
		options.forEach((option) => {
			if (option.exclusive_with !== null && option.exclusive_with !== undefined) {
				exclusiveSet.add(option.exclusive_with);
			}
		});

		exclusiveSections = Array.from(exclusiveSet);

		//exclusiveSections that are required!!
		//detect if any options within exclusive sections have their "required" property set
		//if it is, add that exclusive_with value to the set required set.
		requiredSections = [];

		exclusiveSections.forEach((section) => {
			let o = options.filter((option) => {
				return section == option.exclusive_with;
			});

			//section should be required if any option in its section has a truthy 'required' property
			//e.g if every option.required is falsy, then it is not required
			let shouldSetSectionToRequired = !o.every((option) => {
				if (option.required) {
					return false;
				} else {
					return true;
				}
			});

			if (shouldSetSectionToRequired) {
				requiredSections.push(section);
			}
		});
	}

	$: $userSettingsStore.nsfwAllowed, $userSettingsStore.abdlAllowed, options, generateSections();

	onMount(() => {
		setTimeout(generateSections, 500);
	});
</script>

{#each exclusiveSections as exclusiveSection, index}
	<h3 style={index == 0 ? 'margin-top:0;' : ''}>
		{exclusiveSection ? exclusiveSection : 'Misc Options'}
		{requiredSections.includes(exclusiveSection) ? ' (required)' : ''}
	</h3>
	{#each options.filter((option) => {
		return option.exclusive_with == exclusiveSection;
	}) as option (option.id)}
		<div
			class="option-container"
			class:selected={selectedOptionIds.includes(option.id ? option.id : -1)}
			data-id={option.id}
			on:click={addToSelected}
			on:keydown={() => {
				return;
			}}
		>
			<section class="option-horizontal-container" data-id={option.id}>
				<section class="option-vertical-container" data-id={option.id}>
					<p data-id={option.id}>{option.name}</p>
					<p data-id={option.id}>
						{option.cost >= 0 ? '+' : '-'}${parseInt(option.cost + '').toFixed(0)}
					</p>
				</section>
				<img
					data-id={option.id}
					class="option-image"
					src={option.example_image_url}
					alt={`${option.name} example image`}
				/>
			</section>
			{#if selectedOptionIds.includes(option.id ? option.id : -1)}
				<section
					transition:fly={{ y: -150, duration: 300 }}
					class="description-dropdown"
					data-id={option.id}
				>
					{option.description}
				</section>
			{/if}
		</div>
	{/each}
{/each}

<p>
	Subtotal for selected items: <span class="subtotal">
		${options
			.filter((option) => {
				return selectedOptionIds.includes(option.id ? option.id : -1);
			})
			.map((option) => {
				//@ts-ignore
				return parseInt(option.cost);
			})
			.reduce((partialSum, a) => {
				return partialSum + a;
			}, 0) +
			commission.base_price +
			(characterCount - 1) *
				characterModifier *
				(options
					.filter((option) => {
						return selectedOptionIds.includes(option.id ? option.id : -1);
					})
					.map((option) => {
						//@ts-ignore
						return parseInt(option.cost);
					})
					.reduce((partialSum, a) => {
						return partialSum + a;
					}, 0) +
					commission.base_price)}
	</span>*
</p>
<p class="disclaimer">
	*Please keep in mind that this subtotal is only an estimate. The final price you are charged may
	vary depending on the complexity of your commission.
</p>

<style>
	.disclaimer {
		font-size: 14px;
		color: var(--btn-clr-deact-txt);
	}
	.subtotal {
		font-weight: 900;
		font-size: 18px;
		color: green;
	}

	.option-container {
		display: block;
		overflow: hidden;
		box-sizing: border-box;
		border: 2px solid var(--card-clr-scnd);
		border-radius: var(--radius-card);
		transition: 250ms;
		z-index: 2;
	}

	.option-horizontal-container {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.option-vertical-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
		padding: 0.5rem;
	}

	.option-vertical-container > p {
		margin: 0;
		text-align: center;
	}

	.option-image {
		width: 5rem;
		aspect-ratio: 1;
		object-fit: cover;
		align-self: flex-end;
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
		border-radius: var(--radius-img);
	}

	.selected {
		background-color: var(--btn-clr-sel);
		color: var(--btn-clr-sel-txt);
	}

	.description-dropdown {
		border-top: 2px solid var(--card-clr-scnd);
		margin: 1rem;
		z-index: 1;
	}
</style>
