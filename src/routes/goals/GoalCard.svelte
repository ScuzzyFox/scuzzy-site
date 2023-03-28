<script lang="ts">
	import ProgressBar from './ProgressBar.svelte';
	import type { Goal } from '$lib/Goal';

	export let goal: Goal;
	export let currentBalance: number;
	export let title: string = 'Title';
	export let current: boolean = false;
	export let next: boolean = false;
	export let previous: boolean = false;
</script>

<div class="card-container">
	<div class="card-hat">
		<h2>{title}</h2>
	</div>
	<div class="card">
		<h3>{goal.name}</h3>
		<a href={`/goals/${goal.slug}`}>
			<img src={goal.image} alt={goal.imageAlt} />
		</a>
		<p>Cost: ${goal.cost.toFixed(2)}</p>
		<ProgressBar {goal} {currentBalance} />
		{#if current}
			<a
				href="https://www.paypal.com/donate/?hosted_button_id=A42QXPFQF5LUY"
				class="extra-links donate-link">Donate!</a
			>
			<a class="extra-links" href="/store">Store</a>
			<a class="extra-links" href="/commissions">Commission</a>
		{/if}
		{#if previous}
			<p>Fulfilled on {goal.dateFulfilled?.toLocaleDateString()}. Thank you!</p>
		{/if}
		{#if next}
			<p>Once the current goal is fulfilled, this one is next!</p>
		{/if}
		<a class="extra-links" href={`/goals/${goal.slug}`}>Goal Details</a>
	</div>
</div>

<style>
	* {
		box-sizing: border-box;
	}

	h2 {
		margin-top: 0;
		margin-bottom: 0;
	}

	.card-container {
		display: flex;
		flex: 1;
		flex-direction: column;
		width: fit-content;
		align-items: center;
		height: 100%;
	}

	.card-hat {
		background-color: var(--card-clr-scnd);
		border-top-left-radius: var(--radius-card);
		border-top-right-radius: var(--radius-card);
	}

	.card {
		background-color: var(--card-clr);
		border-bottom-left-radius: var(--radius-card);
		border-bottom-right-radius: var(--radius-card);
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.card,
	.card-hat {
		width: 100%;
		padding: 1rem;
		box-shadow: var(--drp-shdw);
	}

	img {
		--img-size: 180px;
		border-radius: var(--radius-img);
		aspect-ratio: 1;
		object-fit: cover;
		width: 100%;
		max-width: var(--img-size);
		transition: border-radius 200ms;
	}

	img:hover {
		filter: brightness(120%) saturate(120%);

		border-radius: 30px;
	}

	img:active {
		filter: brightness(50%) saturate(120%);
	}

	.extra-links {
		display: block;
		margin: 0.5em 0;
		text-align: center;
		text-decoration: none;
		color: var(--link-txt-clr);
		font-size: 1.2rem;
	}

	.extra-links:hover {
		filter: brightness(120%) saturate(120%);
		text-decoration: underline;
	}
	.extra-links:active {
		color: var(--tertiary-clr);
	}

	.extra-links.donate-link {
		color: var(--tertiary-clr);

		text-decoration: underline;
	}

	.extra-links.donate-link:hover {
		filter: brightness(120%) saturate(120%);
	}

	.extra-links.donate-link:active {
		color: var(--link-txt-clr);
	}

	@media (min-width: 1018px) {
		img {
			width: var(--img-size);
		}
	}
</style>
