<script lang="ts">
	import type { CommissionStatus } from '$lib/CommissionTypes';

	export let statuses: CommissionStatus[];
</script>

{#if statuses}
	{#each statuses as status}
		<a
			class="status"
			href={'/admin/commissions/statuses/' + status.id}
			style:border={`1.8px solid ${status.color}`}
		>
			<div>
				<p>{status.status}</p>
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

	.status {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		border-radius: var(--radius-card);
		transition: background-color 200ms;
		overflow: hidden;
		background-color: var(--card-clr-scnd);
	}
</style>
