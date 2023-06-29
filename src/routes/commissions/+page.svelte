<script lang="ts">
	import { adminStore, statusStore, userSettingsStore } from '$lib/stores';
	import mainPageBanner from '$lib/images/mainPageBanner.png'; // todo: replace with appropriate banner image
	import CommissionCard from './CommissionCard.svelte';
	import PageViewTelemetry from '$lib/PageViewTelemetry.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	export let data;
	let loading: boolean = false;
	let commissions: any[];
	let forceNsfw: boolean = false;
	let forceAbdl: boolean = false;
	let innerWidth: number;

	let pageTitle = 'ScuzzyFox Commissions | Custom furry art for you and your friends!';
	let pageDescription =
		'Looking for a Furry artist to draw your next idea? ScuzzyFox offers commissions! SFW, NSFW, and ABDL commissions are available.';
	let pageImage = mainPageBanner;
	function assignData() {
		loading = true;
		if (!data.commissions) {
			setTimeout(assignData, 200);
		} else {
			forceNsfw = $page.url.searchParams.get('fn')?.toLocaleLowerCase() === 'true';
			forceAbdl = $page.url.searchParams.get('fa')?.toLocaleLowerCase() === 'true';
			commissions = data.commissions;
			if (!$adminStore.loggedIn) {
				commissions = commissions.filter((com) => {
					return com.visible;
				});
			}

			//realistically, there arent' going to be any nsfw or abdl commissions, but
			//their visuals might be.
			if (!forceNsfw && !$userSettingsStore.nsfwAllowed) {
				commissions = commissions.filter((com) => {
					return !com.adult;
				});
			}

			if (!forceAbdl && !$userSettingsStore.abdlAllowed) {
				commissions = commissions.filter((com) => {
					return !com.adult;
				});
			}

			let featuredCommissions = commissions.filter((com) => {
				return com.featured;
			});

			if (featuredCommissions.length == 0) {
				featuredCommissions = commissions;
			}

			let upperBound = featuredCommissions.length - 1;
			let featuredCommission =
				featuredCommissions[Math.floor(Math.random() * (upperBound - 0 + 1) + 0)];

			pageImage = featuredCommission.ad_image_url;
		}
		loading = false;
	}

	onMount(assignData);
</script>

<PageViewTelemetry />
<svelte:window bind:innerWidth />

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={pageImage} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:title" content={pageTitle} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:site" content="@scuzzyfox" />
	<meta name="twitter:creator" content="@scuzzyfox" />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content={pageImage} />
</svelte:head>

<div class="main-content">
	<div class="link-btn-container">
		{#if $adminStore.loggedIn}
			<a class="link-btn" href="/admin/commissions">Commissions Admin</a>
		{/if}
		<a href="/commission-orders" class="link-btn">To Orders Page</a>
	</div>

	{#if $statusStore.commissions_open || $adminStore.loggedIn}
		<div class="info-box">
			<p>Welcome to Scuzzy's Commissions page!</p>
			<p>
				Commissions are currently <span style:font-weight="900" style:color="rgb(7, 196, 7)"
					>Open</span
				>, so find one you like and fill out an order request!
			</p>
			<p>
				If you have any questions, don't hesitate to <a href="/contact?contactOnly=true"
					>reach out to scuzzy!</a
				>
			</p>

			<p>
				Wanna get notified when I open? Check out my <a href="https://t.me/ScuzzyFoxCommsBot"
					>Telegram Bot</a
				>
				or <a href="/discord">Discord Server</a>!
			</p>

			<p>Don't forget to <a href="/tos">read the TOS</a>!</p>
		</div>
	{:else}
		<div class="info-box">
			<p>Welcome to Scuzzy's Commissions page!</p>
			<p>
				Commissions are currently <span
					style:color="var(--btn-clr-deact-txt)"
					style:font-weight="900">Closed.</span
				>
			</p>
			<p>
				Wanna get notified when I open? Check out my <a href="https://t.me/ScuzzyFoxCommsBot"
					>Telegram Bot</a
				>
				or <a href="/discord">Discord Server</a>!
			</p>
			<p><a href="/tos">Click here</a> if you're looking for the TOS.</p>
		</div>
	{/if}

	<div class="commission-cards">
		{#if commissions && !loading && innerWidth}
			{#each commissions as commission}
				{#if commission.visible || $adminStore.loggedIn}
					<!--Each card will need data: commission, orderable, shownsfw, showabdl, width/height-->
					<CommissionCard
						{commission}
						orderable={($adminStore.loggedIn || $statusStore.commissions_open) &&
							commission.visible &&
							commission.available}
						showAdult={forceNsfw || $userSettingsStore.nsfwAllowed}
						showAbdl={forceAbdl || $userSettingsStore.abdlAllowed}
						bind:innerWidth
					/>
				{/if}
			{/each}
		{/if}
	</div>
	<div class="info-box">
		<p>
			*Base prices shown are only estimates. Your final price will be determined when the invoice is
			sent.
		</p>
		<p>
			Final prices will be affected by yorur commission/character complexity, contentious content,
			character count, and any options chosen.
		</p>
	</div>
</div>

<style>
	.link-btn {
		display: block;
		box-sizing: border-box;
		background-color: var(--accnt-clr);
		color: var(--white-txt);
		font-family: var(--main-font);
		font-weight: 900;
		font-size: 1.1rem;
		border: none;
		border-radius: var(--radius-btn);
		padding: 0.5rem 1rem;
		box-shadow: var(--btn-drp-shdw);
		margin-top: 1rem;
		transition: var(--transition-rate);
		text-decoration: none;
		text-align: center;
		width: 100%;
	}

	.link-btn:hover {
		filter: brightness(120%) saturate(120%);
		text-decoration: underline;
	}

	.link-btn:active {
		filter: brightness(60%) saturate(150%);
		text-decoration: underline;
	}

	.main-content {
		margin: 1rem;
		margin-top: 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
	}

	.info-box {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		line-height: 1.6;
		border: 1.8px solid var(--accnt-clr);
		padding: 0.5rem;
		text-align: center;
		border-radius: var(--radius-card);
		gap: 0.5rem;
	}

	.info-box > p {
		margin: 0;
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

	.commission-cards {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	.link-btn-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* Desktop mode: */
	@media (min-width: 1018px) {
		.link-btn-container {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.link-btn {
			max-width: 60vw;
			align-self: unset;
		}
	}
</style>
