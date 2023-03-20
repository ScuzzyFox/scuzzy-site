<script lang="ts">
	import { fly, fade } from 'svelte/transition';

	export let handleCancelButton: any;
	export let handleAgreeButton: any;
	export let mobile: boolean;
</script>

<div class="adult-alert-background" transition:fade={{ duration: 250 }}>
	<div class="adult-alert-body" transition:fly={{ y: -600, duration: 250 }} class:mobile>
		<h2>Hang on!</h2>
		<p>You are about to turn on NSFW content.</p>
		<p>
			By agreeing to view NSFW/pornographic content, you certify that you are a consenting adult at
			least 18 years of age AND are agreeing to the use of cookies 🍪 on this site.
		</p>
		<p>If you are not an adult or are not willing to view this content, please close this alert.</p>
		<div class="btn-flex-container">
			<button class="adult-agree-btn disagree" on:click={handleCancelButton}>Cancel</button>
			<button class="adult-agree-btn agree" on:click={handleAgreeButton}>Agree</button>
		</div>
	</div>
</div>

<style>
	h2 {
		margin: 0;
	}
	.adult-alert-background {
		position: fixed;
		z-index: 91;
		background-color: rgba(0, 0, 0, 0.65);
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;

		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
	}

	.adult-alert-body {
		max-width: 40%;
		background-color: var(--card-clr);
		margin: 0 1.5rem;
		padding: 1rem;
		border-radius: var(--radius-card);
	}

	.adult-alert-body.mobile {
		max-width: revert;
		background-color: var(--card-clr);
		margin: 0 1.5rem;
		padding: 1rem;
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
