<script lang="ts">
	import FloatInput from '$lib/FloatInput.svelte';
	import FormButton from '$lib/FormButton.svelte';
	import NumberInput from '$lib/NumberInput.svelte';
	import { adminStore } from '$lib/stores';
	import TextInput from '$lib/TextInput.svelte';
	import { json } from '@sveltejs/kit';
	import ProgressBar from './ProgressBar.svelte';
	export let data: any;
	let pageDescription = data.currentGoal
		? 'Help Scuzzy buy a ' + data.currentGoal.name + '! Donate, commission, or share!'
		: "Check out scuzzy's goals and support by donating, buying, or commissioning stuff!";
	let pageTitle = "ScuzzyFox's Goals";
	//todo: current goal is meta image. Latest goal will also be built in to description (help scuzzy buy...he only needs $xxx more!)

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
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:site" content="@scuzzyfox" />
	<meta name="twitter:creator" content="@scuzzyfox" />
	<meta name="twitter:description" content={pageDescription} />
</svelte:head>
<main>
	<h1>Help Scuzzy Buy Stuff!</h1>
	<div class="main-container">
		{#if data.currentGoal}
			<div class="current-goal goal-card">
				<h2>Current Goal</h2>

				<ProgressBar goal={data.currentGoal} currentBalance={data.paypalBalance} />

				<a
					href="https://www.paypal.com/donate/?hosted_button_id=A42QXPFQF5LUY"
					class="extra-links donate-link">Donate!</a
				>
				<a class="extra-links" href="/store">Store</a>
				<a class="extra-links" href="/commissions">Commission</a>
			</div>
		{/if}
		{#if data.previousGoals && data.previousGoals.length > 0}
			<div class="previous-goal goal-card">
				<h2>Previous Goal</h2>
				<ProgressBar
					goal={data.previousGoals[data.previousGoals.length - 1]}
					currentBalance={data.previousGoals[data.previousGoals.length - 1].cost}
				/>
				<h3>Completed, thank you!</h3>
			</div>
		{/if}
		{#if data.nextGoal}
			<div class="next-goal goal-card">
				<h2>Upcoming Goal</h2>
				<ProgressBar goal={data.nextGoal} currentBalance={0} />
				<h3>Up Next!</h3>
			</div>
		{/if}

		{#if $adminStore.loggedIn}
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
		{/if}
		{#if form?.fail}
			<h3>Error:</h3>
			<p>{form.message}</p>
		{/if}
	</div>
</main>

<style>
	main {
		margin: 2% 10% 10%;
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

	h2 {
		margin-bottom: 0;
		text-align: center;
	}

	h3 {
		text-align: center;
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
	}

	.image-input-label.full {
		background-color: var(--tertiary-clr);
	}
</style>
