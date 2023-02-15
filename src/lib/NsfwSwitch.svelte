<script lang="ts">
	import { onMount } from 'svelte';

	export let data: any;
	let nsfwAllowed: boolean;
	let agreedToAdult: boolean;

	onMount(() => {
		if (data.userSettings) {
			nsfwAllowed = data.userSettings.nsfwAllowed;
			agreedToAdult = true;
		} else {
			nsfwAllowed = false;
			agreedToAdult = false;
		}
	});
</script>

<label for="nsfw-switch" class="switch-housing" class:nsfwAllowed>
	<div class="knob" id="knob">NSFW</div>

	<input type="checkbox" id="nsfw-switch" bind:checked={nsfwAllowed} />
</label>

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

	.nsfwAllowed {
		justify-content: end;
	}

	.knob {
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
</style>
