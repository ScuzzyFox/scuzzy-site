<script lang="ts">
	import type { Goal } from '$lib/Goal';
	import { onMount } from 'svelte';

	export let goal: Goal;
	export let currentBalance: number = 0;
	let progress: number;

	onMount(() => {
		progress = (currentBalance * 100) / goal.cost;

		if (progress < 0) {
			progress = 1;
		} else if (progress > 100) {
			progress = 100;
		}
	});
</script>

<div class="component">
	<h3>{goal.name}</h3>
	<img src={goal.image.href} alt={goal.image.name} />
	<p>Cost: ${goal.cost.toFixed(2)}</p>
	<div class="bar-container">
		<div class="bar" style="height: {progress}%">
			<p class="curr-bal">${currentBalance.toFixed(2)}-</p>
		</div>
	</div>
</div>

<style>
	.component {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.2em;
		width: 100%;
		margin-bottom: 2em;
		height: 80%;
		flex: 1;
	}

	img {
		width: 80%;
		aspect-ratio: 1;
		object-fit: cover;
		border-radius: 0.5em;
		max-width: 10em;
	}

	.bar-container {
		position: relative;
		width: 30%;
		background-color: black;
		border-radius: 0.2em;
		flex-basis: 40vh;
	}

	.bar {
		position: absolute;
		width: 100%;
		background-color: var(--white-txt);
		border-radius: 0.2em;
		bottom: 0;
	}

	p {
		margin: 0.3em;
	}

	.curr-bal {
		position: absolute;
		top: 0;
		margin: 0;
		padding: 0;

		transform: translate(-110%, -0.5em);
	}
</style>
