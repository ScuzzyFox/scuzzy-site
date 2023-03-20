<script lang="ts">
	import { adminStore } from '$lib/stores';
	import { onMount } from 'svelte';
	import TextInput from '$lib/TextInput.svelte';
	import PasswordInput from '$lib/PasswordInput.svelte';
	import FormButton from '$lib/FormButton.svelte';

	export let form;

	let username: string = '';
	let password: string = '';
	let buttonDisabled: boolean = true;

	$: username = username.toLowerCase();

	$: if (!username || !password) {
		buttonDisabled = true;
	} else {
		buttonDisabled = false;
	}

	onMount(() => {
		//loading this page from a form?
		if (form?.success) {
			//is store already set?
			if (!$adminStore.loggedIn) {
				//if it's not already set, then set it!
				$adminStore = {
					username: form.userData?.username!,
					email: form.userData?.email!,
					loggedIn: true,
					token: form.userData?.jwt_auth_token!
				};
			}
		}
	});
</script>

<main>
	<div class="login-card-hat">
		<h1>Log in</h1>
	</div>
	<div class="login-card">
		<form method="POST">
			<TextInput
				inputId={'username-input'}
				name={'username'}
				bind:value={username}
				required={true}
				placeholder={'Username'}
			/>

			<PasswordInput
				inputId={'password-input'}
				name={'password'}
				bind:value={password}
				required={true}
				placeholder={'Password'}
			/>

			<FormButton {buttonDisabled} label={'Log in'} />
		</form>
	</div>

	{#if form?.fail}
		<p class="error-message">Invalid username or password.</p>
	{/if}
</main>

<style>
	.error-message {
		color: var(--tertiary-clr);
	}

	main {
		margin: 0% 5% 0%;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 60vh;
		flex: 1;
		--transition-rate: 200ms ease;
	}

	.login-card,
	.login-card-hat {
		padding: 1rem 1rem 2rem;
		display: block;
		box-shadow: var(--drp-shdw);
	}

	.login-card-hat {
		margin-top: 4rem;
		background-color: var(--card-clr-scnd);
		border-top-left-radius: var(--radius-card);
		border-top-right-radius: var(--radius-card);
		padding-bottom: 1rem;
	}

	.login-card {
		background-color: var(--card-clr);
		border-bottom-left-radius: var(--radius-card);
		border-bottom-right-radius: var(--radius-card);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	h1 {
		margin-top: 0;
	}

	form {
		margin-left: 5%;
		margin-right: 5%;

		max-width: max-content;
		display: flex;
		flex-direction: column;
		flex: 1;
		justify-content: center;
		align-items: center;
		gap: 0.8rem;
	}

	@media (min-width: 913px) {
		main {
			display: flex;
		}

		form {
			max-width: revert;
			min-width: revert;
			width: revert;
		}

		.login-card,
		.login-card-hat {
			padding: 1rem 1rem 2rem;
			display: block;
			width: 40vw;
		}

		.login-card-hat {
			padding-bottom: 1rem;
		}
	}
</style>
