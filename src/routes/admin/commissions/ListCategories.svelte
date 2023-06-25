<script lang="ts">
	import type { CommissionCategory } from '$lib/CommissionTypes';

	export let categories: CommissionCategory[];
</script>

{#if categories}
	{#each categories as category}
		<a class="category" href={'/admin/commissions/categories/' + category.id}>
			<div>
				<p>{category.name}</p>
			</div>
		</a>
	{/each}
{/if}

<style>
	a {
		color: var(--link-txt-clr);
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
		filter: brightness(120%) saturate(120%);
	}

	a:active {
		text-decoration: underline;
		filter: brightness(60%) saturate(150%);
	}

	.category {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		border-radius: var(--radius-card);
		transition: background-color 200ms;
		overflow: hidden;
		background-color: var(--card-clr-scnd);
		border: 1.8px solid var(--btn-clr-avail);
	}
</style>
