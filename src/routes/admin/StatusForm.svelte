<script lang="ts">
	import { adminStore } from '$lib/stores';
	import { page } from '$app/stores';
	import Card from '$lib/Card.svelte';
	import '$lib/styles/buttons.css';
</script>

<Card h2={'Update Site Status'}>
	<form action="/admin?/updateStatus" method="POST">
		<label for="commissions-select">Commissions</label>
		<select name="commissions_open" id="commissions-select">
			<option value={'False'}>Closed</option>
			<option value={'True'}>Open</option>
		</select>
		<label for="store-select">Store</label>
		<select name="store_open" id="store-select">
			<option value={'False'}>Closed</option>
			<option value={'True'}>Open</option>
		</select>
		<label for="requests-select">Requests</label>
		<select name="requests_open" id="requests-select">
			<option value={'False'}>Closed</option>
			<option value={'True'}>Open</option>
		</select>
		<label for="art-trades-select">Art Trades</label>
		<select name="art_trades_open" id="art-trades-select">
			<option value={'False'}>Closed</option>
			<option value={'True'}>Open</option>
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
</style>
