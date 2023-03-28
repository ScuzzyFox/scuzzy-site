<script lang="ts">
	import FloatInput from '$lib/FloatInput.svelte';
	import { adminStore } from '$lib/stores';
	import TextInput from '$lib/TextInput.svelte';
	import GoalCard from './GoalCard.svelte';
	export let data: any;
	let pageDescription = data.currentGoal
		? `Help Scuzzy buy a ` +
		  data.currentGoal.name +
		  `! Donate, commission, or share! Only $${
				data.currentGoal.cost - data.paypalBalance
		  } more to go!`
		: "Check out scuzzy's goals and support by donating, buying, or commissioning stuff!";
	let pageTitle = "ScuzzyFox's Goals";

	let newGoalName: string = '';
	let newGoalDescription: string = '';
	let newGoalUseCase: string = undefined!;
	let newGoalImage: any;
	let newGoalImageAlt: string = '';
	let newGoalCost: number = undefined!;

	let newGoalButtonEnabled: boolean = false;
	export let form;

	$: if (newGoalName && newGoalDescription && newGoalImage && newGoalImageAlt && newGoalCost) {
		newGoalButtonEnabled = true;
	} else {
		newGoalButtonEnabled = false;
	}

	$: if (newGoalUseCase === '') {
		newGoalUseCase = undefined!;
	}
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta property="og:type" content="website" />
	{#if data.currentGoal}
		<meta property="og:image" content={data.currentGoal.image} />
		<meta name="twitter:image" content={data.currentGoal.image} />
	{/if}
	<meta property="og:description" content={pageDescription} />
	<meta property="og:title" content={pageTitle} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:site" content="@scuzzyfox" />
	<meta name="twitter:creator" content="@scuzzyfox" />
	<meta name="twitter:description" content={pageDescription} />
</svelte:head>
<main>
	<h1>Help Scuzzy Buy Stuff!</h1>

	<div class="goals-container">
		{#if data.currentGoal}
			<GoalCard
				goal={data.currentGoal}
				currentBalance={data.paypalBalance}
				title={'Current Goal'}
				current={true}
			/>
		{/if}
		{#if data.previousGoals && data.previousGoals.length > 0}
			<GoalCard
				title={'Previous Goal'}
				goal={data.previousGoals[data.previousGoals.length - 1]}
				currentBalance={data.previousGoals[data.previousGoals.length - 1].cost}
				previous={true}
			/>
		{/if}
		{#if data.nextGoal}
			<GoalCard goal={data.nextGoal} currentBalance={0} next={true} title={'Upcoming Goal'} />
		{/if}
	</div>

	{#if $adminStore.loggedIn}
		<div class="admin-container">
			<div class="form-container">
				<div class="card-hat">
					<h2 class="form-title">Create a new Goal</h2>
				</div>
				<form
					action="?/createGoal"
					method="POST"
					class="create-goal-form"
					autocomplete="off"
					enctype="multipart/form-data"
				>
					<label for="image-input" class={`image-input-label ${newGoalImage ? 'full' : ''}`}>
						Upload Goal Image{#if newGoalImage}: {newGoalImage}
						{/if}
						<input
							class="image-input"
							type="file"
							name="image"
							id="image-input"
							accept="image/*, image/png, image/webp"
							bind:value={newGoalImage}
						/>
					</label>
					<TextInput
						name="image_alt"
						bind:value={newGoalImageAlt}
						required={true}
						placeholder={'Image Description'}
						inputId="image-alt-input"
					/>
					<TextInput
						name="name"
						bind:value={newGoalName}
						required={true}
						placeholder={'Name'}
						inputId="name-input"
					/>
					<TextInput
						name="description"
						bind:value={newGoalDescription}
						required={true}
						placeholder={'Description'}
						inputId="description-input"
					/>
					<FloatInput
						name="cost"
						bind:value={newGoalCost}
						required={true}
						placeholder={'Cost'}
						inputId="cost-input"
					/>
					<TextInput
						name="use_case"
						bind:value={newGoalUseCase}
						required={false}
						placeholder={'Use Case'}
						inputId="use-case-input"
					/>

					<input type="hidden" name="token" value={$adminStore.token} />

					<button class="new-goal-btn" disabled={!newGoalButtonEnabled}>Create New Goal</button>
				</form>
			</div>
			{#if form?.fail}
				<h3>Error:</h3>
				<p>{form.message}</p>
			{/if}
		</div>
	{/if}

	<div class="timeline-container">
		<div class="timeline-card-hat">
			<h2>All Goals</h2>
		</div>
		<div class="timeline-card">
			{#each data.allGoals as tlGoal}
				<a class="tl-item {tlGoal.fulfilled ? 'fulfilled' : ''}" href={`/goals/${tlGoal.slug}`}
					><img class="tl-image" src={tlGoal.image} alt={tlGoal.imageAlt} />{tlGoal.name}</a
				>
			{/each}
		</div>
	</div>
</main>

<style>
	* {
		box-sizing: border-box;
	}

	.tl-image {
		width: 30%;
		border-radius: var(--radius-img);
		aspect-ratio: 1;
		object-fit: cover;
	}

	.tl-item {
		color: var(--accnt-clr);
		text-decoration: none;
		background-color: var(--card-clr-scnd);
		border-radius: var(--radius-btn);
		padding: 1rem;
		display: flex;
		gap: 1rem;
		align-items: center;
		transition: border-radius 200ms;
		box-shadow: var(--drp-shdw);
	}

	.tl-item.fulfilled {
		background-color: var(--btn-clr-deact);
	}

	.tl-item:hover {
		filter: brightness(120%) saturate(120%);
		border-radius: 30px;
		text-decoration: underline;
	}

	.tl-item:active {
		filter: brightness(50%) saturate(120%);
		color: var(--tertiary-clr);
		border-radius: 30px;
		text-decoration: underline;
	}

	main {
		margin: 2% 10% 10%;
		display: flex;
		flex-direction: column;
		flex: 1;
		gap: 1rem;
		align-items: center;
	}

	h2 {
		margin: 0;
	}

	.main-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1em;
		flex: 1 0 0;
		flex-grow: 1;
		justify-content: space-evenly;
		align-items: center;
	}

	.admin-container {
		display: block;
		width: 100%;
	}

	.goals-container {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: center;
	}

	.goal-card {
		background-color: var(--card-clr);
		padding: 2em;
		padding-top: 0;
		min-width: min-content;
		height: fit-content;
		min-height: 70vh;
		border-radius: 0.5em;
		box-shadow: var(--drp-shdw);
	}

	.form-container {
		display: flex;
		width: 100%;
		flex-direction: column;
	}

	.card-hat,
	.create-goal-form {
		padding: 1rem;
		box-shadow: var(--drp-shdw);
	}
	.form-title {
		margin: 0;
		text-align: left;
	}
	.card-hat {
		background-color: var(--card-clr-scnd);
		border-top-right-radius: var(--radius-card);
		border-top-left-radius: var(--radius-card);
	}

	.create-goal-form {
		background-color: var(--card-clr);
		border-bottom-right-radius: var(--radius-card);
		border-bottom-left-radius: var(--radius-card);
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.new-goal-btn {
		background-color: var(--tertiary-clr);
		color: var(--tertiary-clr-txt);
		font-family: var(--main-font);
		font-weight: 900;
		font-size: 1.1rem;
		border: none;
		border-radius: var(--radius-btn);
		padding: 0.5rem 1rem;
		box-shadow: var(--btn-drp-shdw);
		margin-top: 1rem;
		transition: 250ms;
	}

	.new-goal-btn:disabled {
		background-color: var(--btn-clr-deact);
		color: var(--btn-clr-deact-txt);
		font-weight: normal;
	}

	.new-goal-btn:hover,
	.image-input-label:hover {
		filter: brightness(120%) saturate(120%);
	}

	.new-goal-btn:active,
	.image-input-label:active {
		filter: brightness(60%) saturate(150%);
	}

	.new-goal-btn:disabled:hover,
	.new-goal-btn:disabled:active {
		filter: none;
	}

	.image-input {
		display: none;
	}

	.image-input-label {
		background-color: var(--tertiary-lt-clr);
		color: var(--tertiary-clr-txt);
		font-weight: normal;
		transition: 250ms;
		text-align: center;
		padding: 0.5rem 1rem;

		border-radius: var(--radius-btn);
		box-shadow: var(--btn-drp-shdw);
		overflow: hidden;
	}

	.image-input-label.full {
		background-color: var(--tertiary-clr);
	}

	.timeline-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		flex: 1;
		margin-bottom: 1rem;
	}

	.timeline-card-hat {
		background-color: var(--card-clr-scnd);
		border-top-left-radius: var(--radius-card);
		border-top-right-radius: var(--radius-card);
	}

	.timeline-card {
		background-color: var(--card-clr);
		border-bottom-left-radius: var(--radius-card);
		border-bottom-right-radius: var(--radius-card);
		display: flex;
		flex-direction: column;
		flex: 1;
		gap: 0.5rem;
	}

	.timeline-card-hat,
	.timeline-card {
		padding: 1rem;
		box-shadow: var(--drp-shdw);
	}

	@media (min-width: 1013px) {
		main {
			margin: auto;
			max-width: 70vw;
		}

		h1 {
			align-self: flex-start;
		}

		.tl-image {
			width: 10%;
		}
	}
</style>
