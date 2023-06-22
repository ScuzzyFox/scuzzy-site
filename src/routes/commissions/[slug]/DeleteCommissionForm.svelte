<script lang="ts">
	import Popup from '$lib/Popup.svelte';
	import Card from '$lib/Card.svelte';
	import '$lib/styles/buttons.css';

	export let commission: any;
	let displayPopup = false;

	function popup() {
		displayPopup = true;
	}

	function unpopup() {
		displayPopup = false;
	}
</script>

{#if displayPopup}
	<Popup darken={true}>
		<div class="popup-container">
			<Card h2="Warning!">
				<form method="POST" autocomplete="off" action="?/deleteCommission">
					<p>Are you sure you want to delete this commission?</p>
					<input type="hidden" name="commission_id" bind:value={commission.id} />
					<div class="button-row">
						<button class="yl-lt-btn" type="button" on:click={unpopup}>Cancel</button>
						<button type="submit" class="submit-btn yl-btn">Delete Commission</button>
					</div>
				</form>
			</Card>
		</div>
	</Popup>
{/if}
<div class="pseudo-form">
	<h3>Delete Commission</h3>
	<button class="yl-btn" type="button" on:click={popup}>Delete Commission</button>
</div>

<style>
	.pseudo-form {
		box-sizing: border-box;
		border: 2px solid var(--card-clr-scnd);
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;
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

	.yl-lt-btn,
	.submit-btn {
		width: 100%;
	}
</style>
