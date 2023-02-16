<script lang="ts">
	export let data: any;
	let pageTitle: string = 'User Settings';
	let pageDescription: string =
		'Change local user-based cookies settings if you have agreed to the terms.';
	import favicon from '$lib/images/logos/favicon.png';
	import { userSettingsStore } from '$lib/stores';
	//if data.userSettings is truthy, then we should display the user settings here, check boxes to be able to change the data
	//todo: display only the agree/disagree to cookies and adult rating box if userSettings is not defined. (or should we redirect?)
	//once they click agree, nsfw and abdl ratings are set to false and their jwt cookie is stored (don't forget to textencode it)
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={favicon} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:title" content={pageTitle} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:site" content="@scuzzyfox" />
	<meta name="twitter:creator" content="@scuzzyfox" />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content={favicon} />
</svelte:head>

<h1>User Settings</h1>

{#if data.userSettings}
	<!--Display settings options. upon changing a checkbox, their cookie is instantly updated?-->
	<p>nsfwAllowed: {data.userSettings.nsfwAllowed}</p>
	<p>abdlAllowed: {data.userSettings.abdlAllowed}</p>
{:else}
	<!--Display the adult and cookies agreement-->
	<p>Not "logged in"</p>
{/if}

{#if $userSettingsStore.nsfwAllowed}
	<img
		src="https://static1.e621.net/data/00/dd/00ddadacc9912e9d33e5262e61085da4.png"
		alt="porn"
		class="image"
	/>
{/if}

<style>
	.image {
		display: block;
		margin: auto;
		margin-top: 2em;
		margin-bottom: 2em;
		max-width: 70vw;
	}
</style>
