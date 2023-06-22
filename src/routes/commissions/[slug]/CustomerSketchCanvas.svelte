<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import '$lib/styles/buttons.css';

	export let imageDataUrl: string;

	const canvasWidth = 2048;
	const canvasHeight = 1024;

	let canvas: HTMLCanvasElement;
	let contextMenu: any;
	let context: any;
	let drawing = false;
	let lastX = 0;
	let lastY = 0;
	let lineWidth = 12;
	let scaleX: number = 1;
	let scaleY: number = 1;

	const dispatch = createEventDispatcher();

	function updateScale() {
		const rect = canvas.getBoundingClientRect();
		scaleX = canvas.width / rect.width;
		scaleY = canvas.height / rect.height;
	}

	function handleMouseDown(event: any) {
		drawing = true;
		const rect = canvas.getBoundingClientRect();
		lastX = scaleX * (event.clientX - rect.left);
		lastY = scaleY * (event.clientY - rect.top);
	}

	function handleMouseMove(event: any) {
		if (!drawing) return;
		const rect = canvas.getBoundingClientRect();
		const x = scaleX * (event.clientX - rect.left);
		const y = scaleY * (event.clientY - rect.top);
		drawLine(lastX, lastY, x, y);
		lastX = x;
		lastY = y;
	}

	function handleMouseUp() {
		drawing = false;
		exportCanvasImage();
	}

	function loadImage(src: any) {
		var img = new Image();
		img.onload = function (e) {
			const aspectRatio = img.width / img.height;
			let newWidth, newHeight;

			if (aspectRatio > 1) {
				newWidth = canvas.width;
				newHeight = canvas.width / aspectRatio;
			} else {
				newWidth = canvas.height * aspectRatio;
				newHeight = canvas.height;
			}
			context.drawImage(img, 0, 0, newWidth, newHeight);
		};
		img.src = src;
	}

	async function handlePaste(event: any) {
		let clipboardItems = await navigator.clipboard.read();
		for (const clipboardItem of clipboardItems) {
			for (const type of clipboardItem.types) {
				if (type.includes('image')) {
					const blob = await clipboardItem.getType(type);
					// we can now use blob here
					let url = window.URL || window.webkitURL;
					let src = url.createObjectURL(blob);
					//context.clearRect(0, 0, canvas.width, canvas.height);
					loadImage(src);
					exportCanvasImage();
					return;
				}
			}
		}
	}

	function drawLine(x1: any, y1: any, x2: any, y2: any) {
		context.beginPath();
		context.moveTo(x1, y1);
		context.lineTo(x2, y2);
		context.lineWidth = lineWidth;
		context.stroke();
		context.closePath();
	}

	function exportCanvasImage() {
		const dataUrl = canvas.toDataURL();
		imageDataUrl = dataUrl;
	}

	function handleTouchStart(event: any) {
		const touch = event.touches[0];
		const rect = canvas.getBoundingClientRect();
		const x = scaleX * (touch.clientX - rect.left);
		const y = scaleY * (touch.clientY - rect.top);
		lastX = x;
		lastY = y;
		drawing = true;
	}

	function handleTouchMove(event: any) {
		event.preventDefault();
		if (!drawing) return;
		const touch = event.touches[0];
		const rect = canvas.getBoundingClientRect();
		const x = scaleX * (touch.clientX - rect.left);
		const y = scaleY * (touch.clientY - rect.top);
		drawLine(lastX, lastY, x, y);
		lastX = x;
		lastY = y;
	}

	function handleTouchEnd() {
		drawing = false;
		exportCanvasImage();
	}

	function initializeCanvas() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = 'white';
		context.fillRect(0, 0, canvas.width, canvas.height);
		exportCanvasImage();
	}

	onMount(() => {
		//@ts-ignore
		canvas = document.getElementById('canvas');
		context = canvas.getContext('2d');
		canvas.addEventListener('mousedown', handleMouseDown);
		canvas.addEventListener('mousemove', handleMouseMove);
		canvas.addEventListener('mouseup', handleMouseUp);
		canvas.addEventListener('touchstart', handleTouchStart);
		canvas.addEventListener('touchmove', handleTouchMove);
		canvas.addEventListener('touchend', handleTouchEnd);
		window.addEventListener('paste', handlePaste);
		//canvas.addEventListener('paste', handlePaste);

		initializeCanvas();
		updateScale();
		const resizeObserver = new ResizeObserver(updateScale);
		resizeObserver.observe(canvas);
	});
</script>

<h3 style="margin-bottom: 0;">Sketch Your Idea (optional)</h3>
<p style="margin:0;">
	I highly recommend you provide a sketch of your idea. Even if it's crude and bare, it helps me
	understand your vision!
</p>
<p style="margin:0;">You can draw or paste an image into the canvas below.</p>
<canvas id="canvas" width={canvasWidth} height={canvasHeight} />
<div class="button-row">
	<button on:click={initializeCanvas} class="yl-lt-btn" type="button">Clear Canvas</button><button
		type="button"
		class="yl-btn"
		on:click={handlePaste}>Paste from clipboard</button
	>
</div>

<style>
	.button-row {
		display: flex;
		width: 100%;
		flex-direction: row;

		justify-content: space-evenly;
		align-items: center;
		flex-wrap: wrap;
	}

	.yl-btn {
		background-color: var(--accnt-clr);
		color: var(--white-txt);
	}

	.yl-btn,
	.yl-lt-btn {
		box-sizing: border-box;
		display: block;
		min-width: fit-content;
	}
</style>
