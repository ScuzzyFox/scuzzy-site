<script lang="ts">
	import Card from '$lib/Card.svelte';
	import { fly, fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import SlidingCarousel from '$lib/SlidingCarousel.svelte';
	import type { CommissionVisual } from '$lib/CommissionTypes';

	export let commission: any;
	export let orderable: boolean = false;
	export let showAbdl: boolean = false;
	export let showAdult: boolean = false;
	let aspectRatio: number = 1.3333333;
	export let innerWidth: number;
	let carouselReady: boolean;
	let carouselWidth: number;
	let carouselHeight: number;
	let visuals: CommissionVisual[];
	let imageSet: { src: string; alt: string }[];

	function setAspectRatio() {
		setTimeout(() => {
			if (innerWidth) {
				if (innerWidth < 1018) {
					aspectRatio = 0.75;
				} else if (innerWidth >= 1018) {
					aspectRatio = 0.75;
				}
			}
		}, 100);
	}

	function setCarouselWidthHeight() {
		if (innerWidth && aspectRatio) {
			if (innerWidth < 700) {
				carouselWidth = Math.floor(innerWidth * 0.8);
				carouselHeight = Math.floor(aspectRatio * carouselWidth);
			} else if (innerWidth >= 700) {
				carouselWidth = 280;
				carouselHeight = Math.floor(aspectRatio * carouselWidth);
			}
		}
	}

	function setVisualsApplyImageSet() {
		visuals = commission.commission_visuals;
		let maxSize = innerWidth;
		let minSize = Math.pow(2, Math.floor(Math.log2(innerWidth)) - 1);

		minSize = innerWidth;
		maxSize = Math.pow(2, Math.ceil(Math.log2(innerWidth)) + 1);

		visuals = visuals.filter((vis) => {
			return !vis.is_video;
		});

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
		imageSet = [{ src: commission.ad_image_url, alt: 'Commission Advertisement' }];
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

			//filter group between size range
			let filtered = group.filter((g) => {
				return g.size < maxSize && g.size >= minSize;
			});

			if (filtered.length == 1) {
				//if length is 1, then a size was found, we should put this into tempArray2
				tempArray2.push(filtered[0]);
			} else if (filtered.length == 0) {
				//if no sizes were found, we need to become less picky
				filtered = group.filter((g) => {
					//return full size
					return g.size == null;
				});

				if (filtered.length == 1) {
					//if length is 1, then a size was found, we should put this into tempArray2
					tempArray2.push(filtered[0]);
				}
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
	}

	function initializeData() {
		setTimeout(() => {
			carouselReady = false;
			if (!innerWidth || !commission) {
				setTimeout(initializeData, 100);
			} else {
				setAspectRatio();
				setCarouselWidthHeight();
				//setVisualsApplyImageSet();
				carouselReady = true;
			}
		}, 100);
	}
	onMount(initializeData);

	//$: showAdult, showAbdl, setVisualsApplyImageSet();
	$: if ((showAdult || showAbdl || !showAdult || !showAbdl) && innerWidth) {
		setVisualsApplyImageSet();
	}

	$: if (innerWidth) {
		setAspectRatio();
		setCarouselWidthHeight();
	}
</script>

<div class="card-container" style:width={carouselWidth + 'px'}>
	<Card h2={commission.title} padding={false}>
		{#if carouselReady && imageSet}
			<SlidingCarousel
				{imageSet}
				width={carouselWidth}
				height={carouselHeight}
				buttons={true}
				dots={true}
			/>
		{:else}
			<img
				src={commission.ad_image_url}
				alt={'Advertisement for ' + commission.title}
				width={carouselWidth}
				height={carouselHeight}
			/>
		{/if}
		<!--short description, price, link to commission. small area of order and view count-->
		<div class="commission-info">
			<div class="commission-description">
				<p style:margin="0">{commission.short_description}</p>
			</div>
			<div class="base-price-area">
				<p>
					Base Price: <span style:font-weight="900" style:color="green"
						>${commission.base_price}</span
					>*
				</p>
			</div>

			<div class="link-area">
				<a class="link-btn" href={`/commissions/${commission.slug}`}>More Details</a>
			</div>

			<div class="metadata-row">
				<section>{commission.order_count} Orders</section>
				<section>{commission.view_count} Views</section>
				{#if !orderable}
					<section>Not available</section>
				{/if}
			</div>
		</div>
	</Card>
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
		align-self: flex-end;
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

	.card-container {
		max-width: 100%;
	}

	.commission-info {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}

	.commission-description {
		background-color: var(--card-clr-scnd);
		padding: 1rem;
	}

	.link-area {
		padding-left: 1rem;
		padding-right: 1rem;
	}

	.metadata-row {
		font-size: 12px;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		margin-top: 1rem;
		margin-bottom: 0.2rem;
		color: var(--btn-clr-deact-txt);
	}

	.base-price-area {
		text-align: center;
		box-sizing: border-box;
		border: 1.8px solid var(--btn-clr-avail);
	}
</style>
