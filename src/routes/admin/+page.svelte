<script lang="ts">
	import type { Link } from '$lib/Link';
	import { adminStore } from '$lib/stores';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let registrationLink: string;
	let copyButton = 'Copy Link';
	async function getRegistrationLink() {
		//should this also go in some sort of api library?
		let response = await fetch('https://api.scuzzyfox.com/authentication/register/', {
			headers: {
				Authorization: 'JWT ' + $adminStore.token,
				Host: 'api.scuzzyfox.com'
			}
		});

		if (response.ok) {
			let token = await response.json();
			registrationLink = `${$page.url.origin}/register?token=${token.Token}`;
		}
	}

	function handleCopyButton() {
		navigator.clipboard.writeText(registrationLink);
		copyButton = 'Link Copied!';
	}
</script>

<main>
	<h1>Welcome {$adminStore.username}!</h1>
	<form method="POST" action="?/logout">
		<button>Log out</button>
	</form>

	<button on:click={getRegistrationLink}>Get registration link</button>
	{#if registrationLink}
		<a href={registrationLink}>{registrationLink}</a>
		<button on:click={handleCopyButton}>{copyButton}</button>
	{/if}
</main>

<style>
	main {
		margin: 2% 2% 10%;
	}

	a {
		color: var(--link-txt-clr);
		text-decoration: none;
	}

	a:hover {
		filter: brightness(120%) saturate(120%);
		text-decoration: underline;
	}

	a:active {
		color: var(--tertiary-clr);
		text-decoration: underline;
	}
</style>
