<script lang="ts">
	export let data: any;
	//if data.userSettings is truthy, then we should display the user settings here, check boxes to be able to change the data
	//todo: display only the agree/disagree to cookies and adult rating box if userSettings is not defined. (or should we redirect?)
	//once they click agree, nsfw and abdl ratings are set to false and their jwt cookie is stored (don't forget to textencode it)
</script>

<h1>User Settings</h1>

{#if data.userSettings}
	<!--Display settings options. upon changing a checkbox, their cookie is instantly updated?-->
	<p>nsfwAllowed: {data.userSettings.nsfwAllowed}</p>
	<p>abdlAllowed: {data.userSettings.abdlAllowed}</p>
{:else}
	<!--Display the adult and cookies agreement-->
	<p>Not "logged in"</p>
{/if}
