<script lang="ts">
	import Card from '$lib/Card.svelte';
	import type { CommissionOrder, CommissionStatus } from '$lib/CommissionTypes.js';
	import { onMount } from 'svelte';
	import '$lib/styles/buttons.css';
	import { adminStore } from '$lib/stores.js';
	import SelectInput from '$lib/SelectInput.svelte';
	import BooleanInput from '$lib/BooleanInput.svelte';
	import Notification from '$lib/Notification.svelte';
	import TextAreaInput from '$lib/TextAreaInput.svelte';
	import TextInput from '$lib/TextInput.svelte';
	import EmailInput from '$lib/EmailInput.svelte';
	import Popup from '$lib/Popup.svelte';
	import NumberInput from '$lib/NumberInput.svelte';
	import AddRemoveOptionForm from './AddRemoveOptionForm.svelte';
	import PageViewTelemetry from '$lib/PageViewTelemetry.svelte';

	export let data;
	export let form;
	let order: CommissionOrder;
	let statuses: CommissionStatus[];
	let statusToAssign: any;

	let assign: boolean = true;
	let previousAssign: boolean = false;
	let unassign: boolean = false;
	let previousUnassign: boolean = true;

	let btnDisabled: boolean = true;
	let artist_note: string | undefined;
	let showDeletePopup: boolean = false;
	let customerName: string;
	let contactInfo: string;
	let contactInfoLabel: string;
	let email: string;
	let characterCount: number = 1;
	let commissionDescription: string;
	let whereToContact: string;
	let extraCommissionDescription: string | undefined;
	let adult: boolean = false;
	let abdl: boolean = false;
	let options: any;
	let completed: boolean;

	function assignData() {
		if (!data.order || !data.statuses || !data.options) {
			setTimeout(assignData, 200);
		} else {
			order = data.order;
			statuses = data.statuses;
			if (order.artist_note) {
				artist_note = order.artist_note;
			} else {
				artist_note = '';
			}

			customerName = order.customer_name;
			contactInfo = order.contact_info;
			whereToContact = order.where_to_contact;
			email = order.email;
			characterCount = order.number_of_characters;
			commissionDescription = order.commission_description;
			adult = order.adult;
			abdl = order.abdl;
			completed = order.completed;
			if (order.extra_character_details) {
				extraCommissionDescription = order.extra_character_details;
			} else {
				extraCommissionDescription = '';
			}

			options = data.options;
		}
	}

	function flipAssign() {
		if (previousAssign == assign) {
			previousAssign = !assign;
			unassign = !assign;
			previousUnassign = !unassign;
		} else if (previousUnassign == unassign) {
			previousUnassign = !unassign;
			assign = !unassign;
			previousAssign = !assign;
		}
	}

	$: assign, unassign, flipAssign();

	onMount(assignData);

	function handleDeleteOrder(event: Event) {
		if (!showDeletePopup) {
			showDeletePopup = true;
		} else {
			showDeletePopup = false;
		}
	}

	$: if (whereToContact == 'TG') {
		contactInfoLabel = 'Telegram Username';
	} else if (whereToContact == 'DC') {
		contactInfoLabel = 'Discord Username';
	} else if (whereToContact == 'FA') {
		contactInfoLabel = 'FurAffinity Username';
	} else {
		contactInfoLabel = 'Username for contact';
	}

	$: if (statusToAssign && order && order.statuses && (assign || unassign)) {
		if (
			assign &&
			order.statuses.filter((stat) => {
				return statusToAssign == stat.id;
			}).length > 0
		) {
			btnDisabled = true;
		} else if (
			unassign &&
			order.statuses.filter((stat) => {
				return statusToAssign == stat.id;
			}).length == 0
		) {
			btnDisabled = true;
		} else {
			btnDisabled = false;
		}
	} else {
		console.log('No status selected');

		btnDisabled = true;
	}
</script>

<PageViewTelemetry />

<Notification bind:form />

<div class="main-container">
	<a class="yl-btn" href="/commission-orders">Back to Commission Orders</a>
	{#if order}
		<div class="card-container">
			<Card h1={'Order ' + order.id + ': requested by ' + order.customer_name}>
				{#if !$adminStore.loggedIn}
					<p style:font-style="italic" style:font-size="14px">
						Note: for your privacy, some information is only viewable by Scuzzy.
					</p>
					<p>
						If you have any questions about the contents of your order, please <a
							href="/contact?contactOnly=true">contact Scuzzy.</a
						>
					</p>
				{/if}
				<!--statuses-->
				{#if order.statuses}{#each order.statuses as status (status.id)}
						<div class="status-row">
							<section>
								<div class="status-color-block" style:background-color={status.color} />
							</section>
							<section>{status.status}</section>
						</div>
					{/each}
				{/if}
				{#if $adminStore.loggedIn}
					{#if order.email}
						<div class="content-box">
							<a href={`mailto:${order.email}`}>{order.email}</a>
						</div>
					{/if}
					{#if order.where_to_contact && order.contact_info}
						<div class="content-box">
							<p>
								{order.where_to_contact == 'TG'
									? 'Telegram'
									: order.where_to_contact == 'DC'
									? 'Discord'
									: 'FurAffinity'}: {order.contact_info}
							</p>
						</div>
					{/if}
					{#if order.subtotal}
						<div class="content-box"><p>Subtotal: ${order.subtotal}</p></div>
					{/if}
					{#if order.commissionData}
						<div class="content-box">
							<a href={`/commissions/${order.commissionData.slug}`}>{order.commissionData.title}</a>
						</div>
					{/if}
					{#if order.character_references}
						<h2>References ({order.number_of_characters} characters):</h2>
						{#each order.character_references as ref, index (ref.id)}
							<div class="content-box">
								<p>{index + 1}. {ref.character_name}</p>
								{#if ref.image_url}
									<a class="image" href={ref.image_url} target="_blank">
										<img
											src={ref.image_url}
											alt={`Ref image for ${ref.character_name} from order ${order.id}`}
										/>
									</a>
								{/if}
								{#if ref.link}
									<p>{ref.link}</p>
								{/if}
								{#if ref.text_description}
									<p>{ref.text_description}</p>
								{/if}
							</div>
						{/each}
					{/if}
					{#if order.commission_description}
						<h2>Commission Description</h2>
						<div class="content-box">
							<p style:line-height="1.6">{order.commission_description}</p>
						</div>
					{/if}

					{#if order.extra_character_details}
						<h2>Critical Details</h2>
						<div class="content-box">
							<p style:line-height="1.6">{order.extra_character_details}</p>
						</div>
					{/if}

					{#if order.selected_options}
						<h2>Options:</h2>
						{#each order.selected_options as option}
							<div class="content-box" style:padding={'0'}>
								<div class="option-row">
									<section style:margin="0.5rem">
										{option.name}
									</section>
									<section>
										<img class="option-image" src={option.example_image_url} alt="example option" />
									</section>
								</div>
								<div class="option-description" style:margin="0.5rem">
									<p>{option.description}</p>
									<p>${option.cost}</p>
								</div>
							</div>
						{/each}
					{/if}

					{#if order.customer_sketch}
						<h2>Customer Sketch:</h2>
						<a href={order.customer_sketch} target="_blank">
							<img src={order.customer_sketch} alt={'customer sketch'} />
						</a>
					{/if}
				{/if}

				<!--Scuzzy's note-->

				{#if order.artist_note}
					<h2>Note from Scuzzy:</h2>
					<div class="content-box">
						<p
							style:color={order.artist_note.toLocaleLowerCase().includes('rejected')
								? 'red'
								: null}
						>
							{order.artist_note}
						</p>
					</div>
				{/if}
				<!--Completed-->
				{#if order.completed}
					<p>ORDER COMPLETE</p>
				{/if}
				{#if order.created}
					<p class="dates">Order created: {new Date(order.created).toLocaleString()}</p>
				{/if}
				{#if order.modified}
					<p class="dates">Order last modified: {new Date(order.modified).toLocaleString()}</p>
				{/if}
			</Card>
		</div>
		{#if $adminStore.loggedIn && statuses}
			<div class="card-container">
				<Card h3={assign ? 'Assign Status' : 'Unassign Status'}>
					<div class="form-container">
						<form action="?/assignStatus" method="POST">
							<input type="hidden" name="order" bind:value={order.id} />
							<SelectInput
								options={statuses.map((stat) => {
									return { label: stat.status, value: stat.id };
								})}
								placeholder={assign ? 'Status to Assign' : 'Status to Unassign'}
								name="status_id"
								inputId="status-assignment-input"
								required={true}
								bind:value={statusToAssign}
							/>
							<BooleanInput
								name="assign"
								inputId="assign-status-checkbox"
								required={false}
								bind:checked={assign}
								placeholder="Assign?"
							/>
							<BooleanInput
								name="unassign"
								inputId="unassign-status-checkbox"
								required={false}
								bind:checked={unassign}
								placeholder="Unassign?"
							/>

							<button class="yl-btn" disabled={btnDisabled} type="submit"
								>{assign ? 'Assign Status' : 'Unassign Status'}</button
							>
						</form>
					</div>
				</Card>
			</div>
			{#if (artist_note == '' || artist_note) && order}
				<div class="card-container">
					<Card h3="Add or Edit Note">
						<form action="?/editArtistNote" method="POST" autocomplete="off">
							<input type="hidden" name="order" value={order.id} />
							<TextAreaInput
								name="artist_note"
								bind:value={artist_note}
								inputId="edit-artists-note-input"
								required={true}
								placeholder="Artist's Note"
							/>
							<button type="submit" class="yl-btn">Edit Artist Note</button>
						</form>
					</Card>
				</div>
			{/if}
			{#if order}
				<div class="card-container">
					<Card h3="Modify Order">
						<form action="?/modifyOrder" method="POST" autocomplete="off">
							<input type="hidden" name="order" value={order.id} />

							<TextInput
								name="customer_name"
								required={true}
								inputId="customer-name-input"
								bind:value={customerName}
								placeholder="Customer Name"
							/>

							<SelectInput
								required={true}
								name="where_to_contact"
								inputId="where-to-contact-select-input"
								placeholder="Where to Contact?"
								options={[
									{ label: 'Telegram', value: 'TG' },
									{ label: 'Discord', value: 'DC' },
									{ label: 'FurAffinity', value: 'FA' }
								]}
								bind:value={whereToContact}
							/>

							<TextInput
								name="contact_info"
								required={true}
								inputId="customer-contact-info-input"
								bind:value={contactInfo}
								placeholder={contactInfoLabel}
							/>

							<EmailInput
								name="email"
								required={true}
								inputId="customer-email-input"
								bind:value={email}
								placeholder="E-mail"
								autocomplete="on"
							/>

							<NumberInput
								name="number_of_characters"
								required={true}
								bind:value={characterCount}
								placeholder="How many characters?"
								inputId="customer-character-count-input"
							/>

							<TextAreaInput
								name="commission_description"
								required={true}
								bind:value={commissionDescription}
								placeholder="Describe commission"
								inputId="commission-order-description"
							/>
							<BooleanInput
								name="adult"
								required={false}
								bind:checked={adult}
								placeholder="Commission is NSFW?"
								inputId="commission-adult-rating-input"
							/>
							<BooleanInput
								name="abdl"
								required={false}
								bind:checked={abdl}
								placeholder="Commission has ABDL/babyfur content?"
								inputId="commission-abdl-rating-input"
							/>
							<TextAreaInput
								name="extra_character_details"
								required={false}
								bind:value={extraCommissionDescription}
								placeholder="Critical Details"
								inputId="commission-order-extra-character-details"
							/>
							<BooleanInput
								name="completed"
								required={false}
								bind:checked={completed}
								placeholder="Completed?"
								inputId="order-completed-input"
							/>
							<button class="yl-btn" type="submit">Modify Order</button>
						</form>
					</Card>
				</div>
				{#if options && options != 'null'}
					<div class="card-container">
						<Card h3="Add/Remove Option">
							<form action="?/addRemoveOption" method="POST" autocomplete="off">
								<AddRemoveOptionForm {order} unfilteredOptions={options} />
							</form>
						</Card>
					</div>
				{/if}
				<div class="card-container">
					<Card h3="Delete Order">
						<form action="?/deleteOrder" method="POST" autocomplete="off">
							<input type="hidden" name="order" value={order.id} />
							<button class="yl-btn" type="button" on:click={handleDeleteOrder}>Delete Order</button
							>
							{#if showDeletePopup}
								<Popup darken={true}>
									<div class="popup-container">
										<Card h2="Warning"
											><p>Are you sure you want to permanently delete this Order?</p>
											<div class="button-row">
												<button class="yl-lt-btn" type="button" on:click={handleDeleteOrder}
													>Cancel</button
												>
												<button class="yl-btn" type="submit">Delete Order</button>
											</div>
										</Card>
									</div>
								</Popup>
							{/if}
						</form>
					</Card>
				</div>
			{/if}
		{/if}
	{/if}
</div>

<style>
	.image {
		width: 100%;
	}
	img {
		width: 100%;
	}
	.dates {
		font-size: 14px;
		color: var(--btn-clr-deact-txt);
	}
	.content-box {
		padding: 0.5rem;
		border: 2px solid var(--btn-clr-avail);
		overflow: hidden;
		margin: 0.5rem;
	}
	.content-box > p {
		margin: 0;
	}
	.status-color-block {
		height: 16px;
		width: 16px;
		display: inline-block;
		border-radius: 16px;
	}

	.status-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		flex: 1 1 0px;
		gap: 0.5rem;
	}
	.main-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 15px;
		margin-top: 0px;
		gap: 1rem;
	}
	.yl-btn {
		display: block;
		box-sizing: border-box;
		background-color: var(--accnt-clr);
		color: var(--white-txt);
		text-decoration: none;
		margin: none;
	}
	a {
		text-decoration: none;
		color: var(--link-txt-clr);
	}

	a:hover {
		text-decoration: underline;
		filter: brightness(120%) saturate(120%);
	}

	a:active {
		text-decoration: underline;
		filter: brightness(60%) saturate(150%);
	}

	form {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 1rem;
	}

	form > .yl-btn,
	div.button-row > .yl-btn {
		background-color: var(--tertiary-clr);
		color: var(--tertiary-clr-txt);
	}

	form > .yl-btn:disabled,
	div.button-row > .yl-btn:disabled {
		background-color: var(--btn-clr-deact);
		color: var(--btn-clr-deact-txt);
		font-weight: normal;
	}

	.card-container {
		width: 100%;
	}

	.button-row {
		width: 100%;
		display: flex;
		flex-basis: 1;
		flex-grow: 1;
		gap: 1rem;
		justify-content: center;
	}

	.popup-container {
		margin: 1rem;
	}
</style>
