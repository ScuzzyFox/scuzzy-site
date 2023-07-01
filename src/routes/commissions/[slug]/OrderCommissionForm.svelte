<script lang="ts">
	import BooleanInput from '$lib/BooleanInput.svelte';
	import Card from '$lib/Card.svelte';
	import EmailInput from '$lib/EmailInput.svelte';
	import NumberInput from '$lib/NumberInput.svelte';
	import Popup from '$lib/Popup.svelte';
	import SelectInput from '$lib/SelectInput.svelte';
	import TextAreaInput from '$lib/TextAreaInput.svelte';
	import TextInput from '$lib/TextInput.svelte';
	import { onMount } from 'svelte';
	import { userSettingsStore } from '$lib/stores';
	import type { Option, CharacterReference } from '$lib/CommissionTypes';
	import OptionsDisplayer from './OptionsDisplayer.svelte';
	import CustomerSketchCanvas from './CustomerSketchCanvas.svelte';
	import CharacterReferencesForms from './CharacterReferencesForms.svelte';

	export let commission: any;
	export let forceNsfw: boolean;
	export let forceAbdl: boolean;
	export let orderable: boolean = true;
	export let formAttempt: any;
	let filteredOptions: Option[];
	let customerName: string;
	let contactInfo: string;
	let contactInfoLabel: string;
	let email: string;
	let characterCount: number = 1;
	let commissionDescription: string;
	let buttonDisabled: boolean = true;
	let popup: boolean = false;
	let whereToContact: string;
	let adult: boolean = false;
	let abdl: boolean = false;
	let customerSketch: string;
	let characterReferences: CharacterReference[];
	let selectedOptionIds: number[];
	let extraCommissionDescription: string;
	let requiredSections: string[];
	let characterReferencesJson: string;

	function isOptionsSelectionValid(
		selectedOptionIds: number[],
		filteredOptions: Option[],
		requiredSections: string[]
	) {
		if (!selectedOptionIds) return;
		if (!filteredOptions) return;
		if (!requiredSections) return;
		for (let requiredSection of requiredSections) {
			const group = filteredOptions.filter((option) => {
				return option.exclusive_with == requiredSection;
			});
			let isGroupOptionSelected = false;

			for (let option of group) {
				if (selectedOptionIds.includes(option.id ? option.id : -1)) {
					isGroupOptionSelected = true;
					break;
				}
			}

			if (!isGroupOptionSelected) {
				return false; // At least one required group doesn't have a selected option
			}
		}

		return true; // All required groups have at least one selected option
	}

	$: if (
		customerName &&
		contactInfo &&
		email &&
		characterCount &&
		commissionDescription &&
		whereToContact &&
		characterReferences
	) {
		if (
			characterReferences.every((reference) => {
				return (
					reference.character_name &&
					(reference.text_description || reference.link || reference.image != undefined)
				);
			})
		) {
			//at least 1 option from each required section is selected
			if (isOptionsSelectionValid(selectedOptionIds, filteredOptions, requiredSections)) {
				buttonDisabled = false;
			} else {
				buttonDisabled = true;
			}
		} else {
			buttonDisabled = true;
		}
	} else {
		buttonDisabled = true;
	}

	$: if (whereToContact == 'TG') {
		contactInfoLabel = 'Telegram Username';
	} else if (whereToContact == 'DC') {
		contactInfoLabel = 'Discord Username';
	} else if (whereToContact == 'FA') {
		contactInfoLabel = 'FurAffinity Username';
	} else {
		contactInfoLabel = 'Username for contact';
	}

	$: characterReferencesJson = JSON.stringify(characterReferences);

	function handleSubmitOrder() {
		if (buttonDisabled) {
			return;
		}
		popup = true;
	}

	function notReady() {
		popup = false;
	}

	onMount(() => {
		adult = commission.adult;
		abdl = commission.abdl;
		setTimeout(filterOptions, 500);
		if (formAttempt) {
			customerName = formAttempt.customerName;
			whereToContact = formAttempt.whereToContact;
			contactInfo = formAttempt.contactInfo;
			email = formAttempt.email;
			characterCount = formAttempt.characterCount;
			commissionDescription = formAttempt.commissionDescription;
			adult = formAttempt.adult;
			abdl = formAttempt.abdl;
			extraCommissionDescription = formAttempt.extraCommissionDescription;
		}
	});

	function filterOptions() {
		filteredOptions = commission.options;
		if (!forceNsfw) {
			if (!$userSettingsStore.nsfwAllowed) {
				filteredOptions = filteredOptions.filter((option: any) => {
					return !option.adult;
				});
			}
		}
		if (!forceAbdl) {
			if (!$userSettingsStore.abdlAllowed) {
				filteredOptions = filteredOptions.filter((option: any) => {
					return !option.abdl;
				});
			}
		}
	}

	$: $userSettingsStore.nsfwAllowed, $userSettingsStore.abdlAllowed, filterOptions();
</script>

{#if orderable}
	<form action="?/orderCommission" method="POST" enctype="multipart/form-data" autocomplete="off">
		<input type="hidden" bind:value={commission.id} name="commission" />
		<h3 style="margin-bottom:0;">Basic Info</h3>
		<TextInput
			name="customer_name"
			required={true}
			inputId="customer-name-input"
			bind:value={customerName}
			placeholder="Who Are You?"
		/>

		<SelectInput
			required={true}
			name="where_to_contact"
			inputId="where-to-contact-select-input"
			placeholder="Where to Contact?"
			options={[
				{ label: 'Telegram (preferred)', value: 'TG' },
				{ label: 'Discord', value: 'DC' },
				{ label: 'FurAffinity (discouraged)', value: 'FA' }
			]}
			bind:value={whereToContact}
		/>

		<TextInput
			name="contact_info"
			required={true}
			inputId="customer-contact-info-input"
			bind:value={contactInfo}
			placeholder={contactInfoLabel}
		/>

		<EmailInput
			name="email"
			required={true}
			inputId="customer-email-input"
			bind:value={email}
			placeholder="E-mail"
			autocomplete="on"
		/>

		<NumberInput
			name="number_of_characters"
			required={true}
			bind:value={characterCount}
			placeholder="How many characters?"
			inputId="customer-character-count-input"
		/>

		{#if filteredOptions && filteredOptions.length > 0}
			<h3 style="margin-bottom:0;">Choose Your Options</h3>
			<div class="options-container">
				<OptionsDisplayer
					{commission}
					bind:characterCount
					bind:options={filteredOptions}
					bind:selectedOptionIds
					bind:requiredSections
				/>
			</div>
		{/if}
		<input type="hidden" bind:value={selectedOptionIds} name="selected_options" />

		<label for="commission-order-description">Now, describe your commission:</label>
		<TextAreaInput
			name="commission_description"
			required={true}
			bind:value={commissionDescription}
			placeholder="Describe commission"
			inputId="commission-order-description"
		/>
		{#if $userSettingsStore.nsfwAllowed}
			<BooleanInput
				name="adult"
				required={false}
				bind:checked={adult}
				placeholder="Commission is NSFW?"
				inputId="commission-adult-rating-input"
			/>
		{/if}
		{#if $userSettingsStore.abdlAllowed}
			<BooleanInput
				name="abdl"
				required={false}
				bind:checked={abdl}
				placeholder="Commission has ABDL/babyfur content?"
				inputId="commission-abdl-rating-input"
			/>
		{/if}
		<br />

		<label for="commission-order-extra-character-details"
			>Are there any details that are particularly important for you in this commission? (optional)</label
		>
		<TextAreaInput
			name="extra_character_details"
			required={false}
			bind:value={extraCommissionDescription}
			placeholder="Critical Details"
			inputId="commission-order-extra-character-details"
		/>

		<CharacterReferencesForms bind:characterReferences />
		<input type="hidden" name="character_references" bind:value={characterReferencesJson} />

		<CustomerSketchCanvas bind:imageDataUrl={customerSketch} />
		<input type="hidden" name="customer_sketch" bind:value={customerSketch} />

		<button
			disabled={buttonDisabled}
			class="yl-btn submit"
			on:click={handleSubmitOrder}
			type="button">Submit Commission Request</button
		>
		{#if popup}
			<Popup darken={true}>
				<div class="popup-container">
					<Card h2="Are you sure?">
						<p>
							Make sure all the information is accurate. You cannot edit it after it's submitted. If
							you realize you've made a mistake, then just contact scuzzy with the changes or submit
							a new request.
						</p>
						<div class="button-row">
							<button class="yl-lt-btn" type="button" on:click={notReady}>Not Ready</button>
							<button class="yl-btn" type="submit">Submit Commission!</button>
						</div>
					</Card>
				</div>
			</Popup>
		{/if}
	</form>
{:else}
	<form autocomplete="off">
		<NumberInput
			name="number_of_characters"
			required={true}
			bind:value={characterCount}
			placeholder="How many characters?"
			inputId="customer-character-count-input"
		/>
		{#if filteredOptions && filteredOptions.length > 0}
			<h3 style="margin-bottom:0;">Available Options</h3>
			<div class="options-container">
				<OptionsDisplayer
					{commission}
					bind:characterCount
					bind:options={filteredOptions}
					bind:selectedOptionIds
				/>
			</div>
		{/if}
		<p style="display: block; text-align: center;">Commission is not currently orderable.</p>
	</form>
{/if}

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
	}
	.options-container {
		background-color: none;
	}

	.yl-btn,
	.yl-lt-btn {
		display: inline-block;
		width: 200px;
	}

	.button-row {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-evenly;
		align-items: center;
	}

	.popup-container {
		margin: 1rem;
	}

	.yl-btn.submit {
		width: 100%;
	}
</style>
