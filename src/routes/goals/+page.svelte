<script lang="ts">
	import { json } from '@sveltejs/kit';
	import DonateButton from './DonateButton.svelte';
	import ProgressBar from './ProgressBar.svelte';
	export let data: any;
	let pageDescription =
		'Help Scuzzy buy a ' + data.currentGoal.name + '! Donate, commission, or share!';
	let pageTitle = "ScuzzyFox's Goals";
	//todo: current goal is meta image. Latest goal will also be built in to description (help scuzzy buy...he only needs $xxx more!)
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={data.currentGoal.image.href} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:title" content={pageTitle} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:site" content="@scuzzyfox" />
	<meta name="twitter:creator" content="@scuzzyfox" />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content={data.currentGoal.image.href} />
</svelte:head>
<main>
	<h1>
		Help Scuzzy Buy Stuff! (These goals are fake placeholders for now, feel free to donate anyway
		though! 💖)
	</h1>
	<div class="main-container">
		<div class="current-goal goal-card">
			<h2>Current Goal</h2>

			<ProgressBar goal={data.currentGoal} currentBalance={data.paypalBalance} />

			<DonateButton />

			<a class="extra-links" href="/store">Store</a>
			<a class="extra-links" href="/commissions">Commission</a>
		</div>
		<div class="previous-goal goal-card">
			<h2>Previous Goal</h2>
			<ProgressBar
				goal={data.previousGoals[data.previousGoals.length - 1]}
				currentBalance={data.previousGoals[data.previousGoals.length - 1].cost}
			/>
			<h3>Completed, thank you!</h3>
		</div>
		<div class="next-goal goal-card">
			<h2>Upcoming Goal</h2>
			<ProgressBar goal={data.nextGoal} currentBalance={0} />
			<h3>Up Next!</h3>
		</div>
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
		background-color: var(--scnd-clr);
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
		color: var(--link-txt-clr-hvr);
	}
	.extra-links:active {
		color: var(--link-txt-clr-actv);
	}
</style>
