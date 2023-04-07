<script lang="ts">
	import Card from '$lib/Card.svelte';
	import type { Link } from '$lib/Link';
	import { fly, fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	export let srcset: Link[];
	export let title: string;
	let index: number = 0;
	let myAutoInterval: number = undefined!;
	let myInterval: number = undefined!;
	let currentSrc: Link;

	$: currentSrc = srcset[index];

	onMount(() => {
		myAutoInterval = setInterval(() => {
			index = (index + 1) % srcset.length;
		}, Math.floor(Math.random() * (5200 - 4800) + 4800));
	});

	function handleEntrance(e: any) {
		let img: HTMLElement = e.target;
		//a gate to make sure only 1 interval is set
		if (!myInterval) {
			myInterval = setInterval(() => {
				index = (index + 1) % srcset.length;
			}, 800);
			clearInterval(myAutoInterval);
			myAutoInterval = null!;
		}
	}

	function handleEgress(e: any) {
		let img: HTMLElement = e.target;

		clearInterval(myInterval);
		myInterval = null!;
		if (!myAutoInterval) {
			myAutoInterval = setInterval(() => {
				index = (index + 1) % srcset.length;
			}, Math.floor(Math.random() * (5200 - 4800) + 4800));
		}
	}
</script>

<div class="card-container" on:mouseenter={handleEntrance} on:mouseleave={handleEgress}>
	<Card h2={title}>
		{#each srcset as src, i}
			<a href="/commissions">
				<img
					in:fade={{ duration: 200 }}
					src={src.href}
					alt={src.name}
					class={i === index ? 'current' : ''}
				/>
			</a>
		{/each}
	</Card>
</div>

<style>
	.card-container {
		max-width: 360px;
		min-width: 250px;
		overflow: hidden;
	}

	img {
		width: 100%;
		height: auto;
		aspect-ratio: 1;
		object-fit: cover;
        display: none;
	}

	img.current {
		display: unset;
	}
</style>
