<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import Popup from './Popup.svelte';
	import Card from './Card.svelte';

	export let handleCancelButton: any;
	export let handleAgreeButton: any;
	export let mobile: boolean;
</script>

<Popup darken={true}>
	<div class="adult-alert-body" class:mobile>

		<Card h2="Hang on!">
			<p>You are about to turn on NSFW content.</p>
			<p>
				By agreeing to view NSFW/pornographic content, you certify that you are a consenting adult at
				least 18 years of age AND are agreeing to the use of cookies 🍪 on this site.
			</p>
			<p>If you are not an adult or are not willing to view this content, please close this alert.</p>
			<div class="btn-flex-container">
				<button type="button" class="adult-agree-btn disagree" on:click={handleCancelButton}>Cancel</button>
				<button type="button" class="adult-agree-btn agree" on:click={handleAgreeButton}>Agree</button>
			</div>
		</Card>
	</div>
</Popup>



<style>
	
	

	.adult-alert-body {
		max-width: 40%;
		margin: 0 1.5rem;
	}

	.adult-alert-body.mobile {
		max-width: revert;
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
</style>
