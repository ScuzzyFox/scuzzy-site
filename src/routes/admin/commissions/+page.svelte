<script lang="ts">
	import Card from '$lib/Card.svelte';
	//import PageViewTelemetry from '$lib/PageViewTelemetry.svelte';
	import NewCommissionForm from './NewCommissionForm.svelte';
	import NewCommissionOptionForm from './NewCommissionOptionForm.svelte';

	//todo: pageview telemetry
</script>

<h1>Commissions Admin</h1>

<Card h2={'New Commission'}>
	<NewCommissionForm />
</Card>

<Card h2="New Commission Option">
	<NewCommissionOptionForm />
</Card>

<Card h2="New Commission Category" />
