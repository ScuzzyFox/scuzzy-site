<script lang="ts">
	import { adminStore } from '$lib/stores';
	import { statusStore } from '$lib/stores';
	import { page } from '$app/stores';
	import Card from '$lib/Card.svelte';
	import '$lib/styles/buttons.css';
</script>

<Card h2={'Update Site Status'}>
	<form action="/admin?/updateStatus" method="POST">
		<label for="commissions-select" class="commissions-select"
			><div class="comms-container">
				Commissions<label for="commissions-notify"
					><input type="checkbox" name="notify_commissions" id="commissions-notify" value={true} /> Notify
					users?</label
				>
			</div>

			<select name="commissions_open" id="commissions-select">
				<option selected={$statusStore.commissions_open ? null : true} value={'False'}
					>Closed</option
				>
				<option selected={$statusStore.commissions_open ? true : null} value={'True'}>Open</option>
			</select>
		</label>

		<label for="store-select">Store</label>
		<select name="store_open" id="store-select">
			<option selected={$statusStore.store_open ? null : true} value={'False'}>Closed</option>
			<option selected={$statusStore.store_open ? true : null} value={'True'}>Open</option>
		</select>
		<label for="requests-select">Requests</label>
		<select name="requests_open" id="requests-select">
			<option selected={$statusStore.requests_open ? null : true} value={'False'}>Closed</option>
			<option selected={$statusStore.requests_open ? true : null} value={'True'}>Open</option>
		</select>
		<label for="art-trades-select">Art Trades</label>
		<select name="art_trades_open" id="art-trades-select">
			<option selected={$statusStore.art_trades_open ? null : true} value={'False'}>Closed</option>
			<option selected={$statusStore.art_trades_open ? true : null} value={'True'}>Open</option>
		</select>

		<input type="hidden" name="token" value={$adminStore.token} />
		<input type="hidden" name="redirectTo" value={$page.url.pathname} />
		<input type="hidden" name="origin" value={$page.url.hostname} />

		<button type="submit" class="yl-btn">Update Status</button>
	</form>
</Card>

<style>
	form {
		display: flex;
		flex-direction: column;
	}
	.commissions-select {
		display: flex;
		flex-direction: column;
	}
	.comms-container {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}
</style>
