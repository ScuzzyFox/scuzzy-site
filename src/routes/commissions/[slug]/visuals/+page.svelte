<script lang="ts">
	import Card from '$lib/Card.svelte';
	import type { CommissionVisual } from '$lib/CommissionTypes.js';
	import { onMount } from 'svelte';
	import '$lib/styles/buttons.css';

	export let data;
	let visuals: CommissionVisual[];
	let commission: any;
	let groups: any[];

	function assignData() {
		if (!data.visuals || !data.commission) {
			setTimeout(assignData, 200);
		} else {
			visuals = data.visuals;
			commission = data.commission;
			//need to get each unique group_id from all the visuals.
			//link to each group with a thumbnail on the side
			let groupSet = new Set();
			visuals.forEach((visual) => {
				groupSet.add(visual.group_identifier);
			});
			groups = Array.from(groupSet);

			groups = groups.map((group) => {
				let visual = visuals.find((visual) => {
					return visual.group_identifier == group;
				});
				return {
					group_identifier: group,
					is_video: visual?.is_video,
					visual_url: visual?.visual_url,
					sizes: visuals.filter((visual) => {
						return visual.group_identifier == group;
					}).length
				};
			});
		}
	}

	onMount(assignData);
</script>

<div class="main-content">
	{#if commission}
		<a href={`/commissions/${commission.slug}`} class="yl-btn link-btn">Back to Commission Page</a>
	{/if}
	{#if visuals && commission}
		<div class="card-container">
			<Card h1={`${commission.title} Visuals`}>
				{#if groups}
					{#each groups as group}
						<!--display each group, depending on if video or not!-->
						{#if group.is_video}
							<!--If video, render video preview-->
						{:else}
							<a
								href={`/commissions/${commission.slug}/visuals/${group.group_identifier}`}
								class="group"
							>
								<div class="vertical-group-info">
									<section>{group.group_identifier}</section>
									<section>
										Sizes: {group.sizes}
									</section>
								</div>
								<img src={group.visual_url} alt={`${group.group_identifier} visual`} />
							</a>
						{/if}
					{/each}
				{/if}
			</Card>
		</div>
	{/if}
</div>

<style>
	.main-content {
		margin: 1rem;
		margin-top: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.link-btn {
		display: block;
		background-color: var(--accnt-clr);
		color: var(--white-txt);
		text-decoration: none;
		width: 100%;
		text-align: center;
	}

	img {
		width: 5rem;
		object-fit: cover;
	}

	.group {
		text-decoration: none;
		color: var(--link-txt-clr);
		display: flex;
		font-size: 14px;
		box-sizing: border-box;
		border: 1.8px solid var(--btn-clr-avail);
		overflow: hidden;
		border-radius: var(--radius-card);
	}

	.group:hover {
		text-decoration: underline;
		filter: brightness(120%) saturate(120%);
	}

	.group:active {
		text-decoration: underline;
		filter: brightness(60%) saturate(150%);
	}

	.vertical-group-info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0.5rem;
	}
</style>
