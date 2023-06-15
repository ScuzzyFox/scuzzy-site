<script lang="ts">
	import { userSettingsStore, adminStore } from '$lib/stores';
	import { page } from '$app/stores';
	import PageDisclaimer from './PageDisclaimer.svelte';
	import Card from '$lib/Card.svelte';
	import SlidingCarousel from '$lib/SlidingCarousel.svelte';
	import { onMount } from 'svelte';
	import AddCommissionVisualForm from './AddCommissionVisualForm.svelte';

	export let data: any;
	let outerWidth: any;
	let carouselDiv: any;
	let commission: any;
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
	$: forceNsfw = $page.url.searchParams.get('forceNsfw')?.toLocaleLowerCase() === 'true';
	$: forceAbdl = $page.url.searchParams.get('forceAbdl')?.toLocaleLowerCase() === 'true';

	function calculateImageSet() {
		console.log('entering calculate image set');
		console.log('working', working);
		if (!working) {
			working = true;
			console.log('now working, working=', working);
			carouselImageSet = new Promise((resolve, reject) => {
				let workingCarouselImageSet: any = [];
				let imageSetInterval = setInterval(() => {
					if (commission && commission.ad_image_url) {
						workingCarouselImageSet.push({
							src: commission.ad_image_url,
							alt: commission.title + 'ad image.',
							adult: commission.adult,
							abdl: commission.abdl
						});
						clearInterval(imageSetInterval);
						let visualsSet = commission.commission_visuals;
						//check nsfw
						if (!forceNsfw) {
							if (!$userSettingsStore.nsfwAllowed) {
								visualsSet = visualsSet.filter((visual: any) => {
									return !visual.adult;
								});
							}
						}

						//check abdl
						if (!forceAbdl) {
							if (!$userSettingsStore.abdlAllowed) {
								visualsSet = visualsSet.filter((visual: any) => {
									return !visual.abdl;
								});
							}
						}

						//filter to include only images that match the selected size.
						visualsSet = visualsSet.filter((visual: any) => {
							let rx: RegExp = /_\d{3,4}/gm;
							let size: string | RegExpExecArray | null | number = rx.exec(visual.visual_url);

							if (size) {
								size = size[0].replace('_', '');
								size = parseInt(size);
							} else {
								size = null;
							}

							if (selectedSize) {
								return size === selectedSize;
							} else {
								if (size) {
									return false;
								} else {
									return true;
								}
							}
						});

						workingCarouselImageSet = [
							...workingCarouselImageSet,
							...visualsSet.map((visual: any, index: any) => {
								return { src: visual.visual_url, alt: commission.title + ' visual ' + index };
							})
						];
						working = false;
						console.log('done working, working=', working);
						console.log('resoliving promise');
						resolve(workingCarouselImageSet);
					}
				}, 200);
			});
		}
	}

	onMount(() => {
		commission = data.commission;
		{
			if (
				(!$userSettingsStore.nsfwAllowed && data.commission.adult) ||
				(!$userSettingsStore.abdlAllowed && data.commission.abdl)
			) {
				//if user hasn't agreed to content settings, display disclaimer where they can enable it.
				displayDisclaimer = true;
			} else {
				displayDisclaimer = false;
			}
			if ($adminStore.loggedIn || forceNsfw || forceAbdl) {
				displayDisclaimer = false;
			}
		}

		console.log('calling from on mount');
		calculateImageSet();
	});

	$: $userSettingsStore.abdlAllowed, $userSettingsStore.nsfwAllowed, calculateImageSet();

	$: if (outerWidth < 1018) {
		if (!(carouselWidth === outerWidth - 30)) {
			carouselWidth = outerWidth - 30;
			carouselAspectRatio = 1.333333333;
			carouselHeight = Math.ceil(carouselWidth * carouselAspectRatio);
			console.log('width', carouselWidth, 'height', carouselHeight, 'aspect', carouselAspectRatio);
			console.log('calling from size reaction');

			calculateImageSet();
		}
	} else if (outerWidth >= 1018) {
		if (!(carouselWidth === Math.ceil(0.7 * outerWidth))) {
			carouselWidth = Math.ceil(0.7 * outerWidth);
			carouselAspectRatio = 0.75;
			carouselHeight = Math.ceil(carouselWidth * carouselAspectRatio);
			console.log('width', carouselWidth, 'height', carouselHeight, 'aspect', carouselAspectRatio);

			console.log('calling from size reaction');

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
</script>

<svelte:window bind:innerWidth={outerWidth} />

<a href="/commissions" class="link-btn">Back to Commissions</a>
{#if displayDisclaimer}
	<PageDisclaimer {commission} bind:disclaimer={displayDisclaimer} />
{:else}
	<!--regular content here-->
	{#if $adminStore.loggedIn}
		<a href="#admin" class="nav-btn">{data.commission.title} Admin</a>
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
							/>
						</div>
					{/await}
					<div class="metadata">
						<section class="base-price">Base price: ${commission.base_price}*</section>
						<section class="views">{commission.view_count}</section>
						<section class="orders">
							{commission.order_count}
							{commission.order_count === 1 ? 'Order' : 'Orders'}
						</section>
						{#if commission.available}
							<a href="#order-now">Order Now</a>
						{:else}
							<section>Commission Not Available for Order</section>
						{/if}
					</div>
					<div class="description">
						{@html commission.verbose_description}
					</div>
					<div class="categories">list of categories</div>
					<!--Available options | as a carousel?-->
					<!--Commission order form-->
					<!--admin stuff-->
					<h2 id="admin">{commission.title} Admin</h2>
					<AddCommissionVisualForm commission={commission.id} />
				</Card>
			</div>
		</div>
	{/if}
{/if}

<style>
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
		background-color: var(--tertiary-clr);
		color: var(--tertiary-clr-txt);
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
	}

	.link-btn:active {
		filter: brightness(60%) saturate(150%);
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
</style>
