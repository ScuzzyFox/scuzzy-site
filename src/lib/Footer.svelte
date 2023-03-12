<script lang="ts">
	import { userSettingsStore } from '$lib/stores';
</script>

<div class="main">
	{#if $userSettingsStore.adultAgreed}
		<a href="/settings">Site Settings</a>
	{/if}
	<p class="copyright">©️ScuzzyFox 2023. All rights reserved.</p>
</div>

<style>
	.main {
		background-color: var(--main-lt-clr);

		padding: 1em;
		color: var(--white-txt);
		display: flex;
		flex-direction: column;
	}
	a {
		text-decoration: none;
		color: var(--link-txt-clr);
	}

	a:hover {
		text-decoration: underline;
		filter: brightness(120%) saturate(120%);
	}

	a:active {
		text-decoration: underline;
		color: var(--link-txt-clr-actv);
	}
</style>
