<script lang="ts">
	import { onMount } from 'svelte';
	import AdultAlert from '$lib/AdultAlert.svelte';
	import type { UserSettings } from '$lib/UserSettings';

	export let data: any;
	export let mobile: boolean = false;
	let nsfwAllowed: boolean;
	let agreedToAdult: boolean;
	let displayAdultAlert: boolean = false;

	onMount(async () => {
		let tempUserSettings: any;
		try {
			tempUserSettings = data.userSettings;
		} catch (error) {
			if (error instanceof TypeError) {
				tempUserSettings = null;
			}
		}

		if (tempUserSettings) {
			nsfwAllowed = data.userSettings.nsfwAllowed;
			agreedToAdult = true;
		} else {
			nsfwAllowed = false;
			agreedToAdult = false;
		}
	});

	$: {
		if (!agreedToAdult && nsfwAllowed) {
			displayAdultAlert = true;
			nsfwAllowed = false;
		} else if (agreedToAdult) {
			let abdlAllowed;

			/* if (!data.userSettings) {
				abdlAllowed = false;
			} else {
				abdlAllowed = data.userSettings.abdlAllowed;
			} */

			try {
				abdlAllowed = data.userSettings.abdlAllowed;
			} catch (error) {
				if (error instanceof TypeError) {
					abdlAllowed = false;
				}
			}

			updateUserSettings({ nsfwAllowed, abdlAllowed });
		}
	}

	function handleCancelButton(event: any) {
		displayAdultAlert = false;
	}

	function handleAgreeButton(event: any) {
		agreedToAdult = true;
		displayAdultAlert = false;
		nsfwAllowed = true;
	}

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

{#if displayAdultAlert && !agreedToAdult}
	<AdultAlert {handleCancelButton} {handleAgreeButton} {mobile} />
{/if}

{#if mobile}
	<label
		for="nsfw-switch-mobile"
		class="switch-housing-mobile"
		class:nsfwAllowed
		id="nsfw-switch-housing-mobile"
	>
		<div class="knob-mobile" id="knob-mobile">NSFW</div>

		<input type="checkbox" id="nsfw-switch-mobile" bind:checked={nsfwAllowed} />
	</label>
{:else}
	<label for="nsfw-switch" class="switch-housing" class:nsfwAllowed id="nsfw-switch-housing">
		<div class="knob" id="knob">NSFW</div>

		<input type="checkbox" id="nsfw-switch" bind:checked={nsfwAllowed} />
	</label>
{/if}

<style>
	input {
		display: none;
	}

	.switch-housing {
		border-radius: 1em;
		height: min-content;
		width: 8em;
		box-shadow: 5px 5px 5px rgba(16, 5, 20, 0.25) inset;
		display: flex;
		flex-direction: row;
		justify-content: start;
		background-color: var(--scnd-clr);
		justify-self: end;
		font-family: inherit;
	}

	.switch-housing-mobile {
		border-radius: 1em;
		width: min-content;
		box-shadow: 5px 5px 5px rgba(16, 5, 20, 0.25) inset;
		display: flex;
		flex-direction: column-reverse;
		justify-content: end;
		background-color: var(--scnd-clr);
		font-family: inherit;
		position: absolute;
		right: 5%;
		bottom: 20%;
		top: 20%;
	}

	#nsfw-switch-housing.nsfwAllowed {
		justify-content: end;
	}

	#nsfw-switch-housing-mobile.nsfwAllowed {
		justify-content: start;
	}

	.knob {
		background-color: var(--main-clr);
		padding: 0.2em 1em;
		text-align: center;
		color: #333;
		border-radius: 0.8em;
		font-size: 1rem;
	}

	.knob-mobile {
		background-color: var(--main-clr);
		padding: 0.2em 1em;
		text-align: center;
		color: #333;
		border-radius: 0.8em;
		font-size: 1rem;
	}

	.nsfwAllowed > .knob {
		background-color: var(--accnt-clr);
		color: var(--white-txt);
	}

	.nsfwAllowed > .knob-mobile {
		background-color: var(--accnt-clr);
		color: var(--white-txt);
	}
</style>
