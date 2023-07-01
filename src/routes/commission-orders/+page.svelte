<script lang="ts">
	import { onMount } from 'svelte';
	import type { CommissionOrder, CommissionStatus } from '$lib/CommissionTypes';
	import { userSettingsStore, adminStore } from '$lib/stores';
	import Card from '$lib/Card.svelte';
	import TextInput from '$lib/TextInput.svelte';
	import { flip } from 'svelte/animate';
	import PageViewTelemetry from '$lib/PageViewTelemetry.svelte';
	import favicon from '$lib/images/logos/favicon.png';

	export let data;
	let orders: CommissionOrder[];
	let statuses: CommissionStatus[];
	let orderFilter: string;
	let pageTitle: string = 'ScuzzyFox Commissions Order List';
	let pageDescription: string =
		'Submitted a commission request for ScuzzyFox? Check up on its status here!';
	let pageImage = favicon;

	function assignData() {
		if (!data.orders || !data.statuses) {
			setTimeout(assignData, 200);
		} else {
			orders = data.orders;
			statuses = data.statuses;
			pageImage = favicon;
		}
	}

	onMount(assignData);

	function filterOrders(orderFilter: string) {
		orders = data.orders;
		if (orderFilter == '' || !orderFilter) return;
		orders = orders.filter((order) => {
			return (
				(order.id + '').includes(orderFilter) ||
				order.customer_name.toLocaleLowerCase().includes(orderFilter.toLocaleLowerCase())
			);
		});
	}

	$: filterOrders(orderFilter);
</script>

<PageViewTelemetry />
<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={pageImage} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:title" content={pageTitle} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:site" content="@scuzzyfox" />
	<meta name="twitter:creator" content="@scuzzyfox" />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content={pageImage} />
</svelte:head>
<div class="main-content">
	<a href="/commissions" class="link-btn">To Commissions</a>
	<div class="legend-container">
		<Card h2="Status Legend">
			<div class="legend-row">
				<span><div class="legend-color-block" style:background-color={'green'} /></span><span
					>=</span
				><span>completed</span>
			</div>
			{#if statuses}
				{#each statuses as status (status.id)}
					<div class="legend-row">
						<span><div class="legend-color-block" style:background-color={status.color} /></span>
						<span>=</span><span>{status.status}</span>
					</div>
				{/each}
			{/if}
		</Card>
	</div>
	<div class="card-container">
		<Card h1="Commission Requests">
			{#if orders}
				<TextInput
					bind:value={orderFilter}
					required={true}
					placeholder="Filter Requests"
					inputId="order-filter-input"
				/>
				{#each orders as order (order.id)}
					<a
						animate:flip={{ duration: 200 }}
						id={`order-${order.id}`}
						class="order-link"
						href={`commission-orders/${order.id}`}
						><div class="order-container" class:completed={order.completed}>
							<section class="order-id">ID: {order.id}</section>
							<div class="name-status-container">
								{order.customer_name}
							</div>
							<div class="status-bar">
								{#if order.statuses}
									{#each order.statuses as status}
										<div
											class="status-element"
											style={order.completed
												? 'background-color:green'
												: `background-color:${status.color}`}
										/>
									{/each}
								{/if}
							</div>
						</div></a
					>
				{/each}
			{/if}
		</Card>
	</div>
</div>

<style>
	.legend-color-block {
		height: 16px;
		width: 16px;
		display: inline-block;
		border-radius: 16px;
	}

	.legend-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		flex: 1 1 0px;
		gap: 0.5rem;
	}
	.order-link {
		text-decoration: none;
		color: var(--link-txt-clr);
	}

	.order-link:hover {
		text-decoration: underline;
		filter: brightness(120%) saturate(120%);
	}

	.order-link:active {
		text-decoration: underline;
		filter: brightness(60%) saturate(150%);
	}
	.card-container,
	.legend-container {
		margin: 15px;
	}

	.order-container {
		box-sizing: border-box;
		border-radius: var(--radius-card);
		display: flex;
		flex-direction: row;
		background-color: transparent;
		margin: 0.5rem;
		justify-content: flex-start;
		align-items: center;
		border: 2px solid var(--btn-clr-avail);
		overflow: hidden;
		position: relative;
	}

	.order-id {
		align-self: flex-start;
		border-right: 2px solid var(--btn-clr-avail);
		height: 100%;
		padding: 1rem;
	}

	.completed {
		background-color: green;
		color: rgb(7, 37, 7);
	}

	.name-status-container {
		padding: 1rem;
		text-align: center;
		width: max-content;
	}

	.status-bar {
		background-color: transparent;
		height: 5px;
		align-items: flex-end;
		position: absolute;
		bottom: 0;
		left: 0;
		right: -20px;
		display: flex;
	}
	.status-element {
		display: inline-block;
		height: 100%;
		flex: 1;
	}

	.link-btn {
		display: block;
		box-sizing: border-box;
		background-color: var(--accnt-clr);
		color: var(--white-txt);
		font-family: var(--main-font);
		font-weight: 900;
		font-size: 1.1rem;
		border: none;
		border-radius: var(--radius-btn);
		padding: 0.5rem 1rem;
		box-shadow: var(--btn-drp-shdw);
		margin-top: 1rem;
		transition: var(--transition-rate);
		text-decoration: none;
		text-align: center;
		margin-left: 1rem;
		margin-right: 1rem;
	}

	.link-btn:hover {
		filter: brightness(120%) saturate(120%);
		text-decoration: underline;
	}

	.link-btn:active {
		filter: brightness(60%) saturate(150%);
		text-decoration: underline;
	}

	/**Desktop mode:**/
	@media (min-width: 1018px) {
		.link-btn,
		.legend-container,
		.card-container {
			width: 70vw;
		}

		.main-content {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}
</style>
