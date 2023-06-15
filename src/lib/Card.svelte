<script lang="ts">
	export let h1: string | undefined | null = undefined;
	export let h2: string | undefined | null = undefined;
	export let h3: string | undefined | null = undefined;
	export let padding: boolean = true;
</script>

<div class="card-hat">
	{#if h1}
		<h1 class="card-title">{h1}</h1>
	{:else if h2}
		<h2 class="card-title">{h2}</h2>
	{:else if h3}
		<h3 class="card-title">{h3}</h3>
	{/if}
</div>
<div class="card-body" class:padding>
	<slot />
</div>

<style>
	* {
		box-sizing: border-box;
	}

	.padding {
		padding: 1rem;
	}

	.card-title {
		margin: 0;
	}

	.card-hat {
		border-top-right-radius: var(--radius-card);
		border-top-left-radius: var(--radius-card);
		background-color: var(--card-clr-scnd);
		padding: 1rem;
	}

	.card-body {
		background-color: var(--card-clr);
		border-bottom-right-radius: var(--radius-card);
		border-bottom-left-radius: var(--radius-card);
	}

	.card-hat,
	.card-body {
		box-shadow: var(--drp-shdw);
	}
	h1,
	h2,
	h3 {
		overflow-wrap: break-word;
	}
</style>
