<script lang="ts">
	import { onMount } from 'svelte';
	export let imageSet: { src: string; alt: string }[];
	export let autoscroll: boolean = true;
	export let autoscrollRate: number = 5000;
	export let height: number = 350;
	export let width: number = 350;
	export let transitionDuration: number = 300;
	export let buttons: boolean = false;
	export let dots: boolean = false;
	export let showButtons: boolean = true;
	export let href: string | null = null;
	let swipeStyle: string, imageStyle: string;
	let swipeTranslation: number = 0;
	let interval: number | NodeJS.Timer;
	let positioning: { position: number; src: string; alt: string }[];
	let initialimageCount: number;
	let currentDot: number = 0;
	let listItems: any = [];

	//reactions-----------------------------
	//$: console.log(currentDot);

	//functions--------------------------------
	function setPositioning(dir: number) {
		let posCopy = [...positioning];
		if (dir > 0) {
			//bring whatever is in 0th position to the end
			posCopy.forEach((element) => {
				if (element.position === 0) {
					//move first element to the end
					element.position = positioning.length - 1;
				} else {
					//shift all elements to the left
					element.position = element.position - 1;
				}
			});
		} else if (dir < 0) {
			//bring whatever is in end position to position 0
			posCopy.forEach((element) => {
				if (element.position === positioning.length - 1) {
					//move last element to position 0
					element.position = 0;
				} else {
					//shift all elements to the right
					element.position = element.position + 1;
				}
			});
		}

		positioning = [...posCopy];
	}

	function next() {
		//shift forward
		setPositioning(1);
		currentDot = (currentDot + 1) % initialimageCount;
	}

	function back() {
		//shift backward
		setPositioning(-1);
		currentDot = currentDot > 0 ? currentDot - 1 : initialimageCount - 1;
	}

	function handleNextClick() {
		//interrupt the interval if autoscroll is on. then set it again after we're done moving elements.
		if (interval) {
			clearInterval(interval);
		}
		next();
		if (autoscroll) {
			interval = setInterval(next, autoscrollRate);
		}
	}

	function handleBackClick() {
		//interrupt the interval if autoscroll is on. then set it again after we're done moving elements.
		if (interval) {
			clearInterval(interval);
		}
		back();
		if (autoscroll) {
			interval = setInterval(next, autoscrollRate);
		}
	}

	function handleDotClick(event: any) {
		//what dot was clicked
		let dotNum = Number.parseInt(event.target.getAttribute('dot-num'));
		let tempInterval: number | NodeJS.Timer;

		if (interval) {
			clearInterval(interval);
		}

		//go backward or forward?
		if (currentDot > dotNum) {
			//every x ms call the back function
			tempInterval = setInterval(() => {
				if (dotNum != currentDot) {
					back();
				} else {
					clearInterval(tempInterval);
				}
			}, 20);
		} else if (currentDot < dotNum) {
			// every x ms call the next function until we reach the clicked dot
			tempInterval = setInterval(() => {
				if (dotNum != currentDot) {
					next();
				} else {
					clearInterval(tempInterval);
				}
			}, Math.floor(300 / initialimageCount));
		}
		//set the autoscroll
		if (autoscroll) {
			interval = setInterval(next, autoscrollRate);
		}
	}

	onMount(() => {
		//create the positioning object array (so you just have to apply a src and alt in an array)

		//stupid way of solving bug where if there are 4 or less images, the scrolling doesn't work right.
		//also allows us to put in just one image.
		let setCopy = [...imageSet];
		while (imageSet.length < 5) {
			imageSet = [...imageSet, ...setCopy];
		}
		//since we're manipulating the array length, this will be useful for the dots.
		initialimageCount = setCopy.length;

		for (let i = 0; i < initialimageCount; i++) {
			listItems = [...listItems, i];
		}

		positioning = imageSet.map((image, ind) => {
			return {
				position: ind,
				src: image.src,
				alt: image.alt
			};
		});

		if (positioning.length % 2 === 0) {
			//if the number of images is even, then translate the div housing the
			//image set by 50% of the images
			swipeTranslation = (positioning.length * width) / 2;
			for (let i = 0; i < positioning.length / 2; i++) {
				//shift the positioning so that the first image is always shown
				next();
			}
		} else {
			//if it's odd, then truncate the division
			//e.g. if 5 images, then 50% is 2.5, so translate the housing by 2 units
			swipeTranslation = Math.floor(positioning.length / 2) * width;
			for (let i = 0; i < Math.ceil(positioning.length / 2); i++) {
				//shift the positioning so that the first image is always shown
				next();
			}
		}

		//since we shifted what the first image is, reset the dot index to be 0
		currentDot = 0;

		//apply the translation to the holder div
		swipeStyle = `height: ${height}px; width: ${
			positioning ? positioning.length * width : width
		}px; transform: translateX(-${swipeTranslation}px)`;

		//if autoscroll is set, start the interval with a slight amount of randomness.
		if (autoscroll) {
			autoscrollRate = Math.round((Math.random() * (1.1 - 0.9) + 0.9) * autoscrollRate);
			interval = setInterval(next, autoscrollRate);
		}
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
	/>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
	/>
</svelte:head>

<div class="swipe-container" style={`width: ${width}px; height: ${height}px;`}>
	<div class="swipe" style={swipeStyle}>
		<!--images go here-->
		{#if positioning}
			{#each positioning as position}
				<!--the position is the order-->
				{#if href}
					<a {href}>
						<img
							pos={position.position}
							src={position.src}
							alt={position.alt}
							{width}
							{height}
							style={position.position === 0 || position.position === positioning.length - 1
								? `left: 0; transform: translateX(${
										position.position * width
								  }px); transition: none;`
								: `left: 0; transform: translateX(${
										position.position * width
								  }px); transition: transform ${transitionDuration}ms;`}
						/>
					</a>
				{:else}
					<img
						pos={position.position}
						src={position.src}
						alt={position.alt}
						{width}
						{height}
						style={position.position === 0 || position.position === positioning.length - 1
							? `left: 0; transform: translateX(${position.position * width}px); transition: none;`
							: `left: 0; transform: translateX(${
									position.position * width
							  }px); transition: transform ${transitionDuration}ms;`}
					/>
				{/if}
			{/each}
		{/if}
	</div>
	{#if buttons}
		<button
			class="nav-btn back"
			class:show-btn={showButtons}
			type="button"
			on:click={handleBackClick}
			><span class="material-symbols-outlined"> chevron_left </span></button
		>
		<button
			class="nav-btn next"
			class:show-btn={showButtons}
			type="button"
			on:click={handleNextClick}
			><span class="material-symbols-outlined"> chevron_right </span></button
		>
	{/if}
	{#if dots}
		<ul class="dot-container">
			{#each listItems as dot, index}
				<li
					dot-num={dot}
					class="dot selected"
					class:selected={index === currentDot}
					on:click={handleDotClick}
				/>
			{/each}
		</ul>
	{/if}
</div>

<style>
	* {
		box-sizing: border-box;
	}

	.swipe-container {
		display: block;
		overflow: hidden;
		position: relative;
	}

	.swipe {
		display: block;
	}

	img {
		object-fit: cover;
		position: absolute;
		transition-property: transform;
		transition-timing-function: ease-out;
	}

	.nav-btn {
		background: none;
		color: inherit;
		border: none;
		padding: 0;
		font: inherit;
		cursor: pointer;
		outline: inherit;
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		text-align: center;
		background-color: rgba(0, 40, 200, 0.2);
		border: none;
		font-size: 24px;
		position: absolute;
		top: 0;
		bottom: 0;
		transition: transform 200ms ease-out, background-color 160ms ease-out;
	}

	.nav-btn:hover {
		filter: brightness(90%);
		background-color: rgba(40, 40, 40, 0.7);
	}

	.nav-btn:active {
		background-color: rgba(100, 100, 100, 0.7);
	}

	.nav-btn.next {
		right: 0px;
		transform: translateX(100%);
	}

	.nav-btn.back {
		left: 0px;
		transform: translateX(-100%);
	}

	.nav-btn.show-btn {
		transform: none;
	}

	.swipe-container:hover .nav-btn {
		transform: none;
	}

	.dot-container {
		position: absolute;
		bottom: 1rem;
		left: 30px;
		right: 30px;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		list-style-type: none;
		margin: 0;
		padding: 0;
		height: 10px;
	}

	.dot::before {
		display: block;
		content: '';
		width: 9px;
		height: 9px;
		background-color: rgb(181, 175, 175);
		z-index: 100;
		border-radius: 100rem;
		box-shadow: 1px 1px 1px 1px rgba(42, 45, 45, 0.2);
		transition: background-color 500ms ease-out, filter 200ms ease-out;
	}

	.dot.selected::before {
		/* transition isn't working :( */
		background-color: rgb(111, 111, 111);
		transition: inherit;
		width: 9px;
		height: 9px;
	}

	.dot:hover::before {
		filter: brightness(120%);
	}
</style>
