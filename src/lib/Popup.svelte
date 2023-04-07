<script lang="ts">
	import { fly, fade } from 'svelte/transition';

	
	export let darken: boolean = false;
</script>

<div transition:fade={{ duration: 250 }} class={`popup-background ${!!darken ? 'darken' : ''}`}>
	<div class="transition-container" transition:fly={{ y: -600, duration: 250 }}>
        <slot />
    </div>
</div>

<style>
    .popup-background {
		position: fixed;
		z-index: 91;
		bottom: 0;
		right: 0;
		top: 0;
		left: 0;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

    .darken {
		background-color: rgba(0, 0, 0, 0.65);

    }

    .transition-container{
        display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
    }
</style>