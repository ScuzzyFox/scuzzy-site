<script lang="ts">
	import { userSettingsStore } from '$lib/stores';
	import { adminStore } from '$lib/stores';
	import { page } from '$app/stores';
	import { fly, fade } from 'svelte/transition';
	import TextInput from '$lib/TextInput.svelte';
	import PasswordInput from '$lib/PasswordInput.svelte';
	import FormButton from '$lib/FormButton.svelte';

	let displayLogin: boolean = false;
	let username: string = '';
	let password: string = '';
	let buttonDisabled: boolean = true;

	$: username = username.toLowerCase();

	$: if (!username || !password) {
		buttonDisabled = true;
	} else {
		buttonDisabled = false;
	}

	function handleLogIn(e: any) {
		displayLogin = !displayLogin;
	}
</script>

<div class="main">
	{#if $adminStore.loggedIn}
		<form method="POST" action="/admin?/logout">
			<!-- <a href="/logout">Log Out</a> -->
			<input type="hidden" name="currentUrl" value={$page.url.pathname} />
			<button class="logout-link">Log out</button>
		</form>
		<a href="/admin">Admin</a>
	{:else}
		<button type="button" class="logout-link" on:click={handleLogIn}>Log in</button>
	{/if}
	{#if $userSettingsStore.adultAgreed}
		<a href="/settings">Site Settings</a>
	{/if}
	<p class="copyright">©ScuzzyFox 2023. All rights reserved.</p>
</div>
{#if displayLogin}
	<div class="login-darkness" transition:fade={{ duration: 250 }}>
		<div class="popup-container" transition:fly={{ y: -600, duration: 250 }}>
			<div class="popup-hat">
				<h2>Log in as admin!</h2>
			</div>
			<div class="popup-body">
				<form method="POST" action="/login?/logmein">
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

					<input type="hidden" name="redirectTo" value={$page.url.pathname} />

					<div class="btn-row">
						<button type="button" on:click={handleLogIn} class="cancel-btn">Cancel</button>
						<FormButton {buttonDisabled} label={'Log in'} />
					</div>
				</form>
			</div>
		</div>
	</div>
{/if}

<style>
	.main {
		background-color: var(--main-lt-clr);

		padding: 0.8rem;
		color: var(--white-txt);
		display: flex;
		flex-direction: column;
	}
	.logout-link {
		display: inline;
		width: fit-content;
	}
	a,
	.logout-link {
		text-decoration: none;
		color: var(--link-txt-clr);
		background-color: unset;
		margin: 0;
		padding: 0;
		border: none;
		font-size: 1rem;
		font-weight: normal;
		font-family: inherit;
	}

	a:hover,
	.logout-link:hover {
		text-decoration: underline;
		filter: brightness(120%) saturate(120%);
	}

	a:active,
	.logout-link:active {
		text-decoration: underline;
		color: var(--link-txt-clr-actv);
	}

	.login-darkness {
		position: fixed;
		z-index: 91;
		background-color: rgba(0, 0, 0, 0.65);

		top: 0;
		left: 0;
		bottom: 0;
		right: 0;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.popup-container {
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.popup-hat {
		background-color: var(--card-clr-scnd);
		border-top-left-radius: var(--radius-card);
		border-top-right-radius: var(--radius-card);
	}

	.popup-hat > h2 {
		margin: 0;
	}

	.popup-body {
		background-color: var(--card-clr);
		border-bottom-left-radius: var(--radius-card);
		border-bottom-right-radius: var(--radius-card);
	}

	.popup-hat,
	.popup-body {
		padding: 1rem;
	}

	.cancel-btn {
		background-color: var(--tertiary-lt-clr);
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
	}

	.cancel-btn:hover {
		filter: brightness(120%) saturate(120%);
	}

	.cancel-btn:active {
		filter: brightness(60%) saturate(150%);
	}

	.btn-row {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	@media (min-width: 1010px) {
		.popup-container {
			width: 60vw;
		}
	}
</style>
