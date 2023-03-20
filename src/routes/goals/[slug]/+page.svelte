<script lang="ts">
	import type { Goal } from '$lib/Goal';
	import { onMount } from 'svelte';
	import { adminStore } from '$lib/stores';
	import TextInput from '$lib/TextInput.svelte';
	import NumberInput from '$lib/NumberInput.svelte';

	export let data;
	let goal: Goal = data.goal;
</script>

<main>
	<h1>Scuzzy's ${goal.cost.toFixed(2)} Goal</h1>
	<div class="card-container">
		<div class="card-hat">
			<img src={goal.image} alt={goal.imageAlt} />

			<div class="goal-title">
				<h2>{goal.name}</h2>
				<p>{goal.description}</p>
			</div>
		</div>
		<div class="card">
			<div class="main-content">
				{#if goal.useCase}
					<h3>Use Case</h3>
					<p>{goal.useCase}</p>
				{/if}
			</div>
			<div class="sub-footer">
				<p>Cost: ${goal.cost.toFixed(2)}</p>
				<p>Created: {goal.created?.toLocaleDateString()}</p>

				{#if goal.fulfilled}
					<p>Fulfilled: {goal.dateFulfilled?.toLocaleDateString()}</p>
				{:else}
					<p>Not yet fulfilled.</p>
				{/if}
			</div>
		</div>
	</div>
	<div class="link-container">
		<a href="/goals">Back to Goals</a>
	</div>

	{#if $adminStore.loggedIn}
		<form action="/goals?/deleteGoal" method="POST">
			<input type="hidden" value={$adminStore.token} name="token" />
			<input type="hidden" name="pk" value={goal.id} />
			<button class="delete-button">Delete Goal</button>
		</form>

		<form action="/goals?/makeFulfilled" style="margin-top: 1rem;" method="POST">
			<input type="hidden" name="pk" value={goal.id} />
			<input type="hidden" name="slug" value={goal.slug} />
			<input type="hidden" name="token" value={$adminStore.token} />
			<button class="delete-button">Make Fulfilled</button>
		</form>

		<form class="edit-goal-form" action="/goals?/editGoal" method="POST">
			<TextInput
				name="name"
				value={goal.name}
				placeholder={'Goal name'}
				required={false}
				inputId={'name-input'}
			/>
			<TextInput
				name="description"
				value={goal.description}
				placeholder={'Description'}
				required={false}
				inputId={'description-input'}
			/>
			<TextInput
				name="useCase"
				value={goal.useCase}
				placeholder={'Use case'}
				required={false}
				inputId={'use-case-input'}
			/>
			<NumberInput
				name="cost"
				value={goal.cost}
				placeholder={'Cost'}
				required={false}
				inputId={'cost-input'}
			/>
			<label for="fulfilled-input">
				Fulfilled?
				<input type="checkbox" name="fulfilled" id="fulfilled-input" value={goal.fulfilled} />
			</label>

			<input type="hidden" value={$adminStore.token} name="token" />
			<input type="hidden" value={goal.id} name="pk" />

			<button class="edit-button">Edit Goal</button>
		</form>
	{/if}
</main>

<style>
	* {
		box-sizing: border-box;
	}
	main {
		margin: 5% 5% 15%;
	}

	img {
		width: 80vw;
		aspect-ratio: 1;
		object-fit: cover;
		border-radius: var(--radius-img);
	}
	.card-hat {
		background-color: var(--card-clr-scnd);
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
		border-top-left-radius: var(--radius-card);
		border-top-right-radius: var(--radius-card);
	}

	.card {
		background-color: var(--card-clr);
		border-bottom-left-radius: var(--radius-card);
		border-bottom-right-radius: var(--radius-card);
	}

	.card,
	.card-hat {
		padding: 1.2rem;
		box-shadow: var(--drp-shdw);
	}

	.link-container {
		display: flex;
		justify-content: center;
		margin: 1.2rem;
	}

	a {
		background-color: var(--accnt-clr);
		border-radius: var(--radius-btn);
		color: var(--white-txt);
		text-decoration: none;
		font-size: 1.1rem;
		padding: 0.8rem;
		box-shadow: var(--btn-drp-shdw);
		align-self: center;
		text-align: center;
		font-weight: 900;
	}

	a:hover {
		filter: brightness(120%) saturate(120%);
	}

	a:active {
		background-color: var(--tertiary-clr);
		color: var(--tertiary-clr-txt);
	}

	.delete-button,
	.edit-button {
		font-family: var(--main-font);
		color: var(--tertiary-clr-txt);
		background-color: var(--tertiary-clr);
		border: none;
		border-radius: var(--radius-btn);
		font-size: 1.1rem;
		padding: 0.8rem;
		box-shadow: var(--btn-drp-shdw);
		text-align: center;
		font-weight: 900;
	}

	.delete-button:hover,
	.edit-button:hover {
		filter: brightness(120%) saturate(120%);
	}
	.delete-button:active,
	.edit-button:active {
		filter: brightness(80%) saturate(150%);
	}
	form {
		align-self: center;
		display: flex;
		justify-content: center;
		flex: 1;
	}

	.edit-goal-form {
		background-color: var(--card-clr);
		border-radius: var(--radius-card);
		margin-top: 1.2rem;
		flex-direction: column;
		gap: 1.2rem;

		padding: 1rem;
		padding-top: 1.5rem;
	}

	@media (min-width: 918px) {
		main {
			margin: 2%;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		h1 {
			align-self: flex-start;
		}

		img {
			width: 10vw;
		}
		.card-hat {
			flex-direction: row;
			gap: 3rem;
			align-items: flex-start;
		}

		.card-hat,
		.card {
			width: 70vw;
		}

		.link-container {
			margin: 1rem;
			width: 100vw;
		}

		a {
			width: 70vw;
		}

		form {
			width: 100vw;
		}

		.delete-button {
			width: 70vw;
			margin-left: 0;
			margin-right: 0;
		}

		.sub-footer {
			display: flex;
			flex-direction: row;
			justify-content: space-evenly;
		}

		.edit-goal-form {
			width: 70vw;
		}
	}
</style>
