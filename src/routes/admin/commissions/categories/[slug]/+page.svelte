<script lang="ts">
	import Card from '$lib/Card.svelte';
	import type { CommissionCategory } from '$lib/CommissionTypes.js';
	import TextInput from '$lib/TextInput.svelte';
	import { onMount } from 'svelte';
	import '$lib/styles/buttons.css';
	import Notification from '$lib/Notification.svelte';
	import Popup from '$lib/Popup.svelte';
	import BooleanInput from '$lib/BooleanInput.svelte';

	export let data;
	export let form;
	let category: CommissionCategory = {
		id: 0,
		name: 'category',
		abdl: false,
		adult: false
	};
	let maxTries = 10;
	let tries = 0;

	let name: string;
	let adult: boolean;
	let abdl: boolean;
	let showDeletePopup: boolean = false;

	function assignData() {
		//@ts-ignore
		if (!data.category && tries < maxTries) {
			tries++;
			setTimeout(assignData, 200);
		} else {
			//@ts-ignore
			category = data.category;
			name = category.name;
			abdl = category.abdl;
			adult = category.adult;
		}
	}

	function togglePopup() {
		showDeletePopup = !showDeletePopup;
	}

	onMount(assignData);

	$: if (name) name = name.toLocaleLowerCase();
</script>

<Notification bind:form />
<div class="main-content">
	<a href="/admin/commissions" class="yl-btn link-btn">Back to Commissions Admin</a>
	<div class="card-container">
		<Card h1={'Category ' + category.id + ': ' + category.name}>
			<form action="?/editCategory" method="POST" autocomplete="off" enctype="multipart/form-data">
				<input type="hidden" name="category" value={category.id} />

				<TextInput
					name="name"
					bind:value={name}
					inputId="category-name-input"
					placeholder="Category Name"
					required={true}
				/>

				<BooleanInput
					name="adult"
					bind:checked={adult}
					inputId="category-adult-input"
					required={false}
					placeholder="NSFW?"
				/>

				<BooleanInput
					name="abdl"
					bind:checked={abdl}
					inputId="category-abdl-input"
					required={false}
					placeholder="ABDL?"
				/>

				<button class="yl-btn" type="submit">Edit Category</button>
			</form>
			<form action="?/deleteCategory" method="POST">
				<input type="hidden" name="category" value={category.id} />
				<button class="yl-btn delete-btn" on:click={togglePopup} type="button"
					>Delete Category</button
				>
				{#if showDeletePopup}
					<Popup darken={true}>
						<div style:margin={'1rem'}>
							<Card h3="Warning">
								<p>
									You're about to permanentely delete this category. Are you sure you want to
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
