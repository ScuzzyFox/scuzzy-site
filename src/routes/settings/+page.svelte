<script lang="ts">
	let pageTitle: string = 'ScuzzyFox.com | User Settings';
	let pageDescription: string =
		'Change local user-based cookies settings if you have agreed to the terms.';
	import { userSettingsStore } from '$lib/stores';
	import { fly } from 'svelte/transition';

	interface Content {
		content: string;
		nsfw: boolean;
		abdl: boolean;
	}

	let myContent: Content[] = [
		{ content: 'SFW Content Visible', nsfw: false, abdl: false },
		{ content: 'NSFW Content Visible', nsfw: true, abdl: false },
		{ content: 'ABDL Content Visible', nsfw: false, abdl: true },
		{ content: 'NSFW+ABDL Content Visible', nsfw: true, abdl: true }
	];

	let contentTest: boolean = false;
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
</svelte:head>
<main>
	<h1>User Settings</h1>
	<div class="settings">
		<label for="nsfwAllowedCheckbox">
			<h2>Display NSFW Content?</h2>
			<p>
				NSFW Content includes explicit content meant for adults like pornography, genitala, or sex.
			</p>
			<input
				type="checkbox"
				bind:checked={$userSettingsStore.nsfwAllowed}
				id="nsfwAllowedCheckbox"
			/>Yes, gimme the yiff!
		</label>
		<label for="abdlAllowedCheckbox">
			<h2>Display Diaper/Babyfur Content?</h2>
			<p>
				This includes diapers, diaper use, pacifiers, and general babyfur acts/content. This does
				NOT mean cub porn.
			</p>
			<input
				type="checkbox"
				bind:checked={$userSettingsStore.abdlAllowed}
				id="abdlAllowedCheckbox"
			/>Yes, and also I need a change.
		</label>
	</div>
	{#if contentTest}
		{#each myContent as c (c.content)}
			{#if !c.nsfw && !c.abdl}
				<h3 transition:fly={{ duration: 200, x: -500 }}>{c.content}</h3>
			{/if}

			{#if c.nsfw && !c.abdl}
				{#if $userSettingsStore.nsfwAllowed}
					<h3 transition:fly={{ duration: 200, x: -500 }}>{c.content}</h3>
				{/if}
			{/if}
			{#if !c.nsfw && c.abdl}
				{#if $userSettingsStore.abdlAllowed}
					<h3 transition:fly={{ duration: 200, x: -500 }}>{c.content}</h3>
				{/if}
			{/if}
			{#if c.nsfw && c.abdl}
				{#if $userSettingsStore.abdlAllowed && $userSettingsStore.nsfwAllowed}
					<h3 transition:fly={{ duration: 200, x: -500 }}>{c.content}</h3>
				{/if}
			{/if}
		{/each}
	{/if}
</main>

<style>
	main {
		margin: 10%;
	}

	.settings {
		display: flex;
		flex-direction: column;
		gap: 0.2em;
	}

	label {
		cursor: pointer;
		width: max-content;
	}

	@media (max-width: 913px) {
		label {
			width: revert;
		}
	}
</style>
