<script lang="ts">
	import Wip from '$lib/Wip.svelte';
	export let data: any;
	let pageDescription =
		'Help Scuzzy reach some financial/materialistic goals! Donate, commission, or share!';
	let pageTitle = "ScuzzyFox's Goals";
	//todo: current goal is meta image. Latest goal will also be built in to description (help scuzzy buy...he only needs $xxx more!)
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta property="og:type" content="website" />
	<!-- <meta property="og:image" content={metaImage} /> -->
	<meta property="og:description" content={pageDescription} />
	<meta property="og:title" content={pageTitle} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:site" content="@scuzzyfox" />
	<meta name="twitter:creator" content="@scuzzyfox" />
	<meta name="twitter:description" content={pageDescription} />
	<!-- <meta name="twitter:image" content={metaImage} /> -->
</svelte:head>

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
