<script lang="ts">
	import type { Option } from '$lib/CommissionTypes';

	export let options: Option[];
</script>

{#if options}
	{#each options as option, index (option.id)}
		<a class="option" href={'/admin/commissions/options/' + option.id + ''}>
			<div class="horizontal-option-info" data-option={option.id}>
				<section class="option-info" data-option={option.id}>
					{option.name}
				</section>
				{#if option.example_image_url}
					<img
						class="option-image"
						src={option.example_image_url}
						alt={'Thumbnail for commission option ' + option.name}
						data-option={option.id}
					/>
				{/if}
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

	.option {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		outline: 1.8px solid var(--btn-clr-avail);
		border-radius: var(--radius-card);
		transition: background-color 200ms;
		overflow: hidden;
		background-color: var(--card-clr-scnd);
	}

	.horizontal-option-info {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}
	.option-image {
		width: 5rem;
		object-fit: cover;
		align-self: flex-end;
	}

	.option-info {
		margin: 0.5rem;
	}
</style>
