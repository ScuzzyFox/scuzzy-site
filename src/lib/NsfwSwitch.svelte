<script lang="ts">
	import { onMount } from 'svelte';
	import AdultAlert from '$lib/AdultAlert.svelte';
	import type { UserSettings } from '$lib/UserSettings';
	import { userSettingsStore } from '$lib/stores';
	import { fade } from 'svelte/transition';

	export let mobile: boolean = false;
	let displayAdultAlert: boolean = false;

	//just to tie the class boolean to the store boolean without having to write $userSet...fwAllowed
	//inline with the element and in the css.
	let nsfwAllowedClass: boolean;

	//when the switch is first rendered, tie the class value to the store value
	onMount(() => {
		nsfwAllowedClass = $userSettingsStore.nsfwAllowed;
	});

	//every time the store is updated, sync the class and store value
	$: nsfwAllowedClass = $userSettingsStore.nsfwAllowed;

	//if the store value is trying to change, check if the user has agreed to the terms before updating the cookie.
	$: {
		//has user agreed to terms?
		if ($userSettingsStore.adultAgreed) {
			//if so, then update the user settings cookie.
			updateUserSettings($userSettingsStore);
			//if they haven't agreed and the switch is trying to activate
		} else if (!$userSettingsStore.adultAgreed && $userSettingsStore.nsfwAllowed) {
			//then display the agreement alert and set the switch to off.
			displayAdultAlert = true;
			$userSettingsStore.nsfwAllowed = false;
		}
	}

	//if the user doesn't agree to the alert, then just close the alert without doing anything.
	function handleCancelButton(event: any) {
		displayAdultAlert = false;
	}

	//if the user clicks agree, then turn on the nsfw switch, change the store to say they agreed, and save the uer settings cookie.
	//and also close the alert.
	function handleAgreeButton(event: any) {
		$userSettingsStore.adultAgreed = true;
		$userSettingsStore.nsfwAllowed = true;
		displayAdultAlert = false;
		updateUserSettings($userSettingsStore);
	}

	//sends a POST request to the /settings endpoint to store the cookie so the server can sign it.
	async function updateUserSettings(us: UserSettings) {
		let response = await fetch('/settings', {
			method: 'POST',
			body: JSON.stringify(us),
			headers: {
				'content-type': 'application/json'
			}
		});

		let success = await response.json();
		return success;
	}
</script>

<!--display the alert if the app requests it AND if they user hasn't agreed-->
{#if displayAdultAlert && !$userSettingsStore.adultAgreed}
	<AdultAlert {handleCancelButton} {handleAgreeButton} {mobile} />
{/if}

<!--The actual elements of the switch-->
<!--The whole thing is just a checkbox label with the checked value tied to the store value and the checkbox set to invisible-->
<!--the flex direction and knob color changes depending on if it's on or off-->
{#if mobile}
	<label
		for="nsfw-switch-mobile"
		class="switch-housing-mobile"
		class:nsfwAllowedClass
		id="nsfw-switch-housing-mobile"
	>
		<div class="knob-mobile" id="knob-mobile">NSFW</div>

		<input type="checkbox" id="nsfw-switch-mobile" bind:checked={$userSettingsStore.nsfwAllowed} />
	</label>
{:else}
	<label for="nsfw-switch" class="switch-housing" class:nsfwAllowedClass id="nsfw-switch-housing">
		<div class="knob" id="knob">NSFW</div>

		<input type="checkbox" id="nsfw-switch" bind:checked={$userSettingsStore.nsfwAllowed} />
	</label>
{/if}

<style>
	input {
		display: none;
	}

	.knob,
	.knob-mobile {
		transition-property: color, background-color, outline;
		transition-duration: 250ms;
	}

	.switch-housing {
		border-radius: 1rem;
		height: min-content;
		width: 8rem;
		box-shadow: 5px 5px 5px var(--drp-shdw-clr) inset;
		display: flex;
		flex-direction: row;
		justify-content: start;
		background-color: var(--main-lt-clr);
		justify-self: end;
		font-family: inherit;
		cursor: pointer;
	}

	.switch-housing-mobile {
		border-radius: 1rem;
		width: min-content;
		box-shadow: 5px 5px 5px var(--drp-shdw-clr) inset;
		display: flex;
		flex-direction: column-reverse;
		justify-content: end;
		background-color: var(--main-lt-clr);
		font-family: inherit;
		position: absolute;
		right: 5%;
		bottom: 20%;
		top: 20%;
		cursor: pointer;
	}

	.switch-housing-mobile:hover,
	.switch-housing:hover {
		box-shadow: 6px 6px 10px var(--drp-shdw-clr-drk) inset;
	}

	#nsfw-switch-housing.nsfwAllowedClass {
		justify-content: end;
	}

	#nsfw-switch-housing-mobile.nsfwAllowedClass {
		justify-content: start;
	}

	.knob {
		background-color: var(--btn-clr-deact);
		padding: 0.2rem 1rem;
		text-align: center;
		color: var(--btn-clr-deact-txt);
		border-radius: 0.8rem;
		font-size: 1rem;
		z-index: 2;
		font-weight: normal;
	}

	.knob-mobile {
		background-color: var(--btn-clr-deact);
		padding: 0.2rem 1rem;
		text-align: center;
		color: var(--btn-clr-deact-txt);
		border-radius: 0.8rem;
		font-size: 1rem;
		z-index: 2;
		font-weight: normal;
	}

	.knob:hover,
	.knob-mobile:hover,
	.nsfwAllowedClass > .knob:hover,
	.nsfwAllowedClass > .knob-mobile:hover {
		/* background-color: var(--accnt-clr-2); */
		filter: brightness(120%) saturate(120%);
	}

	.nsfwAllowedClass > .knob,
	.nsfwAllowedClass > .knob-mobile {
		background-color: var(--tertiary-clr);
		color: var(--tertiary-clr-txt);
		font-weight: 900;
	}

	.switch-housing:active,
	.switch-housing-mobile:active {
		outline: 2px solid var(--accnt-clr);
	}

	.knob:active,
	.knob-mobile:active,
	.nsfwAllowedClass > .knob:active,
	.nsfwAllowedClass > .knob-mobile:active {
		outline: 2px solid var(--white-txt);
	}
</style>
