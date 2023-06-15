<script lang="ts">
	import Popup from '$lib/Popup.svelte';
	import Card from '$lib/Card.svelte';
	import { userSettingsStore, adminStore } from '$lib/stores';

	export let commission: any;
	export let disclaimer: boolean;

	function handleCancelButton() {
		//redirect user to commissions page
		window.location.href = '/commissions';
	}

	async function handleAgreeButton() {
		$userSettingsStore.adultAgreed = true;

		//user will be told what content exists on this page. If they're missing one or both of the
		//filters, they'll be prompted to enable them to view the content.
		if (commission) {
			if (commission.adult) {
				$userSettingsStore.nsfwAllowed = true;
			}
			if (commission.abdl) {
				$userSettingsStore.abdlAllowed = true;
			}
		}
		let us = $userSettingsStore;

		let response = await fetch('/settings', {
			method: 'POST',
			body: JSON.stringify(us),
			headers: {
				'content-type': 'application/json'
			}
		});
		disclaimer = false;

		let success = await response.json();
		return success;
	}
</script>

<Popup darken={true}>
	{#if commission}
		<div class="adult-alert-body">
			<Card
				h2={`This page has ${
					commission.adult ? (commission.abdl ? 'adult and ABDL' : 'adult') : 'ABDL'
				} content!`}
			>
				<p>Do you want to enable this content?</p>
				<p>
					By agreeing to view pornographic or abdl materials on this site, you certify that you are
					a consenting adult at least 18 years of age AND are agreeing to the use of cookies 🍪.
				</p>
				<p>
					If you are not an adult or are not willing to view this content, please close this alert
					to leave the page.
				</p>
				<p>Once you agree, you can change these settings later at scuzzyfox.com/settings.</p>
				<div class="btn-flex-container">
					<button type="button" class="adult-agree-btn disagree" on:click={handleCancelButton}
						>Cancel</button
					>
					<button type="button" class="adult-agree-btn agree" on:click={handleAgreeButton}
						>Agree</button
					>
				</div>
			</Card>
		</div>
	{/if}
</Popup>

<style>
	.adult-alert-body {
		max-width: 40%;
		margin: 0 1.5rem;
	}

	.btn-flex-container {
		display: flex;
		justify-content: space-evenly;
	}

	.adult-agree-btn {
		box-shadow: var(--btn-drp-shdw);
		font-size: 1.2rem;
		font-family: var(--main-font);
		border: none;
		padding: 0.5rem 1rem;
		border-radius: var(--radius-btn);
	}

	.adult-agree-btn.agree {
		background-color: var(--tertiary-clr);
		color: var(--tertiary-clr-txt);
		font-weight: bolder;
	}

	.adult-agree-btn.disagree {
		background-color: var(--tertiary-lt-clr);
		color: var(--tertiary-clr-txt);
	}

	.adult-agree-btn:hover {
		filter: brightness(150%) saturate(120%);
	}

	.adult-agree-btn:active {
		filter: brightness(60%) saturate(150%);
	}

	@media (max-width: 1018px) {
		.adult-alert-body {
			max-width: 90%;
			margin: 0 1.5rem;
		}
	}
</style>
