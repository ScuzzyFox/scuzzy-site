<script lang="ts">
	import { onMount } from 'svelte';
	import { adminStore } from '$lib/stores';

	let token: string;
	let chatIdsPromise: Promise<any>;
	let chatIds: any[] = [];

	function getChatIds(token: string) {
		chatIdsPromise = fetch('https://api.scuzzyfox.com/telegram/', {
			method: 'GET',
			headers: {
				Authorization: `JWT ${token}`,
				'Content-Type': 'application/json'
			}
		}).then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		});
	}

	function loadData() {
		if ($adminStore.token) {
			getChatIds($adminStore.token);
		} else {
			setTimeout(loadData, 200);
		}
	}

	onMount(() => {
		loadData();
	});
</script>

{#await chatIdsPromise}
	<h1>Loading Telegram Chat Id's...</h1>
{:then json}
	{#if !json || json.length === 0}
		<h1>Loading Telegram Chat Id's...</h1>
	{:else}
		<h1>Here's All the Commission Subscribers. ({json.length})</h1>
		{#each json as j (j)}
			<p>{j.chat_id}</p>
		{/each}
	{/if}
{:catch error}
	<p>Error: {error.message}</p>
{/await}
