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
		background-color: #1b252e;
		padding: 1em;
		color: #f9f1ff;
		display: flex;
		flex-direction: column;
	}
	a {
		text-decoration: none;
		color: var(--link-txt-clr);
	}

	a:hover {
		text-decoration: none;
		color: var(--link-txt-clr-hvr);
	}

	a:active {
		text-decoration: none;
		color: var(--link-txt-clr-actv);
	}
</style>
