<script lang="ts">
	import { adminStore } from '$lib/stores';
	import { onMount } from 'svelte';
	export let data;
	export let form;

	let username: string = '';
	let password: string = '';
	let buttonDisabled: boolean = true;
	let passwordInput: HTMLElement;

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

	function handleKeypress(event: any) {
		if (event.key === 'Enter' || event.key === 'Space' || event.key === 'ArrowDown') {
			passwordInput.focus();
		}
	}
</script>

<main>
	<div class="login-card-hat">
		<h1>Log in</h1>
	</div>
	<div class="login-card">
		<form method="POST">
			<label for="username-input">
				<input
					type="text"
					id="username-input"
					name="username"
					bind:value={username}
					required={true}
					on:keypress={handleKeypress}
				/>
				<span class="label-text">Username</span>
			</label>
			<label for="password-input">
				<input
					type="password"
					id="password-input"
					name="password"
					required={true}
					bind:value={password}
					bind:this={passwordInput}
				/>
				<span class="label-text">Password</span>
			</label>
			<button disabled={buttonDisabled}>Login</button>
		</form>
	</div>
</main>

<style>
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

	label {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 0.2rem;
		position: relative;
	}

	button {
		background-color: var(--tertiary-clr);
		color: var(--tertiary-clr-txt);
		font-family: var(--main-font);
		font-weight: 900;
		font-size: 1.1rem;
		border: none;
		border-radius: var(--radius-btn);
		padding: 0.5rem 1rem;
		align-self: flex-end;
		box-shadow: var(--btn-drp-shdw);
		margin-top: 1rem;
		transition: var(--transition-rate);
	}

	button:disabled {
		background-color: var(--btn-clr-deact);
		color: var(--btn-clr-deact-txt);
		font-weight: normal;
	}

	button:hover {
		filter: brightness(120%) saturate(120%);
	}

	button:active {
		filter: brightness(60%) saturate(150%);
	}

	button:disabled:hover,
	button:disabled:active {
		filter: none;
	}

	input {
		padding: 0.5rem;
		border: none;
		border-radius: 0;
		border-top-left-radius: var(--radius-btn);
		border-top-right-radius: var(--radius-btn);
		border: 2px solid rgba(0, 0, 0, 0);
		border-bottom: 2px solid var(--accnt-clr);
		background-color: var(--card-clr);
		color: var(--white-txt);
		transition: var(--transition-rate);
	}

	input:focus {
		border-radius: var(--radius-card);
		border: none;
		outline: none;
		border: 2px solid var(--accnt-clr);
	}

	.label-text {
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		color: var(--btn-clr-deact-txt);
		transition: var(--transition-rate);
	}

	input:focus ~ span {
		color: var(--accnt-clr);
		transform: translate(20px, -50%);
		font-size: 0.9rem;
		background-color: var(--card-clr);
	}

	input:valid ~ span {
		color: var(--accnt-clr);
		top: 0;
		transform: translate(20px, -50%);
	}

	input:-webkit-autofill,
	input:autofill {
		padding: 0.5rem;

		border: 2px solid rgba(0, 0, 0, 0);
		-webkit-border: 2px solid rgba(0, 0, 0, 0);
		border-bottom: 2px solid var(--accnt-clr);
		background-color: var(--card-clr);
		transition: var(--transition-rate);
		color: var(--tertiary-clr);

		-webkit-text-fill-color: var(--tertiary-clr);
		-webkit-box-shadow: 0 0 0px 1000px var(--card-clr) inset;
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
