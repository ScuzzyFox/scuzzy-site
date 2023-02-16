<script lang="ts">
	import { onMount } from 'svelte';

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
		}
	}
</script>

{#if displayAdultAlert}
	<p
		oncontextmenu="return false;"
		style="text-align: center; position: fixed; bottom: -10em; top: -10em; right: 0; left: 0; background-color: black; z-index: 91; display: flex; align-items: center; justify-content: center; color:white; font-weight: bold; text-decoration:dashed;"
	>
		ADULT ALERT
	</p>
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
