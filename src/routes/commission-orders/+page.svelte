<script lang="ts">
	import { onMount } from 'svelte';
	import type { CommissionOrder } from '$lib/CommissionTypes';

	export let data;
	let orders: CommissionOrder[];

	function assignData() {
		if (!data.orders) {
			setTimeout(assignData, 200);
		} else {
			orders = data.orders;
		}
	}

	onMount(assignData);
</script>

{#if orders}
	{#each orders as order}
		<h2>Order {order.id}</h2>
		<p>Commission: {order.commission}</p>
		<p>Subtotal: {order.subtotal}</p>
		<p>Customer Name: {order.customer_name}</p>
		<p>Where to contact: {order.where_to_contact}</p>
		<p>Contact info: {order.contact_info}</p>
		<p>Contact info: {order.contact_info}</p>
		<p>Email: {order.email}</p>
	{/each}
{/if}
