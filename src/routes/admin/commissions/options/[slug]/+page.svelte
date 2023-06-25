<script lang="ts">
	import BooleanInput from '$lib/BooleanInput.svelte';
	import Card from '$lib/Card.svelte';
	import type { Option } from '$lib/CommissionTypes.js';
	import FileFormInput from '$lib/FileFormInput.svelte';
	import NumberInput from '$lib/NumberInput.svelte';
	import TextAreaInput from '$lib/TextAreaInput.svelte';
	import TextInput from '$lib/TextInput.svelte';
	import { onMount } from 'svelte';
	import '$lib/styles/buttons.css';
	import Notification from '$lib/Notification.svelte';
	import Popup from '$lib/Popup.svelte';

	export let data;
	export let form;
	let option: Option = {
		id: 0,
		name: 'Option X',
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique voluptatem hic vero, dicta quidem neque quod adipisci unde eos fugiat aliquam sequi laborum, rerum incidunt veritatis, id voluptates eligendi quia!',
		cost: 75,
		adult: false,
		abdl: false
	};
	let maxTries = 10;
	let tries = 0;

	let example_image: any;
	let name: string;
	let description: string;
	let cost: number;
	let exclusive_with: string;
	let required: string;
	let adult: boolean;
	let abdl: boolean;
	let showDeletePopup: boolean = false;

	function assignData() {
		if (!data.option && tries < maxTries) {
			tries++;
			setTimeout(assignData, 200);
		} else {
			option = data.option;
			name = option.name;
			description = option.description;
			cost = Math.floor(option.cost);
			if (option.exclusive_with) {
				exclusive_with = option.exclusive_with;
			}

			if (option.required) {
				required = option.required;
			}

			adult = option.adult;
			abdl = option.abdl;
		}
	}

	function togglePopup() {
		showDeletePopup = !showDeletePopup;
	}

	onMount(assignData);
</script>

<Notification bind:form />
<div class="main-content">
	<a href="/admin/commissions" class="yl-btn link-btn">Back to Commissions Admin</a>
	<div class="card-container">
		<Card h1={'Option ' + option.id + ': ' + option.name}>
			<form action="?/editOption" method="POST" autocomplete="off" enctype="multipart/form-data">
				<img src={option.example_image_url} alt={'Example of ' + option.name} />

				<input type="hidden" name="option" value={option.id} />

				<FileFormInput
					name="example_image"
					placeholder="Example Image"
					inputId="option-example-image-input"
					accept="image/*"
					bind:file={example_image}
				/>

				<TextInput
					name="name"
					bind:value={name}
					inputId="option-name-input"
					placeholder="Option Name"
					required={true}
				/>

				<TextAreaInput
					name="description"
					bind:value={description}
					inputId="option-description-input"
					placeholder="Description"
					required={true}
				/>

				<NumberInput
					name="cost"
					bind:value={cost}
					inputId="option-cost-input"
					placeholder="Cost"
					required={true}
				/>

				<TextInput
					name="exclusive_with"
					bind:value={exclusive_with}
					inputId="option-exclusive-with-input"
					placeholder="Exclusive With"
					required={false}
				/>

				<TextInput
					name="required"
					bind:value={required}
					inputId="option-required-input"
					placeholder="Required Sstring"
					required={false}
				/>

				<BooleanInput
					name="adult"
					placeholder="NSFW?"
					inputId="option-adult-input"
					bind:checked={adult}
				/>

				<BooleanInput
					name="abdl"
					placeholder="ABDL?"
					inputId="option-abdl-input"
					bind:checked={abdl}
				/>

				<button class="yl-btn" type="submit">Modify Option</button>
			</form>
			<form action="?/deleteOption" method="POST">
				<input type="hidden" name="option" value={option.id} />
				<button class="yl-btn delete-btn" on:click={togglePopup} type="button">Delete Option</button
				>
				{#if showDeletePopup}
					<Popup darken={true}>
						<div style:margin={'1rem'}>
							<Card h3="Warning">
								<p>
									You're about to permanentely delete this option. Are you sure you want to
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
</style>
