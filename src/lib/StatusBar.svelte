<script lang="ts">
	import { statusStore } from '$lib/stores';
	import LoadingIndicator from '$lib/LoadingIndicator.svelte';
	import { navigating } from '$app/stores';
</script>

<div class="status-bar">
	<section>
		Commissions: <span class={$statusStore.commissions_open ? 'open' : 'closed'}
			>{$statusStore.commissions_open ? 'Open' : 'Closed'}</span
		>
	</section>
	<section>
		Store: <span class={$statusStore.store_open ? 'open' : 'closed'}
			>{$statusStore.store_open ? 'Open' : 'Closed'}</span
		>
	</section>
	<section>
		Art Trades: <span class={$statusStore.art_trades_open ? 'open' : 'closed'}
			>{$statusStore.art_trades_open ? 'Open' : 'Closed'}</span
		>
	</section>
	<section>
		Reqeusts: <span class={$statusStore.requests_open ? 'open' : 'closed'}
			>{$statusStore.requests_open ? 'Open' : 'Closed'}</span
		>
	</section>
</div>
{#if $navigating}
	<LoadingIndicator />
{/if}

<style>
	.status-bar {
		width: 100%;
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
		background-color: var(--card-clr);
		padding: 0.2rem;
        position: relative;
	}

	.closed {
		color: var(--btn-clr-deact-txt);
	}

	.open {
		color: rgb(7, 196, 7);
	}
</style>
