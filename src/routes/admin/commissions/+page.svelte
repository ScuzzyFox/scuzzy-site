<script lang="ts">
	import Card from '$lib/Card.svelte';
	import Notification from '$lib/Notification.svelte';
	import { onMount } from 'svelte';
	import ListOptions from './ListOptions.svelte';
	import NewCommissionCategoryForm from './NewCommissionCategoryForm.svelte';
	//import PageViewTelemetry from '$lib/PageViewTelemetry.svelte';
	import NewCommissionForm from './NewCommissionForm.svelte';
	import NewCommissionOptionForm from './NewCommissionOptionForm.svelte';
	import NewOrderStatusForm from './NewOrderStatusForm.svelte';
	import type { CommissionCategory, CommissionStatus, Option } from '$lib/CommissionTypes';
	import ListStatuses from './ListStatuses.svelte';
	import ListCategories from './ListCategories.svelte';

	export let form;
	export let data;
	let options: Option[];
	let statuses: CommissionStatus[];
	let categories: CommissionCategory[];
	//todo: pageview telemetry

	function assignData() {
		if (!data || !data.options || !data.statuses || !data.categories) {
			setTimeout(assignData, 200);
		} else {
			options = data.options;
			statuses = data.statuses;
			categories = data.categories;
		}
	}

	onMount(assignData);
</script>

<Notification bind:form />
<main>
	<h1>Commissions Admin</h1>

	<div class="card-container">
		<Card h2={'New Commission'}>
			<NewCommissionForm />
		</Card>
	</div>
	<div class="card-container">
		<Card h2="Commission Options">
			<ListOptions {options} />
			<NewCommissionOptionForm />
		</Card>
	</div>
	<div class="card-container">
		<Card h2="Commission Categories">
			<ListCategories {categories} />
			<NewCommissionCategoryForm />
		</Card>
	</div>
	<div class="card-container">
		<Card h2="Order Statuses">
			<ListStatuses {statuses} />
			<NewOrderStatusForm />
		</Card>
	</div>
</main>

<style>
	h1 {
		align-self: flex-start;
	}

	main {
		margin: 2% 10% 10%;
		display: flex;
		flex-direction: column;
		flex: 1;
		gap: 1rem;
		align-items: center;
	}

	.card-container {
		width: 100%;
	}
</style>
