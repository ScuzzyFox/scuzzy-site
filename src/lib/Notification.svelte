<script lang="ts">
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';

	export let form: any;
	let debug = false;

	function clearButton(event: any) {
		let btn = event.target;
		let btnNumber: number = btn.dataset.pos;
		form.notifications = form.notifications.filter((notif: any, index: number) => {
			return !(index == btnNumber);
		});
	}

	//notifications should be in the form of {type, message}

	onMount(() => {
		if (debug) {
			console.log('Notification debug = true');
			form = {};
			form.notifications = [
				{
					type: 'error',
					message: 'There was some sort of error adfhaoudfho-aisdfgoaiysdf-giysdiydf'
				},
				{
					type: 'info',
					message: 'Here is an informational message, please take it like you take my fat c--'
				},
				{
					type: 'success',
					message: 'BROOOOOO YOU DID IT!!'
				},
				{
					type: 'message',
					message:
						"This is some sort of an information. You're gonna take it and you're gonna like it."
				}
			];
		}
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
	/>
</svelte:head>

{#if form && form.notifications && form.notifications.length > 0}
	<div class="popup-container">
		{#each form.notifications as notification, index (notification.message)}
			<div
				class="notification"
				class:message={notification.type.toLocaleLowerCase() === 'message'}
				class:success={notification.type.toLocaleLowerCase() === 'success'}
				class:error={notification.type.toLocaleLowerCase() === 'error'}
				class:info={notification.type.toLocaleLowerCase() === 'info'}
				animate:flip={{ duration: 200 }}
				transition:fly={{ x: -500, duration: 250 * (1 + index / 5) }}
			>
				{#if notification.message.toLocaleLowerCase().includes('<html') || notification.message
						.toLocaleLowerCase()
						.includes('<html>') || notification.message
						.toLocaleLowerCase()
						.includes('<!doctype html>')}
					{@html notification.message}
				{:else}
					{notification.message}
				{/if}

				<button
					on:click={clearButton}
					data-pos={index}
					class:buttonMessage={notification.type.toLocaleLowerCase() === 'message'}
					><span class="material-symbols-outlined" data-pos={index}> close </span></button
				>
			</div>
		{/each}
	</div>
{/if}

<style>
	.popup-container {
		display: flex;
		position: absolute;
		top: 1rem;
		width: 100%;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
	}

	.notification {
		margin: 0 0.3rem;
		padding: 1rem;
		display: flex;
		flex-direction: row;
		gap: 1rem;
		justify-content: space-evenly;
		align-items: center;
		border-radius: var(--radius-btn);
		z-index: 10000;
		font-weight: 900;
		box-shadow: var(--btn-drp-shdw);
		overflow-wrap: break-word;
	}

	.error {
		background-color: red;
		color: var(--white-txt);
	}

	.message {
		background-color: var(--tertiary-clr);
		color: var(--tertiary-clr-txt);
	}

	.success {
		background-color: green;
		color: var(--white-txt);
	}

	.info {
		background-color: var(--accnt-clr);
		color: var(--white-txt);
	}

	button {
		background-color: transparent;
		outline: none;
		border: none;
		box-sizing: border-box;
		transition: filter 200ms;
		color: var(--white-txt);
	}
	button.buttonMessage {
		color: var(--tertiary-clr-txt);
	}

	button:hover {
		filter: brightness(60%) saturate(120%);
	}

	button:active {
		filter: brightness(80%) saturate(150%);
	}
</style>
