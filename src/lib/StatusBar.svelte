<script lang="ts">
	import { statusStore } from '$lib/stores';
	import LoadingIndicator from '$lib/LoadingIndicator.svelte';
	import { navigating } from '$app/stores';
</script>

<div class="status-bar">
	<section>
		Commissions: <span class={$statusStore.commissions_open ? 'open' : 'closed'}
			>{#if $statusStore.commissions_open}<a href="/commissions"
					>{$statusStore.commissions_open ? 'Open' : 'Closed'}</a
				>{:else}{$statusStore.commissions_open ? 'Open' : 'Closed'}{/if}</span
		>
	</section>
	<section>
		Store: <span class={$statusStore.store_open ? 'open' : 'closed'}>
			{#if $statusStore.store_open}<a href="/store">
					{$statusStore.store_open ? 'Open' : 'Closed'}
				</a>
			{:else}
				{$statusStore.store_open ? 'Open' : 'Closed'}{/if}</span
		>
	</section>
	<section>
		Art Trades: <span class={$statusStore.art_trades_open ? 'open' : 'closed'}>
			{#if $statusStore.art_trades_open}
				<a href="/contact?contactOnly=true">
					{$statusStore.art_trades_open ? 'Open' : 'Closed'}
				</a>{:else}
				{$statusStore.art_trades_open ? 'Open' : 'Closed'}{/if}</span
		>
	</section>
	<section>
		Reqeusts: <span class={$statusStore.requests_open ? 'open' : 'closed'}>
			{#if $statusStore.requests_open}
				<a href="/contact?contactOnly=true">
					{$statusStore.requests_open ? 'Open' : 'Closed'}
				</a>
			{:else}
				{$statusStore.requests_open ? 'Open' : 'Closed'}{/if}</span
		>
	</section>
</div>
{#if $navigating}
	<LoadingIndicator />
{/if}

<style>
	a {
		color: inherit;
		text-decoration: inherit;
	}
	.status-bar {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
		background-color: var(--card-clr);
		padding: 0.2rem;
		position: relative;
		margin: 0;
	}

	.closed {
		color: var(--btn-clr-deact-txt);
	}

	.open {
		color: rgb(7, 196, 7);
	}

	.open:hover {
		filter: brightness(120%) saturate(120%);
		text-decoration: underline;
	}

	.open:active {
		text-decoration: underline;
		color: var(--link-txt-clr-actv);
	}
</style>
