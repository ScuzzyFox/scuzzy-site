<script lang="ts">
	let pageTitle = 'Contact ScuzzyFox';
	let pageDescription = 'Need to get in touch with Scuzzy? Here are multiple ways to reach out!';
	// @ts-ignore
	import contactScuzzy from '$lib/images/contactScuzzy.png?webp';
	import { userSettingsStore } from '$lib/stores';
	import { adminStore } from '$lib/stores';
	import type { Link, LinkCF } from '$lib/Link';
	import { page } from '$app/stores';
	import Linktree from './Linktree.svelte';

	let linkFilter: string;
	let linkForceAbdl: boolean;
	let linkForceNsfw: boolean;
	let linkCopied: boolean = false;
	let copyLinkContent: string;

	$: copyLinkContent = `${$page.url.origin}/contact?${!!linkForceNsfw ? 'forceNsfw=true&' : ''}${
		!!linkForceAbdl ? 'forceAbdl=true&' : ''
	}${linkFilter ? linkFilter + '=true&' : ''}`;

	$: if (copyLinkContent.at(-1) === '&' || copyLinkContent.at(-1) === '?') {
		copyLinkContent = copyLinkContent.slice(0, copyLinkContent.length - 1);
	}

	//this sets link copied to false if copyLinkContent changes.
	$: {
		copyLinkContent;
		linkCopied = false;
	}

	let telegram: Link = {
		href: 'https://t.me/scuzzyfox',
		name: 'Telegram'
	};
	let discord: Link = {
		name: 'Discord',
		href: 'https://discordapp.com/users/262321678837612554'
	};
	let scuzzyfox: Link = {
		name: 'ScuzzyFox.com',
		href: '/'
	};
	let furaffinity: Link = {
		name: 'Fur Affinity',
		href: 'https://www.furaffinity.net/user/scuzzyfox'
	};
	let e621: LinkCF = {
		name: 'e621 Tag',
		href: 'https://e621.net/posts?tags=scuzzyfox',
		nsfw: true,
		abdl: false
	};

	let e926: Link = {
		name: 'e926 Tag',
		href: 'https://e926.net/posts?tags=scuzzyfox'
	};

	let twitter: Link = {
		name: 'Twitter',
		href: 'https://twitter.com/scuzzyfox'
	};

	let twitterSmut: LinkCF = {
		name: 'Twitter (NSFW)',
		href: 'https://twitter.com/scuzzysmut',
		nsfw: true,
		abdl: false
	};
	let twitterAbdl: LinkCF = {
		name: 'Twitter (babyfur)',
		href: 'https://twitter.com/scuzzykit',
		nsfw: false,
		abdl: true
	};
	let discordServer: LinkCF = {
		name: 'Discord Server',
		href: 'https://discord.gg/hE5w9SzSVw',
		nsfw: true,
		abdl: false
	};

	let email: Link = {
		name: 'email',
		href: 'mailto:scuzzyfox@gmail.com'
	};

	let TGChannel: Link = {
		name: 'SFW Telegram Channel',
		href: 'https://t.me/ScuzzyArtSFW'
	};

	let NSFWTGChannel: LinkCF = {
		name: 'NSFW Telegram Channel',
		href: 'https://t.me/ScuzzyArtNSFW',
		nsfw: true,
		abdl: false
	};

	let TGGroup: LinkCF = {
		name: 'Telegram Group',
		href: 'https://t.me/ScuzzyFoxChat',
		nsfw: true,
		abdl: false
	};

	let directContact: (Link | LinkCF)[] = [telegram, discord];

	let galleries: (Link | LinkCF)[] = [
		scuzzyfox,
		e621,
		furaffinity,
		twitter,
		twitterSmut,
		twitterAbdl,
		discordServer,
		TGGroup,
		NSFWTGChannel,
		TGChannel
	];

	let lessResponsive: (Link | LinkCF)[] = [twitter, twitterSmut, twitterAbdl, email];

	let twitters: (Link | LinkCF)[] = [twitter, twitterSmut, twitterAbdl];

	let telegrams: (Link | LinkCF)[] = [telegram, TGGroup, NSFWTGChannel, TGChannel];

	let galleriesOnly: boolean,
		twitterOnly: boolean,
		contactOnly: boolean,
		allContact: boolean,
		forceNsfw: boolean,
		forceAbdl: boolean,
		allowNsfw: boolean,
		allowAbdl: boolean;

	$: galleriesOnly = $page.url.searchParams.get('galleriesOnly')?.toLocaleLowerCase() === 'true';
	$: twitterOnly = $page.url.searchParams.get('twitterOnly')?.toLocaleLowerCase() === 'true';
	$: contactOnly = $page.url.searchParams.get('contactOnly')?.toLocaleLowerCase() === 'true';
	$: allContact = $page.url.searchParams.get('allContact')?.toLocaleLowerCase() === 'true';
	$: allTelegram = $page.url.searchParams.get('allTelegram')?.toLocaleLowerCase() === 'true';
	$: forceNsfw = $page.url.searchParams.get('forceNsfw')?.toLocaleLowerCase() === 'true';
	$: forceAbdl = $page.url.searchParams.get('forceAbdl')?.toLocaleLowerCase() === 'true';

	$: if (forceNsfw || $userSettingsStore.nsfwAllowed) {
		allowNsfw = true;
	} else {
		allowNsfw = false;
	}

	$: if (forceAbdl || $userSettingsStore.abdlAllowed) {
		allowAbdl = true;
	} else {
		allowAbdl = false;
	}

	$: if (!onlyOneTrue([galleriesOnly, twitterOnly, contactOnly, allContact])) {
		//set all params to false if more than one is set to true.
		galleriesOnly = false;
		twitterOnly = false;
		contactOnly = false;
		allContact = false;
		allTelegram = false;
	}

	function onlyOneTrue(array: boolean[]) {
		let count = 0;
		for (let i = 0; i < array.length; i++) {
			if (array[i] === true) {
				count++;
			}
			if (count > 1) {
				return false;
			}
		}
		if (count > 1) {
			return false;
		} else {
			return true;
		}
	}

	function handleLinkButton(e: any) {
		navigator.clipboard.writeText(copyLinkContent);
		linkCopied = true;
	}
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={contactScuzzy} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:title" content={pageTitle} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:site" content="@scuzzyfox" />
	<meta name="twitter:creator" content="@scuzzyfox" />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content={contactScuzzy} />
</svelte:head>

<main>
	<h1>Where to Find Me!</h1>
	<div class="grid">
		{#if galleriesOnly}
			<Linktree {allowNsfw} {allowAbdl} title="Galleries and Social" links={galleries} />
		{:else if twitterOnly}
			<Linktree {allowNsfw} {allowAbdl} title="Scuzzy on Twitter" links={twitters} />
		{:else if contactOnly}
			<Linktree {allowNsfw} {allowAbdl} title="Direct Contact" links={directContact} />
		{:else if allContact}
			<Linktree {allowNsfw} {allowAbdl} title="Direct Contact" links={directContact} />
			<Linktree {allowNsfw} {allowAbdl} title="Less Responsive Options" links={lessResponsive} />
		{:else if allTelegram}
			<Linktree {allowNsfw} {allowAbdl} title="All Telegrams!" links={telegrams} />
		{:else}
			<Linktree {allowNsfw} {allowAbdl} title="Direct Contact" links={directContact} />
			<Linktree {allowNsfw} {allowAbdl} title="Galleries and Social" links={galleries} />
			<Linktree {allowNsfw} {allowAbdl} title="Less Responsive Options" links={lessResponsive} />
		{/if}
	</div>
	{#if $adminStore.loggedIn}
		<div class="admin-container">
			<h2>Copy a link to share!</h2>

			<label for="select-only" />

			<label for="force-nsfw">
				Force NSFW?
				<input type="checkbox" id="force-nsfw" bind:checked={linkForceNsfw} />
			</label>
			<label for="force-abdl">
				Force ABDL?
				<input type="checkbox" id="force-abdl" bind:checked={linkForceAbdl} />
			</label>

			<label for="link-filter-selector">
				Filter Options:
				<select id="link-filter-selector" bind:value={linkFilter}>
					<option value="">Show All</option>
					<option value="galleriesOnly">Just Galleries</option>
					<option value="twitterOnly">Just Twitters</option>
					<option value="contactOnly">Just Direct Contact</option>
					<option value="allContact">All Contact</option>
				</select>
			</label>

			<div class="copy-link-container">
				<button class="link-display" type="button" on:click={handleLinkButton}>
					{copyLinkContent}
				</button>
				<button
					class={'copy-link-btn' + `${linkCopied ? ' link-copied' : ''}`}
					type="button"
					on:click={handleLinkButton}>{linkCopied ? 'Link Copied!' : 'Copy Link'}</button
				>
			</div>
		</div>
	{/if}
</main>

<style>
	* {
		box-sizing: border-box;
	}
	main {
		margin: 2% 2% 10%;
		text-align: center;
	}
	.grid {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 0;
		align-items: baseline;
		flex: 1 1 0px;
	}

	.admin-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.link-display {
		font: inherit;
		background-color: transparent;
		color: var(--tertiary-clr);
		border: none;
		cursor: pointer;
	}

	.copy-link-btn {
		font: inherit;
		font-weight: 900;
		background-color: var(--tertiary-clr);
		border: none;
		padding: 0.5rem;
		color: var(--tertiary-clr-txt);
		border-radius: var(--radius-btn);
		box-shadow: var(--btn-drp-shdw);
	}

	.copy-link-btn.link-copied {
		background-color: var(--tertiary-lt-clr);
		font-weight: normal;
	}

	.copy-link-btn:hover,
	.link-display:hover {
		filter: brightness(120%) saturate(120%);
	}

	.copy-link-btn:active,
	.link-display:active {
		filter: brightness(60%) saturate(120%);
	}
</style>
