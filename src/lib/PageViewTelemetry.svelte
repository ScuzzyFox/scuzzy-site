<script lang="ts">
	import { getPageViewAndIncrement } from '$lib/apis/site-status-api';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	onMount(async () => {
		let pageView = await getPageViewAndIncrement($page.url.hostname, $page.url.pathname);
	});
</script>
