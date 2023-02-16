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
			By agreeing to view NSFW/poronographic content, you certify that you are a consenting adult at
			least 18 years of age AND are agreeing to the use of cookies 🍪 on this site.
		</p>
		<p>If you are not an adult or are not willing to view this content, please close this alert.</p>
		<div class="btn-flex-container">
			<button class="adult-agree-btn" on:click={handleCancelButton}>Cancel</button>
			<button class="adult-agree-btn" on:click={handleAgreeButton}>Agree</button>
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
		background-color: var(--scnd-clr);
		margin: 0 1.5em;
		padding: 1em;
	}

	.adult-alert-body.mobile {
		max-width: revert;
		background-color: var(--scnd-clr);
		margin: 0 1.5em;
		padding: 1em;
	}

	.btn-flex-container {
		display: flex;
		justify-content: space-evenly;
	}

	.adult-agree-btn {
		box-shadow: var(--btn-drp-shdw);
		background-color: var(--accnt-clr);
		color: var(--white-txt);
		font-family: var(--sans-family);
		border: none;
		padding: 0.5em 1em;
		border-radius: 1.2em;
	}

	.adult-agree-btn:hover {
		background-color: var(--accnt-clr-2);
	}

	.adult-agree-btn:active {
		background-color: var(--accnt-clr-2);
	}
</style>
