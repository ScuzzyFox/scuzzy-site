<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import TextInput from '$lib/TextInput.svelte';
	import PasswordInput from '$lib/TextInput.svelte';
	import EmailInput from '$lib/TextInput.svelte';
	import FormButton from '$lib/FormButton.svelte';
	import Card from '$lib/Card.svelte';
	export let form;

	let token: string;
	let pword: string = '';
	let confirmPword: string = '';
	let matchingPwords: boolean = true;
	let pwordValid: boolean = true;
	let invalidMessage: string;
	let emailValid: boolean = false;
	let invalidEmailMessage: string;
	let email: string = '';
	let username: string = '';
	let usernameInvalidMessage: string;
	let usernameValid: boolean = false;
	let buttonEnabled = false;

	onMount(() => {
		token = $page.url.searchParams.get('token')!;
	});

	function doPwordsMatch(pword: string, confirmPword: string) {
		if (pword === confirmPword || pword.length === 0 || confirmPword.length === 0) {
			matchingPwords = true;
		} else {
			matchingPwords = false;
			pwordValid = false;
		}
	}

	function pwordPassesRegex(input: string) {
		let result = input.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}/);
		if (result) {
			return true;
		} else {
			return false;
		}
	}

	function emailPassesRegex(input: string) {
		let result = input.match(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/);
		if (result) {
			return true;
		} else {
			return false;
		}
	}

	function checkPwordValidity(pword: string) {
		if (pword.length < 8 && pword) {
			pwordValid = false;
			invalidMessage = 'Password is not long enough.';
		} else {
			pwordValid = true;
			invalidMessage = '';
		}

		if (!pwordPassesRegex(pword) && pword) {
			pwordValid = false;
			invalidMessage =
				'Password must contain Capital+lowercase letters, numbers, and special characters';
		} else {
			pwordValid = true;
			invalidMessage = '';
		}
	}

	function checkEmailValidity(email: string) {
		if (email.length && !emailPassesRegex(email)) {
			emailValid = false;
			invalidEmailMessage = 'Please enter a valid email address.';
		} else {
			emailValid = true;
			invalidEmailMessage = '';
		}
	}

	function checkUsernameValidity(username: string) {
		if (username && username.length > 15) {
			usernameValid = false;
			usernameInvalidMessage = 'Username is too long.';
		} else {
			usernameValid = true;
			usernameInvalidMessage = '';
		}
	}

	$: doPwordsMatch(pword, confirmPword);
	$: checkPwordValidity(pword);
	$: checkEmailValidity(email);
	$: checkUsernameValidity(username);
	$: username = username.toLowerCase();
	$: if (
		usernameValid &&
		emailValid &&
		pwordValid &&
		matchingPwords &&
		username &&
		email &&
		pword &&
		confirmPword
	) {
		buttonEnabled = true;
	} else {
		buttonEnabled = false;
	}
</script>

<main>
	<div class="card-body">

	<Card h1="Register as a Site Admin!">
		<form method="POST">
			<TextInput
				name={'username'}
				inputId={'username-input'}
				bind:value={username}
				required={true}
				placeholder={'Username'}
			/>
			<EmailInput
				name={'email'}
				inputId={'email-input'}
				bind:value={email}
				required={true}
				placeholder={'email'}
			/>

			<PasswordInput
				name={'password'}
				inputId={'password-input'}
				bind:value={pword}
				required={true}
				placeholder={'Password'}
			/>
			<PasswordInput
				name={'confirm-password'}
				inputId={'confirm-password-input'}
				bind:value={confirmPword}
				required={true}
				placeholder={'Confirm Password'}
			/>
			<TextInput
				name={'token'}
				inputId={'token-input'}
				bind:value={token}
				required={true}
				placeholder={'Token'}
			/>
			<FormButton buttonDisabled={!buttonEnabled} label={'Register'} />
		</form>
	</Card>
	</div>

	{#if usernameInvalidMessage}
		<p class="validity-error">{usernameInvalidMessage}</p>
	{:else if invalidEmailMessage}
		<p class="validity-error">{invalidEmailMessage}</p>
	{:else if invalidMessage}
		<p class="validity-error">{invalidMessage}</p>
	{:else}
		<p />
	{/if}

	{#if form?.failed}
		{form.message}
	{/if}
</main>

<style>
	main {
		margin: 2% 10% 10%;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		flex: 1;

		display: flex;
	}

	.card-body {
		padding: 1rem 1rem 2rem;
		box-shadow: var(--drp-shdw);

		width: 80vw;
	}







	form {
		margin-left: 5%;
		margin-right: 5%;
		display: flex;
		flex-direction: column;
		flex: 1;
		justify-content: center;
		align-items: center;
		gap: 0.8rem;
		flex-basis: 1;
	}

	.validity-error {
		color: var(--tertiary-clr);
	}

	@media (min-width: 918px) {
		.card-body {
			padding: 1rem 1rem 2rem;
			display: block;
			width: 40vw;
		}

	
	}
</style>
