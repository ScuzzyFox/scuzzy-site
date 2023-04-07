<script lang="ts">
	import type { Link } from '$lib/Link';
	import Wip from '$lib/Wip.svelte';
	import mainPageBanner from '$lib/images/mainPageBanner.png'; // todo: replace with appropriate banner image
	import CommissionCard from './CommissionCard.svelte';
	let pageTitle = 'ScuzzyFox Commissions | Custom furry art for you and your friends!';
	let pageDescription =
		'Looking for a Furry artist to draw your next idea? ScuzzyFox offers commissions! SFW, NSFW, and ABDL commissions are available.';
	let srcset: Link[] = [
		{
			href: 'http://api.scuzzyfox.com/media/goals/images/3dadc582-e48e-445b-96e8-6c904e286de5.png',
			name: 'S-pen'
		},
		{
			href: 'http://api.scuzzyfox.com/media/goals/images/cae26f8f-1b12-45e3-bbc6-97471123a762.jpg',
			name: "3d Printer"
		},
		{
			href: 	"http://api.scuzzyfox.com/media/goals/images/d56e3d18-016a-4e69-881f-93aa26846929.jpg",
			name: "NAS"
		}
	];
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={mainPageBanner} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:title" content={pageTitle} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:site" content="@scuzzyfox" />
	<meta name="twitter:creator" content="@scuzzyfox" />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content={mainPageBanner} />
</svelte:head>
<Wip />

<CommissionCard title={'Big Titles'} {srcset}/>
