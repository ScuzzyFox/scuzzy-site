<script lang="ts">
	import { userSettingsStore } from '$lib/stores';
	import { adminStore } from '$lib/stores';
	import { page } from '$app/stores';
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
		<a href="/login">Login</a>
	{/if}
	{#if $userSettingsStore.adultAgreed}
		<a href="/settings">Site Settings</a>
	{/if}
	<p class="copyright">©ScuzzyFox 2023. All rights reserved.</p>
</div>

<style>
	.main {
		background-color: var(--main-lt-clr);

		padding: 0.8rem;
		color: var(--white-txt);
		display: flex;
		flex-direction: column;
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
</style>
