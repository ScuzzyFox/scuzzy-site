<script lang="ts">
	import Card from '$lib/Card.svelte';
	import NewCommissionCategoryForm from './NewCommissionCategoryForm.svelte';
	//import PageViewTelemetry from '$lib/PageViewTelemetry.svelte';
	import NewCommissionForm from './NewCommissionForm.svelte';
	import NewCommissionOptionForm from './NewCommissionOptionForm.svelte';

	//todo: pageview telemetry
</script>

<main>
	<h1>Commissions Admin</h1>
	<div class="card-container">
		<Card h2={'New Commission'}>
			<NewCommissionForm />
		</Card>
	</div>
	<div class="card-container">
		<Card h2="New Commission Option">
			<NewCommissionOptionForm />
		</Card>
	</div>
	<div class="card-container">
		<Card h2="New Commission Category">
			<NewCommissionCategoryForm />
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
