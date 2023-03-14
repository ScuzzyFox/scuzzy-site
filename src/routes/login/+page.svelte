<script lang="ts">
	import { adminStore } from '$lib/stores';
	import { onMount } from 'svelte';
	export let data;
	export let form;

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
	<h1>Please Sign In.</h1>
	<form method="POST">
		<label for="username-input">
			username
			<input type="text" id="username-input" name="username" />
		</label>
		<label for="password-input">
			password
			<input type="password" id="password-input" name="password" />
		</label>
		<button>Login</button>
	</form>
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
	}
</style>
