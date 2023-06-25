<script lang="ts">
	import type { CommissionVisual } from '$lib/CommissionTypes.js';
	import { onMount } from 'svelte';
	import '$lib/styles/buttons.css';
	import Card from '$lib/Card.svelte';
	import BooleanInput from '$lib/BooleanInput.svelte';
	import NumberInput from '$lib/NumberInput.svelte';
	import Notification from '$lib/Notification.svelte';
	import Popup from '$lib/Popup.svelte';

	export let data;
	export let form;
	let visuals: CommissionVisual[];
	let commissionSlug: string;
	let abdl: boolean;
	let adult: boolean;
	let is_video: boolean;
	let order: number;
	let visualIds: string;
	let showPopup: boolean = false;

	function assignData() {
		if (!data.visuals) {
			setTimeout(assignData, 200);
		} else {
			visuals = data.visuals;
			commissionSlug = data.commissionSlug;
			abdl = visuals[0].abdl;
			adult = visuals[0].adult;
			is_video = visuals[0].is_video;
			order = visuals[0].order;
			let visualIdArray = visuals.map((visual) => {
				return visual.id;
			});
			visualIds = '[';
			visualIdArray.forEach((id) => {
				visualIds += id + ',';
			});
			if (visualIds.endsWith(',')) {
				visualIds = visualIds.substring(0, visualIds.length - 1);
			}

			visualIds = visualIds + ']';
		}
	}

	function togglePopup() {
		showPopup = !showPopup;
	}

	onMount(assignData);
</script>

<Notification {form} />
<div class="main-content">
	<a class="yl-btn link-btn" href={`/commissions/${commissionSlug}/visuals`}>Back to Visuals</a>
	{#if visuals}
		<div class="card-container">
			<Card h1="Visual Detail">
				<img src={visuals[0].visual_url} alt="Commission visual" />
				<div class="content-box column-flex">
					<h2 style:margin-bottom="0">Sizes</h2>
					{#each visuals as visual}
						<a style:max-width={'100%'} style:font-size={'14px'} href={visual.visual_url}
							>{visual.visual_url}</a
						>
					{/each}
				</div>
				<div class="content-box" style:padding="0.5rem">
					<form action="?/modifyVisualGroup" method="POST" autocomplete="off" class="column-flex">
						<h2 style:margin-bottom="0">Modify Visual Group</h2>
						<BooleanInput
							name="adult"
							bind:checked={adult}
							required={false}
							inputId="visual-adult-input"
							placeholder="NSFW?"
						/>
						<BooleanInput
							name="abdl"
							bind:checked={abdl}
							required={false}
							inputId="visual-abdl-input"
							placeholder="ABDL?"
						/>

						<BooleanInput
							name="is_video"
							bind:checked={is_video}
							required={false}
							inputId="visual-is-video-input"
							placeholder="Is Video?"
						/>

						<NumberInput
							name="order"
							bind:value={order}
							required={true}
							inputId="visual-order-input"
							placeholder="Order"
						/>

						<input type="hidden" name="ids" value={visualIds} />

						<button class="yl-btn">Modify Visual Group</button>
					</form>
				</div>

				<div class="content-box" style:padding="0.5rem">
					<form action="?/deleteVisualsGroup" method="POST" autocomplete="off" class="column-flex">
						<input type="hidden" name="group_id" value={visuals[0].group_identifier} />
						<button
							class="yl-btn"
							type="button"
							style:background-color="red"
							style:color="var(--white-txt)"
							on:click={togglePopup}>Delete Group</button
						>
						{#if showPopup}
							<Popup darken={true}>
								<div style:margin="1rem">
									<Card h2="Warning!">
										<p>You are about to delete this visual group permanently. Are you sure?</p>
										<div class="button-row">
											<button
												type="button"
												class="yl-lt-btn"
												style:display="block"
												on:click={togglePopup}>Cancel</button
											>
											<button
												class="yl-btn"
												type="submit"
												style:width="revert"
												style:background-color="red"
												style:color="var(--white-txt)">Delete</button
											>
										</div>
									</Card>
								</div>
							</Popup>
						{/if}
					</form>
				</div>
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
		gap: 1rem;
		align-items: center;
	}

	.link-btn {
		background-color: var(--accnt-clr);
		color: var(--white-txt);
		display: block;
		box-sizing: border-box;
		width: 100%;
		text-decoration: none;
		text-align: center;
	}

	.card-container {
		width: 100%;
	}

	.content-box {
		box-sizing: border-box;
		border: 1.8px solid var(--btn-clr-avail);
	}

	.column-flex {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
		word-wrap: break-word;
	}

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
		color: var(--link-txt-clr-actv);
	}

	img {
		width: 100%;
	}

	.yl-btn {
		width: 100%;
	}

	.button-row {
		display: flex;
		gap: 1rem;
		justify-content: center;
		align-items: center;
	}
</style>
