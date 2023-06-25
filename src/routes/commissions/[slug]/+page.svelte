<script lang="ts">
	import { userSettingsStore, adminStore, statusStore } from '$lib/stores';
	import { page } from '$app/stores';
	import PageDisclaimer from './PageDisclaimer.svelte';
	import Card from '$lib/Card.svelte';
	import SlidingCarousel from '$lib/SlidingCarousel.svelte';
	import { onMount } from 'svelte';
	import AddCommissionVisualForm from './AddCommissionVisualForm.svelte';
	import Notification from '$lib/Notification.svelte';
	import AssignOptionForm from './AssignOptionForm.svelte';
	import AssignCategoryForm from './AssignCategoryForm.svelte';
	import EditCommissionForm from './EditCommissionForm.svelte';
	import DeleteCommissionForm from './DeleteCommissionForm.svelte';
	import OrderCommissionForm from './OrderCommissionForm.svelte';
	import type { CommissionVisual } from '$lib/CommissionTypes';
	import PageViewTelemetry from '$lib/PageViewTelemetry.svelte';

	export let data: any;
	export let form: any;
	let innerWidth: any;
	let carouselDiv: any;
	let commission: any;
	let options: any;
	let categories: any;
	let displayDisclaimer: boolean;

	let forceNsfw: boolean = false;
	let forceAbdl: boolean = false;
	let carouselImageSet: any;
	let selectedSize: null | undefined | number;
	let carouselWidth: number;
	let carouselAspectRatio: number;
	let carouselHeight: number;
	let working: boolean | undefined;

	//set page params.
	$: forceNsfw = $page.url.searchParams.get('fn')?.toLocaleLowerCase() === 'true';
	$: forceAbdl = $page.url.searchParams.get('fa')?.toLocaleLowerCase() === 'true';

	function calculateImageSet() {
		if (!commission) {
			return;
		}
		carouselImageSet = new Promise((resolve, reject) => {
			let visuals: CommissionVisual[] = commission.commission_visuals;
			let maxSize = innerWidth;
			let minSize = Math.pow(2, Math.floor(Math.log2(innerWidth)) - 1);

			minSize = innerWidth;
			maxSize = Math.pow(2, Math.ceil(Math.log2(innerWidth)) + 1);

			visuals = visuals.filter((vis) => {
				return !vis.is_video;
			});

			let showAdult = forceNsfw || $userSettingsStore.nsfwAllowed;
			let showAbdl = forceAbdl || $userSettingsStore.abdlAllowed;

			if (!showAdult) {
				visuals = visuals.filter((vis) => {
					return !vis.adult;
				});
			}

			if (!showAbdl) {
				visuals = visuals.filter((vis) => {
					return !vis.abdl;
				});
			}
			let imageSet = [{ src: commission.ad_image_url, alt: 'Commission Advertisement' }];
			let groupSet = new Set();
			visuals.forEach((vis) => {
				groupSet.add(vis.group_identifier);
			});

			let rx: RegExp = /_\d{3,4}/g;

			let tempArray = visuals.map((vis) => {
				let size: any;
				let visual_url = vis.visual_url;
				let order = vis.order;
				let group_identifier = vis.group_identifier;

				if (typeof visual_url == 'string') {
					size = visual_url.match(rx);
				}

				if (size) {
					size = size[0].replace('_', '');
					size = parseInt(size);
				} else {
					size = null;
				}

				return { size: size, order: order, visual_url: visual_url, group_identifier };
			});

			let tempArray2: any[] = [];
			groupSet.forEach((group_id) => {
				//get the visuals that match the group id
				let group = tempArray.filter((a) => {
					return a.group_identifier == group_id;
				});

				//filter group to find only max-sized images since this is the detail view page.
				let filtered = group.filter((g) => {
					return g.size == null;
				});

				if (filtered.length == 1) {
					//if length is 1, then a size was found, we should put this into tempArray2
					tempArray2.push(filtered[0]);
				}
			});
			//tempArray2 should now be full of unique visuals of a particular size.
			//they can be sorted and then mapped into imageset.
			tempArray2.sort((a, b) => {
				let ay = a.order;
				let be = b.order;

				return ay - be;
			});

			let toPutIntoImageSet = tempArray2.map((item) => {
				return { src: item.visual_url + '', alt: 'visual ' + item.order };
			});

			imageSet = [...imageSet, ...toPutIntoImageSet];
			resolve(imageSet);
		});
	}

	onMount(() => {
		commission = data.commission;
		options = data.options;
		categories = data.categories;
		pageTitle = commission.title + ' Furry Commission';
		pageDescription = commission.ad_blurb;
		pageImage = commission.ad_image_url;

		setTimeout(() => {
			if (commission.adult) {
				if (!$userSettingsStore.nsfwAllowed) {
					displayDisclaimer = true;
				}
			}

			if (commission.abdl) {
				if (!$userSettingsStore.abdlAllowed) {
					displayDisclaimer = true;
				}
			}

			if (
				($userSettingsStore.nsfwAllowed && $userSettingsStore.abdlAllowed) ||
				$adminStore.loggedIn ||
				(forceAbdl && forceNsfw)
			) {
				displayDisclaimer = false;
			}
		}, 500);

		calculateImageSet();
	});

	$: $userSettingsStore.abdlAllowed, $userSettingsStore.nsfwAllowed, calculateImageSet();

	$: if (innerWidth < 1018) {
		if (!(carouselWidth === innerWidth - 30)) {
			carouselWidth = innerWidth - 30;
			carouselAspectRatio = 1.333333333;
			carouselHeight = Math.ceil(carouselWidth * carouselAspectRatio);
			//console.log('width', carouselWidth, 'height', carouselHeight, 'aspect', carouselAspectRatio);
			//console.log('calling from size reaction');

			calculateImageSet();
		}
	} else if (innerWidth >= 1018) {
		if (!(carouselWidth === Math.ceil(0.7 * innerWidth))) {
			carouselWidth = Math.ceil(0.7 * innerWidth);
			carouselAspectRatio = 0.75;
			carouselHeight = Math.ceil(carouselWidth * carouselAspectRatio);
			//console.log('width', carouselWidth, 'height', carouselHeight, 'aspect', carouselAspectRatio);

			//console.log('calling from size reaction');

			calculateImageSet();
		}
	}

	//add abdl and adult filter
	//add a force abdl/adult url param
	//ad image on top?
	//customer-facing stuff first
	//carousel of visuals
	//commission title
	//button to scroll down to fill out info below
	//data like view/order count
	//row of categories
	//description
	//show carousel of options?

	//order form

	//then admin stuff
	//add visuals
	//list of visuals (clickable)
	//list with button to add/remove categories
	//list with button to add/remove options
	let pageTitle: string = data.commission.title + ' Furry Commission';
	let pageDescription: string = data.commission.ad_blurb;
	let pageImage: string = data.commission.ad_image_url;
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

<Notification {form} />

<div class="top-btn-container">
	<a href="/commissions" class="link-btn top-btn">Back to Commissions</a>
	{#if $adminStore.loggedIn}
		<a href="/admin/commissions" class="link-btn top-btn">Commissions Admin Console</a>
	{/if}
</div>
{#if displayDisclaimer}
	<PageDisclaimer {commission} bind:disclaimer={displayDisclaimer} />
{:else}
	<!--regular content here-->
	{#if $adminStore.loggedIn}
		<div class="top-btn-container">
			<a href="#admin" class="nav-btn top-btn">{data.commission.title} Admin</a>
		</div>
	{/if}
	{#if commission}
		<div class="flex-wrapper">
			<div class="main" style={`width: ${carouselWidth}px;`}>
				<Card h1={commission.title} padding={false}>
					{#await carouselImageSet}
						<div class="carousel-placeholder">
							<img
								class="carousel-placeholder-image"
								src={commission.ad_image_url}
								alt={commission.title + ' ad image.'}
							/>
						</div>
					{:then imageSett}
						<div class="carousel" bind:this={carouselDiv}>
							<SlidingCarousel
								imageSet={imageSett}
								dots={true}
								buttons={true}
								bind:width={carouselWidth}
								bind:height={carouselHeight}
								detailView={true}
							/>
						</div>
					{/await}
					<div class="metadata">
						<div class="metadata-stack-row">
							<section class="metadata-stack">
								<section class="views">{commission.view_count}</section>
								<section class="metadata-label">Views</section>
							</section>
							<section class="metadata-stack">
								<section class="orders">
									{commission.order_count}
								</section>
								<section class="metadata-label">
									{commission.order_count === 1 ? 'Order' : 'Orders'}
								</section>
							</section>
							<section class="metadata-stack">
								<section class="base-price">
									<span class="price">${commission.base_price}</span>*
								</section>
								<section class="metadata-label">Base Price*</section>
							</section>
						</div>
					</div>
					{#if commission.available && commission.visible && $statusStore.commissions_open}
						<a class="nav-order-btn" href="#order-now">Order Now</a>
					{:else}
						<div class="nav-order-btn deact">Commission Not Available for Order</div>
					{/if}

					{#if commission.categories.length > 0}
						<div class="categories">
							{#each commission.categories as category (category.id)}
								<span class="category">{category.name}</span>
							{/each}
						</div>
					{/if}

					<div class="description">
						{@html commission.verbose_description}
					</div>
					<!--Commission order form-->
					{#if (commission.available && commission.visible && $statusStore.commissions_open) || $adminStore.loggedIn}
						<div class="order-form">
							<h2 id="order-now">Commission Request Form</h2>
							<p>Fill out this form to request this commission!</p>
							<p>
								Note: To view NSFW/ABDL/babyfur content or to request a commission with this
								content, you must enable those settings by clicking on the 'NSFW' switch in the
								top-right. You can then edit your settings at any time in the <a
									target="_blank"
									rel="noopener noreferrer"
									href="/settings">settings page</a
								>.
							</p>
							<p>
								Before filling out this form, please <a
									href="/tos"
									target="_blank"
									rel="noopener noreferrer">read my terms of service!</a
								> In requesting this commission, you agree to those terms.
							</p>
							<p>
								WARNING: This page does not save your progress if you close it in the middle of
								entering information.
							</p>
							<OrderCommissionForm {commission} {forceNsfw} {forceAbdl} />
						</div>
					{:else}
						<!--display available options here if commission is not available to order-->
						<div class="order-form">
							<h2>View pricing Estimate</h2>
							<OrderCommissionForm {commission} {forceNsfw} {forceAbdl} orderable={false} />
						</div>
					{/if}
					<!--admin stuff-->
					{#if $adminStore.loggedIn}
						<h2 id="admin">{commission.title} Admin</h2>
						<EditCommissionForm {commission} />
						<AddCommissionVisualForm commission={commission.id} />
						<AssignOptionForm {commission} unfilteredOptions={options} />
						<AssignCategoryForm {commission} unfilteredCategories={categories} />
						<div class="pseudo-form">
							<a class="yl-btn visuals-link" href={`/commissions/${commission.slug}/visuals`}
								>Visuals Page</a
							>
						</div>
						<DeleteCommissionForm {commission} />
					{/if}
				</Card>
			</div>
		</div>
	{/if}
{/if}

<style>
	.main {
		padding-bottom: 1rem;
		padding-top: 1rem;
	}
	a {
		color: var(--link-txt-clr);
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
		filter: brightness(120%) saturate(120%);
	}

	a:active {
		text-decoration: underline;
		color: var(--link-txt-clr-actv);
	}
	#admin {
		display: block;
		text-align: center;
		margin-left: 1rem;
		margin-right: 1rem;
		margin-bottom: 0.5rem;
	}

	.order-form {
		box-sizing: border-box;
		border: 2px solid var(--card-clr-scnd);
		padding: 1rem;
		line-height: 1.6;
	}

	.metadata-stack {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.metadata-stack-row {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		align-items: center;
		justify-content: space-evenly;
		box-sizing: border-box;
		border: 2px solid var(--card-clr-scnd);
		padding: 1rem;
	}

	.metadata-label {
		font-size: 14px;
		color: var(--btn-clr-deact-txt);
		font-weight: 900;
	}

	.nav-order-btn {
		text-decoration: none;
		display: block;
		box-sizing: border-box;
		background-color: var(--accnt-clr);
		color: var(--white-txt);
		font-family: var(--main-font);
		font-weight: 900;
		font-size: 1rem;
		border: none;
		border-radius: var(--radius-btn);
		padding: 0.5rem 1rem;
		box-shadow: var(--btn-drp-shdw);
		margin: 1rem;
		transition: 200ms;
		text-align: center;
	}

	.nav-order-btn:hover {
		filter: brightness(120%) saturate(120%);
	}

	.nav-order-btn:active {
		filter: brightness(60%) saturate(150%);
	}

	.deact {
		background-color: var(--btn-clr-deact);
		color: var(--btn-clr-deact-txt);
		font-weight: normal;
	}

	.deact:hover,
	.nav-order-btn.deact:hover {
		background-color: var(--btn-clr-deact);
		color: var(--btn-clr-deact-txt);
		font-weight: normal;
	}

	.deact:active,
	.nav-order-btn.deact:active {
		background-color: var(--btn-clr-deact);
		color: var(--btn-clr-deact-txt);
		font-weight: normal;
	}

	.category {
		box-sizing: border-box;
		font-size: 14px;
		outline: 1.8px solid var(--btn-clr-avail);
		border-radius: var(--radius-card);
		padding: 0.5rem;
	}

	.categories {
		box-sizing: border-box;
		border: 2px solid var(--card-clr-scnd);
		padding: 0.5rem;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		row-gap: 0.5rem;
		gap: 0.4rem;
	}

	.description {
		box-sizing: border-box;
		border: 2px solid var(--card-clr-scnd);
		border-top: none;
		padding: 1rem;
		margin-top: 0;
		margin-bottom: 1rem;
		line-height: 1.6;
	}

	.price {
		color: green;
		font-weight: 900;
	}
	.carousel-placeholder-image {
		width: 100%;
		object-fit: cover;
	}

	.flex-wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

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
		align-self: flex-end;
		box-shadow: var(--btn-drp-shdw);
		margin-top: 1rem;
		transition: var(--transition-rate);
		text-decoration: none;
		text-align: center;
	}

	.link-btn:hover {
		filter: brightness(120%) saturate(120%);
		text-decoration: underline;
	}

	.link-btn:active {
		filter: brightness(60%) saturate(150%);
		text-decoration: underline;
	}

	.nav-btn {
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
		align-self: flex-end;
		box-shadow: var(--btn-drp-shdw);
		margin-top: 1rem;
		transition: var(--transition-rate);
		text-decoration: none;
		text-align: center;
	}

	.nav-btn:hover {
		filter: brightness(120%) saturate(120%);
	}

	.nav-btn:active {
		filter: brightness(60%) saturate(150%);
	}

	.top-btn {
		margin-left: 1rem;
		margin-right: 1rem;
		width: 100%;
	}

	.top-btn-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-left: 1rem;
		margin-right: 1rem;
	}

	.top-btn-container > a {
		align-self: unset;
		flex: 1 1 0px;
	}

	.pseudo-form {
		box-sizing: border-box;
		border: 2px solid var(--card-clr-scnd);
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;
	}

	.visuals-link {
		background-color: var(--accnt-clr);
		color: var(--white-txt);
		display: block;
	}

	@media (min-width: 1018px) {
		.top-btn {
			max-width: 70vw;
			margin-left: 1rem;
			margin-right: 1rem;
		}
	}
</style>
