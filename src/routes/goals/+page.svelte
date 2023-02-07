<script lang="ts">
	import Wip from '$lib/Wip.svelte';

	export let data: any;
</script>

<h1>THIS PAGE IS UNDER CONSTRUCTION</h1>

<Wip />

<h1>Current Goal:</h1>
<p>{data.currentGoal.name}: {data.currentGoal.description}</p>
<p>cost: {data.currentGoal.cost}</p>
<p>Distance to milestone: {(data.currentGoal.cost - data.paypalBalance).toFixed(2)}</p>

{#if data.previousGoals.length > 0}
	<h1>Previous goals:</h1>
	{#each data.previousGoals as goal (goal.id)}
		<p>{goal.name}: ${goal.cost}</p>
	{/each}
{:else}
	<p>No previous goals.</p>
{/if}

<h2>Current paypal balance: {data.paypalBalance}</h2>
