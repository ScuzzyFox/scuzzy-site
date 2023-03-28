<script lang="ts">
	import type { Goal } from '$lib/Goal';
	import { onMount } from 'svelte';
	import chroma from 'chroma-js';

	export let goal: Goal;
	export let currentBalance: number = 0;
	let progress: number;
	let color: string;

	onMount(() => {
		progress = (currentBalance * 100) / goal.cost;

		if (progress < 0) {
			progress = 1;
		} else if (progress > 100) {
			progress = 100;
		}

		color = getColor(progress);
	});

	function getColor(p: number): string {
		let html = document.querySelector('html');
		let tertiaryClr = chroma(getComputedStyle(html!).getPropertyValue('--tertiary-clr'));
		let green = chroma('green');
		let mixture = chroma.mix(tertiaryClr, green, p / 100);

		let clr: string = mixture.hex();

		return clr;
	}
</script>

<div class="component">
	<div class="bar-container">
		<div class="bar" style="height: {progress}%; background-color: {color};">
			<p class="curr-bal">${currentBalance.toFixed(2)}-</p>
		</div>
	</div>
</div>

<style>
	* {
		box-sizing: border-box;
	}

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

	.bar-container {
		position: relative;
		width: 15%;
		background-color: black;
		border-radius: 0.2em;
		flex-basis: 40vh;
	}

	.bar {
		position: absolute;
		width: 100%;

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
