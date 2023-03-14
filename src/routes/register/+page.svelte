<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
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
		}

		if (!pwordPassesRegex(pword) && pword) {
			pwordValid = false;
			invalidMessage =
				'Password must contain Capital+lowercase letters, numbers, and special characters';
		} else {
			pwordValid = true;
		}
	}

	function checkEmailValidity(email: string) {
		if (email.length && !emailPassesRegex(email)) {
			emailValid = false;
			invalidEmailMessage = 'Please enter a valid email address.';
		} else {
			emailValid = true;
		}
	}

	function checkUsernameValidity(username: string) {
		if (username && username.length > 15) {
			usernameValid = false;
			usernameInvalidMessage = 'Username is too long.';
		} else {
			usernameValid = true;
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
	<h1>Register as a Site admin!</h1>
	<form method="POST">
		<label for="username-input">
			<div>
				Username {#if !usernameValid}<span class="pword-error">({usernameInvalidMessage})</span
					>{/if}
			</div>
			<input type="text" name="username" id="username-input" bind:value={username} />
		</label>

		<label for="email-input">
			<div>
				email {#if !emailValid}<span class="pword-error">({invalidEmailMessage})</span>{/if}
			</div>
			<input type="email" name="email" id="email-input" bind:value={email} />
		</label>

		<label for="password-input">
			<div>
				Password {#if !pwordValid}<span class="pword-error">({invalidMessage})</span>{/if}
			</div>
			<input type="password" name="password" id="password-input" bind:value={pword} />
		</label>

		<label for="confirm-password-input">
			<div>
				Confirm password {#if !matchingPwords}<span class="pword-error"
						>(Passwords do not match.)</span
					>{/if}
			</div>
			<input
				type="password"
				name="confirm-password"
				id="confirm-password-input"
				bind:value={confirmPword}
			/>
		</label>
		<label for="token-input">
			Registration token (Scuzzy should have given you this)
			<input type="text" id="token-input" bind:value={token} name="token" />
		</label>

		<button disabled={!buttonEnabled}>Register</button>
	</form>

	{#if form?.failed}
		{form.message}
	{/if}
</main>

<style>
	main {
		margin: 2% 2% 10%;
	}

	form {
		margin-left: 5%;
		margin-right: 5%;

		max-width: max-content;
	}

	label {
		display: flex;
		flex-direction: column;
		margin: 1rem 0;
	}

	.pword-error {
		display: inline;
		color: var(--tertiary-clr);
	}
</style>
