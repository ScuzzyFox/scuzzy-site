<script lang="ts">
	import type { Link } from '$lib/Link';
	import { adminStore } from '$lib/stores';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import PageViewTelemetry from '$lib/PageViewTelemetry.svelte';
	import StatusForm from './StatusForm.svelte';

	export let data;

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

<PageViewTelemetry />

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

	{#if data.siteStatus}
		<p>
			Commissions: {data.siteStatus.commissions_open ? 'Open' : 'Closed'}
		</p>
		<p>Store: {data.siteStatus.store_open ? 'Open' : 'Closed'}</p>
		<p>Requests: {data.siteStatus.requests_open ? 'Open' : 'Closed'}</p>
		<p>
			Art Trades: {data.siteStatus.art_trades_open ? 'Open' : 'Closed'}
		</p>
		<p>Website views: {data.siteStatus.website_views}</p>
		<p>Page Views:</p>
		{#each data.siteStatus.page_views as pageView}
			<p>page: {pageView.pathname} | {pageView.view_count} views</p>
		{/each}
	{/if}
	<div class="status-form-container">
		<div class="status-form">
			<StatusForm />
		</div>
	</div>
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

	@media (min-width: 1010px) {
		.status-form {
			width: 70vw;
		}

		.status-form-container {
			display: flex;
			justify-content: center;
		}
	}
</style>
