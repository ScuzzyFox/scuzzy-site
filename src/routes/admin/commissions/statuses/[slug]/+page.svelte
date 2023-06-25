<script lang="ts">
	import Card from '$lib/Card.svelte';
	import type { CommissionStatus } from '$lib/CommissionTypes.js';
	import TextInput from '$lib/TextInput.svelte';
	import { onMount } from 'svelte';
	import '$lib/styles/buttons.css';
	import Notification from '$lib/Notification.svelte';
	import Popup from '$lib/Popup.svelte';

	export let data;
	export let form;
	let status: CommissionStatus = {
		id: 0,
		status: 'status',
		color: '#ffffff'
	};
	let maxTries = 10;
	let tries = 0;

	let statusText: string;
	let color: string;
	let showDeletePopup: boolean = false;

	function assignData() {
		//@ts-ignore
		if (!data.orderStatus && tries < maxTries) {
			tries++;
			setTimeout(assignData, 200);
		} else {
			//@ts-ignore
			status = data.orderStatus;
			statusText = status.status;
			color = status.color;
		}
	}

	function togglePopup() {
		showDeletePopup = !showDeletePopup;
	}

	onMount(assignData);

	$: if (statusText) statusText = statusText.toLocaleLowerCase();
	$: if (color == '') color = '#ffffff';
</script>

<Notification bind:form />
<div class="main-content">
	<a href="/admin/commissions" class="yl-btn link-btn">Back to Commissions Admin</a>
	<div class="card-container">
		<Card h1={'Status ' + status.id + ': ' + status.status}>
			<form action="?/editStatus" method="POST" autocomplete="off" enctype="multipart/form-data">
				<input type="hidden" name="status" value={status.id} />

				<TextInput
					name="status"
					bind:value={statusText}
					inputId="status-text-input"
					placeholder="Status Text"
					required={true}
				/>

				{#if color != ''}
					<TextInput
						bind:value={color}
						inputId="status-color-input"
						placeholder="Color"
						required={true}
					/>
				{/if}

				<input type="color" class="color-input" id="color-input" name="color" bind:value={color} />

				<button class="yl-btn" type="submit">Edit Status</button>
			</form>
			<form action="?/deleteStatus" method="POST">
				<input type="hidden" name="status" value={status.id} />
				<button class="yl-btn delete-btn" on:click={togglePopup} type="button">Delete Status</button
				>
				{#if showDeletePopup}
					<Popup darken={true}>
						<div style:margin={'1rem'}>
							<Card h3="Warning">
								<p>
									You're about to permanentely delete this status. Are you sure you want to
									continue?
								</p>

								<div class="button-row">
									<button class="yl-lt-btn" type="button" on:click={togglePopup}>Cancel</button>
									<button class="yl-btn delete-btn" type="submit">Delete</button>
								</div>
							</Card>
						</div>
					</Popup>
				{/if}
			</form>
		</Card>
	</div>
</div>

<style>
	.main-content {
		margin: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		margin-top: 0;
	}
	.yl-btn.link-btn {
		display: block;
		box-sizing: border-box;
		text-decoration: none;
		background-color: var(--accnt-clr);
		color: var(--white-txt);
		text-align: center;
	}

	.yl-btn.delete-btn {
		color: var(--white-txt);
		background-color: red;
	}

	.yl-btn {
		display: block;
	}

	img {
		width: 100%;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	form > .yl-btn {
		width: 100%;
	}

	.button-row {
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-basis: 1;
		flex-grow: 1;
		align-items: center;
		gap: 1rem;
		justify-content: center;
	}

	.color-input {
		width: 100%;
		height: 4rem;
	}
</style>
